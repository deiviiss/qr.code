'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className?: string
  icon?: React.JSX.Element
}

export const ButtonBack = ({ name, className, icon }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant='outline'
      onClick={() => { router.back() }}
      className={className}
    >
      {icon}
      {name}
    </Button>
  )
}
