import { Link } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { useLogout } from '../../features/auth/hooks/useLogout'
import { useProfileStatus } from '../../features/profile/hooks/useProfileStatus'
import { SuccessModal } from './SuccessModal'
import { ErrorModal } from './ErrorModal'
import { useExportPortfolioPdf } from '../../features/profile/hooks/useExportPortfolioPdf'

interface IUserMenu {
  open: boolean
  onClose: () => void
}

export const UserMenu = ({ open, onClose }: IUserMenu) => {
  const logout = useLogout()
  const navigate = useNavigate()
  const { hasProfile, isLoadingProfile, isProfileMissing } = useProfileStatus()
  const { exportPortfolio, isExporting } = useExportPortfolioPdf()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const links = [
    { label: 'Inicio', to: '/dashboard' },
    ...(!isLoadingProfile
      ? [
        isProfileMissing || !hasProfile
          ? { label: 'Registrar perfil', to: '/profile/register', disabled: false }
          : { label: 'Editar perfil', to: '/profile/edit', disabled: false },
      ]
      : []),
  ]

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: (message) => {
        setSuccessMessage(message || 'Sessión cerrada correctamente')

        setTimeout(() => {
          localStorage.removeItem('access_token')
          setSuccessMessage(null)
          navigate({ to: '/login' })
        }, 2000);
      },
      onError: () => {
        setErrorMessage('Error al cerrar sesión')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000);
      }
    });
  }

  if (!open) return null

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <div className="fixed inset-0 z-50 bg-white p-4 flex flex-col md:hidden">
        <button
          onClick={onClose}
          className="self-end text-gray-500 border-2 border-gray-400 rounded-lg"
        >
          <CgClose className="w-8 h-8" />
        </button>

        <nav className="flex flex-col gap-4 py-4 border-b mb-4">
          {links.map(({ label, to, disabled }) => (
            <Link
              key={`${label}-${to}`}
              to={to}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault()
                  return
                }
                onClose()
              }}
              className={disabled ? 'text-neutral-medium cursor-not-allowed' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => exportPortfolio()}
          disabled={isExporting}
          className="
            flex items-center gap-3 rounded-xl
            px-4 py-3
            disabled:text-gray-500
            transition-all duration-200
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <span>
            {isExporting
              ? 'Generando PDF...'
              : 'Exportar portafolio'}
          </span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="text-red-500 text-left"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="hidden md:block absolute right-6 top-16 z-50 w-56 bg-white border rounded-xl shadow-lg p-2">
        <nav className="flex flex-col border-b mb-1 pb-2">
          {links.map(({ label, to, disabled }) => (
            <Link
              key={`${label}-${to}`}
              to={to}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault()
                  return
                }
                onClose()
              }}
              className={`px-3 py-2 rounded-lg ${disabled ? 'text-neutral-medium cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => exportPortfolio()}
          disabled={isExporting}
          className="
              flex w-full items-center gap-3
              px-4 py-3
              cursor-pointer
              hover:bg-gray-100
              transition-all duration-200
              disabled:text-gray-500
              disabled:cursor-not-allowed
              disabled:opacity-60
          border-b

            "
        >

          <span>
            {isExporting
              ? 'Generando PDF...'
              : 'Exportar PDF'}
          </span>
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-500 cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>

      {successMessage && <SuccessModal message={successMessage} redirect="Redirigiendo al login..." />}
      {(errorMessage || error) && <ErrorModal message="ah ocurrido un error" />}
    </>
  )
}
