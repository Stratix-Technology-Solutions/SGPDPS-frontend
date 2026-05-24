import { useState } from 'react'
import { FormAcademic } from '../form/FormAcademic'
import { useAcademic } from '../../hooks/useAcademic'
import { useCheckDuplicateAcademicExperience } from '../../hooks/useCheckAcademicExperience'
import type { CheckDuplicateResponse } from '../../dtos/academic.interface'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import type { AcademicDto } from '../../dtos/academic.dto'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddAcademic = ({ isOpen, onClose }: Props) => {
  const { create } = useAcademic()
  const [showWarning, setShowWarning] = useState(false)
  const [pendingValues, setPendingValues] = useState<AcademicDto | null>(null)
  const [checkResult, setCheckResult] = useState<CheckDuplicateResponse | null>(null)
  const {
    mutate: checkDuplicate,
    isPending: isChecking,
    isError: isCheckError,
    error: checkError,
    reset: resetCheck,
  } = useCheckDuplicateAcademicExperience()

  const handleSubmit = (values: AcademicDto) => {
    setPendingValues(values)

    checkDuplicate({ data: values }, {
      onSuccess: (result) => {
        if (result.is_duplicate || result.is_overlapping) {
          setCheckResult(result)
          setShowWarning(true)
          return
        }

        create.mutate(values, { onSuccess: onClose })
      },
    })
  }

  const handleContinue = () => {
    if (!pendingValues) return
    create.mutate(pendingValues, { onSuccess: onClose })
  }

  const handleCloseWarning = () => {
    resetCheck()
    setShowWarning(false)
  }

  const warningMessage = checkResult?.is_duplicate
    ? 'Ya existe una experiencia académica con los mismos datos. Si continúas, se guardará de todos modos.'
    : checkResult?.is_overlapping
      ? 'Ya existe una experiencia académica que se solapa con este rango de fechas. Si continúas, se guardará de todos modos.'
      : 'No se pudo verificar la experiencia académica.'

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title={!showWarning
          ? 'Registrar experiencia académica'
          : 'Advertencia'
        }
        subtitle={!showWarning
          ? 'Agrega formaciones complementarias fuera de tu formación académica formal.'
          : 'Se encontraron posibles coincidencias. Revisa el mensaje antes de continuar.'}
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {!showWarning ? (
            <>
              {isCheckError && (
                <BannerMessageError
                  message={
                    checkError?.response?.data?.message ?? 'Surgió un error al guardar la experiencia laboral.'
                  }
                />
              )}

              <FormAcademic
                formId="academic-form-create"
                submit={handleSubmit}
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
        formId={!showWarning ? 'academic-form-create' : undefined}
        onConfirm={showWarning ? handleContinue : undefined}
        variant="confirm-cancel"
        confirmText={showWarning ? 'Continuar' : 'Guardar'}
        intent={showWarning ? 'warning' : 'primary'}
        loading={create.isPending || isChecking}
        disabled={create.isPending || isChecking}
        onCancel={showWarning ? handleCloseWarning : onClose}
      />
    </Modal>
  )
}
