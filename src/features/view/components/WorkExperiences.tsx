import type { WorkExperience } from '../interfaces/work-experience'
import { formatMonthYear } from '../utils/formatMonthYear'

interface Props {
  work_experiences: WorkExperience[]
}

export const WorkExperiences = ({ work_experiences }: Props) => {
  return (
    <section id="experience" className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <p className="font-mono text-sm tracking-widest uppercase text-primary-soft mb-1">Trayectoria</p>
      <h2 className="font-serif text-3xl text-[#0d1b3e] mb-8">Experiencia laboral</h2>
 
      <div className="relative pl-8 border-l border-primary/15">
        {work_experiences.map((exp) => (
          <div key={exp.id} className="relative mb-10 last:mb-0 group">
            <span className="absolute -left-[2.15rem] top-[6px] w-3 h-3 rounded-full bg-white border-2 border-primary group-hover:bg-primary transition-colors" />
 
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
              <div>
                <p className="font-mono text-xs text-primary-soft mb-0.5">{exp.company}</p>
                <p className="font-semibold text-[#0d1b3e]">{exp.position}</p>
              </div>
              <p className="font-mono text-xs text-neutral-medium shrink-0">
                {formatMonthYear(exp.start_date)} – {formatMonthYear(exp.end_date)}
              </p>
            </div>
            <p className="text-sm text-neutral-medium leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
