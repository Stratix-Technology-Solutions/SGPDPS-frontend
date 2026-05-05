import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { WorkExperienceList } from '../components/WorkExperienceList'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
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
  const [preventModal, setPreventModal] = useState(false)
  const [data, setData] = useState<WorkExperienceFormValues | null>(null)

  const { data: list, isLoading } = useWorkExperiences()

  const {
    mutate: update,
    error,
    isPending,
    isError,
    reset,
  } = useUpdateWorkExperience({ onClose })

  const {
    mutate: check,
    error: errorCheck,
    isPending: isPendingCheck,
    isError: isErrorCheck,
  } = useCheckDuplicateWorkExperience()

  const [checkResult, setCheckResult] = useState<{
    is_duplicate: boolean
    is_overlapping: boolean
  } | null>(null)

  const checkData = (formData: WorkExperienceFormValues) => {
    if (!selected) return
    setData(formData)

    check(
      { ...formData, exclude_id: Number(selected.id) },
      {
        onSuccess: (res) => {
          if (res.is_duplicate || res.is_overlapping) {
            setCheckResult(res)
            setPreventModal(true)
          } else {
            update({ id: selected.id, data: formData })
          }
        },
        onError: () => {
          setPreventModal(true)
        },
      },
    )
  }

  const handleContinue = () => {
    if (!selected || !data) return
    update({ id: selected.id, data })
  }

  return (
    <Modal
      title={
        selected
          ? preventModal
            ? 'Confirmar Edición'
            : 'Editar Experiencia Laboral'
          : 'Seleccionar Experiencia Laboral'
      }
      description={
        selected
          ? preventModal
            ? checkResult?.is_duplicate
              ? 'Ya existe una experiencia con estos datos exactos.'
              : checkResult?.is_overlapping
                ? 'Ya tienes una experiencia con el mismo cargo y empresa.'
                : 'No se pudo verificar los datos.'
            : 'Modifica los datos de la experiencia seleccionada.'
          : 'Selecciona la experiencia laboral que deseas editar.'
      }
      onClose={onClose}
    >
      {!selected && (
        <WorkExperienceList
          data={list}
          isLoading={isLoading}
          onSelect={setSelected}
          itemClassName="hover:border-primary hover:bg-neutral-50"
        />
      )}

      {selected && !preventModal && (
        <WorkExperienceForm
          initialValues={{
            company: selected.company,
            position: selected.position,
            description: selected.description,
            start_date: selected.start_date,
            end_date: selected.end_date,
            is_visible: selected.is_visible,
          }}
          onSubmit={checkData}
          onCancel={onClose}
          isPending={isPendingCheck}
          isError={isError}
          errorMessage={error?.response?.data?.message}
        />
      )}

      {selected && preventModal && (
        <div className="space-y-4">
          {isErrorCheck && (
            <BannerMessageError
              message={
                errorCheck?.response?.data?.message ??
                'No se pudo verificar duplicados.'
              }
            />
          )}
          {isError && (
            <BannerMessageError
              message={
                error?.response?.data?.message ??
                'No se pudo guardar la experiencia.'
              }
            />
          )}
          <p>
            {checkResult?.is_duplicate
              ? 'Ya existe una experiencia laboral con estos datos exactos.'
              : checkResult?.is_overlapping
                ? 'Ya tienes una experiencia laboral con el mismo cargo y empresa.'
                : 'No se pudo verificar los datos.'}{' '}
            ¿Deseas continuar de todas formas?
          </p>

          <div className="flex justify-end gap-4 pt-3">
            <button
              type="button"
              onClick={() => {
                reset()
                setPreventModal(false)
              }}
              className="px-4 py-2 rounded-md border hover:bg-neutral-light"
            >
              Volver
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={handleContinue}
              className="px-4 py-2 rounded-md bg-primary text-white disabled:opacity-60"
            >
              {isPending ? 'Guardando...' : 'Continuar'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
