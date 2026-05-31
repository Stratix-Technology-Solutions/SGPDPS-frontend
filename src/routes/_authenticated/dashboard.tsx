import { createFileRoute, Link } from '@tanstack/react-router'
import { FiDownload } from 'react-icons/fi'
import { useExportPortfolioPdf } from '../../features/profile/hooks/useExportPortfolioPdf'
import { sections } from '../../shared/constants/sections'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { exportPortfolio, isExporting, error } = useExportPortfolioPdf()

  return (
    <div className="py-10 flex flex-col gap-8">
      <section className="rounded-3xl border border-primary/10 bg-white px-5 py-6 shadow-sm sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold text-background-dark sm:text-4xl">
              Bienvenid@ a <span className="leading-none tracking-widest">Folio<span className="text-primary">X</span></span>
            </h1>
          </div>

          <button
            type="button"
            onClick={() => { exportPortfolio() }}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition-all hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiDownload size={18} />
            <span>{isExporting ? 'Generando PDF...' : 'Exportar PDF'}</span>
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, index) => {
          const Icon = section.Icon;

          return (
            <Link
              key={index}
              to={section.to}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-100 p-3 group-hover:bg-blue-100 transition">
                  <Icon className="h-6 w-6 text-gray-700 group-hover:text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {section.label}
                </h3>
              </div>

              {section.description && (
                <p className="text-gray-500">
                  {section.description}
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
