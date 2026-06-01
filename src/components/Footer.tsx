import { socialLinks } from '../data/expertise'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[#27272a] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#fafafa]">
              Let's build something
              <span className="gradient-accent"> efficient.</span>
            </h2>
            <p className="mt-4 max-w-md text-[#a1a1aa] leading-relaxed">
              Open to automation engineering, integration engineering, backend
              developer, and AI automation roles—remote or contract.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <a
              href={socialLinks.email}
              className="text-lg font-medium text-[#fafafa] transition-colors hover:text-[#818cf8]"
            >
              hello@gianmarco.dev
            </a>
            <div className="flex gap-4">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#a1a1aa] transition-colors hover:text-[#fafafa]"
              >
                GitHub
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#a1a1aa] transition-colors hover:text-[#fafafa]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#27272a] pt-8 md:flex-row">
          <p className="text-sm text-[#52525b]">
            © {new Date().getFullYear()} Gian Marco Saldarriaga
          </p>
          <p className="text-sm text-[#52525b]">
            Automation Engineer · Integration Engineer · Backend Developer · AI Automation Specialist
          </p>
        </div>
      </div>
    </footer>
  )
}
