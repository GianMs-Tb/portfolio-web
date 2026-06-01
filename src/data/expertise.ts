export interface SkillItem {
  name: string
  /** Featured in portfolio case studies */
  demonstrated?: boolean
  /** Which project slugs evidence this skill */
  projects?: string[]
}

export interface SkillDomain {
  id: string
  rank: number
  name: string
  tagline: string
  skills: SkillItem[]
}

export interface ProfileRole {
  title: string
  emphasis: string
}

/** Ordered by professional value and current market demand (2025–2026) */
export const profileRoles: ProfileRole[] = [
  {
    title: 'AI Automation Specialist',
    emphasis: 'LLM routing, structured outputs, hybrid AI + code pipelines',
  },
  {
    title: 'Integration Engineer',
    emphasis: 'REST APIs, OAuth, webhooks, third-party system orchestration',
  },
  {
    title: 'Automation Engineer',
    emphasis: 'Workflow architecture, event-driven systems, production guardrails',
  },
  {
    title: 'Backend Engineer',
    emphasis: 'JavaScript/Node.js, data validation, API design, debugging at scale',
  },
]

export const skillDomains: SkillDomain[] = [
  {
    id: 'ai',
    rank: 1,
    name: 'AI Engineering',
    tagline: 'Production LLM integration—not chatbot demos',
    skills: [
      { name: 'Claude (Anthropic)', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'OpenAI', demonstrated: false },
      { name: 'Prompt Engineering', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Structured Outputs', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'AI-Assisted Workflows', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'LLM Integrations', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Intent Classification', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Hybrid AI + Deterministic Logic', demonstrated: true, projects: ['ai-operations-assistant'] },
    ],
  },
  {
    id: 'integration',
    rank: 2,
    name: 'API & Integration Engineering',
    tagline: 'Connecting systems with auth, contracts, and reliability',
    skills: [
      { name: 'REST APIs', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Webhooks', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'OAuth / Bearer Auth', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Authentication Flows', demonstrated: true, projects: ['secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'User Impersonation Patterns', demonstrated: true, projects: ['secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Third-Party Integrations', demonstrated: true, projects: ['secure-document-delivery'] },
      { name: 'Multipart File Uploads', demonstrated: true, projects: ['secure-document-delivery'] },
      { name: 'Slack API', demonstrated: true, projects: ['ai-operations-assistant', 'intelligent-followup-engine'] },
      { name: 'Gmail API', demonstrated: true, projects: ['ai-operations-assistant'] },
    ],
  },
  {
    id: 'automation',
    rank: 3,
    name: 'Automation Engineering',
    tagline: 'Code-first workflow systems—not drag-and-drop operators',
    skills: [
      { name: 'Workflow Architecture', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Workflow Orchestration', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Sub-Workflow Composition', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Process Automation', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Event-Driven Systems', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Validation Engines', demonstrated: true, projects: ['secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Rules Engines', demonstrated: true, projects: ['intelligent-followup-engine'] },
      { name: 'n8n', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Workato', demonstrated: false },
    ],
  },
  {
    id: 'backend',
    rank: 4,
    name: 'Backend Engineering',
    tagline: 'Custom logic, transforms, and API contracts in production',
    skills: [
      { name: 'JavaScript', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Node.js', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'TypeScript', demonstrated: true },
      { name: 'Payload Transformation', demonstrated: true, projects: ['secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Binary Processing', demonstrated: true, projects: ['secure-document-delivery'] },
      { name: 'Error Handling & Retry Logic', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery'] },
      { name: 'Identity Mapping', demonstrated: true, projects: ['intelligent-followup-engine'] },
    ],
  },
  {
    id: 'data',
    rank: 5,
    name: 'Data & Operations',
    tagline: 'Reliable data flows, validation, and production observability',
    skills: [
      { name: 'PostgreSQL', demonstrated: false },
      { name: 'Supabase', demonstrated: false },
      { name: 'SQL', demonstrated: false },
      { name: 'Database Design', demonstrated: false },
      { name: 'Data Validation', demonstrated: true, projects: ['secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Entity Matching / Fuzzy Search', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Monitoring', demonstrated: true, projects: ['ai-operations-assistant'] },
      { name: 'Debugging', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
      { name: 'Root Cause Analysis', demonstrated: true, projects: ['ai-operations-assistant', 'secure-document-delivery', 'intelligent-followup-engine'] },
    ],
  },
  {
    id: 'tooling',
    rank: 6,
    name: 'Developer Tooling',
    tagline: 'Engineering workflow and delivery toolchain',
    skills: [
      { name: 'Git', demonstrated: true },
      { name: 'GitHub', demonstrated: true },
      { name: 'Postman', demonstrated: true },
      { name: 'Linear', demonstrated: false },
      { name: 'Docker', demonstrated: false },
      { name: 'Vercel', demonstrated: true },
    ],
  },
]

/** Cross-cutting engineering competencies inferred from all projects */
export const engineeringCompetencies = [
  {
    name: 'System Design',
    description: 'Parent orchestrator + modular sub-workflows with explicit I/O contracts',
  },
  {
    name: 'Integration Architecture',
    description: 'Multi-system auth, impersonation, and API aggregation patterns',
  },
  {
    name: 'Production Guardrails',
    description: 'Pre-send validation, cooldown policies, skip/block logic, audit trails',
  },
  {
    name: 'Security Patterns',
    description: 'Credential vault usage, PDF encryption, sender-scoped token access',
  },
  {
    name: 'Operational Reliability',
    description: 'Retry policies, graceful degradation, structured error responses',
  },
  {
    name: 'Technical Communication',
    description: 'Architecture diagrams, case study documentation, stakeholder-ready outputs',
  },
]

/** Per-project skill inference for positioning review */
export const projectSkillMap = [
  {
    slug: 'ai-operations-assistant',
    name: 'AI Operations Copilot',
    primarySkills: [
      'LLM intent classification',
      'Structured JSON output parsing',
      'Multi-channel ingestion (Slack + email)',
      'Thread-aware context recovery',
      'Intent routing & sub-workflow dispatch',
      'Fuzzy entity matching',
      'Unified response formatting',
    ],
    stack: ['n8n', 'JavaScript', 'Claude', 'Slack API', 'Gmail API', 'REST APIs', 'OAuth'],
  },
  {
    slug: 'secure-document-delivery',
    name: 'Secure Document Delivery Pipeline',
    primarySkills: [
      'ETL-style data aggregation',
      'Dynamic HTML generation',
      'Binary file pipelines',
      'Third-party encryption integration',
      'Pre-send validation (hard/soft failures)',
      'Multipart email delivery',
      'Activity audit logging',
    ],
    stack: ['n8n', 'JavaScript', 'REST APIs', 'OAuth', 'PDF Encryption API', 'Multipart Uploads'],
  },
  {
    slug: 'intelligent-followup-engine',
    name: 'Intelligent Follow-Up Engine',
    primarySkills: [
      'Cross-system identity mapping',
      'JavaScript rules engine',
      'Template resolution logic',
      'Communication history analysis',
      'Cooldown / anti-spam guardrails',
      'Sub-workflow I/O contract design',
    ],
    stack: ['n8n', 'JavaScript', 'REST APIs', 'OAuth', 'Slack API', 'Template API'],
  },
]

export interface SkillCategory {
  name: string
  skills: string[]
}

/** Legacy flat categories — kept for README compatibility */
export const skillCategories: SkillCategory[] = skillDomains.map((d) => ({
  name: d.name,
  skills: d.skills.map((s) => s.name),
}))

export const socialLinks = {
  github: 'https://github.com/GianMs-Tb',
  linkedin: 'https://www.linkedin.com/in/gian-marco-saldarriaga-66a57b389',
  email: 'mailto:marcofyh@gmail.com',
}
