import { FormAcademic } from '../form/FormAcademic'
import { useAcademic } from '../../hooks/useAcademic'
import { Modal } from '../../../../shared/components/Modal'

interface Props {
  onClose: () => void
}

export const ModalAddAcademic = ({ onClose }: Props) => {
  const { create } = useAcademic()

  return (
    <Modal
      title="Crear experiencia académica"
      onClose={onClose}
    >
      <FormAcademic
        onCancel={onClose}
        submitLabel="Guardar"
        onSubmit={(values) => create.mutate(values, { onSuccess: onClose })}
        isPending={create.isPending}
        serverError={create.isError
          ? (create.error?.response?.data?.message ?? 'Ocurrió un error al guardar la experiencia académica')
          : undefined
        }
      />
    </Modal>
  )
}
