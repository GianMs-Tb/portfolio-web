/**
 * Intent Router — enrutamiento determinista post-clasificación LLM.
 * Ejecutado en nodos Code de n8n. Workflows as Code.
 *
 * @module intent_router
 */

const CONFIDENCE_THRESHOLD = 0.72

const ROUTES = {
  status_check: { subWorkflow: 'status-aggregator', requiresRecord: true },
  outreach: { subWorkflow: 'follow-up-engine', requiresRecord: true },
  secure_send: { subWorkflow: 'document-pipeline', requiresRecord: true },
  quality: { subWorkflow: 'quality-scoring', requiresRecord: true },
  help: { subWorkflow: null, requiresRecord: false },
  unknown: { subWorkflow: null, requiresRecord: false },
}

/**
 * @param {object} input
 * @param {object} input.llmOutput - Salida parseada del LLM
 * @param {string|null} input.recordId - ID resuelto por context_builder
 */
function routeIntent(input) {
  const { llmOutput, recordId } = input
  const intent = llmOutput?.intent ?? 'unknown'
  const confidence = llmOutput?.confidence ?? 0
  const route = ROUTES[intent] ?? ROUTES.unknown

  if (confidence < CONFIDENCE_THRESHOLD && intent !== 'help') {
    return {
      action: 'fuzzy_fallback',
      status: 'ambiguous',
      message: 'Confianza insuficiente — activar fuzzy match o solicitar clarificación.',
      intent,
      confidence,
    }
  }

  if (route.requiresRecord && !recordId) {
    return {
      action: 'request_context',
      status: 'blocked',
      message: 'Se requiere identificador de registro en el mensaje o hilo.',
      intent,
    }
  }

  if (!route.subWorkflow) {
    return { action: 'static_response', status: 'skipped', intent }
  }

  return {
    action: 'execute_subworkflow',
    status: 'dispatch',
    subWorkflow: route.subWorkflow,
    payload: { recordId, intent, entities: llmOutput.entities ?? {} },
  }
}

module.exports = { routeIntent, CONFIDENCE_THRESHOLD, ROUTES }
