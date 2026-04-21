import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { FormAcademic } from '../form/FormAcademic'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { Modal } from '../../../../shared/components/Modal'

interface Props {
  onClose: () => void
}

export const ModalEditAcademic = ({ onClose }: Props) => {
  const { data, isLoading, update } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <>
      {selected ? (
        <Modal
          title="Editar experiencia académica"
          onClose={onClose}
        >
          <FormAcademic
            onCancel={() => setSelected(null)}
            onSubmit={(values) => {
              console.log('onSubmit called', values)
              update.mutate(
                { id: selected.id, dto: values },
                {
                  onSuccess: onClose,
                  onError: (err) => console.error('update error', err)
                }
              )
            }}
            isPending={update.isPending}
            submitLabel="Actualizar"
            serverError={update.isError ? (update.error?.response?.data?.message ?? 'Ocurrió un error al actualizar') : undefined}
            defaultValues={{
              title: selected.title,
              institution: selected.institution,
              start_date: selected.start_date,
              end_date: selected.end_date,
              type: selected.type,
              description: selected.description,
              is_visible: selected.is_visible,
            }}
          />
        </Modal>
      ) : (
        <Modal
          title="Selecciona una experiencia para editar"
          onClose={onClose}
        >
          <AcademicList
            data={data?.data}
            isLoading={isLoading}
            onSelect={setSelected}
            itemClassName="hover:border-gray-500 hover:bg-gray-50"
          />
        </Modal>
      )}
    </>
  )
}
