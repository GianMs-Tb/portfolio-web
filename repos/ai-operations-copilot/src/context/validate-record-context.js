/**
 * Record Context Validator — fail-fast gate before expensive API chains.
 * @module validate-record-context
 */

const RECORD_ID_PATTERN = /^[A-Za-z0-9_-]{8,64}$/
const PLATFORM_URL_PATTERN = /\/records\/([A-Za-z0-9_-]+)/

/**
 * @param {string|null|undefined} raw
 * @returns {string|null}
 */
export function extractRecordId(raw) {
  if (!raw || typeof raw !== 'string') return null
  const trimmed = raw.trim()

  const urlMatch = trimmed.match(PLATFORM_URL_PATTERN)
  if (urlMatch) return urlMatch[1]

  if (RECORD_ID_PATTERN.test(trimmed)) return trimmed

  return null
}

/**
 * @param {object} ctx
 * @param {string|null} ctx.recordId
 * @param {string} ctx.intent
 * @param {string[]} ctx.recordRequiredIntents
 */
export function validateRecordContext({ recordId, intent, recordRequiredIntents }) {
  const requiresRecord = recordRequiredIntents.includes(intent)

  if (!requiresRecord) {
    return { valid: true, recordId: recordId ?? null }
  }

  const normalized = extractRecordId(recordId)
  if (!normalized) {
    return {
      valid: false,
      errorCode: 'MISSING_RECORD_CONTEXT',
      message: 'Record identifier required. Include a platform link or ID in your message or thread.',
    }
  }

  return { valid: true, recordId: normalized }
}
