import type { TechnicalSkillResponse } from '../interfaces/technical.interface'
import { CardTechnicalSkill } from './CardTechnicalSkill'
import { ListSkills } from './ListSkills'
import { ModalSkills } from './ModalSkills'

interface Props {
  onClose: () => void
}

export const ModalViewTechnicalSkills = ({ onClose }: Props) => {
  return (
    <ModalSkills
      title="Habilidades Técnicas"
      description="Aquí podras ver todas tus habilidades registradas."
      onClose={onClose}
    >
      <ListSkills<TechnicalSkillResponse>
        queryKey={['user', 'skills', 'technical']}
        route="skills"
        renderItem={(item) => <CardTechnicalSkill {...item} />}
      />
    </ModalSkills>
  )
}
