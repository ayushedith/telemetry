import axios from 'axios'

interface Launch {
  id: string
  name: string
  rocket: string
  status: 'scheduled' | 'in-flight' | 'completed' | 'failed'
  launchDate: string
  agency: string
  location: string
}

// NASA API
export async function getNASALaunches(): Promise<Launch[]> {
  try {
    const response = await axios.get(
      'https://api.nasa.gov/planetary/apod?api_key=' + process.env.NEXT_PUBLIC_NASA_API_KEY
    )
    return []
  } catch (error) {
    console.error('NASA API error:', error)
    return []
  }
}

// SpaceX API (public, no auth needed)
export async function getSpaceXLaunches(): Promise<Launch[]> {
  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches/upcoming')
    return response.data.map((launch: any) => ({
      id: launch.id,
      name: launch.name,
      rocket: launch.rocket_id,
      status: launch.upcoming ? 'scheduled' : 'completed',
      launchDate: launch.date_utc,
      agency: 'SpaceX',
      location: launch.pad?.location?.name || 'Unknown',
    }))
  } catch (error) {
    console.error('SpaceX API error:', error)
    return []
  }
}

// RocketLaunch.Live API (aggregated)
export async function getAllLaunches(): Promise<Launch[]> {
  try {
    const response = await axios.get('https://api.rocketlaunch.live/v1/launches')
    return response.data.result.map((launch: any) => ({
      id: launch.id,
      name: launch.name,
      rocket: launch.rocket?.name || 'Unknown',
      status: launch.status,
      launchDate: launch.launch_date_utc,
      agency: launch.rocket?.agency || 'Unknown',
      location: launch.pad?.location?.name || 'Unknown',
    }))
  } catch (error) {
    console.error('RocketLaunch API error:', error)
    return []
  }
}

export async function getNextLaunch(): Promise<Launch | null> {
  const launches = await getAllLaunches()
  return launches.length > 0 ? launches[0] : null
}
