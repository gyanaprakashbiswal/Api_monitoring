import { Activity, CheckCircle2, XCircle, AlertTriangle, Globe } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color, glow }) {
  const colorMap = {
    cyan:  { text: 'text-cyber-cyan',  bg: 'bg-cyber-cyan/10',  border: 'border-cyber-cyan/20',  shadow: 'shadow-cyber-cyan' },
    green: { text: 'text-cyber-green', bg: 'bg-cyber-green/10', border: 'border-cyber-green/20', shadow: '' },
    red:   { text: 'text-cyber-red',   bg: 'bg-cyber-red/10',   border: 'border-cyber-red/20',   shadow: 'shadow-cyber-red' },
    amber: { text: 'text-cyber-amber', bg: 'bg-cyber-amber/10', border: 'border-cyber-amber/20', shadow: 'shadow-cyber-amber' },
  }
  const c = colorMap[color] || colorMap.cyan

  return (
    <div className={`glass-card border ${c.border} ${glow ? c.shadow : ''} px-5 py-4 flex items-center gap-4`}>
      <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${c.text}`} />
      </div>
      <div>
        <div className={`text-2xl font-bold font-mono ${c.text}`}>{value ?? '--'}</div>
        <div className="text-slate-500 text-xs uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}

export default function StatsBar({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card border border-glass-border px-5 py-4 h-20 animate-pulse">
            <div className="h-6 bg-white/5 rounded-lg w-2/3 mb-2" />
            <div className="h-4 bg-white/5 rounded-lg w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard icon={Globe}         label="Total APIs"   value={data?.totalApis}   color="cyan"  glow={false} />
      <StatCard icon={CheckCircle2}  label="Healthy"      value={data?.healthyApis} color="green" glow={false} />
      <StatCard icon={XCircle}       label="Failing"      value={data?.failingApis} color="red"   glow={data?.failingApis > 0} />
      <StatCard icon={AlertTriangle} label="Critical"     value={data?.criticalApis} color="amber" glow={data?.criticalApis > 0} />
    </div>
  )
}
