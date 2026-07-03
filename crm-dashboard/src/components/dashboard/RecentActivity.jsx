import { UserPlus, TrendingUp, CheckCircle, AlertCircle, FileText, Phone } from 'lucide-react'

const activities = [
  {
    id: 1,
    icon: UserPlus,
    color: '#2563eb',
    bg: '#eff6ff',
    title: 'New customer added',
    desc: 'Sarah Mitchell was added to the customer list',
    time: '2 min ago',
    tag: 'Customer',
    tagColor: '#dbeafe',
    tagText: '#2563eb',
  },
  {
    id: 2,
    icon: TrendingUp,
    color: '#10b981',
    bg: '#dcfce7',
    title: 'Lead converted',
    desc: 'Tech Solutions Inc. moved to active customer',
    time: '18 min ago',
    tag: 'Lead',
    tagColor: '#dcfce7',
    tagText: '#16a34a',
  },
  {
    id: 3,
    icon: CheckCircle,
    color: '#8b5cf6',
    bg: '#ede9fe',
    title: 'Task completed',
    desc: 'Quarterly review presentation prepared',
    time: '1 hr ago',
    tag: 'Task',
    tagColor: '#ede9fe',
    tagText: '#7c3aed',
  },
  {
    id: 4,
    icon: Phone,
    color: '#f59e0b',
    bg: '#fef3c7',
    title: 'Follow-up call scheduled',
    desc: 'Meeting with Ahmed Khan at 3:00 PM',
    time: '2 hrs ago',
    tag: 'Meeting',
    tagColor: '#fef3c7',
    tagText: '#d97706',
  },
  {
    id: 5,
    icon: FileText,
    color: '#64748b',
    bg: '#f1f5f9',
    title: 'Report generated',
    desc: 'November sales report is now available',
    time: '4 hrs ago',
    tag: 'Report',
    tagColor: '#f1f5f9',
    tagText: '#64748b',
  },
  {
    id: 6,
    icon: AlertCircle,
    color: '#ef4444',
    bg: '#fee2e2',
    title: 'Overdue task alert',
    desc: 'Contract renewal for GlobalTech is overdue',
    time: '5 hrs ago',
    tag: 'Alert',
    tagColor: '#fee2e2',
    tagText: '#dc2626',
  },
]

export default function RecentActivity() {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Recent Activity</h3>
          <p style={styles.sub}>Latest updates across your CRM</p>
        </div>
        <button style={styles.viewAll}>View All</button>
      </div>

      <div style={styles.list}>
        {activities.map((item, idx) => {
          const Icon = item.icon
          return (
            <div key={item.id} style={{
              ...styles.item,
              borderBottom: idx < activities.length - 1 ? '1px solid #f8fafc' : 'none'
            }}>
              <div style={{ ...styles.iconWrap, background: item.bg }}>
                <Icon size={16} color={item.color} />
              </div>
              <div style={styles.itemContent}>
                <div style={styles.itemTop}>
                  <p style={styles.itemTitle}>{item.title}</p>
                  <span style={{
                    ...styles.tag,
                    background: item.tagColor,
                    color: item.tagText,
                  }}>
                    {item.tag}
                  </span>
                </div>
                <p style={styles.itemDesc}>{item.desc}</p>
                <p style={styles.itemTime}>{item.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
    flex: 1,
    minWidth: '280px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '2px',
  },
  sub: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  viewAll: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#2563eb',
    background: '#eff6ff',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px 0',
  },
  iconWrap: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemContent: {
    flex: 1,
  },
  itemTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
  },
  itemTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0f172a',
  },
  tag: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '20px',
    whiteSpace: 'nowrap',
  },
  itemDesc: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px',
    lineHeight: '1.4',
  },
  itemTime: {
    fontSize: '11px',
    color: '#94a3b8',
    marginTop: '4px',
  },
}
