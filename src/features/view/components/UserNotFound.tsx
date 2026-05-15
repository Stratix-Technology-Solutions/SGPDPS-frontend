import { LuCircleAlert, LuUserRound } from 'react-icons/lu'

interface Props {
  username?: string
}

export const UserNotFound = ({ username }: Props) => {
  return (
    <div className="min-h-screen flex-1 flex flex-col items-center justify-center px-6 text-center">

      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full p-[3px] bg-linear-to-br from-neutral-light to-neutral-light/40">
          <div className="w-full h-full rounded-full bg-[#f7f8fc] border-4 border-white flex items-center justify-center">
            <LuUserRound className="w-10 h-10 text-neutral-light" />
          </div>
        </div>

        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-neutral-light flex items-center justify-center">
          <LuCircleAlert className="w-4 h-4 text-neutral-medium" />
        </div>
      </div>

      {username && (
        <div className="inline-flex items-center gap-1.5 font-mono text-sm text-neutral-medium bg-white border border-neutral-light rounded-full px-4 py-1.5 mb-4">
          <span className="text-neutral-light">@</span>
          <span>{username}</span>
        </div>
      )}

      <p className="font-mono text-sm tracking-widest uppercase text-primary-soft mb-3">
        Usuario no encontrado
      </p>

      <h1 className="font-serif text-4xl md:text-5xl text-[#0d1b3e] mb-3 leading-tight">
        Este perfil <em className="not-italic text-primary-soft">no existe</em>
      </h1>

      <p className="text-neutral-medium max-w-sm leading-relaxed mb-8">
        {username
          ? `No encontramos ningún usuario con el nombre "@${username}". Verifica que esté bien escrito.`
          : 'El perfil que buscas no existe o fue eliminado.'}
      </p>
    </div>
  )
}
