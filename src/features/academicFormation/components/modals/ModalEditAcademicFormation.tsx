import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import { AcademicFormationList } from '../AcademicFormationList'
import { FormAcademicFormation } from '../form/FormAcademicFormation'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'
import type { AcademicFormationResponse } from '../../dtos/academicFormation.interface'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalEditAcademicFormation = ({ isOpen, onClose }: Props) => {
  const { data, isLoading, update } = useAcademicFormation()
  const [selected, setSelected] = useState<AcademicFormationResponse | null>(null)

  const handleSubmit = (values: AcademicFormationDto) => {
    if (!selected) return

    update.mutate(
      { id: selected.id, dto: values },
      { onSuccess: onClose },
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!selected ? 'Selecciona una formación para editar' : 'Editar formación académica'}
        subtitle={!selected
          ? 'Elige la formación académica que deseas actualizar.'
          : 'Modifica los datos de la formación seleccionada.'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <AcademicFormationList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-primary hover:bg-neutral-50"
            />
          ) : (
            <>
              {update.isError && (
                <BannerMessageError
                  message={update.error?.response?.data?.message ?? 'Ocurrió un error al actualizar la formación académica'}
                />
              )}

              <FormAcademicFormation
                formId="formation-form-update"
                submit={handleSubmit}
                lockIdentityFields
                lockCompletedStatus={selected.status === 'completado'}
                defaultValues={{
                  education_level: selected.education_level,
                  institution: selected.institution,
                  field_of_study: selected.field_of_study,
                  emission_date: selected.emission_date,
                  status: selected.status,
                  description: selected.description,
                  is_visible: selected.is_visible,
                }}
              />
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId="formation-form-update"
        variant={!selected ? 'close-only' : 'confirm-cancel'}
        disabled={update.isPending}
        loading={update.isPending}
      />
    </Modal>
  )
}
