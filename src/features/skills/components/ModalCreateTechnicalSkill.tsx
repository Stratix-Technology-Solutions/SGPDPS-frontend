import { useForm } from '@tanstack/react-form'
import { TechnicalSchema, defaultValues } from '../dtos/technical.dto'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import type { TechnicalDto } from '../dtos/technical.dto'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modal'
import { AutocompleteInput } from './AutoCompleteInput'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreateTechnicalSkill = ({ isOpen, onClose }: Props) => {
  const queryClient = useQueryClient()

  const { mutate: create, error, isPending, isError } = useMutation<TechnicalDto, ApiError, unknown>({
    mutationFn: async (data) => {
      const res = await api.post('/skills', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'technical'],
      })
      onClose()
    },
  })

  const { data } = useQuery<{ name: string }[], ApiError>({
    queryKey: ['skills', 'system'],
    queryFn: async () => {
      const res = await api.get('/skills/list-all')
      return res.data
    },
  })

  const form = useForm({
    defaultValues,
    validators: { onSubmit: TechnicalSchema },
    onSubmit: ({ value }) => {
      create(value)
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader
        title="Crear Habilidad Técnica"
        subtitle="Aquí podrás agregar tecnologías y tu nivel."
      />

      <ModalBody>
        <div className="flex flex-col gap-4 py-2">
          {isError && (
            <BannerMessageError
              message={error.response?.data?.message ||
                 'Surgió un error durante el registro de la habilidad técnica'
              }
            />
          )}

          <form
            id="technical-skill-form"
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
                  <label className="block font-semibold text-background-dark mb-1.5">
                    Habilidad técnica
                  </label>

                  <AutocompleteInput
                    value={field.state.value}
                    onChange={field.handleChange}
                    options={data?.map(item => item.name) ?? []}
                    placeholder="Ingrese su habilidad técnica"
                  />

                  {!field.state.meta.isValid && (
                    <InputMessageError
                      message={field.state.meta.errors
                        .map(e => e?.message)
                        .join(', ')}
                    />
                  )}
                </div>
              )}
            />

            <form.Field
              name="domain_level"
              children={(field) => (
                <div>
                  <label className="block font-semibold text-background-dark mb-1.5">
                    Nivel de dominio
                  </label>

                  <select
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
                  >
                    <option>Seleccionar</option>
                    <option value="Básico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>

                  {!field.state.meta.isValid && (
                    <InputMessageError
                      message={field.state.meta.errors
                        .map(e => e?.message)
                        .join(', ')}
                    />
                  )}
                </div>
              )}
            />
          </form>
        </div>
      </ModalBody>

      <ModalFooter
        formId="technical-skill-form"
        disabled={isPending}
        loading={isPending}
      />
    </Modal>
  )
}
