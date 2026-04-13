import { FaPlus } from 'react-icons/fa'

interface Props {
  title: string
  text: string
  onClick: () => void
  className?: string
}

export const SectionTitle = ({ title, text, onClick, className }: Props) => {
  return (
    <section className={`${className}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center">
        <div className="text-background-dark">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p>{text}</p>
        </div>

        <button
          onClick={onClick}
          className="px-6 py-2 bg-white text-primary rounded-lg flex items-center justify-center gap-1 cursor-pointer border-neutral-medium/20"
        >
          <FaPlus className="w-4 aspect-square inline" />
          Agregar
        </button>
      </div>
    </section>
  )
}
