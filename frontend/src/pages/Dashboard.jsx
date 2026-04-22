import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../services/apiClient'
import ApiCard from '../components/ApiCard'
import AddApiModal from '../components/AddApiModal'
import Navbar from '../components/Navbar'
import StatsBar from '../components/StatsBar'
import { Plus, AlertTriangle } from 'lucide-react'

export default function Dashboard({ onLogout, username }) {
  const [showModal, setShowModal] = useState(false)

  // ── Poll dashboard stats every 5 seconds ────────────────────────
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn:  () => dashboardApi.getStats().then(r => r.data),
    refetchInterval: 5000,
    staleTime: 4000,
  })

  const apiStats = data?.apiStats ?? []

  const criticalCount = apiStats.filter(s => s.criticalAlert).length
  const failingCount  = apiStats.filter(s => s.lastSuccessFlag === false).length

  return (
    <div className="min-h-screen bg-bg-primary scanline-bg relative overflow-hidden">

      <Navbar username={username} onLogout={onLogout} />

      {/* ── Header Controls ── */}
      <div className="max-w-screen-xl mx-auto px-6 pt-24 pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Control <span className="neon-cyan">Surface</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1 font-mono">
              {isLoading ? 'Syncing...' : `${apiStats.length} endpoints tracked · Polling every 5s`}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Critical alert banner */}
            {criticalCount > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-red/10
                              border border-cyber-red/40 text-cyber-red text-sm font-semibold animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                {criticalCount} CRITICAL
              </div>
            )}

            {/* Add API */}
            <button
              id="add-api-btn"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
                         bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan
                         hover:bg-cyber-cyan/30 hover:shadow-cyber-cyan transition-all duration-200 btn-cyber">
              <Plus className="w-4 h-4" />
              Add API
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <StatsBar data={data} isLoading={isLoading} />
      </div>

      {/* ── API Card Grid ── */}
      <div className="max-w-screen-xl mx-auto px-6 pb-16">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 border-4 border-cyber-cyan/20 border-t-cyber-cyan rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-mono text-sm">Initializing monitoring engine...</p>
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <AlertTriangle className="w-16 h-16 text-cyber-red mb-4 opacity-60" />
            <p className="text-cyber-red font-semibold">Failed to load dashboard data</p>
            <button onClick={() => refetch()} className="mt-4 text-sm text-slate-400 hover:text-white underline">
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && apiStats.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-2xl glass-card border border-cyber-cyan/20
                            flex items-center justify-center mb-6 shadow-cyber-cyan">
              <Plus className="w-12 h-12 text-cyber-cyan opacity-60" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No APIs monitored yet</h2>
            <p className="text-slate-500 text-sm mb-6">Add your first API endpoint to begin monitoring</p>
            <button onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-xl bg-cyber-cyan/20 border border-cyber-cyan/40
                         text-cyber-cyan font-semibold hover:bg-cyber-cyan/30 transition-all btn-cyber">
              Add Your First API
            </button>
          </div>
        )}

        {!isLoading && apiStats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {apiStats.map((stat, i) => (
              <div key={stat.id} style={{ animationDelay: `${i * 60}ms` }} className="grid-enter">
                <ApiCard
                  stat={stat}
                  cardRef={null}
                  onDelete={refetch}
                  onToggle={refetch}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add API Modal */}
      {showModal && (
        <AddApiModal
          onClose={() => setShowModal(false)}
          onCreated={() => { setShowModal(false); refetch() }}
        />
      )}
    </div>
  )
}
