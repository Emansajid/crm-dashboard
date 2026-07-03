import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, BarChart3, CheckCircle } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.brand}>
          <div style={styles.logoBox}>
            <BarChart3 size={22} color="#2563eb" />
          </div>
          <span style={styles.brandName}>NexaCRM</span>
        </div>

        {!sent ? (
          <>
            <div style={styles.iconCircle}>
              <Mail size={28} color="#2563eb" />
            </div>

            <h2 style={styles.title}>Forgot your password?</h2>
            <p style={styles.sub}>
              No worries! Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Email Address</label>
                <div style={styles.inputWrap}>
                  <Mail size={16} color="#94a3b8" style={styles.icon} />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <button type="submit" style={styles.btn}>
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div style={styles.successBox}>
            <CheckCircle size={52} color="#10b981" style={{ marginBottom: '16px' }} />
            <h2 style={styles.title}>Check your email!</h2>
            <p style={styles.sub}>
              We sent a password reset link to <strong>{email}</strong>. It may take a minute to arrive.
            </p>
            <button
              onClick={() => setSent(false)}
              style={{ ...styles.btn, background: '#f1f5f9', color: '#0f172a', boxShadow: 'none', marginTop: '8px' }}
            >
              Resend Email
            </button>
          </div>
        )}

        <Link to="/" style={styles.backLink}>
          <ArrowLeft size={15} />
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  card: {
    background: '#fff',
    borderRadius: '20px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '36px',
    alignSelf: 'flex-start',
  },
  logoBox: {
    width: '36px',
    height: '36px',
    background: '#eff6ff',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
  },
  iconCircle: {
    width: '68px',
    height: '68px',
    background: '#eff6ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: '-0.5px',
    marginBottom: '10px',
  },
  sub: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left',
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
  icon: {
    position: 'absolute',
    left: '14px',
  },
  input: {
    width: '100%',
    padding: '12px 14px 12px 40px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#0f172a',
    background: '#fff',
  },
  btn: {
    padding: '13px',
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
  },
  successBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    marginTop: '28px',
    textDecoration: 'none',
  },
}
