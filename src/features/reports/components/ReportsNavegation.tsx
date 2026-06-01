import { FiBarChart2, FiFolder } from 'react-icons/fi'

export type ReportView = 'skills' | 'projects'

interface Props {
  currentView: ReportView
  onChange: (view: ReportView) => void
}

const tabs = [
  {
    id: 'skills' as const,
    label: 'Habilidades',
    Icon: FiBarChart2,
  },
  {
    id: 'projects' as const,
    label: 'Proyectos',
    Icon: FiFolder,
  },
]

export const ReportsNavigation = ({ currentView, onChange }: Props) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-3">
      <div className="flex gap-2">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`group flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
            ${currentView === id
              ? 'bg-primary text-white shadow-sm'
              : 'text-neutral-medium hover:bg-neutral-50 hover:text-background-dark'
            }`}
          >
            <Icon className={`w-4 h-4 transition-colors
              ${currentView === id
                ? 'text-white'
                : 'text-neutral-medium group-hover:text-primary'
              }`}
            />

            <span className="font-medium">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
