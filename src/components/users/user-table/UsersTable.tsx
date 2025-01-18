'use client'

import { MenuOptionsUser } from './MenuOptions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { type User } from '@/interfaces/users/user.interface'

interface Props {
  users: User[]
}

export const UsersTable = ({ users }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Correo electrónico</TableHead>
          <TableHead>Nombre completo</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead className="text-right">Role</TableHead>
          <TableHead className="text-right">Status</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell className="text-right capitalize">{user.role}</TableCell>
            <TableCell className="text-right">{user.isActive ? 'Activo' : 'Inactivo'}</TableCell>
            <TableCell>
              <MenuOptionsUser user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
