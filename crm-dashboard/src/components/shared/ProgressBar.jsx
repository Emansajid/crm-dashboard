export default function ProgressBar({ value, showLabel = true }) {
  const color = value === 100 ? '#16a34a' : value >= 60 ? '#2563eb' : value >= 30 ? '#d97706' : '#ef4444'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '120px' }}>
      <div style={{
        flex: 1,
        height: '7px',
        background: '#f1f5f9',
        borderRadius: '10px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${value}%`,
          height: '100%',
          background: color,
          borderRadius: '10px',
          transition: 'width 0.4s ease',
        }} />
      </div>
      {showLabel && (
        <span style={{ fontSize: '12px', fontWeight: '700', color, minWidth: '30px' }}>
          {value}%
        </span>
      )}
    </div>
  )
}
