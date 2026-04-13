import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SectionTitle } from '../../../features/skills/components/SectionTitle'
import { FormTechnical } from '../../../features/skills/components/FormTechnical'
import { ListSkills } from '../../../features/skills/components/ListSkills'

export const Route = createFileRoute('/_authenticated/profile/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  const [technical, setTechnical] = useState(false)

  return (
    <div className="py-10">
      <div className="flex flex-col gap-5">
        <SectionTitle
          title="Habilidades Técnicas"
          text="Registra tus habilidades técnicas e indica tu nivel de dominio en cada una."
          onClick={() => setTechnical(true)}
        />

        <ListSkills />
      </div>

      {technical && (
        <FormTechnical onClose={() => setTechnical(false)} />
      )}
    </div>
  )
}
