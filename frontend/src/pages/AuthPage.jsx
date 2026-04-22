import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Shield, Lock, User, Eye, EyeOff, Zap, AlertCircle } from 'lucide-react'

export default function AuthPage({ onSuccess }) {
  const [mode, setMode]         = useState('login')   // 'login' | 'register'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const { login, register, loading, error } = useAuth()

  // Expose auth result via onSuccess cb
  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = mode === 'login'
      ? await login(username, password)
      : await register(username, password)
    if (ok) {
      if (mode === 'register') {
        setSuccessMsg('Account created successfully! Please sign in.')
        setMode('login')
        setUsername('')
        setPassword('')
      } else {
        setUsername('')
        setPassword('')
        window.location.href = '/dashboard'
      }
    }
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
    setUsername('')
    setPassword('')
    setSuccessMsg('')
  }

  return (
    <div className="min-h-screen bg-bg-primary scanline-bg flex items-center justify-center px-4 relative overflow-hidden">

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #00f2ff, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
           style={{ background: 'radial-gradient(circle, #9d4edd, transparent)' }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-card mb-4
                          border border-cyber-cyan/30 shadow-cyber-cyan">
            <Shield className="w-10 h-10 text-cyber-cyan" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="neon-cyan">SENTINEL</span>
            <span className="text-white"> ZERO-G</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm font-mono tracking-widest uppercase">
            Physics-Reactive API Monitor
          </p>
        </div>

        {/* Card */}
        <div className="glass-card p-8 shadow-glass">

          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden mb-8 border border-glass-border">
            {['login', 'register'].map((m) => (
              <button key={m} onClick={() => handleModeChange(m)}
                className={`flex-1 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-200 btn-cyber
                  ${mode === m
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border-b-2 border-cyber-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500
                               group-focus-within:text-cyber-cyan transition-colors" />
              <input
                id="username-input"
                type="text"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full bg-white/5 border border-glass-border rounded-xl pl-11 pr-4 py-3.5
                           text-white placeholder-slate-600 font-mono text-sm
                           focus:outline-none focus:border-cyber-cyan/60 focus:bg-white/8
                           focus:shadow-cyber-cyan/20 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500
                               group-focus-within:text-cyber-cyan transition-colors" />
              <input
                id="password-input"
                type={showPass ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-glass-border rounded-xl pl-11 pr-12 py-3.5
                           text-white placeholder-slate-600 font-mono text-sm
                           focus:outline-none focus:border-cyber-cyan/60 focus:bg-white/8
                           transition-all duration-200"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyber-cyan transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Messages */}
            {successMsg && (
              <div className="flex items-center gap-2 bg-cyber-green/10 border border-cyber-green/30
                              rounded-xl px-4 py-3 text-cyber-green text-sm animate-fade-in">
                <Shield className="w-4 h-4 flex-shrink-0" />
                {successMsg}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 bg-cyber-red/10 border border-cyber-red/30
                              rounded-xl px-4 py-3 text-cyber-red text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="auth-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase
                         bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan
                         hover:bg-cyber-cyan/30 hover:border-cyber-cyan/70 hover:shadow-cyber-cyan
                         active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 btn-cyber flex items-center justify-center gap-2">
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  {mode === 'login' ? 'Initiate Session' : 'Create Account'}
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6 font-mono">
          SENTINEL ZERO-G v1.0 · INDUSTRIAL CYBER MONITORING
        </p>
      </div>
    </div>
  )
}
