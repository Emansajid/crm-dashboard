import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export default function FilterDropdown({ label, options, selected, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={styles.btn}>
        <span>{label}: <strong style={{ color: '#0f172a' }}>{selected}</strong></span>
        <ChevronDown size={14} color="#94a3b8" />
      </button>

      {open && (
        <>
          <div style={styles.overlay} onClick={() => setOpen(false)} />
          <div style={styles.dropdown}>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                style={{
                  ...styles.option,
                  color: selected === opt ? '#2563eb' : '#374151',
                  background: selected === opt ? '#eff6ff' : 'transparent',
                }}
              >
                <span>{opt}</span>
                {selected === opt && <Check size={14} color="#2563eb" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    background: '#fff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#64748b',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 998,
  },
  dropdown: {
    position: 'absolute',
    top: '46px',
    left: 0,
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
    border: '1px solid #e2e8f0',
    minWidth: '160px',
    zIndex: 999,
    overflow: 'hidden',
    padding: '6px',
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '9px 12px',
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
}
