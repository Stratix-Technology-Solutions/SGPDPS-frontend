import type { ReactNode } from 'react'
import type { FooterIntent } from './modal.types'
import { primaryStyles } from './modal.utils'

interface Props {
  text: string
  icon?: ReactNode
  loading?: boolean
  disabled?: boolean
  intent?: FooterIntent
  onClick?: () => void
}

export function ModalPrimaryButton({
  text,
  icon,
  loading,
  disabled,
  intent = 'primary',
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${primaryStyles[intent]}`}
    >
      {loading ? (
        <svg
          className="animate-spin w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      ) : (
        icon
      )}

      {text}
    </button>
  )
}
