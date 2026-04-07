import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { ProfileFormField } from '../../components/ProfileFormField'
import { CountryField } from '../../components/CountryField'
import { PhoneField } from '../../components/PhoneField'
import { ProfessionsField } from '../../components/ProfessionsField'
import { RegisterAccountSchema } from '../../dtos/user.dto'
import { useCreateProfile } from '../../hooks/usePerfil'
import { ButtonLoader } from '../../components/ButtonLoader'
import { BannerMessageError } from '../../components/BannerMessageError'
import { InputMessageError } from '../../components/InputMessageError'
import { SuccesModalRedirect } from '../../components/SuccesModalRedirect'

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: createProfile, error, isPending, isSuccess } = useCreateProfile()

  const form = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: '',
      biography: '',
      country: '',
      phone: '',
      professions: [] as string[],
    },
    validators: {
      onChange: RegisterAccountSchema,
      onSubmit: RegisterAccountSchema,
    },
    onSubmit: ({ value }) => {
      createProfile({
        first_name: value.first_name,
        last_name: value.last_name,
        biography: value.biography,
        date_of_birth: value.date_of_birth || undefined,
        gender: (value.gender as 'masculino' | 'femenino' | 'otro') || undefined,
        country: value.country || undefined,
        phone: value.phone || undefined,
        professions:  value.professions,
      })
    },
  })

  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [error])

  return (
    <div className="py-10">
      <div className="max-w-2xl mx-auto">

        {isSuccess && <SuccesModalRedirect message="Perfil creado exitosamente." />}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-background-dark">Completa tu perfil</h1>
          <p className="text-sm text-neutral-medium mt-1">Esta información será visible en tu portafolio público.</p>
        </div>

        {!!error && (
          <div ref={errorRef} className="mb-4">
            <BannerMessageError message={error.response?.data?.message || "Ocurrió un error al guardar el perfil" } />
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-6"
        >
          {/* Sección: Información personal */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Información personal</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <form.Field name="first_name" children={(field) => (
                <ProfileFormField label="Nombre" required field={field} type="text" placeholder="Tu nombre" />
              )} />

              <form.Field name="last_name" children={(field) => (
                <ProfileFormField label="Apellidos" required field={field} type="text" placeholder="Tus apellidos" />
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <form.Field name="date_of_birth" children={(field) => (
                <ProfileFormField label="Fecha de nacimiento" field={field} type="date" />
              )} />

              <form.Field name="gender" children={(field) => (
                <div>
                  <label className="block text-sm font-medium text-background-dark mb-1.5">Género</label>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.Field name="country" children={(field) => (
                <CountryField field={field} />
              )} />

              <form.Field name="phone" children={(field) => (
                <PhoneField field={field} />
              )} />
            </div>
          </section>

          {/* Sección: Profesiones */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Profesiones <span className="text-red-500">*</span></h2>
            <p className="text-xs text-neutral-medium mb-4">Agrega hasta 5 profesiones que te describan.</p>

            <form.Field name="professions" children={(field) => (
              <ProfessionsField field={field} />
            )} />
          </section>

          {/* Sección: Biografía */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Biografía <span className="text-red-500">*</span></h2>
            <p className="text-xs text-neutral-medium mb-4">Cuéntale al mundo quién eres y qué haces.</p>

            <form.Field name="biography" children={(field) => (
              <div>
                <textarea
                  placeholder="Escribe una breve descripción sobre ti..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors resize-none"
                  rows={4}
                />
                {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                  <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
                )}
              </div>
            )} />
          </section>

          <div className="flex justify-end pb-4">
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary-soft text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? <ButtonLoader message="Guardando..." /> : 'Guardar perfil'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
