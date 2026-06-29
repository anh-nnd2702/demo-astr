'use client'

import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  VStack,
  HStack,
  StackItem,
} from '@astryxdesign/core/Layout'
import { Heading, Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Badge } from '@astryxdesign/core/Badge'
import { Table, proportional, pixel } from '@astryxdesign/core/Table'
import type { TableColumn } from '@astryxdesign/core/Table'
import { Icon } from '@astryxdesign/core/Icon'
import {
  getWorkspaceById,
  getAgentsByWorkspace,
  agentStatusBadgeVariant,
  agentStatusLabel,
  type Agent,
} from './data.ts'

export default function WorkspaceAgentsPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const navigate = useNavigate()
  const workspace = workspaceId ? getWorkspaceById(workspaceId) : undefined
  const agents = workspaceId ? getAgentsByWorkspace(workspaceId) : []

  const columns: TableColumn<Agent>[] = useMemo(
    () => [
      {
        key: 'name',
        header: 'Agent',
        width: proportional(2),
        renderCell: (item: Agent) => (
          <Text type="body" weight="semibold">
            {item.name}
          </Text>
        ),
      },
      {
        key: 'description',
        header: 'Description',
        width: proportional(3),
        renderCell: (item: Agent) => (
          <Text type="body" color="secondary">
            {item.description}
          </Text>
        ),
      },
      {
        key: 'model',
        header: 'Model',
        width: proportional(1),
        renderCell: (item: Agent) => (
          <Text type="body" color="secondary">
            {item.model}
          </Text>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        width: pixel(120),
        renderCell: (item: Agent) => (
          <Badge
            variant={agentStatusBadgeVariant(item.status)}
            label={agentStatusLabel(item.status)}
          />
        ),
      },
    ],
    [],
  )

  if (!workspace) {
    return (
      <Layout
        height="auto"
        content={
          <LayoutContent padding={3}>
            <VStack gap={3}>
              <Heading level={2}>Workspace not found</Heading>
              <Button
                label="Back to workspaces"
                variant="secondary"
                onClick={() => navigate('/workspaces')}
              />
            </VStack>
          </LayoutContent>
        }
      />
    )
  }

  return (
    <Layout
      height="auto"
      header={
        <LayoutHeader hasDivider>
          <HStack gap={2} vAlign="center">
            <Button
              label="Back to workspace"
              variant="ghost"
              icon={<Icon icon="chevronLeft" size="sm" />}
              onClick={() => navigate(`/workspaces/${workspace.id}`)}
            />
            <StackItem size="fill">
              <VStack gap={0}>
                <Heading level={1}>Agents</Heading>
                <Text type="supporting" color="secondary">
                  {workspace.name}
                </Text>
              </VStack>
            </StackItem>
          </HStack>
        </LayoutHeader>
      }
      content={
        <LayoutContent padding={3}>
          {agents.length > 0 ? (
            <Table<Agent>
              data={agents}
              columns={columns}
              idKey="id"
              density="balanced"
              dividers="rows"
              hasHover
            />
          ) : (
            <VStack gap={3}>
              <Heading level={3}>No agents yet</Heading>
              <Text type="body" color="secondary">
                This workspace does not have any agents configured.
              </Text>
              <Button
                label="Back to workspace"
                variant="secondary"
                onClick={() => navigate(`/workspaces/${workspace.id}`)}
              />
            </VStack>
          )}
        </LayoutContent>
      }
    />
  )
}
