'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { toast } from 'sonner'
import { validateEmail } from '@/actions/auth/validate-email'

export default function ValidateEmailPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ValidateEmail />
    </Suspense>
  )
}

function ValidateEmail() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [message, setMessage] = useState('Validando...')
  const router = useRouter()

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setMessage('Token no proporcionado')
        router.push('/profile')
        return
      }

      try {
        const { ok, message: result } = await validateEmail(String(token))

        if (ok) {
          toast(result, {
            position: 'top-right',
            duration: 2000
          })
          router.push('/profile')
        }
      } catch (error) {
        setMessage('Token inválido o expirado')
        router.push('/profile')
      }
    }

    validate()
  }, [token])

  return (
    <div>{message}</div>
  )
}
