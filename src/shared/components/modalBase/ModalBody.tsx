import type { ReactNode } from 'react'
import type { Padding } from './modal.types'

interface ModalBodyProps {
  padding?: Padding
  scrollable?: boolean
  className?: string
  children: ReactNode
}

export function ModalBody({
  padding = 'sm',
  scrollable = true,
  className = '',
  children,
}: ModalBodyProps) {
  const paddingClasses: Record<Padding, string> = {
    none: 'p-0',
    sm: 'px-5 py-3',
    md: 'px-6 py-5',
    lg: 'px-8 py-6',
  }

  return (
    <div className={`flex-1 ${scrollable ? 'overflow-y-auto' : ''} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}
