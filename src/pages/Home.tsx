import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { TechnicalStack } from '../components/TechnicalStack'
import { ProjectCard } from '../components/ProjectCard'
import { Footer } from '../components/Footer'
import { projects } from '../data/projects'

export function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section id="about" className="border-t border-[#27272a] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#6366f1]">
                  About
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#fafafa] md:text-4xl">
                  Gian Marco Saldarriaga
                </h2>
                <p className="mt-2 text-[#71717a]">
                  Automation Engineer · Integration Engineer · Backend Developer · AI Automation Specialist
                </p>
              </div>
              <div className="space-y-4 text-[#a1a1aa] leading-relaxed">
                <p>
                  I design, integrate, debug, and scale production systems that
                  connect collaboration tools, business platforms, and AI
                  services—writing the custom JavaScript, API contracts, and
                  validation logic that make automations reliable at scale.
                </p>
                <p>
                  My hybrid profile spans workflow architecture, REST API
                  integration, backend data transforms, and LLM-assisted
                  routing. I use platforms like n8n and Workato as execution
                  layers—not as substitutes for engineering.
                </p>
                <p>
                  Every system I build follows software engineering principles:
                  modular architecture, explicit contracts, deterministic
                  guardrails, and production-grade error handling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-[#27272a] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-widest text-[#6366f1]">
                Featured Work
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#fafafa] md:text-4xl">
                Selected projects
              </h2>
              <p className="mt-4 text-[#a1a1aa] leading-relaxed">
                Production automation systems built with reusable engineering
                patterns—workflow orchestration, API integration, validation
                engines, and AI-assisted routing.
              </p>
            </div>

            <div className="mt-14 grid gap-8 lg:grid-cols-1">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <TechnicalStack />
        <Footer />
      </main>
    </>
  )
}
