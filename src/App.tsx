import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShellLayout from './layout/AppShellLayout.tsx'
import EmployeeManagementPage from './pages/employees/page.tsx'
import WorkspaceListPage from './pages/workspaces/page.tsx'
import WorkspaceDetailPage from './pages/workspaces/detail.tsx'
import WorkspaceAgentsPage from './pages/workspaces/agents.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShellLayout />}>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeManagementPage />} />
          <Route path="/workspaces" element={<WorkspaceListPage />} />
          <Route
            path="/workspaces/:workspaceId"
            element={<WorkspaceDetailPage />}
          />
          <Route
            path="/workspaces/:workspaceId/agents"
            element={<WorkspaceAgentsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
