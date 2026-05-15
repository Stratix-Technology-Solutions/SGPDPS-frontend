import type { Skill, SoftSkill } from '../interfaces/skills'

const DOMAIN_LEVELS = {
  Básico: { percentage: 30 },
  Intermedio: { percentage: 60 },
  Avanzado: { percentage: 90 },
} as const

interface Props {
  skills: Skill[]
  soft_skills: SoftSkill[]
}

export const Skills = ({ skills, soft_skills }: Props) => {
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-7xl px-4 sm:px-6"
    >
      <p className="mb-1 font-mono text-sm uppercase tracking-widest text-primary-soft">
        Habilidades
      </p>

      <div className="grid grid-cols-1 gap-4 lg:gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <h2 className="mb-4 font-serif text-3xl text-background-dark">
            Habilidades técnicas
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {skills.map((skill) => {
              const level = DOMAIN_LEVELS[skill.domain_level]

              return (
                <div
                  key={skill.id}
                  className="rounded-xl border border-primary/10 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary-soft"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-background-dark">
                      {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                    </p>

                    <span className="rounded-full bg-primary/5 px-2.5 py-1 font-mono text-[10px] text-primary-soft">
                      {skill.domain_level}
                    </span>
                  </div>

                  <div className="h-1 overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-primary to-primary-soft transition-all duration-700"
                      style={{
                        width: `${level.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-3xl text-background-dark">
            Habilidades blandas
          </h2>

          <div className="flex flex-wrap gap-2">
            {soft_skills.map((skill) => (
              <span
                key={skill.id}
                className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
              >
                {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
