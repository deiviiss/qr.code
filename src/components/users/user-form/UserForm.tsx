'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateUser } from '@/actions/users/update-user'
import { noticeFailure, noticeSuccess } from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { titleFont } from '@/config/fonts'
import { type User } from '@/interfaces/users/user.interface'

const formUserSchema = z.object({
  id: z
    .string()
    .uuid(),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z
    .string()
    .email({ message: 'El correo electrónico no es válido' }),
  phoneNumber: z
    .string()
    .min(14, { message: 'El número de teléfono debe ser de 14 caracteres incluyendo el código del país' })
    .max(14, { message: 'El número de teléfono debe ser de 14 caracteres incluyendo el código del país' }),
  password: z
    .string()
    .refine(value => value === '' || (value.length >= 6 && value.length <= 10), {
      message: 'La contraseña debe tener entre 6 y 10 caracteres si será cambiada'
    })
})

interface Props {
  user: User
}

export const UserForm = ({ user }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValuesForm = {
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    password: ''
  }

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: defaultValuesForm
  })

  const onSubmit = async (values: z.infer<typeof formUserSchema>) => {
    setIsSubmitting(true)

    const { ok, message } = await updateUser({ ...values })
    if (!ok) {
      noticeFailure(message)

      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)

    noticeSuccess(message)

    const redirectTo = searchParams.get('redirectTo')
    const isProfile = redirectTo === 'profile'

    if (isProfile) {
      router.replace('/profile')
      return
    }

    router.replace('/admin/users')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <Card className='max-w-sm mx-auto'>
            <CardHeader>
              <h1 className={`${titleFont.className} text-2xl mb-3`}>Editar perfil</h1>
              <p>Actualiza tu información</p>
            </CardHeader>

            <CardContent className='space-y-3'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='text'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Incluir código de país
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Si captura la contraseña esta será restablecida
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex gap-2 w-full text-center justify-end mb-10'>
                <Button
                  size="sm"
                  type='button'
                  onClick={() => { router.back() }}
                  variant='destructive'
                >
                  Cancelar
                </Button>

                <Button
                  size='sm'
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar
                </Button>
              </div>

            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  )
}
