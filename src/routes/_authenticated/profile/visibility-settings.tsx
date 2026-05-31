import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { PortfolioSections } from '../../../features/view/components/PortfolioSections'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'
import { LuCopy, LuExternalLink, LuCheck } from 'react-icons/lu'
import { useChangeVisibilityProfile } from '../../../features/profile/hooks/useUpdateProfile'

export const Route = createFileRoute(
  '/_authenticated/profile/visibility-settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useGetProfile()
  const { mutate: visibility } = useChangeVisibilityProfile()
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    if (!data?.username) return
    const profileUrl = `${window.location.origin}/profiles/${data.username}`
    await navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Configurar la visibilidad de tu portafolio"
        description="Controla si tu portafolio es publico o privado."
      />
      <div className="space-y-3">
        <div
          className="flex items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-white px-4 py-3 transition-colors hover:border-primary-soft"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => visibility()}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-50 ${data?.is_visible ? 'bg-primary' : 'bg-neutral-light'}`}
            >
              <span className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${data?.is_visible ? 'right-1' : 'left-1'}`} />
            </button>

            <span className={` hidden text-sm md:block ${data?.is_visible ? 'text-primary' : 'text-neutral-medium'}`} >
              {data?.is_visible ? 'Pública' : 'Privada'}
            </span>
          </div>
        </div>
      </div>
      <SectionTitle
        title="Configuración de visibilidad"
        description="Elige qué secciones de tu portafolio serán visibles para los visitantes."
      />

      <PortfolioSections />

      {!!data?.username && (
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
          <Link
            to="/profiles/$username"
            params={{ username: data.username }}
            className="group flex items-center justify-center gap-2 bg-primary text-white py-3 px-5 rounded-xl hover:bg-primary-soft transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span>Ver perfil</span>

            <LuExternalLink
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>

          <button
            type="button"
            onClick={handleCopyLink}
            className={`
              flex items-center justify-center gap-2 py-3 px-5 rounded-xl border transition-all duration-200 cursor-pointer
              ${copied
                ? 'border-green-200 bg-green-50 text-green-600'
                : 'border-neutral-200 bg-white text-background-dark hover:border-primary-soft hover:text-primary-soft'
              }
            `}
          >
            {copied
              ? <LuCheck size={18} />
              : <LuCopy size={18} />
            }

            <span>
              {copied ? 'Enlace copiado' : 'Copiar enlace'}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
