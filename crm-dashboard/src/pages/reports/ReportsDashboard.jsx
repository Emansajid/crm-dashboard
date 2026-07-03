import { useState } from 'react'
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Award, Download } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import DashboardLayout from '../../components/layout/DashboardLayout'

const revenueData = [
  { month: 'Jan', revenue: 42000, target: 40000 },
  { month: 'Feb', revenue: 53000, target: 45000 },
  { month: 'Mar', revenue: 48000, target: 50000 },
  { month: 'Apr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 55000, target: 58000 },
  { month: 'Jun', revenue: 72000, target: 65000 },
]

const leadSourceData = [
  { name: 'Website', value: 35, color: '#2563eb' },
  { name: 'Referral', value: 28, color: '#10b981' },
  { name: 'LinkedIn', value: 20, color: '#7c3aed' },
  { name: 'Cold Call', value: 10, color: '#f59e0b' },
  { name: 'Events', value: 7, color: '#ef4444' },
]

const teamPerformance = [
  { name: 'Sarah Lee', deals: 12, revenue: 84000 },
  { name: 'Ryan Moore', deals: 8, revenue: 56000 },
  { name: 'James Carter', deals: 6, revenue: 42000 },
  { name: 'Nadia Hassan', deals: 10, revenue: 70000 },
  { name: 'Admin User', deals: 15, revenue: 105000 },
]

const fmt = (v) => `$${(v / 1000).toFixed(0)}K`

export default function ReportsDashboard() {
  const [period, setPeriod] = useState('6M')

  return (
    <DashboardLayout pageTitle="Reports">
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Reports & Analytics</h2>
          <p style={styles.pageSub}>Monitor business performance and key metrics</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={styles.periodToggle}>
            {['1M', '3M', '6M', '1Y'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ ...styles.periodBtn, background: period === p ? '#2563eb' : 'transparent', color: period === p ? '#fff' : '#64748b' }}>{p}</button>
            ))}
          </div>
          <button style={styles.exportBtn}><Download size={15} /> Export</button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div style={styles.analyticsGrid}>
        {[
          { icon: DollarSign, label: 'Total Revenue', value: '$331K', change: '+18.2%', up: true, color: '#2563eb', bg: '#eff6ff', sub: 'vs last period' },
          { icon: Users, label: 'New Customers', value: '142', change: '+12.5%', up: true, color: '#10b981', bg: '#dcfce7', sub: 'vs last period' },
          { icon: Target, label: 'Leads Converted', value: '68%', change: '+4.1%', up: true, color: '#7c3aed', bg: '#ede9fe', sub: 'conversion rate' },
          { icon: Award, label: 'Avg. Deal Size', value: '$6,580', change: '-2.3%', up: false, color: '#f59e0b', bg: '#fef3c7', sub: 'vs last period' },
        ].map(c => <AnalyticsCard key={c.label} {...c} />)}
      </div>

      {/* Revenue Chart */}
      <div style={styles.chartCard}>
        <div style={styles.chartHeader}>
          <div>
            <h3 style={styles.chartTitle}>Revenue vs Target</h3>
            <p style={styles.chartSub}>Monthly performance comparison</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tgt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, '']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#rev)" dot={false} />
            <Area type="monotone" dataKey="target" name="Target" stroke="#10b981" strokeWidth={2} fill="url(#tgt)" dot={false} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row: Bar + Pie */}
      <div style={styles.bottomRow}>
        {/* Team Performance */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h3 style={styles.chartTitle}>Team Performance</h3>
              <p style={styles.chartSub}>Deals closed by team member</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={teamPerformance} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              <Bar dataKey="deals" name="Deals" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
            {teamPerformance.sort((a, b) => b.revenue - a.revenue).map((t, i) => (
              <div key={t.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={styles.rank}>#{i + 1}</span>
                  <span style={{ fontSize: '13px', color: '#374151', fontWeight: '500' }}>{t.name}</span>
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{fmt(t.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Source Pie */}
        <div style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div>
              <h3 style={styles.chartTitle}>Lead Sources</h3>
              <p style={styles.chartSub}>Distribution by acquisition channel</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={leadSourceData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {leadSourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.legendGrid}>
            {leadSourceData.map(s => (
              <div key={s.name} style={styles.legendItem}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: '12.5px', color: '#374151', flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#0f172a' }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function AnalyticsCard({ icon: Icon, label, value, change, up, color, bg, sub }) {
  return (
    <div style={styles.analyticsCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ ...styles.analyticsIcon, background: bg }}><Icon size={20} color={color} /></div>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '20px', background: up ? '#dcfce7' : '#fee2e2', color: up ? '#16a34a' : '#dc2626' }}>
          {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {change}
        </span>
      </div>
      <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', letterSpacing: '-1px' }}>{value}</h3>
      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>{label}</p>
      <p style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}>{sub}</p>
      <div style={{ ...styles.accentBar, background: color }} />
    </div>
  )
}

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  periodToggle: { display: 'flex', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', padding: '4px', gap: '2px' },
  periodBtn: { padding: '6px 14px', borderRadius: '7px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  exportBtn: { display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#374151', cursor: 'pointer' },
  analyticsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' },
  analyticsCard: { background: '#fff', borderRadius: '16px', padding: '22px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', position: 'relative', overflow: 'hidden' },
  analyticsIcon: { width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  accentBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px' },
  chartCard: { background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '20px' },
  chartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  chartTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a' },
  chartSub: { fontSize: '12px', color: '#94a3b8', marginTop: '2px' },
  bottomRow: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) 1fr', gap: '20px' },
  rank: { width: '22px', height: '22px', borderRadius: '6px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#64748b', flexShrink: 0 },
  legendGrid: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '8px' },
}
