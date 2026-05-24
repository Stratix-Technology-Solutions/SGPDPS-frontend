import { useEffect, useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { ProfileFormField } from './ProfileFormField'
import { GenderField } from './GenderField'
import { CountryField } from './CountryField'
import { PhoneField } from './PhoneField'
import { ProfessionsField } from './ProfessionsField'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { SuccessModal } from '../../../shared/components/SuccessModal'
import { RegisterAccountSchema, defaultValues } from '../dtos/user.dto'
import { COUNTRY_DIAL_CODE_MAP, DIAL_CODES } from '../constants/dial_codes'
import { normalizeDialCode, normalizePhoneValue } from '../utils/normalize'
import type { RegisterAccountDto } from '../dtos/user.dto'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import { AvatarField } from './AvatarField'

interface ProfileFormProps {
  mode: 'register' | 'edit'
  initialData?: RegisterAccountDto
  onSubmit: (data: RegisterAccountDto) => void
  error: Error | null
  isPending: boolean
  isSuccess: boolean
  successMessage: string
  submitLabel: string
  pendingLabel: string
  title: string
  subtitle: string
  avatarUrl?: string | null
}

export function ProfileForm({
  mode,
  initialData,
  onSubmit,
  error,
  isPending,
  isSuccess,
  successMessage,
  submitLabel,
  pendingLabel,
  title,
  subtitle,
  avatarUrl,
}: ProfileFormProps) {
  const navigate = useNavigate()
  const errorRef = useRef<HTMLDivElement>(null)
  const lastAutoPhoneRef = useRef<string | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const form = useForm({
    defaultValues: initialData ?? defaultValues,
    validators: { onChange: RegisterAccountSchema },
    onSubmit: ({ value }) => {
      onSubmit({
        ...value,
        date_of_birth: value.date_of_birth || undefined,
        gender: (value.gender as 'masculino' | 'femenino' | 'otro') || undefined,
        country: value.country || undefined,
        phone: value.phone || undefined,
      })
    },
  })

  const syncPhoneWithCountry = (selectedCountry: string) => {
    const currentPhone = String(form.state.values.phone || '').trim()
    const normalizedCurrentPhone = normalizePhoneValue(currentPhone)
    const dialCode = COUNTRY_DIAL_CODE_MAP.get(selectedCountry)
    if (!dialCode) return

    const suggestedPhone = normalizeDialCode(dialCode)
    const isAutoManaged =
      !normalizedCurrentPhone ||
      normalizedCurrentPhone === lastAutoPhoneRef.current ||
      DIAL_CODES.has(normalizedCurrentPhone)

    if (!isAutoManaged || normalizedCurrentPhone === suggestedPhone) return

    form.setFieldValue('phone', suggestedPhone)
    lastAutoPhoneRef.current = suggestedPhone
  }

  useEffect(() => {
    if (mode !== 'edit' || !initialData) return
    form.setFieldValue('first_name', initialData.first_name)
    form.setFieldValue('last_name', initialData.last_name)
    form.setFieldValue('date_of_birth', initialData.date_of_birth || '')
    form.setFieldValue('gender', initialData.gender || '')
    form.setFieldValue('biography', initialData.biography)
    form.setFieldValue('phone', initialData.phone || '')
    form.setFieldValue('country', initialData.country || '')
    form.setFieldValue('professions', initialData.professions || [])
  }, [initialData, mode])

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [error])

  useEffect(() => {
    const selectedCountry = String(form.state.values.country || '').trim()
    if (!selectedCountry) return
    syncPhoneWithCountry(selectedCountry)
  }, [form.state.values.country])

  const cancelMessage = mode === 'edit'
    ? '¿Estás seguro de que deseas cancelar la edición de tu perfil? Los cambios no guardados se perderán.'
    : '¿Estás seguro de que deseas cancelar la creación de tu perfil? Los datos no guardados se perderán. Sin embargo, puedes completar el perfil más tarde.'

  return (
    <div className="py-6 sm:py-10">
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-background-dark mb-2">
              {mode === 'edit' ? '¿Cancelar edición?' : '¿Cancelar creación?'}
            </h3>
            <p className="text-sm text-neutral-medium mb-6">{cancelMessage}</p>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
              >
                Seguir editando
              </button>
              <button
                type="button"
                onClick={() => { setShowCancelModal(false); navigate({ to: '/' }) }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-3 sm:px-0">
        {isSuccess && <SuccessModal message={successMessage} redirect="Redirigiendo al inicio..." />}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-background-dark">{title}</h1>
          <p className="text-sm text-neutral-medium mt-1">{subtitle}</p>
        </div>

        {!!error && (
          <div ref={errorRef} className="mb-4">
            <BannerMessageError message={(error as ApiError).response?.data?.message || 'Ocurrió un error al guardar el perfil'} />
          </div>
        )}

        <div className="mb-6">
          <AvatarField
            currentUrl={avatarUrl}
          />
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}
          className="flex flex-col gap-6"
        >
          <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Información personal</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <form.Field name="first_name" children={(field) => (
                <ProfileFormField label="Nombre(s)" required field={field} type="text" placeholder="Tu(s) nombre(s)" />
              )} />
              <form.Field name="last_name" children={(field) => (
                <ProfileFormField label="Apellido(s)" required field={field} type="text" placeholder="Tus apellido(s)" />
              )} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <form.Field name="date_of_birth" children={(field) => (
                <ProfileFormField label="Fecha de nacimiento" field={field} type="date" />
              )} />
              <form.Field name="gender" children={(field) => <GenderField field={field} />} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <form.Field name="phone" children={(field) => <PhoneField field={field} />} />
            </div>
          </section>

          <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              Profesiones <span className="text-red-500">*</span>
            </h2>
            <p className="text-xs text-neutral-medium mb-4">Agrega hasta 5 profesiones que te describan.</p>
            <form.Field name="professions" children={(field) => (
              <ProfessionsField field={field} isEditing={mode === 'edit'} />
            )} />
          </section>

          <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              Acerca de ti <span className="text-red-500">*</span>
            </h2>
            <p className="text-xs text-neutral-medium mb-4">Cuéntale al mundo quién eres y qué haces.</p>
            <form.Field name="biography" children={(field) => (
              <div>
                <textarea
                  placeholder="Ejemplo: Desarrollador frontend con enfoque en React y diseño de interfaces..."
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

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-2 sm:pb-4">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowCancelModal(true)}
              className="w-full sm:w-auto bg-neutral-200 hover:bg-neutral-300 text-background-dark font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto bg-primary hover:bg-primary-soft text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? <ButtonLoader message={pendingLabel} /> : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
