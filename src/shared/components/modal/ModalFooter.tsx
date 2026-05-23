import { useContext, type ReactNode } from 'react'
import { IoCheckmark, IoTrash } from 'react-icons/io5'
import type { Align, FooterIntent, FooterVariant } from './modal.types'
import { ModalContext } from './modal.context'
import { alignClasses } from './modal.utils'
import { ModalSecondaryButton } from './ModalSecondaryButton'
import { ModalPrimaryButton } from './ModalPrimaryButton'

interface ModalFooterProps {
  variant?: FooterVariant
  align?: Align
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
  disabled?: boolean
  intent?: FooterIntent
  divider?: boolean
  leftSlot?: ReactNode
  children?: ReactNode
}

const footerVariants: any = {
  'confirm-cancel': {
    confirmIcon: <IoCheckmark size={22} />,
    confirmText: 'Confirmar',
  },

  'ok-only': {
    confirmText: 'Aceptar',
  },

  'close-only': {
    cancelText: 'Cerrar',
  },

  'delete-cancel': {
    confirmIcon: <IoTrash size={22} />,
    confirmText: 'Eliminar',
    intent: 'danger',
  },
}

export function ModalFooter({
  variant = 'confirm-cancel',
  align = 'right',
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  loading = false,
  disabled = false,
  intent = 'primary',
  divider = true,
  leftSlot,
  children,
}: ModalFooterProps) {
  const { onClose } = useContext(ModalContext)
  const config = footerVariants[variant]
  const handleCancel = onCancel || onClose

  return (
    <div className={`shrink-0 ${divider ? 'border-t border-neutral-light' : ''} px-6 py-4`}>
      <div className={`flex items-center gap-3 ${alignClasses[align]}`}>
        {leftSlot && (
          <div className="mr-auto">
            {leftSlot}
          </div>
        )}

        {variant === 'custom' ? (
          children
        ) : (
          <>
            {variant !== 'ok-only' && (
              <ModalSecondaryButton
                text={
                  cancelText ||
                  config.cancelText ||
                  'Cancelar'
                }
                onClick={handleCancel}
              />
            )}

            {variant !== 'close-only' && (
              <ModalPrimaryButton
                text={
                  confirmText ||
                  config.confirmText
                }
                icon={config.confirmIcon}
                loading={loading}
                disabled={disabled}
                intent={config.intent || intent}
                onClick={onConfirm}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
