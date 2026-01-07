'use client'

export default function Header() {
  return (
    <header style={{ borderColor: '#2d2d2d', backgroundColor: '#0f0f0f', color: '#e8e8e8' }} className='border-b py-4 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-2'>
          <div>
            <h1 className='text-3xl font-bold font-mono'>TELEMETRY</h1>
            <p style={{ color: '#666666' }} className='text-sm mt-1 font-mono'>&gt; SPACE LAUNCH TRACKING</p>
          </div>
          <div className='text-right text-xs font-mono'>
            <p style={{ color: '#6366f1' }}>STATUS: [ONLINE]</p>
            <p style={{ color: '#818cf8' }}>LATENCY: [LOW]</p>
          </div>
        </div>
        <p style={{ color: '#666666' }} className='text-xs uppercase tracking-wider'>
          // HUMANITY'S ATTEMPT TO LEAVE THE PLANET
        </p>
      </div>
    </header>
  )
}
