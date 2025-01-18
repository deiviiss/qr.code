'use client'

import { useState } from 'react'
import { changeUserRole } from '@/actions/users/change-user-role'
import { noticeFailure, noticeSuccess } from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ChangeRoleModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  currentRole: string
}

export function ChangeRoleModal({ isOpen, onClose, userId, currentRole }: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState(currentRole)

  const handleRoleChange = async () => {
    if (selectedRole === currentRole) {
      noticeFailure('El rol seleccionado es el mismo que el actual')
      return
    }

    try {
      const { ok, message } = await changeUserRole(userId, selectedRole)
      if (!ok) {
        noticeFailure(message)
        return
      }
      noticeSuccess(message)
      onClose()
    } catch (error) {
      noticeFailure('Error al actualizar el rol')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Rol de Usuario</DialogTitle>
        </DialogHeader>
        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Usuario</SelectItem>
            <SelectItem value="admin">Administrador</SelectItem>
          </SelectContent>
        </Select>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleRoleChange}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
