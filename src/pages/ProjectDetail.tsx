import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { MermaidDiagram } from '../components/MermaidDiagram'
import { getProject } from '../data/projects'

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#fafafa]">Project not found</h1>
            <Link to="/" className="mt-4 inline-block text-[#818cf8] hover:underline">
              Back to home
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="border-b border-[#27272a] py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm text-[#71717a] transition-colors hover:text-[#a1a1aa]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All projects
            </Link>

            <p className="mt-8 text-sm font-medium uppercase tracking-widest text-[#6366f1]">
              Case Study
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#fafafa] md:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 text-xl text-[#71717a]">{project.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-[#27272a] bg-[#111113] px-3 py-1.5 text-xs font-medium text-[#a1a1aa]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {project.impact.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#27272a] bg-[#111113] p-4"
                >
                  <div className="text-lg font-semibold text-[#818cf8]">{item.value}</div>
                  <div className="mt-1 text-xs text-[#71717a]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content sections */}
        <div className="mx-auto max-w-4xl px-6 py-16 space-y-20">
          <Section title="Project Overview">
            <p>{project.overview}</p>
          </Section>

          <Section title="Business Challenge">
            {project.challenge.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section title="Solution">
            {project.solution.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Section>

          <Section title="My Role" highlight>
            <p className="mb-4 text-[#a1a1aa]">
              End-to-end ownership from architecture through production deployment.
            </p>
            <ul>
              {project.myRole.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Workflow Logic">
            <p className="mb-4">
              Process flow described in business terms—no implementation trivia.
            </p>
            <ol className="space-y-4">
              {project.workflowLogic.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6366f1]/15 text-xs font-semibold text-[#818cf8]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[#a1a1aa] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          <div>
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[#fafafa]">
              Technical Architecture
            </h2>
            <div className="space-y-6">
              <MermaidDiagram chart={project.architectureDiagram} title="System Architecture" />
              <MermaidDiagram chart={project.integrationDiagram} title="Integration Map" />
            </div>
          </div>

          <Section title="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-[#6366f1]/10 px-4 py-2 text-sm font-medium text-[#818cf8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Section>

          <Section title="Business Impact">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.impact.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#27272a] bg-[#111113] p-5"
                >
                  <div className="text-2xl font-semibold text-[#fafafa]">{item.value}</div>
                  <div className="mt-1 text-sm text-[#71717a]">{item.label}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Engineering Highlights">
            <ul>
              {project.engineeringHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Lessons Learned">
            <ul>
              {project.lessonsLearned.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        </div>

        {/* CTA */}
        <section className="border-t border-[#27272a] py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-2xl font-semibold text-[#fafafa]">
              Interested in similar systems?
            </h2>
            <p className="mt-3 text-[#a1a1aa]">
              I build production automation infrastructure for operations teams.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/#contact"
                className="rounded-lg bg-[#6366f1] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#818cf8]"
              >
                Get in touch
              </a>
              <Link
                to="/#projects"
                className="rounded-lg border border-[#27272a] px-6 py-3 text-sm font-medium text-[#fafafa] transition-colors hover:bg-[#18181b]"
              >
                View all projects
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

function Section({
  title,
  children,
  highlight,
}: {
  title: string
  children: ReactNode
  highlight?: boolean
}) {
  return (
    <section
      className={`prose-section ${highlight ? 'rounded-2xl border border-[#6366f1]/20 bg-[#6366f1]/5 p-8' : ''}`}
    >
      <h2>{title}</h2>
      {children}
    </section>
  )
}
