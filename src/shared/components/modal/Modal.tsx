import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import type { ModalSize } from './modal.types'
import { ModalContext } from './modal.context'
import { sizeClasses } from './modal.utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  size?: ModalSize
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
  scrollable?: boolean
  className?: string
  children: ReactNode
}

export function Modal({
  isOpen,
  onClose,
  size = 'lg',
  closeOnOverlay = true,
  closeOnEsc = true,
  scrollable = true,
  className = '',
  children,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!closeOnEsc) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [isOpen, closeOnEsc, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose()
    }
  }

  return (
    <ModalContext.Provider value={{ onClose }}>
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/70 backdrop-blur-sm transition-all duration-200
          ${isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }
        `}
        aria-modal="true"
        role="dialog"
      >
        <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl flex flex-col ${scrollable ? 'max-h-[90vh]' : ''} transition-all duration-200
            ${isOpen
              ? 'scale-100 translate-y-0 opacity-100'
              : 'scale-95 translate-y-4 opacity-0'
            }
            ${className}
          `}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  )
}
