import { Link } from '@tanstack/react-router'
import { SiHyperskill } from 'react-icons/si'
import { MdOutlineWork } from 'react-icons/md'
import { MdLink } from 'react-icons/md'
import { GiGraduateCap } from 'react-icons/gi'

const links = [
  { label: 'Habilidades', to: '/profile/skills', Icon: SiHyperskill },
  { label: 'Experiencia Laboral', to: '#', Icon: MdOutlineWork },
  { label: 'Experiencia Academica', to: '/profile/AcademicExperience', Icon: GiGraduateCap },
  { label: 'Enlaces', to: '/profile/links', Icon: MdLink },
]

interface Props {
  open: boolean
  closeAside: () => void
}

export const Aside = ({ open, closeAside }: Props) => {
  return (
    <aside
      className={`
        fixed left-0 top-20 h-[calc(100vh-5rem)] bg-white z-40
        w-full lg:w-xs
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        shadow-lg
      `}
    >
      <div className="flex items-center justify-center py-8">
        <img
          src="/logo.svg"
          className="w-32 aspect-square"
          alt="logo FolioX"
        />
      </div>

      <nav className="flex flex-col gap-2 px-4 pb-4">
        {links.map(({ label, to, Icon }) => (
          <Link
            key={label}
            to={to}
            className="p-2 rounded-md hover:bg-gray-100 flex items-center gap-2 font-medium"
            onClick={closeAside}
          >
            <Icon className="w-6 h-6 inline" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
