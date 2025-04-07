// components/Recaptcha.tsx
'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface RecaptchaProps {
  action: string
  onVerify: (token: string) => void
  onError?: () => void
}

export default function Recaptcha({ action, onVerify, onError }: RecaptchaProps) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      console.error('reCAPTCHA site key is missing')
      onError?.()
      return
    }

    const loadRecaptcha = () => {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`
      script.async = true
      script.defer = true

      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action })
          .then(onVerify)
          .catch(() => onError?.())
        })
      }

      script.onerror = () => {
        console.error('Failed to load reCAPTCHA script')
        onError?.()
      }

      document.body.appendChild(script)
    }

    loadRecaptcha()

    return () => {
      const scripts = document.querySelectorAll(
        'script[src^="https://www.google.com/recaptcha/api.js"]'
      )
      scripts.forEach(script => document.body.removeChild(script))
    }
  }, [action, onVerify, onError])

  return null
}