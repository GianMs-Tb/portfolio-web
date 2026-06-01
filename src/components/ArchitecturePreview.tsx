interface ArchitecturePreviewProps {
  type: string
  index: number
}

export function ArchitecturePreview({ type, index }: ArchitecturePreviewProps) {
  const accents = ['#6366f1', '#818cf8', '#a5b4fc']
  const accent = accents[index % accents.length]

  if (type === 'orchestrator') {
    return (
      <svg viewBox="0 0 640 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="640" height="400" fill="#09090b" />
        <rect x="240" y="40" width="160" height="48" rx="8" fill={accent} fillOpacity="0.15" stroke={accent} strokeOpacity="0.4" />
        <text x="320" y="70" textAnchor="middle" fill="#a1a1aa" fontSize="12" fontFamily="Inter, sans-serif">AI Router</text>
        <line x1="320" y1="88" x2="320" y2="120" stroke="#27272a" strokeWidth="2" />
        <rect x="260" y="120" width="120" height="40" rx="6" fill="#111113" stroke="#27272a" />
        <text x="320" y="145" textAnchor="middle" fill="#71717a" fontSize="11" fontFamily="Inter, sans-serif">Validator</text>
        <line x1="320" y1="160" x2="320" y2="190" stroke="#27272a" strokeWidth="2" />
        <line x1="120" y1="190" x2="520" y2="190" stroke="#27272a" strokeWidth="2" />
        {[120, 240, 360, 480].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="190" x2={x} y2="220" stroke="#27272a" strokeWidth="2" />
            <rect x={x - 50} y="220" width="100" height="36" rx="6" fill={`url(#grad-${index})`} stroke={accent} strokeOpacity="0.3" />
            <text x={x} y="242" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="Inter, sans-serif">
              {['Status', 'Outreach', 'Document', 'Score'][i]}
            </text>
            <line x1={x} y1="256" x2={x} y2="290" stroke="#27272a" strokeWidth="2" />
          </g>
        ))}
        <rect x="200" y="290" width="240" height="40" rx="6" fill="#111113" stroke="#27272a" />
        <text x="320" y="315" textAnchor="middle" fill="#71717a" fontSize="11" fontFamily="Inter, sans-serif">Platform API</text>
        <rect x="40" y="360" width="80" height="28" rx="4" fill="#111113" stroke="#27272a" />
        <text x="80" y="379" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">Slack</text>
        <rect x="520" y="360" width="80" height="28" rx="4" fill="#111113" stroke="#27272a" />
        <text x="560" y="379" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">Gmail</text>
      </svg>
    )
  }

  if (type === 'pipeline') {
    return (
      <svg viewBox="0 0 640 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#09090b" />
        {[80, 200, 320, 440, 560].map((x, i) => (
          <g key={i}>
            <rect x={x - 40} y="160" width="80" height="80" rx="8" fill="#111113" stroke={i === 2 ? accent : '#27272a'} strokeWidth={i === 2 ? 2 : 1} />
            <text x={x} y="208" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="Inter, sans-serif">
              {['Auth', 'Data', 'Validate', 'Encrypt', 'Send'][i]}
            </text>
            {i < 4 && (
              <line x1={x + 40} y1="200" x2={x + 120} y2="200" stroke="#27272a" strokeWidth="2" markerEnd="url(#arrow)" />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#52525b" />
          </marker>
        </defs>
        <rect x="240" y="60" width="160" height="48" rx="8" fill={accent} fillOpacity="0.1" stroke={accent} strokeOpacity="0.3" />
        <text x="320" y="90" textAnchor="middle" fill="#818cf8" fontSize="12" fontFamily="Inter, sans-serif">Document Pipeline</text>
        <line x1="320" y1="108" x2="320" y2="160" stroke="#27272a" strokeWidth="2" strokeDasharray="4" />
        <rect x="260" y="300" width="120" height="32" rx="6" fill="#111113" stroke="#27272a" />
        <text x="320" y="321" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">Audit Log</text>
        <line x1="320" y1="240" x2="320" y2="300" stroke="#27272a" strokeWidth="2" strokeDasharray="4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="640" height="400" fill="#09090b" />
      <rect x="260" y="30" width="120" height="40" rx="8" fill="#111113" stroke="#27272a" />
      <text x="320" y="55" textAnchor="middle" fill="#71717a" fontSize="11" fontFamily="Inter, sans-serif">Identity Map</text>
      <line x1="320" y1="70" x2="320" y2="100" stroke="#27272a" strokeWidth="2" />
      <rect x="220" y="100" width="200" height="60" rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeOpacity="0.4" />
      <text x="320" y="125" textAnchor="middle" fill="#818cf8" fontSize="12" fontFamily="Inter, sans-serif">Rules Engine</text>
      <text x="320" y="145" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">Amount · Sequence · Cooldown</text>
      <line x1="180" y1="160" x2="180" y2="200" stroke="#27272a" strokeWidth="2" />
      <line x1="460" y1="160" x2="460" y2="200" stroke="#27272a" strokeWidth="2" />
      <line x1="320" y1="160" x2="320" y2="200" stroke="#27272a" strokeWidth="2" />
      <rect x="130" y="200" width="100" height="40" rx="6" fill="#111113" stroke="#27272a" />
      <text x="180" y="225" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">Skip</text>
      <rect x="270" y="200" width="100" height="40" rx="6" fill="#111113" stroke="#27272a" />
      <text x="320" y="225" textAnchor="middle" fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif">Block</text>
      <rect x="410" y="200" width="100" height="40" rx="6" fill="#111113" stroke={accent} strokeOpacity="0.4" />
      <text x="460" y="225" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="Inter, sans-serif">Send</text>
      <line x1="460" y1="240" x2="460" y2="280" stroke="#27272a" strokeWidth="2" />
      <rect x="380" y="280" width="160" height="40" rx="6" fill="#111113" stroke="#27272a" />
      <text x="460" y="305" textAnchor="middle" fill="#71717a" fontSize="11" fontFamily="Inter, sans-serif">Template API</text>
    </svg>
  )
}
