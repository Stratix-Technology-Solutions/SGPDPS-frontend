import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { AcademicList } from '../AcademicList'
import { ConfirmDeleteAcademic } from '../ConfirmDeleteAcademic'
import type { AcademicExperienceResponse } from '../../dtos/academic.interface'
import { CloseButton } from '../../../../shared/components/CloseButton'

interface Props {
  onClose: () => void
}

export const ModalDeleteAcademic = ({ onClose }: Props) => {
  const { data, isLoading, remove } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5">
        {selected ? (
          <ConfirmDeleteAcademic
            title={selected.title}
            institution={selected.institution}
            isPending={remove.isPending}
            onConfirm={() => remove.mutate(selected.id, { onSuccess: onClose })}
            onCancel={() => setSelected(null)}
          />
        ) : (
          <>
            <div className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-background-dark">Selecciona una experiencia para eliminar</h3>
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
