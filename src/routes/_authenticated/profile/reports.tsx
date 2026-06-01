import { createFileRoute } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ReportsNavigation, type ReportView } from '../../../features/reports/components/ReportsNavegation'
import { ReportProjects } from '../../../features/reports/components/ReportProjects'

export const Route = createFileRoute('/_authenticated/profile/reports')({
  component: RouteComponent,
  validateSearch: (search): { view: ReportView } => ({
    view: search.view === 'projects'
      ? 'projects'
      : 'skills',
  }),
})

function RouteComponent() {
  const { view } = Route.useSearch()

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Reportes"
        description="Genera reportes de la información registrada en tu portafolio."
      />

      <ReportsNavigation
        currentView={view}
      />

      {view === 'skills' && (
        <div>
          Reporte de habilidades
        </div>
      )}

      {view === 'projects' && (
        <ReportProjects />
      )}
    </div>
  )
}
