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

      <main className='max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12'>
        {/* NEXT LAUNCH BEACON */}
        {nextLaunch && (
          <section className='mb-12'>
            <div className='accent-line mb-6'>
              <h2 style={{ color: '#6366f1' }} className='text-lg md:text-xl font-bold uppercase tracking-widest'>
                ▶ NEXT IGNITION
              </h2>
            </div>
            <div 
              className='hover-lift'
              style={{ 
                borderColor: '#6366f1',
                borderLeft: '3px solid #6366f1',
                paddingLeft: '24px',
              }}
            >
              <LaunchCard {...nextLaunch} />
            </div>
          </section>
        )}

        {/* SCHEDULED MISSIONS SECTION */}
        <section>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4'>
            <div className='accent-line'>
              <h2 style={{ color: '#818cf8' }} className='text-lg md:text-xl font-bold uppercase tracking-widest'>
                ▶ SCHEDULED MISSIONS
              </h2>
            </div>
            <span 
              style={{ color: '#666666', borderColor: '#2d2d2d' }} 
              className='text-xs uppercase tracking-widest font-mono px-4 py-2 border'
            >
              {loading ? '⟳ LOADING...' : `◆ ${launches.length} RECORDS`}
            </span>
          </div>

          {/* Error state */}
          {error && (
            <div 
              style={{ 
                borderColor: '#ef4444', 
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                color: '#f87171'
              }} 
              className='border p-6 text-sm font-mono mb-8 animate-pulse'
            >
              <span style={{ color: '#ef4444' }}>▌ ERROR:</span> {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='skeleton'
                  style={{ 
                    borderColor: '#2d2d2d',
                    height: '200px',
                    border: '1px solid #2d2d2d'
                  }}
                />
              ))}
            </div>
          )}

          {/* Launches grid */}
          {!loading && launches.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {launches.map((launch) => (
                <LaunchCard key={launch.id} {...launch} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && launches.length === 0 && !error && (
            <div 
              style={{ 
                borderColor: '#2d2d2d', 
                color: '#666666',
                borderStyle: 'dashed'
              }} 
              className='border p-8 text-center'
            >
              <p className='text-sm uppercase tracking-widest font-mono opacity-70'>
                ◆ NO LAUNCHES IN QUEUE
              </p>
              <p className='text-xs mt-2' style={{ color: '#666666' }}>
                Awaiting orbital data updates...
              </p>
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer 
          style={{ borderColor: '#2d2d2d', color: '#666666' }} 
          className='mt-16 pt-8 border-t'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
            <div>
              <p className='text-xs uppercase tracking-widest mb-3 font-mono' style={{ color: '#6366f1' }}>
                ▌ SYSTEM STATUS
              </p>
              <p className='text-xs font-mono opacity-70'>
                &gt; TELEMETRY • SPACE LAUNCH TRACKING<br />
                &gt; STATUS: ONLINE • LATENCY: LOW
              </p>
            </div>
            <div>
              <p className='text-xs uppercase tracking-widest mb-3 font-mono' style={{ color: '#818cf8' }}>
                ▌ DATA SOURCES
              </p>
              <p className='text-xs font-mono opacity-70'>
                NASA • SpaceX • ISRO • Roscosmos<br />
                RocketLaunch.Live API Aggregation
              </p>
            </div>
          </div>
          
          <div style={{ borderColor: '#2d2d2d' }} className='border-t pt-6 text-xs font-mono'>
            <p className='mb-1' style={{ color: '#6366f1' }}>
              &gt; Physics is hard. We do not control the rockets.
            </p>
            <p style={{ color: '#666666' }} className='text-[10px]'>
              TELEMETRY v1.0 • Built with Next.js, React, TypeScript • Running on Vercel
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
