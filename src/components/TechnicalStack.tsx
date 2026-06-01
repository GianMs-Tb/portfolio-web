import {
  skillDomains,
  profileRoles,
  engineeringCompetencies,
  projectSkillMap,
} from '../data/expertise'

const projectLabels: Record<string, string> = {
  'ai-operations-assistant': 'AI Copilot',
  'secure-document-delivery': 'Document Pipeline',
  'intelligent-followup-engine': 'Follow-Up Engine',
}

export function TechnicalStack() {
  return (
    <section id="skills" className="border-t border-[#27272a] py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#6366f1]">
            Technical Stack & Expertise
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#fafafa] md:text-4xl">
            Hybrid engineering profile
          </h2>
          <p className="mt-4 text-[#a1a1aa] leading-relaxed">
            I build production systems at the intersection of automation, backend
            logic, API integration, and AI—not as a no-code operator, but as an
            engineer who designs, integrates, debugs, and scales backend-connected
            workflows.
          </p>
        </div>

        {/* Profile roles */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {profileRoles.map((role, i) => (
            <div
              key={role.title}
              className="rounded-xl border border-[#27272a] bg-[#111113] p-5"
            >
              <span className="text-xs font-medium text-[#52525b]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-sm font-semibold text-[#fafafa]">
                {role.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#71717a]">
                {role.emphasis}
              </p>
            </div>
          ))}
        </div>

        {/* Skill domains — ordered by market demand */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-semibold text-[#fafafa]">
              Skills hierarchy
            </h3>
            <p className="text-xs text-[#52525b]">
              Ordered by market demand ·{' '}
              <span className="text-emerald-400/80">●</span> demonstrated in portfolio
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {skillDomains.map((domain) => (
              <div
                key={domain.id}
                className="rounded-xl border border-[#27272a] bg-[#111113] overflow-hidden"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#27272a] px-6 py-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6366f1]/15 text-xs font-bold text-[#818cf8]">
                        {domain.rank}
                      </span>
                      <h4 className="text-base font-semibold text-[#fafafa]">
                        {domain.name}
                      </h4>
                    </div>
                    <p className="mt-1 pl-10 text-sm text-[#71717a]">
                      {domain.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 px-6 py-5">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                        skill.demonstrated
                          ? 'border-[#6366f1]/30 bg-[#6366f1]/10 text-[#a5b4fc]'
                          : 'border-[#27272a] bg-[#18181b] text-[#71717a]'
                      }`}
                      title={
                        skill.projects?.length
                          ? `Featured in: ${skill.projects.map((p) => projectLabels[p] ?? p).join(', ')}`
                          : 'Part of professional stack'
                      }
                    >
                      {skill.demonstrated && (
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      )}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineering competencies */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-[#fafafa]">
            Engineering competencies
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[#71717a]">
            Cross-cutting capabilities demonstrated across all featured projects.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringCompetencies.map((comp) => (
              <div
                key={comp.name}
                className="rounded-xl border border-[#27272a] bg-[#111113] p-5"
              >
                <h4 className="text-sm font-semibold text-[#fafafa]">
                  {comp.name}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#71717a]">
                  {comp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Project → skills matrix */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-[#fafafa]">
            Skills by project
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[#71717a]">
            Engineering capabilities inferred from production case studies.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {projectSkillMap.map((project) => (
              <div
                key={project.slug}
                className="rounded-xl border border-[#27272a] bg-[#111113] p-6"
              >
                <h4 className="text-sm font-semibold text-[#818cf8]">
                  {project.name}
                </h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[#18181b] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#52525b]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-4 space-y-2">
                  {project.primarySkills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-2 text-xs text-[#a1a1aa]"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#6366f1]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
