import { redirect } from 'next/navigation'
import { getAdminContactInfo } from '@/actions/auth/get-admin-contact-info'
import { NavigationAndContactButtons } from '@/components/navigation-contact-buttons/NavigationAndContactButtons'
import { Title } from '@/components/title/Title'

export default async function TermsPage() {
  const { emailAdmin } = await getAdminContactInfo()

  if (!emailAdmin) {
    redirect('/')
  }

  return (
    <>
      <Title title='Términos y condiciones' subtitle='' className='w-full px-4' />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <ul className="list-disc pl-5 space-y-2">
                <li>No se almacenan datos ni se rastrean los enlaces generados.</li>
                <li>El usuario es responsable de las URLs que introduzca.</li>
                <li>La aplicación no garantiza que los enlaces generados sean seguros.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <NavigationAndContactButtons email={emailAdmin} />

    </>
  )
}
