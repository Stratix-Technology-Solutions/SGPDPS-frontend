import { useState } from 'react'
import { Modal } from '../components/Modal'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import type { WorkExperience } from '../dtos/workExperience'

interface Props {
  onClose: () => void
}

export const ModalView = ({ onClose }: Props) => {
  const [selected, setSelected] = useState<WorkExperience | null>(null)
  const { data, isLoading } = useWorkExperiences()

  return (
    <Modal
      title={
        selected ? 'Detalle de Experiencia Laboral' : 'Experiencias Laborales'
      }
      description={
        selected
          ? 'Información detallada de la experiencia seleccionada.'
          : 'Selecciona una experiencia para ver su detalle.'
      }
      onClose={onClose}
      onBack={selected ? () => setSelected(null) : undefined}
    >
      {!selected && (
        <WorkExperienceList
          data={data}
          isLoading={isLoading}
          onSelect={setSelected}
        />
      )}

      {selected && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="mt-1.5 w-3 h-3 rounded-full bg-primary shrink-0" />
            <div className="flex flex-col gap-1 border-l border-neutral-light pl-4 w-full">
              <p className="font-semibold text-background-dark text-lg">
                {selected.position}
              </p>

              <p className="text-primary font-medium">{selected.company}</p>

              <p className="text-sm text-neutral-medium">
                {selected.start_date} — {selected.end_date ?? 'Actualidad'}
              </p>

              {selected.description && (
                <p className="text-sm text-background-dark mt-1">
                  {selected.description}
                </p>
              )}

              <div className="mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${selected.is_visible ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-medium'}`}
                >
                  {selected.is_visible ? 'Visible' : 'Oculto'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
