import { user } from '../constants/user'

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-primary/10">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-xs text-primary font-medium tracking-widest uppercase">
          {user.username}.dev
        </span>
        <div className="flex gap-6 text-xs font-medium text-neutral-medium">
          {["skills", "experience", "projects", "education"].map((s) => (
            <a key={s} href={`#${s}`} className="hover:text-primary transition-colors capitalize">
              {s}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
