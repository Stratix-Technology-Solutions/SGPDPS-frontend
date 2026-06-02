import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modalBase'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import type { WorkExperience } from '../dtos/workExperience'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalView = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<WorkExperience | null>(null)
  const { data, isLoading } = useWorkExperiences()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={selected
          ? 'Detalle de Experiencia Laboral'
          : 'Experiencias Laborales'
        }
        subtitle={selected
          ? 'Información detallada de la experiencia seleccionada.'
          : 'Selecciona una experiencia para ver su detalle.'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="py-2">
          {!selected ? (
            <WorkExperienceList
              data={data}
              isLoading={isLoading}
              onSelect={setSelected}
            />
          ) : (
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
                </div>
              </div>
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant="close-only"
        cancelText={selected ? 'Volver atrás' : 'Cerrar'}
        onCancel={selected ? () => {setSelected(null)} : onClose}
      />
    </Modal>
  )
}
