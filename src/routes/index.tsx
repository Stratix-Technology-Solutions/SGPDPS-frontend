import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { validateToken } from '../features/auth/services/auth.service'

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
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-[url('/images/banner.jpeg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#2D3746]/70" />

      <div className="relative z-10 h-full flex flex-col text-white p-8">

        <div className="w-full flex flex-col items-center gap-8 lg:grid lg:grid-cols-3 lg:items-center">
          <img
            src="/logo.svg"
            alt="logo FolioX"
            className="w-32 aspect-square lg:justify-self-start"
          />

          <div className="flex flex-col text-neutral-light text-center lg:text-3xl">
            <span>Crea y gestiona tu</span>
            <span>portafolio profesional</span>
          </div>

          <div className="hidden lg:block" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-14 lg:gap-24">
          <h2 className="font-extrabold text-4xl tracking-widest lg:text-6xl">
            FOLIO
            <span className="text-primary-soft">X</span>
          </h2>

          <div className="flex flex-col items-center justify-center gap-8">
            <span className="text-center font-semibold lg:text-4xl">
              Empieza a crear tu portafolio hoy
            </span>

            <div className="w-full flex justify-center flex-wrap gap-10 lg:text-xl">
              <Link to="/login" className="bg-primary-soft py-2 px-4 rounded">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-primary-soft py-2 px-4 rounded">
                Registrate
              </Link>
            </div>
          </div>

          <p className="text-center lg:text-4xl lg:font-medium max-w-6xl">
            Esta es una web para que puedas crear tu portafolio personal y poder mostrar todas las habilidades que tengas.
          </p>
        </div>

      </div>
    </div>
  )
}
