import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import type { ApiError } from '../../../../shared/interfaces/api.interface'
import { useToggleShow } from '../../hooks/useToggleShow'

interface Item {
  id: string | number
  is_visible: boolean
}

interface Props<T extends Item> {
  data?: T[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: unknown
  emptyMessage: string
  loadingMessage: string
  queryKey: string[]
  url: string
  getLabel: (item: T) => string
}

export const VisibilityList = <T extends Item>({
  data,
  isLoading,
  isError,
  isSuccess,
  error,
  emptyMessage,
  loadingMessage,
  queryKey,
  url,
  getLabel,
}: Props<T>) => {
  const { mutate, isPending } = useToggleShow({ url, queryKey })

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <p className="animate-pulse text-sm text-neutral-medium">
          {loadingMessage}
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <BannerMessageError
        message={
          (error as ApiError).response?.data.message ??
          'Surgió un error inesperado'
        }
      />
    )
  }

  if (!isSuccess) {
    return null
  }

  if (!data?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-light bg-white/60 px-6 py-5 text-center">
        <p className="text-neutral-medium">
          {emptyMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-2xl border border-primary/10 bg-white px-4 py-3 transition-colors hover:border-primary-soft"
        >
          <p className="truncate text-sm text-background-dark">
            {getLabel(item)}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                mutate({
                  id: item.id,
                  is_visible: !item.is_visible,
                })
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-50 ${item.is_visible ? 'bg-primary' : 'bg-neutral-light'}`}
            >
              <span className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200 ${item.is_visible ? 'right-1' : 'left-1' }`} />
            </button>

            <span className={` hidden text-sm md:block ${item.is_visible ? 'text-primary' : 'text-neutral-medium'}`} >
              {item.is_visible ? 'Pública' : 'Privada'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
