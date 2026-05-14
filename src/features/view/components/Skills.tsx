import { user } from '../constants/user'

export const Skills = () => {
  const visible = user.skills.filter((s) => s.is_visible)
  const visibleSoft = user.soft_skills.filter((s) => s.is_visible)
 
  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-[11px] tracking-widest uppercase text-primary-soft mb-1">Habilidades</p>
      <h2 className="font-serif text-3xl text-[#0d1b3e] mb-8">Stack técnico</h2>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {visible.map((skill) => {
          const pct = (skill.domain_level / 5) * 100
          return (
            <div
              key={skill.id}
              className="bg-white border border-primary/10 rounded-xl p-4 hover:border-primary-soft hover:-translate-y-1 transition-all duration-200"
            >
              <p className="font-medium text-sm text-[#0d1b3e] mb-3">{skill.name}</p>
              <div className="h-1 bg-primary/08 rounded-full overflow-hidden mb-2" style={{ background: "rgba(27,61,135,0.08)" }}>
                <div
                  className="h-full rounded-full bg-linear-to-r from-primary to-primary-soft transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-neutral-medium">
                {DOMAIN_LABELS[skill.domain_level]} · {skill.domain_level}/5
              </p>
            </div>
          )
        })}
      </div>
 
      <p className="font-mono text-[11px] tracking-widest uppercase text-primary-soft mb-3">Soft skills</p>
      <div className="flex flex-wrap gap-2">
        {visibleSoft.map((s) => (
          <span
            key={s.id}
            className="text-sm font-medium text-primary bg-[#EBF0FB] border border-primary/15 rounded-lg px-4 py-2"
          >
            {s.name}
          </span>
        ))}
      </div>
    </section>
  )
}

const DOMAIN_LABELS = ["", "Básico", "Básico", "Intermedio", "Avanzado", "Experto"]
