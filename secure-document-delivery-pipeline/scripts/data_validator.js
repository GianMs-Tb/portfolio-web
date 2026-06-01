/**
 * Data Validator — compuertas de validación con Circuit Breaker semántico.
 * @module data_validator
 */

const REQUIRED_FIELDS = ['toEmail', 'subject', 'htmlBody', 'fromAliasId', 'recordId']

/**
 * @param {object} payload
 * @returns {{ status: 'abort'|'proceed'|'proceed_with_warnings', hard: object[], soft: object[] }}
 */
function validatePayload(payload) {
  const hard = []
  const soft = []

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field] || (typeof payload[field] === 'string' && !payload[field].trim())) {
      hard.push({ field, code: 'REQUIRED_MISSING', message: `Campo obligatorio ausente: ${field}` })
    }
  }

  if (payload.toEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.toEmail)) {
    hard.push({ field: 'toEmail', code: 'INVALID_FORMAT', message: 'Email destinatario inválido' })
  }

  if (payload.hasAttachment && !payload.pdfPassword) {
    soft.push({ field: 'pdfPassword', code: 'MISSING_DERIVED_PASSWORD', message: 'Adjunto sin contraseña derivada' })
  }

  if (payload.htmlBody && payload.htmlBody.length < 50) {
    soft.push({ field: 'htmlBody', code: 'SUSPICIOUSLY_SHORT', message: 'Cuerpo HTML inusualmente corto' })
  }

  if (hard.length > 0) {
    return {
      status: 'abort',
      circuitBreaker: true,
      hard,
      soft,
      message: 'Circuit breaker activado — flujo interrumpido. Alerta QA requerida.',
    }
  }

  return {
    status: soft.length > 0 ? 'proceed_with_warnings' : 'proceed',
    circuitBreaker: false,
    hard: [],
    soft,
  }
}

module.exports = { validatePayload, REQUIRED_FIELDS }
