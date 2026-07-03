import { useState } from 'react'
import { User, Mail, Phone, Camera, Lock, Bell, Save, Shield } from 'lucide-react'
import ToggleSwitch from '../../components/shared/ToggleSwitch'

export default function AccountSettings() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@nexacrm.com',
    phone: '+1 (555) 012-3456',
    role: 'Super Admin',
  })

  const [password, setPassword] = useState({ current: '', next: '', confirm: '' })

  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    taskReminders: true,
    leadUpdates: false,
    weeklyReports: true,
    smsAlerts: false,
  })

  const [savedMsg, setSavedMsg] = useState('')

  const updateProfile = (key, val) => setProfile({ ...profile, [key]: val })
  const updatePassword = (key, val) => setPassword({ ...password, [key]: val })
  const toggleNotif = (key) => setNotifs({ ...notifs, [key]: !notifs[key] })

  const handleSave = (e) => {
    e.preventDefault()
    setSavedMsg('Account settings saved successfully.')
    setTimeout(() => setSavedMsg(''), 2500)
  }

  const notifItems = [
    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Get notified by email for important account activity' },
    { key: 'taskReminders', label: 'Task Reminders', desc: 'Receive reminders for upcoming and overdue tasks' },
    { key: 'leadUpdates', label: 'Lead Updates', desc: 'Get notified when a new lead is assigned to you' },
    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive a weekly performance summary' },
    { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Get critical alerts via text message' },
  ]

  return (
    <form onSubmit={handleSave} style={styles.grid}>
      {/* Left column - Profile + Security */}
      <div style={styles.leftCol}>
        {/* Profile Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Profile Information</h3>

          <div style={styles.profileRow}>
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}>
                {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <button type="button" style={styles.cameraBtn} title="Change photo">
                <Camera size={13} color="#fff" />
              </button>
            </div>
            <div>
              <p style={styles.avatarName}>{profile.name}</p>
              <span style={styles.roleTag}>{profile.role}</span>
            </div>
          </div>

          <div style={styles.row2}>
            <Field label="Full Name" icon={User}>
              <input
                style={styles.input}
                value={profile.name}
                onChange={e => updateProfile('name', e.target.value)}
              />
            </Field>
            <Field label="Phone Number" icon={Phone}>
              <input
                style={styles.input}
                value={profile.phone}
                onChange={e => updateProfile('phone', e.target.value)}
              />
            </Field>
          </div>

          <Field label="Email Address" icon={Mail}>
            <input
              type="email"
              style={styles.input}
              value={profile.email}
              onChange={e => updateProfile('email', e.target.value)}
            />
          </Field>
        </div>

        {/* Security Card */}
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            <Shield size={16} color="#0f172a" style={{ marginRight: '8px', verticalAlign: '-2px' }} />
            Security
          </h3>

          <Field label="Current Password" icon={Lock}>
            <input
              type="password"
              style={styles.input}
              placeholder="••••••••"
              value={password.current}
              onChange={e => updatePassword('current', e.target.value)}
            />
          </Field>

          <div style={styles.row2}>
            <Field label="New Password" icon={Lock}>
              <input
                type="password"
                style={styles.input}
                placeholder="••••••••"
                value={password.next}
                onChange={e => updatePassword('next', e.target.value)}
              />
            </Field>
            <Field label="Confirm New Password" icon={Lock}>
              <input
                type="password"
                style={styles.input}
                placeholder="••••••••"
                value={password.confirm}
                onChange={e => updatePassword('confirm', e.target.value)}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Right column - Notification Preferences */}
      <div style={styles.rightCol}>
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>
            <Bell size={16} color="#0f172a" style={{ marginRight: '8px', verticalAlign: '-2px' }} />
            Notification Preferences
          </h3>

          <div style={styles.notifList}>
            {notifItems.map(({ key, label, desc }) => (
              <div key={key} style={styles.notifRow}>
                <div>
                  <p style={styles.notifLabel}>{label}</p>
                  <p style={styles.notifDesc}>{desc}</p>
                </div>
                <ToggleSwitch checked={notifs[key]} onChange={() => toggleNotif(key)} />
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
  profileRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' },
  avatarWrap: { position: 'relative' },
  avatar: { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', color: '#fff' },
  cameraBtn: { position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#0f172a', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  avatarName: { fontSize: '15px', fontWeight: '700', color: '#0f172a' },
  roleTag: { display: 'inline-block', marginTop: '4px', fontSize: '11.5px', fontWeight: '700', color: '#2563eb', background: '#eff6ff', padding: '3px 10px', borderRadius: '20px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '14px' },
  input: { width: '100%', padding: '11px 14px 11px 40px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', color: '#0f172a', fontFamily: 'inherit', background: '#fff' },
  notifList: { display: 'flex', flexDirection: 'column', gap: '18px' },
  notifRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' },
  notifLabel: { fontSize: '13.5px', fontWeight: '600', color: '#0f172a' },
  notifDesc: { fontSize: '12px', color: '#94a3b8', marginTop: '2px', maxWidth: '220px' },
  saveCard: { display: 'flex', flexDirection: 'column', gap: '10px' },
  savedMsg: { fontSize: '12.5px', fontWeight: '600', color: '#16a34a', background: '#dcfce7', padding: '10px 14px', borderRadius: '10px', textAlign: 'center' },
  saveBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px 22px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
}
