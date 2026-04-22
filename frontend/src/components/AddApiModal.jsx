import { useState } from 'react'
import { configApi } from '../services/apiClient'
import { X, Globe, Clock, Cpu, Hash, ChevronDown, Zap, AlertCircle } from 'lucide-react'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD']

export default function AddApiModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: '', url: '', method: 'GET',
    headers: '', intervalMinutes: 1, timeoutSeconds: 10,
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await configApi.create({
        ...form,
        intervalMinutes: Number(form.intervalMinutes),
        timeoutSeconds:  Number(form.timeoutSeconds),
      })
      onCreated()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add API')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg glass-card border border-glass-border shadow-glass animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30
                            flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyber-cyan" />
            </div>
            <h2 className="text-white font-bold text-lg">Add API Endpoint</h2>
          </div>
          <button onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Name */}
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">
              Display Name
            </label>
            <div className="relative">
              <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input id="api-name-input" type="text" required value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="My API Service"
                className="w-full bg-white/5 border border-glass-border rounded-xl pl-10 pr-4 py-3
                           text-white text-sm placeholder-slate-600 font-mono
                           focus:outline-none focus:border-cyber-cyan/50 transition-all" />
            </div>
          </div>

          {/* URL + Method row */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">
                URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input id="api-url-input" type="url" required value={form.url}
                  onChange={e => set('url', e.target.value)}
                  placeholder="https://api.example.com/health"
                  className="w-full bg-white/5 border border-glass-border rounded-xl pl-10 pr-4 py-3
                             text-white text-sm placeholder-slate-600 font-mono
                             focus:outline-none focus:border-cyber-cyan/50 transition-all" />
              </div>
            </div>

            <div className="w-28">
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">
                Method
              </label>
              <div className="relative">
                <select id="api-method-select" value={form.method}
                  onChange={e => set('method', e.target.value)}
                  className="w-full appearance-none bg-white/5 border border-glass-border rounded-xl
                             px-3 py-3 text-cyber-cyan text-sm font-mono font-bold
                             focus:outline-none focus:border-cyber-cyan/50 transition-all cursor-pointer">
                  {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Interval + Timeout */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">
                Interval (min)
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input id="api-interval-input" type="number" min="1" max="60" value={form.intervalMinutes}
                  onChange={e => set('intervalMinutes', e.target.value)}
                  className="w-full bg-white/5 border border-glass-border rounded-xl pl-10 pr-4 py-3
                             text-white text-sm font-mono
                             focus:outline-none focus:border-cyber-cyan/50 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">
                Timeout (sec)
              </label>
              <div className="relative">
                <Cpu className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <input id="api-timeout-input" type="number" min="1" max="60" value={form.timeoutSeconds}
                  onChange={e => set('timeoutSeconds', e.target.value)}
                  className="w-full bg-white/5 border border-glass-border rounded-xl pl-10 pr-4 py-3
                             text-white text-sm font-mono
                             focus:outline-none focus:border-cyber-cyan/50 transition-all" />
              </div>
            </div>
          </div>

          {/* Custom headers (optional) */}
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1.5 block">
              Custom Headers <span className="text-slate-600 normal-case font-normal">(optional, key:value,key:value)</span>
            </label>
            <input id="api-headers-input" type="text" value={form.headers}
              onChange={e => set('headers', e.target.value)}
              placeholder="Authorization:Bearer token,X-App-Key:abc123"
              className="w-full bg-white/5 border border-glass-border rounded-xl px-4 py-3
                         text-white text-sm placeholder-slate-600 font-mono
                         focus:outline-none focus:border-cyber-cyan/50 transition-all" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-cyber-red/10 border border-cyber-red/30
                            rounded-xl px-4 py-3 text-cyber-red text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border border-glass-border
                         text-slate-400 hover:text-white hover:border-white/20 transition-all">
              Cancel
            </button>
            <button id="add-api-submit-btn" type="submit" disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-bold bg-cyber-cyan/20 border border-cyber-cyan/40
                         text-cyber-cyan hover:bg-cyber-cyan/30 hover:shadow-cyber-cyan
                         active:scale-95 disabled:opacity-50 transition-all btn-cyber flex items-center justify-center gap-2">
              {loading ? (
                <span className="w-4 h-4 border-2 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin" />
              ) : (
                <><Zap className="w-4 h-4" /> Deploy Monitor</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
