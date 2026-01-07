import { NextRequest, NextResponse } from 'next/server'
import { getAllLaunches, getNextLaunch } from '@/lib/launchApi'
import { getCache, setCache } from '@/lib/cache'

export async function GET(request: NextRequest) {
  try {
    // Check cache first
    const cachedData = getCache('launches')
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    // Fetch fresh data
    const launches = await getAllLaunches()
    const next = await getNextLaunch()

    // Sort by launch date
    const sorted = launches
      .filter((l) => l.status === 'scheduled')
      .sort((a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime())
      .slice(0, 12) // Limit to 12 upcoming launches

    const response = {
      launches: sorted,
      next,
      timestamp: new Date().toISOString(),
      status: 'online',
    }

    // Cache for 5 minutes
    setCache('launches', response)

    return NextResponse.json(response)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch launches', status: 'error' },
      { status: 500 }
    )
  }
}
