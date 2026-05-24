import { FiFile } from 'react-icons/fi'
import type { ProjectAsset } from '../interfaces/project-asset.interface'

interface Props {
  previewAsset: ProjectAsset
}

export function FilePreview({ previewAsset }: Props) {
  const previewUrl = previewAsset.url

  const fileName = previewAsset.path.split('/').pop()

  const isImage =
    previewAsset.url.includes('image') ||
    previewAsset.path.match(/\.(jpg|jpeg|png)$/i)

  const isPdf =
    previewAsset.url.includes('pdf') ||
    previewAsset.path.endsWith('.pdf')

  if (isImage) {
    return (
      <img
        src={previewUrl}
        alt={fileName}
        className="max-h-[70vh] w-full object-contain bg-white"
      />
    )
  }

  if (isPdf) {
    return (
      <iframe
        src={previewUrl}
        title={fileName}
        className="w-full min-h-[70vh] bg-white"
      />
    )
  }

  return (
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
  )
}
