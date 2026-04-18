import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { ProfileFormField } from '../../../features/profile/components/ProfileFormField'
import { CountryField } from '../../../features/profile/components/CountryField.tsx'
import { PhoneField } from '../../../features/profile/components/PhoneField.tsx'
import { ProfessionsField } from '../../../features/profile/components/ProfessionsField'
import { RegisterAccountSchema } from '../../../features/profile/dtos/user.dto'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'
import { useUpdateProfile } from '../../../features/profile/hooks/useUpdateProfile'
import countriesRaw from '../../../shared/assets/data/countries.json'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { SuccessModal } from '../../../shared/components/SuccessModal'

type CountryCodeRow = { country: string; code: string }

const COUNTRY_DIAL_CODE_MAP = new Map(
  (countriesRaw as CountryCodeRow[]).map(({ country, code }) => [country, code]),
)

const normalizeDialCode = (code: string) => `+${code.replace(/\D/g, '')}`
const DIAL_CODES = new Set((countriesRaw as CountryCodeRow[]).map(({ code }) => normalizeDialCode(code)))
const normalizePhoneValue = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits ? `+${digits}` : ''
}

export const Route = createFileRoute('/_authenticated/profile/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error: errorGetData, isSuccess: isSuccessGetData } = useGetProfile()
  const { mutate: update, error, isPending, isSuccess } = useUpdateProfile()
  const isProfileMissing = isError && errorGetData.response?.status === 404

  const form = useForm({
    defaultValues: {
      first_name: data?.first_name || '',
      last_name: data?.last_name || '',
      date_of_birth: data?.date_of_birth || '',
      gender: data?.gender || '',
      biography: data?.biography || '',
      country: data?.country || '',
      phone: data?.phone || '',
      professions: data?.professions || ([] as string[]),
    },
    validators: {
      onChange: RegisterAccountSchema,
    },
    onSubmit: ({ value }) => {
      const profileData = {
        ...value,
        date_of_birth: value.date_of_birth || undefined,
        gender: (value.gender as 'masculino' | 'femenino' | 'otro') || undefined,
        country: value.country || undefined,
        phone: value.phone || undefined,
      }

      update(profileData)
    },
  })

  const errorRef = useRef<HTMLDivElement>(null)
  const lastAutoPhoneRef = useRef<string | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const syncPhoneWithCountry = (selectedCountry: string) => {
    const currentPhone = String(form.state.values.phone || '').trim()
    const normalizedCurrentPhone = normalizePhoneValue(currentPhone)
    const dialCode = COUNTRY_DIAL_CODE_MAP.get(selectedCountry)

    if (!dialCode) {
      return
    }

    const suggestedPhone = normalizeDialCode(dialCode)
    const isAutoManaged =
      !normalizedCurrentPhone ||
      normalizedCurrentPhone === lastAutoPhoneRef.current ||
      DIAL_CODES.has(normalizedCurrentPhone)

    if (!isAutoManaged || normalizedCurrentPhone === suggestedPhone) {
      return
    }

    form.setFieldValue('phone', suggestedPhone)
    lastAutoPhoneRef.current = suggestedPhone
  }

  useEffect(() => {
    if (data) {
      form.setFieldValue('first_name', data.first_name)
      form.setFieldValue('last_name', data.last_name)
      form.setFieldValue('date_of_birth', data.date_of_birth || '')
      form.setFieldValue('gender', data.gender || '')
      form.setFieldValue('biography', data.biography)
      form.setFieldValue('phone', data.phone || '')
      form.setFieldValue('country', data.country || '')
      form.setFieldValue('professions', data.professions || [])
    }
  }, [data, isLoading, isSuccessGetData])

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [error])

  useEffect(() => {
    if (isProfileMissing) {
      navigate({ to: '/profile/register' })
    }
  }, [isProfileMissing, navigate])

  useEffect(() => {
    const selectedCountry = String(form.state.values.country || '').trim()
    if (!selectedCountry) {
      return
    }
    syncPhoneWithCountry(selectedCountry)
  }, [form.state.values.country])

  return (
    <div className="py-10">
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-background-dark mb-2">
              {data ? '¿Cancelar edición?' : '¿Cancelar creación?'}
            </h3>
            <p className="text-sm text-neutral-medium mb-6">
              {data
                ? "¿Estás seguro de que deseas cancelar la edición de tu perfil? Los cambios no guardados se perderán."
                : "¿Estás seguro de que deseas cancelar la creación de tu perfil? Los datos no guardados se perderán. Sin embargo, puedes completar el perfil más tarde."}
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
              >
                Seguir editando
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelModal(false)
                  navigate({ to: '/' })
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-2xl mx-auto">

        {isSuccess && (
          <SuccessModal message="Perfil actualizado exitosamente." redirect="Redirigiendo al inicio..." />
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-background-dark">Edita tu perfil</h1>
          <p className="text-sm text-neutral-medium mt-1">Esta información será visible en tu portafolio público.</p>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-neutral-medium mt-2">Cargando tu perfil...</p>
            </div>
          </div>
        )}

        {isProfileMissing && (
          <div className="flex justify-center items-center py-12">
            <p className="text-sm text-neutral-medium">Redirigiendo al registro de perfil...</p>
          </div>
        )}

        {isSuccessGetData && (
          <>
            {!!error && (
              <div ref={errorRef} className="mb-4">
                <BannerMessageError message={error.response?.data?.message || "Ocurrió un error al guardar el perfil"} />
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
              className="flex flex-col gap-6"
            >
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Información personal</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <form.Field name="first_name" children={(field) => (
                    <ProfileFormField label="Nombre(s)" required field={field} type="text" placeholder="Tu(s) nombre(s)" />
                  )} />

                  <form.Field name="last_name" children={(field) => (
                    <ProfileFormField label="Apellido(s)" required field={field} type="text" placeholder="Tus apellido(s)" />
                  )} />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <form.Field name="date_of_birth" children={(field) => (
                    <ProfileFormField label="Fecha de nacimiento" field={field} type="date" />
                  )} />

                  <form.Field name="gender" children={(field) => (
                    <div>
                      <label className="block text-sm font-medium text-background-dark mb-1.5">Género</label>
                      <div className="relative">
                        <select
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className={`w-full appearance-none px-4 pr-10 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm outline-none focus:border-primary transition-colors ${field.state.value ? 'text-background-dark' : 'text-neutral-400'}`}
                        >
                          <option value="" disabled>Seleccionar</option>
                          <option value="masculino">Masculino</option>
                          <option value="femenino">Femenino</option>
                          <option value="otro">Otro</option>
                        </select>
                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <form.Field name="country" children={(field) => (
                    <CountryField
                      field={field}
                      onCountrySelect={(country: string) => syncPhoneWithCountry(country)}
                      onCountryClear={() => {
                        if (normalizePhoneValue(String(form.state.values.phone || '').trim()) === lastAutoPhoneRef.current) {
                          form.setFieldValue('phone', '')
                        }
                        lastAutoPhoneRef.current = null
                      }}
                    />
                  )} />

                  <form.Field name="phone" children={(field) => (
                    <PhoneField field={field} />
                  )} />
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Profesiones <span className="text-red-500">*</span></h2>
                <p className="text-xs text-neutral-medium mb-4">Agrega hasta 5 profesiones que te describan.</p>

                <form.Field name="professions" children={(field) => (
                  <ProfessionsField field={field} />
                )} />
              </section>

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

              <div className="flex justify-end gap-3 pb-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setShowCancelModal(true)}
                  className="bg-neutral-200 hover:bg-neutral-300 text-background-dark font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-primary hover:bg-primary-soft text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? <ButtonLoader message="Guardando..." /> : "Actualizar perfil"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
