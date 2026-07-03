import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import CustomerList from './pages/customers/CustomerList'
import AddCustomer from './pages/customers/AddCustomer'
import CustomerProfile from './pages/customers/CustomerProfile'
import LeadManagement from './pages/leads/LeadManagement'
import AddLead from './pages/leads/AddLead'
import EmployeeList from './pages/employees/EmployeeList'
import EmployeeProfile from './pages/employees/EmployeeProfile'
import TaskList from './pages/tasks/TaskList'
import CreateTask from './pages/tasks/CreateTask'
import CalendarPage from './pages/calendar/CalendarPage'
import MeetingScheduler from './pages/calendar/MeetingScheduler'
import ReportsDashboard from './pages/reports/ReportsDashboard'
import NotificationsPage from './pages/notifications/NotificationsPage'
import SettingsPage from './pages/settings/SettingsPage'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/:id" element={<CustomerProfile />} />
        <Route path="/leads" element={<LeadManagement />} />
        <Route path="/leads/add" element={<AddLead />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/meetings" element={<MeetingScheduler />} />
        <Route path="/reports" element={<ReportsDashboard />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
