import { Link } from '@tanstack/react-router'
import { FiBarChart2, FiFolder } from 'react-icons/fi'

export type ReportView = 'skills' | 'projects'

interface Props {
  currentView: ReportView
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

export const ReportsNavigation = ({ currentView }: Props) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-4">
      <div className="flex gap-2">
        {tabs.map(({ id, label, Icon }) => (
          <Link
            to="/profile/reports"
            search={{ view: id }}
            key={id}
            className={`group flex items-center gap-2 p-3 rounded-xl transition-all duration-200 cursor-pointer
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
          </Link>
        ))}
      </div>
    </div>
  )
}
