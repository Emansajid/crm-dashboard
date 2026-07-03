import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Building2, MapPin, Calendar, Edit, DollarSign, FileText, MessageSquare, Clock } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatusBadge from '../../components/shared/StatusBadge'
import { customers } from '../../data/mockData'

const activityLog = [
  { icon: MessageSquare, text: 'Email sent: Quarterly proposal', time: '2 days ago', color: '#2563eb' },
  { icon: Phone, text: 'Phone call: Discussed contract renewal', time: '5 days ago', color: '#10b981' },
  { icon: FileText, text: 'Invoice #INV-2041 generated', time: '1 week ago', color: '#8b5cf6' },
  { icon: Clock, text: 'Customer profile created', time: '3 weeks ago', color: '#94a3b8' },
]

export default function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const customer = customers.find(c => c.id === Number(id)) || customers[0]

  return (
    <DashboardLayout pageTitle="Customer Profile">
      <button onClick={() => navigate('/customers')} style={styles.backBtn}>
        <ArrowLeft size={15} /> Back to Customer List
      </button>

      <div style={styles.grid}>
        {/* Left - Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.coverBg} />
          <div style={styles.avatarLg}>{customer.avatar}</div>
          <h2 style={styles.name}>{customer.name}</h2>
          <p style={styles.company}>{customer.company}</p>
          <div style={{ marginTop: '10px' }}>
            <StatusBadge status={customer.status} />
          </div>

          <button style={styles.editBtn}>
            <Edit size={14} /> Edit Profile
          </button>

          <div style={styles.divider} />

          <div style={styles.infoList}>
            <InfoRow icon={Mail} label="Email" value={customer.email} />
            <InfoRow icon={Phone} label="Phone" value={customer.phone} />
            <InfoRow icon={Building2} label="Company" value={customer.company} />
            <InfoRow icon={MapPin} label="Location" value="Lahore, Pakistan" />
            <InfoRow icon={Calendar} label="Customer Since" value={customer.joined} />
          </div>
        </div>

        {/* Right - Stats & Activity */}
        <div style={styles.rightCol}>
          {/* Stat boxes */}
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <div style={{ ...styles.statIcon, background: '#eff6ff' }}>
                <DollarSign size={18} color="#2563eb" />
              </div>
              <div>
                <p style={styles.statVal}>{customer.value}</p>
                <p style={styles.statLabel}>Lifetime Value</p>
              </div>
            </div>
            <div style={styles.statBox}>
              <div style={{ ...styles.statIcon, background: '#dcfce7' }}>
                <FileText size={18} color="#16a34a" />
              </div>
              <div>
                <p style={styles.statVal}>14</p>
                <p style={styles.statLabel}>Invoices</p>
              </div>
            </div>
            <div style={styles.statBox}>
              <div style={{ ...styles.statIcon, background: '#ede9fe' }}>
                <MessageSquare size={18} color="#7c3aed" />
              </div>
              <div>
                <p style={styles.statVal}>32</p>
                <p style={styles.statLabel}>Interactions</p>
              </div>
            </div>
          </div>

          {/* Activity timeline */}
          <div style={styles.activityCard}>
            <h3 style={styles.sectionTitle}>Activity Timeline</h3>
            <div style={styles.timeline}>
              {activityLog.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} style={styles.timelineItem}>
                    <div style={{ ...styles.timelineIcon, background: `${item.color}1A` }}>
                      <Icon size={14} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={styles.timelineText}>{item.text}</p>
                      <p style={styles.timelineTime}>{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Notes */}
          <div style={styles.notesCard}>
            <h3 style={styles.sectionTitle}>Notes</h3>
            <p style={styles.notesText}>
              Long-term client, very responsive to email communication. Prefers quarterly check-in calls.
              Renewed contract last cycle without negotiation friction. Good candidate for upsell on premium tier.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div style={styles.infoRow}>
      <div style={styles.infoIconBox}>
        <Icon size={14} color="#64748b" />
      </div>
      <div>
        <p style={styles.infoLabel}>{label}</p>
        <p style={styles.infoValue}>{value}</p>
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(260px, 320px) 1fr',
    gap: '20px',
    alignItems: 'flex-start',
  },
  profileCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '0 24px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  coverBg: {
    width: '100%',
    height: '70px',
    background: 'linear-gradient(135deg, #0f172a, #2563eb)',
    margin: '0 -24px',
    marginBottom: '-36px',
  },
  avatarLg: {
    width: '84px',
    height: '84px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    border: '4px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
  },
  name: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
  },
  company: {
    fontSize: '13.5px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  editBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#eff6ff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#2563eb',
    cursor: 'pointer',
    marginTop: '18px',
    width: '100%',
    justifyContent: 'center',
  },
  divider: {
    width: '100%',
    height: '1px',
    background: '#f1f5f9',
    margin: '20px 0',
  },
  infoList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
  },
  infoIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: '11px',
    color: '#94a3b8',
  },
  infoValue: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#0f172a',
    marginTop: '1px',
    wordBreak: 'break-word',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  statBox: {
    flex: 1,
    minWidth: '160px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: '#fff',
    borderRadius: '14px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    padding: '18px',
  },
  statIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statVal: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  activityCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '22px',
  },
  sectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '18px',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  timelineIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  timelineText: {
    fontSize: '13px',
    color: '#374151',
    fontWeight: '500',
  },
  timelineTime: {
    fontSize: '11.5px',
    color: '#94a3b8',
    marginTop: '2px',
  },
  notesCard: {
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    padding: '22px',
  },
  notesText: {
    fontSize: '13.5px',
    color: '#64748b',
    lineHeight: '1.7',
  },
}
