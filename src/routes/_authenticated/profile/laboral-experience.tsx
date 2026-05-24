import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ActionButton } from '../../../shared/components/ActionButton'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ModalCreate } from '../../../features/work/components/ModalCreate'
import { ModalEdit } from '../../../features/work/components/ModalEdit'
import { ModalDelete } from '../../../features/work/components/ModalDelete'
import { ModalView } from '../../../features/work/components/ModalView'

export const Route = createFileRoute(
  '/_authenticated/profile/laboral-experience',
)({
  component: RouteComponent,
})

type Modal = 'create' | 'edit' | 'delete' | 'view' | null

const modalRegistry = {
  create: ModalCreate,
  edit: ModalEdit,
  delete: ModalDelete,
  view: ModalView,
}

function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)
  const ActiveModal = modal ? modalRegistry[modal] : null

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Experiencia Laboral"
        description="Registra y gestiona tu historial de empleos para mostrarlos en tu portafolio."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton
          icon={FiPlusCircle}
          label="Crear Experiencia Laboral"
          onClick={() => {
            setModal('create')
          }}
        />
        <ActionButton
          icon={FiEdit2}
          label="Editar Experiencia Laboral"
          onClick={() => {
            setModal('edit')
          }}
        />
        <ActionButton
          icon={FiTrash2}
          label="Eliminar Experiencia Laboral"
          onClick={() => {
            setModal('delete')
          }}
        />
        <ActionButton
          icon={FiEye}
          label="Visualizar Experiencias"
          onClick={() => {
            setModal('view')
          }}
        />
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
