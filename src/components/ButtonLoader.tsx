import { FaSpinner } from 'react-icons/fa'

export const ButtonLoader = ({ message = 'Cargando...' }: { message?: string }) => {
  return (
    <span className="inline-flex items-center gap-2">
      <FaSpinner className="animate-spin text-base" />
      <span>{message}</span>
    </span>
  )
}
