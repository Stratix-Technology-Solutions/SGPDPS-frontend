import { useState } from 'react'
import { Modal } from "../../../../shared/components/Modal"
import { useGetProjectAssets, useDeleteProjectAsset, useGetProject } from '../../hooks/useProjectAssets'
import { FiFile, FiImage } from 'react-icons/fi'
import type { ProjectIdTitle } from '../../interfaces/project.interface'
import { ProjectSelectionModal } from '../ProjectSelectionModal'

interface Props {
  onClose: () => void
}

export const ModalDeleteProjectAsset = ({ onClose }: Props) => {
  const [selectedProject, setSelectedProject] = useState<ProjectIdTitle | null>(null)
  const { data: projects, isLoading: projectsLoading } = useGetProject()
  const { data: assets, isLoading: assetsLoading } = useGetProjectAssets(selectedProject?.id)
  const { mutate: deleteAsset, isPending: isDeleting } = useDeleteProjectAsset(selectedProject?.id)

  const handleDelete = (assetId: string) => {
    deleteAsset(assetId)
  }

  if (!selectedProject) {
    return (
      <ProjectSelectionModal
        title="Selecciona un proyecto para"
        onClose={onClose}
        projects={projects?.data}
        isLoading={projectsLoading}
        onSelect={setSelectedProject}
        hoverColor="red"
      />
    )
  }

  return (
    <Modal
      onClose={() => {
        setSelectedProject(null)
        onClose()
      }}
      title="Eliminar evidencia digital"
      description="Elimina la evidencia que ya no deseas mantener en este proyecto."
    >
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:px-8">
        {assetsLoading && (
          <div className="flex justify-center py-12">
            <p className="text-neutral-medium/70">Cargando evidencia...</p>
          </div>
        )}

        {!assetsLoading && !assets?.data?.length && (
          <div className="flex justify-center py-4 bg-neutral-50 rounded-xl border border-neutral-light">
            <p className="text-neutral-medium/70">No hay evidencia registrada para este proyecto.</p>
          </div>
        )}

        {!assetsLoading && assets?.data && assets.data.length > 0 && (
          <>
            <div>
              <h3 className="font-semibold text-background-dark mb-4 text-xs">
                Evidencia registrada ({assets.data.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto customized-scrollbar">
                {assets.data.map((asset) => {
                  const isImage = asset.url.includes('image') || asset.path.match(/\.(jpg|jpeg|png)$/i)
                  const isPdf = asset.url.includes('pdf') || asset.path.endsWith('.pdf')
                  const fileName = asset.path.split('/').pop()

                  return (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-neutral-light bg-linear-to-r from-white to-neutral-50 hover:shadow-sm transition-all hover:border-primary/30"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                          {isImage ? (
                            <FiImage className="text-blue-500" size={20} />
                          ) : isPdf ? (
                            <FiFile className="text-red-500" size={20} />
                          ) : (
                            <FiFile className="text-gray-500" size={20} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-background-dark truncate hover:text-primary cursor-default" title={fileName}>
                            {fileName}
                          </p>
                          <p className="text-xs text-neutral-medium/60">
                            {isImage ? 'Imagen' : isPdf ? 'PDF' : 'Archivo'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-4">
                        <a
                          href={`http://localhost:8000${asset.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white hover:bg-primary-soft transition-colors font-medium text-sm"
                        >
                          Ver
                        </a>
                        <button
                          onClick={() => handleDelete(asset.id)}
                          disabled={isDeleting}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 transition-colors font-medium text-sm disabled:cursor-not-allowed"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
