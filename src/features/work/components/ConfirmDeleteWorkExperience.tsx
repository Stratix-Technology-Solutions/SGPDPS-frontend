interface Props {
  company: string
  position: string
  isPending: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDeleteWorkExperience = ({
  position,
  isPending,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <>
      <p className="text-neutral-medium/70">
        ¿Estás seguro de que deseas eliminar el cargo{' '}
        <span className="font-semibold text-background-dark">"{position}"</span>{' '}
        ? Esta acción no se puede deshacer.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
        >
          Cancelar
        </button>
        <button
          disabled={isPending}
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Sí, eliminar
        </button>
      </div>
    </>
  )
}
