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
      className="group relative overflow-hidden flex flex-col w-40 min-h-[140px] p-4 rounded-2xl text-white text-center bg-linear-to-br from-[#24467A] to-[#1B3357] border border-white/10 shadow-sm shadow-black/10 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#1B3357]/20 hover:brightness-[1.03]"
    >
      <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex-1 flex flex-col items-center justify-start gap-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/15 group-hover:scale-105">
          <Icon className="w-7 h-7 opacity-95 transition-transform duration-300 group-hover:scale-110" />
        </div>

        <span className="text-sm font-semibold leading-snug tracking-[0.01em]">
          {label}
        </span>
      </div>
    </button>
  )
}
