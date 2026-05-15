import { useRef, useState } from 'react'

interface AvatarFieldProps {
  currentUrl?: string
  onChange: (file: File | null) => void
}

export function AvatarField({ currentUrl, onChange }: AvatarFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onChange(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
        Foto de perfil
      </h2>

      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100 border-2 border-neutral-light flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-10 h-10 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            )}
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary-soft transition-colors cursor-pointer"
            aria-label="Cambiar foto"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm font-medium text-primary hover:underline text-left cursor-pointer"
          >
            {preview ? 'Cambiar foto' : 'Subir foto'}
          </button>
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm font-medium text-red-500 hover:underline text-left cursor-pointer"
            >
              Eliminar foto
            </button>
          )}
          <p className="text-xs text-neutral-medium">JPG, PNG o WEBP. Máx. 2MB.</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  )
}
