import { useState } from 'react'
import { Modal } from '../../../../shared/components/Modal'
import type { ProjectIdTitle } from '../../interfaces/project.interface'
import { useGetProject } from '../../hooks/useProjectAssets'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { ButtonLoader } from '../../../../shared/components/ButtonLoader'
import { ProjectSelectionModal } from '../ProjectSelectionModal'
import { useProjectCategories } from '../../hooks/useProjectCategories'
import { useCreateProjectCategory } from '../../hooks/useCreateProjectCategory'
import { useGetProjectCategories } from '../../hooks/useGetProjectCategories'

interface Props {
  onClose: () => void
}

export const ModalAddProjectCategory = ({ onClose }: Props) => {
  const [selectedProject, setSelectedProject] = useState<ProjectIdTitle | null>(null)
  const [categoryId, setCategoryId] = useState<number>(-1)

  const { data: projects, isLoading: projectsLoading } = useGetProject()
  const { data: categories, isLoading: categoriesLoading } = useProjectCategories()
  const { mutate, isPending, isError, error } = useCreateProjectCategory()
  const { data, isLoading } = useGetProjectCategories(selectedProject?.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!categoryId) return

    mutate({
      projectId: selectedProject?.id ?? '',
      categoryId,
    })
  }

  if (!selectedProject) {
    return (
      <ProjectSelectionModal
        title="Selecciona un proyecto para categorizar"
        onClose={onClose}
        projects={projects?.data}
        isLoading={projectsLoading}
        onSelect={setSelectedProject}
        hoverColor="primary"
      />
    )
  }

  return (
    <Modal
      onClose={() => {
        setSelectedProject(null)
        onClose()
      }}
      title="Agregar categoría"
      description={selectedProject.title}
    >
      <div className="flex flex-col gap-4">
        {isError && (
          <BannerMessageError
            message={error?.response?.data?.message || 'Error al subir la evidencia'}
          />
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Categoría</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(parseInt(e.target.value))}
              className="px-3 py-2 border rounded-md"
              disabled={categoriesLoading}
            >
              <option value="">Selecciona una categoría</option>

              {categories?.data.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
            >
              Atras
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white disabled:bg-neutral-medium disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isPending ? <ButtonLoader message="Agregando..." /> : 'Agregar Categoría'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Categorías del proyecto</h3>

        {isLoading && <p>Cargando categorías...</p>}

        {!isLoading && data?.data.length === 0 && (
          <p className="text-sm text-neutral-medium">No hay categorías asignadas</p>
        )}

        <ul className="flex flex-col gap-2">
          {data?.data.map((item) => (
            <li
              key={item.id}
              className="px-2 py-1 rounded-md bg-primary-soft/15"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}
