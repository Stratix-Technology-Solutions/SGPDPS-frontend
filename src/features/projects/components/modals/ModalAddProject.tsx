import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../../shared/components/modal'
import { FormProject } from '../form/FormProject'
import { useCreateProject } from '../../hooks/useProjects'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalAddProject = ({ isOpen, onClose }: Props) => {
  const { mutate: create, isPending, isError, error } = useCreateProject({ onClose })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Registrar proyecto personal"
        subtitle="Registra los datos principales, roles y tecnologías para mostrar el proyecto en tu portafolio."
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {isError && (
            <BannerMessageError
              message={error.response?.data?.message
                || 'Surgió un error durante el registro del proyecto'
              }
            />
          )}

          <FormProject
            formId="project-form-create"
            submit={create}
          />
        </div>
      </ModalBody>

      <ModalFooter
        formId="project-form-create"
        loading={isPending}
        disabled={isPending}
      />
    </Modal>
  )
}
