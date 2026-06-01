import { socialLinks } from '../data/expertise'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#6366f1]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#111113] px-4 py-1.5 text-xs text-[#a1a1aa]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Available for remote engineering roles
        </div>

        <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          <span className="gradient-text">
            Building intelligent automation systems
          </span>
          <br />
          <span className="text-[#71717a]">that reduce operational complexity.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#a1a1aa] md:text-xl">
          Integration Engineer and Automation Architect building backend-connected
          workflow systems—API orchestration, custom JavaScript logic, AI-assisted
          routing, and production validation for high-growth teams.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-[#6366f1] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#818cf8] hover:shadow-lg hover:shadow-indigo-500/20"
          >
            View featured work
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#111113] px-6 py-3 text-sm font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b]"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#111113] px-6 py-3 text-sm font-medium text-[#fafafa] transition-colors hover:border-[#3f3f46] hover:bg-[#18181b]"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-[#27272a] pt-10 md:grid-cols-4">
          {[
            { value: '4', label: 'Engineering domains' },
            { value: '25+', label: 'Operators served' },
            { value: '40+', label: 'Stack technologies' },
            { value: '100%', label: 'Validation-gated sends' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-semibold tracking-tight text-[#fafafa] md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[#71717a]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
