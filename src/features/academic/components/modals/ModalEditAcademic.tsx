import { useState } from 'react'
import { useAcademic } from '../../hooks/useAcademic'
import { FormAcademic } from '../form/FormAcademic'
import { AcademicList } from '../AcademicList'
import type { AcademicExperienceResponse, CheckDuplicateResponse } from '../../dtos/academic.interface'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modalBase'
import { useCheckDuplicateAcademicExperience } from '../../hooks/useCheckAcademicExperience'
import type { AcademicDto } from '../../dtos/academic.dto'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalEditAcademic = ({ isOpen, onClose }: Props) => {
  const { data, isLoading, update } = useAcademic()
  const [selected, setSelected] = useState<AcademicExperienceResponse | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [pendingValues, setPendingValues] = useState<Partial<AcademicDto> | null>(null)
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

    const editableValues: Partial<AcademicDto> = {
      start_date: values.start_date,
      end_date: values.end_date,
      // type: values.type,
      description: values.description,
      is_visible: values.is_visible,
    }

    setPendingValues(editableValues)

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
            { id: selected.id, dto: editableValues },
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

  const title = selected
    ? 'Editar experiencia académica'
    : showWarning
      ? 'Advertencia'
      : 'Selecciona una experiencia para editar'

  const subtitle = selected
    ? 'Modifica los datos de la experiencia seleccionada.'
    : showWarning
      ? 'Se encontraron posibles coincidencias. Revisa el mensaje antes de continuar.'
      : 'Selecciona la experiencia académica que deseas editar.'

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
            <AcademicList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-gray-500 hover:bg-gray-50"
            />
          ) : !showWarning ? (
            <>
              {isCheckError && (
                <BannerMessageError
                  message={
                    checkError?.response?.data?.message ?? 'Surgió un error al guardar la experiencia laboral.'
                  }
                />
              )}

              <FormAcademic
                formId="academic-form-update"
                submit={handleSubmit}
                lockIdentityFields
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
            </>
          ) : (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              {warningMessage}
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        formId={!showWarning ? 'academic-form-update' : undefined}
        onConfirm={showWarning ? handleContinue : undefined}
        variant={selected ? 'confirm-cancel' : 'close-only'}
        confirmText={showWarning ? 'Continuar' : 'Guardar'}
        intent={showWarning ? 'warning' : 'primary'}
        loading={update.isPending || isChecking}
        disabled={update.isPending || isChecking}
        onCancel={showWarning ? handleCloseWarning : onClose}
      />
    </Modal>
  )
}
