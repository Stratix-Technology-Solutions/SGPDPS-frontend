import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ActionButton } from '../../../shared/components/ActionButton'
import { ModalDelete } from '../../../features/work/components/ModalDelete'
import { ModalEdit } from '../../../features/work/components/ModalEdit'
import { ModalCreate } from '../../../features/work/components/ModalCreate'

export const Route = createFileRoute('/_authenticated/profile/links')({
  component: RouteComponent,
})

type Modal = 'create' | 'edit' | 'delete' | null

function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Enlaces Públicos"
        description="Gestiona los enlaces que aparecerán en tu portafolio."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Crear enlace" onClick={() => setModal('create')} />
        <ActionButton icon={FiEdit2} label="Editar enlace" onClick={() => setModal('edit')} />
        <ActionButton icon={FiTrash2} label="Eliminar enlace" onClick={() => setModal('delete')} />
      </div>

      {modal === 'create' && <ModalCreate onClose={() => setModal(null)} />}
      {modal === 'edit' && <ModalEdit onClose={() => setModal(null)} />}
      {modal === 'delete' && <ModalDelete onClose={() => setModal(null)} />}
    </div>
  )
}
