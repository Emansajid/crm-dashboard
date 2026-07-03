import { useState } from 'react'
import { Bell, Calendar, TrendingUp, User, FileText, CheckCircle, AlertCircle, Filter, CheckCheck } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { notifications as allNotifs } from '../../data/mockData'

const iconMap = {
  calendar: { icon: Calendar, color: '#2563eb', bg: '#eff6ff' },
  alert: { icon: AlertCircle, color: '#ef4444', bg: '#fee2e2' },
  trending: { icon: TrendingUp, color: '#10b981', bg: '#dcfce7' },
  user: { icon: User, color: '#7c3aed', bg: '#ede9fe' },
  file: { icon: FileText, color: '#f59e0b', bg: '#fef3c7' },
  check: { icon: CheckCircle, color: '#16a34a', bg: '#dcfce7' },
}

const typeLabels = ['All', 'Meeting', 'Task', 'Lead', 'Customer', 'Report']

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(allNotifs)
  const [filter, setFilter] = useState('All')
  const [showUnread, setShowUnread] = useState(false)

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n))

  const filtered = notifs.filter(n => {
    const matchType = filter === 'All' || n.type === filter.toLowerCase()
    const matchRead = !showUnread || !n.read
    return matchType && matchRead
  })

  const unreadCount = notifs.filter(n => !n.read).length

  // Group by time
  const today = filtered.filter(n => n.time.includes('min') || n.time.includes('hr'))
  const yesterday = filtered.filter(n => n.time === '1 day ago')
  const older = filtered.filter(n => n.time.includes('2 days') || n.time.includes('week'))

  return (
    <DashboardLayout pageTitle="Notifications">
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Notifications</h2>
          <p style={styles.pageSub}>Stay updated with your CRM activity</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {unreadCount > 0 && (
            <button onClick={markAllRead} style={styles.markAllBtn}>
              <CheckCheck size={15} /> Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={styles.summaryStrip}>
        {[
          { label: 'Total', val: notifs.length, color: '#2563eb' },
          { label: 'Unread', val: unreadCount, color: '#ef4444' },
          { label: 'Meetings', val: notifs.filter(n => n.type === 'meeting').length, color: '#7c3aed' },
          { label: 'Tasks', val: notifs.filter(n => n.type === 'task').length, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={styles.summaryCard}>
            <div style={{ ...styles.dot, background: s.color }} />
            <div>
              <p style={styles.summaryVal}>{s.val}</p>
              <p style={styles.summaryLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.layout}>
        {/* Main Feed */}
        <div style={styles.feedCard}>
          {/* Filters */}
          <div style={styles.filterBar}>
            <div style={styles.typeTabs}>
              {typeLabels.map(t => (
                <button key={t} onClick={() => setFilter(t)} style={{ ...styles.tab, background: filter === t ? '#2563eb' : 'transparent', color: filter === t ? '#fff' : '#64748b' }}>
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowUnread(!showUnread)}
              style={{ ...styles.unreadToggle, background: showUnread ? '#eff6ff' : 'transparent', color: showUnread ? '#2563eb' : '#64748b', borderColor: showUnread ? '#2563eb' : '#e2e8f0' }}
            >
              <Filter size={14} /> Unread only
            </button>
          </div>

          {/* Groups */}
          {filtered.length === 0 ? (
            <div style={styles.emptyState}>
              <Bell size={40} color="#e2e8f0" />
              <p style={{ marginTop: '12px', fontWeight: '600', color: '#374151' }}>No notifications</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>You're all caught up!</p>
            </div>
          ) : (
            <>
              {today.length > 0 && <NotifGroup title="Today" items={today} onRead={markRead} />}
              {yesterday.length > 0 && <NotifGroup title="Yesterday" items={yesterday} onRead={markRead} />}
              {older.length > 0 && <NotifGroup title="Earlier" items={older} onRead={markRead} />}
            </>
          )}
        </div>

        {/* Side — Notification Settings Preview */}
        <div style={styles.sidePanel}>
          <div style={styles.settingsCard}>
            <h3 style={styles.settingsTitle}>Notification Preferences</h3>
            {[
              { label: 'Meeting Reminders', sub: '15 min before', on: true },
              { label: 'Task Deadlines', sub: 'Day of due date', on: true },
              { label: 'New Lead Assigned', sub: 'Immediately', on: true },
              { label: 'Customer Updates', sub: 'Daily digest', on: false },
              { label: 'Report Ready', sub: 'When available', on: true },
              { label: 'Team Activity', sub: 'Weekly digest', on: false },
            ].map(item => (
              <NotifPref key={item.label} {...item} />
            ))}
          </div>

          <div style={styles.activityCard}>
            <h3 style={{ ...styles.settingsTitle, marginBottom: '14px' }}>Activity Summary</h3>
            <div style={styles.activityBar}>
              <span style={styles.activityLabel}>Meetings</span>
              <div style={styles.barTrack}><div style={{ ...styles.barFill, width: '70%', background: '#2563eb' }} /></div>
              <span style={styles.activityNum}>2</span>
            </div>
            <div style={styles.activityBar}>
              <span style={styles.activityLabel}>Tasks</span>
              <div style={styles.barTrack}><div style={{ ...styles.barFill, width: '90%', background: '#f59e0b' }} /></div>
              <span style={styles.activityNum}>3</span>
            </div>
            <div style={styles.activityBar}>
              <span style={styles.activityLabel}>Leads</span>
              <div style={styles.barTrack}><div style={{ ...styles.barFill, width: '50%', background: '#10b981' }} /></div>
              <span style={styles.activityNum}>2</span>
            </div>
            <div style={styles.activityBar}>
              <span style={styles.activityLabel}>Reports</span>
              <div style={styles.barTrack}><div style={{ ...styles.barFill, width: '30%', background: '#7c3aed' }} /></div>
              <span style={styles.activityNum}>1</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function NotifGroup({ title, items, onRead }) {
  return (
    <div style={{ marginBottom: '6px' }}>
      <p style={styles.groupLabel}>{title}</p>
      {items.map(n => {
        const cfg = iconMap[n.icon] || iconMap.check
        const Icon = cfg.icon
        return (
          <div
            key={n.id}
            onClick={() => onRead(n.id)}
            style={{ ...styles.notifItem, background: n.read ? 'transparent' : '#fafbff', borderLeft: n.read ? '3px solid transparent' : '3px solid #2563eb' }}
          >
            <div style={{ ...styles.notifIcon, background: cfg.bg }}>
              <Icon size={15} color={cfg.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p style={{ ...styles.notifTitle, fontWeight: n.read ? '500' : '700' }}>{n.title}</p>
                <span style={styles.notifTime}>{n.time}</span>
              </div>
              <p style={styles.notifMsg}>{n.message}</p>
            </div>
            {!n.read && <div style={styles.unreadDot} />}
          </div>
        )
      })}
    </div>
  )
}

function NotifPref({ label, sub, on }) {
  const [enabled, setEnabled] = useState(on)
  return (
    <div style={styles.prefRow}>
      <div>
        <p style={styles.prefLabel}>{label}</p>
        <p style={styles.prefSub}>{sub}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        style={{ ...styles.toggle, background: enabled ? '#2563eb' : '#e2e8f0' }}
      >
        <div style={{ ...styles.toggleKnob, transform: enabled ? 'translateX(18px)' : 'translateX(2px)' }} />
      </button>
    </div>
  )
}

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  markAllBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#374151', cursor: 'pointer' },
  summaryStrip: { display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' },
  summaryCard: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '14px 18px', flex: 1, minWidth: '130px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  summaryVal: { fontSize: '20px', fontWeight: '800', color: '#0f172a' },
  summaryLabel: { fontSize: '12px', color: '#94a3b8' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(260px, 1fr)', gap: '20px', alignItems: 'flex-start' },
  feedCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' },
  filterBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '10px' },
  typeTabs: { display: 'flex', gap: '4px', background: '#f8fafc', padding: '4px', borderRadius: '10px' },
  tab: { padding: '5px 12px', borderRadius: '7px', border: 'none', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  unreadToggle: { display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', border: '1.5px solid', borderRadius: '9px', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', background: 'none', fontFamily: 'inherit' },
  groupLabel: { fontSize: '11.5px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px', textTransform: 'uppercase', padding: '12px 18px 6px' },
  notifItem: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 18px', cursor: 'pointer', transition: 'background 0.1s', borderBottom: '1px solid #f8fafc' },
  notifIcon: { width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifTitle: { fontSize: '13.5px', color: '#0f172a', lineHeight: '1.3' },
  notifTime: { fontSize: '11.5px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' },
  notifMsg: { fontSize: '12.5px', color: '#64748b', marginTop: '3px', lineHeight: '1.5' },
  unreadDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb', flexShrink: 0, marginTop: '5px' },
  emptyState: { padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  sidePanel: { display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '90px' },
  settingsCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '20px' },
  settingsTitle: { fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' },
  prefRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },
  prefLabel: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  prefSub: { fontSize: '11.5px', color: '#94a3b8', marginTop: '1px' },
  toggle: { width: '40px', height: '22px', borderRadius: '20px', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 },
  toggleKnob: { position: 'absolute', top: '3px', width: '16px', height: '16px', background: '#fff', borderRadius: '50%', transition: 'transform 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' },
  activityCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '20px' },
  activityBar: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  activityLabel: { fontSize: '12.5px', color: '#64748b', width: '60px', flexShrink: 0 },
  barTrack: { flex: 1, height: '7px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '10px' },
  activityNum: { fontSize: '12px', fontWeight: '700', color: '#0f172a', width: '16px', textAlign: 'right' },
}
