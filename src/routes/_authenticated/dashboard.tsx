import { createFileRoute, Link } from '@tanstack/react-router'
import { sections } from '../../shared/constants/sections'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-center pt-10 pb-8 font-extrabold text-4xl">
        Bienvenid@ a <span className="leading-none tracking-widest">Folio<span className="text-primary">X</span></span>
      </h1>

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
