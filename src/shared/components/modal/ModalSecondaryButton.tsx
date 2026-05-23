import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function ModalSecondaryButton({
  text,
  ...props
}: Props) {
  return (
    <button
      className="inline-flex items-center px-4 py-2 rounded-xl font-medium text-neutral-medium bg-transparent hover:bg-neutral-light/50 hover:text-background-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-light cursor-pointer border border-background-dark/30"
      {...props}
    >
      {text}
    </button>
  )
}
