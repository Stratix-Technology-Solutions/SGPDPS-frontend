import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { useCreateWorkExperience } from '../hooks/useCreateWorkExperience'
import { useCheckDuplicateWorkExperience } from '../hooks/useCheckWorkExperience'
import { WorkExperienceForm } from '../components/WorkExperienceForm'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import type { WorkExperienceFormValues } from '../dtos/workExperience'
import { defaultValues } from '../dtos/workExperience'

interface Props {
  onClose: () => void
}

export const ModalCreate = ({ onClose }: Props) => {
  const [preventModal, setPreventModal] = useState(false)
  const [data, setData] = useState(defaultValues)

  const {
    mutate: create,
    error,
    isPending,
    isError,
    reset,
  } = useCreateWorkExperience({ onClose })

  const {
    mutate: check,
    error: errorCheck,
    isPending: isPendingCheck,
    isError: isErrorCheck,
  } = useCheckDuplicateWorkExperience()

  const checkData = (formData: WorkExperienceFormValues) => {
    setData(formData)

    check(formData, {
      onSuccess: (res) => {
        if (res.is_duplicate) {
          setPreventModal(true)
        } else {
          create(formData)
        }
      },
      onError: () => {
        setPreventModal(true)
      },
    })
  }

  const handleContinue = () => {
    create(data)
  }

  return (
    <Modal
      title="Agregar Experiencia Laboral"
      description="Ingresa los datos del trabajo que deseas agregar a tu portafolio profesional."
      onClose={onClose}
    >
      {preventModal ? (
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
            Ya existe una experiencia laboral con estos datos. ¿Deseas continuar
            de todas formas?
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
      ) : (
        <WorkExperienceForm
          onSubmit={checkData}
          onCancel={onClose}
          isPending={isPendingCheck}
          isError={isError}
          errorMessage={error?.response?.data?.message}
        />
      )}
    </Modal>
  )
}
