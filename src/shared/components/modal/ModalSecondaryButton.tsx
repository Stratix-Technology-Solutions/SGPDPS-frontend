interface Props {
  text: string
  onClick?: () => void
}

export function ModalSecondaryButton({
  text,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-4 py-2 rounded-xl font-medium text-neutral-medium bg-transparent hover:bg-neutral-light/50 hover:text-background-dark transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-light cursor-pointer border border-background-dark/30"
    >
      {text}
    </button>
  )
}
