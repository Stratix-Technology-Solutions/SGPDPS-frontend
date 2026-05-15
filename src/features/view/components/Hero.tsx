import { FiCalendar, FiMapPin, FiPhone, FiUser } from 'react-icons/fi'
import { formatDate } from '../utils/formatDate'
import type { Profile } from '../interfaces/profile'

export const Hero = ({
  first_name,
  last_name,
  date_of_birth,
  gender,
  biography,
  country,
  phone,
  professions,
}: Profile) => {
  const initials = `${first_name?.[0] ?? ''}${last_name?.[0] ?? ''}`

  const meta = [
    {
      icon: <FiMapPin className="shrink-0" />,
      label: country,
    },
    {
      icon: <FiPhone className="shrink-0" />,
      label: phone,
    },
    {
      icon: <FiCalendar className="shrink-0" />,
      label: formatDate(date_of_birth ?? ''),
    },
    {
      icon: <FiUser className="shrink-0" />,
      label: gender?.charAt(0).toUpperCase().concat(gender.slice(1)),
    },
  ].filter((item) => item.label)

  return (
    <section
      id="about"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col-reverse gap-10 md:flex-row md:items-start"
    >
      <div className="flex-1">
        <h1 className="mb-4 text-4xl leading-tight font-serif text-white sm:text-5xl md:text-6xl">
          {first_name}{' '}
          <em className="not-italic text-primary-soft">
            {last_name}
          </em>
        </h1>

        {!!professions?.length && (
          <div className="mb-5 flex flex-wrap gap-2">
            {professions.map((profession) => (
              <span
                key={profession.id}
                className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary-soft">
                {profession.name}
              </span>
            ))}

          </div>
        )}

        <p className="mb-6 max-w-xl text-sm leading-7 text-white sm:text-base">
          {biography}
        </p>

        {!!meta.length && (
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {meta.map(({ icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm text-white"
              >
                <span className="text-base text-primary-soft">
                  {icon}
                </span>
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative mx-auto shrink-0 md:mx-0">
        <div className="h-36 w-36 rounded-full bg-linear-to-br from-primary to-primary-soft p-[3px] sm:h-44 sm:w-44">
          <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-white bg-[#dbe7f8]">
            <span className="text-4xl font-serif text-primary sm:text-5xl">
              {initials}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
