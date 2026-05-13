import { useDeleteProject } from '../hooks/useProjects'
import { ProjectDetail } from './ProjectDetail'

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

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-xl w-full animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-bold text-background-dark mb-2">
          Eliminar proyecto
        </h3>
        <p className="text-neutral-medium mb-6">
          ¿Estas seguro que deseas eliminar este proyecto? Esta acción no se puede deshacer.
        </p>

        <ProjectDetail
          idProject={idProject}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="px-5 py-2.5 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
          >
            Sí, Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
