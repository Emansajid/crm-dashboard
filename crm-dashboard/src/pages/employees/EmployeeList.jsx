import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Mail, Phone, Briefcase, LayoutGrid, List } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import SearchBar from '../../components/shared/SearchBar'
import FilterDropdown from '../../components/shared/FilterDropdown'
import StatusBadge from '../../components/shared/StatusBadge'
import ProgressBar from '../../components/shared/ProgressBar'
import { employees } from '../../data/mockData'

const deptColors = {
  Sales: '#2563eb', Engineering: '#7c3aed', HR: '#10b981',
  Marketing: '#f59e0b', Design: '#ec4899',
}

export default function EmployeeList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All Departments')
  const [view, setView] = useState('grid')

  const departments = ['All Departments', ...new Set(employees.map(e => e.department))]

  const filtered = useMemo(() => employees.filter(e => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
    const matchDept = dept === 'All Departments' || e.department === dept
    return matchSearch && matchDept
  }), [search, dept])

  return (
    <DashboardLayout pageTitle="Employees">
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Employee Management</h2>
          <p style={styles.pageSub}>Manage your team and their assignments</p>
        </div>
        <button style={styles.addBtn}>
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* Summary Strip */}
      <div style={styles.summaryStrip}>
        {[
          { label: 'Total Employees', val: employees.length, color: '#2563eb' },
          { label: 'Active', val: employees.filter(e => e.status === 'active').length, color: '#16a34a' },
          { label: 'Departments', val: new Set(employees.map(e => e.department)).size, color: '#7c3aed' },
          { label: 'Avg. Task Completion', val: Math.round(employees.reduce((a, e) => a + (e.completed / e.tasks) * 100, 0) / employees.length) + '%', color: '#f59e0b' },
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

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name or role..." />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FilterDropdown label="Department" options={departments} selected={dept} onChange={setDept} />
          <div style={styles.viewToggle}>
            <button onClick={() => setView('grid')} style={{ ...styles.viewBtn, background: view === 'grid' ? '#2563eb' : 'transparent', color: view === 'grid' ? '#fff' : '#94a3b8' }}>
              <LayoutGrid size={15} />
            </button>
            <button onClick={() => setView('list')} style={{ ...styles.viewBtn, background: view === 'list' ? '#2563eb' : 'transparent', color: view === 'list' ? '#fff' : '#94a3b8' }}>
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === 'grid' && (
        <div style={styles.grid}>
          {filtered.map(emp => (
            <div key={emp.id} style={styles.card} onClick={() => navigate(`/employees/${emp.id}`)}>
              <div style={{ ...styles.cardTop, background: `linear-gradient(135deg, ${deptColors[emp.department] || '#2563eb'}22, ${deptColors[emp.department] || '#2563eb'}08)` }}>
                <div style={{ ...styles.deptTag, background: `${deptColors[emp.department] || '#2563eb'}22`, color: deptColors[emp.department] || '#2563eb' }}>
                  {emp.department}
                </div>
                <div style={styles.avatar}>{emp.avatar}</div>
                <h3 style={styles.empName}>{emp.name}</h3>
                <p style={styles.empRole}>{emp.role}</p>
                <div style={{ marginTop: '8px' }}><StatusBadge status={emp.status} /></div>
              </div>
              <div style={styles.cardBody}>
                <div style={styles.contactItem}><Mail size={13} color="#94a3b8" /><span>{emp.email}</span></div>
                <div style={styles.contactItem}><Phone size={13} color="#94a3b8" /><span>{emp.phone}</span></div>
                <div style={styles.progressSection}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={styles.progressLabel}>Task Completion</span>
                    <span style={styles.progressLabel}>{emp.completed}/{emp.tasks}</span>
                  </div>
                  <ProgressBar value={Math.round((emp.completed / emp.tasks) * 100)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div style={styles.listCard}>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Employee', 'Department', 'Role', 'Status', 'Task Progress', 'Location', 'Joined'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/employees/${emp.id}`)}>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={styles.avatarSm}>{emp.avatar}</div>
                        <div>
                          <p style={{ fontSize: '13.5px', fontWeight: '600', color: '#0f172a' }}>{emp.name}</p>
                          <p style={{ fontSize: '12px', color: '#94a3b8' }}>{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}><span style={{ ...styles.deptPill, background: `${deptColors[emp.department] || '#2563eb'}1A`, color: deptColors[emp.department] || '#2563eb' }}>{emp.department}</span></td>
                    <td style={styles.td}><span style={{ color: '#64748b', fontSize: '13px' }}>{emp.role}</span></td>
                    <td style={styles.td}><StatusBadge status={emp.status} /></td>
                    <td style={styles.td}><ProgressBar value={Math.round((emp.completed / emp.tasks) * 100)} /></td>
                    <td style={styles.td}><span style={{ color: '#94a3b8', fontSize: '13px' }}>{emp.location}</span></td>
                    <td style={styles.td}><span style={{ color: '#94a3b8', fontSize: '13px' }}>{emp.joined}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No employees found.</div>
      )}
    </DashboardLayout>
  )
}

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
  summaryStrip: { display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' },
  summaryCard: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '14px 18px', flex: 1, minWidth: '160px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  summaryDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  summaryVal: { fontSize: '20px', fontWeight: '800', color: '#0f172a' },
  summaryLabel: { fontSize: '12px', color: '#94a3b8' },
  toolbar: { display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
  viewToggle: { display: 'flex', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' },
  viewBtn: { width: '36px', height: '36px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' },
  card: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' },
  cardTop: { padding: '22px 20px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' },
  deptTag: { position: 'absolute', top: '14px', right: '14px', fontSize: '11px', fontWeight: '700', padding: '3px 9px', borderRadius: '20px' },
  avatar: { width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' },
  empName: { fontSize: '15px', fontWeight: '700', color: '#0f172a' },
  empRole: { fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' },
  cardBody: { padding: '16px 20px 20px', display: 'flex', flexDirection: 'column', gap: '8px' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', overflow: 'hidden' },
  progressSection: { marginTop: '8px', padding: '12px', background: '#f8fafc', borderRadius: '10px' },
  progressLabel: { fontSize: '12px', color: '#94a3b8', fontWeight: '500' },
  listCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '780px' },
  th: { textAlign: 'left', fontSize: '11.5px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.4px', textTransform: 'uppercase', padding: '10px 14px', borderBottom: '1.5px solid #f1f5f9' },
  td: { padding: '14px', borderBottom: '1px solid #f8fafc', fontSize: '13.5px', verticalAlign: 'middle' },
  avatarSm: { width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#fff', flexShrink: 0 },
  deptPill: { fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px' },
}
