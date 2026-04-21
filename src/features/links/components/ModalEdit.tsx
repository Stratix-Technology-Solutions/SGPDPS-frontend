import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'
import { LinkSchema, type LinkDto } from '../dtos/links.dto'
import { useGetLinks } from '../hooks/useGetLinks'
import { useUpdateLinks } from '../hooks/useUpdateLinks'
import type { LinkResponse } from '../interfaces/link.interface'
import { Modal } from '../../../shared/components/Modal'

interface Props {
  onClose: () => void
}

const LINK_FIELDS = ['link_1', 'link_2', 'link_3', 'link_4'] as const

const buildDefaultValuesFromResponse = (response: LinkResponse | undefined): Record<(typeof LINK_FIELDS)[number], string> => {
  const defaultValues = {
    link_1: '',
    link_2: '',
    link_3: '',
    link_4: '',
  }

  if (!response?.data?.length) {
    return defaultValues
  }

  for (const item of response.data) {
    if (item.slot in defaultValues) {
      defaultValues[item.slot as keyof typeof defaultValues] = item.url ?? ''
    }
  }

  return defaultValues
}

export const ModalEdit = ({ onClose }: Props) => {
  const { data, isLoading } = useGetLinks()
  const { mutate: updateLinks, isPending, isError } = useUpdateLinks()
  const [formError, setFormError] = useState<string | null>(null)

  const defaultValues = buildDefaultValuesFromResponse(data)

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      const patchPayload: LinkDto = {
        link_1: value.link_1.trim(),
        link_2: value.link_2.trim(),
        link_3: value.link_3.trim(),
        link_4: value.link_4.trim(),
      }

      setFormError(null)

      const parsed = LinkSchema.safeParse(patchPayload)

      if (!parsed.success) {
        setFormError(parsed.error.issues[0]?.message ?? 'Revisa los enlaces ingresados')
        return
      }

      updateLinks(patchPayload, {
        onSuccess: () => {
          onClose()
        },
      })
    },
  })

  return (
    <Modal
      title="Editar enlaces"
      onClose={onClose}
    >
      {isLoading && (
        <p className="text-sm text-neutral-medium">Cargando enlaces actuales...</p>
      )}

      {formError && <BannerMessageError message={formError} />}

      {isError && (
        <BannerMessageError message={'Ocurrió un error al actualizar los enlaces'} />
      )}

      <form
        key={data ? 'loaded' : 'loading'}
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="flex flex-col gap-4"
      >
        {LINK_FIELDS.map((fieldName, index) => (
          <form.Field
            key={fieldName}
            name={fieldName}
            children={(field) => (
              <div className="flex flex-col gap-1.5">
                <label htmlFor={field.name} className="text-sm font-medium text-background-dark">
                  Link {index + 1}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="url"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="https://"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
                />
              </div>
            )}
          />
        ))}

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
            {isPending ? <ButtonLoader message="Guardando..." /> : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
