'use client'

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  VStack,
  HStack,
  StackItem,
} from '@astryxdesign/core/Layout'
import { Grid } from '@astryxdesign/core/Grid'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Heading, Text } from '@astryxdesign/core/Text'
import { Toolbar } from '@astryxdesign/core/Toolbar'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Badge } from '@astryxdesign/core/Badge'
import { Avatar } from '@astryxdesign/core/Avatar'
import { AvatarGroup, AvatarGroupOverflow } from '@astryxdesign/core/AvatarGroup'
import {
  WORKSPACES,
  workspaceStatusBadgeVariant,
  workspaceStatusLabel,
  formatDate,
} from './data.ts'

export default function WorkspaceListPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return WORKSPACES
    return WORKSPACES.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q),
    )
  }, [searchQuery])

  return (
    <Layout
      height="auto"
      header={
        <LayoutHeader hasDivider>
          <StackItem size="fill">
            <Heading level={1}>Workspaces</Heading>
          </StackItem>
        </LayoutHeader>
      }
      content={
        <LayoutContent padding={3}>
          <VStack gap={4}>
            <Toolbar
              label="Workspace filters"
              size="sm"
              dividers={['bottom']}
              startContent={
                <TextInput
                  label="Search workspaces"
                  isLabelHidden
                  placeholder="Search workspaces…"
                  value={searchQuery}
                  onChange={setSearchQuery}
                  startIcon="search"
                  hasClear
                />
              }
            />
            {filtered.length > 0 ? (
              <Grid columns={{ minWidth: 280, max: 3 }} gap={4} width="100%">
                {filtered.map((workspace) => (
                  <ClickableCard
                    key={workspace.id}
                    label={`Open ${workspace.name} workspace`}
                    href={`/workspaces/${workspace.id}`}
                    onClick={() => navigate(`/workspaces/${workspace.id}`)}
                  >
                    <VStack gap={3}>
                      <HStack gap={2} vAlign="start" hAlign="between">
                        <StackItem size="fill">
                          <Heading level={4}>{workspace.name}</Heading>
                        </StackItem>
                        <Badge
                          variant={workspaceStatusBadgeVariant(workspace.status)}
                          label={workspaceStatusLabel(workspace.status)}
                        />
                      </HStack>
                      <Text type="body" color="secondary">
                        {workspace.description}
                      </Text>
                      <HStack gap={2} vAlign="center" hAlign="between">
                        <VStack gap={0}>
                          <Text type="supporting" color="secondary">
                            Created
                          </Text>
                          <Text type="body">
                            {formatDate(workspace.createdAt)}
                          </Text>
                        </VStack>
                        <VStack gap={1} hAlign="end">
                          <Text type="supporting" color="secondary">
                            {workspace.members.length} members
                          </Text>
                          <AvatarGroup>
                            {workspace.members.slice(0, 4).map((member) => (
                              <Avatar
                                key={member.id}
                                name={member.name}
                                size="small"
                              />
                            ))}
                            {workspace.members.length > 4 ? (
                              <AvatarGroupOverflow
                                count={workspace.members.length - 4}
                              />
                            ) : null}
                          </AvatarGroup>
                        </VStack>
                      </HStack>
                    </VStack>
                  </ClickableCard>
                ))}
              </Grid>
            ) : (
              <VStack gap={2}>
                <Heading level={3}>No workspaces found</Heading>
                <Text type="body" color="secondary">
                  Try adjusting your search to find a workspace.
                </Text>
              </VStack>
            )}
          </VStack>
        </LayoutContent>
      }
    />
  )
}
