import { useState } from 'react'
import { configApi } from '../services/apiClient'
import {
  Globe, Activity, Clock, Check, X, ChevronDown, ChevronUp,
  Trash2, Power, ExternalLink, AlertTriangle, Wifi, WifiOff
} from 'lucide-react'
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts'

function StatusDot({ success }) {
  if (success === null || success === undefined)
    return <span className="status-dot unknown" />
  return <span className={`status-dot ${success ? 'healthy' : 'failing'}`} />
}

function LatencyBadge({ ms }) {
  if (ms == null) return <span className="text-slate-600 text-xs font-mono">--</span>
  const color = ms > 2000 ? 'text-cyber-red' : ms > 800 ? 'text-cyber-amber' : 'text-cyber-cyan'
  return <span className={`text-xs font-mono font-bold ${color}`}>{ms}ms</span>
}

function StatusCode({ code }) {
  if (!code) return <span className="text-slate-600 font-mono text-xs">--</span>
  const color = code >= 500 ? 'text-cyber-red' : code >= 400 ? 'text-cyber-amber' : 'text-cyber-cyan'
  return <span className={`font-mono text-xs font-bold ${color}`}>{code}</span>
}

export default function ApiCard({ stat, cardRef, onDelete, onToggle }) {
  const [expanded, setExpanded]   = useState(false)
  const [deleting, setDeleting]   = useState(false)
  const [toggling, setToggling]   = useState(false)

  const isCritical = stat.criticalAlert
  const isFailing  = stat.lastSuccessFlag === false
  const isWarning  = stat.lastResponseTimeMs > 2000 && stat.lastSuccessFlag !== false

  // Border glow class
  const borderClass = isCritical
    ? 'border-cyber-red/50 shadow-cyber-red'
    : isFailing
    ? 'border-cyber-red/30'
    : isWarning
    ? 'border-cyber-amber/40 shadow-cyber-amber'
    : 'border-glass-border hover:border-cyber-cyan/30'

  // Chart data
  const chartData = (stat.recentLogs || []).slice().reverse().map((log, i) => ({
    idx: i,
    ms: log.responseTimeMs,
    ok: log.successFlag,
  }))

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (!window.confirm(`Delete monitoring for "${stat.name}"?`)) return
    setDeleting(true)
    try { await configApi.delete(stat.id); onDelete?.() }
    catch { /* ignore */ }
    finally { setDeleting(false) }
  }

  const handleToggle = async (e) => {
    e.stopPropagation()
    setToggling(true)
    try { await configApi.toggle(stat.id); onToggle?.() }
    catch { /* ignore */ }
    finally { setToggling(false) }
  }

  return (
    <div
      ref={cardRef}
      id={`api-card-${stat.id}`}
      className={`glass-card border transition-all duration-300 cursor-default select-none
                  ${borderClass}`}
      style={{ willChange: 'transform' }}
    >
      {/* ── Header ── */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <StatusDot success={stat.lastSuccessFlag} />
            <span className="font-bold text-white text-sm truncate">{stat.name}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Method badge */}
            <span className="px-2 py-0.5 rounded-md bg-cyber-cyan/10 text-cyber-cyan
                             text-xs font-mono font-bold border border-cyber-cyan/20">
              {stat.method}
            </span>

            {/* Active indicator */}
            <div className={`w-2 h-2 rounded-full ${stat.active ? 'bg-cyber-green' : 'bg-slate-600'}`} />
          </div>
        </div>

        {/* URL */}
        <div className="flex items-center gap-1.5 mb-3">
          <Globe className="w-3 h-3 text-slate-600 flex-shrink-0" />
          <a
            href={stat.url} target="_blank" rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-slate-400 text-xs font-mono truncate hover:text-cyber-cyan transition-colors">
            {stat.url}
            <ExternalLink className="inline w-2.5 h-2.5 ml-1 opacity-50" />
          </a>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/3 rounded-lg p-2 text-center">
            <div className="text-slate-500 text-xs mb-1 flex items-center justify-center gap-1">
              <Activity className="w-3 h-3" />
            </div>
            <LatencyBadge ms={stat.lastResponseTimeMs} />
          </div>
          <div className="bg-white/3 rounded-lg p-2 text-center">
            <div className="text-slate-500 text-xs mb-1">Status</div>
            <StatusCode code={stat.lastStatusCode} />
          </div>
          <div className="bg-white/3 rounded-lg p-2 text-center">
            <div className="text-slate-500 text-xs mb-1">Fails</div>
            <span className={`text-xs font-mono font-bold ${stat.consecutiveFailures > 0 ? 'text-cyber-red' : 'text-slate-400'}`}>
              {stat.consecutiveFailures ?? 0}
            </span>
          </div>
        </div>

        {/* Critical alert strip */}
        {isCritical && (
          <div className="flex items-center gap-2 bg-cyber-red/10 border border-cyber-red/30
                          rounded-lg px-3 py-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-cyber-red flex-shrink-0 animate-pulse" />
            <span className="text-cyber-red text-xs font-bold tracking-wider uppercase">
              Critical · {stat.consecutiveFailures} consecutive failures
            </span>
          </div>
        )}

        {/* Mini Latency Chart */}
        {chartData.length > 1 && (
          <div className="h-12 -mx-1 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id={`grad-${stat.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"
                          stopColor={isCritical ? '#ff003c' : isWarning ? '#ffab00' : '#00f2ff'}
                          stopOpacity={0.4} />
                    <stop offset="95%"
                          stopColor={isCritical ? '#ff003c' : isWarning ? '#ffab00' : '#00f2ff'}
                          stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone" dataKey="ms" stroke={isCritical ? '#ff003c' : isWarning ? '#ffab00' : '#00f2ff'}
                  strokeWidth={1.5} fill={`url(#grad-${stat.id})`} dot={false} />
                <Tooltip
                  contentStyle={{ background: '#0d0d0d', border: '1px solid rgba(0,242,255,0.2)', borderRadius: 8, fontSize: 11 }}
                  formatter={(v) => [`${v}ms`, 'Latency']}
                  labelFormatter={() => ''}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* ── Expand toggle ── */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full px-4 py-2 flex items-center justify-between text-xs text-slate-500
                   hover:text-slate-300 border-t border-glass-border hover:bg-white/3 transition-all">
        <span className="font-mono">Recent logs ({stat.recentLogs?.length ?? 0})</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* ── Expanded log list ── */}
      {expanded && (
        <div className="px-4 pb-3 space-y-1.5 max-h-48 overflow-y-auto">
          {(stat.recentLogs ?? []).slice(0, 8).map(log => (
            <div key={log.id}
              className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white/3">
              <div className="flex items-center gap-2">
                {log.successFlag
                  ? <Check className="w-3 h-3 text-cyber-green" />
                  : <X     className="w-3 h-3 text-cyber-red"   />}
                <span className="font-mono text-slate-400">{log.statusCode || 'ERR'}</span>
              </div>
              <span className={`font-mono ${log.responseTimeMs > 2000 ? 'text-cyber-red' : log.responseTimeMs > 800 ? 'text-cyber-amber' : 'text-slate-400'}`}>
                {log.responseTimeMs}ms
              </span>
              <span className="text-slate-600 font-mono">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {(stat.recentLogs?.length ?? 0) === 0 && (
            <p className="text-slate-600 text-xs text-center py-2 font-mono">No logs yet</p>
          )}
        </div>
      )}

      {/* ── Footer Actions ── */}
      <div className="flex border-t border-glass-border">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold
                      transition-all hover:bg-white/5 disabled:opacity-50
                      ${stat.active ? 'text-cyber-green' : 'text-slate-500'}`}>
          <Power className="w-3.5 h-3.5" />
          {stat.active ? 'Active' : 'Paused'}
        </button>
        <div className="w-px bg-glass-border" />
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold
                     text-slate-500 hover:text-cyber-red hover:bg-cyber-red/5 transition-all disabled:opacity-50">
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  )
}
