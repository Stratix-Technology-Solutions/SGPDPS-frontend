import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { PortfolioSections } from '../../../features/view/components/PortfolioSections'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'

export const Route = createFileRoute(
  '/_authenticated/profile/visibility-settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useGetProfile()

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Configuración de visibilidad"
        description="Elige que secciones de tu portafolio seran visibles para los visitantes."
      />

      {!!data && (
        <Link
          to={`/profile/${(data as any).username}`}
          className="w-full bg-primary text-white flex justify-center items-center py-3 rounded-xl hover:cursor-pointer hover:bg-primary-soft transition-all duration-300"
        >
          Ver perfil
        </Link>
      )}

      <PortfolioSections />
    </div>
  )
}
