import { Users, TrendingUp, Briefcase, CheckSquare } from 'lucide-react'
import DashboardLayout from '../components/layout/DashboardLayout'
import StatsCard from '../components/dashboard/StatsCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import RecentActivity from '../components/dashboard/RecentActivity'

const stats = [
  {
    icon: Users,
    label: 'Total Customers',
    value: '4,821',
    change: '+12.5%',
    changeType: 'up',
    color: '#2563eb',
    bgColor: '#eff6ff',
  },
  {
    icon: TrendingUp,
    label: 'Active Leads',
    value: '1,340',
    change: '+8.2%',
    changeType: 'up',
    color: '#10b981',
    bgColor: '#dcfce7',
  },
  {
    icon: Briefcase,
    label: 'Employees',
    value: '248',
    change: '-2.1%',
    changeType: 'down',
    color: '#8b5cf6',
    bgColor: '#ede9fe',
  },
  {
    icon: CheckSquare,
    label: 'Pending Tasks',
    value: '73',
    change: '+5.4%',
    changeType: 'up',
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
]

export default function Dashboard() {
  return (
    <DashboardLayout pageTitle="Dashboard">
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <div>
          <h3 style={styles.welcomeTitle}>Good morning, Admin! 👋</h3>
          <p style={styles.welcomeSub}>Here's what's happening with your business today.</p>
        </div>
        <div style={styles.dateBox}>
          <p style={styles.dateDay}>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <p style={styles.dateVal}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsRow}>
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Chart + Activity Row */}
      <div style={styles.bottomRow}>
        <RevenueChart />
        <RecentActivity />
      </div>
    </DashboardLayout>
  )
}

const styles = {
  welcomeBanner: {
    background: 'linear-gradient(135deg, #0f172a 0%, #2563eb 100%)',
    borderRadius: '16px',
    padding: '24px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  welcomeTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '4px',
  },
  welcomeSub: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.65)',
  },
  dateBox: {
    textAlign: 'right',
  },
  dateDay: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
  },
  dateVal: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#fff',
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  bottomRow: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
}
