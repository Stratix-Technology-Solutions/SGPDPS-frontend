import { MdClose } from 'react-icons/md'

interface Props {
  title: string
  description: string
  onClose: () => void
  children: React.ReactNode
}

export const ModalSkills = ({ title, description, onClose, children }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5">
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-neutral-medium/70">{description}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <MdClose className="w-8 h-8" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}
