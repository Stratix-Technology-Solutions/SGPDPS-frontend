import type { IconType } from 'react-icons'
import { SiHyperskill } from 'react-icons/si'
import { MdOutlineWork, MdOutlineComputer, MdSchool } from 'react-icons/md'
import { MdLink } from 'react-icons/md'
import { GiGraduateCap } from 'react-icons/gi'

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
    label: 'Experiencia Academica',
    to: '/profile/academic-experience',
    Icon: GiGraduateCap,
    description: 'Registra cursos, talleres, capacitaciones y certificaciones complementarias.',
  },
  {
    label: 'Formacion Academica',
    to: '/profile/academic-formation',
    Icon: MdSchool,
    description: 'Registra tus estudios formales, grados academicos y titulos obtenidos.',
  },
  {
    label: 'Proyectos de Software',
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
]
