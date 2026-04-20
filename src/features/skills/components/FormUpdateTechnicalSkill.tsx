import { useForm } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { TechnicalSchema } from '../dtos/technical.dto'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import type { TechnicalDto } from '../dtos/technical.dto'
import type { TechnicalSkillResponse } from '../interfaces/technical.interface'
import { ModalSkills } from './ModalSkills'

interface Props {
  technology: TechnicalSkillResponse
  onClose: () => void
}

export const FormUpdateTechnicalSkill = ({ technology, onClose }: Props) => {
  const queryClient = useQueryClient()
  const { mutate: update, error, isPending, isError } = useMutation<TechnicalDto, ApiError, unknown>({
    mutationFn: async (data) => {
      const res = await api.patch(`/skills/${technology.id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'technical'],
      })
      onClose()
    },
  })

  const form = useForm({
    defaultValues: {
      name: technology.name,
      domain_level: technology.domain_level,
    },
    validators: { onSubmit: TechnicalSchema },
    onSubmit: ({ value }) => {
      update(value)
    },
  })

  return (
    <ModalSkills
      title="Editar Habilidad Técnica"
      description="Aquí podrás editar el nivel de la tecnología agregada."
      onClose={onClose}
    >
      {isError && (
        <BannerMessageError
          message={error.response?.data?.message
            || 'Surgió un error durante la actualización de la habilidad técnica'
          }
        />
      )}

      <form
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
              <label className="block font-semibold text-background-dark mb-1.5">Habilidad técnica</label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Ingrese su habilidad técnica"
                value={field.state.value}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              />
              {!field.state.meta.isValid && (
                <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
              )}
            </div>
          )}
        />

        <form.Field
          name="domain_level"
          children={(field) => (
            <div>
              <label className="block font-semibold text-background-dark mb-1.5">NIvel de dominio</label>
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
                <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
              )}
            </div>
          )}
        />

        <div className="flex justify-end gap-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white disabled:bg-neutral-medium disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </form>
    </ModalSkills>
  )
}
