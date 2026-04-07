import { Link } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { CgClose } from 'react-icons/cg';
import { useLogout } from '../hooks/useAuth';
import { useState } from 'react';
import { SuccessModal } from './SuccesModal';
import { ErrorModal } from './ErrorModal';

interface IUserMenu {
  open: boolean
  onClose: () => void
}

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Perfil', to: '/profile' },
]

export const UserMenu = ({ open, onClose }: IUserMenu) => {
  const logout = useLogout()
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
          {links.map(({ label, to }) => (
            <Link key={`${label}-${to}`} to={to} onClick={onClose}>{label}</Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="text-red-500 text-left"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="hidden md:block absolute right-6 top-16 z-50 w-56 bg-white border rounded-xl shadow-lg p-2">
        <nav className="flex flex-col border-b mb-2 pb-2">
          {links.map(({ label, to }) => (
            <Link
              key={`${label}-${to}`}
              to={to}
              onClick={onClose}
              className="px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-500 cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
      {successMessage && <SuccessModal message={successMessage} redirect="Redirigiendo al login..." />}

      {errorMessage && <ErrorModal message={errorMessage} />}
    </>
  )
}
