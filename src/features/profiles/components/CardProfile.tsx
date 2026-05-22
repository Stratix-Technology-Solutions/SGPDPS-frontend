import { Link } from '@tanstack/react-router'
import { FiArrowRight } from 'react-icons/fi'
import type { Profile } from '../interfaces/profile'

export const CardProfile = ({
  id,
  username,
  first_name,
  last_name,
  biography,
  skills,
  professions,
  picture,
}: Profile) => {
  return (
    <Link
      key={id}
      to="/profiles/$username"
      params={{ username }}
      className="group flex flex-col gap-4 p-5 border border-neutral-200 rounded-2xl bg-white transition-all duration-200 hover:border-primary-soft/50 hover:shadow-md hover:shadow-primary-soft/10 hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 shrink-0 ring-2 ring-transparent group-hover:ring-primary-soft/30 transition-all duration-200">
          {picture ? (
            <img
              src={picture}
              alt={username}
              className="w-full h-full object-cover"
            />
          ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-primary-soft bg-blue-50">
                {first_name.charAt(0)}
              </div>
            )}
        </div>

        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
          <h2 className="text-base font-semibold text-background-dark truncate leading-tight">
            {first_name} {last_name}
          </h2>
          <span className="text-sm text-primary-soft truncate">
            @{username}
          </span>
        </div>

        <FiArrowRight className="text-neutral-300 group-hover:text-primary-soft group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
      </div>

      {professions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {professions.map((profession) => (
            <span
              key={profession}
              className="bg-blue-50 text-primary border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              {profession}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-neutral-medium leading-relaxed line-clamp-2">
        {biography || 'Este usuario aún no agregó una biografía.'}
      </p>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="border border-neutral-200 text-neutral-medium bg-neutral-50 px-2 py-0.5 rounded-md text-xs"
            >
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="border border-neutral-200 text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-md text-xs">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}
    </Link>
  )
}
