import { Modal } from '../../../shared/components/Modal'
import type { SoftSkillResponse } from '../interfaces/soft.interface'
import { CardSoftSkill } from './CardSoftSkill'
import { ListSkills } from './ListSkills'

interface Props {
  onClose: () => void
}

export const ModalViewSoftSkills = ({ onClose }: Props) => {
  return (
    <Modal
      title="Habilidades Blandas"
      description="Aquí podras ver todas tus habilidades registradas."
      onClose={onClose}
    >
      <ListSkills<SoftSkillResponse>
        queryKey={['user', 'skills', 'soft']}
        route="soft-skills"
        renderItem={(item) => <CardSoftSkill {...item} />}
      />
    </Modal>
  )
}
