import { useState } from 'react'
import { ListSkills } from '../ListSkills'
import type { SoftSkillResponse } from '../../interfaces/soft.interface'
import { CardSoftSkill } from '../CardSoftSkill'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { useDeleteSoftSkill } from '../../hooks/useDeleteSoftSkill'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDeleteSoftSkill = ({ isOpen, onClose }: Props) => {
  const [softId, setSoftId] = useState(null)
  const { mutate, isPending } = useDeleteSoftSkill()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!softId ? 'Eliminar Habilidades Blandas' : '¿Eliminar habilidad blanda?'}
        subtitle={!softId
          ? 'Aquí podras seleccionar que habilidad blanda deseas eliminar.'
          : ''
        }
        variant={!softId ? 'close-only' : 'back-close'}
        onBack={() => setSoftId(null)}
        intent={!softId ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="py-2">
          {!softId ? (
            <ListSkills<SoftSkillResponse>
              queryKey={['user', 'skills', 'soft']}
              route="soft-skills"
              renderItem={(item) => <CardSoftSkill {...item} />}
              action={(item: any) => setSoftId(item.id)}
            />
          ) : (
            <div className="flex flex-col gap-2">
              <p>¿Estás seguro de que deseas eliminar la habilidad blanda registrada?</p>
              <p>Puedes crear nuevos mas tarde.</p>
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!softId ? 'close-only' : 'delete-cancel'}
        disabled={isPending}
        loading={isPending}
        onConfirm={() => {
          if (softId) {
            mutate(softId, {
              onSuccess: () => {
                setSoftId(null)
              }
            })
          }
        }}
      />
    </Modal>
  )
}
