import type { Profession } from '../interfaces/profile'
import type { SocialLink } from '../interfaces/user'
import { SocialIcon } from './SocialIcon'

interface Props {
  first_name: string
  last_name: string
  professions: Profession[]
  social_links: SocialLink[]
}

export const Footer = ({ first_name, last_name, professions, social_links }: Props) => {
  return (
    <footer id="contact" className="bg-background-dark text-[#8ea3c3] mt-16 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center flex flex-col gap-6">
        <div>
          <p className="font-serif text-3xl text-white mb-1">
            {first_name} {last_name}
          </p>
          <p className="font-mono text-xs text-primary-soft">
            // {professions.map((p) => p.name.toLowerCase().replace(" ", "_")).join(" && ")}
          </p>
        </div>

        {!!social_links.length && (
          <div className="flex justify-center flex-wrap gap-2">
            {social_links.map(({ id, url }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex text-sm items-center gap-2 text-[#8ea3c3] border border-white/10 rounded-lg px-4 py-2 hover:text-white hover:border-primary-soft/50 hover:bg-primary-soft/15 transition-all"
              >
                <SocialIcon url={url} />
                {url.replace(/https?:\/\//, "")}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
