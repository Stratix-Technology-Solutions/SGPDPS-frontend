export interface ProjectLinkInput {
    id: number
    url: string
}

interface Props {
    label: string
    value: ProjectLinkInput[]
    onChange: (value: ProjectLinkInput[]) => void
}

export const ProjectLinksEditor = ({ label, value, onChange }: Props) => {
    return (
        <div>
            <label className="block font-semibold text-background-dark mb-1.5">{label}</label>

            <div className="flex flex-col gap-3 rounded-xl border border-neutral-light bg-neutral-50 p-3 focus-within:border-primary transition-colors">
                {value.map((link, index) => (
                    <div key={link.id} className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-2 items-center">
                        <span className="text-xs font-semibold text-neutral-medium bg-white border border-neutral-light rounded-lg px-3 py-2 whitespace-nowrap">
                            Enlace {index + 1}
                        </span>
                        <input
                            type="url"
                            value={link.url}
                            onChange={(event) => {
                                const nextValue = [...value]
                                nextValue[index] = { ...link, url: event.target.value }
                                onChange(nextValue)
                            }}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-white text-background-dark outline-none focus:border-primary transition-colors"
                        />
                    </div>
                ))}

                {!value.length && (
                    <p className="text-sm text-neutral-medium/70">No hay enlaces para editar.</p>
                )}
            </div>

        </div>
    )
}