import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ icon: Icon, label, value, change, changeType, color, bgColor }) {
  const isPositive = changeType === 'up'

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={{ ...styles.iconBox, background: bgColor }}>
          <Icon size={20} color={color} />
        </div>
        <div style={{
          ...styles.changeBadge,
          background: isPositive ? '#dcfce7' : '#fee2e2',
          color: isPositive ? '#16a34a' : '#dc2626',
        }}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span>{change}</span>
        </div>
      </div>

      <div style={styles.bottom}>
        <h3 style={styles.value}>{value}</h3>
        <p style={styles.label}>{label}</p>
      </div>

      {/* Bottom accent line */}
      <div style={{ ...styles.accentLine, background: color }} />
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '22px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    border: '1px solid #f1f5f9',
    flex: 1,
    minWidth: '180px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '18px',
  },
  iconBox: {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  bottom: {},
  value: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-1px',
    marginBottom: '4px',
  },
  label: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    borderRadius: '0 0 16px 16px',
  },
}
