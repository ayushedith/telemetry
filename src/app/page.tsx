'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import LaunchCard from '@/components/LaunchCard'
import { getNextLaunch } from '@/lib/launchApi'

interface Launch {
  id: string
  name: string
  rocket: string
  status: 'scheduled' | 'in-flight' | 'completed' | 'failed'
  launchDate: string
  agency: string
  location: string
}

export default function Home() {
  const [launches, setLaunches] = useState<Launch[]>([])
  const [nextLaunch, setNextLaunch] = useState<Launch | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLaunches() {
      try {
        const response = await fetch('/api/launches')
        if (!response.ok) throw new Error('Failed to fetch launches')
        const data = await response.json()
        setLaunches(data.launches || [])
        setNextLaunch(data.next || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchLaunches()
    const interval = setInterval(fetchLaunches, 300000) // Refresh every 5 min
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ backgroundColor: '#000000', color: '#e8e8e8' }} className='min-h-screen font-mono'>
      <Header />

      <main className='max-w-7xl mx-auto px-4 py-4 md:px-4 md:py-4'>
        {/* NEXT LAUNCH BEACON */}
        {nextLaunch && (
          <section className='mb-4'>
            <h2 style={{ color: '#6366f1' }} className='text-lg font-bold mb-2 uppercase tracking-wider'>
              ▶ NEXT IGNITION
            </h2>
            <div style={{ borderColor: '#6366f1' }} className='animate-pulse border-l-2 pl-4'>
              <LaunchCard {...nextLaunch} />
            </div>
          </section>
        )}

        {/* LAUNCH QUEUE */}
        <section>
          <div className='flex justify-between items-center mb-2'>
            <h2 style={{ color: '#818cf8' }} className='text-lg font-bold uppercase tracking-wider'>
              ▶ SCHEDULED MISSIONS
            </h2>
            <span style={{ color: '#666666' }} className='text-xs'>
              {loading ? 'LOADING...' : `${launches.length} RECORDS`}
            </span>
          </div>

          {error && (
            <div style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }} className='border p-4 text-sm font-mono mb-4'>
              ERROR: {error}
            </div>
          )}

          {loading && (
            <div className='flex gap-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{ borderColor: '#2d2d2d', backgroundColor: '#1a1a1a' }}
                  className='flex-1 h-40 border animate-pulse'
                />
              ))}
            </div>
          )}

          {!loading && launches.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {launches.map((launch) => (
                <LaunchCard key={launch.id} {...launch} />
              ))}
            </div>
          )}

          {!loading && launches.length === 0 && !error && (
            <div style={{ borderColor: '#666666', color: '#666666' }} className='border border-dashed p-4 text-center'>
              NO LAUNCHES IN QUEUE
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer style={{ borderColor: '#2d2d2d', color: '#666666' }} className='mt-12 pt-4 border-t text-xs'>
          <p className='mb-1 font-mono'>
            &gt; TELEMETRY • SPACE LAUNCH TRACKING • STATUS: ONLINE
          </p>
          <p className='text-[10px]'>
            Data aggregated from NASA, SpaceX, ISRO, Roscosmos, and RocketLaunch.Live APIs
          </p>
          <p className='text-[10px] mt-1'>Physics is hard. We do not control the rockets.</p>
        </footer>
      </main>
    </div>
  )
}
