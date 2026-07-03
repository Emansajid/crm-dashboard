const config = {
  high: { bg: '#fee2e2', text: '#dc2626', label: 'High' },
  medium: { bg: '#fef3c7', text: '#d97706', label: 'Medium' },
  low: { bg: '#dcfce7', text: '#16a34a', label: 'Low' },
}

export default function PriorityLabel({ priority }) {
  const c = config[priority?.toLowerCase()] || config.medium
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '700',
      background: c.bg,
      color: c.text,
      whiteSpace: 'nowrap',
    }}>
      {c.label}
    </span>
  )
}
