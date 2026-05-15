import type { SocialLink } from '../interfaces/user'
import { SocialIcon } from './SocialIcon'

interface Props {
  social_links: SocialLink[]
}

export const SocialLinks = ({ social_links }: Props) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2">
      {social_links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center text-sm gap-2 font-medium text-neutral-medium border border-neutral-light rounded-full px-4 py-2 bg-white hover:border-primary hover:text-primary hover:bg-[#EBF0FB] transition-all"
        >
          <SocialIcon url={link.url} />
          {link.url.replace(/https?:\/\//, "")}
        </a>
      ))}
    </div>
  )
}
