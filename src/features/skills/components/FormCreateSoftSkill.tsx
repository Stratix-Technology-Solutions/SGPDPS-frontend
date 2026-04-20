import { useForm } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { SoftSchema, defaultValues } from '../dtos/soft.dto'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'
import type { SoftDto } from '../dtos/soft.dto'
import { ModalSkills } from './ModalSkills'

interface Props {
  onClose: () => void
}

export const FormCreateSoftSkill = ({ onClose }: Props) => {
  const queryClient = useQueryClient()
  const { mutate: create, error, isPending, isError } = useMutation<SoftDto, ApiError, unknown>({
    mutationFn: async (data) => {
      const res = await api.post('/soft-skills', data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', 'skills', 'soft'],
      })
      onClose()
    },
  })

  const form = useForm({
    defaultValues,
    validators: { onSubmit: SoftSchema },
    onSubmit: ({ value }) => {
      create(value)
    },
  })

  return (
    <ModalSkills
      title="Crear Habilidad Blanda"
      description="Aquí podrás agregar la habilidad blanda que te caracterice."
      onClose={onClose}
    >
      {isError && (
        <BannerMessageError
          message={error.response?.data?.message
            || 'Surgió un error durante el registro de la habilidad blanda'
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
