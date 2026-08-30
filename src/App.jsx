import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [authMode, setAuthMode] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('+998')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPhoneNumber = (digits) => {
    const cleaned = digits.replace(/\D/g, '').slice(0, 9)
    const groups = []

    if (cleaned.length > 0) groups.push(cleaned.slice(0, 2))
    if (cleaned.length > 2) groups.push(cleaned.slice(2, 5))
    if (cleaned.length > 5) groups.push(cleaned.slice(5, 7))
    if (cleaned.length > 7) groups.push(cleaned.slice(7, 9))

    return groups.length ? `+998 ${groups.join(' ')}` : '+998'
  }

  const handlePhoneChange = (event) => {
    const rawValue = event.target.value
    const digitsAfterPrefix = rawValue.replace(/\D/g, '').slice(3, 12)
    setPhoneNumber(formatPhoneNumber(digitsAfterPrefix))
  }

  const handlePhoneKeyDown = (event) => {
    if ((event.key === 'Backspace' || event.key === 'Delete') && event.currentTarget.selectionStart <= 4) {
      event.preventDefault()
    }
  }

  const handleAuthSubmit = async (event) => {
    event.preventDefault()
    setAuthError('')

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setAuthError('Email va parolni to\'liq kiriting.')
        return
      }
      setIsLoggedIn(true)
      return
    }

    if (!fullName.trim() || !companyName.trim() || !email.trim() || !password.trim()) {
      setAuthError('Ro\'yxatdan o\'tish uchun barcha qatorlarni to\'ldiring.')
      return
    }

    const cleanedPhone = phoneNumber.replace(/\D/g, '')
    if (!cleanedPhone || cleanedPhone.length < 9) {
      setAuthError('Telefon raqamni to\'liq kiriting.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/verify-telegram-start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: cleanedPhone })
      })

      const result = await response.json()

      if (!response.ok) {
        setAuthError('Telegram tekshiruvi xatosi. Iltimos, botni qayta tekshiring.')
        return
      }

      if (result.verified === false && result.reason === 'mismatch') {
        setAuthError('Bu telefon raqam Telegram botni start qilmagan. Botga start berganingizni tasdiqlang.')
        return
      }

      setIsLoggedIn(true)
    } catch (error) {
      setAuthError('Telegram tekshiruvi xatosi. Iltimos, botni qayta tekshiring.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="auth-page">
        <div className="video-bg" aria-hidden="true">
          <video
            className="background-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src="/background-video.mp4"
          />
          <div className="video-overlay" />
        </div>

        <div className="auth-shell">
          <div className="auth-visual">
            <div className="auth-brand">
              <img
                className="brand-logo"
                src="/logo.png"
                alt="Raqamli biznes nazorati logo"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
              />
              <div className="brand-copy">
                <span className="brand-label">Raqamli biznes</span>
                <strong className="brand-name">Nazorati</strong>
              </div>
            </div>

            <h1>Biznesingizni boshqaring</h1>
            <p className="hero-copy">
              Jamoangizni kuzatish, ishlash natijalarini kuzatish va faoliyatni bir joydan nazorat qilish.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Real-time monitoring</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Mahsulot va xizmatlarni boshqarish</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Jamoa va KPI nazorati</span>
              </div>
            </div>
          </div>

          <div className="auth-card">
            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === 'register' ? (
                <>
                  <label>
                    Ism familya
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Sardorbek Mirzayev"
                      required
                    />
                  </label>
                  <label>
                    Kompaniya nomi
                    <input
                      type="text"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      placeholder="Kompaniya nomi"
                      required
                    />
                  </label>
                  <label>
                    Telefon raqam
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      onKeyDown={handlePhoneKeyDown}
                      placeholder="+998 93 064 06 88"
                      required
                    />
                  </label>
                </>
              ) : null}

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="example@mail.com"
                  required
                />
              </label>

              <label className="password-field">
                <span>Parol</span>
                <div className="password-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? 'Parolni yashirish' : 'Parolni ko\'rish'}
                  >
                    <svg viewBox="0 0 24 24" className="password-toggle-icon" aria-hidden="true">
                      {showPassword ? (
                        <>
                          <path d="M2 12c2.5-4 6-6 10-6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="3.1" fill="currentColor" />
                        </>
                      ) : (
                        <>
                          <path d="M2 12c2.5-4 6-6 10-6s7.5 2 10 6c-2.5 4-6 6-10 6s-7.5-2-10-6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M4 4l16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="0.8" fill="none" stroke="transparent" strokeWidth="0" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </label>

              {authError ? <p className="auth-error">{authError}</p> : null}

              <button type="submit" className="primary-btn" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Tekshirilmoqda...'
                  : authMode === 'register'
                    ? "Ro'yxatdan o'tish"
                    : 'Kirish'}
              </button>
            </form>

            <p className="auth-note">
              {authMode === 'login'
                ? "Hisobingiz yo'qmi? "
                : "Allaqachon hisobingiz bormi? "}
              <button
                type="button"
                className="inline-link"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              >
                {authMode === 'login'
                  ? "Ro'yxatdan o'ting."
                  : "Mavjud hisobga kirish."}
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-layout">
        <Sidebar isOpen={sidebarOpen} />
        <main className="main-content">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default App
