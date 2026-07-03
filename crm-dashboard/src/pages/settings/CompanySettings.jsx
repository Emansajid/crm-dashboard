import { useState } from 'react'
import { Building2, Mail, Phone, MapPin, Globe, Image, Save, Clock, DollarSign } from 'lucide-react'
import ToggleSwitch from '../../components/shared/ToggleSwitch'

const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Education', 'Other']
const currencies = ['USD ($)', 'EUR (€)', 'GBP (£)', 'PKR (₨)', 'AED (د.إ)']
const timezones = ['(GMT-5) Eastern Time', '(GMT+0) London', '(GMT+5) Pakistan Standard Time', '(GMT+9) Tokyo']

export default function CompanySettings() {
  const [company, setCompany] = useState({
    name: 'NexaCRM Solutions Inc.',
    email: 'contact@nexacrm.com',
    phone: '+1 (555) 987-6543',
    website: 'www.nexacrm.com',
    address: '221B Corporate Ave, San Francisco, CA',
    industry: 'Technology',
    currency: 'USD ($)',
    timezone: '(GMT-5) Eastern Time',
  })

  const [prefs, setPrefs] = useState({
    autoAssignLeads: true,
    weekendWorking: false,
    invoiceReminders: true,
  })

  const [savedMsg, setSavedMsg] = useState('')

  const update = (key, val) => setCompany({ ...company, [key]: val })
  const togglePref = (key) => setPrefs({ ...prefs, [key]: !prefs[key] })

  const handleSave = (e) => {
    e.preventDefault()
    setSavedMsg('Company settings saved successfully.')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  const prefItems = [
    { key: 'autoAssignLeads', label: 'Auto-assign New Leads', desc: 'Automatically distribute new leads to available employees' },
    { key: 'weekendWorking', label: 'Weekend Working Days', desc: 'Include Saturday and Sunday in scheduling and reports' },
    { key: 'invoiceReminders', label: 'Invoice Reminders', desc: 'Send automatic reminders for pending invoices' },
  ]

  return (
    <form onSubmit={handleSave} style={styles.grid}>
      {/* Left column - Company Info */}
      <div style={styles.leftCol}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Company Information</h3>

          <div style={styles.logoRow}>
            <div style={styles.logoBox}>
              <Building2 size={24} color="#2563eb" />
            </div>
            <div>
              <button type="button" style={styles.uploadBtn}>
                <Image size={14} /> Upload Logo
              </button>
              <p style={styles.logoHint}>PNG or SVG, up to 2MB</p>
            </div>
          </div>

          <Field label="Company Name" icon={Building2}>
            <input style={styles.input} value={company.name} onChange={e => update('name', e.target.value)} />
          </Field>

          <div style={styles.row2}>
            <Field label="Company Email" icon={Mail}>
              <input type="email" style={styles.input} value={company.email} onChange={e => update('email', e.target.value)} />
            </Field>
            <Field label="Company Phone" icon={Phone}>
              <input style={styles.input} value={company.phone} onChange={e => update('phone', e.target.value)} />
            </Field>
          </div>

          <div style={styles.row2}>
            <Field label="Website" icon={Globe}>
              <input style={styles.input} value={company.website} onChange={e => update('website', e.target.value)} />
            </Field>
            <Field label="Industry" icon={Building2}>
              <select style={styles.select} value={company.industry} onChange={e => update('industry', e.target.value)}>
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Business Address" icon={MapPin}>
            <input style={styles.input} value={company.address} onChange={e => update('address', e.target.value)} />
          </Field>
        </div>

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Regional Settings</h3>
          <div style={styles.row2}>
            <Field label="Currency" icon={DollarSign}>
              <select style={styles.select} value={company.currency} onChange={e => update('currency', e.target.value)}>
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Timezone" icon={Clock}>
              <select style={styles.select} value={company.timezone} onChange={e => update('timezone', e.target.value)}>
                {timezones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
          </div>
        </div>
      </div>

      {/* Right column - Business Preferences */}
      <div style={styles.rightCol}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Business Preferences</h3>
          <div style={styles.prefList}>
            {prefItems.map(({ key, label, desc }) => (
              <div key={key} style={styles.prefRow}>
                <div>
                  <p style={styles.prefLabel}>{label}</p>
                  <p style={styles.prefDesc}>{desc}</p>
                </div>
                <ToggleSwitch checked={prefs[key]} onChange={() => togglePref(key)} />
              </div>
            ))}
          </div>
        </div>

        <div style={styles.saveCard}>
          {savedMsg && <p style={styles.savedMsg}>{savedMsg}</p>}
          <button type="submit" style={styles.saveBtn}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </form>
  )
}

function Field({ label, icon: Icon, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        {Icon && <Icon size={16} color="#94a3b8" style={styles.inputIcon} />}
        {children}
      </div>
    </div>
  )
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(280px, 1fr)', gap: '20px', alignItems: 'flex-start' },
  leftCol: { display: 'flex', flexDirection: 'column', gap: '20px' },
  rightCol: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '26px' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' },
  logoRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' },
  logoBox: { width: '64px', height: '64px', borderRadius: '14px', background: '#eff6ff', border: '1.5px dashed #93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  uploadBtn: { display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 16px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '12.5px', fontWeight: '600', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' },
  logoHint: { fontSize: '11.5px', color: '#94a3b8', marginTop: '6px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '14px' },
  input: { width: '100%', padding: '11px 14px 11px 40px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', color: '#0f172a', fontFamily: 'inherit', background: '#fff' },
  select: { width: '100%', padding: '11px 14px 11px 40px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', color: '#0f172a', fontFamily: 'inherit', background: '#fff', appearance: 'auto', cursor: 'pointer' },
  prefList: { display: 'flex', flexDirection: 'column', gap: '18px' },
  prefRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' },
  prefLabel: { fontSize: '13.5px', fontWeight: '600', color: '#0f172a' },
  prefDesc: { fontSize: '12px', color: '#94a3b8', marginTop: '2px', maxWidth: '220px' },
  saveCard: { display: 'flex', flexDirection: 'column', gap: '10px' },
  savedMsg: { fontSize: '12.5px', fontWeight: '600', color: '#16a34a', background: '#dcfce7', padding: '10px 14px', borderRadius: '10px', textAlign: 'center' },
  saveBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 22px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
}
