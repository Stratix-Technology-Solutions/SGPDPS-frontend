import { useState } from 'react'
import { useCreateWorkExperience } from '../hooks/useCreateWorkExperience'
import { useCheckDuplicateWorkExperience } from '../hooks/useCheckWorkExperience'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import type { WorkExperienceFormValues } from '../dtos/workExperience'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modalBase'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreate = ({ isOpen, onClose }: Props) => {
  const [showWarning, setShowWarning] = useState(false)
  const [pendingValues, setPendingValues] = useState<WorkExperienceFormValues | null>(null)
  const [checkResult, setCheckResult] = useState<{
    is_duplicate: boolean
    is_overlapping: boolean
  } | null>(null)

  const {
    mutate: create,
    isPending,
  } = useCreateWorkExperience({ onClose })

  const {
    mutate: check,
    isPending: isPendingCheck,
    isError: isErrorCheck,
    error: errorCheck,
    reset: resetCheck,
  } = useCheckDuplicateWorkExperience()

  const handleSubmit = (formData: WorkExperienceFormValues) => {
    setPendingValues(formData)

    check({ data: formData }, {
      onSuccess: (res) => {
        if (res.is_duplicate || res.is_overlapping) {
          setCheckResult(res)
          setShowWarning(true)
          return
        }

        create(formData)
      },
    })
  }

  const handleContinue = () => {
    if (!pendingValues) return
    create(pendingValues)
  }

  const handleCloseWarning = () => {
    resetCheck()
    setShowWarning(false)
  }

  const warningMessage = checkResult?.is_duplicate
    ? 'Ya existe una experiencia laboral con estos datos exactos. Si continúas, se guardará de todos modos.'
    : checkResult?.is_overlapping
      ? 'Ya existe una experiencia laboral que se solapa con este rango de fechas. Si continúas, se guardará de todos modos.'
      : 'No se pudo verificar la experiencia laboral.'

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={showWarning ? 'Advertencia' : 'Agregar Experiencia Laboral'}
        subtitle={showWarning
          ? 'Se encontraron posibles coincidencias. Revisa el mensaje antes de continuar.'
          : 'Ingresa los datos del trabajo que deseas agregar a tu portafolio profesional.'
        }
        intent={showWarning ? 'warning' : 'default'}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {showWarning ? (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              {warningMessage}
            </div>
          ) : (
            <>
              {isErrorCheck && (
                <BannerMessageError
                  message={
                    errorCheck?.response?.data?.message ?? 'Surgió un error al guardar la experiencia laboral.'
                  }
                />
              )}

              <WorkExperienceForm
                formId="work-form-create"
                submit={handleSubmit}
              />
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId={!showWarning ? 'work-form-create' : undefined}
        onConfirm={showWarning ? handleContinue : undefined}
        variant="confirm-cancel"
        confirmText={showWarning ? 'Continuar' : 'Guardar'}
        intent={showWarning ? 'warning' : 'primary'}
        loading={isPending || isPendingCheck}
        disabled={isPending || isPendingCheck}
        onCancel={showWarning ? handleCloseWarning : onClose}
      />
    </Modal>
  )
}
