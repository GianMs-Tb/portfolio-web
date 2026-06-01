/**
 * Cooldown Evaluator — política de contacto + selección de template por reglas.
 * @module cooldown_evaluator
 */

const DEFAULT_COOLDOWN_HOURS = 48

const TEMPLATE_RULES = [
  { minTier: 1, maxSequence: 1, templateKey: 'initial_standard' },
  { minTier: 1, maxSequence: 2, templateKey: 'followup_standard' },
  { minTier: 2, maxSequence: 1, templateKey: 'initial_priority' },
  { minTier: 2, maxSequence: Infinity, templateKey: 'followup_priority' },
]

/**
 * @param {Array<{ sender_id: string, sent_at: string }>} history
 * @param {string} senderId
 * @param {number} [cooldownHours]
 */
function evaluateCooldown(history, senderId, cooldownHours = DEFAULT_COOLDOWN_HOURS) {
  const senderSends = history.filter((r) => r.sender_id === senderId)
  if (senderSends.length === 0) {
    return { allowed: true, waitHours: 0, priorSendCount: 0 }
  }

  const latest = senderSends.reduce((a, b) =>
    new Date(a.sent_at) > new Date(b.sent_at) ? a : b
  )

  const elapsedHours = (Date.now() - new Date(latest.sent_at).getTime()) / 3_600_000

  if (elapsedHours < cooldownHours) {
    return {
      allowed: false,
      waitHours: Math.ceil(cooldownHours - elapsedHours),
      priorSendCount: senderSends.length,
      message: `Cooldown activo. Reintento en ${Math.ceil(cooldownHours - elapsedHours)}h.`,
    }
  }

  return { allowed: true, waitHours: 0, priorSendCount: senderSends.length }
}

/**
 * @param {object} ctx
 * @param {number} ctx.tier
 * @param {number} ctx.priorSendCount
 */
function resolveTemplate(ctx) {
  const sequence = ctx.priorSendCount + 1
  const rule = TEMPLATE_RULES.find(
    (r) => ctx.tier >= r.minTier && sequence <= r.maxSequence
  )
  if (!rule) {
    return { status: 'error', code: 'NO_TEMPLATE_MATCH' }
  }
  return { status: 'ok', templateKey: rule.templateKey, sequence }
}

/**
 * Guardrail: estado stale si requirements completados o tier cambió.
 */
function validateFreshState(triggerState, currentState) {
  if (currentState.requirementsPending === 0 && triggerState.requirementsPending > 0) {
    return { status: 'skipped', reason: 'requirements_completed_since_trigger' }
  }
  if (currentState.tier !== triggerState.tier) {
    return { status: 'revalidate', reason: 'tier_changed', newTier: currentState.tier }
  }
  return { status: 'ok' }
}

module.exports = {
  evaluateCooldown,
  resolveTemplate,
  validateFreshState,
  DEFAULT_COOLDOWN_HOURS,
}
