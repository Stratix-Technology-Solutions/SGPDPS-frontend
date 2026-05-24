import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import type { Project } from '../../interfaces/project.interface'
import { useCreateProjectAsset } from '../../hooks/useProjectAssets'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { FiFile, FiImage } from 'react-icons/fi'
import type { ProjectAssetType } from '../../interfaces/project-asset.interface'
import { useGetProjects } from '../../hooks/useProjects'
import { ListProjectsSelection } from '../ListProjectsSelection'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddProjectAsset = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<Project | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedType, setSelectedType] = useState<ProjectAssetType>('imagen')

  const { data, isLoading } = useGetProjects()
  const { mutate, isPending, isError, error } = useCreateProjectAsset(selected?.id)

  const handleTypeChange = (type: ProjectAssetType) => {
    setSelectedType(type)
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isValidImage = selectedType === 'imagen' && file.type.startsWith('image/')
      const isValidPdf = selectedType === 'pdf' && file.type === 'application/pdf'

      if (isValidImage || isValidPdf) {
        setSelectedFile(file)
      } else {
        setSelectedFile(null)
        alert(`Por favor selecciona un archivo ${selectedType === 'imagen' ? 'de imagen' : 'PDF'} válido`)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFile && selected) {
      mutate(
        { file: selectedFile, type: selectedType },
        {
          onSuccess: () => {
            setSelectedFile(null)
            setSelected(null)
            setSelectedType('imagen')
          }
        }
      )
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!selected ? 'Selecciona un proyecto para subir su evidencia' : 'Subir evidencia digital'}
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
              projects={data?.data}
              isLoading={isLoading}
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
                id="asset-form-upload"
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <div>
                  <label className="block text-sm font-semibold text-background-dark mb-3">
                    Tipo de evidencia
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handleTypeChange('imagen')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${selectedType === 'imagen'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-neutral-light bg-white text-neutral-medium hover:border-primary'
                        }`}
                    >
                      <FiImage size={20} />
                      <span className="font-medium">Imagen</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTypeChange('pdf')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${selectedType === 'pdf'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-neutral-light bg-white text-neutral-medium hover:border-primary'
                      }`}
                    >
                      <FiFile size={20} />
                      <span className="font-medium">PDF</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="file-input"
                    className="block text-sm font-semibold text-background-dark mb-3"
                  >
                    Selecciona archivo
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept={selectedType === 'imagen' ? 'image/*' : 'application/pdf'}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-soft cursor-pointer"
                  />
                  {selectedFile && (
                    <p className="text-sm text-neutral-medium mt-2">
                      {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId="asset-form-upload"
        variant={!selected ? 'close-only' : 'confirm-cancel'}
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
