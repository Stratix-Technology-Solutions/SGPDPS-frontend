import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { ActionButton } from '../../../shared/components/ActionButton'
import { SectionTitle } from '../../../shared/components/SectionTitle'
import { ModalAddAcademicFormation } from '../../../features/academicFormation/components/modals/ModalAddAcademicFormation'

export const Route = createFileRoute(
  '/_authenticated/profile/academic-formation',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [isAddOpen, setIsAddOpen] = useState(false)

  return (
    <div className="py-10 flex flex-col gap-6">
      <SectionTitle
        title="Formacion Academica"
        description="Registra tus estudios formales, grados academicos y titulos obtenidos."
      />

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-light p-8 flex gap-6 justify-center flex-wrap">
        <ActionButton icon={FiPlusCircle} label="Agregar formacion academica" onClick={() => setIsAddOpen(true)} />
      </div>

      {isAddOpen && <ModalAddAcademicFormation onClose={() => setIsAddOpen(false)} />}
    </div>
  )
}
