import { createFileRoute } from '@tanstack/react-router'
import { LinkSection } from '../../../features/links/components/LinkSection'
import { SectionTitle } from '../../../shared/components/SectionTitle'

export const Route = createFileRoute('/_authenticated/profile/links')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Enlaces Públicos"
        description="Gestiona los enlaces que aparecerán en tu portafolio."
      />

      <LinkSection />
    </div>
  )
}
