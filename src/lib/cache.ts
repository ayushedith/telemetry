const NodeCache = require('node-cache')

const cache = new NodeCache({ stdTTL: 600 }) // 10 min TTL

export interface CacheEntry {
  data: any
  timestamp: number
}

export function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}

export function getCache(key: string): any {
  const entry = cache.get(key)
  return entry ? entry.data : null
}

export function deleteCache(key: string): void {
  cache.del(key)
}

export function clearCache(): void {
  cache.flushAll()
}

export function getCacheAge(key: string): number | null {
  const entry = cache.get(key)
  return entry ? Date.now() - entry.timestamp : null
}
