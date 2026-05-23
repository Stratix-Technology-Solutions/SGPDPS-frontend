import { useForm } from '@tanstack/react-form'
import { TechnicalSchema, defaultValues } from '../dtos/technical.dto'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modal'
import { AutocompleteInput } from './AutoCompleteInput'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { useCreateTechnicalSkill } from '../hooks/useCreateTechnicalSkill'
import { useGetTechnicalSkillsSystem } from '../hooks/useGetTechnicalSkillsSystem'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalCreateTechnicalSkill = ({ isOpen, onClose }: Props) => {
  const { mutate: create, error, isPending, isError } = useCreateTechnicalSkill()
  const { data } = useGetTechnicalSkillsSystem()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: TechnicalSchema },
    onSubmit: ({ value }) => {
      create({
        ...value,
        domain_level: value.domain_level as 'Básico' | 'Intermedio' | 'Avanzado'
      }, {
        onSuccess: () => {
          onClose()
        }
      })
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
