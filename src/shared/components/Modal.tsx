import { MdClose } from 'react-icons/md'

interface Props {
  title: string
  description?: string
  onClose: () => void
  children: React.ReactNode
}

export const Modal = ({ title, description, onClose, children }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center gap-2 px-6 pt-6 pb-1 shrink-0">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">{title}</h3>

            {!!description && (
              <p className="text-sm text-neutral-medium/70">{description}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <MdClose className="w-8 h-8" />
          </button>
        </div>

        <div className="px-6 pb-6 overflow-y-auto customized-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}
