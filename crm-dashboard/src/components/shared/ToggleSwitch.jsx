export default function ToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        ...styles.track,
        background: checked ? '#2563eb' : '#e2e8f0',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <span
        style={{
          ...styles.thumb,
          transform: checked ? 'translateX(18px)' : 'translateX(2px)',
        }}
      />
    </button>
  )
}

const styles = {
  track: {
    width: '40px',
    height: '22px',
    borderRadius: '20px',
    border: 'none',
    padding: 0,
    position: 'relative',
    flexShrink: 0,
    transition: 'background 0.2s ease',
  },
  thumb: {
    position: 'absolute',
    top: '2px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
    transition: 'transform 0.2s ease',
  },
}
