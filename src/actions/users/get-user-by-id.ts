'use server'

import { type User } from '@/interfaces/users/user.interface'
import prisma from '@/lib/prisma'

interface Response {
  ok: boolean
  message: string
  user?: User
}

export const getUserById = async (id: string): Promise<Response> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        password: true,
        emailVerified: true,
        phoneNumberVerified: true,
        hasPurchasedOnce: true,
        image: true,
        role: true,
        isActive: true
      }
    })

    if (!user) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    return {
      ok: true,
      message: 'Usuario encontrado',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al buscar usuario, contacta a soporte'
    }
  }
}
