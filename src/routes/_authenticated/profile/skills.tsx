import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SectionTitle } from '../../../features/skills/components/SectionTitle'
import { FormCreateTechnicalSkill } from '../../../features/skills/components/FormCreateTechnicalSkill'
import { FormCreateSoftSkill } from '../../../features/skills/components/FormCreateSoftSkill'
import { ListSkills } from '../../../features/skills/components/ListSkills'
import { CardTechnicalSkill } from '../../../features/skills/components/CardTechnicalSkill'
import type { TechnicalSkillResponse } from '../../../features/skills/interfaces/technical.interface'
import { CardSoftSkill } from '../../../features/skills/components/CardSoftSkill'
import type { SoftSkillResponse } from '../../../features/skills/interfaces/soft.interface'

export const Route = createFileRoute('/_authenticated/profile/skills')({
  component: RouteComponent,
})

function RouteComponent() {
  const [technical, setTechnical] = useState(false)
  const [soft, setSoft] = useState(false)

  return (
    <div className="py-10 flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <SectionTitle
          title="Habilidades Técnicas"
          text="Registra tus habilidades técnicas e indica tu nivel de dominio en cada una."
          onClick={() => setTechnical(true)}
        />

        <ListSkills<TechnicalSkillResponse>
          queryKey={['user', 'skills', 'technical']}
          route="skills"
          className="grid grid-cols-1 lg:grid-cols-2 gap-2"
          renderItem={(item) => <CardTechnicalSkill {...item} />}
        />
      </div>

      {technical && (
        <FormCreateTechnicalSkill onClose={() => setTechnical(false)} />
      )}

      <div className="flex flex-col gap-5">
        <SectionTitle
          title="Habilidades Blandas"
          text="Agrega las habilidades interpersonales que forman parte de tu perfil."
          onClick={() => setSoft(true)}
        />

        <ListSkills<SoftSkillResponse>
          queryKey={['user', 'skills', 'soft']}
          route="soft-skills"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          renderItem={(item) => <CardSoftSkill {...item} />}
        />
      </div>

      {soft && (
        <FormCreateSoftSkill onClose={() => setSoft(false)} />
      )}
    </div>
  )
}
