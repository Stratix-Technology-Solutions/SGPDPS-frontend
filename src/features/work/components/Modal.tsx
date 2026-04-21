import { CloseButton } from '../../../shared/components/CloseButton'

interface Props {
  title: string
  description: string
  onClose: () => void
  onBack?: () => void
  children: React.ReactNode
}

export const Modal = ({
  title,
  description,
  onClose,
  onBack,
  children,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="text-sm text-neutral-medium/70 hover:text-background-dark cursor-pointer"
              >
                ← Volver
              </button>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-sm text-neutral-medium/70">{description}</p>
            </div>
          </div>
          <CloseButton onClick={onClose} />
        </div>

        {children}
      </div>
    </div>
  )
}
