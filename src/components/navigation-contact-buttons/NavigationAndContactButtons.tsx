import Link from 'next/link'
import { IoArrowBackOutline, IoMailUnread } from 'react-icons/io5'
import { ButtonBack } from '@/components/button-back/ButtonBack'
import { Button } from '@/components/ui/button'

interface Props {
  email: string
}

export const NavigationAndContactButtons = ({ email }: Props) => {
  return (
    <div className='grid justify-center w-full gap-2 m-8 text-center mx-auto min-[350px]:grid-cols-2 min-[400px]:gap-4 max-w-96 px-3'>
      <Button asChild className='capitalize'>
        <Link target='_blank' href={`mailto:${email}?subject=Consulta%20sobre%20...`}>
          <IoMailUnread />
          Contáctenos
        </Link>
      </Button>

      <ButtonBack name='Atrás' icon={<IoArrowBackOutline />} />

    </div>
  )
}
