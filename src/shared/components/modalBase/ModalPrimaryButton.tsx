import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { FooterIntent } from './modal.types'
import { primaryStyles } from './modal.utils'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon?: ReactNode
  loading?: boolean
  intent?: FooterIntent
}

export function ModalPrimaryButton({
  text,
  icon,
  loading,
  disabled,
  intent = 'primary',
  onClick,
  ...props
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${primaryStyles[intent]}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin w-5 h-5"
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
