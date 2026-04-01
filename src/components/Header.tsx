import { Link } from '@tanstack/react-router'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'
import { UserMenu } from './UserMenu'

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-neutral-light">
      <div className="px-4 md:w-10/12 md:px-0 m-auto py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.svg"
            alt="logo FolioX"
            className="w-12 md:w-14"
          />
          <span className="text-2xl md:text-3xl font-semibold leading-none">
            FOLIO
            <span className="text-primary text-3xl md:text-4xl">X</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer hover:opacity-60 transition"
        >
          <FaUserCircle className="w-10 h-10" />
        </button>

      </div>

      <UserMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
