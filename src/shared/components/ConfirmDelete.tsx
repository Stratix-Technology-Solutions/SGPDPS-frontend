interface Props {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  isPending?: boolean
}
export const ConfirmDelete = ({ title, description, onConfirm, onCancel, isPending = false }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-background-dark mb-2">
          {title}
        </h3>
        <p className="text-neutral-medium mb-6">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            Sí, Eliminar
          </button>
        </div>
      </div>
    </div>

  )
}
