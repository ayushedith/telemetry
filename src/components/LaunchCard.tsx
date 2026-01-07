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
    scheduled: 'text-nebula',
    'in-flight': 'text-stellar',
    completed: 'text-frost',
    failed: 'text-red-500',
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
    <div className='border border-steel bg-concrete p-orbit font-mono text-frost hover:border-nebula transition-colors duration-200'>
      <div className='flex justify-between items-start mb-pulse'>
        <div>
          <h3 className='text-lg font-bold text-frost'>{name}</h3>
          <p className='text-ash text-sm'>{rocket}</p>
        </div>
        <span className={`text-xs font-bold uppercase ${statusColor[status]}`}>
          {status}
        </span>
      </div>

      <div className='grid grid-cols-2 gap-orbit mb-pulse text-sm'>
        <div>
          <p className='text-ash text-xs uppercase'>Agency</p>
          <p className='text-frost'>{agency}</p>
        </div>
        <div>
          <p className='text-ash text-xs uppercase'>Location</p>
          <p className='text-frost'>{location}</p>
        </div>
      </div>

      <div>
        <p className='text-ash text-xs uppercase'>Launch Window</p>
        <p className='text-nebula font-mono'>{formatDate(launchDate)} UTC</p>
      </div>
    </div>
  )
}
