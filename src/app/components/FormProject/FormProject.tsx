'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import s from "./form-project.module.scss";
import React, { useState } from 'react'
import { useModalStore } from '@/app/components/Modal/modalStore'
import ThankYou from '@/app/components/ThankYou/ThankYou'
import Recaptcha from "@/app/components/Recaptcha/Recaptcha";
import ButtonWithWrapper from "@/app/components/Button/Button";

const schema = z.object({
  name: z.string().optional(),
  phone: z.string()
  .min(1, { message: 'Поле обязательно для заполнения' })
  .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Номер введен некорректно',
  }),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function FormProject() {
  const { openModal } = useModalStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaError, setRecaptchaError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  })

  const phoneValue = watch('phone', '')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')

    if (!value) {
      setValue('phone', '')
      return
    }

    if (value.startsWith('8') || value.startsWith('7')) {
      value = `7${value.slice(1)}`
    }

    let formattedValue = '+7'
    if (value.length > 1) formattedValue += ` (${value.slice(1, 4)}`
    if (value.length > 4) formattedValue += `) ${value.slice(4, 7)}`
    if (value.length > 7) formattedValue += `-${value.slice(7, 9)}`
    if (value.length > 9) formattedValue += `-${value.slice(9, 11)}`

    setValue('phone', formattedValue, { shouldValidate: false })
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Проверка reCAPTCHA
      if (!recaptchaToken) {
        throw new Error('Пройдите проверку reCAPTCHA')
      }

      // Валидация reCAPTCHA на сервере
      const recaptchaResponse = await fetch('/api/next/recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken })
      })

      const recaptchaData = await recaptchaResponse.json()

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        throw new Error('Проверка безопасности не пройдена')
      }

      // Отправка формы
      const response = await fetch('/api/next/submitForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          recaptchaScore: recaptchaData.score
        })
      })

      if (!response.ok) throw new Error('Ошибка при отправке формы')

      openModal({
        title: 'Спасибо за заявку',
        content: <ThankYou />,
      })

    } catch (error) {
      console.error('Ошибка:', error)
      setError(error instanceof Error ? error.message : 'Произошла ошибка')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <input
          id="name"
          {...register('name')}
          placeholder="Имя"
        />
      </div>

      <div>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          value={phoneValue}
          onChange={handlePhoneChange}
          placeholder="Телефон*"
          className={errors.phone ? s.isInvalid : ''}
        />
        {errors.phone && <p className={s.error}>{errors.phone.message}</p>}
      </div>

      <div>
        <textarea
          id="message"
          {...register('message')}
          placeholder="Сообщение"
        />
      </div>

      <Recaptcha
        action="form_submission"
        onVerify={setRecaptchaToken}
        onError={() => setRecaptchaError(true)}
      />

      {recaptchaError && (
        <p className={s.error}>Ошибка загрузки reCAPTCHA. Пожалуйста, обновите страницу.</p>
      )}

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

      {error && <p className={s.error}>{error}</p>}
    </form>
  )
}