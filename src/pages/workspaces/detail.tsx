'use client'

import { useNavigate, useParams } from 'react-router-dom'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  VStack,
  HStack,
  StackItem,
  Section,
} from '@astryxdesign/core/Layout'
import { Heading, Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Badge } from '@astryxdesign/core/Badge'
import { Avatar } from '@astryxdesign/core/Avatar'
import { List, ListItem } from '@astryxdesign/core/List'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import { Icon } from '@astryxdesign/core/Icon'
import {
  getWorkspaceById,
  workspaceStatusBadgeVariant,
  workspaceStatusLabel,
  formatDate,
} from './data.ts'

export default function WorkspaceDetailPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const navigate = useNavigate()
  const workspace = workspaceId ? getWorkspaceById(workspaceId) : undefined

  if (!workspace) {
    return (
      <Layout
        height="auto"
        content={
          <LayoutContent padding={3}>
            <VStack gap={3}>
              <Heading level={2}>Workspace not found</Heading>
              <Text type="body" color="secondary">
                The workspace you are looking for does not exist or was removed.
              </Text>
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
              label="Back"
              variant="ghost"
              icon={<Icon icon="chevronLeft" size="sm" />}
              onClick={() => navigate('/workspaces')}
            />
            <StackItem size="fill">
              <Heading level={1}>{workspace.name}</Heading>
            </StackItem>
            <Button
              label="View agents"
              variant="primary"
              onClick={() => navigate(`/workspaces/${workspace.id}/agents`)}
            />
          </HStack>
        </LayoutHeader>
      }
      content={
        <LayoutContent padding={3}>
          <VStack gap={6}>
            <Section>
              <MetadataList title="Workspace details">
                <MetadataListItem label="Name">
                  {workspace.name}
                </MetadataListItem>
                <MetadataListItem label="Description">
                  {workspace.description}
                </MetadataListItem>
                <MetadataListItem label="Created">
                  {formatDate(workspace.createdAt)}
                </MetadataListItem>
                <MetadataListItem label="Status">
                  <Badge
                    variant={workspaceStatusBadgeVariant(workspace.status)}
                    label={workspaceStatusLabel(workspace.status)}
                  />
                </MetadataListItem>
              </MetadataList>
            </Section>

            <Section>
              <List
                header={
                  <Heading level={3}>
                    Members ({workspace.members.length})
                  </Heading>
                }
                hasDividers
              >
                {workspace.members.map((member) => (
                  <ListItem
                    key={member.id}
                    label={member.name}
                    description={member.email}
                    startContent={<Avatar name={member.name} size="small" />}
                    endContent={
                      <Badge variant="neutral" label={member.role} />
                    }
                  />
                ))}
              </List>
            </Section>
          </VStack>
        </LayoutContent>
      }
    />
  )
}
