'use client'

import { TopNav, TopNavHeading } from '@astryxdesign/core/TopNav'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { Icon } from '@astryxdesign/core/Icon'
import { IconButton } from '@astryxdesign/core/IconButton'
import { DropdownMenu } from '@astryxdesign/core/DropdownMenu'
import { Avatar } from '@astryxdesign/core/Avatar'
import { HStack, VStack } from '@astryxdesign/core/Layout'
import { Text } from '@astryxdesign/core/Text'

const CURRENT_USER = {
  name: 'Alex Morgan',
  role: 'HR Administrator',
  email: 'alex.morgan@example.com',
}

export default function AppTopNav() {
  return (
    <TopNav
      label="Main navigation"
      heading={
        <TopNavHeading
          heading="PeopleHub"
          subheading="Organization portal"
          logo={<NavIcon icon={<Icon icon="wrench" size="sm" />} />}
        />
      }
      endContent={
        <HStack gap={1} vAlign="center">
          <IconButton
            label="Settings"
            variant="ghost"
            icon={<Icon icon="wrench" color="inherit" />}
            tooltip="Settings"
          />
          <IconButton
            label="Notifications"
            variant="ghost"
            icon={<Icon icon="info" color="inherit" />}
            tooltip="Notifications"
          />
          <DropdownMenu
            button={{
              label: `${CURRENT_USER.name}, ${CURRENT_USER.role}`,
              variant: 'ghost',
              children: (
                <HStack gap={2} vAlign="center">
                  <Avatar name={CURRENT_USER.name} size="small" />
                  <VStack gap={0}>
                    <Text type="body" weight="semibold">
                      {CURRENT_USER.name}
                    </Text>
                    <Text type="supporting" color="secondary">
                      {CURRENT_USER.role}
                    </Text>
                  </VStack>
                </HStack>
              ),
            }}
            hasChevron
            items={[
              {
                type: 'section',
                title: CURRENT_USER.email,
                items: [
                  { label: 'Profile', onClick: () => {} },
                  { label: 'Account settings', onClick: () => {} },
                ],
              },
              { type: 'divider' },
              { label: 'Sign out', onClick: () => {} },
            ]}
          />
        </HStack>
      }
    />
  )
}
