import type { IconType } from 'react-icons'

interface Props {
  icon: IconType
  label: string
  onClick?: () => void
}

export const ActionButton = ({ icon: Icon, label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 w-34 h-34 rounded-2xl bg-linear-to-b from-[#3a5a8c] to-[#1e3a5f] text-white cursor-pointer hover:brightness-110 transition-all"
    >
      <span className="text-sm font-medium">{label}</span>
      <Icon className="w-8 h-8" />
    </button>
  )
}
