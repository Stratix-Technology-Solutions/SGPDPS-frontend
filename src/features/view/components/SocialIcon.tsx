import {
  FiGithub,
  FiLinkedin,
  FiLink,
} from 'react-icons/fi'
import { FaXTwitter } from 'react-icons/fa6'

interface Props {
  url: string
  className?: string
}

export const SocialIcon = ({
  url,
  className = 'w-4 h-4',
}: Props) => {
  if (url.includes('github.com')) {
    return <FiGithub className={className} />
  }

  if (url.includes('linkedin.com')) {
    return <FiLinkedin className={className} />
  }

  if (url.includes('x.com') || url.includes('twitter.com')) {
    return <FaXTwitter className={className} />
  }

  return <FiLink className={className} />
}
