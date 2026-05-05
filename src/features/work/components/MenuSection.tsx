import { useState } from 'react'
import { ActionButton } from '../../../shared/components/ActionButton'
import { FiPlusCircle, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import { ModalCreate } from './ModalCreate'
import { ModalEdit } from './ModalEdit'
import { ModalView } from './ModalView'
import { ModalDelete } from './ModalDelete'

type Modal = 'create' | 'edit' | 'delete' | 'view' | null

export const MenuSection = () => {
  const [modal, setModal] = useState<Modal>(null)
  return (
    <>
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
          label="Visualizar experiencia(s)"
          onClick={() => {
            setModal('view')
          }}
        />
      </div>
      {modal === 'create' && <ModalCreate onClose={() => setModal(null)} />}
      {modal === 'edit' && <ModalEdit onClose={() => setModal(null)} />}
      {modal === 'delete' && <ModalDelete onClose={() => setModal(null)} />}
      {modal === 'view' && <ModalView onClose={() => setModal(null)} />}
    </>
  )
}
