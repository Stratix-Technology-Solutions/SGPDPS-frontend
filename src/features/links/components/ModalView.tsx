import { useState, type ReactNode } from 'react'
import { useGetLinks } from '../hooks/useGetLink'
import { FaGithub, FaLinkedin, FaGitlab } from 'react-icons/fa'
import { RiGlobalLine } from 'react-icons/ri'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { Modal } from '../../../shared/components/Modal'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

interface Props {
  onClose: () => void
}

const ICON_MAP: Record<string, ReactNode> = {
  'github.com': <FaGithub />,
  'www.linkedin.com': <FaLinkedin />,
  'gitlab.com': <FaGitlab />
}

const getDomain = (url: string): string | undefined => {
  try {
    return new URL(url).hostname
  } catch {
    return undefined
  }
}

export const ModalView = ({ onClose }: Props) => {
  const [page, setPage] = useState<number>(1)
  const { data, isLoading, isError, isSuccess } = useGetLinks({ page })

  if (isLoading) {
    return (<p className="text-sm text-neutral-medium">Cargando enlaces...</p>)
  }

  if (isError) {
    return (
      <BannerMessageError message={'Ocurrió un error al cargar los enlaces'} />
    )
  }


  return (
    <Modal
      title="Enlaces"
      onClose={onClose}
    >
      {isSuccess && !data.data.length && (
        <p className="text-sm text-neutral-medium">No hay elementos que mostrar</p>
      )}

      {isSuccess && !!data.data.length && (
        <div className="flex flex-col gap-3">
          {data.data.map(({ id, url }) => {
            const domain = getDomain(url)
            {/* console.log('URL:', url, 'Domain:', domain) */ }
            const Icon = domain && ICON_MAP[domain] ? ICON_MAP[domain] : <RiGlobalLine />
            return (
              <a
                key={id}
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
      )}

      {isSuccess && data.meta.last_page > 1 && (
        <div className="flex justify-end items-center flex-wrap gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md disabled:opacity-50 cursor-pointer bg-white disabled:cursor-not-allowed"
          >
            <MdArrowBackIosNew className="w-6 aspect-square" />
          </button>

          {Array.from({ length: data.meta.last_page }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md cursor-pointer ${page === i + 1 ? 'bg-primary text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === data.meta.last_page}
            onClick={() => setPage(page + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-md disabled:opacity-50 cursor-pointer bg-white disabled:cursor-not-allowed"
          >
            <MdArrowForwardIos className="w-6 aspect-square" />
          </button>
        </div>
      )
      }
    </Modal>
  )
}
