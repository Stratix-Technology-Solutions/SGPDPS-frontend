import { user } from '../constants/user'

export const Hero = () => {
  const { first_name, last_name, biography, country, phone, professions } = user.profile
  const initials = `${first_name[0]}${last_name[0]}`
 
  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-5">
            {professions.map((p) => (
              <span
                key={p.id}
                className="font-mono text-[11px] tracking-widest uppercase text-primary-soft bg-[#EBF0FB] border border-primary/15 rounded-full px-3 py-1"
              >
                {p.name}
              </span>
            ))}
          </div>
 
          <h1 className="font-serif text-5xl md:text-6xl text-[#0d1b3e] leading-tight mb-4">
            {first_name}{" "}
            <em className="not-italic text-primary-soft">{last_name}</em>
          </h1>
 
          <p className="text-sm text-neutral-medium leading-relaxed max-w-md mb-6">
            {biography}
          </p>
 
          <div className="flex flex-wrap gap-2 mb-6">
            {user.skills
              .filter((s) => s.is_visible)
              .map((s) => (
                <span
                  key={s.id}
                  className="font-mono text-[11px] text-primary border border-primary/20 bg-white rounded-full px-3 py-1"
                >
                  {s.name}
                </span>
              ))}
          </div>
 
          <div className="flex flex-wrap gap-2">
            {user.social_links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-neutral-medium border border-neutral-light rounded-full px-4 py-2 bg-white hover:border-primary hover:text-primary hover:bg-[#EBF0FB] transition-all"
              >
                {getSocialIcon(link.url)}
                {getSocialLabel(link.url)}
              </a>
            ))}
          </div>
        </div>
 
        <div className="relative shrink-0">
          <div className="w-44 h-44 rounded-full p-[3px] bg-linear-to-br from-primary to-primary-soft">
            <div className="w-full h-full rounded-full bg-[#c8d9f0] flex items-center justify-center border-4 border-[#f7f8fc]">
              <span className="font-serif text-5xl text-primary">{initials}</span>
            </div>
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-primary-soft bg-white border border-primary/15 rounded-full px-3 py-1 shadow-sm">
            📍 {country}
          </div>
        </div>
      </div>
    </section>
  )
}

function getSocialLabel(url: string) {
  if (url.includes("github")) return "GitHub"
  if (url.includes("linkedin")) return "LinkedIn"
  if (url.includes("x.com") || url.includes("twitter")) return "Twitter / X"
  return url.replace(/https?:\/\//, "")
}
 
function getSocialIcon(url: string) {
  if (url.includes("github"))
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    )
  if (url.includes("linkedin"))
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
