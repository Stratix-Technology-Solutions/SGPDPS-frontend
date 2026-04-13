import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SectionTitle } from '../../../features/skills/components/SectionTitle'
import { FormCreateSkillTechnical } from '../../../features/skills/components/FormCreateSkillTechnical'
import { ListSkillsTechnical } from '../../../features/skills/components/ListSkillsTechnical'

export const Route = createFileRoute('/_authenticated/profile/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  const [technical, setTechnical] = useState(false)

  return (
    <div className="py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <SectionTitle
          title="Habilidades Técnicas"
          text="Registra tus habilidades técnicas e indica tu nivel de dominio en cada una."
          onClick={() => setTechnical(true)}
        />

        <ListSkillsTechnical />
      </div>

      {technical && (
        <FormCreateSkillTechnical onClose={() => setTechnical(false)} />
      )}
    </div>
  )
}
