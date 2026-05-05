import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { useCreateWorkExperience } from '../hooks/useCreateWorkExperience'
import { useCheckDuplicateWorkExperience } from '../hooks/useCheckWorkExperience'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import type { WorkExperienceFormValues } from '../dtos/workExperience'
import { defaultValues } from '../dtos/workExperience'

interface Props {
  onClose: () => void
}

export const ModalCreate = ({ onClose }: Props) => {
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

    check(formData, {
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
    <>
      <Modal
        title="Agregar Experiencia Laboral"
        description="Ingresa los datos del trabajo que deseas agregar a tu portafolio profesional."
        onClose={onClose}
      >
        <WorkExperienceForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isPending={isPendingCheck || isPending}
          isError={isErrorCheck}
          errorMessage={errorCheck?.response?.data?.message}
        />
      </Modal>

      {showWarning && (
        <Modal
          title="Advertencia"
          description="Se encontraron posibles coincidencias. Revisa el mensaje antes de continuar."
          onClose={handleCloseWarning}
        >
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              {warningMessage}
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseWarning}
                className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleContinue}
                className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white cursor-pointer disabled:bg-neutral-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? 'Guardando...' : 'Continuar'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
