import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { FormAcademic } from '../form/FormAcademic'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { CloseButton } from '../../../../shared/components/CloseButton'

interface Props {
  onClose: () => void
}

export const ModalEditAcademic = ({ onClose }: Props) => {
  const { data, isLoading, update } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {selected ? (
          <>
            <div className="flex items-center gap-3">
              <button onClick={() => setSelected(null)} className="text-sm text-neutral-medium/70 hover:text-background-dark cursor-pointer">
                ← Volver
              </button>
              <h2 className="text-xl font-semibold text-background-dark">Editar experiencia académica</h2>
            </div>

            <FormAcademic
              onCancel={() => setSelected(null)}
              onSubmit={(values) => { console.log('onSubmit called', values); update.mutate({ id: selected.id, dto: values }, { onSuccess: onClose, onError: (err) => console.error('update error', err) }) }}
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
          </>
        ) : (
          <>
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-background-dark">Selecciona una experiencia para editar</h3>
              </div>
              <CloseButton onClick={onClose} />
            </div>
            <AcademicList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-gray-500 hover:bg-gray-50"
            />
          </>
        )}
      </div>
    </div>
  )
}
