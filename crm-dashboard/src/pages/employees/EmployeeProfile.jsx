import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase, CheckSquare, Clock } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatusBadge from '../../components/shared/StatusBadge'
import ProgressBar from '../../components/shared/ProgressBar'
import PriorityLabel from '../../components/shared/PriorityLabel'
import { employees, tasks } from '../../data/mockData'

const deptColors = {
  Sales: '#2563eb', Engineering: '#7c3aed', HR: '#10b981',
  Marketing: '#f59e0b', Design: '#ec4899',
}

export default function EmployeeProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const emp = employees.find(e => e.id === Number(id)) || employees[0]
  const empTasks = tasks.filter(t => t.assignedTo === emp.name)
  const completion = Math.round((emp.completed / emp.tasks) * 100)

  return (
    <DashboardLayout pageTitle="Employee Profile">
      <button onClick={() => navigate('/employees')} style={styles.backBtn}>
        <ArrowLeft size={15} /> Back to Employees
      </button>

      <div style={styles.grid}>
        {/* Left — Profile Card */}
        <div style={styles.profileCard}>
          <div style={{ ...styles.coverBg, background: `linear-gradient(135deg, #0f172a, ${deptColors[emp.department] || '#2563eb'})` }} />
          <div style={styles.avatarLg}>{emp.avatar}</div>
          <h2 style={styles.name}>{emp.name}</h2>
          <p style={styles.role}>{emp.role}</p>
          <span style={{ ...styles.deptTag, background: `${deptColors[emp.department] || '#2563eb'}1A`, color: deptColors[emp.department] || '#2563eb' }}>
            {emp.department}
          </span>
          <div style={{ marginTop: '10px' }}><StatusBadge status={emp.status} /></div>

          <div style={styles.divider} />

          <div style={styles.infoList}>
            {[
              { icon: Mail, val: emp.email },
              { icon: Phone, val: emp.phone },
              { icon: MapPin, val: emp.location },
              { icon: Calendar, val: `Joined ${emp.joined}` },
            ].map(({ icon: Icon, val }) => (
              <div key={val} style={styles.infoRow}>
                <div style={styles.infoIcon}><Icon size={14} color="#64748b" /></div>
                <span style={styles.infoText}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Stats + Tasks */}
        <div style={styles.rightCol}>
          {/* Stat boxes */}
          <div style={styles.statsRow}>
            {[
              { icon: CheckSquare, color: '#2563eb', bg: '#eff6ff', val: emp.tasks, label: 'Total Tasks' },
              { icon: CheckSquare, color: '#16a34a', bg: '#dcfce7', val: emp.completed, label: 'Completed' },
              { icon: Clock, color: '#d97706', bg: '#fef3c7', val: emp.tasks - emp.completed, label: 'Pending' },
            ].map(({ icon: Icon, color, bg, val, label }) => (
              <div key={label} style={styles.statBox}>
                <div style={{ ...styles.statIcon, background: bg }}><Icon size={18} color={color} /></div>
                <div>
                  <p style={styles.statVal}>{val}</p>
                  <p style={styles.statLabel}>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Progress */}
          <div style={styles.progressCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={styles.sectionTitle}>Overall Performance</h3>
              <span style={{ fontSize: '22px', fontWeight: '800', color: completion >= 80 ? '#16a34a' : '#d97706' }}>{completion}%</span>
            </div>
            <ProgressBar value={completion} showLabel={false} />
            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>
              {emp.completed} of {emp.tasks} tasks completed
            </p>
          </div>

          {/* Assigned Tasks */}
          <div style={styles.tasksCard}>
            <h3 style={{ ...styles.sectionTitle, marginBottom: '16px' }}>Assigned Tasks</h3>
            {empTasks.length === 0 ? (
              <p style={{ color: '#94a3b8', fontSize: '13px' }}>No tasks assigned to this employee.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {empTasks.map(task => (
                  <div key={task.id} style={styles.taskItem}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <p style={styles.taskTitle}>{task.title}</p>
                        <PriorityLabel priority={task.priority} />
                      </div>
                      <ProgressBar value={task.progress} />
                    </div>
                    <StatusBadge status={task.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const styles = {
  backBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748b', fontSize: '13.5px', fontWeight: '500', cursor: 'pointer', marginBottom: '20px', fontFamily: 'inherit' },
  grid: { display: 'grid', gridTemplateColumns: 'minmax(260px, 300px) 1fr', gap: '20px', alignItems: 'flex-start' },
  profileCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '0 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', overflow: 'hidden', position: 'sticky', top: '90px' },
  coverBg: { width: 'calc(100% + 48px)', height: '70px', margin: '0 -24px', marginBottom: '-36px' },
  avatarLg: { width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb, #7c3aed)', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '700', color: '#fff', marginBottom: '12px', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' },
  name: { fontSize: '18px', fontWeight: '800', color: '#0f172a' },
  role: { fontSize: '13px', color: '#94a3b8', marginTop: '2px' },
  deptTag: { fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', marginTop: '8px' },
  divider: { width: '100%', height: '1px', background: '#f1f5f9', margin: '20px 0' },
  infoList: { width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' },
  infoRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  infoIcon: { width: '30px', height: '30px', borderRadius: '8px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  infoText: { fontSize: '13px', color: '#374151', textAlign: 'left', wordBreak: 'break-word' },
  rightCol: { display: 'flex', flexDirection: 'column', gap: '20px' },
  statsRow: { display: 'flex', gap: '14px', flexWrap: 'wrap' },
  statBox: { flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', gap: '14px', background: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '18px' },
  statIcon: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  statVal: { fontSize: '22px', fontWeight: '800', color: '#0f172a' },
  statLabel: { fontSize: '12px', color: '#94a3b8' },
  progressCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '22px' },
  sectionTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a' },
  tasksCard: { background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', padding: '22px' },
  taskItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', background: '#f8fafc', borderRadius: '12px', flexWrap: 'wrap' },
  taskTitle: { fontSize: '13.5px', fontWeight: '600', color: '#0f172a' },
}
