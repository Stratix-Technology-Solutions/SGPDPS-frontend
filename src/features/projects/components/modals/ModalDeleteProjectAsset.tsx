import { useState } from 'react'
import { Modal } from "../../../../shared/components/Modal"
import { useGetProjectAssets, useDeleteProjectAsset, useGetProject } from '../../hooks/useProjectAssets'
import { FiFile, FiImage } from 'react-icons/fi'
import type { ProjectIdTitle } from '../../interfaces/project.interface'
import type { ProjectAsset } from '../../interfaces/project-asset.interface'
import { ProjectSelectionModal } from '../ProjectSelectionModal'

interface Props {
  onClose: () => void
}

export const ModalDeleteProjectAsset = ({ onClose }: Props) => {
  const [selectedProject, setSelectedProject] = useState<ProjectIdTitle | null>(null)
  const [previewAsset, setPreviewAsset] = useState<ProjectAsset | null>(null)
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

  if (previewAsset) {
    const previewUrl = previewAsset.url
    const fileName = previewAsset.path.split('/').pop()
    const isImage = previewAsset.url.includes('image') || previewAsset.path.match(/\.(jpg|jpeg|png)$/i)
    const isPdf = previewAsset.url.includes('pdf') || previewAsset.path.endsWith('.pdf')

    return (
      <Modal
        onClose={() => setPreviewAsset(null)}
        title="Vista previa de evidencia"
        description="Revisa el archivo sin salir del flujo de eliminación."
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-neutral-light bg-neutral-50 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-background-dark truncate" title={fileName}>
                {fileName}
              </p>
              <p className="text-xs text-neutral-medium/70">
                {isImage ? 'Imagen' : isPdf ? 'PDF' : 'Archivo'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPreviewAsset(null)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-neutral-light bg-white text-background-dark hover:bg-neutral-50 transition-colors font-medium text-sm"
            >
              Volver atrás
            </button>
          </div>

          <div className="rounded-xl border border-neutral-light bg-neutral-50 overflow-hidden min-h-96 items-center justify-center">
            {isImage ? (
              <img
                src={previewUrl}
                alt={fileName}
                className="max-h-[70vh] w-full object-contain bg-white"
              />
            ) : isPdf ? (
              <iframe
                src={previewUrl}
                title={fileName}
                className="w-full min-h-[70vh] bg-white"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 p-8 text-center">
                <FiFile className="text-gray-500" size={40} />
                <p className="text-sm text-neutral-medium/80">
                  Este tipo de archivo no se puede previsualizar directamente.
                </p>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white hover:bg-primary-soft transition-colors font-medium text-sm"
                >
                  Abrir archivo
                </a>
              </div>
            )}
          </div>
        </div>
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
                        <button
                          type="button"
                          onClick={() => setPreviewAsset(asset)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white hover:bg-primary-soft transition-colors font-medium text-sm"
                        >
                          Ver
                        </button>
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
