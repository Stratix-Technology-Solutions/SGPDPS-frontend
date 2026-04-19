import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { useGetLinks } from '../hooks/useGetLinks'
import type { LinkResponse } from '../interfaces/link.interface'

interface Props {
  onClose: () => void
}

const extractVisibleLinks = (data: LinkResponse | undefined) => {
  return (
    data?.data.filter(({ url }) => {
      return Boolean(url?.trim())
    }) ?? []
  )
}

export const ModalView = ({ onClose }: Props) => {
  const { data, isLoading, isError } = useGetLinks()

  const visibleLinks = extractVisibleLinks(data)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-background-dark">Enlaces</h2>
          <button type="button" onClick={onClose} className="text-sm text-neutral-medium/70 hover:text-background-dark cursor-pointer">
            Cerrar
          </button>
        </div>

        {isError && (
          <BannerMessageError message={'Ocurrió un error al cargar los enlaces'} />
        )}

        {isLoading ? (
          <p className="text-sm text-neutral-medium">Cargando enlaces...</p>
        ) : visibleLinks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {visibleLinks.map(({ slot, url }) => (
              <a
                key={slot}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="break-all rounded-xl border border-neutral-light bg-neutral-50 px-4 py-3 text-sm text-background-dark hover:border-primary hover:text-primary transition-colors"
              >
                {url}
              </a>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-medium">No hay enlaces registrados.</p>
        )}
      </div>
    </div>
  )
}
