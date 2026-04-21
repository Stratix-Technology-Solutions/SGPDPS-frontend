import { useState, useMemo } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
}

export const AutocompleteInput = ({
  value,
  onChange,
  options,
  placeholder,
}: Props) => {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredOptions = useMemo(() => {
    if (!value) return options
    return options.filter(opt =>
      opt.toLowerCase().includes(value.toLowerCase())
    )
  }, [value, options])

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 150)
        }}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-neutral-light"
      />

      {showSuggestions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-xl mt-1 max-h-40 overflow-auto shadow">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option)
                setShowSuggestions(false)
              }}
              className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
