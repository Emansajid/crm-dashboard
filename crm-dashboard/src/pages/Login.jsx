import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, BarChart3 } from 'lucide-react'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div style={styles.wrapper}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.brand}>
          <div style={styles.logoBox}>
            <BarChart3 size={28} color="#fff" />
          </div>
          <span style={styles.brandName}>NexaCRM</span>
        </div>

        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Manage your business<br />from one place</h1>
          <p style={styles.heroSub}>Streamline customers, leads, and team performance with powerful CRM tools built for modern businesses.</p>
        </div>

        <div style={styles.statsRow}>
          {[['12K+', 'Customers'], ['98%', 'Uptime'], ['4.9★', 'Rating']].map(([val, label]) => (
            <div key={label} style={styles.statBox}>
              <span style={styles.statVal}>{val}</span>
              <span style={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Welcome back</h2>
            <p style={styles.formSub}>Sign in to your NexaCRM account</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrap}>
                <Mail size={17} color="#94a3b8" style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.field}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={styles.label}>Password</label>
                <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
              </div>
              <div style={styles.inputWrap}>
                <Lock size={17} color="#94a3b8" style={styles.inputIcon} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ ...styles.input, paddingRight: '44px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={styles.eyeBtn}
                >
                  {showPass ? <EyeOff size={17} color="#94a3b8" /> : <Eye size={17} color="#94a3b8" />}
                </button>
              </div>
            </div>

            <div style={styles.checkRow}>
              <input type="checkbox" id="remember" style={{ accentColor: '#2563eb' }} />
              <label htmlFor="remember" style={styles.checkLabel}>Remember me for 30 days</label>
            </div>

            <button type="submit" style={styles.submitBtn}>
              Sign In to Dashboard
            </button>
          </form>

          <p style={styles.bottomText}>
            Don't have an account?{' '}
            <span style={styles.signupLink}>Contact your admin</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #2563eb 100%)',
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fff',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoBox: {
    width: '44px',
    height: '44px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  heroText: {
    maxWidth: '420px',
  },
  heroTitle: {
    fontSize: '40px',
    fontWeight: '800',
    lineHeight: '1.2',
    letterSpacing: '-1px',
    marginBottom: '20px',
  },
  heroSub: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.7',
  },
  statsRow: {
    display: 'flex',
    gap: '32px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statVal: {
    fontSize: '26px',
    fontWeight: '700',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.6)',
  },
  rightPanel: {
    width: '480px',
    background: '#f8fafc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
  },
  formCard: {
    width: '100%',
    maxWidth: '380px',
  },
  formHeader: {
    marginBottom: '32px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
    marginBottom: '8px',
  },
  formSub: {
    color: '#64748b',
    fontSize: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
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
    padding: '12px 14px 12px 42px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    background: '#fff',
    color: '#0f172a',
    transition: 'border-color 0.2s',
  },
  eyeBtn: {
    position: 'absolute',
    right: '14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  forgotLink: {
    fontSize: '13px',
    color: '#2563eb',
    fontWeight: '500',
    textDecoration: 'none',
  },
  checkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkLabel: {
    fontSize: '13px',
    color: '#64748b',
  },
  submitBtn: {
    padding: '13px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
    boxShadow: '0 4px 14px rgba(37,99,235,0.35)',
  },
  bottomText: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#64748b',
    marginTop: '24px',
  },
  signupLink: {
    color: '#2563eb',
    fontWeight: '600',
    cursor: 'pointer',
  },
}
