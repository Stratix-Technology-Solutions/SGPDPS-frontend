import { Link } from '@tanstack/react-router'
import { FaUserCircle } from 'react-icons/fa'
import { useState } from 'react'
import { UserMenu } from './UserMenu'

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-light">
      <div className="px-4 md:w-10/12 md:px-0 mx-auto flex justify-between items-center h-20">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.svg"
            alt="logo FolioX"
            className="w-12 md:w-14"
          />
          <span className="text-2xl md:text-3xl font-semibold leading-none tracking-widest">
            FOLIO
            <span className="text-primary text-3xl md:text-4xl">X</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="cursor-pointer text-primary hover:text-primary-soft transition"
        >
          <FaUserCircle className="w-10 h-10" />
        </button>
      </div>

      <UserMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
