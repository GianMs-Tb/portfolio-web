import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
  title?: string
}

let mermaidInitialized = false

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          darkMode: true,
          background: '#111113',
          primaryColor: '#6366f1',
          primaryTextColor: '#fafafa',
          primaryBorderColor: '#3f3f46',
          lineColor: '#52525b',
          secondaryColor: '#18181b',
          tertiaryColor: '#111113',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
        },
        flowchart: {
          curve: 'basis',
          padding: 16,
        },
      })
      mermaidInitialized = true
    }

    const render = async () => {
      if (!containerRef.current) return
      const id = `mermaid-${Math.random().toString(36).slice(2)}`
      try {
        const { svg } = await mermaid.render(id, chart)
        containerRef.current.innerHTML = svg
      } catch {
        containerRef.current.innerHTML =
          '<p class="text-sm text-[#71717a] p-4">Diagram rendering unavailable.</p>'
      }
    }

    render()
  }, [chart])

  return (
    <div className="overflow-hidden rounded-xl border border-[#27272a] bg-[#111113]">
      {title && (
        <div className="border-b border-[#27272a] px-5 py-3">
          <p className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
            {title}
          </p>
        </div>
      )}
      <div ref={containerRef} className="mermaid overflow-x-auto p-6" />
    </div>
  )
}
