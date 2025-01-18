import { Poppins, Montserrat } from 'next/font/google'

export const textFont = Poppins({ subsets: ['latin'], weight: ['400', '500'] })

export const titleFont = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700']
})
