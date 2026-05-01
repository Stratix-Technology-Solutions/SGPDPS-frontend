import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Modal } from '../../../shared/components/Modal'
import { defaultValues, LinkSchema } from '../dtos/links.dto'
import { useGetLinks } from '../hooks/useGetLink'
import { useUpdateLink } from '../hooks/useUpdateLink'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { LinkList } from './LinkList'
import type { LinkResponse } from '../interfaces/link.interface'

interface Props {
  onClose: () => void
}

export const ModalEdit = ({ onClose }: Props) => {
  const [selected, setSelected] = useState<LinkResponse | null>(null)
  const { data, isLoading } = useGetLinks()
  const { mutate: update, error, isPending, isError } = useUpdateLink({ onClose })

  const form = useForm({
    defaultValues,
    validators: { onSubmit: LinkSchema },
    onSubmit: ({ value }) => {
      if (!selected) return
      update({ id: selected.id.toString(), data: value })
    }
  })

  return (
    <Modal
      title={
        selected
          ? 'Editar Enlace'
          : 'Seleccionar Enlace'
      }
      description={
        selected
          ? 'Modifica la URL del enlace seleccionado.'
          : 'Selecciona el enlace que deseas editar.'
      }
      onClose={onClose}
    >
      {!selected && (
        <LinkList
          data={data?.data}
          isLoading={isLoading}
          onSelect={(link) => {
            setSelected(link)
            form.setFieldValue('url', link.url)
          }}
          itemClassName="hover:border-primary hover:bg-neutral-50"
        />
      )}

      {selected && (
        <>
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
                    type="url"
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
                onClick={() => setSelected(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
              >
                Volver
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
        </>
      )}
    </Modal>
  )
}
