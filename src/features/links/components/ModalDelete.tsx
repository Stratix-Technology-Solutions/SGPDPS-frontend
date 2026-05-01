import { useState } from 'react'
import { Modal } from '../../../shared/components/Modal'
import { LinkList } from './LinkList'
import { useGetLinks } from '../hooks/useGetLink'
import { useDeleteLink } from '../hooks/useDeleteLink'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import type { LinkResponse } from '../interfaces/link.interface'

interface Props {
  onClose: () => void
}

export default function ModalDelete({ onClose }: Props) {
  const [selected, setSelected] = useState<LinkResponse | null>(null)
  const { data, isLoading } = useGetLinks()
  const { mutate: remove, isPending, isError, error } = useDeleteLink({ onClose })

  const handleConfirm = () => {
    if (!selected) return
    remove(selected.id.toString())
  }

  return (
    <Modal
      title={
        selected ? 'Confirmar eliminación' : 'Eliminar Enlace'
      }
      description={
        selected
          ? '¿Estás seguro de que deseas eliminar este enlace? Esta acción no puede deshacerse.'
          : 'Selecciona el enlace que deseas eliminar.'
      }
      onClose={onClose}
    >
      {isError && (
        <BannerMessageError
          message={error.response?.data?.message
            || 'Surgió un error al eliminar el enlace'
          }
        />
      )}

      {!selected && (
        <LinkList
          data={data?.data}
          isLoading={isLoading}
          onSelect={setSelected}
          itemClassName="hover:border-red-400 hover:bg-red-50"
        />
      )}

      {selected && (
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-background-dark truncate">
              <span className="font-semibold">URL: </span>
              {selected.url}
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isPending}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? <ButtonLoader message="Eliminando..." /> : 'Eliminar'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
