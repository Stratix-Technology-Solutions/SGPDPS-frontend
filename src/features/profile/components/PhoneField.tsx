import type { AnyFieldApi } from '@tanstack/react-form'
import type { ChangeEvent } from 'react'
import { MdPublic } from 'react-icons/md'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { COUNTRIES, CountrySelector } from './CountrySelector'

const normalizeDialCode = (value: string) => `+${value.replace(/\D/g, '')}`

const COUNTRIES_WITH_DIAL = COUNTRIES.map((country) => ({
  ...country,
  dialCode: normalizeDialCode(country.code),
}))

const DIAL_CODES = Array.from(new Set(COUNTRIES_WITH_DIAL.map((country) => country.dialCode))).sort(
  (a, b) => b.length - a.length,
)

const COUNTRY_BY_NAME = new Map(COUNTRIES_WITH_DIAL.map((country) => [country.country, country]))

function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits ? `+${digits}` : ''
}

function splitPhone(value: string) {
  const normalizedPhone = normalizePhone(value)

  if (!normalizedPhone) {
    return {
      dialCode: '',
      localNumber: '',
      selectedCountry: null as string | null,
    }
  }

  const dialCode = DIAL_CODES.find((code) => normalizedPhone.startsWith(code)) ?? ''
  const localNumber = dialCode
    ? normalizedPhone.slice(dialCode.length)
    : normalizedPhone.replace('+', '')

  const selectedCountry = dialCode
    ? COUNTRIES_WITH_DIAL.find((country) => country.dialCode === dialCode)?.country ?? null
    : null

  return {
    dialCode,
    localNumber,
    selectedCountry,
  }
}

export function PhoneField({ field }: { field: AnyFieldApi }) {
  const currentValue = String(field.state.value || '')
  const parsedPhone = splitPhone(currentValue)

  const handleCountrySelect = (countryName: string) => {
    const country = COUNTRY_BY_NAME.get(countryName)
    if (!country) {
      return
    }

    field.handleChange(`${country.dialCode}${parsedPhone.localNumber}`)
  }

  const handleCountryClear = () => {
    field.handleChange(parsedPhone.localNumber)
  }

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextLocalNumber = event.target.value.replace(/\D/g, '')

    if (parsedPhone.dialCode) {
      field.handleChange(`${parsedPhone.dialCode}${nextLocalNumber}`)
      return
    }

    field.handleChange(nextLocalNumber)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-background-dark mb-1.5">Teléfono</label>

      <div className="w-full rounded-xl border border-neutral-light bg-neutral-50 flex items-stretch">
        <div className="min-w-[96px] border-r border-neutral-light flex items-center">
          <div className="w-full">
            <CountrySelector
              selectedCountry={parsedPhone.selectedCountry}
              onSelect={handleCountrySelect}
              onClear={parsedPhone.selectedCountry ? handleCountryClear : undefined}
              placeholder="Prefijo"
              searchPlaceholder="Buscar país"
              clearLabel="Quitar prefijo"
              showClear={Boolean(parsedPhone.selectedCountry)}
              emptyIcon={<MdPublic className="h-3.5 w-3.5 text-neutral-400" />}
              variant="embedded"
              dropdownClassName="left-0 top-full mt-1 w-80"
              renderSelectedText={(country) => normalizeDialCode(country.code)}
              renderOptionText={(country) => `${country.country} (${normalizeDialCode(country.code)})`}
            />
          </div>
        </div>

        <input
          type="tel"
          inputMode="numeric"
          value={parsedPhone.localNumber}
          onChange={handleNumberChange}
          placeholder="Escribe tu número"
          className="w-full px-4 py-2.5 bg-transparent text-sm text-background-dark outline-none"
        />
      </div>

      {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
      )}
    </div>
  )
}
