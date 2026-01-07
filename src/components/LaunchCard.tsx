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
    <div style={{ borderColor: '#2d2d2d', backgroundColor: '#1a1a1a', color: '#e8e8e8' }} className='border p-4 font-mono hover:border-blue-500 transition-colors duration-200'>
      <div className='flex justify-between items-start mb-2'>
        <div>
          <h3 className='text-lg font-bold'>{name}</h3>
          <p style={{ color: '#666666' }} className='text-sm'>{rocket}</p>
        </div>
        <span style={{ color: statusColor[status] }} className='text-xs font-bold uppercase'>
          {status}
        </span>
      </div>

      <div className='grid grid-cols-2 gap-4 mb-2 text-sm'>
        <div>
          <p style={{ color: '#666666' }} className='text-xs uppercase'>Agency</p>
          <p>{agency}</p>
        </div>
        <div>
          <p style={{ color: '#666666' }} className='text-xs uppercase'>Location</p>
          <p>{location}</p>
        </div>
      </div>

      <div>
        <p style={{ color: '#666666' }} className='text-xs uppercase'>Launch Window</p>
        <p style={{ color: '#6366f1' }} className='font-mono'>{formatDate(launchDate)} UTC</p>
      </div>
    </div>
  )
}
