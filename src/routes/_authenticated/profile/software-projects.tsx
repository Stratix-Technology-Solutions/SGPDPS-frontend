import { createFileRoute } from '@tanstack/react-router'
import { ProjectList } from '../../../features/projects/components/ProjectList'

export const Route = createFileRoute('/_authenticated/profile/software-projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6">
      <ProjectList />
    </div>
  )
}
