import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiPlusCircle, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import { ActionButton } from '../../../features/academic/components/ActionButton'
import { ModalAddAcademic } from '../../../features/academic/components/ModalAddAcademic'
import { ModalEditAcademic } from '../../../features/academic/components/ModalEditAcademic'
import { ModalDeleteAcademic } from '../../../features/academic/components/ModalDeleteAcademic'
import { ModalViewAcademic } from '../../../features/academic/components/ModalViewAcademic'

export const Route = createFileRoute(
  '/_authenticated/profile/AcademicExperience',
)({
  component: RouteComponent,
})
type Modal = 'add' | 'edit' | 'delete' | 'view' | null
function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)
  return (
    <div className="py-10 flex flex-col gap-6">
      <div className="border-l-4 border-primary pl-4">
        <h2 className="text-2xl font-bold text-background-dark">Experiencia Academica</h2>
        <p className="text-sm text-neutral-medium/70">Gestiona tu historial de experiencia academica</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Crear experiencia academica" onClick={() => setModal('add')} />
        <ActionButton icon={FiEdit2} label="Editar experiencia academica" onClick={() => setModal('edit')} />
        <ActionButton icon={FiTrash2} label="Eliminar experiencia academica" onClick={() => setModal('delete')} />
        <ActionButton icon={FiEye} label="Visualizar experiencias academicas" onClick={() => setModal('view')} />
      </div>
      {modal === 'add' && <ModalAddAcademic onClose={() => setModal(null)} />}
      {modal === 'edit' && <ModalEditAcademic onClose={() => setModal(null)} />}
      {modal === 'delete' && <ModalDeleteAcademic onClose={() => setModal(null)} />}
      {modal === 'view' && <ModalViewAcademic onClose={() => setModal(null)} />}
    </div>
  )
}
