interface Item {
  id: string | number
}

interface Props<T extends Item> {
  title: string
  items: T[]
  selected: (string | number)[]
  onToggle: (id: string | number) => void
  onSelectAll: () => void
  onClear: () => void
  onSubmit: () => void
  buttonLabel: string
  getLabel: (item: T) => string
}

export const VisibilityColumn = <T extends Item>({
  title,
  items,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  onSubmit,
  buttonLabel,
  getLabel,
}: Props<T>) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {title} ({items.length})
        </h3>
      </div>

      {!!items.length ? (
        <div className="flex gap-4 text-sm mb-4">
          <button
            type="button"
            onClick={onSelectAll}
            className="text-primary hover:text-primary-soft cursor-pointer"
          >
            Marcar todas
          </button>

          <button
            type="button"
            onClick={onClear}
            className="text-neutral-medium cursor-pointer"
          >
            Limpiar
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center text-center pt-2">
          <p className="text-neutral-medium">
            Sin elementos
          </p>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const checked = selected.includes(item.id)

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onToggle(item.id)}
              className={`w-full text-left p-3 rounded-xl border transition cursor-pointer ${
                checked
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-200'
              }`}
            >
              <div className="flex gap-3 items-center">
                <input
                  readOnly
                  checked={checked}
                  type="checkbox"
                />

                <span className="truncate">
                  {getLabel(item)}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <span className="text-sm text-neutral-medium">
            {selected.length} seleccionados
          </span>

          <button
            type="button"
            onClick={onSubmit}
            className="bg-primary text-white rounded-xl py-2 cursor-pointer"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  )
}
