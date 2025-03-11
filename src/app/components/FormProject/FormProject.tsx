import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import s from "./form-project.module.scss";

// Схема валидации с использованием Zod
const schema = z.object({
  name: z.string().optional(), // Имя не обязательно
  phone: z
  .string()
  .min(1, { message: 'поле обязательно для заполнения' }) // Телефон обязателен
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Номер введен не корректно',
  }),
  message: z.string().optional(), // Сообщение не обязательно
});

// Тип данных формы на основе схемы
type FormData = z.infer<typeof schema>;

export default function FormProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit', // Валидация только при отправке формы
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Форма отправлена:', data);
    alert('Форма успешно отправлена!');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <input
          id="name"
          {...register('name')} // Регистрируем поле "name"
          placeholder="имя"
        />
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
        <textarea
          id="message"
          {...register('message')} // Регистрируем поле "message"
          placeholder="сообщение"
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
  );
}