const statusConfig = {
  active: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a' },
  inactive: { bg: '#fee2e2', text: '#dc2626', dot: '#dc2626' },
  pending: { bg: '#fef3c7', text: '#d97706', dot: '#d97706' },
  new: { bg: '#eff6ff', text: '#2563eb', dot: '#2563eb' },
  contacted: { bg: '#ede9fe', text: '#7c3aed', dot: '#7c3aed' },
  qualified: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a' },
  lost: { bg: '#f1f5f9', text: '#64748b', dot: '#64748b' },
  won: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a' },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: config.bg,
      color: config.text,
      textTransform: 'capitalize',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.dot }} />
      {status}
    </span>
  )
}
