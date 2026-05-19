import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ActionButton } from '../../../shared/components/ActionButton'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ModalAddAcademicFormation } from '../../../features/academicFormation/components/modals/ModalAddAcademicFormation'
import { ModalEditAcademicFormation } from '../../../features/academicFormation/components/modals/ModalEditAcademicFormation'
import { ModalDeleteAcademicFormation } from '../../../features/academicFormation/components/modals/ModalDeleteAcademicFormation'

export const Route = createFileRoute(
  '/_authenticated/profile/academic-formation',
)({
  component: RouteComponent,
})

type Modal = 'add' | 'edit' | 'delete' | null

function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Formación Académica"
        description="Registra tus estudios formales, grados académicos y títulos obtenidos."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Registrar formación académica" onClick={() => setModal('add')} />
        <ActionButton icon={FiEdit2} label="Editar formación académica" onClick={() => setModal('edit')} />
        <ActionButton icon={FiTrash2} label="Eliminar formación académica" onClick={() => setModal('delete')} />
      </div>

      {modal === 'add' && <ModalAddAcademicFormation onClose={() => setModal(null)} />}
      {modal === 'edit' && <ModalEditAcademicFormation onClose={() => setModal(null)} />}
      {modal === 'delete' && <ModalDeleteAcademicFormation onClose={() => setModal(null)} />}
    </div>
  )
}
