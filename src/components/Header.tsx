'use client'

export default function Header() {
  return (
    <header className='border-b border-steel bg-void2 py-orbit px-orbit'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-pulse'>
          <div>
            <h1 className='text-3xl font-bold text-frost font-mono'>TELEMETRY</h1>
            <p className='text-ash text-sm mt-signal font-mono'>&gt; SPACE LAUNCH TRACKING</p>
          </div>
          <div className='text-right text-xs font-mono'>
            <p className='text-nebula'>STATUS: [ONLINE]</p>
            <p className='text-stellar'>LATENCY: [LOW]</p>
          </div>
        </div>
        <p className='text-ash text-xs uppercase tracking-wider'>
          // HUMANITY'S ATTEMPT TO LEAVE THE PLANET
        </p>
      </div>
    </header>
  )
}
