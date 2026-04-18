import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from '../../../shared/components/InputMessageError'

export function PhoneField({ field }: { field: AnyFieldApi }) {
    return (
        <div>
            <label className="block text-sm font-medium text-background-dark mb-1.5">Teléfono</label>
            <PhoneInput
                international
                countryCallingCodeEditable={false}
                value={field.state.value || undefined}
                onChange={(val) => field.handleChange(val ?? '')}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
            />
            {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
            )}
        </div>
    )
}
