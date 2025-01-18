import { type Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoPencil } from 'react-icons/io5'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import { getUserById } from '@/actions/users/get-user-by-id'
import { ButtonLogout } from '@/components/auth/ButtonLogout'
import { ButtonValidateEmail } from '@/components/button-validate-email/ButtonValidateEmail'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { titleFont } from '@/config/fonts'

export const metadata: Metadata = {
  title: 'Perfil de usuario',
  description: 'Contiene la información del usuario.'
}

const ProfilePage = async () => {
  const userSession = await getUserSessionServer()

  if (!userSession) {
    redirect('/')
  }

  const { user } = await getUserById(String(userSession.id))

  if (!user) {
    redirect('/')
  }

  const userName = user.name || 'Nombre de usuario'
  const userImage = user.image || '/imgs/avatar.png'
  const userMail = user.email || 'Correo electrónico'
  const userPhoneNumber = user.phoneNumber || 'Número de teléfono'
  const userRole = user.role || 'Role'

  return (
    <div className='w-full'>
      <Card className='max-w-sm mx-auto'>
        <CardHeader className='text-center'>
          <h1 className={`${titleFont.className} text-2xl mb-3`}>Perfil</h1>
        </CardHeader>

        <CardContent className='flex justify-center'>
          <Avatar className="bg-gray-200 text-gray-600 h-28 w-28 rounded-full">
            <AvatarImage src={userImage} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </CardContent>

        <CardContent >
          <div className='flex justify-end'>
            <Button asChild variant='outline' size='sm' className='gap-1'>
              <Link href={`/profile/${user.id}?redirectTo=profile`} className='text-[10px]'>
                <IoPencil />
                <span className='hidden sm:flex'>Editar</span>
              </Link>
            </Button>
          </div>
        </CardContent>

        <CardContent >
          <p><span className='font-semibold'>Nombre:</span> {userName}</p>
          <p><span className='font-semibold'>Correo:</span> {userMail}</p>
          <p><span className='font-semibold'>Teléfono:</span> {userPhoneNumber}</p>
          <p className='capitalize'><span className='font-semibold'>Role:</span> {userRole}</p>
        </CardContent>

        <CardFooter className='space-y-2 flex-col'>
          <div className='flex flex-col gap-4 justify-center mt-10 w-full'>
            {
              !user.emailVerified && !user.phoneNumberVerified && <ButtonValidateEmail userId={user.id} />
            }
          </div>
          <ButtonLogout className='w-full' />
        </CardFooter>

      </Card>
    </div>
  )
}

export default ProfilePage
