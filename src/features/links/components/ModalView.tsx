import type { ReactNode } from 'react'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { CloseButton } from '../../../shared/components/CloseButton'
import { useGetLinks } from '../hooks/useGetLinks'
import type { LinkResponse } from '../interfaces/link.interface'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedinIcon } from './icons/LinkedinIcon'
import { GitLabIcon } from './icons/GitLabIcon'
import { DefaultIcon } from './icons/DefaultIcon'

interface Props {
  onClose: () => void
}

const ICON_MAP: Record<string, ReactNode> = {
  'github.com': <GitHubIcon />,
  'www.linkedin.com': <LinkedinIcon />,
  'gitlab.com': <GitLabIcon />
}

const extractVisibleLinks = (data: LinkResponse | undefined) => {
  return (
    data?.data.filter(({ url }) => {
      return Boolean(url?.trim())
    }) ?? []
  )
}

const getDomain = (url: string): string | undefined => {
  try {
    return new URL(url).hostname
  } catch {
    return undefined
  }
}

export const ModalView = ({ onClose }: Props) => {
  const { data, isLoading, isError } = useGetLinks()

  const visibleLinks = extractVisibleLinks(data)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold text-background-dark">Enlaces</h3>
          <CloseButton onClick={onClose} />
        </div>

        {isError && (
          <BannerMessageError message={'Ocurrió un error al cargar los enlaces'} />
        )}

        {isLoading ? (
          <p className="text-sm text-neutral-medium">Cargando enlaces...</p>
        ) : visibleLinks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {visibleLinks.map(({ slot, url }) => {
              const domain = getDomain(url)
              {/* console.log('URL:', url, 'Domain:', domain) */ }
              const Icon = domain && ICON_MAP[domain] ? ICON_MAP[domain] : <DefaultIcon />
              return (
                <a
                  key={slot}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 break-all rounded-xl border border-neutral-light bg-neutral-50 px-4 py-3 text-sm text-background-dark hover:border-primary hover:text-primary transition-colors"
                >
                  {Icon}
                  {url}
                </a>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-neutral-medium">No hay enlaces registrados.</p>
        )}
      </div>
    </div>
  )
}
