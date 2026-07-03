import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const start = (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, totalItems)

  const getPages = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...')
      }
    }
    return pages
  }

  return (
    <div style={styles.wrap}>
      <p style={styles.info}>
        Showing <strong>{start}–{end}</strong> of <strong>{totalItems}</strong> results
      </p>

      <div style={styles.controls}>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          style={{ ...styles.navBtn, opacity: currentPage === 1 ? 0.4 : 1 }}
        >
          <ChevronLeft size={15} />
        </button>

        {getPages().map((p, i) => p === '...' ? (
          <span key={`dots-${i}`} style={styles.dots}>...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              ...styles.pageBtn,
              background: p === currentPage ? '#2563eb' : 'transparent',
              color: p === currentPage ? '#fff' : '#64748b',
            }}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          style={{ ...styles.navBtn, opacity: currentPage === totalPages ? 0.4 : 1 }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 4px 4px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  info: {
    fontSize: '13px',
    color: '#64748b',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  navBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    color: '#64748b',
    cursor: 'pointer',
  },
  pageBtn: {
    minWidth: '32px',
    height: '32px',
    padding: '0 8px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  dots: {
    fontSize: '13px',
    color: '#cbd5e1',
    padding: '0 4px',
  },
}
