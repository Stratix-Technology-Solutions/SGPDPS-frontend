import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { validateToken } from '../features/auth/services/auth.service'
import { Header } from '../shared/components/Header'
import { Aside } from '../shared/components/Aside'
import { useExportPortfolioPdf } from '../features/profile/hooks/useExportPortfolioPdf'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuthenticated = await validateToken()

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  }
})

function RouteComponent() {
  const [showAside, setShowAside] = useState(false)
  const { exportPortfolio, isExporting } = useExportPortfolioPdf()

  return (
    <div className="min-h-screen bg-neutral-light/40 pt-20">
      <Header
        showAside={showAside}
        toggleAside={() => setShowAside(v => !v)}
      />

      <Aside
        open={showAside}
        closeAside={() => setShowAside(false)}
        exportPdf={exportPortfolio}
        loading={isExporting}
      />

      <main className="px-4 md:w-11/12 md:px-0 m-auto lg:pl-80">
        <Outlet />
      </main>
    </div>
  )
}
