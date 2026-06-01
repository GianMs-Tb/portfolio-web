# Workflow Sanitization Checklist

Apply before committing any n8n export to a public repository.

## Remove or replace

| Category | Action |
|----------|--------|
| Company / product names | Replace with `Core Platform`, `Business Platform API` |
| Client names | Replace with `Stakeholder`, `Contact` |
| Internal URLs | Replace with `https://api.example.com/v1/...` |
| Record / user / channel IDs | Replace with `{{RECORD_ID}}`, `U00000000`, `C00000000` |
| Email addresses | Replace with `operator@example.com` |
| API keys / tokens | Remove entirely; reference credential vault |
| OAuth client secrets | Remove; document auth pattern in README only |
| Webhook URLs with secrets | Replace with placeholder path |
| Slack workspace names | Remove |
| Gmail labels / filters with PII | Generalize |

## n8n-specific fields to scrub

```json
"credentials": { ... }           → remove or set to null
"webhookId": "..."               → replace
"id": "..."                      → keep node structure, IDs ok for topology
"parameters": { "url": "..." }   → scrub internal URLs
```

## Validation before publish

- [ ] Run `grep -riE '(api_key|secret|password|Bearer |@.*\.(com|io))' workflows/`
- [ ] Open screenshots — blur names, IDs, URLs
- [ ] README contains zero client-specific terminology
- [ ] JSON exports import into n8n without credential errors (expected — credentials re-linked locally)

## Recommended commit structure

```
feat(workflows): add sanitized orchestrator export
docs: add architecture diagrams
refactor(src): extract intent classifier from code node
```
