import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const data = [
  { month: 'Jan', revenue: 42000, expenses: 28000 },
  { month: 'Feb', revenue: 53000, expenses: 31000 },
  { month: 'Mar', revenue: 48000, expenses: 27000 },
  { month: 'Apr', revenue: 61000, expenses: 34000 },
  { month: 'May', revenue: 55000, expenses: 30000 },
  { month: 'Jun', revenue: 72000, expenses: 38000 },
  { month: 'Jul', revenue: 68000, expenses: 35000 },
  { month: 'Aug', revenue: 80000, expenses: 41000 },
  { month: 'Sep', revenue: 74000, expenses: 39000 },
  { month: 'Oct', revenue: 88000, expenses: 44000 },
  { month: 'Nov', revenue: 93000, expenses: 47000 },
  { month: 'Dec', revenue: 105000, expenses: 52000 },
]

const formatCurrency = (val) => `$${(val / 1000).toFixed(0)}K`

export default function RevenueChart() {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.title}>Revenue Overview</h3>
          <p style={styles.sub}>Annual performance — 2024</p>
        </div>
        <div style={styles.pills}>
          {['Monthly', 'Quarterly', 'Yearly'].map((p, i) => (
            <button
              key={p}
              style={{
                ...styles.pill,
                background: i === 0 ? '#2563eb' : 'transparent',
                color: i === 0 ? '#fff' : '#64748b',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.summary}>
        <div style={styles.summaryItem}>
          <div style={{ ...styles.dot, background: '#2563eb' }} />
          <div>
            <p style={styles.summaryVal}>$839K</p>
            <p style={styles.summaryLabel}>Total Revenue</p>
          </div>
        </div>
        <div style={styles.summaryItem}>
          <div style={{ ...styles.dot, background: '#10b981' }} />
          <div>
            <p style={styles.summaryVal}>$446K</p>
            <p style={styles.summaryLabel}>Total Expenses</p>
          </div>
        </div>
        <div style={styles.summaryItem}>
          <div style={{ ...styles.dot, background: '#8b5cf6' }} />
          <div>
            <p style={styles.summaryVal}>$393K</p>
            <p style={styles.summaryLabel}>Net Profit</p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(val) => [`$${val.toLocaleString()}`, '']}
            contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px' }}
          />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorRevenue)" dot={false} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#10b981" strokeWidth={2.5} fill="url(#colorExpenses)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
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
    flex: 2,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
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
  pills: {
    display: 'flex',
    gap: '4px',
    background: '#f8fafc',
    padding: '4px',
    borderRadius: '10px',
  },
  pill: {
    padding: '5px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  summary: {
    display: 'flex',
    gap: '24px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  summaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  summaryVal: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
  },
  summaryLabel: {
    fontSize: '11px',
    color: '#94a3b8',
  },
}
