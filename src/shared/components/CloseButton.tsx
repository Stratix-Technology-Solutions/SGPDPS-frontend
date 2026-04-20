import { MdClose } from 'react-icons/md'

interface Props {
  onClick: () => void
}

export const CloseButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      aria-label="Cerrar modal"
    >
      <MdClose className="w-8 h-8" />
    </button>
  )
} 
