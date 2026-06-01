/**
 * Intent Router — maps classified LLM intent to sub-workflow dispatch.
 * Extracted from production Code node logic (sanitized).
 *
 * @module intent-router
 */

/** @typedef {'status'|'outreach'|'secure_send'|'quality'|'help'|'unknown'} Intent */

/** @type {Record<Intent, { workflow: string; requiresRecord: boolean }>} */
const INTENT_MAP = {
  status: { workflow: 'status-aggregator', requiresRecord: true },
  outreach: { workflow: 'follow-up-engine', requiresRecord: true },
  secure_send: { workflow: 'document-pipeline', requiresRecord: true },
  quality: { workflow: 'quality-scoring', requiresRecord: true },
  help: { workflow: null, requiresRecord: false },
  unknown: { workflow: null, requiresRecord: false },
}

/**
 * @param {object} params
 * @param {Intent} params.intent
 * @param {string|null} params.recordId
 * @param {string} params.operatorSlackId
 * @param {string} params.channelId
 * @param {string} [params.threadTs]
 */
export function routeIntent({ intent, recordId, operatorSlackId, channelId, threadTs }) {
  const route = INTENT_MAP[intent] ?? INTENT_MAP.unknown

  if (route.requiresRecord && !recordId) {
    return {
      status: 'blocked',
      action: 'request_context',
      message: 'A record link or ID is required for this action. Paste a platform URL or mention the record ID.',
    }
  }

  if (!route.workflow) {
    return {
      status: 'skipped',
      action: 'format_static',
      message: intent === 'help' ? 'help_response' : 'unknown_intent',
    }
  }

  return {
    status: 'dispatch',
    action: 'execute_subworkflow',
    workflow: route.workflow,
    payload: {
      recordId,
      operatorSlackId,
      channelId,
      threadTs,
      intent,
    },
  }
}
