import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modalBase'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import { useUpdateWorkExperience } from '../hooks/useUpdateWorkExperience'
import { useCheckDuplicateWorkExperience } from '../hooks/useCheckWorkExperience'
import type {
  WorkExperience,
  WorkExperienceFormValues,
} from '../dtos/workExperience'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalEdit = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<WorkExperience | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [pendingValues, setPendingValues] =
    useState<WorkExperienceFormValues | null>(null)
  const [checkResult, setCheckResult] = useState<{
    is_duplicate: boolean
    is_overlapping: boolean
  } | null>(null)

  const { data: list, isLoading } = useWorkExperiences()
  const { mutate: update, isPending } = useUpdateWorkExperience({ onClose })

  const {
    mutate: check,
    isPending: isPendingCheck,
    isError: isErrorCheck,
    error: errorCheck,
    reset: resetCheck,
  } = useCheckDuplicateWorkExperience()

  const handleSubmit = (formData: WorkExperienceFormValues) => {
    if (!selected) return
    setPendingValues(formData)

    check(
      { data: formData, excludeId: selected.id },
      {
        onSuccess: (res) => {
          if (res.is_duplicate || res.is_overlapping) {
            setCheckResult(res)
            setShowWarning(true)
            return
          }

          update({ id: selected.id, data: formData })
        },
      },
    )
  }

  const handleContinue = () => {
    if (!selected || !pendingValues) return
    update({ id: selected.id, data: pendingValues })
  }

  const handleCloseWarning = () => {
    resetCheck()
    setShowWarning(false)
  }

  const warningMessage = checkResult?.is_duplicate
    ? 'Ya existe una experiencia laboral con estos datos exactos. Si continúas, se actualizará de todos modos.'
    : checkResult?.is_overlapping
      ? 'Ya tienes una experiencia laboral que se solapa con este rango de fechas. Si continúas, se actualizará de todos modos.'
      : 'No se pudo verificar la experiencia laboral.'

  const title = selected
    ? 'Editar Experiencia Laboral'
    : showWarning
      ? 'Advertencia'
      : 'Seleccionar Experiencia Laboral'

  const subtitle = selected
    ? 'Modifica los datos de la experiencia seleccionada.'
    : showWarning
      ? 'Se encontraron posibles coincidencias. Revisa el mensaje antes de continuar.'
      : 'Selecciona la experiencia laboral que deseas editar.'

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={title}
        subtitle={subtitle}
        intent={showWarning ? 'warning' : 'default'}
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!selected ? (
            <WorkExperienceList
              data={list}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-primary hover:bg-neutral-50"
            />
          ) : !showWarning ? (
            <>
              {isErrorCheck && (
                <BannerMessageError
                  message={
                    errorCheck?.response?.data?.message ?? 'Surgió un error al editar la experiencia laboral.'
                  }
                />
              )}

              <WorkExperienceForm
                formId='work-form-update'
                submit={handleSubmit}
                initialValues={{
                  company: selected.company,
                  position: selected.position,
                  description: selected.description,
                  start_date: selected.start_date,
                  end_date: selected.end_date,
                }}
              />
            </>
          ) : (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              {warningMessage}
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId={!showWarning ? 'work-form-update' : undefined}
        onConfirm={showWarning ? handleContinue : undefined}
        variant={selected ? 'confirm-cancel' : 'close-only'}
        confirmText={showWarning ? 'Continuar' : 'Guardar'}
        intent={showWarning ? 'warning' : 'primary'}
        loading={isPending || isPendingCheck}
        disabled={isPending || isPendingCheck}
        onCancel={showWarning ? handleCloseWarning : onClose}
      />
    </Modal>
  )
}
