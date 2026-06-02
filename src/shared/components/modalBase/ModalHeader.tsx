import { useContext, type ReactNode } from 'react'
import { IoClose, IoArrowBack } from 'react-icons/io5'
import type { HeaderVariant, Intent } from './modal.types'
import { ModalContext } from './modal.context'
import { intentAccent, intentIconBg } from './modal.utils'

interface ModalHeaderProps {
  title?: string
  subtitle?: string
  variant?: HeaderVariant
  onBack?: () => void
  actions?: ReactNode
  icon?: ReactNode
  intent?: Intent
  divider?: boolean
}

export function ModalHeader({
  title,
  subtitle,
  variant = 'close-only',
  onBack,
  actions,
  icon,
  intent = 'default',
  divider = true,
}: ModalHeaderProps) {
  const { onClose } = useContext(ModalContext)

  const showBack = variant === 'back-close' || variant === 'back-only'
  const showClose = variant === 'close-only' || variant === 'back-close'
  const showActions = variant === 'actions'

  return (
    <div className={`relative shrink-0 ${divider ? 'border-b border-neutral-light' : ''}`}>
      <div className={`absolute top-0 left-0 w-1.5 h-full rounded-tl-2xl ${intentAccent[intent]}`} />

      <div className="flex items-start gap-3 p-4 lg:px-6">
        {showBack && (
          <button
            onClick={onBack}
            className="shrink-0 p-1.5 rounded-lg text-neutral-medium hover:text-primary hover:bg-primary/8 transition-colors cursor-pointer"
            aria-label="Volver"
          >
            <IoArrowBack size={28} />
          </button>
        )}

        {icon && (
          <div className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-xl ${intentIconBg[intent]}`}>
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          {title && (
            <h2 className="text-xl font-bold text-background-dark leading-snug truncate">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-sm text-neutral-medium mt-2 leading-snug">
              {subtitle}
            </p>
          )}
        </div>

        {showActions && actions && (
          <div className="shrink-0 flex items-center gap-2">
            {actions}
          </div>
        )}

        {showClose && (
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded-lg text-neutral-medium hover:text-background-dark hover:bg-neutral-light/50 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <IoClose size={32} />
          </button>
        )}
      </div>
    </div>
  )
}
