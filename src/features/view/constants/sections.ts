import {
  FiBriefcase,
  FiBookOpen,
  FiCode,
  FiFolder,
  FiLink,
} from 'react-icons/fi'
import { GiSkills } from 'react-icons/gi'
import { PiStudentFill } from 'react-icons/pi'
import { Links } from '../components/display/Links'
import { Projects } from '../components/display/Projects'
import { Work } from '../components/display/Work'

export const sections = [
  {
    id: 'skills',
    title: 'Habilidades técnicas',
    description: 'Tecnologías, herramientas y competencias',
    icon: FiCode,
    content: '',
  },
  {
    id: 'soft_skills',
    title: 'Habilidades blandas',
    description: 'Habilidades Sociales',
    icon: GiSkills,
    content: '',
  },
  {
    id: 'experience',
    title: 'Experiencia laboral',
    description: 'Historial de trabajos y roles profesionales',
    icon: FiBriefcase,
    content: Work,
  },
  {
    id: 'education',
    title: 'Experiencia académica',
    description: 'Estudios formales, certificados y logros',
    icon: FiBookOpen,
    content: '',
  },
  {
    id: 'formation',
    title: 'Formación académica',
    description: 'Formación académica, estudios y grados',
    icon: PiStudentFill,
    content: '',
  },
  {
    id: 'projects',
    title: 'Proyectos',
    description: 'Proyectos personales y profesionales',
    icon: FiFolder,
    content: Projects,
  },
  {
    id: 'link',
    title: 'Enlaces',
    description: 'Enlaces a redes personales y profesionales',
    icon: FiLink,
    content: Links,
  },
]
