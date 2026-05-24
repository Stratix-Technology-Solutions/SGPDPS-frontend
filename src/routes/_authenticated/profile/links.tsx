import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ActionButton } from '../../../shared/components/ActionButton'
import { ModalDelete } from '../../../features/links/components/ModalDelete'
import { ModalCreate } from '../../../features/links/components/ModalCreate'

export const Route = createFileRoute('/_authenticated/profile/links')({
  component: RouteComponent,
})

type Modal = 'create' | 'delete' | null

const modalRegistry = {
  create: ModalCreate,
  delete: ModalDelete,
}

function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)
  const ActiveModal = modal ? modalRegistry[modal] : null

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Enlaces Públicos"
        description="Gestiona los enlaces que aparecerán en tu portafolio."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Agregar enlace" onClick={() => setModal('create')} />
        <ActionButton icon={FiTrash2} label="Eliminar enlace" onClick={() => setModal('delete')} />
      </div>

      {ActiveModal && (
        <ActiveModal
          isOpen={!!modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}
