'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoInformationOutline } from 'react-icons/io5'
import { z } from 'zod'
import { login } from '@/actions/auth/login'
import { noticeFailure, noticeSuccess } from '@/components/toast-notifications/ToastNotifications'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { titleFont } from '@/config/fonts'

const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo electrónico es requerido',
    message: 'Correo electrónico no válido'
  }).email({
    message: 'Correo electrónico no válido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    message: 'Contraseña no válida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo') || '/profile'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const defaultValuesForm = {
    email: '',
    password: ''
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)

    const { email, password } = values

    const { ok, message } = await login(email, password)

    if (!ok) {
      noticeFailure(message)
      setError(message)
      setIsSubmitting(false)
      return
    }

    noticeSuccess(message)
    setIsSubmitting(false)
    window.location.replace(redirectTo)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <Card className='max-w-sm mx-auto'>
          <CardHeader>
            <h1 className={`${titleFont.className} text-2xl mb-5`}>Ingresar</h1>
            <p>Iniciar sesión en tu cuenta</p>
          </CardHeader>

          <CardContent className='space-y-3'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Contraseña' {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className=''
              aria-live='polite'
              aria-atomic='true'
            >
              {
                error && (
                  <div className='flex mb-2 text-red-600 text-sm'>
                    <IoInformationOutline className='h-5 w-5' />
                    <p className=''>Credenciales invalidas</p>
                  </div>
                )
              }
            </div>
          </CardContent>
          <CardFooter className='space-y-3 flex-col'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full'
            >
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
