import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { validateToken } from '../features/auth/services/auth.service'
import { FiArrowRight } from 'react-icons/fi'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuthenticated = await validateToken()
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
})

function RouteComponent() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/banner.jpeg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#2D3746]/75" />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/50" />

      <div className="relative z-10 h-full flex flex-col text-white px-6 py-8 lg:px-12">
        <div className="w-full flex flex-col items-center gap-6 lg:grid lg:grid-cols-3 lg:items-center">
          <img
            src="/logo.svg"
            alt="logo FolioX"
            className="w-32 aspect-square lg:justify-self-start drop-shadow-lg"
          />
          <div className="flex flex-col text-white/80 text-center text-lg tracking-wide lg:text-3xl lg:leading-relaxed">
            <span>Crea y gestiona tu</span>
            <span>portafolio profesional</span>
          </div>
          <div className="hidden lg:block" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 lg:gap-10">
          <h1 className="font-extrabold text-7xl tracking-[0.2em] lg:text-9xl drop-shadow-xl">
            FOLIO
            <span className="text-primary-soft relative">
              X
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-primary-soft/60 blur-sm rounded-full" />
            </span>
          </h1>

          <div className="flex flex-col items-center gap-8 w-full max-w-md lg:max-w-3xl">
            <span className="text-center font-bold text-3xl leading-tight text-white lg:text-4xl">
              Empieza a crear tu portafolio hoy
            </span>

            <div className="flex justify-center flex-wrap gap-4 w-full lg:gap-5">
              <Link
                to="/login"
                className="group relative overflow-hidden bg-primary-soft text-white py-2.5 px-8 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-primary-soft/30 transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-primary-soft/40 hover:scale-[1.03] active:scale-[0.98] lg:py-3 lg:px-12 lg:text-lg"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                Iniciar Sesión
              </Link>

              <Link
                to="/register"
                className="group relative overflow-hidden bg-primary-soft text-white py-2.5 px-8 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-primary-soft/30 transition-all duration-200 hover:brightness-110 hover:shadow-xl hover:shadow-primary-soft/40 hover:scale-[1.03] active:scale-[0.98] lg:py-3 lg:px-12 lg:text-lg"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                Registrate
              </Link>
            </div>
          </div>

          <p className="text-center text-lg text-white/75 leading-relaxed max-w-sm lg:text-3xl lg:max-w-5xl lg:font-medium lg:leading-relaxed">
            Tu espacio para mostrar quién eres y todo lo que sabes hacer. Construye un portafolio profesional, compártelo con el mundo y abre puertas a nuevas oportunidades.
          </p>

          <Link
            to="/profiles"
            className="group relative overflow-hidden bg-white text-neutral-medium py-2.5 px-8 rounded-xl font-semibold text-sm tracking-wide shadow-lg shadow-black/20 flex items-center gap-2 transition-all duration-200 hover:bg-white/90 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] lg:py-3 lg:px-12 lg:text-lg"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-black/5 to-transparent skew-x-12" />
            Explorar perfiles
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
