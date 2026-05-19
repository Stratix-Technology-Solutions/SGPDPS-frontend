import { useState } from 'react'
import { Modal } from '../../../../shared/components/Modal'
import { useAcademicFormation } from '../../hooks/useAcademicFormation'
import { AcademicFormationList } from '../AcademicFormationList'
import { FormAcademicFormation } from '../form/FormAcademicFormation'
import type { AcademicFormationDto } from '../../dtos/academicFormation.dto'
import type { AcademicFormationResponse } from '../../dtos/academicFormation.interface'

interface Props {
  onClose: () => void
}

export const ModalEditAcademicFormation = ({ onClose }: Props) => {
  const { data, isLoading, update } = useAcademicFormation()
  const [selected, setSelected] = useState<AcademicFormationResponse | null>(null)

  const handleSubmit = (values: AcademicFormationDto) => {
    if (!selected) return

    update.mutate(
      { id: selected.id, dto: values },
      { onSuccess: onClose },
    )
  }

  if (!selected) {
    return (
      <Modal
        title="Selecciona una formación para editar"
        description="Elige la formación académica que deseas actualizar."
        onClose={onClose}
      >
        <AcademicFormationList
          data={data?.data}
          isLoading={isLoading}
          onSelect={setSelected}
          itemClassName="hover:border-primary hover:bg-neutral-50"
        />
      </Modal>
    )
  }

  return (
    <Modal
      title="Editar formación académica"
      description="Modifica los datos de la formación seleccionada."
      onClose={onClose}
    >
      <FormAcademicFormation
        onCancel={() => setSelected(null)}
        onSubmit={handleSubmit}
        isPending={update.isPending}
        submitLabel="Actualizar"
        serverError={update.error?.response?.data?.message ?? (update.isError ? 'Ocurrió un error al actualizar la formación académica' : undefined)}
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
    </Modal>
  )
}
