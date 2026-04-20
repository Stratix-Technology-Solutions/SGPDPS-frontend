import { FormAcademic } from '../form/FormAcademic'
import { useAcademic } from '../../hooks/useAcademic'

interface Props {
  onClose: () => void
}

export const ModalAddAcademic = ({ onClose }: Props) => {
  const { create } = useAcademic()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-background-dark">Crear experiencia académica</h2>
        <FormAcademic
          onCancel={onClose}
          submitLabel="Guardar"
          onSubmit={(values) => create.mutate(values, { onSuccess: onClose })}
          isPending={create.isPending}
          serverError={create.isError ? (create.error?.response?.data?.message ?? 'Ocurrió un error al guardar la experiencia académica') : undefined}
        />
      </div>
    </div>
  )
}
