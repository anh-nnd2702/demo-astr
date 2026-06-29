'use client'

import { useLocation, useNavigate } from 'react-router-dom'
import { SideNav, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav'

export default function AppSideNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isEmployees = location.pathname.startsWith('/employees')
  const isWorkspaces = location.pathname.startsWith('/workspaces')

  return (
    <SideNav>
      <SideNavSection title="Organization" isHeaderHidden>
        <SideNavItem
          label="Employees"
          isSelected={isEmployees}
          onClick={() => navigate('/employees')}
        />
        <SideNavItem
          label="Workspaces"
          isSelected={isWorkspaces}
          onClick={() => navigate('/workspaces')}
        />
        <SideNavItem label="Settings" icon="wrench" isDisabled />
      </SideNavSection>
    </SideNav>
  )
}
