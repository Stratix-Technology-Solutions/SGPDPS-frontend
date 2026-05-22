import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import api from '../../app/api/axios'
import type { ApiError } from '../../shared/interfaces/api.interface'
import type { Profile } from '../../features/profiles/interfaces/profile'
import { Navbar } from '../../features/profiles/components/Navbar'
import { CardProfile } from '../../features/profiles/components/CardProfile'
import { ProfilesFilters, type Filter } from '../../features/profiles/components/ProfilesFilters'

export const Route = createFileRoute('/profiles/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [filters, setFilters] = useState<Filter[]>([])

  const { data, isError, isLoading, isSuccess, error } = useQuery<
    Profile[],
    ApiError
  >({
    queryKey: ['profiles'],
    queryFn: async () => {
      const res = await api.get('/profiles')
      return res.data
    },
  })

  const filteredProfiles = useMemo(() => {
    if (!data) return []

    if (filters.length === 0) return data

    return data.filter((profile) => {
      return filters.every((filter) => {
        const value = filter.value.toLowerCase()

        switch (filter.type) {
          case 'text':
            return (
              profile.first_name.toLowerCase().includes(value) ||
              profile.last_name.toLowerCase().includes(value) ||
              profile.username.toLowerCase().includes(value) ||
              profile.biography.toLowerCase().includes(value)
            )

          case 'skills':
            return profile.skills.some((skill) =>
              skill.toLowerCase().includes(value),
            )

          case 'professions':
            return profile.professions.some((profession) =>
              profession.toLowerCase().includes(value),
            )

          default:
            return true
        }
      })
    })
  }, [data, filters])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-light/40 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-soft/30 border-t-primary-soft rounded-full animate-spin" />
          <span className="text-neutral-medium text-sm">
            Cargando perfiles...
          </span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-neutral-light/40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-background-dark font-semibold mb-1">
            Algo salió mal
          </p>

          <p className="text-red-400 text-sm">
            {error?.response?.data.message}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-light/40">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-background-dark">
            Explorar perfiles
          </h1>

          <p className="text-neutral-medium">
            Descubre profesionales y revisa sus habilidades.
          </p>
        </div>

        <ProfilesFilters
          filters={filters}
          setFilters={setFilters}
        />

        {isSuccess && filteredProfiles.length === 0 && (
          <p className="text-neutral-medium">
            No se encontraron perfiles.
          </p>
        )}

        {isSuccess && filteredProfiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProfiles.map((profile) => (
              <CardProfile
                key={profile.id}
                {...profile}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
