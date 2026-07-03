import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Mail, Phone, Building2, MapPin, Tag, Save } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'

export default function AddCustomer() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    address: '', status: 'active', notes: '',
  })

  const update = (key, val) => setForm({ ...form, [key]: val })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/customers')
  }

  return (
    <DashboardLayout pageTitle="Add Customer">
      <button onClick={() => navigate('/customers')} style={styles.backBtn}>
        <ArrowLeft size={15} /> Back to Customer List
      </button>

      <div style={styles.headerBlock}>
        <h2 style={styles.pageHeading}>Add New Customer</h2>
        <p style={styles.pageSub}>Fill in the details below to add a new customer to your CRM</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.formGrid}>
        {/* Left Column - Form Fields */}
        <div style={styles.formCard}>
          <h3 style={styles.sectionTitle}>Basic Information</h3>

          <div style={styles.row2}>
            <Field label="Full Name" icon={User} required>
              <input
                style={styles.input}
                placeholder="e.g. Sarah Mitchell"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                required
              />
            </Field>
            <Field label="Company" icon={Building2}>
              <input
                style={styles.input}
                placeholder="e.g. Tech Solutions Inc."
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
                placeholder="customer@company.com"
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

          <Field label="Address" icon={MapPin}>
            <input
              style={styles.input}
              placeholder="Street, City, Country"
              value={form.address}
              onChange={e => update('address', e.target.value)}
            />
          </Field>

          <Field label="Status" icon={Tag}>
            <div style={styles.statusOptions}>
              {['active', 'pending', 'inactive'].map(s => (
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
              placeholder="Any additional notes about this customer..."
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
            />
          </Field>

          <div style={styles.actions}>
            <button type="button" onClick={() => navigate('/customers')} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" style={styles.saveBtn}>
              <Save size={16} /> Save Customer
            </button>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div style={styles.previewCard}>
          <p style={styles.previewLabel}>PREVIEW</p>
          <div style={styles.previewAvatar}>
            {form.name ? form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?'}
          </div>
          <h3 style={styles.previewName}>{form.name || 'Customer Name'}</h3>
          <p style={styles.previewCompany}>{form.company || 'Company name'}</p>

          <div style={styles.previewDivider} />

          <div style={styles.previewRow}>
            <Mail size={14} color="#94a3b8" />
            <span>{form.email || 'email@example.com'}</span>
          </div>
          <div style={styles.previewRow}>
            <Phone size={14} color="#94a3b8" />
            <span>{form.phone || '+1 (555) 000-0000'}</span>
          </div>
          <div style={styles.previewRow}>
            <MapPin size={14} color="#94a3b8" />
            <span>{form.address || 'Address not provided'}</span>
          </div>

          <div style={{
            ...styles.previewStatus,
            background: form.status === 'active' ? '#dcfce7' : form.status === 'pending' ? '#fef3c7' : '#fee2e2',
            color: form.status === 'active' ? '#16a34a' : form.status === 'pending' ? '#d97706' : '#dc2626',
          }}>
            {form.status}
          </div>
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
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) minmax(260px, 1fr)',
    gap: '20px',
    alignItems: 'flex-start',
  },
  formCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '26px',
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
  previewCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '26px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'sticky',
    top: '90px',
  },
  previewLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#cbd5e1',
    letterSpacing: '1px',
    alignSelf: 'flex-start',
    marginBottom: '16px',
  },
  previewAvatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '14px',
  },
  previewName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
  },
  previewCompany: {
    fontSize: '13px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  previewDivider: {
    width: '100%',
    height: '1px',
    background: '#f1f5f9',
    margin: '18px 0',
  },
  previewRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12.5px',
    color: '#64748b',
    width: '100%',
    marginBottom: '10px',
    textAlign: 'left',
  },
  previewStatus: {
    marginTop: '14px',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
}
