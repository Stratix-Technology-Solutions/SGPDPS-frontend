import { useQuery } from '@tanstack/react-query'
import api from '../../../../app/api/axios'
import type { ApiError } from '../../../../shared/interfaces/api.interface'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MdClose, MdSearch } from 'react-icons/md'

interface SkillOption {
    id: number
    name: string
    is_system: boolean
}

interface Props {
    label: string
    value: number[]
    onChange: (value: number[]) => void
}

export const ProjectSkillsPicker = ({ label, value, onChange }: Props) => {
    const { data, isLoading } = useQuery<SkillOption[], ApiError>({
        queryKey: ['skills', 'list-all'],
        queryFn: async () => {
            const res = await api.get('/skills/list-all')
            return res.data
        },
    })

    const [query, setQuery] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [highlight, setHighlight] = useState(0)
    const containerRef = useRef<HTMLDivElement | null>(null)

    const options = data ?? []

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return options
        return options.filter((o) => o.name.toLowerCase().includes(q))
    }, [options, query])

    useEffect(() => {
        if (!isOpen) setHighlight(0)
    }, [isOpen, filtered.length])

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (!containerRef.current) return
            if (!(e.target instanceof Node)) return
            if (!containerRef.current.contains(e.target)) setIsOpen(false)
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    const toggleSelect = (id: number) => {
        if (value.includes(id)) onChange(value.filter((v) => v !== id))
        else onChange([...value, id])
        setQuery('')
        setIsOpen(false)
    }

    const remove = (id: number) => onChange(value.filter((v) => v !== id))

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            setIsOpen(true)
            return
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlight((h) => Math.min(h + 1, filtered.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlight((h) => Math.max(h - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            const item = filtered[highlight]
            if (item) toggleSelect(item.id)
        } else if (e.key === 'Escape') {
            setIsOpen(false)
        }
    }

    return (
        <div ref={containerRef} className="relative">
            <label className="block font-semibold text-background-dark mb-1.5">{label}</label>

            {isLoading && <p className="text-sm text-neutral-medium/70">Cargando tecnologías...</p>}

            {!isLoading && !options.length && (
                <p className="text-sm text-neutral-medium/70">No hay tecnologías disponibles.</p>
            )}

            {!isLoading && options.length > 0 && (
                <div className="rounded-xl border border-neutral-light bg-neutral-50 p-2">
                    <div className="relative">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-neutral-light focus-within:border-primary transition-colors">
                            <MdSearch className="text-neutral-medium" />
                            <input
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
                                onFocus={() => setIsOpen(true)}
                                onKeyDown={onKeyDown}
                                placeholder="Buscar habilidades..."
                                className="w-full outline-none text-sm bg-transparent"
                            />
                        </div>

                        {isOpen && (
                            <div className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-neutral-light rounded-xl z-10">
                                {filtered.length === 0 && (
                                    <div className="p-3 text-sm text-neutral-medium">No se encontraron resultados.</div>
                                )}

                                {filtered.map((opt, idx) => {
                                    const active = idx === highlight
                                    const selected = value.includes(opt.id)
                                    return (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => toggleSelect(opt.id)}
                                            className={`w-full text-left px-3 py-2 hover:bg-neutral-50 transition-colors flex items-center justify-between ${active ? 'bg-neutral-50' : ''}`}
                                        >
                                            <span className="capitalize text-sm">{opt.name}</span>
                                            {selected && <span className="text-xs text-primary">Seleccionado</span>}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {value.map((id) => {
                            const opt = options.find((o) => o.id === id)
                            if (!opt) return null
                            return (
                                <span key={id} className="flex items-center gap-2 px-3 py-1 bg-primary-soft/10 text-primary rounded-full text-sm">
                                    <span className="capitalize">{opt.name}</span>
                                    <button type="button" onClick={() => remove(id)} className="p-0.5 rounded-full hover:bg-primary-soft/20">
                                        <MdClose size={14} />
                                    </button>
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}