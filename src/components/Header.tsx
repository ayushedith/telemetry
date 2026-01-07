'use client'

export default function Header() {
  return (
    <header style={{ borderColor: '#2d2d2d', backgroundColor: '#0f0f0f', color: '#e8e8e8' }} className='border-b py-8 px-4 border-solid'>
      <div className='max-w-7xl mx-auto'>
        {/* Top section with title and status */}
        <div className='flex justify-between items-start mb-6'>
          <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <h1 className='text-4xl md:text-5xl font-bold font-mono tracking-wider' style={{ letterSpacing: '0.15em' }}>
              TELEMETRY
            </h1>
            <div style={{ color: '#666666' }} className='text-sm mt-3 font-mono flex items-center gap-2 opacity-80'>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#6366f1' }}></span>
              <span>&gt; SPACE LAUNCH TRACKING SYSTEM</span>
            </div>
          </div>
          
          {/* Status indicators */}
          <div className='text-right text-xs font-mono space-y-2'>
            <div style={{ color: '#6366f1' }} className='flex items-center justify-end gap-2'>
              <span className='inline-block w-2 h-2 rounded-full' style={{ backgroundColor: '#6366f1', animation: 'pulse 2s infinite' }}></span>
              <span>STATUS: ONLINE</span>
            </div>
            <div style={{ color: '#818cf8' }} className='flex items-center justify-end gap-2'>
              <span className='inline-block w-2 h-2' style={{ backgroundColor: '#818cf8' }}></span>
              <span>LATENCY: LOW</span>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div style={{ borderColor: '#2d2d2d' }} className='border-t border-solid my-4'></div>

        {/* Bottom description */}
        <p style={{ color: '#666666' }} className='text-xs uppercase tracking-widest font-mono'>
          // HUMANITY&apos;S ATTEMPT TO LEAVE THE PLANET • REAL-TIME TELEMETRY • ZERO DISTRACTIONS
        </p>
      </div>
    </header>
  )
}
