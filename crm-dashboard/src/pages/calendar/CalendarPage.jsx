import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { meetings } from '../../data/mockData'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const typeColors = {
  internal: { bg: '#eff6ff', text: '#2563eb', dot: '#2563eb' },
  client: { bg: '#dcfce7', text: '#16a34a', dot: '#16a34a' },
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const today = new Date()
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  const { year, month } = current
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => setCurrent(month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 })
  const nextMonth = () => setCurrent(month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 })

  const getMeetingsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return meetings.filter(m => m.date === dateStr)
  }

  const selectedDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
  const selectedMeetings = meetings.filter(m => m.date === selectedDateStr)
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <DashboardLayout pageTitle="Calendar">
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageHeading}>Calendar</h2>
          <p style={styles.pageSub}>Schedule and manage your meetings</p>
        </div>
        <button style={styles.addBtn}>
          <Plus size={16} /> Schedule Meeting
        </button>
      </div>

      <div style={styles.layout}>
        {/* Calendar Grid */}
        <div style={styles.calendarCard}>
          {/* Month Nav */}
          <div style={styles.monthNav}>
            <button onClick={prevMonth} style={styles.navBtn}><ChevronLeft size={18} /></button>
            <h3 style={styles.monthTitle}>{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} style={styles.navBtn}><ChevronRight size={18} /></button>
          </div>

          {/* Day Headers */}
          <div style={styles.dayHeaders}>
            {DAYS.map(d => (
              <div key={d} style={styles.dayHeader}>{d}</div>
            ))}
          </div>

          {/* Cells */}
          <div style={styles.grid}>
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} style={styles.emptyCell} />
              const dayMeetings = getMeetingsForDay(day)
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const isToday = dateStr === todayStr
              const isSelected = day === selectedDay
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  style={{
                    ...styles.cell,
                    background: isSelected ? '#2563eb' : isToday ? '#eff6ff' : '#fff',
                    border: isToday && !isSelected ? '2px solid #2563eb' : '1px solid #f1f5f9',
                  }}
                >
                  <span style={{
                    ...styles.dayNum,
                    color: isSelected ? '#fff' : isToday ? '#2563eb' : '#0f172a',
                    fontWeight: isToday || isSelected ? '800' : '500',
                  }}>{day}</span>
                  <div style={styles.dotRow}>
                    {dayMeetings.slice(0, 3).map((m, idx) => (
                      <div key={idx} style={{ ...styles.meetDot, background: isSelected ? 'rgba(255,255,255,0.7)' : typeColors[m.type]?.dot }} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={styles.legend}>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#2563eb' }} /><span>Internal</span></div>
            <div style={styles.legendItem}><div style={{ ...styles.legendDot, background: '#16a34a' }} /><span>Client</span></div>
          </div>
        </div>

        {/* Day Panel */}
        <div style={styles.dayPanel}>
          <div style={styles.dayPanelHeader}>
            <h3 style={styles.dayPanelTitle}>
              {MONTHS[month]} {selectedDay}, {year}
            </h3>
            <span style={styles.meetingCount}>{selectedMeetings.length} meeting{selectedMeetings.length !== 1 ? 's' : ''}</span>
          </div>

          {selectedMeetings.length === 0 ? (
            <div style={styles.noMeetings}>
              <p style={{ fontSize: '28px', marginBottom: '10px' }}>📅</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>No meetings scheduled</p>
              <p style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px' }}>Click a date to view meetings</p>
            </div>
          ) : (
            <div style={styles.meetingsList}>
              {selectedMeetings.map(m => (
                <MeetingCard key={m.id} meeting={m} />
              ))}
            </div>
          )}

          {/* Upcoming */}
          <div style={styles.upcomingSection}>
            <h4 style={styles.upcomingTitle}>All Upcoming Meetings</h4>
            {meetings.slice(0, 5).map(m => (
              <div key={m.id} style={styles.upcomingItem}>
                <div style={{ ...styles.upcomingDot, background: typeColors[m.type]?.dot }} />
                <div style={{ flex: 1 }}>
                  <p style={styles.upcomingName}>{m.title}</p>
                  <p style={styles.upcomingTime}>{m.date} · {m.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function MeetingCard({ meeting }) {
  const c = typeColors[meeting.type] || typeColors.internal
  return (
    <div style={styles.meetCard}>
      <div style={{ ...styles.meetTypeBar, background: c.dot }} />
      <div style={styles.meetContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h4 style={styles.meetTitle}>{meeting.title}</h4>
          <span style={{ ...styles.meetTypeBadge, background: c.bg, color: c.text }}>{meeting.type}</span>
        </div>
        <div style={styles.meetMeta}>
          <span style={styles.meetMetaItem}><Clock size={12} /> {meeting.time} · {meeting.duration}</span>
          <span style={styles.meetMetaItem}><MapPin size={12} /> {meeting.location}</span>
          <span style={styles.meetMetaItem}><Users size={12} /> {meeting.attendees.join(', ')}</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  pageHeading: { fontSize: '20px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
  pageSub: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  addBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', borderRadius: '10px', fontSize: '13.5px', fontWeight: '600', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.3)' },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(280px, 1fr)', gap: '20px', alignItems: 'flex-start' },
  calendarCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '24px' },
  monthNav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  monthTitle: { fontSize: '17px', fontWeight: '700', color: '#0f172a' },
  navBtn: { width: '34px', height: '34px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' },
  dayHeaders: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '8px' },
  dayHeader: { textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#94a3b8', padding: '6px 0', letterSpacing: '0.3px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' },
  emptyCell: { aspectRatio: '1', borderRadius: '10px' },
  cell: { aspectRatio: '1', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', gap: '3px', border: '1px solid #f1f5f9' },
  dayNum: { fontSize: '13px', lineHeight: 1 },
  dotRow: { display: 'flex', gap: '2px' },
  meetDot: { width: '5px', height: '5px', borderRadius: '50%' },
  legend: { display: 'flex', gap: '20px', marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' },
  legendDot: { width: '8px', height: '8px', borderRadius: '50%' },
  dayPanel: { display: 'flex', flexDirection: 'column', gap: '0', background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' },
  dayPanelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid #f1f5f9' },
  dayPanelTitle: { fontSize: '14px', fontWeight: '700', color: '#0f172a' },
  meetingCount: { fontSize: '12px', fontWeight: '600', color: '#2563eb', background: '#eff6ff', padding: '3px 10px', borderRadius: '20px' },
  noMeetings: { padding: '40px 20px', textAlign: 'center' },
  meetingsList: { padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' },
  meetCard: { display: 'flex', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden' },
  meetTypeBar: { width: '4px', flexShrink: 0 },
  meetContent: { padding: '12px 14px', flex: 1 },
  meetTitle: { fontSize: '13.5px', fontWeight: '700', color: '#0f172a' },
  meetTypeBadge: { fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap' },
  meetMeta: { display: 'flex', flexDirection: 'column', gap: '4px' },
  meetMetaItem: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#94a3b8' },
  upcomingSection: { padding: '16px 20px', borderTop: '1px solid #f1f5f9' },
  upcomingTitle: { fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' },
  upcomingItem: { display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' },
  upcomingDot: { width: '8px', height: '8px', borderRadius: '50%', marginTop: '4px', flexShrink: 0 },
  upcomingName: { fontSize: '13px', fontWeight: '600', color: '#374151' },
  upcomingTime: { fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' },
}
