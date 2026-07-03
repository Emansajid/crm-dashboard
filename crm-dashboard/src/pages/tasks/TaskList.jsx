import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LayoutGrid, List, Calendar, User } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import SearchBar from '../../components/shared/SearchBar'
import FilterDropdown from '../../components/shared/FilterDropdown'
import StatusBadge from '../../components/shared/StatusBadge'
import PriorityLabel from '../../components/shared/PriorityLabel'
import ProgressBar from '../../components/shared/ProgressBar'
import Modal from '../../components/shared/Modal'
import { tasks } from '../../data/mockData'

const COLUMNS = [
  { key: 'todo', label: 'To Do', color: '#64748b' },
  { key: 'in-progress', label: 'In Progress', color: '#2563eb' },
  { key: 'completed', label: 'Completed', color: '#16a34a' },
  { key: 'overdue', label: 'Overdue', color: '#ef4444' },
]

export default function TaskList() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All Priorities')
  const [view, setView] = useState('kanban')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(search.toLowerCase())
    const matchPriority = priorityFilter === 'All Priorities' || t.priority === priorityFilter.toLowerCase()
    return matchSearch && matchPriority
  }), [search, priorityFilter])

  return (
    <DashboardLayout pageTitle="Tasks">
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Task Management</h2>
          <p style={styles.pageSub}>Track and manage team tasks across your CRM</p>
        </div>
        <button style={styles.addBtn} onClick={() => navigate('/tasks/create')}>
          <Plus size={16} /> Create Task
        </button>
      </div>

      {/* Summary Strip */}
      <div style={styles.summaryStrip}>
        {COLUMNS.map(col => (
          <div key={col.key} style={styles.summaryCard}>
            <div style={{ ...styles.summaryDot, background: col.color }} />
            <div>
              <p style={styles.summaryVal}>{tasks.filter(t => t.status === col.key).length}</p>
              <p style={styles.summaryLabel}>{col.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search tasks or assignee..." />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <FilterDropdown label="Priority" options={['All Priorities', 'High', 'Medium', 'Low']} selected={priorityFilter} onChange={setPriorityFilter} />
          <div style={styles.viewToggle}>
            <button onClick={() => setView('kanban')} style={{ ...styles.viewBtn, background: view === 'kanban' ? '#2563eb' : 'transparent', color: view === 'kanban' ? '#fff' : '#94a3b8' }}>
              <LayoutGrid size={15} />
            </button>
            <button onClick={() => setView('list')} style={{ ...styles.viewBtn, background: view === 'list' ? '#2563eb' : 'transparent', color: view === 'list' ? '#fff' : '#94a3b8' }}>
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div style={styles.kanban}>
          {COLUMNS.map(col => {
            const colTasks = filtered.filter(t => t.status === col.key)
            return (
              <div key={col.key} style={styles.column}>
                <div style={styles.columnHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                    <span style={styles.columnTitle}>{col.label}</span>
                  </div>
                  <span style={{ ...styles.countBadge, background: `${col.color}1A`, color: col.color }}>{colTasks.length}</span>
                </div>
                <div style={styles.columnBody}>
                  {colTasks.map(task => (
                    <div key={task.id} style={styles.taskCard} onClick={() => setSelected(task)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <PriorityLabel priority={task.priority} />
                        <span style={styles.categoryTag}>{task.category}</span>
                      </div>
                      <p style={styles.taskTitle}>{task.title}</p>
                      <p style={styles.taskDesc}>{task.description}</p>
                      {task.progress > 0 && task.progress < 100 && (
                        <div style={{ margin: '10px 0 4px' }}>
                          <ProgressBar value={task.progress} />
                        </div>
                      )}
                      <div style={styles.taskFooter}>
                        <div style={styles.assignee}>
                          <div style={styles.assigneeAvatar}>{task.assignedAvatar}</div>
                          <span>{task.assignedTo}</span>
                        </div>
                        <div style={styles.dueDate}>
                          <Calendar size={11} />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div style={styles.emptyCol}>No tasks</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div style={styles.listCard}>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Task', 'Priority', 'Status', 'Assigned To', 'Due Date', 'Progress'].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(task => (
                  <tr key={task.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(task)}>
                    <td style={styles.td}>
                      <p style={{ fontWeight: '600', color: '#0f172a', fontSize: '13.5px' }}>{task.title}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{task.category}</p>
                    </td>
                    <td style={styles.td}><PriorityLabel priority={task.priority} /></td>
                    <td style={styles.td}><StatusBadge status={task.status} /></td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={styles.assigneeAvatarSm}>{task.assignedAvatar}</div>
                        <span style={{ fontSize: '13px', color: '#374151' }}>{task.assignedTo}</span>
                      </div>
                    </td>
                    <td style={styles.td}><span style={{ fontSize: '12.5px', color: '#94a3b8' }}>{task.dueDate}</span></td>
                    <td style={styles.td}><ProgressBar value={task.progress} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Task Details" width="520px">
        {selected && (
          <div style={styles.modalContent}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <PriorityLabel priority={selected.priority} />
              <StatusBadge status={selected.status} />
              <span style={styles.categoryTag}>{selected.category}</span>
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>{selected.title}</h3>
            <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px' }}>{selected.description}</p>

            <div style={styles.modalRow}><User size={15} color="#94a3b8" /><span><strong>Assigned To:</strong> {selected.assignedTo}</span></div>
            <div style={styles.modalRow}><Calendar size={15} color="#94a3b8" /><span><strong>Due Date:</strong> {selected.dueDate}</span></div>

            <div style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Progress</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#2563eb' }}>{selected.progress}%</span>
              </div>
              <ProgressBar value={selected.progress} showLabel={false} />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              <button style={styles.modalEditBtn}>Edit Task</button>
              <button onClick={() => setSelected(null)} style={styles.modalCloseBtn}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
  summaryStrip: { display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' },
  summaryCard: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '14px 18px', flex: 1, minWidth: '130px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  summaryDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  summaryVal: { fontSize: '20px', fontWeight: '800', color: '#0f172a' },
  summaryLabel: { fontSize: '12px', color: '#94a3b8' },
  toolbar: { display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
  viewToggle: { display: 'flex', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' },
  viewBtn: { width: '36px', height: '36px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' },
  kanban: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'flex-start' },
  column: { background: '#f8fafc', borderRadius: '14px', overflow: 'hidden', minHeight: '200px' },
  columnHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #f1f5f9', background: '#fff' },
  columnTitle: { fontSize: '13px', fontWeight: '700', color: '#0f172a' },
  countBadge: { fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' },
  columnBody: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' },
  taskCard: { background: '#fff', borderRadius: '12px', padding: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', cursor: 'pointer', transition: 'box-shadow 0.15s' },
  taskTitle: { fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '8px 0 4px', lineHeight: '1.4' },
  taskDesc: { fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' },
  taskFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap', gap: '6px' },
  assignee: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' },
  assigneeAvatar: { width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#fff' },
  dueDate: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#94a3b8' },
  categoryTag: { fontSize: '11px', fontWeight: '600', color: '#94a3b8', background: '#f1f5f9', padding: '3px 8px', borderRadius: '20px' },
  emptyCol: { textAlign: 'center', padding: '20px', color: '#cbd5e1', fontSize: '12.5px' },
  listCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '20px' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '740px' },
  th: { textAlign: 'left', fontSize: '11.5px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.4px', textTransform: 'uppercase', padding: '10px 14px', borderBottom: '1.5px solid #f1f5f9' },
  td: { padding: '14px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' },
  assigneeAvatarSm: { width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#fff', flexShrink: 0 },
  modalContent: {},
  modalRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#374151', marginBottom: '10px' },
  modalEditBtn: { flex: 1, padding: '11px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer' },
  modalCloseBtn: { flex: 1, padding: '11px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#374151', cursor: 'pointer' },
}
