import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ReportsNavigation, type ReportView } from '../../../features/reports/components/ReportsNavegation'
import { ReportProjects } from '../../../features/reports/components/ReportProjects'

export const Route = createFileRoute('/_authenticated/profile/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  const [view, setView] = useState<ReportView>('skills')

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Reportes"
        description="Genera reportes de la información registrada en tu portafolio."
      />

      <ReportsNavigation
        currentView={view}
        onChange={setView}
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
