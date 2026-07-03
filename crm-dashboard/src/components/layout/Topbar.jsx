import { useState } from 'react'
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const notifications = [
  { id: 1, text: 'New lead assigned to you', time: '5 min ago', unread: true },
  { id: 2, text: 'Task "Follow up with client" is due today', time: '1 hr ago', unread: true },
  { id: 3, text: 'Monthly report is ready', time: '3 hrs ago', unread: false },
]

export default function Topbar({ pageTitle }) {
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header style={styles.topbar}>
      {/* Page Title */}
      <div>
        <h2 style={styles.pageTitle}>{pageTitle || 'Dashboard'}</h2>
        <p style={styles.breadcrumb}>Home / {pageTitle || 'Dashboard'}</p>
      </div>

      {/* Right Controls */}
      <div style={styles.right}>
        {/* Search */}
        <div style={styles.searchBox}>
          <Search size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search..."
            style={styles.searchInput}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false) }}
            style={styles.iconBtn}
          >
            <Bell size={18} color="#64748b" />
            {unreadCount > 0 && (
              <span style={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {showNotif && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>
                <span style={styles.dropdownTitle}>Notifications</span>
                <span style={{ fontSize: '12px', color: '#2563eb', cursor: 'pointer' }}>Mark all read</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{
                  ...styles.notifItem,
                  background: n.unread ? '#eff6ff' : 'transparent'
                }}>
                  <div style={styles.notifDot(n.unread)} />
                  <div>
                    <p style={styles.notifText}>{n.text}</p>
                    <p style={styles.notifTime}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false) }}
            style={styles.profileBtn}
          >
            <div style={styles.avatar}>A</div>
            <div style={styles.profileInfo}>
              <span style={styles.profileName}>Admin User</span>
              <span style={styles.profileRole}>Super Admin</span>
            </div>
            <ChevronDown size={14} color="#94a3b8" />
          </button>

          {showProfile && (
            <div style={{ ...styles.dropdown, right: 0, minWidth: '180px' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>Admin User</p>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>admin@nexacrm.com</p>
              </div>
              {[
                { icon: User, label: 'My Profile' },
                { icon: Settings, label: 'Settings' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} style={styles.profileMenuItem}>
                  <Icon size={15} color="#64748b" />
                  <span>{label}</span>
                </button>
              ))}
              <Link to="/" style={{ ...styles.profileMenuItem, color: '#ef4444', textDecoration: 'none' }}>
                <LogOut size={15} color="#ef4444" />
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const styles = {
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 28px',
    background: '#fff',
    borderBottom: '1px solid #e2e8f0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  pageTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },
  breadcrumb: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '8px 14px',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    fontSize: '13px',
    color: '#0f172a',
    outline: 'none',
    width: '180px',
  },
  iconBtn: {
    width: '38px',
    height: '38px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '18px',
    height: '18px',
    background: '#ef4444',
    borderRadius: '50%',
    fontSize: '10px',
    fontWeight: '700',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: '48px',
    right: 0,
    background: '#fff',
    borderRadius: '14px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
    border: '1px solid #e2e8f0',
    minWidth: '280px',
    zIndex: 999,
    overflow: 'hidden',
  },
  dropdownHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    borderBottom: '1px solid #f1f5f9',
  },
  dropdownTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
  },
  notifItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 16px',
    borderBottom: '1px solid #f8fafc',
  },
  notifDot: (unread) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: unread ? '#2563eb' : '#e2e8f0',
    flexShrink: 0,
    marginTop: '4px',
  }),
  notifText: {
    fontSize: '13px',
    color: '#374151',
    lineHeight: '1.4',
  },
  notifTime: {
    fontSize: '11px',
    color: '#94a3b8',
    marginTop: '3px',
  },
  profileBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  avatar: {
    width: '30px',
    height: '30px',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    color: '#fff',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  profileName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0f172a',
  },
  profileRole: {
    fontSize: '11px',
    color: '#94a3b8',
  },
  profileMenuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    background: 'none',
    border: 'none',
    width: '100%',
    fontSize: '13px',
    color: '#374151',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}
