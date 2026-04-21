import { useState } from 'react'
import type { TechnicalSkillResponse } from '../interfaces/technical.interface'
import { CardTechnicalSkill } from './CardTechnicalSkill'
import { ListSkills } from './ListSkills'
import { FormUpdateTechnicalSkill } from './FormUpdateTechnicalSkill'
import { Modal } from '../../../shared/components/Modal'

interface Props {
  onClose: () => void
}

export const ModalEditTechnicalSkill = ({ onClose }: Props) => {
  const [technology, setTechnology] = useState(null)

  return (
    <Modal
      title="Editar Habilidades Técnicas"
      description="Aquí podras seleccionar que habilidad técnica deseas editar."
      onClose={onClose}
    >
      {technology ?
        <FormUpdateTechnicalSkill
          technology={technology}
          onClose={() => setTechnology(null)}
        />
      : (
        <ListSkills<TechnicalSkillResponse>
          queryKey={['user', 'skills', 'technical']}
          route="skills"
          renderItem={(item) => <CardTechnicalSkill {...item} />}
          action={(item: any) => setTechnology(item)}
        />
      )}
    </Modal>
  )
}
