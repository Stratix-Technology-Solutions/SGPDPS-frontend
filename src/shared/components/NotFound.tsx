import { Link } from '@tanstack/react-router'
import { LuHouse } from 'react-icons/lu'

export const NotFound = () => {
  return (
    <div className="min-h-screen flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div className="relative select-none mb-2">
        <span
          className="font-serif font-bold text-[180px] leading-none text-primary/6 block"
          aria-hidden="true"
        >
          404
        </span>
      </div>

      <p className="font-mono text-sm tracking-widest uppercase text-primary-soft mb-3">
        Error 404
      </p>

      <h1 className="font-serif text-4xl md:text-5xl text-[#0d1b3e] mb-3 leading-tight">
        Página no <em className="not-italic text-primary-soft">encontrada</em>
      </h1>

      <p className="text-neutral-medium max-w-sm leading-relaxed mb-8">
        La ruta que buscas no existe o fue movida. Vuelve al inicio y retoma el camino.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-soft active:scale-95 rounded-full px-7 py-3 transition-all duration-200"
      >
        <LuHouse className="w-5 h-5" />
        Volver al inicio
      </Link>
    </div>
  )
}
