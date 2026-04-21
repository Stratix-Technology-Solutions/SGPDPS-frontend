import { createFileRoute } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { MenuSection } from '../../../features/work/components/MenuSection'

export const Route = createFileRoute(
  '/_authenticated/profile/LaboralExperience',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Experiencia laboral"
        description="Registra y gestiona tu historial de empleos para mostrarlos en tu portafolio."
      />

      <MenuSection />
    </div>
  )
}
