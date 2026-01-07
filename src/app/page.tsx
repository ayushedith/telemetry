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
    <div className='min-h-screen bg-void text-frost font-mono'>
      <Header />

      <main className='max-w-7xl mx-auto px-orbit py-orbit'>
        {/* NEXT LAUNCH BEACON */}
        {nextLaunch && (
          <section className='mb-orbit'>
            <h2 className='text-lg font-bold text-nebula mb-pulse uppercase tracking-wider'>
              ▶ NEXT IGNITION
            </h2>
            <div className='animate-pulse border-l-2 border-nebula pl-orbit'>
              <LaunchCard {...nextLaunch} />
            </div>
          </section>
        )}

        {/* LAUNCH QUEUE */}
        <section>
          <div className='flex justify-between items-center mb-pulse'>
            <h2 className='text-lg font-bold text-stellar uppercase tracking-wider'>
              ▶ SCHEDULED MISSIONS
            </h2>
            <span className='text-ash text-xs'>
              {loading ? 'LOADING...' : `${launches.length} RECORDS`}
            </span>
          </div>

          {error && (
            <div className='border border-red-500 bg-red-500/10 p-orbit text-red-400 text-sm font-mono mb-orbit'>
              ERROR: {error}
            </div>
          )}

          {loading && (
            <div className='flex gap-pulse'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='flex-1 h-40 border border-steel bg-concrete animate-pulse'
                />
              ))}
            </div>
          )}

          {!loading && launches.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-orbit'>
              {launches.map((launch) => (
                <LaunchCard key={launch.id} {...launch} />
              ))}
            </div>
          )}

          {!loading && launches.length === 0 && !error && (
            <div className='border border-dashed border-ash p-orbit text-center text-ash'>
              NO LAUNCHES IN QUEUE
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className='mt-orbit*3 pt-orbit border-t border-steel text-xs text-ash'>
          <p className='mb-signal font-mono'>
            &gt; TELEMETRY • SPACE LAUNCH TRACKING • STATUS: ONLINE
          </p>
          <p className='text-[10px]'>
            Data aggregated from NASA, SpaceX, ISRO, Roscosmos, and RocketLaunch.Live APIs
          </p>
          <p className='text-[10px] mt-signal'>Physics is hard. We do not control the rockets.</p>
        </footer>
      </main>
    </div>
  )
}
