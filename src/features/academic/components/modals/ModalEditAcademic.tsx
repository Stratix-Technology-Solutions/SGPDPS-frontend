import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { FormAcademic } from '../form/FormAcademic'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse, CheckDuplicateResponse } from '../../dtos/academic.interface'
import { Modal } from '../../../../shared/components/Modal'
import { useCheckDuplicateAcademicExperience } from '../../hooks/useCheckAcademicExperience'

import type { AcademicDto } from '../../dtos/academic.dto'

interface Props {
  onClose: () => void
}

export const ModalEditAcademic = ({ onClose }: Props) => {
  const { data, isLoading, update } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)
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
    if (!selected) return

    setPendingValues(values)

    checkDuplicate(
      { data: values, excludeId: selected.id },
      {
        onSuccess: (result) => {
          if (result.is_duplicate || result.is_overlapping) {
            setCheckResult(result)
            setShowWarning(true)
            return
          }

          update.mutate(
            { id: selected.id, dto: values },
            { onSuccess: onClose },
          )
        },
      },
    )
  }

  const handleContinue = () => {
    if (!selected || !pendingValues) return

    update.mutate(
      { id: selected.id, dto: pendingValues },
      { onSuccess: onClose },
    )
  }

  const handleCloseWarning = () => {
    resetCheck()
    setShowWarning(false)
  }

  const warningMessage = checkResult?.is_duplicate
    ? 'Ya existe una experiencia académica con los mismos datos. Si continúas, se actualizará de todos modos.'
    : checkResult?.is_overlapping
      ? 'Ya existe una experiencia académica que se solapa con este rango de fechas. Si continúas, se actualizará de todos modos.'
      : 'No se pudo verificar la experiencia académica.'

  return (
    <>
      {selected ? (
        <Modal
          title="Editar experiencia académica"
          onClose={onClose}
        >
          {!showWarning ? (
            <FormAcademic
              onCancel={() => setSelected(null)}
              onSubmit={handleSubmit}
              isPending={isChecking || update.isPending}
              submitLabel="Actualizar"
              serverError={update.isError
                ? (update.error?.response?.data?.message ?? 'Ocurrió un error al actualizar')
                : isCheckError
                  ? (checkError?.response?.data?.message ?? 'No se pudo verificar la experiencia académica')
                  : undefined
              }
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
          ) : (
            null
          )}
        </Modal>
      ) : (
        <Modal
          title="Selecciona una experiencia para editar"
          onClose={onClose}
        >
          <AcademicList
            data={data?.data}
            isLoading={isLoading}
            onSelect={setSelected}
            itemClassName="hover:border-gray-500 hover:bg-gray-50"
          />
        </Modal>
      )}

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
                disabled={update.isPending}
                onClick={handleContinue}
                className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white cursor-pointer disabled:bg-neutral-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {update.isPending ? 'Guardando...' : 'Continuar'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
