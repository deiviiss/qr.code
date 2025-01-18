'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoInformationOutline } from 'react-icons/io5'
import { z } from 'zod'
import { noticeFailure, noticeSuccess } from './LoginForm'
import { login } from '@/actions/auth/login'
import { registerUser } from '@/actions/auth/register'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { titleFont } from '@/config/fonts'

const registerSchema = z.object({
  name: z.string().min(3, { message: 'El nombre es requerido' }).max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z.string().email({
    message: 'El correo electrónico no es válido'
  }),
  phoneNumber: z
    .string()
    .min(14, {
      message: 'El número de teléfono debe ser de 14 caracteres incluyendo el código del país'

    })
    .max(14, {
      message: 'El número de teléfono debe ser de 14 caracteres incluyendo el código del país'
    }),
  password: z
    .string()
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    })
})

export const RegisterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const defaultValuesForm = {
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  }

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValuesForm
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true)

    const data = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password
    }

    const { ok, message } = await registerUser(data)

    if (!ok) {
      noticeFailure(message)
      setError(message)
      return
    }

    await login(data.email, data.password)
    const redirectTo = searchParams.get('redirectTo') || '/profile'

    // window.location.replace(redirectTo)
    noticeSuccess(message)
    setIsSubmitting(false)
    // window.location.replace(redirectTo)
    router.push(redirectTo)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <Card className='max-w-sm mx-auto'>
          <CardHeader>
            <h1 className={`${titleFont.className} text-2xl mb-5`}>Crear cuenta</h1>

            <CardDescription>Ingresa tus datos para crear tu cuenta</CardDescription>
          </CardHeader>

          <CardContent className='space-y-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='name'>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder='Nombre completo' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='phoneNumber'>Número de teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder='Número de teléfono' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor='email'>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder='Correo electrónico' {...field} />
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
                  <FormLabel htmlFor='password'>Contraseña</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Contraseña' {...field} />
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
              Crear cuenta
            </Button>

            {/* divisor l ine */}
            <div className="flex w-full items-center my-5">
              <div className="flex-1 border-t border-gray-500"></div>
              <span className="px-2 text-gray-600">0</span>
              <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Button
              asChild
              variant={'secondary'}
              className='w-full'>
              <Link
                href="/auth/login"
              >
                Ingresar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form >
  )
}
