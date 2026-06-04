import { Link } from '@tanstack/react-router'
import { sections } from '../constants/sections'
import { FiChevronRight, FiLoader, FiDownload } from 'react-icons/fi'

interface Props {
  open: boolean
  closeAside: () => void
  exportPdf: () => void
  loading: boolean
}

export const Aside = ({ open, closeAside, exportPdf, loading }: Props) => {
  return (
    <aside className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-full lg:w-xs bg-white/95 backdrop-blur-xl border-r border-neutral-200 z-40 transform transition-all duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="px-6 pt-8 pb-4 border-b border-neutral-100">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/15 blur-2xl rounded-full" />

            <img
              src="/logo.svg"
              className="relative w-24 aspect-square drop-shadow-sm"
              alt="logo FolioX"
            />
          </div>

          <div className="text-center">
            <h2 className="font-bold text-lg text-background-dark">
              FolioX
            </h2>

            <p className="text-sm text-neutral-medium">
              Panel profesional
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`flex items-center gap-2 bg-primary text-white py-2 px-4 rounded-xl hover:bg-primary-soft transition-all duration-200 shadow-sm hover:shadow-md ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              onClick={() => exportPdf()}
            >
              {loading ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>Exportando...</span>
                </>
              ) : (
                <>
                  <FiDownload className="w-4 h-4" />
                  <span>Exportar PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full overflow-y-auto px-4 py-5">
        <nav className="flex flex-col gap-1">
          <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-neutral-medium">
            Navegación
          </p>

          {sections.map(({ label, to, Icon }) => (
            <Link
              key={label}
              to={to}
              onClick={closeAside}
              activeOptions={{
                exact: true,
              }}
              className="group relative overflow-hidden flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200"
              activeProps={{
                className: `bg-primary text-white shadow-md shadow-primary/15`,
              }}
              inactiveProps={{
                className: `text-background-dark hover:bg-neutral-100`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-linear-to-r from-primary/5 to-transparent transition-opacity" />

              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <Icon className="w-4.5 h-4.5" />
              </div>

              <span className="relative font-medium">
                {label}
              </span>

              <FiChevronRight className="ml-auto w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 " />
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
