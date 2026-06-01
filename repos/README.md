# Portfolio Workflow Repos — Index

Public engineering repositories derived from production n8n systems (sanitized).

| Repo | GitHub name | Flagship metric |
|------|-------------|-----------------|
| AI Operations Copilot | `ai-operations-copilot` | 3–5 min → ~10 sec |
| Secure Document Delivery | `secure-document-delivery-pipeline` | 10–15 min saved/send |
| Intelligent Follow-Up | `intelligent-followup-engine` | 48h cooldown enforced |

## Next step: add your n8n JSON

1. Export workflow from n8n (Download)
2. Run through checklist: `_shared/SANITIZATION.md`
3. Save as `workflows/*.sanitized.json`
4. Map each **Code node** → extract logic to matching `src/` module
5. Push to GitHub under `GianMs-Tb`

## Paste workflows here for full extraction

Drop JSON files in this folder or paste in chat:

```
portfolio/repos/_incoming/
├── orchestrator.json
├── document-pipeline.json
└── follow-up-engine.json
```

When provided, re-run extraction to replace reference JS with production-accurate modules.
