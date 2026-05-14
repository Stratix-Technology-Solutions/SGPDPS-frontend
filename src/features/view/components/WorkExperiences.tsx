import { user } from '../constants/user'

export const WorkExperiences = () => {
  const visible = user.work_experiences.filter((e) => e.is_visible)
 
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-[11px] tracking-widest uppercase text-primary-soft mb-1">Trayectoria</p>
      <h2 className="font-serif text-3xl text-[#0d1b3e] mb-8">Experiencia laboral</h2>
 
      <div className="relative pl-8 border-l border-primary/15">
        {visible.map((exp) => (
          <div key={exp.id} className="relative mb-10 last:mb-0 group">
            <span className="absolute -left-[2.15rem] top-[6px] w-3 h-3 rounded-full bg-white border-2 border-primary group-hover:bg-primary transition-colors" />
 
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <div>
                <p className="font-mono text-xs text-primary-soft mb-0.5">{exp.company}</p>
                <p className="font-semibold text-[#0d1b3e]">{exp.position}</p>
              </div>
              <p className="font-mono text-xs text-neutral-medium shrink-0">
                {formatYear(exp.start_date)} – {formatYear(exp.end_date)}
              </p>
            </div>
            <p className="text-sm text-neutral-medium leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function formatYear(dateStr: string | null) {
  if (!dateStr) return "Present"
  return new Date(dateStr).getFullYear()
}
