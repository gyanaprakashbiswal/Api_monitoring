import { Shield, LogOut, User, Radio } from 'lucide-react'

export default function Navbar({ username, onLogout }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-b border-glass-border px-6 py-3">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30
                          flex items-center justify-center shadow-cyber-cyan">
            <Shield className="w-5 h-5 text-cyber-cyan" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">
              <span className="neon-cyan">SENTINEL</span> ZERO-G
            </span>
          </div>
        </div>

        {/* Center: live indicator */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 border border-glass-border">
          <Radio className="w-3.5 h-3.5 text-cyber-green animate-pulse" />
          <span className="text-cyber-green text-xs font-mono font-semibold tracking-wider">LIVE</span>
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <User className="w-4 h-4" />
            <span className="text-sm font-mono">{username}</span>
          </div>
          <button
            id="logout-btn"
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                       text-slate-400 border border-glass-border hover:text-cyber-red hover:border-cyber-red/40
                       hover:bg-cyber-red/5 transition-all duration-200 btn-cyber">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
