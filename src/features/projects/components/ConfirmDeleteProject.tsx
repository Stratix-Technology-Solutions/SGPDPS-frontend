import { ConfirmDelete } from '../../../shared/components/ConfirmDelete'
import { useDeleteProject } from '../hooks/useProjects'

interface Props {
  isOpen: boolean
  onClose: () => void
  idProject: string
}

export const ConfirmDeleteProject = ({ isOpen, onClose, idProject }: Props) => {
  const { mutate: remove, isPending } = useDeleteProject()

  const handleDelete = () => {
    remove(idProject, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  if (!isOpen) return null;

  return (
    <ConfirmDelete
      title='Eliminar proyecto'
      description='¿Estas seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer.'
      onConfirm={handleDelete}
      onCancel={onClose}
      isPending={isPending}
    />
  )
}
