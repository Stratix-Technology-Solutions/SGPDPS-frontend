import { Modal } from '../../../shared/components/Modal'
import { useProjects } from '../hooks/useProjects'

interface Props {
  isOpen: boolean
  onClose: () => void
  projectId: string
}

export const ConfirmDeleteProject = ({ isOpen, onClose, projectId }: Props) => {
  const { remove } = useProjects()

  const handleDelete = () => {
    remove.mutate(projectId, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} title="Eliminar proyecto">
      <div className="p-4 md:p-6 lg:p-8 bg-white text-center">
        <h3 className="text-lg font-bold text-background-dark mb-4">¿Estás seguro de eliminar este proyecto?</h3>
        <p className="text-neutral-medium mb-8">Esta acción no se puede deshacer.</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onClose}
            disabled={remove.isPending}
            className="px-6 py-2.5 rounded-xl font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            disabled={remove.isPending}
            className="px-6 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            {remove.isPending ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
