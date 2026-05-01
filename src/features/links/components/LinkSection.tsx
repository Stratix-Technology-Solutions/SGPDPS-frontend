import { useState } from 'react'
import { ActionButton } from '../../../shared/components/ActionButton'
import { FiEdit2, FiEye, FiPlusCircle, FiTrash2 } from 'react-icons/fi'
import { ModalView } from './ModalView'
import { ModalEdit } from './ModalEdit'
import ModalCreate from './ModalCreate'
import ModalDelete from './ModalDelete'

type Modal = 'view' | 'create' | 'edit' | 'delete' | null

export const LinkSection = () => {
  const [modal, setModal] = useState<Modal>(null)
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Crear enlace" onClick={() => setModal('create')} />
        <ActionButton icon={FiEdit2} label="Editar enlace" onClick={() => setModal('edit')} />
        <ActionButton icon={FiTrash2} label="Eliminar enlace" onClick={() => setModal('delete')} />
        <ActionButton icon={FiEye} label="Visualizar enlaces" onClick={() => setModal('view')} />
      </div>
      {modal === 'create' && <ModalCreate onClose={() => setModal(null)} />}
      {modal === 'edit' && <ModalEdit onClose={() => setModal(null)} />}
      {modal === 'delete' && <ModalDelete onClose={() => setModal(null)} />}
      {modal === 'view' && <ModalView onClose={() => setModal(null)} />}
    </>
  )
}
