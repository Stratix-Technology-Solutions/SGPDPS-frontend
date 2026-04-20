import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { FormCreateTechnicalSkill } from '../../../features/skills/components/FormCreateTechnicalSkill'
import { FormCreateSoftSkill } from '../../../features/skills/components/FormCreateSoftSkill'
import { ActionButton } from '../../../shared/components/ActionButton'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ModalViewTechnicalSkills } from '../../../features/skills/components/ModalViewTechnicalSkills'
import { ModalEditTechnicalSkill } from '../../../features/skills/components/ModalEditTechnicalSkill'
import { ModalDeleteTechnicalSkill } from '../../../features/skills/components/ModalDeleteTechnicalSkill'
import { ModalViewSoftSkills } from '../../../features/skills/components/ModalViewSoftSkills'
import { ModalDeleteSoftSkill } from '../../../features/skills/components/ModalDeleteSoftSkill'

export const Route = createFileRoute('/_authenticated/profile/skills')({
  component: RouteComponent,
})

type Modal = 'createTechnical' | 'editTechnical' | 'deleteTechnical' | 'viewTechnical'
 | 'createSoft' | 'editSoft' | 'deleteSoft' | 'viewSoft' | null

function RouteComponent() {
  const [modal, setModal] = useState<Modal>(null)

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
          <ActionButton icon={FiEye} label="Visualizar habilidades técnicas" onClick={() => setModal('viewTechnical')} />
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
          <ActionButton icon={FiEye} label="Visualizar habilidades blandas" onClick={() => setModal('viewSoft')} />
        </div>
      </div>

      {modal === 'createTechnical' ? (
        <FormCreateTechnicalSkill onClose={() => setModal(null)} />
      ) : modal === 'editTechnical' ? (
        <ModalEditTechnicalSkill onClose={() => setModal(null)} />
      ) : modal === 'deleteTechnical' ? (
        <ModalDeleteTechnicalSkill onClose={() => setModal(null)} />
      ) : modal === 'viewTechnical' ? (
        <ModalViewTechnicalSkills onClose={() => setModal(null)} />

      ) : modal === 'createSoft' ? (
        <FormCreateSoftSkill onClose={() => setModal(null)} />
      ) : modal === 'deleteSoft' ? (
        <ModalDeleteSoftSkill onClose={() => setModal(null)} />
      ) : modal === 'viewSoft' ? (
        <ModalViewSoftSkills onClose={() => setModal(null)} />
      ) : null }
    </div>
  )
}
