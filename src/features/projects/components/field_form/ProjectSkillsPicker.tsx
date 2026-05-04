import { useQuery } from '@tanstack/react-query'
import api from '../../../../app/api/axios'
import type { ApiError } from '../../../../shared/interfaces/api.interface'

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
            const res = await api.get('/skills/')
            return res.data.data
        },
    })

    return (
        <div>
            <label className="block font-semibold text-background-dark mb-1.5">{label}</label>

            {isLoading && <p className="text-sm text-neutral-medium/70">Cargando habilidades...</p>}

            {!isLoading && !data?.length && (
                <p className="text-sm text-neutral-medium/70">No hay habilidades disponibles.</p>
            )}

            <div className="flex flex-col gap-1 sm:grid-cols-2 lg:grid-cols-3 rounded-xl border border-neutral-light bg-neutral-50 p-3 max-h-64 overflow-y-auto">
                {data?.map((skill) => {
                    const checked = value.includes(skill.id)

                    return (
                        <label
                            key={skill.id}
                            className={`flex  items-center gap-3 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${checked
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-neutral-light bg-white text-background-dark hover:border-primary'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={(event) => {
                                    if (event.target.checked) {
                                        onChange([...value, skill.id])
                                        return
                                    }

                                    onChange(value.filter((id) => id !== skill.id))
                                }}
                                className="h-4 w-4 rounded border-neutral-medium text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium capitalize">{skill.name}</span>
                        </label>
                    )
                })}
            </div>

        </div>
    )
}