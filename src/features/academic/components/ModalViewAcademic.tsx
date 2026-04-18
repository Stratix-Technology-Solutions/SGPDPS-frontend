import { useState } from 'react'
import { useAcademic } from '../hooks/useAcademic'
import { AcademicDetail } from './AcademicDetail'
import { AcademicList } from './AcademicList'
import type { AcademicExperienceResponse } from '../dtos/academic.interface'

interface Props {
  onClose: () => void
}

export const ModalViewAcademic = ({ onClose }: Props) => {
  const { data, isLoading } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-4 flex flex-col gap-5">
        {selected ? (
          <AcademicDetail
            item={selected}
            onBack={() => setSelected(null)}
            onClose={onClose}
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold text-background-dark">Selecciona una experiencia para ver</h2>
            <AcademicList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              onClose={onClose}
            />
          </>
        )}
      </div>
    </div>
  )
}
