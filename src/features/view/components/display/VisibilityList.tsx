import { useState } from 'react'
import { BannerMessageError } from '../../../../shared/components/BannerMessageError'
import type { ApiError } from '../../../../shared/interfaces/api.interface'
import { useBulkVisibility } from '../../hooks/useBulkVisibility'
import { VisibilityColumn } from './VisibilityColumn'

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
  const { mutate } = useBulkVisibility({ url, queryKey })

  const [selectedPublic, setSelectedPublic] = useState<(string | number)[]>([])
  const [selectedPrivate, setSelectedPrivate] = useState<(string | number)[]>([])

  const publicItems = data?.filter((item) => item.is_visible) ?? []
  const privateItems = data?.filter((item) => !item.is_visible) ?? []

  const togglePublic = (id: string | number) => {
    setSelectedPublic((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }
  const togglePrivate = (id: string | number) => {
    setSelectedPrivate((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  const selectAllPublic = () => {
    setSelectedPublic(publicItems.map((item) => item.id))
  }
  const selectAllPrivate = () => {
    setSelectedPrivate(privateItems.map((item) => item.id))
  }

  const clearPublic = () => {
    setSelectedPublic([])
  }
  const clearPrivate = () => {
    setSelectedPrivate([])
  }

  const hideSelected = () => {
    mutate({
      ids: selectedPublic,
      is_visible: false,
    })

    setSelectedPublic([])
  }

  const showSelected = () => {
    mutate({
      ids: selectedPrivate,
      is_visible: true,
    })

    setSelectedPrivate([])
  }

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
    <div className="grid gap-4 lg:grid-cols-2">
      <VisibilityColumn
        title="Públicas"
        items={publicItems}
        selected={selectedPublic}
        getLabel={getLabel}
        onToggle={togglePublic}
        onSelectAll={selectAllPublic}
        onClear={clearPublic}
        onSubmit={hideSelected}
        buttonLabel="Hacer privadas"
      />

      <VisibilityColumn
        title="Privadas"
        items={privateItems}
        selected={selectedPrivate}
        getLabel={getLabel}
        onToggle={togglePrivate}
        onSelectAll={selectAllPrivate}
        onClear={clearPrivate}
        onSubmit={showSelected}
        buttonLabel="Hacer públicas"
      />
    </div>
  )
}
