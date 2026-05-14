import { user } from '../constants/user'

export const Footer = () => {
  const { first_name, last_name, phone, country } = user.profile
 
  return (
    <footer className="bg-background-dark text-[#8ea3c3] mt-16 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-3xl text-white mb-1">
          {first_name} {last_name}
        </p>
        <p className="font-mono text-xs text-primary-soft mb-6">
          // {user.profile.professions.map((p) => p.name.toLowerCase().replace(" ", "_")).join(" && ")}
        </p>
 
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {user.social_links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-[#8ea3c3] border border-white/10 rounded-lg px-4 py-2 hover:text-white hover:border-primary-soft/50 hover:bg-primary-soft/15 transition-all"
            >
              {getSocialIcon(link.url)}
              {getSocialLabel(link.url)}
            </a>
          ))}
        </div>
 
        <p className="font-mono text-xs text-[#4a5e7a]">
          {country} · {phone}
        </p>
      </div>
    </footer>
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
