import type { SoftSkillResponse } from '../interfaces/soft.interface'
import { CardSoftSkill } from './CardSoftSkill'
import { ListSkills } from './ListSkills'
import { ModalSkills } from './ModalSkills'

interface Props {
  onClose: () => void
}

export const ModalViewSoftSkills = ({ onClose }: Props) => {
  return (
    <ModalSkills
      title="Habilidades Blandas"
      description="Aquí podras ver todas tus habilidades registradas."
      onClose={onClose}
    >
      <ListSkills<SoftSkillResponse>
        queryKey={['user', 'skills', 'soft']}
        route="soft-skills"
        renderItem={(item) => <CardSoftSkill {...item} />}
      />
    </ModalSkills>
  )
}
