import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiEdit2, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ActionButton } from '../../../shared/components/ActionButton'
import { FormCreateSoftSkill } from '../../../features/skills/components/FormCreateSoftSkill'
import { ModalEditTechnicalSkill } from '../../../features/skills/components/ModalEditTechnicalSkill'
import { ModalDeleteTechnicalSkill } from '../../../features/skills/components/ModalDeleteTechnicalSkill'
import { ModalDeleteSoftSkill } from '../../../features/skills/components/ModalDeleteSoftSkill'
import { ModalCreateTechnicalSkill } from '../../../features/skills/components/ModalCreateTechnicalSkill'

export const Route = createFileRoute('/_authenticated/profile/skills')({
  component: RouteComponent,
})

type Modal = 'createTechnical'
  | 'editTechnical'
  | 'deleteTechnical'
  | 'createSoft'
  | 'deleteSoft'
  | null

const modalRegistry = {
  createTechnical: ModalCreateTechnicalSkill,
  editTechnical: ModalEditTechnicalSkill,
  deleteTechnical: ModalDeleteTechnicalSkill,
  createSoft: FormCreateSoftSkill,
  deleteSoft: ModalDeleteSoftSkill,
}

function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)
  const ActiveModal = modal ? modalRegistry[modal] : null

  return (
    <div className="py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <SectionTitle
          title="Habilidades Técnicas"
          description="Registra tus habilidades técnicas e indica tu nivel de dominio en cada una."
        />

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
          <ActionButton icon={FiPlusCircle} label="Crear habilidad técnica" onClick={() => setModal('createTechnical')} />
          <ActionButton icon={FiEdit2} label="Editar habilidad técnica" onClick={() => setModal('editTechnical')} />
          <ActionButton icon={FiTrash2} label="Eliminar habilidad técnica" onClick={() => setModal('deleteTechnical')} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <SectionTitle
          title="Habilidades Blandas"
          description="Agrega las habilidades interpersonales que forman parte de tu perfil."
        />

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
          <ActionButton icon={FiPlusCircle} label="Crear habilidad blanda" onClick={() => setModal('createSoft')} />
          <ActionButton icon={FiTrash2} label="Eliminar habilidad blanda" onClick={() => setModal('deleteSoft')} />
        </div>
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
