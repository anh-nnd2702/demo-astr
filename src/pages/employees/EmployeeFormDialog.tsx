'use client'

import { useState } from 'react'
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog'
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  HStack,
  VStack,
} from '@astryxdesign/core/Layout'
import { Button } from '@astryxdesign/core/Button'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Selector } from '@astryxdesign/core/Selector'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import {
  DEPARTMENT_OPTIONS,
  STATUS_OPTIONS,
  type Employee,
} from './data'

interface EmployeeFormDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  employee: Employee | null
  onSave: (employee: Employee) => void
}

interface FormBodyProps {
  employee: Employee | null
  onClose: () => void
  onSave: (employee: Employee) => void
}

function FormBody({ employee, onClose, onSave }: FormBodyProps) {
  const isEditing = employee !== null
  const [name, setName] = useState(employee?.name ?? '')
  const [email, setEmail] = useState(employee?.email ?? '')
  const [department, setDepartment] = useState(employee?.department ?? '')
  const [role, setRole] = useState(employee?.role ?? '')
  const [status, setStatus] = useState<string>(employee?.status ?? 'active')
  const [submitted, setSubmitted] = useState(false)

  const nameError =
    submitted && !name.trim() ? 'Name is required' : undefined
  const emailError =
    submitted && !email.trim() ? 'Email is required' : undefined
  const departmentError =
    submitted && !department ? 'Department is required' : undefined
  const roleError =
    submitted && !role.trim() ? 'Role is required' : undefined

  const handleSave = () => {
    setSubmitted(true)
    if (!name.trim() || !email.trim() || !department || !role.trim()) {
      return
    }
    onSave({
      id: employee?.id ?? crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      department,
      role: role.trim(),
      status: status as Employee['status'],
    })
    onClose()
  }

  return (
    <Layout
      header={
        <DialogHeader
          title={isEditing ? 'Edit employee' : 'Add employee'}
          subtitle={
            isEditing
              ? 'Update employee details'
              : 'Enter details for the new employee'
          }
          onOpenChange={onClose}
        />
      }
      content={
        <LayoutContent>
          <FormLayout>
            <VStack gap={4}>
              <TextInput
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Full name"
                isRequired
                status={
                  nameError ? { type: 'error', message: nameError } : undefined
                }
              />
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="name@company.com"
                isRequired
                status={
                  emailError ? { type: 'error', message: emailError } : undefined
                }
              />
              <Selector
                label="Department"
                options={DEPARTMENT_OPTIONS}
                value={department}
                onChange={setDepartment}
                placeholder="Select department"
                isRequired
                status={
                  departmentError
                    ? { type: 'error', message: departmentError }
                    : undefined
                }
              />
              <TextInput
                label="Role"
                value={role}
                onChange={setRole}
                placeholder="Job title"
                isRequired
                status={
                  roleError ? { type: 'error', message: roleError } : undefined
                }
              />
              <Selector
                label="Status"
                options={STATUS_OPTIONS}
                value={status}
                onChange={setStatus}
                isRequired
              />
            </VStack>
          </FormLayout>
        </LayoutContent>
      }
      footer={
        <LayoutFooter>
          <HStack gap={2} hAlign="end">
            <Button label="Cancel" variant="secondary" onClick={onClose} />
            <Button label="Save" variant="primary" onClick={handleSave} />
          </HStack>
        </LayoutFooter>
      }
    />
  )
}

export default function EmployeeFormDialog({
  isOpen,
  onOpenChange,
  employee,
  onSave,
}: EmployeeFormDialogProps) {
  const handleClose = () => onOpenChange(false)

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      purpose="form"
      width={480}
    >
      {isOpen ? (
        <FormBody
          key={employee?.id ?? 'create'}
          employee={employee}
          onClose={handleClose}
          onSave={onSave}
        />
      ) : null}
    </Dialog>
  )
}
