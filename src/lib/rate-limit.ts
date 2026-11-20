// In-memory sliding window rate limiter
interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale records periodically
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes
let lastCleanup = Date.now();

function cleanupStale(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const expiry = now - windowMs;
  for (const [key, record] of rateLimitStore.entries()) {
    record.timestamps = record.timestamps.filter((ts) => ts > expiry);
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Check and record a rate limit attempt.
 * @param identifier IP address or user agent hash
 * @param maxRequests Maximum allowed requests in the time window (default 5)
 * @param windowMs Time window in milliseconds (default 5 minutes)
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 5 * 60 * 1000
): { success: boolean; remaining: number; resetInSeconds: number } {
  cleanupStale(windowMs);

  const now = Date.now();
  const expiry = now - windowMs;

  const record = rateLimitStore.get(identifier) ?? { timestamps: [] };
  // Filter out timestamps outside window
  record.timestamps = record.timestamps.filter((ts) => ts > expiry);

  if (record.timestamps.length >= maxRequests) {
    const oldestTimestamp = record.timestamps[0];
    const resetInSeconds = Math.ceil((oldestTimestamp + windowMs - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.max(1, resetInSeconds),
    };
  }

  record.timestamps.push(now);
  rateLimitStore.set(identifier, record);

  return {
    success: true,
    remaining: maxRequests - record.timestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}
