import { useState } from 'react'
import { FormAcademic } from '../form/FormAcademic'
import { useAcademic } from '../../hooks/useAcademic'
import { useCheckDuplicateAcademicExperience } from '../../hooks/useCheckAcademicExperience'
import type { CheckDuplicateResponse } from '../../dtos/academic.interface'
import { Modal } from '../../../../shared/components/Modal'
import type { AcademicDto } from '../../dtos/academic.dto'

interface Props {
  onClose: () => void
}

export const ModalAddAcademic = ({ onClose }: Props) => {
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
    <>
      <Modal
        title="Registrar experiencia académica"
        description="Agrega cursos, talleres, seminarios, capacitaciones o certificados fuera de tu formación académica formal."
        onClose={onClose}
      >
        <FormAcademic
          onCancel={onClose}
          submitLabel="Guardar"
          onSubmit={handleSubmit}
          isPending={isChecking || create.isPending}
          serverError={create.isError
            ? (create.error?.response?.data?.message ?? 'Ocurrió un error al guardar la experiencia académica')
            : isCheckError
              ? (checkError?.response?.data?.message ?? 'No se pudo verificar la experiencia académica')
              : undefined
          }
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
                disabled={create.isPending}
                onClick={handleContinue}
                className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white cursor-pointer disabled:bg-neutral-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {create.isPending ? 'Guardando...' : 'Continuar'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
