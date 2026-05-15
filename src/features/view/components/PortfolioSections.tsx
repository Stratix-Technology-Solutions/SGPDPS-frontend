import { useState } from 'react'
import {
  FiChevronDown,
} from 'react-icons/fi'
import { PiWarningCircleLight } from 'react-icons/pi'
import { sections } from '../constants/sections'

export const PortfolioSections = () => {
  const [active, setActive] = useState<string>('')

  const toggleSection = (id: string) => {
    setActive((prev) => (prev === id ? '' : id))
  }

  return (
    <section className="rounded-3xl border border-primary/10 bg-white p-4 shadow-sm sm:p-6">
      <div className="space-y-3">
        {sections.map((section) => {
          const Icon = section.icon
          const Content = section.content
          const isOpen = active === section.id

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded-2xl border border-primary/10 bg-white transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-primary/5 cursor-pointer"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/5 text-primary">
                  <Icon className="text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-background-dark">
                    {section.title}
                  </h3>

                  <p className="mt-0.5 text-sm text-neutral-medium">
                    {section.description}
                  </p>
                </div>

                <div className={`flex items-center justify-center text-primary-soft transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <FiChevronDown className="text-lg" />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out
                  ${
                    isOpen
                      ? 'grid-rows-[1fr] border-t border-primary/10'
                      : 'grid-rows-[0fr]'
                  }
                `}
              >

                <div className="overflow-hidden">
                  <div className="bg-primary/5 px-5 py-4">
                    {Content && <Content enabled={section.id === active} />}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>

      <div className="flex items-center justify-center gap-1 flex-wrap mt-4 p-4 bg-primary/10 rounded">
        <PiWarningCircleLight className="w-6 h-6 text-primary" />
        <p className="text-sm leading-relaxed text-center text-primary">
          <span className="font-bold">Nota:</span> Los visitantes solo podran ver las secciones que marques como públicas.
        </p>
      </div>
    </section>
  )
}
