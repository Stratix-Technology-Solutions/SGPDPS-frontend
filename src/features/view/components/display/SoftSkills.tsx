import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import { useGetSoftSkills } from '../../../skills/hooks/useGetSoftSkills'
import { useToggleShow } from '../../hooks/useToggleShow'

export const SoftSkills = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetSoftSkills()

  const { mutate, isPending } = useToggleShow({
    url: '/soft-skills',
    queryKey: ['user', 'skills', 'soft']
  })

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-neutral-medium animate-pulse">
          Cargando habilidades blandas...
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <BannerMessageError
        message={
          error.response?.data.message ??
            'Surgió un error inesperado'
        }
      />
    )
  }

  if (!isSuccess) {
    return null
  }

  return (
    <div className="space-y-3">
      {!data.data.length ? (
        <div className="rounded-2xl border border-dashed border-neutral-light bg-white/60 px-6 py-10 text-center">
          <p className="text-sm text-neutral-medium">
            No hay habilidades blandas registradas.
          </p>
        </div>
      ) : (
        data.data.map(({ id, name, is_visible }) => (
          <div
            key={id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-white px-4 py-3 transition-colors hover:border-primary-soft"
          >
            <p className="truncate text-sm text-background-dark">
              {name}
            </p>

            <div className="flex gap-2 items-center">
              <button
                type="button"
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50 ${is_visible ? 'bg-primary' : 'bg-neutral-light'}`}
                disabled={isPending}
                onClick={() => mutate({ id, is_visible: !is_visible })}
              >
                <span className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${is_visible ? 'right-1' : 'left-1'}`} />
              </button>

              <span className={`hidden md:block text-sm ${is_visible ? 'text-primary' : 'text-neutral-medium'}`}>
                {is_visible ? 'Pública' : 'Privada'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
