import { Modal } from '../../../shared/components/Modal'
import type { TechnicalSkillResponse } from '../interfaces/technical.interface'
import { CardTechnicalSkill } from './CardTechnicalSkill'
import { ListSkills } from './ListSkills'

interface Props {
  onClose: () => void
}

export const ModalViewTechnicalSkills = ({ onClose }: Props) => {
  return (
    <Modal
      title="Habilidades Técnicas"
      description="Aquí podras ver todas tus habilidades registradas."
      onClose={onClose}
    >
      <ListSkills<TechnicalSkillResponse>
        queryKey={['user', 'skills', 'technical']}
        route="skills"
        renderItem={(item) => <CardTechnicalSkill {...item} />}
      />
    </Modal>
  )
}
