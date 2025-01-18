import { redirect } from 'next/navigation'
import { validateUserAdmin } from '@/actions/auth/validate-user-admin'

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAdmin = await validateUserAdmin()

  if (!isAdmin) {
    redirect('/profile')
  }

  return (
    <div className=''>
      {children}
    </div>
  )
}
