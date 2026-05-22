import { Link } from '@tanstack/react-router'

export const Navbar = () => {
  return (
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-primary">
          FOLIO<span className="text-primary-soft">X</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-medium text-background-dark hover:text-primary-soft transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/register"
            className="group relative overflow-hidden bg-primary-soft text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-primary-soft/20 transition-all duration-200 hover:brightness-110 hover:shadow-md hover:shadow-primary-soft/30 active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            Registrate
          </Link>
        </div>
      </div>
    </nav>
  )
}
