import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React, { useState } from 'react';
import s from "./form-tender.module.scss";
import ButtonWithWrapper from "@/app/components/Button/Button";
import ThankYou from "@/app/components/ThankYou/ThankYou";
import {useModalStore} from "@/app/components/Modal/modalStore";

// Схема валидации с использованием Zod
const schema = z.object({
  name: z.string().optional(), // Имя не обязательно
  phone: z
  .string()
  .min(1, { message: 'поле обязательно для заполнения' }) // Телефон обязателен
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Номер введен не корректно',
  }),
  email: z.string().email({ message: 'поле обязательно для заполнения' }), // Email обязателен
  city: z.string().optional(), // Город/регион не обязателен
  type: z.enum(['tender', 'contest'], { message: 'Выберите тип' }), // Тип (тендер или конкурс) обязателен
  message: z.string().min(1, { message: 'поле обязательно для заполнения' }), // Сообщение обязательно
});

// Тип данных формы на основе схемы
type FormData = z.infer<typeof schema>;

export default function FormTender() {
  const { openModal } = useModalStore();
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние отправки формы
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit', // Валидация только при отправке формы
    defaultValues: {
      type: 'tender', // Устанавливаем значение по умолчанию для радиокнопки "Тендер"
    },
  });

  const phoneValue = watch('phone', ''); // Отслеживаем значение поля phone

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы

    // Если значение пустое, сбрасываем поле
    if (!value) {
      setValue('phone', '');
      return;
    }

    // Если номер начинается с 8 или 7, заменяем на +7
    if (value.startsWith('8') || value.startsWith('7')) {
      value = `7${value.slice(1)}`; // Убираем первую цифру (8 или 7)
    }

    // Форматируем номер в +7 (XXX) XXX-XX-XX
    let formattedValue = '+7';
    if (value.length > 1) {
      formattedValue += ` (${value.slice(1, 4)}`;
    }
    if (value.length > 4) {
      formattedValue += `) ${value.slice(4, 7)}`;
    }
    if (value.length > 7) {
      formattedValue += `-${value.slice(7, 9)}`;
    }
    if (value.length > 9) {
      formattedValue += `-${value.slice(9, 11)}`;
    }

    // Обновляем значение поля
    setValue('phone', formattedValue, { shouldValidate: false }); // Отключаем валидацию при изменении
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Отправляем данные на наш API Route
      const response = await fetch('/api/next/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      const result = await response.json();

      // Открываем модальное окно с благодарностью
      openModal({
        title: 'Спасибо за заявку',
        content: <ThankYou />,
      });

      console.log('Форма успешно отправлена:', result);
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={s.radioGroup}>
        <label>
          <input
            type="radio"
            value="tender"
            {...register('type')} // Регистрируем поле "type"
          />
          <div className={s.radio}></div>
          Тендер
        </label>
        <label>
          <input
            type="radio"
            value="contest"
            {...register('type')} // Регистрируем поле "type"
          />
          <div className={s.radio}></div>
          Конкурс
        </label>
        {errors.type && <p>{errors.type.message}</p>}
      </div>

      <div>
        <input
          id="name"
          {...register('name')} // Регистрируем поле "name"
          placeholder="имя"
        />
      </div>

      <div>
        <input
          id="email"
          type="email"
          {...register('email')} // Регистрируем поле "email"
          placeholder="email*"
          className={!!errors.email ? s.isInvalid : ''}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input
          id="phone"
          type="tel"
          {...register('phone')} // Регистрируем поле "phone"
          value={phoneValue}
          onChange={handlePhoneChange} // Обрабатываем ввод
          placeholder="телефон*"
          className={!!errors.phone ? s.isInvalid : ''}
        />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>

      <div>
        <input
          id="city"
          {...register('city')} // Регистрируем поле "city"
          placeholder="город/регион"
        />
      </div>

      <div>
        <textarea
          id="message"
          {...register('message')} // Регистрируем поле "message"
          placeholder="сообщение*"
          className={!!errors.message ? s.isInvalid : ''}
        />
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <div>
        <span>Нажимая на кнопку «Отправить», вы соглашаетесь на обработку персональных данных</span>
        <ButtonWithWrapper
          className=""
          dotReverce={false}
          isWrapper={false}
          name={isSubmitting ? 'Отправка...' : 'Отправить'}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}