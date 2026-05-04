import { useState } from 'react'
import { Modal } from "../../../../shared/components/Modal"
import type { ProjectIdTitle } from '../../interfaces/project.interface'
import { useCreateProjectAsset, useGetProject } from '../../hooks/useProjectAssets'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { ButtonLoader } from '../../../../shared/components/ButtonLoader'
import { FiFile, FiImage } from 'react-icons/fi'
import type { ProjectAssetType } from '../../interfaces/project-asset.interface'

interface Props {
  onClose: () => void
}

export const ModalAddProjectAsset = ({ onClose }: Props) => {
  const [selectedProject, setSelectedProject] = useState<ProjectIdTitle | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedType, setSelectedType] = useState<ProjectAssetType>('imagen')

  const { data: projects, isLoading: projectsLoading } = useGetProject()
  const { mutate: uploadAsset, isPending: isUploading, isError, error } = useCreateProjectAsset(selectedProject?.id)

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
    if (selectedFile && selectedProject) {
      uploadAsset(
        { file: selectedFile, type: selectedType },
        {
          onSuccess: () => {
            setSelectedFile(null)
            setSelectedProject(null)
            setSelectedType('imagen')
            onClose()
          }
        }
      )
    }
  }

  if (!selectedProject) {
    return (
      <Modal title="Selecciona un proyecto" onClose={onClose}>
        {projectsLoading && <p className="text-neutral-medium/70 text-sm">Cargando proyectos...</p>}

        {!projectsLoading && !projects?.data?.length && (
          <p className="text-neutral-medium/70 text-sm">No hay proyectos registrados.</p>
        )}

        <ul className="flex flex-col gap-2 max-h-80 overflow-y-auto">
          {projects?.data?.map((project) => (
            <li key={project.id}>
              <button
                onClick={() => setSelectedProject(project)}
                className="w-full text-left px-4 py-3 rounded-xl border border-neutral-light transition-colors cursor-pointer hover:border-primary hover:bg-primary/5"
              >
                <p className="font-semibold text-background-dark">{project.title}</p>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    )
  }

  return (
    <Modal
      onClose={() => {
        setSelectedProject(null)
        setSelectedFile(null)
        onClose()
      }}
      title="Subir evidencia digital"
      description={`Proyecto: ${selectedProject.title}`}
    >
      <div className="p-4 md:p-6 lg:px-8">
        {isError && (
          <BannerMessageError
            message={error?.response?.data?.message || 'Error al subir la evidencia'}
          />
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
            >
              Atrás
            </button>

            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="w-full sm:w-auto bg-primary hover:bg-primary-soft text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isUploading ? <ButtonLoader message="Subiendo..." /> : 'Subir evidencia'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
