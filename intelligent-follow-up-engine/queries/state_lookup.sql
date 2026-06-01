-- state_lookup.sql
-- Historial de comunicaciones por registro y remitente (PostgreSQL / Supabase)
-- Parámetros: :record_id, :sender_id, :cooldown_hours (default 48)

SELECT
  id,
  record_id,
  sender_id,
  template_key,
  sent_at,
  EXTRACT(EPOCH FROM (NOW() - sent_at)) / 3600 AS hours_since_send
FROM communication_log
WHERE record_id = :record_id
  AND sender_id = :sender_id
  AND sent_at >= NOW() - (:cooldown_hours || ' hours')::INTERVAL
ORDER BY sent_at DESC
LIMIT 10;

-- Lookup agregado: conteo de envíos previos por remitente en el registro
-- SELECT COUNT(*) AS prior_send_count
-- FROM communication_log
-- WHERE record_id = :record_id AND sender_id = :sender_id;
