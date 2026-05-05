import { useForm } from '@tanstack/react-form'
import { Modal } from '../../../shared/components/Modal'
import { defaultValues, LinkSchema } from '../dtos/links.dto'
import { useCreateLink } from '../hooks/useCreateLink'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'

interface Props {
  onClose: () => void
}

export const ModalCreate = ({ onClose }: Props) => {
  const { mutate: create, error, isPending, isError } = useCreateLink({ onClose })
  const form = useForm({
    defaultValues,
    validators: { onSubmit: LinkSchema },
    onSubmit: ({ value }) => {
      create(value)
    }
  })
  return (
    <Modal
      title="Crear Enlace"
      description="Aquí podrás agregar un nuevo enlace a tu perfil"
      onClose={onClose}
    >
      {isError && (
        <BannerMessageError
          message={error.response?.data?.message
            || 'Surgió un error al guardar el enlace'
          }
        />
      )}
      <form
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

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-primary hover:bg-primary-soft text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? <ButtonLoader message="Guardando..." /> : 'Guardar'}
          </button>
        </div>
      </form>

    </Modal>
  )
}
