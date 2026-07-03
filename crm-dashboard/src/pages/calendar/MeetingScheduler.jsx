import { useState } from 'react'
import { Plus, Clock, MapPin, Users, Video, Building2, Phone, Calendar, ChevronRight } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Modal from '../../components/shared/Modal'
import { meetings, employees } from '../../data/mockData'

const locationTypes = [
  { val: 'zoom', label: 'Zoom Call', icon: Video },
  { val: 'office', label: 'Office Room', icon: Building2 },
  { val: 'phone', label: 'Phone Call', icon: Phone },
  { val: 'client', label: 'Client Site', icon: MapPin },
]

const timeSlots = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM']

export default function MeetingScheduler() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', time: '', duration: '30m', type: 'internal', location: 'zoom', attendees: [] })
  const update = (k, v) => setForm({ ...form, [k]: v })

  const today = new Date().toISOString().split('T')[0]
  const todayMeetings = meetings.filter(m => m.date === today)
  const upcoming = meetings.filter(m => m.date > today).slice(0, 6)

  return (
    <DashboardLayout pageTitle="Meeting Scheduler">
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Meeting Scheduler</h2>
          <p style={styles.pageSub}>Schedule and track all your meetings</p>
        </div>
        <button onClick={() => setShowModal(true)} style={styles.addBtn}>
          <Plus size={16} /> Schedule Meeting
        </button>
      </div>

      {/* Summary */}
      <div style={styles.summaryStrip}>
        {[
          { label: "Today's Meetings", val: todayMeetings.length, color: '#2563eb' },
          { label: 'This Week', val: meetings.filter(m => m.date >= today).length, color: '#7c3aed' },
          { label: 'Client Meetings', val: meetings.filter(m => m.type === 'client').length, color: '#16a34a' },
          { label: 'Internal Meetings', val: meetings.filter(m => m.type === 'internal').length, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={styles.summaryCard}>
            <div style={{ ...styles.dot, background: s.color }} />
            <div>
              <p style={styles.summaryVal}>{s.val}</p>
              <p style={styles.summaryLabel}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.layout}>
        {/* Today's Schedule */}
        <div style={styles.mainCard}>
          <h3 style={styles.sectionTitle}>Today's Schedule</h3>
          {todayMeetings.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={{ fontSize: '32px' }}>🗓️</p>
              <p style={{ fontWeight: '600', color: '#374151', marginTop: '8px' }}>No meetings today</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>Enjoy a free day or schedule something!</p>
            </div>
          ) : (
            <div style={styles.timeline}>
              {todayMeetings.map((m, i) => (
                <TimelineItem key={m.id} meeting={m} isLast={i === todayMeetings.length - 1} />
              ))}
            </div>
          )}

          <div style={styles.divider} />
          <h3 style={{ ...styles.sectionTitle, marginBottom: '16px' }}>Upcoming Meetings</h3>
          <div style={styles.upcomingGrid}>
            {upcoming.map(m => (
              <MeetingCard key={m.id} meeting={m} />
            ))}
          </div>
        </div>

        {/* Quick Schedule Panel */}
        <div style={styles.sidePanel}>
          <div style={styles.quickCard}>
            <h3 style={styles.sectionTitle}>Quick Time Slots</h3>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', marginBottom: '14px' }}>Available slots for today</p>
            <div style={styles.slots}>
              {timeSlots.map(slot => {
                const taken = todayMeetings.some(m => m.time === slot)
                return (
                  <div key={slot} style={{ ...styles.slot, background: taken ? '#fee2e2' : '#f0fdf4', color: taken ? '#dc2626' : '#16a34a', borderColor: taken ? '#fecaca' : '#bbf7d0' }}>
                    <Clock size={11} />
                    <span>{slot}</span>
                    {taken && <span style={{ fontSize: '10px' }}>Booked</span>}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={styles.teamCard}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '14px' }}>Team Availability</h3>
            {employees.slice(0, 5).map(emp => {
              const hasMeeting = meetings.some(m => m.attendees.includes(emp.name) && m.date === today)
              return (
                <div key={emp.id} style={styles.teamRow}>
                  <div style={styles.teamAvatar}>{emp.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={styles.teamName}>{emp.name}</p>
                    <p style={styles.teamRole}>{emp.role}</p>
                  </div>
                  <span style={{ ...styles.availBadge, background: hasMeeting ? '#fee2e2' : '#dcfce7', color: hasMeeting ? '#dc2626' : '#16a34a' }}>
                    {hasMeeting ? 'In Meeting' : 'Available'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Schedule New Meeting" width="540px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormField label="Meeting Title">
            <input style={styles.input} placeholder="e.g. Client Demo — XYZ Corp" value={form.title} onChange={e => update('title', e.target.value)} />
          </FormField>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FormField label="Date">
              <input type="date" style={styles.input} value={form.date} onChange={e => update('date', e.target.value)} />
            </FormField>
            <FormField label="Time">
              <select style={styles.input} value={form.time} onChange={e => update('time', e.target.value)}>
                <option value="">Select time</option>
                {timeSlots.map(t => <option key={t}>{t}</option>)}
              </select>
            </FormField>
          </div>
          <FormField label="Duration">
            <div style={{ display: 'flex', gap: '8px' }}>
              {['15m', '30m', '45m', '1h', '1.5h', '2h'].map(d => (
                <button key={d} type="button" onClick={() => update('duration', d)}
                  style={{ ...styles.durationBtn, background: form.duration === d ? '#2563eb' : '#f8fafc', color: form.duration === d ? '#fff' : '#64748b', borderColor: form.duration === d ? '#2563eb' : '#e2e8f0' }}>
                  {d}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Meeting Type">
            <div style={{ display: 'flex', gap: '8px' }}>
              {['internal', 'client'].map(t => (
                <button key={t} type="button" onClick={() => update('type', t)}
                  style={{ ...styles.typeBtn, background: form.type === t ? '#eff6ff' : '#f8fafc', color: form.type === t ? '#2563eb' : '#64748b', borderColor: form.type === t ? '#2563eb' : '#e2e8f0' }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </FormField>
          <FormField label="Location">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {locationTypes.map(loc => {
                const Icon = loc.icon
                return (
                  <button key={loc.val} type="button" onClick={() => update('location', loc.val)}
                    style={{ ...styles.locBtn, background: form.location === loc.val ? '#eff6ff' : '#f8fafc', borderColor: form.location === loc.val ? '#2563eb' : '#e2e8f0', color: form.location === loc.val ? '#2563eb' : '#64748b' }}>
                    <Icon size={14} /> {loc.label}
                  </button>
                )
              })}
            </div>
          </FormField>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Cancel</button>
            <button onClick={() => setShowModal(false)} style={styles.saveBtn}>Schedule Meeting</button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

function FormField({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>{label}</label>
      {children}
    </div>
  )
}

function TimelineItem({ meeting, isLast }) {
  const c = meeting.type === 'client' ? '#16a34a' : '#2563eb'
  return (
    <div style={{ display: 'flex', gap: '14px', paddingBottom: isLast ? 0 : '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, flexShrink: 0, marginTop: '4px' }} />
        {!isLast && <div style={{ width: '2px', flex: 1, background: '#f1f5f9', marginTop: '4px' }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{meeting.title}</h4>
          <span style={{ fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' }}>{meeting.time}</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '4px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={11} />{meeting.duration}</span>
          <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={11} />{meeting.location}</span>
        </div>
      </div>
    </div>
  )
}

function MeetingCard({ meeting }) {
  const c = meeting.type === 'client' ? { bg: '#dcfce7', text: '#16a34a' } : { bg: '#eff6ff', text: '#2563eb' }
  return (
    <div style={styles.upcomingCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' }}>{meeting.title}</h4>
        <span style={{ ...styles.typePill, background: c.bg, color: c.text }}>{meeting.type}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <span style={styles.cardMeta}><Calendar size={11} /> {meeting.date}</span>
        <span style={styles.cardMeta}><Clock size={11} /> {meeting.time} · {meeting.duration}</span>
        <span style={styles.cardMeta}><Users size={11} /> {meeting.attendees.slice(0, 2).join(', ')}{meeting.attendees.length > 2 ? ` +${meeting.attendees.length - 2}` : ''}</span>
      </div>
    </div>
  )
}

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
  summaryStrip: { display: 'flex', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' },
  summaryCard: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '14px 18px', flex: 1, minWidth: '150px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  summaryVal: { fontSize: '20px', fontWeight: '800', color: '#0f172a' },
  summaryLabel: { fontSize: '12px', color: '#94a3b8' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(260px, 1fr)', gap: '20px', alignItems: 'flex-start' },
  mainCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '24px' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '18px' },
  emptyState: { textAlign: 'center', padding: '30px 0' },
  timeline: { display: 'flex', flexDirection: 'column' },
  divider: { height: '1px', background: '#f1f5f9', margin: '20px 0' },
  upcomingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' },
  upcomingCard: { background: '#f8fafc', borderRadius: '12px', padding: '14px', border: '1px solid #f1f5f9' },
  typePill: { fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap', marginLeft: '8px' },
  cardMeta: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8' },
  sidePanel: { display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '90px' },
  quickCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '20px' },
  slots: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', maxHeight: '220px', overflowY: 'auto' },
  slot: { display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 8px', borderRadius: '8px', fontSize: '11.5px', fontWeight: '600', border: '1px solid' },
  teamCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '20px' },
  teamRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  teamAvatar: { width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#fff', flexShrink: 0 },
  teamName: { fontSize: '13px', fontWeight: '600', color: '#0f172a' },
  teamRole: { fontSize: '11.5px', color: '#94a3b8' },
  availBadge: { fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap' },
  input: { width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', color: '#0f172a', fontFamily: 'inherit', background: '#fff' },
  durationBtn: { flex: 1, padding: '8px 4px', borderRadius: '8px', border: '1.5px solid', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  typeBtn: { flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  locBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', border: '1.5px solid', fontSize: '12.5px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' },
  cancelBtn: { flex: 1, padding: '11px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#374151', cursor: 'pointer', fontFamily: 'inherit' },
  saveBtn: { flex: 1, padding: '11px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer' },
}
