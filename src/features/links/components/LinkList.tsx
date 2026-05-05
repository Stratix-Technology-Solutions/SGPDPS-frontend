import type { LinkResponse } from '../interfaces/link.interface'

interface Props {
    data: LinkResponse[] | undefined
    isLoading: boolean
    onSelect: (item: LinkResponse) => void
    itemClassName?: string
}

export const LinkList = ({
    data,
    isLoading,
    onSelect,
    itemClassName,
}: Props) => {
    const visibleLinks = data?.filter((item) => item.url.trim().length > 0) ?? []

    return (
        <>
            {isLoading && (
                <p className="text-neutral-medium/70 text-sm">Cargando...</p>
            )}

            {!isLoading && !visibleLinks.length && (
                <p className="text-neutral-medium/70 text-sm">
                    No hay enlaces registrados.
                </p>
            )}

            <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {visibleLinks.map((item) => (
                    <li key={item.id}>
                        <button
                            onClick={() => onSelect(item)}
                            className={`w-full text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer ${itemClassName ?? 'hover:border-primary hover:bg-neutral-50'}`}
                        >
                            <p className="text-sm text-background-dark truncate">
                                {item.url}
                            </p>
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
