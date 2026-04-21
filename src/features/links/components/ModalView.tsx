import type { ReactNode } from 'react'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { useGetLinks } from '../hooks/useGetLinks'
import type { LinkResponse } from '../interfaces/link.interface'
import { Modal } from '../../../shared/components/Modal'
import { FaGithub, FaLinkedin, FaGitlab } from 'react-icons/fa'
import { RiGlobalLine } from 'react-icons/ri'

interface Props {
  onClose: () => void
}

const ICON_MAP: Record<string, ReactNode> = {
  'github.com': <FaGithub />,
  'www.linkedin.com': <FaLinkedin />,
  'gitlab.com': <FaGitlab />
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
    <Modal
      title="Enlaces"
      onClose={onClose}
    >
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
            const Icon = domain && ICON_MAP[domain] ? ICON_MAP[domain] : <RiGlobalLine />
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
    </Modal>
  )
}
