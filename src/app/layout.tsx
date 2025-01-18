import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers/Providers'
import { Toaster } from '@/components/ui/sonner'
import { textFont } from '@/config/fonts'

export const metadata: Metadata = {
  title: {
    template: '%s - Generator QR',
    default: 'Generator QR'
  },
  description: 'Genera códigos QR fácilmente para tus enlaces',
  keywords: 'QR Code, Generator QR, Aplicación, QR, Codes, Generador QR, Gratis'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${textFont.className} antialiased min-h-screen`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html >
  )
}
