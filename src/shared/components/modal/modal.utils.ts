import type {
  ModalSize,
  Intent,
  Align,
  FooterIntent,
} from './modal.types'

export const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] min-h-[90vh]',
}

export const intentAccent: Record<Intent, string> = {
  default: 'bg-primary',
  danger: 'bg-red-500',
  warning: 'bg-amber-400',
  info: 'bg-sky-500',
}

export const intentIconBg: Record<Intent, string> = {
  default: 'bg-primary/10 text-primary',
  danger: 'bg-red-50 text-red-500',
  warning: 'bg-amber-50 text-amber-500',
  info: 'bg-sky-50 text-sky-500',
}

export const alignClasses: Record<Align, string> = {
  right: 'justify-end',
  left: 'justify-start',
  center: 'justify-center',
  between: 'justify-between',
}

export const primaryStyles: Record<FooterIntent, string> = {
  primary: 'bg-primary hover:bg-[#4C77BB] text-white focus-visible:ring-primary/40',
  danger: 'bg-red-600 hover:bg-red-500 text-white focus-visible:ring-red-500/40',
  warning: 'bg-amber-500 hover:bg-amber-400 text-white focus-visible:ring-amber-400/40',
}
