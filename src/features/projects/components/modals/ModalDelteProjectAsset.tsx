import { useState } from 'react'
import { Modal } from "../../../../shared/components/Modal"
import { useGetProjectAssets, useDeleteProjectAsset, useGetProject } from '../../hooks/useProjectAssets'
import { FiTrash2, FiFile, FiImage, FiEye } from 'react-icons/fi'
import type { ProjectIdTitle } from '../../interfaces/project.interface'
import { ProjectSelector } from '../ProjectSelector'

interface Props {
  onClose: () => void
}

export const ModalDeleteProjectAsset = ({ onClose }: Props) => {
  const [selectedProject, setSelectedProject] = useState<ProjectIdTitle | null>(null)

  const { data: projects, isLoading: projectsLoading } = useGetProject()
  const { data: assets, isLoading: assetsLoading } = useGetProjectAssets(selectedProject?.id)
  const { mutate: deleteAsset, isPending: isDeleting } = useDeleteProjectAsset(selectedProject?.id)

  const handleDelete = (assetId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta evidencia?')) {
      deleteAsset(assetId)
    }
  }

  if (!selectedProject) {
    return (
      <Modal title="Selecciona un proyecto" onClose={onClose}>
        <ProjectSelector
          projects={projects?.data}
          isLoading={projectsLoading}
          onSelect={setSelectedProject}
          hoverColor="red"
        />
      </Modal>
    )
  }

  return (
    <Modal
      onClose={() => {
        setSelectedProject(null)
        onClose()
      }}
      title="Eliminar evidencia digital"
      description={`${selectedProject.title}`}
    >
      <div className="p-4 md:p-6 lg:px-8">
        {assetsLoading && (
          <p className="text-neutral-medium/70 text-sm">Cargando evidencia...</p>
        )}

        {!assetsLoading && !assets?.data?.length && (
          <p className="text-neutral-medium/70 text-sm py-8 text-center">
            No hay evidencia registrada para este proyecto.
          </p>
        )}

        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {assets?.data?.map((asset) => {
            const isImage = asset.url.includes('image') || asset.path.match(/\.(jpg|jpeg|png|gif|webp)$/i)
            const isPdf = asset.url.includes('pdf') || asset.path.endsWith('.pdf')

            return (
              <div
                key={asset.id}
                className="flex items-center justify-between p-4 rounded-xl border border-neutral-light bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="shrink-0">
                    {isImage ? (
                      <FiImage className="text-blue-500" size={24} />
                    ) : isPdf ? (
                      <FiFile className="text-red-500" size={24} />
                    ) : (
                      <FiFile className="text-gray-500" size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-background-dark truncate">
                      {asset.path.split('/').pop()}
                    </p>
                    <p className="text-xs text-neutral-medium/60">{asset.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <a
                    href={`http://localhost:8000${asset.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Ver"
                  >
                    <FiEye size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    disabled={isDeleting}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Eliminar"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-start pt-4 mt-4 border-t border-neutral-light">
          <button
            onClick={() => setSelectedProject(null)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
          >
            Atrás
          </button>
        </div>
      </div>
    </Modal>
  )
}
