import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { useGetProjectAssets, useDeleteProjectAsset } from '../../hooks/useProjectAssets'
import { FiFile, FiImage } from 'react-icons/fi'
import type { Project } from '../../interfaces/project.interface'
import type { ProjectAsset } from '../../interfaces/project-asset.interface'
import { useGetProjects } from '../../hooks/useProjects'
import { ListProjectsSelection } from '../ListProjectsSelection'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { FilePreview } from '../FilePreview'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDeleteProjectAsset = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<Project | null>(null)
  const [previewAsset, setPreviewAsset] = useState<ProjectAsset | null>(null)

  const { data: projects, isLoading: projectsLoading } = useGetProjects()
  const { data: assets, isLoading: assetsLoading } = useGetProjectAssets(selected?.id)
  const { mutate, isPending, isError, error } = useDeleteProjectAsset(selected?.id)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!selected
          ? 'Selecciona un proyecto'
          : !previewAsset
            ? 'Eliminar evidencia digital'
            : 'Vista previa de evidencia'
        }
        subtitle={!selected
          ? undefined
          : !previewAsset
            ? 'Elimina la evidencia que ya no deseas mantener en este proyecto.'
            : 'Revisa el archivo sin salir del flujo de eliminación.'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={!previewAsset ? () => setSelected(null) : () => setPreviewAsset(null)}
        intent={!selected || previewAsset ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <ListProjectsSelection
              projects={projects?.data}
              isLoading={projectsLoading}
              onSelect={setSelected}
              hoverColor="red"
            />
          ) : !previewAsset ? (
            <>
              {isError && (
                <BannerMessageError
                  message={error?.response?.data?.message ?? 'Ocurrió un error al eliminar la evidencia del proyecto.'}
                />
              )}

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
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary text-white hover:bg-primary-soft transition-colors font-medium text-sm cursor-pointer"
                              >
                                Ver
                              </button>
                              <button
                                onClick={() => mutate(asset.id)}
                                disabled={isPending}
                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 transition-colors font-medium text-sm disabled:cursor-not-allowed cursor-pointer"
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
            </>
          ) : (
            <FilePreview previewAsset={previewAsset} />
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant="close-only"
        cancelText={!selected ? 'Cerrar' : 'Volver atrás'}
        onCancel={!selected
          ? onClose
          : !previewAsset
            ? () => setSelected(null)
            : () => setPreviewAsset(null)
        }
      />
    </Modal>
  )
}
