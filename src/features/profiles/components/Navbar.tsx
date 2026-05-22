import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { validateToken } from '../../auth/services/auth.service'

export const Navbar = () => {
  const { data: isAuthenticated } = useQuery({
    queryKey: ['validate-token'],
    queryFn: validateToken,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <nav className="w-full border-b border-neutral-200 bg-white sticky top-0 z-20">
      <div className="max-w-7xl mx-auto min-h-20 px-6 flex py-4 items-center justify-between flex-wrap gap-2">
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          className="flex items-center gap-3"
        >
          <img
            src="/logo.svg"
            alt="logo FolioX"
            className="w-11 md:w-12"
          />

          <span className="text-2xl md:text-3xl font-semibold leading-none tracking-widest text-background-dark">
            FOLIO
            <span className="text-primary text-3xl md:text-4xl">
              X
            </span>
          </span>
        </Link>

        {!isAuthenticated && (
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="text-sm font-medium text-background-dark hover:text-primary-soft transition-colors"
            >
              Iniciar Sesión
            </Link>

            <Link
              to="/register"
              className="bg-primary-soft hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              Registrate
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
