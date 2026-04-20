import { useState } from 'react'
import { ActionButton } from '../../../shared/components/ActionButton'
import { FiEdit2, FiEye } from 'react-icons/fi'
import { ModalView } from './ModalView'
import { ModalEdit } from './ModalEdit'

type Modal = 'view' | 'edit' | null

export const LinkSection = () => {
  const [modal, setModal] = useState<Modal>(null)
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiEdit2} label="Editar Enlaces" onClick={() => setModal('edit')} />
        <ActionButton icon={FiEye} label="Visualizar Enlaces" onClick={() => setModal('view')} />
      </div>
      {modal === 'view' && <ModalView onClose={() => setModal(null)} />}
      {modal === 'edit' && <ModalEdit onClose={() => setModal(null)} />}
    </>
  )
}
