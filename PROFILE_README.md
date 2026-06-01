# Gian Marco Saldarriaga | Integration & Automation Engineer

Construcción de **sistemas puente** entre plataformas críticas de negocio — orquestación de datos asíncronos, automatización de operaciones de alto volumen e integración de **LLMs** en pipelines tolerantes a fallos.

[![GitHub](https://img.shields.io/badge/GitHub-GianMs--Tb-181717?style=flat-square&logo=github)](https://github.com/GianMs-Tb)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/gianmarcosaldarriaga)
[![Email](https://img.shields.io/badge/Email-hello@gianmarco.dev-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:hello@gianmarco.dev)

---

## Lo que hago

Mi trabajo diario consiste en **diseñar workflows estables**, **debugear APIs complejas**, implementar flujos de autenticación (**OAuth2**, **Webhooks**) y estructurar **pipelines de datos tolerantes a fallos**.

Trato la automatización como **código** (*Workflows as Code*):

- Lógica de negocio en **JavaScript/Node.js** — no en ramas visuales frágiles
- **Validación de esquemas** y compuertas pre-envío (fail closed)
- Orquestación **Parent/Child** con contratos I/O explícitos
- **Manejo de errores**, reintentos y respuestas estructuradas upstream
- Integración con **REST APIs**, procesamiento binario y estado en **SQL**

Las plataformas **n8n** y **Workato** son la capa de ejecución — la ingeniería está en la arquitectura, las integraciones y el código.

```text
Eventos (Slack / Gmail / DB)  →  Validación  →  Lógica JS  →  APIs REST  →  Respuesta estructurada
                                        ↑
                              LLM (Structured Outputs)
```

---

## Stack tecnológico

### Orquestación & Integración
`n8n` · `Workato` · Webhooks · OAuth2 · REST APIs · Multipart uploads · Sub-workflow composition

### Desarrollo
`JavaScript` · `Node.js` · `TypeScript` · Payload transformation · Binary/buffer processing · Error handling & retries

### Base de datos
`PostgreSQL` · `Supabase` · SQL · State persistence · Communication cooldown logs

### IA aplicada
`Claude (Anthropic)` · `OpenAI` · Prompt engineering · Structured JSON outputs · Intent classification · Entity extraction

---

## Proyectos destacados

| Proyecto | Descripción técnica |
|----------|---------------------|
| [**AI Operations Copilot**](./ai-operations-copilot-n8n) | Orquestación multi-canal con clasificación semántica LLM, context recovery en hilos Slack y enrutamiento Parent/Child a sub-workflows vía REST. |
| [**Secure Document Delivery Pipeline**](./secure-document-delivery-pipeline) | Pipeline ETL con OAuth impersonation, validation gates (circuit breaker), procesamiento binario PDF encriptado y multipart upload con auditoría. |
| [**Intelligent Follow-Up Engine**](./intelligent-follow-up-engine) | Motor de reglas con cooldown logic en PostgreSQL/Supabase, identity mapping multi-plataforma y guardrails de estado pre-envío. |

---

## Impacto en producción

| Sistema | Métrica clave |
|---------|--------------|
| AI Operations Copilot | Consultas de estado: **3–5 min → ~10 seg** |
| Document Pipeline | **10–15 min** ahorrados por envío · PDFs 100% protegidos |
| Follow-Up Engine | Cooldown **48h** · **25+** operadores |

---

## Contacto

- **Email:** [hello@gianmarco.dev](mailto:hello@gianmarco.dev)
- **LinkedIn:** [linkedin.com/in/gianmarcosaldarriaga](https://linkedin.com/in/gianmarcosaldarriaga)
- **GitHub:** [github.com/GianMs-Tb](https://github.com/GianMs-Tb)
- **Ubicación:** Remoto · Colombia (UTC-5)

---

*Automatización como ingeniería de integración — no como drag-and-drop.*
