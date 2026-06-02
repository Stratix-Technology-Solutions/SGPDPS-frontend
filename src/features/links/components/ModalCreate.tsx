import { useForm } from '@tanstack/react-form'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modalBase'
import { defaultValues, LinkSchema } from '../dtos/links.dto'
import { useCreateLink } from '../hooks/useCreateLink'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { InputMessageError } from '../../../shared/components/InputMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreate = ({ isOpen, onClose }: Props) => {
  const { mutate: create, error, isPending, isError } = useCreateLink()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: LinkSchema },
    onSubmit: ({ value }) => {
      create(value, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Crear Enlace"
        subtitle="Aquí podrás agregar un nuevo enlace a tu perfil"
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {isError && (
            <BannerMessageError
              message={error.response?.data?.message
                || 'Surgió un error al guardar el enlace'
              }
            />
          )}

          <form
            id="link-form"
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(e)
            }}
          >
            <form.Field
              name="url"
              children={(field) => (
                <div className="flex flex-col gap-2">
                  <label htmlFor="url" className="font-semibold text-background-dark">Enlace</label>
                  <input
                    id="url"
                    name={field.name}
                    placeholder="https://www.ejemplo.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
                    required
                  />
                  {!field.state.meta.isValid && (
                    <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
                  )}
                </div>
              )}
            />
          </form>
        </div>
      </ModalBody>

      <ModalFooter
        formId="link-form"
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
