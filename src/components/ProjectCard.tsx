import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { ArchitecturePreview } from './ArchitecturePreview'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group glow overflow-hidden rounded-2xl border border-[#27272a] bg-[#111113] transition-all hover:border-[#3f3f46]">
      <div className="aspect-[16/10] overflow-hidden border-b border-[#27272a] bg-[#09090b]">
        <ArchitecturePreview type={project.architecturePreview} index={index} />
      </div>

      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#6366f1]">
              Case Study 0{index + 1}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#fafafa]">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-[#71717a]">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#a1a1aa]">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-[#6366f1]/10 px-2.5 py-1 text-xs font-medium text-[#818cf8]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-[#27272a] pt-6">
          <p className="text-xs font-medium uppercase tracking-wider text-[#71717a]">
            Business value
          </p>
          <ul className="mt-3 space-y-2">
            {project.businessValue.map((value) => (
              <li key={value} className="flex items-start gap-2 text-sm text-[#a1a1aa]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                {value}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to={`/projects/${project.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#818cf8] transition-colors hover:text-[#a5b4fc]"
        >
          View case study
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
