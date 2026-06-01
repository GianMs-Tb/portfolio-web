/**
 * Pre-send Validator — hard failures abort; soft warnings log but continue.
 * @module pre-send-validator
 */

/** @typedef {'hard'|'soft'} FailureTier */

/**
 * @param {object} payload
 * @param {string} [payload.toEmail]
 * @param {string} [payload.subject]
 * @param {string} [payload.htmlBody]
 * @param {string} [payload.fromAliasId]
 * @param {string} [payload.recordId]
 * @param {boolean} [payload.hasAttachment]
 * @param {string} [payload.pdfPassword]
 */
export function validatePreSend(payload) {
  const hardFailures = []
  const softWarnings = []

  if (!payload.toEmail?.includes('@')) {
    hardFailures.push({ field: 'toEmail', message: 'Valid recipient email required' })
  }
  if (!payload.subject?.trim()) {
    hardFailures.push({ field: 'subject', message: 'Email subject required' })
  }
  if (!payload.htmlBody?.trim()) {
    hardFailures.push({ field: 'htmlBody', message: 'Email body required' })
  }
  if (!payload.fromAliasId) {
    hardFailures.push({ field: 'fromAliasId', message: 'Sender alias required' })
  }
  if (!payload.recordId) {
    hardFailures.push({ field: 'recordId', message: 'Record ID required for audit' })
  }

  if (payload.hasAttachment && !payload.pdfPassword) {
    softWarnings.push({ field: 'pdfPassword', message: 'Attachment present but no password derived' })
  }

  if (hardFailures.length > 0) {
    return {
      status: 'abort',
      tier: 'hard',
      failures: hardFailures,
      warnings: softWarnings,
    }
  }

  return {
    status: 'proceed',
    tier: softWarnings.length ? 'soft' : 'clean',
    failures: [],
    warnings: softWarnings,
  }
}
