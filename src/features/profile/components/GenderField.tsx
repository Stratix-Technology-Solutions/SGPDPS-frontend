import { useEffect, useRef, useState } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'

const GENDER_OPTIONS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Prefiero no decir' },
]

export function GenderField({ field }: { field: AnyFieldApi }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedValue = String(field.state.value || '').trim().toLowerCase()
  const selected = GENDER_OPTIONS.find((option) => option.value === selectedValue) ?? null

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      <label className="block text-sm font-medium text-background-dark mb-1.5">Género</label>

      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="group w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary hover:border-primary/60 hover:bg-neutral-100 transition-colors text-left cursor-pointer"
        >
          {selected ? (
            <span className="flex-1 truncate">{selected.label}</span>
          ) : (
            <span className="flex-1 truncate text-neutral-400">Seleccionar género</span>
          )}

          <svg className="w-4 h-4 text-neutral-400 group-hover:text-primary/80 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-neutral-light overflow-hidden">
            <ul className="max-h-52 overflow-y-auto">
              {selected && (
                <>
                  <li>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-background-dark hover:bg-neutral-50 transition-colors"
                      onClick={() => {
                        field.handleChange('')
                        setOpen(false)
                      }}
                    >
                      Quitar selección
                    </button>
                  </li>
                  <li className="px-4 py-1" aria-hidden="true">
                    <div className="border-t border-[#E5E7EB]" />
                  </li>
                </>
              )}

              {GENDER_OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-background-dark hover:bg-neutral-50 transition-colors"
                    onClick={() => {
                      field.handleChange(option.value)
                      setOpen(false)
                    }}
                  >
                    <span className="truncate">{option.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
