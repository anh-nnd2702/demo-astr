export type WorkspaceStatus = 'active' | 'archived' | 'suspended'
export type AgentStatus = 'active' | 'inactive' | 'draft'

export interface WorkspaceMember {
  id: string
  name: string
  email: string
  role: string
}

export interface Workspace extends Record<string, unknown> {
  id: string
  name: string
  description: string
  createdAt: string
  status: WorkspaceStatus
  members: WorkspaceMember[]
}

export interface Agent extends Record<string, unknown> {
  id: string
  workspaceId: string
  name: string
  description: string
  status: AgentStatus
  model: string
}

export const WORKSPACES: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Customer Support',
    description:
      'Handles inbound support tickets, triage, and escalation workflows for the help desk team.',
    createdAt: '2025-08-12',
    status: 'active',
    members: [
      { id: 'm1', name: 'Olivia Chen', email: 'olivia.chen@example.com', role: 'Owner' },
      { id: 'm2', name: 'Marcus Rivera', email: 'marcus.rivera@example.com', role: 'Admin' },
      { id: 'm3', name: 'Aisha Patel', email: 'aisha.patel@example.com', role: 'Member' },
    ],
  },
  {
    id: 'ws-2',
    name: 'Sales Operations',
    description:
      'Pipeline enrichment, lead scoring, and outbound sequence drafting for the revenue team.',
    createdAt: '2025-09-03',
    status: 'active',
    members: [
      { id: 'm4', name: 'James Okafor', email: 'james.okafor@example.com', role: 'Owner' },
      { id: 'm5', name: 'Sofia Nguyen', email: 'sofia.nguyen@example.com', role: 'Member' },
      { id: 'm6', name: 'David Kim', email: 'david.kim@example.com', role: 'Member' },
      { id: 'm7', name: 'Elena Kowalski', email: 'elena.kowalski@example.com', role: 'Viewer' },
    ],
  },
  {
    id: 'ws-3',
    name: 'Engineering Docs',
    description:
      'Internal documentation assistant for API references, runbooks, and onboarding guides.',
    createdAt: '2025-10-21',
    status: 'active',
    members: [
      { id: 'm8', name: 'Noah Tanaka', email: 'noah.tanaka@example.com', role: 'Owner' },
      { id: 'm9', name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'Admin' },
    ],
  },
  {
    id: 'ws-4',
    name: 'Legacy Integrations',
    description:
      'Deprecated workspace kept for audit history of retired automation agents.',
    createdAt: '2024-03-15',
    status: 'archived',
    members: [
      { id: 'm10', name: 'Carlos Mendez', email: 'carlos.mendez@example.com', role: 'Owner' },
    ],
  },
  {
    id: 'ws-5',
    name: 'Compliance Review',
    description:
      'Policy checks, document redaction suggestions, and audit trail summaries.',
    createdAt: '2025-11-02',
    status: 'suspended',
    members: [
      { id: 'm11', name: 'Fatima Al-Rashid', email: 'fatima.alrashid@example.com', role: 'Owner' },
      { id: 'm12', name: 'Ryan Brooks', email: 'ryan.brooks@example.com', role: 'Member' },
      { id: 'm13', name: 'Hannah Mueller', email: 'hannah.mueller@example.com', role: 'Viewer' },
    ],
  },
]

export const AGENTS: Agent[] = [
  {
    id: 'ag-1',
    workspaceId: 'ws-1',
    name: 'Ticket Triage',
    description: 'Classifies and routes incoming support tickets by urgency and topic.',
    status: 'active',
    model: 'gpt-4.1',
  },
  {
    id: 'ag-2',
    workspaceId: 'ws-1',
    name: 'Reply Draft',
    description: 'Drafts customer-facing responses from knowledge base articles.',
    status: 'active',
    model: 'gpt-4.1-mini',
  },
  {
    id: 'ag-3',
    workspaceId: 'ws-1',
    name: 'Escalation Summary',
    description: 'Summarizes long threads before handoff to tier-2 support.',
    status: 'draft',
    model: 'gpt-4.1',
  },
  {
    id: 'ag-4',
    workspaceId: 'ws-2',
    name: 'Lead Enrichment',
    description: 'Enriches CRM records with firmographic and intent signals.',
    status: 'active',
    model: 'gpt-4.1',
  },
  {
    id: 'ag-5',
    workspaceId: 'ws-2',
    name: 'Sequence Writer',
    description: 'Generates personalized outbound email sequences.',
    status: 'active',
    model: 'gpt-4.1-mini',
  },
  {
    id: 'ag-6',
    workspaceId: 'ws-3',
    name: 'API Doc Search',
    description: 'Answers engineering questions using internal API documentation.',
    status: 'active',
    model: 'gpt-4.1',
  },
  {
    id: 'ag-7',
    workspaceId: 'ws-3',
    name: 'Runbook Assistant',
    description: 'Walks engineers through incident runbooks step by step.',
    status: 'inactive',
    model: 'gpt-4.1-mini',
  },
  {
    id: 'ag-8',
    workspaceId: 'ws-5',
    name: 'Policy Checker',
    description: 'Flags policy violations in uploaded documents.',
    status: 'active',
    model: 'gpt-4.1',
  },
]

export function getWorkspaceById(id: string): Workspace | undefined {
  return WORKSPACES.find((w) => w.id === id)
}

export function getAgentsByWorkspace(workspaceId: string): Agent[] {
  return AGENTS.filter((a) => a.workspaceId === workspaceId)
}

export function workspaceStatusBadgeVariant(
  status: WorkspaceStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success'
    case 'suspended':
      return 'warning'
    case 'archived':
      return 'neutral'
  }
}

export function workspaceStatusLabel(status: WorkspaceStatus): string {
  switch (status) {
    case 'active':
      return 'Active'
    case 'archived':
      return 'Archived'
    case 'suspended':
      return 'Suspended'
  }
}

export function agentStatusBadgeVariant(
  status: AgentStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success'
    case 'draft':
      return 'warning'
    case 'inactive':
      return 'neutral'
  }
}

export function agentStatusLabel(status: AgentStatus): string {
  switch (status) {
    case 'active':
      return 'Active'
    case 'draft':
      return 'Draft'
    case 'inactive':
      return 'Inactive'
  }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
