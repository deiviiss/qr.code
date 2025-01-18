'use server'

import * as brevo from '@getbrevo/brevo'
import { getAdminContactInfo } from '@/actions/auth/get-admin-contact-info'
const apiInstance = new brevo.TransactionalEmailsApi()

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY || ''
)

const emailValid = process.env.EMAIL_BREVO_VALID || ''

interface EmailOptionsParams {
  email: string
  subject: string
  message: string
}

export const sendEmail = async ({ email, subject, message }: EmailOptionsParams) => {
  const { nameAdmin, ok } = await getAdminContactInfo()

  if (!ok) {
    return {
      ok: false,
      message: 'Error al enviar este correo'
    }
  }

  try {
    const smtpEmail = new brevo.SendSmtpEmail()
    smtpEmail.subject = subject
    smtpEmail.to = [{ email, name: email }]
    smtpEmail.htmlContent = `<html><body>${message}</body></html>`
    smtpEmail.sender = { name: String(nameAdmin), email: emailValid }

    await apiInstance.sendTransacEmail(smtpEmail)

    return {
      ok: true,
      message: 'Correo enviado'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al enviar este correo'
    }
  }
}
