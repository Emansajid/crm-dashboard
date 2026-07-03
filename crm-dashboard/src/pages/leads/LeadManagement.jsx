import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, MoreVertical, Eye, Edit, Trash2, TrendingUp } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import SearchBar from '../../components/shared/SearchBar'
import FilterDropdown from '../../components/shared/FilterDropdown'
import StatusBadge from '../../components/shared/StatusBadge'
import Pagination from '../../components/shared/Pagination'
import { leads } from '../../data/mockData'

const ITEMS_PER_PAGE = 6

function ScoreBar({ score }) {
  const color = score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#ef4444'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{ width: '60px', height: '6px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: '4px' }} />
      </div>
      <span style={{ fontSize: '12px', fontWeight: '700', color }}>{score}</span>
    </div>
  )
}

export default function LeadManagement() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [sourceFilter, setSourceFilter] = useState('All Sources')
  const [page, setPage] = useState(1)
  const [openMenu, setOpenMenu] = useState(null)

  const sources = ['All Sources', ...new Set(leads.map(l => l.source))]

  const filtered = useMemo(() => {
    return leads.filter(l => {
      const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.company.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'All Status' || l.status === statusFilter.toLowerCase()
      const matchSource = sourceFilter === 'All Sources' || l.source === sourceFilter
      return matchSearch && matchStatus && matchSource
    })
  }, [search, statusFilter, sourceFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <DashboardLayout pageTitle="Leads">
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Lead Management</h2>
          <p style={styles.pageSub}>Track and convert your sales pipeline</p>
        </div>
        <button style={styles.addBtn} onClick={() => navigate('/leads/add')}>
          <Plus size={16} />
          Add Lead
        </button>
      </div>

      {/* Pipeline Summary */}
      <div style={styles.summaryStrip}>
        {[
          { label: 'New', val: leads.filter(l => l.status === 'new').length, color: '#2563eb' },
          { label: 'Contacted', val: leads.filter(l => l.status === 'contacted').length, color: '#7c3aed' },
          { label: 'Qualified', val: leads.filter(l => l.status === 'qualified').length, color: '#16a34a' },
          { label: 'Won', val: leads.filter(l => l.status === 'won').length, color: '#16a34a' },
          { label: 'Lost', val: leads.filter(l => l.status === 'lost').length, color: '#94a3b8' },
        ].map(s => (
          <div key={s.label} style={styles.summaryCard}>
            <div style={{ ...styles.summaryDot, background: s.color }} />
            <div>
              <p style={styles.summaryVal}>{s.val}</p>
              <p style={styles.summaryLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div style={styles.tableCard}>
        <div style={styles.toolbar}>
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search leads by name or company..." />
          <div style={{ display: 'flex', gap: '10px' }}>
            <FilterDropdown
              label="Status"
              options={['All Status', 'New', 'Contacted', 'Qualified', 'Won', 'Lost']}
              selected={statusFilter}
              onChange={(v) => { setStatusFilter(v); setPage(1) }}
            />
            <FilterDropdown
              label="Source"
              options={sources}
              selected={sourceFilter}
              onChange={(v) => { setSourceFilter(v); setPage(1) }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Lead</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Source</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Assigned To</th>
                <th style={styles.th}>Created</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((l) => (
                <tr key={l.id}>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={styles.avatar}>{l.avatar}</div>
                      <div>
                        <p style={styles.nameText}>{l.name}</p>
                        <p style={styles.emailText}>{l.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}><span style={styles.companyText}>{l.company}</span></td>
                  <td style={styles.td}>
                    <span style={styles.sourceTag}>{l.source}</span>
                  </td>
                  <td style={styles.td}><ScoreBar score={l.score} /></td>
                  <td style={styles.td}><StatusBadge status={l.status} /></td>
                  <td style={styles.td}><span style={styles.companyText}>{l.assignedTo}</span></td>
                  <td style={styles.td}><span style={styles.dateText}>{l.created}</span></td>
                  <td style={{ ...styles.td, textAlign: 'right', position: 'relative' }}>
                    <button
                      onClick={() => setOpenMenu(openMenu === l.id ? null : l.id)}
                      style={styles.menuBtn}
                    >
                      <MoreVertical size={16} color="#94a3b8" />
                    </button>
                    {openMenu === l.id && (
                      <>
                        <div style={styles.menuOverlay} onClick={() => setOpenMenu(null)} />
                        <div style={styles.actionMenu}>
                          <button style={styles.actionItem}>
                            <Eye size={14} /> View Details
                          </button>
                          <button style={styles.actionItem}>
                            <TrendingUp size={14} /> Convert to Customer
                          </button>
                          <button style={styles.actionItem}>
                            <Edit size={14} /> Edit
                          </button>
                          <button style={{ ...styles.actionItem, color: '#ef4444' }}>
                            <Trash2 size={14} color="#ef4444" /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginated.length === 0 && (
          <div style={styles.emptyState}>
            <p>No leads found matching your filters.</p>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </DashboardLayout>
  )
}

const styles = {
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  pageHeading: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
  },
  pageSub: {
    fontSize: '13px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
  },
  summaryStrip: {
    display: 'flex',
    gap: '14px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  summaryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#fff',
    border: '1px solid #f1f5f9',
    borderRadius: '12px',
    padding: '14px 18px',
    flex: 1,
    minWidth: '130px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  summaryDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  summaryVal: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#0f172a',
  },
  summaryLabel: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  tableCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '20px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    marginBottom: '18px',
    flexWrap: 'wrap',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '880px',
  },
  th: {
    textAlign: 'left',
    fontSize: '11.5px',
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    padding: '10px 14px',
    borderBottom: '1.5px solid #f1f5f9',
  },
  td: {
    padding: '14px',
    borderBottom: '1px solid #f8fafc',
    fontSize: '13.5px',
    color: '#374151',
    verticalAlign: 'middle',
  },
  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#fff',
    flexShrink: 0,
  },
  nameText: {
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#0f172a',
  },
  emailText: {
    fontSize: '11.5px',
    color: '#94a3b8',
    marginTop: '1px',
  },
  companyText: {
    color: '#64748b',
  },
  sourceTag: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
    background: '#f1f5f9',
    padding: '4px 10px',
    borderRadius: '20px',
  },
  dateText: {
    color: '#94a3b8',
    fontSize: '12.5px',
  },
  menuBtn: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 998,
  },
  actionMenu: {
    position: 'absolute',
    right: '14px',
    top: '38px',
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.14)',
    border: '1px solid #e2e8f0',
    minWidth: '180px',
    zIndex: 999,
    overflow: 'hidden',
    padding: '6px',
  },
  actionItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '8px 10px',
    background: 'none',
    border: 'none',
    borderRadius: '7px',
    fontSize: '13px',
    color: '#374151',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  emptyState: {
    padding: '40px',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '13.5px',
  },
}
