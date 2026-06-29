'use client'

import { AlertDialog } from '@astryxdesign/core/AlertDialog'
import type { Employee } from './data'

interface DeleteEmployeeDialogProps {
  employee: Employee | null
  onOpenChange: (isOpen: boolean) => void
  onConfirm: (employee: Employee) => void
}

export default function DeleteEmployeeDialog({
  employee,
  onOpenChange,
  onConfirm,
}: DeleteEmployeeDialogProps) {
  const isOpen = employee !== null

  return (
    <AlertDialog
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onOpenChange(false)
      }}
      title="Delete employee?"
      description={
        employee
          ? `${employee.name} will be permanently removed from the employee directory. This action cannot be undone.`
          : ''
      }
      actionLabel="Delete employee"
      actionVariant="destructive"
      onAction={() => {
        if (employee) {
          onConfirm(employee)
          onOpenChange(false)
        }
      }}
    />
  )
}
