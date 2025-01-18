'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { HiPencil, HiSwitchHorizontal } from 'react-icons/hi'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { toast } from 'sonner'
import { ChangeRoleModal } from './ChangeRoleModal'
import { toggleUserStatus } from '@/actions/users/toggle-user-status'
import { noticeFailure, noticeSuccess } from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Props {
  user: {
    id: string
    name: string
    email: string
    phoneNumber: string | null
    role: string
    isActive: boolean
  }
  variant?: 'ghost' | 'outline'
}
export const MenuOptionsUser = ({ user, variant = 'ghost' }: Props) => {
  const { id, isActive, name, role } = user
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false)

  const openConfirmationDelete = () => {
    toast('Desactivar usuario', {
      description: `¿Estás seguro? Se ${isActive ? 'desactivara' : 'activara'
        } el usuario ${name} y ${isActive ? 'no podrá' : 'podrá'} acceder a la plataforma`,
      position: 'top-right',
      duration: Infinity,
      className: 'grid grid-cols-[1fr,110px] items-start justify-center text-sm p-2 col-span-2 pb-4',
      classNames: {
        content: 'flex items-start justify-center text-sm col-span-4 p-2'
      },
      actionButtonStyle: {
        color: 'white',
        backgroundColor: '#000000',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      },
      action: {
        label: 'Confirmar',
        onClick: async () => { await handleToggleUserStatus(id, isActive) }
      },
      cancel:
      {
        label: 'Cancelar',
        onClick: () => { toast.dismiss() }
      },
      cancelButtonStyle: {
        color: 'white',
        backgroundColor: 'red',
        borderRadius: '0px',
        font: 'message-box',
        padding: '0.5rem 1rem',
        height: '2rem'
      }
    })
  }

  const handleToggleUserStatus = async (id: string, status: boolean) => {
    const { ok, message } = await toggleUserStatus({ id, status })

    if (!ok) {
      noticeFailure(message)
      return
    }

    noticeSuccess(message)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={'sm'}
          >
            <IoEllipsisHorizontalSharp className="h-4 w-4" />
            <span className='hidden min-[585px]:block sm:hidden'>Más</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Seleccione</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='hidden sm:block'>
            <Link
              href={`/profile/${id}`}
              className="flex gap-1 items-center">
              <HiPencil className='h-4 w-4 mr-1' />
              Editar
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => { setIsChangeRoleModalOpen(true) }}>
            <button
              className="flex gap-1 items-center">
              <HiSwitchHorizontal className='h-4 w-4 mr-1' />
              Cambiar role
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className="flex gap-1 items-center"
              onClick={() => { openConfirmationDelete() }}
            >
              {isActive
                ? (
                  <>
                    <BsToggleOn className="h-4 w-4 mr-1" />
                    Desactivar
                  </>)
                : (
                  <>
                    <BsToggleOff className="h-4 w-4 mr-1" />
                    Activar
                  </>)
              }
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
      <ChangeRoleModal
        isOpen={isChangeRoleModalOpen}
        onClose={() => { setIsChangeRoleModalOpen(false) }}
        userId={id}
        currentRole={role}
      />
    </>
  )
}
