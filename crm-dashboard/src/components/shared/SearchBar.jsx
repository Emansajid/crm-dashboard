import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={styles.wrap}>
      <Search size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search...'}
        style={styles.input}
      />
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '10px 14px',
    minWidth: '260px',
  },
  input: {
    border: 'none',
    background: 'transparent',
    fontSize: '13.5px',
    color: '#0f172a',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
  },
}
