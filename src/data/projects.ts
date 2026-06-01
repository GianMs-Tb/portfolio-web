export interface Project {
  slug: string
  name: string
  tagline: string
  summary: string
  technologies: string[]
  businessValue: string[]
  architecturePreview: string
  overview: string
  challenge: string[]
  solution: string[]
  myRole: string[]
  workflowLogic: string[]
  architectureDiagram: string
  integrationDiagram: string
  engineeringHighlights: string[]
  lessonsLearned: string[]
  impact: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    slug: 'ai-operations-assistant',
    name: 'AI Operations Copilot',
    tagline: 'Multi-channel orchestration for high-volume operational teams',
    summary:
      'Designed and built an AI-powered operations copilot that routes natural-language Slack requests to specialized automation modules, with proactive email triage and unified response formatting across a 25+ person team.',
    technologies: [
      'n8n',
      'Anthropic Claude',
      'JavaScript',
      'Slack API',
      'Gmail API',
      'REST APIs',
      'Structured LLM Output',
    ],
    businessValue: [
      'Reduced status lookup time from minutes to seconds',
      'Proactive stakeholder update triage without manual inbox monitoring',
      'Standardized next-action recommendations across teams',
    ],
    architecturePreview: 'orchestrator',
    overview:
      'A multi-channel operations copilot that interprets natural-language requests, validates context, routes to specialized sub-systems, and returns structured responses—combining reactive chat commands with proactive email monitoring.',
    challenge: [
      'Operations teams manage high volumes of business process workflows across document collection, status updates, and stakeholder outreach. Each action requires logging into a core platform, locating records, checking status, and updating activity logs.',
      'Team members context-switch constantly between collaboration tools, email, and CRM systems. The same lookups are repeated dozens of times daily, creating friction and inconsistent follow-up behavior.',
      'Proactive updates from external stakeholders often sit in inboxes until manually triaged. New team members face steep learning curves without a unified interface for common operational tasks.',
    ],
    solution: [
      'Built an AI-assisted operations copilot that listens in Slack, classifies intent with structured LLM output, and routes requests to specialized automation modules.',
      'Implemented thread-aware context recovery so users don\'t repeat record identifiers in every message.',
      'Added a parallel Gmail ingestion path that extracts structured intelligence from inbound emails, fuzzy-matches records in the core platform, and posts proactive alerts.',
      'Designed a unified response formatter delivering consistent, actionable Slack messages across eight intent types.',
    ],
    myRole: [
      'Architected the parent orchestrator and sub-workflow integration pattern',
      'Designed intent taxonomy and LLM prompt engineering with structured JSON output parsing',
      'Built context validation, thread-history link extraction, and record-link requirement gates',
      'Implemented fuzzy entity matching for email-sourced record identification',
      'Developed the unified Slack response formatter and proactive alert pipeline',
      'Integrated authentication sub-workflows and REST API aggregation for status views',
      'Configured error handling, retry policies, and graceful degradation paths',
      'Deployed and tested across production operations channels',
    ],
    workflowLogic: [
      'User mentions the copilot in Slack with a natural-language request.',
      'The system extracts message context and classifies intent using an LLM with enforced JSON schema.',
      'For record-dependent actions, the system validates that a process identifier is present—checking the current message or scanning thread history.',
      'The intent router dispatches to the appropriate module: status aggregation, document outreach, secure document delivery, or quality scoring.',
      'Each module executes autonomously via reusable sub-workflows and returns structured results.',
      'A unified formatter transforms results into consistent Slack responses posted in-thread.',
      'Separately, incoming stakeholder emails are polled, analyzed by AI, matched to records, enriched with platform data, and surfaced as proactive channel alerts.',
    ],
    architectureDiagram: `flowchart TB
    subgraph Ingestion["Ingestion Layer"]
        SL["Slack Mentions"]
        GM["Email Monitor"]
    end

    subgraph AI["AI Layer"]
        IC["Intent Classifier"]
        ET["Email Triage Extractor"]
    end

    subgraph Orchestrator["Operations Copilot"]
        VR["Context Validator"]
        RT["Intent Router"]
        FM["Response Formatter"]
    end

    subgraph Modules["Automation Modules"]
        ST["Status Aggregator"]
        MD["Document Outreach"]
        SS["Secure Document Delivery"]
        SC["Quality Scoring"]
    end

    subgraph Platform["Core Business Platform"]
        AUTH["Auth + Impersonation"]
        API["REST API"]
    end

    SL --> IC --> VR --> RT
    GM --> ET --> VR
    RT --> ST & MD & SS & SC
    ST & MD & SS & SC --> AUTH --> API
    ST & MD & SS & SC --> FM --> SL`,
    integrationDiagram: `flowchart LR
    subgraph External["External Systems"]
        Slack["Slack"]
        Gmail["Gmail"]
        LLM["Anthropic Claude"]
    end

    subgraph Engine["Automation Engine"]
        Parent["Parent Orchestrator"]
        Auth["Shared Auth Module"]
        Child["Child Workflows"]
    end

    subgraph Core["Core Platform"]
        CRM["Business Platform API"]
    end

    Slack --> Parent
    Gmail --> Parent
    LLM --> Parent
    Parent --> Auth
    Parent --> Child
    Auth --> CRM
    Child --> CRM
    Parent --> Slack`,
    engineeringHighlights: [
      'Agentic orchestration pattern: LLM handles ambiguity, deterministic code handles correctness',
      'Sub-workflow composition isolates domain logic while keeping the parent flow thin',
      'Thread-history context recovery eliminates repetitive user input',
      'Dual-ingestion architecture (reactive + proactive) in a single response pipeline',
      'Fuzzy entity matching handles real-world data quality across heterogeneous record sources',
    ],
    lessonsLearned: [
      'Structured output parsing is essential—free-form LLM responses break downstream routing',
      'Always validate record context before expensive API chains; fail fast with helpful messages',
      'Sub-workflow I/O contracts should be explicit and version-stable for maintainability',
      'Proactive monitoring paths need separate enrichment logic but shared formatting for UX consistency',
    ],
    impact: [
      { label: 'Status check time', value: '3–5 min → ~10 sec' },
      { label: 'Team coverage', value: '25+ operators' },
      { label: 'Intent types', value: '8 routed paths' },
      { label: 'Channels', value: 'Slack + Email' },
    ],
  },
  {
    slug: 'secure-document-delivery',
    name: 'Secure Document Delivery Pipeline',
    tagline: 'Automated password-protected document delivery with audit trails',
    summary:
      'Engineered an end-to-end pipeline that retrieves process data, dynamically composes personalized emails, password-protects PDF attachments, validates payloads pre-send, and logs activity—reducing 10–15 minute manual workflows to triggered automation.',
    technologies: [
      'n8n',
      'JavaScript',
      'REST APIs',
      'PDF Encryption API',
      'Multipart Uploads',
      'Bearer Auth',
      'Binary Processing',
    ],
    businessValue: [
      'Eliminated 10–15 minutes of manual work per document send',
      'Consistent password protection on all client-facing PDFs',
      'Pre-send validation prevents malformed or incomplete emails',
    ],
    architecturePreview: 'pipeline',
    overview:
      'A secure document delivery pipeline that aggregates process record data, generates personalized HTML emails, optionally encrypts PDF attachments, validates complete payloads, delivers via platform-native email APIs, and writes audit records.',
    challenge: [
      'Operations teams regularly send clients consolidated status reports containing sensitive business data. Unprotected attachments create compliance and privacy risk.',
      'The manual process—download PDF, apply password protection, draft email, select sender alias, log activity—takes 10–15 minutes per record and is prone to errors.',
      'Emails must appear from the operator\'s branded address per business unit or partner, not a generic system account, while maintaining full audit trails.',
    ],
    solution: [
      'Built an automated pipeline with shared authentication and user impersonation for sender-scoped API access.',
      'Implemented dynamic HTML email generation from live record data including key metrics, outstanding requirements, and password instructions.',
      'Created a conditional PDF branch: download, encrypt via third-party API with record-derived passwords, and repair binary metadata for upload.',
      'Added a validation engine distinguishing hard failures from soft warnings, with clean abort paths for upstream notification.',
    ],
    myRole: [
      'Designed authentication flow with impersonation and token normalization',
      'Built data aggregation layer across records, files, aliases, and branding settings',
      'Implemented dynamic HTML email composer with conditional content blocks',
      'Engineered PDF download, encryption, and binary metadata pipeline',
      'Developed multi-tier password derivation logic with fallback chain',
      'Created pre-send validation engine with hard/soft failure classification',
      'Integrated multipart email delivery and automatic activity logging',
      'Tested edge cases: missing attachments, missing passwords, invalid emails',
    ],
    workflowLogic: [
      'Pipeline receives record ID, contact details, and sender identity from parent orchestrator.',
      'System authenticates and impersonates the requesting user for scoped API access.',
      'Record data, files, sender aliases, and email customizations are aggregated in parallel.',
      'Dynamic HTML email is composed with process metrics, requirements list, and password instructions.',
      'Payload validator checks all required fields; hard failures abort with structured error context.',
      'If attachment exists: PDF is downloaded, password-protected, and prepared for multipart upload.',
      'Email is sent through platform-native API preserving sender identity and audit semantics.',
      'Activity note is written to the record documenting send details and execution trace.',
    ],
    architectureDiagram: `flowchart LR
    subgraph Input["Trigger"]
        T["Process Context"]
    end

    subgraph Auth["Authentication"]
        A1["Service Auth"]
        A2["User Impersonation"]
    end

    subgraph Data["Data Layer"]
        D1["Record"]
        D2["Files"]
        D3["Aliases"]
        D4["Branding"]
    end

    subgraph Process["Processing"]
        H["HTML Composer"]
        V["Validator"]
        P["PDF Encrypt"]
    end

    subgraph Output["Delivery"]
        E["Email API"]
        N["Activity Log"]
    end

    T --> A1 --> A2
    A2 --> D1 & D2 & D3 & D4
    D1 & D2 & D3 & D4 --> H --> V
    V -->|Has PDF| P --> E
    V -->|No PDF| E
    E --> N`,
    integrationDiagram: `flowchart TB
    Parent["Parent Orchestrator"] --> Pipeline["Document Pipeline"]
    Pipeline --> Auth["Shared Auth"]
    Pipeline --> RecordAPI["Record API"]
    Pipeline --> FileAPI["File Download API"]
    Pipeline --> Encrypt["PDF Encryption Service"]
    Pipeline --> EmailAPI["Platform Email API"]
    Pipeline --> NotesAPI["Activity Notes API"]
    Encrypt --> EmailAPI`,
    engineeringHighlights: [
      'ETL + security + transactional delivery combined in one pipeline',
      'Password derivation chain balances security with end-user usability',
      'Soft warnings vs hard failures enable graceful degradation',
      'Binary file handling through encryption and metadata repair',
      'Impersonation pattern preserves platform audit semantics at scale',
    ],
    lessonsLearned: [
      'Always normalize API token response shapes—platforms return inconsistent structures',
      'Binary metadata matters: MIME type and filename must be explicit for multipart uploads',
      'Validation should distinguish blocking errors from operational warnings',
      'Activity logging should be built into the pipeline, not left as a manual step',
    ],
    impact: [
      { label: 'Time saved per send', value: '10–15 min' },
      { label: 'PDF protection', value: '100% automated' },
      { label: 'Validation gate', value: 'Pre-send abort' },
      { label: 'Audit trail', value: 'Auto-logged' },
    ],
  },
  {
    slug: 'intelligent-followup-engine',
    name: 'Intelligent Follow-Up Engine',
    tagline: 'Rules-driven stakeholder outreach with anti-spam guardrails',
    summary:
      'Built a policy-aware outreach engine that maps chat identities to platform users, selects templates by process tier and sequence, enforces 48-hour cooldowns, and returns structured status—serving 25+ operators through reusable sub-workflow architecture.',
    technologies: [
      'n8n',
      'JavaScript',
      'REST APIs',
      'Identity Mapping',
      'Rules Engine',
      'Slack Integration',
      'Template API',
    ],
    businessValue: [
      'Correct template and tone based on workflow variant and follow-up stage',
      '48-hour outreach policy enforced automatically',
      'Prevents duplicate sends when requirements are already satisfied',
    ],
    architecturePreview: 'rules',
    overview:
      'A rules-driven outreach automation that resolves operator identity, evaluates process state and communication history, dynamically selects official templates, validates business guardrails, and delivers compliant stakeholder emails with structured pass/fail responses.',
    challenge: [
      'Document and information collection is one of the highest-friction phases in complex business processes. Operators must identify outstanding requirements, choose correct templates, respect cooldown policies, and log outreach—often under pressure across dozens of active records.',
      'Without guardrails, teams risk spamming stakeholders, sending wrong templates for process variant or stage, or emailing when requirements are already satisfied.',
      'Manual template selection and history checking don\'t scale across large operations teams with mixed roles and responsibilities.',
    ],
    solution: [
      'Built identity resolution mapping chat platform users to CRM identities with role awareness.',
      'Implemented a JavaScript rules engine selecting templates by process tier threshold and outreach sequence.',
      'Enforced two guardrails: skip when no requirements remain, block when 48-hour cooldown hasn\'t elapsed.',
      'Designed clean sub-workflow contract for parent orchestrator integration with structured responses.',
    ],
    myRole: [
      'Architected sub-workflow with explicit input/output contract for orchestrator integration',
      'Built cross-system identity map for 25+ team members with role metadata',
      'Implemented impersonation-based authentication for sender-scoped operations',
      'Developed template resolution engine with tier thresholds and sequence counting',
      'Created communication history analyzer with per-sender interval validation',
      'Built partner-aware sender alias resolution logic',
      'Integrated official template API as single source of truth for email copy',
      'Designed skip/block response paths with human-readable status messages',
    ],
    workflowLogic: [
      'Parent system passes operator identity and record identifier to the outreach engine.',
      'Chat user ID is mapped to platform user ID with role metadata.',
      'System impersonates the operator for authenticated, sender-scoped API access.',
      'Record data, sender aliases, and email history are retrieved.',
      'Rules engine evaluates: outstanding requirements, process tier, and prior email count.',
      'If requirements are complete, workflow exits cleanly without sending.',
      'If 48-hour cooldown hasn\'t passed since last send, workflow blocks with wait time.',
      'Official template is fetched, payload assembled with correct alias and owner CC, email sent.',
      'Structured response returned to parent for Slack formatting.',
    ],
    architectureDiagram: `flowchart TB
    subgraph Input["Input"]
        I1["Operator ID"]
        I2["Record ID"]
    end

    subgraph Identity["Identity Layer"]
        M["User Map"]
        IMP["Impersonation"]
    end

    subgraph Rules["Rules Engine"]
        R1["Requirements Check"]
        R2["Process Tier"]
        R3["Sequence Count"]
        R4["48h Cooldown"]
    end

    subgraph Delivery["Delivery"]
        T["Template API"]
        B["Payload Builder"]
        S["Email Send"]
    end

    I1 & I2 --> M --> IMP
    IMP --> R1
    R1 -->|Pending items| R2 --> R3 --> R4
    R1 -->|Complete| Skip["Skip — No Send"]
    R4 -->|Blocked| Wait["Block — Cooldown"]
    R4 -->|OK| T --> B --> S`,
    integrationDiagram: `flowchart LR
    Slack["Slack Bot"] --> Engine["Follow-Up Engine"]
    Engine --> Auth["Shared Auth"]
    Engine --> Records["Record API"]
    Engine --> History["Communication Logs"]
    Engine --> Templates["Template API"]
    Engine --> Email["Email API"]
    Engine --> Slack`,
    engineeringHighlights: [
      'Business rules encoded in maintainable code, not scattered workflow branches',
      'Official template API ensures content owners own copy, automation owns timing',
      'Clean sub-workflow I/O contract enables modular orchestrator design',
      'Per-sender cooldown prevents spam while allowing multi-operator records',
      'Identity map is pragmatic v1 with clear migration path to external config store',
    ],
    lessonsLearned: [
      'Guardrails should return actionable messages, not silent failures',
      'Template selection logic belongs in one rules module, not duplicated across branches',
      'Communication history filtering by sender ID is critical for accurate sequence counting',
      'Sub-workflows should always return structured status for upstream formatting',
    ],
    impact: [
      { label: 'Time saved per outreach', value: '5–8 min' },
      { label: 'Cooldown policy', value: '48h enforced' },
      { label: 'Template paths', value: '4 dynamic routes' },
      { label: 'Team served', value: '25+ operators' },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
