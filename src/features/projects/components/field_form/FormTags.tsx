import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { MdClose } from 'react-icons/md'
import { InputMessageError } from '../../../../shared/components/InputMessageError'

interface Props<TValue> {
  label: string
  field: {
    state: {
      value: TValue
      meta: { errors: unknown[] }
    }
    handleChange: (value: TValue) => void
  }
  placeholder?: string
}

export const FormTags = <TValue,>({ label, field, placeholder }: Props<TValue>) => {
  const [inputValue, setInputValue] = useState('')
  const tags: string[] = (field.state.value as string[]) || []

  const errors = field.state.meta.errors
  const errorMessage = errors.length > 0
    ? errors.map((e: unknown) => typeof e === 'string' ? e : (e as { message?: string })?.message).join(', ')
    : undefined

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      field.handleChange([...tags, trimmed] as unknown as TValue)
    }
    setInputValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const removeTag = (tagToRemove: string) => {
    field.handleChange(tags.filter(tag => tag !== tagToRemove) as unknown as TValue)
  }

  return (
    <div>
      <label className="block font-semibold text-background-dark mb-1.5">{label}</label>
      <div className="w-full flex flex-wrap gap-2 p-2 rounded-xl border border-neutral-light bg-neutral-50 focus-within:border-primary transition-colors min-h-[46px]">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-primary-soft/10 text-primary rounded-full text-sm">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:bg-primary-soft/20 rounded-full p-0.5"
            >
              <MdClose size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addTag(inputValue)}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 bg-transparent outline-none min-w-[120px] text-background-dark"
        />
      </div>
      {errorMessage && <InputMessageError message={errorMessage} />}
      <p className="mt-1 text-xs text-neutral-medium">Presiona Enter o coma para agregar.</p>
    </div>
  )
}
