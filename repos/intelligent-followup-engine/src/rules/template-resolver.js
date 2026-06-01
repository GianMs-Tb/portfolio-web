/**
 * Template Resolver — selects official template by process tier and outreach sequence.
 * @module template-resolver
 */

/** @typedef {{ tier: number; sequence: number; variant: string }} ProcessContext */

/** @type {Array<{ minTier: number; maxSequence: number; templateKey: string }>} */
const TEMPLATE_RULES = [
  { minTier: 1, maxSequence: 1, templateKey: 'initial_standard' },
  { minTier: 1, maxSequence: 2, templateKey: 'followup_standard' },
  { minTier: 2, maxSequence: 1, templateKey: 'initial_priority' },
  { minTier: 2, maxSequence: Infinity, templateKey: 'followup_priority' },
]

/**
 * @param {ProcessContext} ctx
 * @param {number} priorSendCount — emails from same sender on this record
 */
export function resolveTemplate({ tier, sequence, variant }, priorSendCount) {
  const effectiveSequence = priorSendCount + 1

  const rule = TEMPLATE_RULES.find(
    (r) => tier >= r.minTier && effectiveSequence <= r.maxSequence
  )

  if (!rule) {
    return {
      status: 'error',
      errorCode: 'NO_TEMPLATE_MATCH',
      message: `No template rule for tier=${tier}, sequence=${effectiveSequence}, variant=${variant}`,
    }
  }

  return {
    status: 'ok',
    templateKey: rule.templateKey,
    sequence: effectiveSequence,
  }
}

/**
 * @param {Array<{ senderId: string; sentAt: string }>} history
 * @param {string} senderId
 * @param {number} cooldownHours
 */
export function validateCooldown(history, senderId, cooldownHours = 48) {
  const senderEmails = history.filter((e) => e.senderId === senderId)
  if (senderEmails.length === 0) {
    return { allowed: true, waitHours: 0 }
  }

  const latest = senderEmails.reduce((a, b) =>
    new Date(a.sentAt) > new Date(b.sentAt) ? a : b
  )

  const elapsedMs = Date.now() - new Date(latest.sentAt).getTime()
  const elapsedHours = elapsedMs / (1000 * 60 * 60)

  if (elapsedHours < cooldownHours) {
    return {
      allowed: false,
      waitHours: Math.ceil(cooldownHours - elapsedHours),
      message: `Cooldown active. Retry in ${Math.ceil(cooldownHours - elapsedHours)} hours.`,
    }
  }

  return { allowed: true, waitHours: 0 }
}
