'use client'

import { Outlet } from 'react-router-dom'
import { AppShell } from '@astryxdesign/core/AppShell'
import AppTopNav from './AppTopNav.tsx'
import AppSideNav from './AppSideNav.tsx'

export default function AppShellLayout() {
  return (
    <AppShell contentPadding={0} topNav={<AppTopNav />} sideNav={<AppSideNav />}>
      <Outlet />
    </AppShell>
  )
}
