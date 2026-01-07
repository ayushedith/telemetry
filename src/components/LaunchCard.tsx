'use client'

interface LaunchCardProps {
  name: string
  rocket: string
  agency: string
  location: string
  launchDate: string
  status: 'scheduled' | 'in-flight' | 'completed' | 'failed'
}

export default function LaunchCard({
  name,
  rocket,
  agency,
  location,
  launchDate,
  status,
}: LaunchCardProps) {
  const statusColor = {
    scheduled: '#6366f1',
    'in-flight': '#818cf8',
    completed: '#e8e8e8',
    failed: '#ef4444',
  }

  const statusClass = {
    scheduled: 'status-scheduled',
    'in-flight': 'status-in-flight',
    completed: 'status-completed',
    failed: 'status-failed',
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'UTC',
    })
  }

  return (
    <div 
      className='card grid-item p-6 font-mono border-solid'
      style={{ 
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(4px)'
      }}
    >
      {/* Header with title and status */}
      <div className='flex justify-between items-start mb-6'>
        <div className='flex-1'>
          <h3 className='text-base font-bold mb-1 tracking-tight' style={{ fontSize: '15px', fontWeight: 700 }}>
            {name}
          </h3>
          <p style={{ color: '#818cf8' }} className='text-xs font-mono opacity-70'>
            {rocket}
          </p>
        </div>
        <span className={`status-badge ${statusClass[status]}`}>
          {status === 'in-flight' ? '▶ ' : '◆ '}
          {status}
        </span>
      </div>

      {/* Divider */}
      <div style={{ borderColor: 'rgba(99, 102, 241, 0.2)', marginBottom: '1.5rem' }} className='border-t border-solid'></div>

      {/* Details grid */}
      <div className='grid grid-cols-2 gap-6 mb-6'>
        <div>
          <p style={{ color: '#666666' }} className='text-xs uppercase tracking-widest mb-2 font-mono'>
            Agency
          </p>
          <p className='text-sm font-mono' style={{ color: '#e8e8e8' }}>
            {agency}
          </p>
        </div>
        <div>
          <p style={{ color: '#666666' }} className='text-xs uppercase tracking-widest mb-2 font-mono'>
            Location
          </p>
          <p className='text-sm font-mono' style={{ color: '#e8e8e8' }}>
            {location}
          </p>
        </div>
      </div>

      {/* Launch window */}
      <div>
        <p style={{ color: '#666666' }} className='text-xs uppercase tracking-widest mb-2 font-mono'>
          Launch Window (UTC)
        </p>
        <p 
          style={{ color: '#6366f1' }} 
          className='text-sm font-mono font-bold transition-all duration-300'
        >
          {formatDate(launchDate)}
        </p>
      </div>
    </div>
  )
}
