import { createFileRoute } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { PortfolioSections } from '../../../features/view/components/PortfolioSections'

export const Route = createFileRoute(
  '/_authenticated/profile/visibility-settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Configuración de visibilidad"
        description="Elige que secciones de tu portafolio seran visibles para los visitantes."
      />

      <PortfolioSections />
    </div>
  )
}
