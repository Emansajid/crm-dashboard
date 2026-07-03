import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, Tag, User, Calendar, Save, AlertCircle } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { employees } from '../../data/mockData'

const categories = ['Sales', 'Operations', 'HR', 'Marketing', 'Engineering', 'Reports', 'Finance']

export default function CreateTask() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', description: '', priority: 'medium',
    status: 'todo', assignedTo: '', dueDate: '', category: 'Sales',
  })

  const update = (key, val) => setForm({ ...form, [key]: val })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/tasks')
  }

  return (
    <DashboardLayout pageTitle="Create Task">
      <button onClick={() => navigate('/tasks')} style={styles.backBtn}>
        <ArrowLeft size={15} /> Back to Tasks
      </button>

      <div style={styles.headerBlock}>
        <h2 style={styles.pageHeading}>Create New Task</h2>
        <p style={styles.pageSub}>Assign a task to a team member and set a deadline</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.layout}>
        {/* Main form */}
        <div style={styles.formCard}>
          <h3 style={styles.sectionTitle}>Task Details</h3>

          <Field label="Task Title" icon={FileText} required>
            <input
              style={styles.input}
              placeholder="e.g. Follow up with client XYZ"
              value={form.title}
              onChange={e => update('title', e.target.value)}
              required
            />
          </Field>

          <Field label="Description">
            <textarea
              style={{ ...styles.input, minHeight: '100px', resize: 'vertical', paddingTop: '12px', paddingLeft: '14px' }}
              placeholder="Add more details about this task..."
              value={form.description}
              onChange={e => update('description', e.target.value)}
            />
          </Field>

          <div style={styles.row2}>
            <Field label="Category" icon={Tag}>
              <select
                style={{ ...styles.input, appearance: 'auto', cursor: 'pointer' }}
                value={form.category}
                onChange={e => update('category', e.target.value)}
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Assign To" icon={User}>
              <select
                style={{ ...styles.input, appearance: 'auto', cursor: 'pointer' }}
                value={form.assignedTo}
                onChange={e => update('assignedTo', e.target.value)}
              >
                <option value="">Select employee...</option>
                {employees.map(e => <option key={e.id} value={e.name}>{e.name} — {e.role}</option>)}
              </select>
            </Field>
          </div>

          <div style={styles.row2}>
            <Field label="Due Date" icon={Calendar}>
              <input
                type="date"
                style={{ ...styles.input }}
                value={form.dueDate}
                onChange={e => update('dueDate', e.target.value)}
              />
            </Field>
            <Field label="Initial Status">
              <div style={{ display: 'flex', gap: '8px' }}>
                {['todo', 'in-progress'].map(s => (
                  <button
                    type="button" key={s}
                    onClick={() => update('status', s)}
                    style={{ ...styles.statusBtn, background: form.status === s ? '#eff6ff' : '#fff', borderColor: form.status === s ? '#2563eb' : '#e2e8f0', color: form.status === s ? '#2563eb' : '#64748b' }}
                  >
                    {s === 'todo' ? 'To Do' : 'In Progress'}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <div style={styles.actions}>
            <button type="button" onClick={() => navigate('/tasks')} style={styles.cancelBtn}>Cancel</button>
            <button type="submit" style={styles.saveBtn}><Save size={16} /> Create Task</button>
          </div>
        </div>

        {/* Priority Panel */}
        <div style={styles.sidePanel}>
          <div style={styles.priorityCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <AlertCircle size={16} color="#64748b" />
              <h3 style={styles.sectionTitle}>Priority Level</h3>
            </div>
            {[
              { val: 'high', label: 'High', desc: 'Urgent — needs immediate attention', color: '#dc2626', bg: '#fee2e2' },
              { val: 'medium', label: 'Medium', desc: 'Important but not urgent', color: '#d97706', bg: '#fef3c7' },
              { val: 'low', label: 'Low', desc: 'Can be done when time permits', color: '#16a34a', bg: '#dcfce7' },
            ].map(p => (
              <button
                type="button"
                key={p.val}
                onClick={() => update('priority', p.val)}
                style={{
                  ...styles.priorityOption,
                  border: form.priority === p.val ? `2px solid ${p.color}` : '2px solid #f1f5f9',
                  background: form.priority === p.val ? p.bg : '#f8fafc',
                }}
              >
                <div style={{ ...styles.priorityDot, background: p.color }} />
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '13.5px', fontWeight: '700', color: form.priority === p.val ? p.color : '#374151' }}>{p.label}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{p.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Preview */}
          {form.title && (
            <div style={styles.previewCard}>
              <p style={styles.previewLabel}>PREVIEW</p>
              <p style={styles.previewTitle}>{form.title}</p>
              {form.assignedTo && <p style={styles.previewSub}>👤 {form.assignedTo}</p>}
              {form.dueDate && <p style={styles.previewSub}>📅 {form.dueDate}</p>}
              <p style={styles.previewSub}>🏷️ {form.category}</p>
            </div>
          )}
        </div>
      </form>
    </DashboardLayout>
  )
}

function Field({ label, icon: Icon, required, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && <Icon size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', zIndex: 1, pointerEvents: 'none' }} />}
        {children}
      </div>
    </div>
  )
}

const styles = {
  backBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748b', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', marginBottom: '20px', fontFamily: 'inherit' },
  headerBlock: { marginBottom: '24px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(240px, 1fr)', gap: '20px', alignItems: 'flex-start' },
  formCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '26px' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a', margin: 0 },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  input: { width: '100%', padding: '11px 14px 11px 40px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', color: '#0f172a', fontFamily: 'inherit', background: '#fff' },
  statusBtn: { flex: 1, padding: '10px 8px', borderRadius: '10px', border: '1.5px solid', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  actions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px', paddingTop: '18px', borderTop: '1px solid #f1f5f9' },
  cancelBtn: { padding: '11px 20px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' },
  saveBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 22px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
  sidePanel: { display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '90px' },
  priorityCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '22px', display: 'flex', flexDirection: 'column', gap: '10px' },
  priorityOption: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontFamily: 'inherit', width: '100%', transition: 'all 0.15s' },
  priorityDot: { width: '10px', height: '10px', borderRadius: '50%', marginTop: '4px', flexShrink: 0 },
  previewCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '18px' },
  previewLabel: { fontSize: '11px', fontWeight: '700', color: '#cbd5e1', letterSpacing: '1px', marginBottom: '10px' },
  previewTitle: { fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '8px', lineHeight: '1.4' },
  previewSub: { fontSize: '12.5px', color: '#64748b', marginBottom: '5px' },
}
