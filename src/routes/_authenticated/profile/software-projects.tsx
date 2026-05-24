import { createFileRoute } from '@tanstack/react-router'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ActionButton } from '../../../shared/components/ActionButton'
import { useState } from 'react'
import { ModalEditProject } from '../../../features/projects/components/modals/ModalEditProject'
import { ModalAddProjectCategory } from '../../../features/projects/components/modals/ModalAddProjectCategory'
import { ModalAddProjectAsset } from '../../../features/projects/components/modals/ModalAddProjectAsset'
import { ModalDeleteProjectAsset } from '../../../features/projects/components/modals/ModalDeleteProjectAsset'
import { ModalAddProject } from '../../../features/projects/components/modals/ModalAddProject'
import { ModalViewProject } from '../../../features/projects/components/modals/ModalViewProject'
import { ModalDeleteProject } from '../../../features/projects/components/modals/ModalDeleteProject'

export const Route = createFileRoute('/_authenticated/profile/software-projects')({
  component: RouteComponent,
})

type ModalType = 'add' | 'edit' | 'delete' | 'view' | 'add-evidence' | 'delete-evidence' | 'add-category' | null

const modalRegistry = {
  'add': ModalAddProject,
  'edit': ModalEditProject,
  'delete': ModalDeleteProject,
  'view': ModalViewProject,
  'add-evidence': ModalAddProjectAsset,
  'delete-evidence': ModalDeleteProjectAsset,
  'add-category': ModalAddProjectCategory,
}

function RouteComponent() {
  const [modal, setModal] = useState<ModalType>(null)
  const ActiveModal = modal ? modalRegistry[modal] : null

  return (
    <section className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Proyectos Personales"
        description="Gestiona tus proyectos personales, roles y tecnologías para mostrarlos en tu portafolio."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Registrar proyecto personal" onClick={() => setModal('add')} />
        <ActionButton icon={FiEdit2} label="Editar proyecto personal" onClick={() => setModal('edit')} />
        <ActionButton icon={FiTrash2} label="Eliminar proyecto personal" onClick={() => setModal('delete')} />
        <ActionButton icon={FiEye} label="Visualizar proyectos personales" onClick={() => setModal('view')} />
        <ActionButton icon={FiPlusCircle} label="Agregar categorías" onClick={() => setModal('add-category')} />
      </div>

      <SectionTitle
        title="Evidencia Digital"
        description="Gestiona la evidencia de tus proyectos, pueden ser imagenes o pdf."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Subir evidencia digital" onClick={() => setModal('add-evidence')} />
        <ActionButton icon={FiTrash2} label="Eliminar evidencia digital" onClick={() => setModal('delete-evidence')} />
      </div>

      {ActiveModal && (
        <ActiveModal
          isOpen={!!modal}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  )
}
