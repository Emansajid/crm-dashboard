import { useState } from 'react'
import { User, Building2 } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import AccountSettings from './AccountSettings'
import CompanySettings from './CompanySettings'

const tabs = [
  { id: 'account', label: 'Account Settings', icon: User },
  { id: 'company', label: 'Company Settings', icon: Building2 },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <DashboardLayout pageTitle="Settings">
      <div style={styles.headerBlock}>
        <h2 style={styles.pageHeading}>Settings</h2>
        <p style={styles.pageSub}>Manage your account preferences and company information</p>
      </div>

      <div style={styles.tabBar}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              ...styles.tabBtn,
              background: activeTab === id ? '#fff' : 'transparent',
              color: activeTab === id ? '#2563eb' : '#64748b',
              boxShadow: activeTab === id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'account' ? <AccountSettings /> : <CompanySettings />}
    </DashboardLayout>
  )
}

const styles = {
  headerBlock: { marginBottom: '20px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  tabBar: {
    display: 'inline-flex',
    gap: '4px',
    background: '#f1f5f9',
    padding: '5px',
    borderRadius: '12px',
    marginBottom: '22px',
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 18px',
    border: 'none',
    borderRadius: '9px',
    fontSize: '13.5px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s ease',
  },
}
