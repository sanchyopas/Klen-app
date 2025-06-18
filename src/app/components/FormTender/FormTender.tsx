import { z } from 'zod';
import React, { useCallback, useEffect, useState } from 'react';
import s from "./form-tender.module.scss";
import ButtonWithWrapper from "@/app/components/Button/Button";
import ThankYou from "@/app/components/ThankYou/ThankYou";
import {useModalStore} from "@/app/components/Modal/modalStore";
import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import Link from "next/link"; // Импорт SmartCaptcha

// Схема валидации с использованием Zod
const schema = z.object({
  name: z.string().optional(),
  phone: z.string()
  .min(1, { message: 'поле обязательно для заполнения' })
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Номер введен не корректно',
  }),
  email: z.string().email({ message: 'поле обязательно для заполнения' }),
  city: z.string().optional(),
  type: z.enum(['tender', 'contest'], { message: 'Выберите тип' }),
  message: z.string().min(1, { message: 'поле обязательно для заполнения' }),
  isAgreePolicy: z.boolean()
  .refine(val => val, { message: 'Необходимо дать согласие' }),
  isConsentMailing: z.boolean().optional(),
});

// Тип данных формы на основе схемы
type FormData = z.infer<typeof schema>;

export default function FormTender() {
  const { openModal } = useModalStore();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    type: 'tender',
    message: '',
    isAgreePolicy: false,
    isConsentMailing: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Состояния SmartCaptcha
  const [resetCaptcha, setResetCaptcha] = useState(0);
  const [captchaToken, setCaptchaToken] = useState('');
  const [visible, setVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (!value) {
      setFormData(prev => ({ ...prev, phone: '' }));
      return;
    }

    if (value.startsWith('8') || value.startsWith('7')) {
      value = `7${value.slice(1)}`;
    }

    let formattedValue = '+7';
    if (value.length > 1) formattedValue += ` (${value.slice(1, 4)}`;
    if (value.length > 4) formattedValue += `) ${value.slice(4, 7)}`;
    if (value.length > 7) formattedValue += `-${value.slice(7, 9)}`;
    if (value.length > 9) formattedValue += `-${value.slice(9, 11)}`;

    setFormData(prev => ({ ...prev, phone: formattedValue }));
  };

  const validateForm = async () => {
    try {
      await schema.parseAsync(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof FormData;
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Обработчики SmartCaptcha
  const handleChallengeHidden = useCallback(() => setVisible(false), []);
  const handleButtonClick = () => setVisible(true);
  const handleReset = () => setResetCaptcha((prev) => prev + 1);

  const successSendForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      city: '',
      type: 'tender',
      message: '',
      isAgreePolicy: false,
      isConsentMailing: false,
    });
    setCaptchaToken('');
    handleReset();
    setVisible(false);
    openModal({
      title: 'Спасибо за заявку',
      content: <ThankYou />,
    });
  };

  useEffect(() => {
    const submitFormWithCaptcha = async () => {
      if (captchaToken) {
        const isValid = await validateForm();
        if (isValid) {
          setIsSubmitting(true);
          try {
            const response = await fetch('/api/next/submitForm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...formData,
                captchaToken, // Включаем captchaToken в отправку
              })
            });

            if (!response.ok) throw new Error('Ошибка при отправке формы');

            successSendForm();

          } catch (error) {
            console.error('Ошибка:', error);
            setError(error instanceof Error ? error.message : 'Произошла ошибка');
          } finally {
            setIsSubmitting(false);
          }
        }
      }
    };
    submitFormWithCaptcha();
  }, [captchaToken]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = await validateForm();
    if (!isValid) return;

    // Если форма валидна, запускаем проверку капчи
    handleButtonClick();
  };

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.radioGroup}>
        <label>
          <input
            type="radio"
            name="type"
            value="tender"
            checked={formData.type === 'tender'}
            onChange={handleChange}
          />
          <div className={s.radio}></div>
          Тендер
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="contest"
            checked={formData.type === 'contest'}
            onChange={handleChange}
          />
          <div className={s.radio}></div>
          Конкурс
        </label>
        {errors.type && <p>{errors.type}</p>}
      </div>

      <div>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="имя"
        />
      </div>

      <div>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email*"
          className={errors.email ? s.isInvalid : ''}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="телефон*"
          className={errors.phone ? s.isInvalid : ''}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div>
        <input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="город/регион"
        />
      </div>

      <div>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="сообщение*"
          className={errors.message ? s.isInvalid : ''}
        />
        {errors.message && <p>{errors.message}</p>}
      </div>

      <div className="checkboxGroup">
        <div className={`checkbox ${errors.isAgreePolicy ? 'error' : ''}`}>
          <label>
            <input
              id="isAgreePolicy"
              type="checkbox"
              name="isAgreePolicy"
              checked={formData.isAgreePolicy}
              onChange={handleChange}
            />
            <span>
              Я даю <Link href={'/consent-personal-data'} target={'_blank'}>согласие на обработку моих персональных данных</Link> в соответствии с <Link href={'/privacy'} target={'_blank'}>политикой конфиденциальности</Link>
            </span>
          </label>
          {/*{errors.isAgreePolicy && <p className={s.error}>{errors.isAgreePolicy}</p>}*/}
        </div>

        <div className="checkbox">
          <label>
            <input
              id="isConsentMailing"
              type="checkbox"
              name="isConsentMailing"
              checked={formData.isConsentMailing}
              onChange={handleChange}
            />
            <span>Я даю согласие на получение новостей, полезных материалов и рекламных предложений</span>
          </label>
        </div>
      </div>

      <div>

        <InvisibleSmartCaptcha
          key={resetCaptcha}
          sitekey="ysc1_eKeOP6pXbb9ZfA3vQKGmqAX9erenRNK4oPwAc0dJ324f005e" // Используйте ваш sitekey SmartCaptcha
          onSuccess={(token: string) => {
            setCaptchaToken(token);
          }}
          onChallengeHidden={handleChallengeHidden}
          visible={visible}
        />

        <ButtonWithWrapper
          className=""
          dotReverce={false}
          isWrapper={false}
          name={isSubmitting ? 'Отправка...' : 'Отправить'}
          disabled={isSubmitting}
        />
      </div>

      {error && <p className={s.error}>{error}</p>}
    </form>
  );
}