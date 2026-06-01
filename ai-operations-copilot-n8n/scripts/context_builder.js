/**
 * Context Builder — recuperación paginada de hilos Slack para ventana LLM.
 * @module context_builder
 */

const PLATFORM_RECORD_PATTERN = /\/records\/([A-Za-z0-9_-]{8,64})/g
const MAX_MESSAGES = 50

/**
 * Extrae record IDs de un array de mensajes normalizados.
 * @param {Array<{ text: string }>} messages
 */
function extractRecordIdsFromThread(messages) {
  const ids = new Set()
  for (const msg of messages) {
    const text = msg.text ?? ''
    let match
    while ((match = PLATFORM_RECORD_PATTERN.exec(text)) !== null) {
      ids.add(match[1])
    }
  }
  return [...ids]
}

/**
 * Normaliza respuesta paginada de conversations.replies.
 * @param {Array<object>} pages - Páginas acumuladas de la API
 */
function mergeThreadPages(pages) {
  const all = pages.flatMap((p) => p.messages ?? [])
  return all
    .filter((m) => m.subtype !== 'bot_message' || m.bot_id)
    .sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts))
    .slice(-MAX_MESSAGES)
}

/**
 * Construye payload de contexto para el prompt LLM.
 * @param {object} event - Evento Slack entrante
 * @param {Array<object>} threadPages - Páginas ya fetcheadas
 */
function buildContext(event, threadPages) {
  const thread = mergeThreadPages(threadPages)
  const recordIds = extractRecordIdsFromThread(thread)
  const primaryRecordId = recordIds.at(-1) ?? null

  return {
    channelId: event.channel,
    threadTs: event.thread_ts ?? event.ts,
    currentMessage: event.text ?? '',
    threadLength: thread.length,
    recordIds,
    primaryRecordId,
    contextWindow: thread.map((m) => ({
      user: m.user,
      text: m.text,
      ts: m.ts,
    })),
  }
}

module.exports = {
  buildContext,
  extractRecordIdsFromThread,
  mergeThreadPages,
  MAX_MESSAGES,
}
