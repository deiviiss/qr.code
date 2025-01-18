'use server'

import prisma from '@/lib/prisma'

export const getAdminContactInfo = async () => {
  try {
    const admin = await prisma.user.findFirst({
      where: {
        role: 'admin'
      },
      select: {
        email: true,
        name: true,
        phoneNumber: true
      }
    })

    if (!admin) {
      return { ok: false, message: 'No se pudo recuperar la información' }
    }

    return {
      ok: true,
      message: 'Información recuperada',
      emailAdmin: admin.email,
      nameAdmin: admin.name,
      phoneNumberAdmin: admin.phoneNumber
    }
  } catch (error) {
    return { ok: false, message: 'No se pudo recuperar la información' }
  }
}
