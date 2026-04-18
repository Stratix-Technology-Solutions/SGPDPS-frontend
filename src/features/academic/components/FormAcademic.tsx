import { useForm } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { AcademicSchema, defaultValues as emptyValues } from '../dtos/academic.dto'
import type { AcademicDto } from '../dtos/academic.dto'

interface Props {
  onCancel?: () => void
  onSubmit: (values: AcademicDto) => void
  submitLabel?: string
  defaultValues?: Partial<AcademicDto>
  isPending?: boolean
  serverError?: string
}

export const FormAcademic = ({ onCancel, onSubmit, submitLabel, defaultValues, isPending, serverError }: Props) => {
  const form = useForm({
    defaultValues: { ...emptyValues, ...defaultValues },
    validators: { onSubmit: AcademicSchema},
    onSubmit: ({ value }) => {onSubmit(value)},
    onSubmitInvalid: ({ value, formApi }) => { console.log('validation failed', value, formApi.state.errors) },
  })

  return (
    <form
      onSubmit={async (e) => { e.preventDefault(); console.log('form submit event fired'); await form.handleSubmit() }}
      className="flex flex-col gap-4"
    >
      {serverError && <BannerMessageError message={serverError} />}

      <form.Field name="title" children={(field) => (
        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Título / Programa *</label>
          <input
            type="text"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Ingrese el título o programa"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
          />
          {field.state.meta.errors.length > 0 && (
            <InputMessageError message={field.state.meta.errors.map(e => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')} />
          )}
        </div>
      )} />

      <form.Field name="institution" children={(field) => (
        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Institución *</label>
          <input
            type="text"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Ingrese la institución"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
          />
          {field.state.meta.errors.length > 0 && (
            <InputMessageError message={field.state.meta.errors.map(e => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')} />
          )}
        </div>
      )} />

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="start_date" children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">Inicio *</label>
            <input
              type="date"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
            />
            {field.state.meta.errors.length > 0 && (
              <InputMessageError message={field.state.meta.errors.map(e => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')} />
            )}
          </div>
        )} />

        <form.Field name="end_date" children={(field) => (
          <div>
            <label className="block font-semibold text-background-dark mb-1.5">Fin</label>
            <input
              type="date"
              value={field.state.value ?? ''}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
            />
          </div>
        )} />
      </div>

      <form.Field name="type" children={(field) => (
        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Tipo</label>
          <select
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value as AcademicDto['type'])}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors"
          >
            <option value="educación">Educación</option>
            <option value="certificado">Certificado</option>
          </select>
          {field.state.meta.errors.length > 0 && (
            <InputMessageError message={field.state.meta.errors.map(e => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')} />
          )}
        </div>
      )} />

      <form.Field name="description" children={(field) => (
        <div>
          <label className="block font-semibold text-background-dark mb-1.5">Descripción</label>
          <textarea
            rows={3}
            value={field.state.value ?? ''}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Ingrese una descripción"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-background-dark outline-none focus:border-primary transition-colors resize-none"
          />
        </div>
      )} />

      <form.Field name="is_visible" children={(field) => (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-light">
          <input
            type="checkbox"
            checked={field.state.value}
            onChange={(e) => field.handleChange(e.target.checked)}
            className="mt-1 accent-primary cursor-pointer"
          />
          <div>
            <span className="font-semibold text-background-dark">Visible</span>
            <p className="text-sm text-neutral-medium/70">
              Elige si esta experiencia académica será visible para quienes revisen tu portafolio.
            </p>
          </div>
        </div>
      )} />

      <div className="flex justify-end gap-3 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md bg-primary hover:bg-primary-soft text-white cursor-pointer disabled:bg-neutral-medium disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

