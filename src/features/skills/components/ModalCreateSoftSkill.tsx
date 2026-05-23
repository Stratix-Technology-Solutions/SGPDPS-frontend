import { useForm } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { SoftSchema, defaultValues } from '../dtos/soft.dto'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modal'
import { useCreateSoftSKill } from '../hooks/useCreateSoftSkill'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreateSoftSkill = ({ isOpen, onClose }: Props) => {
  const { mutate: create, error, isPending, isError } = useCreateSoftSKill()
  const form = useForm({
    defaultValues,
    validators: { onSubmit: SoftSchema },
    onSubmit: ({ value }) => {
      create(value, {
        onSuccess: () => {
          onClose()
        }
      })
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Crear Habilidad Blanda"
        subtitle="Aquí podrás agregar la habilidad blanda que te caracterice."
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {isError && (
            <BannerMessageError
              message={error.response?.data?.message
                || 'Surgió un error durante el registro de la habilidad blanda'
              }
            />
          )}

          <form
            id="soft-skill-form"
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit(e)
            }}
          >
            <form.Field
              name="name"
              children={(field) => (
                <div>
                  <label className="block font-semibold text-background-dark mb-1.5">Habilidad blanda</label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Ingrese su habilidad blanda"
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
        formId="soft-skill-form"
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
