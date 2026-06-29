'use client'

import { useMemo, useState } from 'react'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  VStack,
  HStack,
  StackItem,
} from '@astryxdesign/core/Layout'
import { Heading } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Toolbar } from '@astryxdesign/core/Toolbar'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Selector } from '@astryxdesign/core/Selector'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Text } from '@astryxdesign/core/Text'
import { Badge } from '@astryxdesign/core/Badge'
import {
  Table,
  proportional,
  pixel,
  useTablePagination,
  paginateData,
} from '@astryxdesign/core/Table'
import type { TableColumn } from '@astryxdesign/core/Table'
import {
  INITIAL_EMPLOYEES,
  STATUS_FILTER_OPTIONS,
  matchesSearch,
  statusBadgeVariant,
  statusLabel,
  type Employee,
} from './data'
import EmployeeFormDialog from './EmployeeFormDialog'
import DeleteEmployeeDialog from './DeleteEmployeeDialog'

const PAGE_SIZE = 10

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [formOpen, setFormOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null,
  )

  const filtered = useMemo(
    () =>
      employees.filter(
        (e) =>
          matchesSearch(e, searchQuery) &&
          (statusFilter === '' || e.status === statusFilter),
      ),
    [employees, searchQuery, statusFilter],
  )

  const paginationPlugin = useTablePagination<Employee>({
    page,
    onPageChange: setPage,
    totalItems: filtered.length,
    pageSize: PAGE_SIZE,
    variant: 'count',
    size: 'sm',
  })

  const columns: TableColumn<Employee>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Name',
        width: proportional(2),
        renderCell: (item: Employee) => (
          <HStack gap={3} vAlign="center">
            <Avatar name={item.name} size="small" />
            <VStack gap={0}>
              <Text type="body">{item.name}</Text>
              <Text type="supporting" color="secondary">
                {item.department}
              </Text>
            </VStack>
          </HStack>
        ),
      },
      {
        key: 'email',
        header: 'Email',
        width: proportional(2),
        renderCell: (item: Employee) => (
          <Text type="body" color="secondary">
            {item.email}
          </Text>
        ),
      },
      {
        key: 'role',
        header: 'Role',
        width: proportional(1),
        renderCell: (item: Employee) => <Text type="body">{item.role}</Text>,
      },
      {
        key: 'status',
        header: 'Status',
        width: pixel(120),
        renderCell: (item: Employee) => (
          <Badge
            variant={statusBadgeVariant(item.status)}
            label={statusLabel(item.status)}
          />
        ),
      },
      {
        key: 'actions',
        header: 'Actions',
        width: pixel(160),
        renderCell: (item: Employee) => (
          <HStack gap={2}>
            <Button
              label="Edit"
              variant="secondary"
              size="sm"
              onClick={() => {
                setEditingEmployee(item)
                setFormOpen(true)
              }}
            />
            <Button
              label="Delete"
              variant="destructive"
              size="sm"
              onClick={() => setDeletingEmployee(item)}
            />
          </HStack>
        ),
      },
    ],
    [],
  )

  const handleSave = (employee: Employee) => {
    setEmployees((prev) => {
      const index = prev.findIndex((e) => e.id === employee.id)
      if (index >= 0) {
        const next = [...prev]
        next[index] = employee
        return next
      }
      return [...prev, employee]
    })
  }

  const handleDelete = (employee: Employee) => {
    setEmployees((prev) => prev.filter((e) => e.id !== employee.id))
  }

  const handleOpenCreate = () => {
    setEditingEmployee(null)
    setFormOpen(true)
  }

  return (
    <>
      <Layout
        height="auto"
        header={
          <LayoutHeader hasDivider>
            <HStack gap={2} vAlign="center">
              <StackItem size="fill">
                <Heading level={1}>Employees</Heading>
              </StackItem>
              <Button label="Add employee" variant="primary" onClick={handleOpenCreate} />
            </HStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent padding={3}>
            <VStack gap={4}>
              <Toolbar
                label="Employee filters"
                size="sm"
                dividers={['bottom']}
                startContent={
                  <>
                    <TextInput
                      label="Search employees"
                      isLabelHidden
                      placeholder="Search employees…"
                      value={searchQuery}
                      onChange={(value) => {
                        setSearchQuery(value)
                        setPage(1)
                      }}
                      startIcon="search"
                      hasClear
                    />
                    <Selector
                      label="Status"
                      isLabelHidden
                      options={STATUS_FILTER_OPTIONS}
                      value={statusFilter}
                      onChange={(value) => {
                        setStatusFilter(value ?? '')
                        setPage(1)
                      }}
                      placeholder="All statuses"
                      hasClear
                    />
                  </>
                }
              />
              <Table<Employee>
                data={paginateData(filtered, page, PAGE_SIZE)}
                columns={columns}
                idKey="id"
                density="balanced"
                dividers="rows"
                hasHover
                plugins={{ pagination: paginationPlugin }}
              />
            </VStack>
          </LayoutContent>
        }
      />
      <EmployeeFormDialog
        isOpen={formOpen}
        onOpenChange={setFormOpen}
        employee={editingEmployee}
        onSave={handleSave}
      />
      <DeleteEmployeeDialog
        employee={deletingEmployee}
        onOpenChange={() => setDeletingEmployee(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
