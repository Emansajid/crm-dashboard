import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3, LayoutDashboard, Users, TrendingUp,
  Briefcase, CheckSquare, Settings, LogOut,
  ChevronLeft, ChevronRight, Calendar, Bell, FileBarChart2, Clock
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: TrendingUp, label: 'Leads', path: '/leads' },
  { icon: Briefcase, label: 'Employees', path: '/employees' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Clock, label: 'Meetings', path: '/meetings' },
  { icon: FileBarChart2, label: 'Reports', path: '/reports' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside style={{ ...styles.sidebar, width: collapsed ? '68px' : '230px' }}>
      <div style={styles.brand}>
        <div style={styles.logoBox}>
          <BarChart3 size={20} color="#fff" />
        </div>
        {!collapsed && <span style={styles.brandName}>NexaCRM</span>}
      </div>

      <nav style={styles.nav}>
        {!collapsed && <p style={styles.navLabel}>MAIN MENU</p>}
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path
          return (
            <Link key={path} to={path} title={collapsed ? label : ''} style={{
              ...styles.navItem,
              background: active ? 'rgba(37,99,235,0.15)' : 'transparent',
              color: active ? '#60a5fa' : '#94a3b8',
              borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
            }}>
              <Icon size={18} />
              {!collapsed && <span style={styles.navLabel2}>{label}</span>}
            </Link>
          )
        })}
      </nav>

      <div style={styles.bottom}>
        <Link to="/" style={{ ...styles.navItem, color: '#ef4444' }}>
          <LogOut size={18} />
          {!collapsed && <span style={styles.navLabel2}>Logout</span>}
        </Link>
        <button onClick={() => setCollapsed(!collapsed)} style={styles.collapseBtn} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}

const styles = {
  sidebar: { background: '#0f172a', height: '100vh', display: 'flex', flexDirection: 'column', transition: 'width 0.25s ease', position: 'sticky', top: 0, flexShrink: 0, overflow: 'hidden' },
  brand: { display: 'flex', alignItems: 'center', gap: '12px', padding: '22px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logoBox: { width: '36px', height: '36px', background: '#2563eb', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  brandName: { fontSize: '17px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap' },
  nav: { flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' },
  navLabel: { fontSize: '10px', fontWeight: '700', color: '#475569', letterSpacing: '1px', padding: '4px 10px 10px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', fontSize: '13.5px', fontWeight: '500', transition: 'all 0.15s', whiteSpace: 'nowrap', textDecoration: 'none' },
  navLabel2: { fontSize: '13.5px' },
  bottom: { padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '4px' },
  collapseBtn: { width: '100%', padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' },
}
