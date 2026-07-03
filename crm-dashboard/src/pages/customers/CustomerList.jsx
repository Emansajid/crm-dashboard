import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, MoreVertical, Eye, Edit, Trash2, Mail, Phone, Download } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import SearchBar from '../../components/shared/SearchBar'
import FilterDropdown from '../../components/shared/FilterDropdown'
import StatusBadge from '../../components/shared/StatusBadge'
import Pagination from '../../components/shared/Pagination'
import { customers } from '../../data/mockData'

const ITEMS_PER_PAGE = 6

export default function CustomerList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [page, setPage] = useState(1)
  const [openMenu, setOpenMenu] = useState(null)

  const filtered = useMemo(() => {
    return customers.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'All Status' || c.status === statusFilter.toLowerCase()
      return matchSearch && matchStatus
    })
  }, [search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <DashboardLayout pageTitle="Customers">
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Customer List</h2>
          <p style={styles.pageSub}>Manage all your customers in one place</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={styles.exportBtn}>
            <Download size={16} />
            Export
          </button>
          <button style={styles.addBtn} onClick={() => navigate('/customers/add')}>
            <Plus size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Summary Strip */}
      <div style={styles.summaryStrip}>
        {[
          { label: 'Total Customers', val: customers.length, color: '#2563eb' },
          { label: 'Active', val: customers.filter(c => c.status === 'active').length, color: '#16a34a' },
          { label: 'Pending', val: customers.filter(c => c.status === 'pending').length, color: '#d97706' },
          { label: 'Inactive', val: customers.filter(c => c.status === 'inactive').length, color: '#64748b' },
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
        {/* Toolbar */}
        <div style={styles.toolbar}>
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search by name, company, or email..." />
          <FilterDropdown
            label="Status"
            options={['All Status', 'Active', 'Pending', 'Inactive']}
            selected={statusFilter}
            onChange={(v) => { setStatusFilter(v); setPage(1) }}
          />
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Value</th>
                <th style={styles.th}>Joined</th>
                <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((c) => (
                <tr key={c.id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={styles.avatar}>{c.avatar}</div>
                      <button
                        onClick={() => navigate(`/customers/${c.id}`)}
                        style={styles.nameBtn}
                      >
                        {c.name}
                      </button>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.companyText}>{c.company}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={styles.contactLine}><Mail size={11} /> {c.email}</span>
                      <span style={styles.contactLine}><Phone size={11} /> {c.phone}</span>
                    </div>
                  </td>
                  <td style={styles.td}><StatusBadge status={c.status} /></td>
                  <td style={styles.td}><span style={styles.valueText}>{c.value}</span></td>
                  <td style={styles.td}><span style={styles.dateText}>{c.joined}</span></td>
                  <td style={{ ...styles.td, textAlign: 'right', position: 'relative' }}>
                    <button
                      onClick={() => setOpenMenu(openMenu === c.id ? null : c.id)}
                      style={styles.menuBtn}
                    >
                      <MoreVertical size={16} color="#94a3b8" />
                    </button>
                    {openMenu === c.id && (
                      <>
                        <div style={styles.menuOverlay} onClick={() => setOpenMenu(null)} />
                        <div style={styles.actionMenu}>
                          <button onClick={() => navigate(`/customers/${c.id}`)} style={styles.actionItem}>
                            <Eye size={14} /> View Profile
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
            <p>No customers found matching your search.</p>
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
  exportBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: '#fff',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#374151',
    cursor: 'pointer',
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
    minWidth: '160px',
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
    gap: '12px',
    marginBottom: '18px',
    flexWrap: 'wrap',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '760px',
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
  tr: {
    transition: 'background 0.15s',
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
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#fff',
    flexShrink: 0,
  },
  nameBtn: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#0f172a',
    cursor: 'pointer',
    fontFamily: 'inherit',
    textAlign: 'left',
  },
  companyText: {
    color: '#64748b',
  },
  contactLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: '#94a3b8',
  },
  valueText: {
    fontWeight: '700',
    color: '#0f172a',
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
    minWidth: '150px',
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
