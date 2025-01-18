'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { ChangeRoleModal } from '../user-table/ChangeRoleModal'
import { MenuOptionsUser } from '../user-table/MenuOptions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  user: {
    id: string
    name: string
    email: string
    phoneNumber: string | null
    role: string
    isActive: boolean
  }
}

export const CardUser = ({ user }: Props) => {
  const { id, role } = user
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <Avatar className="bg-gray-200 text-gray-600 h-12 w-12 rounded-full">
              <AvatarImage src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" />
              <AvatarFallback>BC</AvatarFallback>
            </Avatar>
            <CardTitle className="group flex items-center gap-2 text-lg mt-1">{user.name}</CardTitle>
            <CardDescription className="text-gray-500 text-sm">{user.email}</CardDescription>
            <CardDescription className="text-gray-500 text-sm">{user.phoneNumber}</CardDescription>
            <CardDescription className="text-gray-500 text-sm capitalize">{user.role}</CardDescription>
            {
              user.isActive
                ? (
                  <CardDescription className="text-gray-500 text-sm">Activo</CardDescription>)
                : (
                  <CardDescription className="text-gray-500 text-sm">Inactivo</CardDescription>)
            }
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              asChild size="sm"
              variant="outline"
              className="flex gap-1 items-center"
            >
              <Link
                href={`/profile/${user.id}`}
              >
                <BsPencil className="h-4 w-4" />
                <span className='hidden min-[585px]:block'>Editar</span>
              </Link>
            </Button>
            <MenuOptionsUser user={user} variant='outline' />
          </div>
        </CardHeader>
      </Card>
      <ChangeRoleModal
        isOpen={isChangeRoleModalOpen}
        onClose={() => { setIsChangeRoleModalOpen(false) }}
        userId={id}
        currentRole={role}
      />
    </>
  )
}
