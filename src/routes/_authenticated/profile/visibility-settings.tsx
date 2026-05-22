import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { PortfolioSections } from '../../../features/view/components/PortfolioSections'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'
import { LuCopy, LuExternalLink, LuCheck } from 'react-icons/lu'

export const Route = createFileRoute(
  '/_authenticated/profile/visibility-settings',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useGetProfile()
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
