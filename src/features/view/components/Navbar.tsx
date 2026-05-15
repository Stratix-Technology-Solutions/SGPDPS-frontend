export const Navbar = () => {
  const sections = [
    { label: 'Sobre mí', to: 'about' },
    { label: 'Habilidades', to: 'skills' },
    { label: 'Experiencia', to: 'experience' },
    { label: 'Proyectos', to: 'projects' },
    { label: 'Educación', to: 'education' },
    { label: 'Contacto', to: 'contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/10 bg-white/80 backdrop-blur-xl">
      <div className="scrollbar-none mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:gap-6 sm:px-6">
        {sections.map((section) => (
          <a
            key={section.to}
            href={`#${section.to}`}
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-neutral-medium transition-all duration-200 hover:bg-primary/5 hover:text-primary active:scale-95"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
