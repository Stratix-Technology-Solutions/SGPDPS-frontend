import { user } from '../constants/user'

export const AcademicExperiences = () => {
  const visible = user.academic_experiences.filter((a) => a.is_visible)
 
  return (
    <section id="education" className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-[11px] tracking-widest uppercase text-primary-soft mb-1">Formación</p>
      <h2 className="font-serif text-3xl text-[#0d1b3e] mb-8">Educación</h2>
 
      <div className="flex flex-col gap-4">
        {visible.map((acad) => (
          <div
            key={acad.id}
            className="bg-white border border-primary/10 rounded-2xl p-6 flex gap-5 items-start hover:border-primary-soft transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-[#EBF0FB] border border-primary/15 flex items-center justify-center text-xl shrink-0">
              🎓
            </div>
            <div>
              <p className="font-mono text-xs text-primary-soft mb-0.5">{acad.institution}</p>
              <p className="font-semibold text-[#0d1b3e] mb-0.5">{acad.title}</p>
              <p className="font-mono text-[11px] text-neutral-medium mb-2 capitalize">
                {acad.type} · {formatYear(acad.start_date)} – {formatYear(acad.end_date)}
              </p>
              <p className="text-sm text-neutral-medium leading-relaxed">{acad.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function formatYear(dateStr: string) {
  if (!dateStr) return "Present"
  return new Date(dateStr).getFullYear()
}
