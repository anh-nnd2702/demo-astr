export type EmployeeStatus = 'active' | 'inactive' | 'on-leave'

export interface Employee extends Record<string, unknown> {
  id: string
  name: string
  email: string
  department: string
  role: string
  status: EmployeeStatus
}

export const DEPARTMENT_OPTIONS = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Finance', label: 'Finance' },
]

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on-leave', label: 'On leave' },
]

export const STATUS_FILTER_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on-leave', label: 'On leave' },
]

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Olivia Chen', email: 'olivia.chen@example.com', department: 'Engineering', role: 'Senior Engineer', status: 'active' },
  { id: '2', name: 'Marcus Rivera', email: 'marcus.rivera@example.com', department: 'Design', role: 'Product Designer', status: 'active' },
  { id: '3', name: 'Aisha Patel', email: 'aisha.patel@example.com', department: 'Marketing', role: 'Marketing Manager', status: 'on-leave' },
  { id: '4', name: 'James Okafor', email: 'james.okafor@example.com', department: 'Engineering', role: 'Staff Engineer', status: 'active' },
  { id: '5', name: 'Sofia Nguyen', email: 'sofia.nguyen@example.com', department: 'Sales', role: 'Account Executive', status: 'active' },
  { id: '6', name: 'Liam Johansson', email: 'liam.johansson@example.com', department: 'Engineering', role: 'Engineer', status: 'inactive' },
  { id: '7', name: 'Elena Kowalski', email: 'elena.kowalski@example.com', department: 'Design', role: 'UX Researcher', status: 'active' },
  { id: '8', name: 'David Kim', email: 'david.kim@example.com', department: 'Marketing', role: 'Content Strategist', status: 'active' },
  { id: '9', name: 'Priya Sharma', email: 'priya.sharma@example.com', department: 'Sales', role: 'Sales Lead', status: 'on-leave' },
  { id: '10', name: 'Noah Tanaka', email: 'noah.tanaka@example.com', department: 'Engineering', role: 'Engineering Manager', status: 'active' },
  { id: '11', name: 'Fatima Al-Rashid', email: 'fatima.alrashid@example.com', department: 'Human Resources', role: 'HR Business Partner', status: 'active' },
  { id: '12', name: 'Carlos Mendez', email: 'carlos.mendez@example.com', department: 'Finance', role: 'Financial Analyst', status: 'inactive' },
  { id: '13', name: 'Emma Wilson', email: 'emma.wilson@example.com', department: 'Engineering', role: 'Frontend Engineer', status: 'active' },
  { id: '14', name: 'Ryan Brooks', email: 'ryan.brooks@example.com', department: 'Design', role: 'Visual Designer', status: 'active' },
  { id: '15', name: 'Yuki Sato', email: 'yuki.sato@example.com', department: 'Marketing', role: 'Growth Marketer', status: 'active' },
  { id: '16', name: 'Amara Osei', email: 'amara.osei@example.com', department: 'Sales', role: 'Sales Operations', status: 'inactive' },
  { id: '17', name: 'Lucas Ferreira', email: 'lucas.ferreira@example.com', department: 'Engineering', role: 'DevOps Engineer', status: 'active' },
  { id: '18', name: 'Hannah Mueller', email: 'hannah.mueller@example.com', department: 'Human Resources', role: 'Recruiter', status: 'on-leave' },
  { id: '19', name: 'Omar Hassan', email: 'omar.hassan@example.com', department: 'Finance', role: 'Controller', status: 'active' },
  { id: '20', name: 'Chloe Martin', email: 'chloe.martin@example.com', department: 'Design', role: 'Design Lead', status: 'active' },
]

export function statusBadgeVariant(
  status: EmployeeStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success'
    case 'on-leave':
      return 'warning'
    case 'inactive':
      return 'neutral'
  }
}

export function statusLabel(status: EmployeeStatus): string {
  return STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

export function matchesSearch(employee: Employee, query: string): boolean {
  if (!query.trim()) return true
  const q = query.trim().toLowerCase()
  return (
    employee.name.toLowerCase().includes(q) ||
    employee.email.toLowerCase().includes(q) ||
    employee.department.toLowerCase().includes(q) ||
    employee.role.toLowerCase().includes(q)
  )
}
