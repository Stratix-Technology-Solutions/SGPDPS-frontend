import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modalBase'
import type { Project } from '../../interfaces/project.interface'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { useProjectCategories } from '../../hooks/useProjectCategories'
import { useCreateProjectCategory } from '../../hooks/useCreateProjectCategory'
import { useGetProjectCategories } from '../../hooks/useGetProjectCategories'
import { useGetProjects } from '../../hooks/useProjects'
import { ListProjectsSelection } from '../ListProjectsSelection'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddProjectCategory = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<Project | null>(null)
  const [categoryId, setCategoryId] = useState<number>(-1)

  const { data: projects, isLoading: projectsLoading } = useGetProjects()
  const { data: categories, isLoading: categoriesLoading } = useProjectCategories()
  const { mutate, isPending, isError, error } = useCreateProjectCategory()
  const { data, isLoading } = useGetProjectCategories(selected?.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (categoryId === -1 || !selected) return

    mutate({
      projectId: selected.id,
      categoryId,
    }, {
      onSuccess: () => {
        setCategoryId(-1)
      }
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!selected ? 'Selecciona un proyecto para categorizar' : 'Categorizar proyecto'}
        subtitle={!selected
          ? undefined
          : selected.title
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <ListProjectsSelection
              projects={projects?.data}
              isLoading={projectsLoading}
              onSelect={setSelected}
              hoverColor="primary"
            />
          ) : (
            <>
              {isError && (
                <BannerMessageError
                  message={error?.response?.data?.message || 'Error al subir la evidencia'}
                />
              )}

              <form
                id="category-form-add"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
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
              </form>

              <div>
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
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId="category-form-add"
        variant={!selected ? 'close-only' : 'confirm-cancel'}
        disabled={isPending}
        loading={isPending}
        confirmText="Agregar"
      />
    </Modal>
  )
}
