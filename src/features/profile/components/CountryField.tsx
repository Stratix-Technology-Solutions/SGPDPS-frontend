import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { CountrySelector } from './CountrySelector'

interface CountryFieldProps {
  field: AnyFieldApi
  onCountrySelect?: (country: string) => void
  onCountryClear?: () => void
}

export function CountryField({
  field,
  onCountrySelect,
  onCountryClear,
}: CountryFieldProps) {
  return (
    <div>
      <CountrySelector
        label="Nacionalidad"
        selectedCountry={String(field.state.value || '').trim() || null}
        onSelect={(country) => {
          field.handleChange(country)
          onCountrySelect?.(country)
        }}
        onClear={() => {
          field.handleChange('')
          onCountryClear?.()
        }}
      />

      {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
      )}
    </div>
  )
}
