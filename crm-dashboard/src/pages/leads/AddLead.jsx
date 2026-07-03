import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, Building2, Tag, Save, Target } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'

const sources = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Event']

export default function AddLead() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    source: 'Website', status: 'new', assignedTo: 'Admin User', notes: '',
  })

  const update = (key, val) => setForm({ ...form, [key]: val })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/leads')
  }

  return (
    <DashboardLayout pageTitle="Add Lead">
      <button onClick={() => navigate('/leads')} style={styles.backBtn}>
        <ArrowLeft size={15} /> Back to Lead Management
      </button>

      <div style={styles.headerBlock}>
        <h2 style={styles.pageHeading}>Add New Lead</h2>
        <p style={styles.pageSub}>Capture lead details to start tracking them through your pipeline</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.formCard}>
        <h3 style={styles.sectionTitle}>Lead Information</h3>

        <div style={styles.row2}>
          <Field label="Full Name" icon={User} required>
            <input
              style={styles.input}
              placeholder="e.g. Robert Hayes"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              required
            />
          </Field>
          <Field label="Company" icon={Building2}>
            <input
              style={styles.input}
              placeholder="e.g. New Venture Capital"
              value={form.company}
              onChange={e => update('company', e.target.value)}
            />
          </Field>
        </div>

        <div style={styles.row2}>
          <Field label="Email Address" icon={Mail} required>
            <input
              type="email"
              style={styles.input}
              placeholder="lead@company.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              required
            />
          </Field>
          <Field label="Phone Number" icon={Phone}>
            <input
              style={styles.input}
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={e => update('phone', e.target.value)}
            />
          </Field>
        </div>

        <div style={styles.row2}>
          <Field label="Lead Source" icon={Tag}>
            <select
              style={{ ...styles.input, appearance: 'auto', cursor: 'pointer' }}
              value={form.source}
              onChange={e => update('source', e.target.value)}
            >
              {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Assigned To" icon={Target}>
            <select
              style={{ ...styles.input, appearance: 'auto', cursor: 'pointer' }}
              value={form.assignedTo}
              onChange={e => update('assignedTo', e.target.value)}
            >
              <option>Admin User</option>
              <option>Sarah Lee</option>
            </select>
          </Field>
        </div>

        <Field label="Lead Status">
          <div style={styles.statusOptions}>
            {['new', 'contacted', 'qualified'].map(s => (
              <button
                type="button"
                key={s}
                onClick={() => update('status', s)}
                style={{
                  ...styles.statusOption,
                  background: form.status === s ? '#eff6ff' : '#fff',
                  borderColor: form.status === s ? '#2563eb' : '#e2e8f0',
                  color: form.status === s ? '#2563eb' : '#64748b',
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Notes (Optional)">
          <textarea
            style={{ ...styles.input, minHeight: '90px', resize: 'vertical', paddingTop: '12px' }}
            placeholder="Initial contact details, interests, requirements..."
            value={form.notes}
            onChange={e => update('notes', e.target.value)}
          />
        </Field>

        <div style={styles.actions}>
          <button type="button" onClick={() => navigate('/leads')} style={styles.cancelBtn}>
            Cancel
          </button>
          <button type="submit" style={styles.saveBtn}>
            <Save size={16} /> Save Lead
          </button>
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
      <div style={styles.inputWrap}>
        {Icon && <Icon size={16} color="#94a3b8" style={styles.inputIcon} />}
        {children}
      </div>
    </div>
  )
}

const styles = {
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '13.5px',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '20px',
    fontFamily: 'inherit',
  },
  headerBlock: {
    marginBottom: '24px',
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
  formCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '26px',
    maxWidth: '700px',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '20px',
    paddingBottom: '14px',
    borderBottom: '1px solid #f1f5f9',
  },
  row2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '18px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
  },
  input: {
    width: '100%',
    padding: '11px 14px 11px 40px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '13.5px',
    color: '#0f172a',
    fontFamily: 'inherit',
    background: '#fff',
  },
  statusOptions: {
    display: 'flex',
    gap: '10px',
  },
  statusOption: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1.5px solid',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '8px',
    paddingTop: '18px',
    borderTop: '1px solid #f1f5f9',
  },
  cancelBtn: {
    padding: '11px 20px',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#374151',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  saveBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 22px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13.5px',
    fontWeight: '600',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
  },
}
