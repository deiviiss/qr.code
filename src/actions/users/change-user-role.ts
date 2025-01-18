'use server'

import { revalidatePath } from 'next/cache'
import { validateUserAdmin } from '@/actions/auth/validate-user-admin'
import prisma from '@/lib/prisma'

export const changeUserRole = async (userId: string, role: string) => {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    return {
      ok: false,
      message: 'Debe estar autenticado como administrador'
    }
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user'

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: 'Rol actualizado correctamente',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo cambiar el rol del usuario'
    }
  }
}
