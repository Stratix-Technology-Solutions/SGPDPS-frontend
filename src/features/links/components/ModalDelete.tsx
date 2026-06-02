import { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../shared/components/modalBase'
import { LinkList } from './LinkList'
import { useGetLinks } from '../hooks/useGetLink'
import { useDeleteLink } from '../hooks/useDeleteLink'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import type { LinkResponse } from '../interfaces/link.interface'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const ModalDelete = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<LinkResponse | null>(null)
  const { data, isLoading } = useGetLinks()
  const { mutate, isPending, isError, error } = useDeleteLink()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >

      <ModalHeader
        title={!selected ? 'Eliminar Enlace' : 'Confirmar eliminación'}
        subtitle={!selected
          ? 'Selecciona el enlace que deseas eliminar.'
          : '¿Estás seguro de que deseas eliminar este enlace? Esta acción no puede deshacerse.'
        }
        variant={!selected ? 'close-only' : 'back-close'}
        onBack={() => setSelected(null)}
        intent={!selected ? 'default' : 'danger'}
      />

      <ModalBody>
        <div className="py-2">
          {!selected ? (
            <LinkList
              data={data?.data}
              isLoading={isLoading}
              onSelect={setSelected}
              itemClassName="hover:border-red-400 hover:bg-red-50"
            />
          ) : (
            <>
              {isError && (
                <BannerMessageError
                  message={error.response?.data?.message
                    || 'Surgió un error al eliminar el enlace'
                  }
                />
              )}

              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-background-dark truncate">
                  <span className="font-semibold">URL: </span>
                  {selected.url}
                </p>
              </div>
            </>
          )}
        </div>
      </ModalBody>

      <ModalFooter
        variant={!selected ? 'close-only' : 'delete-cancel'}
        disabled={isPending}
        loading={isPending}
        onConfirm={() => {
          if (selected) {
            mutate(selected.id, {
              onSuccess: () => {
                setSelected(null)
              }
            })
          }
        }}
      />
    </Modal>
  )
}
