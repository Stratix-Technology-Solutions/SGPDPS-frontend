import { user } from '../constants/user'

export const Projects = () => {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-12">
      <p className="font-mono text-[11px] tracking-widest uppercase text-primary-soft mb-1">Trabajo</p>
      <h2 className="font-serif text-3xl text-[#0d1b3e] mb-8">Proyectos destacados</h2>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {user.projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-primary/10 rounded-2xl overflow-hidden flex flex-col hover:border-primary-soft hover:-translate-y-1 transition-all duration-200"
          >
            <div className="h-32 bg-linear-to-br from-primary to-primary-soft flex items-center justify-center relative overflow-hidden">
              {project.assets.find((a) => a.type === "image") ? (
                <img
                  src={project.assets.find((a) => a.type === "image").file_path}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = "none" }}
                />
              ) : null}
              <span className="absolute font-serif text-white/20 text-6xl select-none">
                {project.title[0]}
              </span>

              {project.assets.find((a) => a.type === "video") && (
                <span className="absolute top-2 right-2 font-mono text-[10px] bg-black/40 text-white rounded px-2 py-0.5">
                  VIDEO
                </span>
              )}
            </div>
 
            <div className="p-5 flex flex-col flex-1">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.categories.map((c) => (
                  <span key={c.id} className="font-mono text-[10px] text-primary bg-[#EBF0FB] border border-primary/15 rounded px-2 py-0.5">
                    {c.name}
                  </span>
                ))}
              </div>
 
              <h3 className="font-semibold text-[#0d1b3e] text-base mb-0.5">{project.title}</h3>
 
              <p className="font-mono text-[11px] text-neutral-medium mb-2">
                {project.roles.map((r) => r.name).join(", ")} · {formatYear(project.start_date)}–{formatYear(project.end_date)}
              </p>
 
              <p className="text-sm text-neutral-medium leading-relaxed flex-1 mb-3">{project.description}</p>
 
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skills.map((s) => (
                  <span key={s.id} className="font-mono text-[11px] text-neutral-medium bg-[#f1f4ff] rounded px-2 py-0.5">
                    {s.name}
                  </span>
                ))}
              </div>
 
              <div className="flex gap-2 mt-auto">
                {project.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center text-xs font-medium py-2 rounded-lg border border-primary/20 text-primary bg-white hover:bg-[#EBF0FB] hover:border-primary transition-all"
                  >
                    {link.url.includes("github") ? "GitHub" : "Demo →"}
                  </a>
                ))}
              </div>
            </div>
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
