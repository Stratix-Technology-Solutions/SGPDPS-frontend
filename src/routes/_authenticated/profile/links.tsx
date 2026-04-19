import { createFileRoute } from '@tanstack/react-router'
import { LinkSection } from '../../../features/links/components/LinkSection'

export const Route = createFileRoute('/_authenticated/profile/links')({
  component: RouteComponent,
})


function RouteComponent() {
  return (
    <div className="py-10 flex flex-col gap-6">
      <div className="pl-4">
        <h1 className="text-2xl font-bold text-background-dark">Enlaces públicos</h1>
        <p className="text-sm text-neutral-medium/70">
          Gestiona los enlaces que aparecerán en tu portafolio.
        </p>
      </div>

      <LinkSection />
    </div>
  )
}
