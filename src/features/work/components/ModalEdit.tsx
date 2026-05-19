import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import { useWorkExperiences } from '../hooks/useWorkExperiences'
import { useUpdateWorkExperience } from '../hooks/useUpdateWorkExperience'
import { useCheckDuplicateWorkExperience } from '../hooks/useCheckWorkExperience'
import type {
  WorkExperience,
  WorkExperienceFormValues,
} from '../dtos/workExperience'

interface Props {
  onClose: () => void
}

export const ModalEdit = ({ onClose }: Props) => {
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
    : 'Seleccionar Experiencia Laboral'

  const description = selected
    ? 'Modifica los datos de la experiencia seleccionada.'
    : 'Selecciona la experiencia laboral que deseas editar.'

  return (
    <>
      <Modal title={title} description={description} onClose={onClose}>
        {!selected && (
          <WorkExperienceList
            data={list}
            isLoading={isLoading}
            onSelect={setSelected}
            itemClassName="hover:border-primary hover:bg-neutral-50"
          />
        )}

        {selected && !showWarning && (
          <WorkExperienceForm
            initialValues={{
              company: selected.company,
              position: selected.position,
              description: selected.description,
              start_date: selected.start_date,
              end_date: selected.end_date,
            }}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isPending={isPendingCheck || isPending}
            isError={isErrorCheck}
            errorMessage={errorCheck?.response?.data?.message}
          />
        )}
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
