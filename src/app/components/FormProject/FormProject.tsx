import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';

// Схема валидации с использованием Zod
const schema = z.object({
  name: z.string().min(1, { message: 'Имя обязательно' }),
  email: z.string().email({ message: 'Некорректный email' }),
  phone: z
  .string()
  .min(1, { message: 'Номер телефона обязателен' })
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Номер телефона должен быть в формате +7 (XXX) XXX-XX-XX',
  }),
  message: z.string().min(10, { message: 'Сообщение должно содержать минимум 10 символов' }),
});

// Тип данных формы на основе схемы
type FormData = z.infer<typeof schema>;

export default function FormProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit', // Валидация только при отправке формы
  });

  const [phoneValue, setPhoneValue] = useState('');

  const handlePhoneChange = (value: string) => {
    // Убираем символы 8, 7, + в начале, если они есть
    let cleanedValue = value.replace(/^[87+]/, '');

    // Если значение пустое, оставляем как есть
    if (!cleanedValue) {
      setPhoneValue('');
      setValue('phone', '');
      return;
    }

    // Добавляем +7 в начало
    cleanedValue = `+7${cleanedValue}`;

    // Обновляем состояние и значение формы
    setPhoneValue(cleanedValue);
    setValue('phone', cleanedValue, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Форма отправлена:', data);
    alert('Форма успешно отправлена!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          {...register('name')}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        {errors.name && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.name.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          style={{ width: '100%', padding: '0.5rem' }}
        />
        {errors.email && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="phone">Номер телефона</label>
        <IMaskInput
          mask="+7 (000) 000-00-00"
          id="phone"
          value={phoneValue}
          onAccept={(value) => handlePhoneChange(value)}
          placeholder="+7 (XXX) XXX-XX-XX"
          style={{ width: '100%', padding: '0.5rem' }}
        />
        {errors.phone && <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.phone.message}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="message">Сообщение</label>
        <textarea
          id="message"
          {...register('message')}
          style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
        />
        {errors.message && (
          <p style={{ color: 'red', fontSize: '0.875rem' }}>{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Отправить
      </button>
    </form>
  );
}