import type { IconType } from 'react-icons'
import { FaUniversity } from 'react-icons/fa'
import { SiHyperskill } from 'react-icons/si'
import { MdOutlineWork, MdOutlineComputer } from 'react-icons/md'
import { MdLink } from 'react-icons/md'
import { GiGraduateCap } from 'react-icons/gi'
import { IoSettings } from 'react-icons/io5'

interface Section {
  label: string
  to: string
  Icon: IconType
  description: string
}

export const sections: Section[] = [
  {
    label: 'Habilidades',
    to: '/profile/skills',
    Icon: SiHyperskill,
    description: 'Registra tus habilidades técnicas y blandas que posees',
  },
  {
    label: 'Experiencia Laboral',
    to: '/profile/laboral-experience',
    Icon: MdOutlineWork,
    description: 'Registra y gestiona tu historial de empleos para mostrarlos en tu portafolio.',
  },
  {
    label: 'Experiencia Académica',
    to: '/profile/academic-experience',
    Icon: GiGraduateCap,
    description: 'Registra formaciones complementarias como cursos, talleres y certificados.',
  },
  {
    label: 'Formación Académica',
    to: '/profile/academic-formation',
    Icon: FaUniversity,
    description: 'Registra tus estudios formales, grados académicos y títulos obtenidos.',
  },
  {
    label: 'Proyectos Personales',
    to: '/profile/software-projects',
    Icon: MdOutlineComputer,
    description: 'Gestiona tus proyectos desarrollados, destacando tus contribuciones.',
  },
  {
    label: 'Enlaces',
    to: '/profile/links',
    Icon: MdLink,
    description: 'Gestiona los enlaces que aparecerán en tu portafolio.',
  },
  {
    label: 'Configuración de visibilidad',
    to: '/profile/visibility-settings',
    Icon: IoSettings,
    description: 'Elige que secciones de tu portafolio seran visibles para los visitantes.',
  },
]
