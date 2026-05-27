import { useState } from 'react'
import type { TechnicalSkillResponse } from '../../interfaces/technical.interface'
import { CardTechnicalSkill } from '..//CardTechnicalSkill'
import { ListSkills } from '..//ListSkills'
import { FormTechnicalSkill } from '..//forms/FormTechnicalSkill'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { useUpdateTechnicalSkill } from '../../hooks/useUpdateTechnicalSkill'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalEditTechnicalSkill = ({ isOpen, onClose }: Props) => {
  const [technology, setTechnology] = useState<TechnicalSkillResponse | null>(null)
  const { mutate, error, isError, isPending } = useUpdateTechnicalSkill()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!technology ? 'Editar Habilidades Técnicas' : 'Editar Habilidad Técnica'}
        subtitle={!technology
          ? 'Aquí podras seleccionar que habilidad técnica deseas editar.'
          : 'Aquí podrás editar el nivel de la tecnología agregada.'
        }
        variant={!technology ? 'close-only' : 'back-close'}
        onBack={() => setTechnology(null)}
      />
      
      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!technology ? (
            <ListSkills<TechnicalSkillResponse>
              queryKey={['user', 'skills', 'technical']}
              route="skills"
              renderItem={(item) => <CardTechnicalSkill {...item} />}
              action={(item: any) => setTechnology(item)}
            />
          ) : (
            <>
              {isError && (
                <BannerMessageError
                  message={error.response?.data?.message
                    || 'Surgió un error durante la actualización de la habilidad técnica'
                  }
                />
              )}

              <FormTechnicalSkill
                formId="technical-skill-form-update"
                initialValues={technology}
                disabledFields
                success={(value) => {
                  if (!technology) return

                  mutate({ id: technology.id, data: value }, {
                    onSuccess: () => {
                      setTechnology(null)
                    },
                  })
                }}
              />
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId="technical-skill-form-update"
        variant={!technology ? 'close-only' : 'confirm-cancel'}
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
