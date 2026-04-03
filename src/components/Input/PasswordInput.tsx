import { useState } from "react"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { InputMessageError } from "../InputMessageError"
import { type IconType } from "react-icons/lib"

interface Props {
  field: {
    name: string
    state: {
      value: string
      meta: {
        isValid: boolean
        errors: Array<{ message: string } | undefined>
      }
    }
    handleChange: (value: string) => void
    handleBlur: () => void
  },
  Icon : IconType
}

export function PasswordInput({ field, Icon }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.name} className="text-white font-medium flex items-center gap-2 flex-wrap">
        <Icon className="w-6 h-6" />
        <span>Contraseña</span>
      </label>
      <div className="relative">
        <input
          id={field.name}
          name={field.name}
          type={show ? "text" : "password"}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder="••••••••••"
          required
          aria-required="true"
          className="w-full bg-neutral-light text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          {show ? <IoEyeOff size={18} /> : <IoEye size={18} />}
        </button>
      </div>
      {!field.state.meta.isValid && (
        <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
      )}
    </div>
  )
}