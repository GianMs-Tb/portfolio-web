import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Work', href: '/#projects' },
  { label: 'Stack', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
]

export function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#27272a]/60 bg-[#09090b]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-[#fafafa] transition-colors hover:text-[#818cf8]"
        >
          GMS
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={isHome ? item.href : `/${item.href.replace(/^\//, '')}`}
                className="text-sm text-[#a1a1aa] transition-colors hover:text-[#fafafa]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={isHome ? '#contact' : '/#contact'}
          className="rounded-lg bg-[#6366f1] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#818cf8]"
        >
          Get in touch
        </a>
      </nav>
    </header>
  )
}
