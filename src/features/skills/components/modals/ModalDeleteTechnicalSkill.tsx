import { useState } from 'react'
import type { TechnicalSkillResponse } from '../../interfaces/technical.interface'
import { CardTechnicalSkill } from '../CardTechnicalSkill'
import { ListSkills } from '../ListSkills'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { useDeleteTechnicalSkill } from '../../hooks/useDeleteTechnicalSkill'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDeleteTechnicalSkill = ({ isOpen, onClose }: Props) => {
  const [technologyId, setTechnologyId] = useState(null)
  const { mutate, isPending } = useDeleteTechnicalSkill()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!technologyId ? 'Eliminar Habilidades Técnicas' : '¿Eliminar habilidad técnica?'}
        subtitle={!technologyId
          ? 'Aquí podras seleccionar que habilidad técnica deseas eliminar.'
          : ''
        }
        variant={!technologyId ? 'close-only' : 'back-close'}
        onBack={() => setTechnologyId(null)}
        intent={!technologyId ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="py-2">
          {!technologyId ? (
            <ListSkills<TechnicalSkillResponse>
              queryKey={['user', 'skills', 'technical']}
              route="skills"
              renderItem={(item) => <CardTechnicalSkill {...item} />}
              action={(item: any) => setTechnologyId(item.id)}
            />
          ) : (
            <div className="flex flex-col gap-2">
              <p>¿Estás seguro de que deseas eliminar la habilidad técnica registrada?</p>
              <p>Puedes crear nuevos mas tarde.</p>
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!technologyId ? 'close-only' : 'delete-cancel'}
        disabled={isPending}
        loading={isPending}
        onConfirm={() => {
          if (!technologyId) return

          mutate(technologyId, {
            onSuccess: () => {
              setTechnologyId(null)
            }
          })
        }}
      />
    </Modal>
  )
}
