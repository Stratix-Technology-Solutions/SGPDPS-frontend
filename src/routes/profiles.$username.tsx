import { createFileRoute, notFound } from '@tanstack/react-router'
import api from '../app/api/axios'
import { Hero } from '../features/view/components/Hero'
import { Skills } from '../features/view/components/Skills'
import { WorkExperiences } from '../features/view/components/WorkExperiences'
import { Projects } from '../features/view/components/Projects'
import { AcademicExperiences } from '../features/view/components/AcademicExperiences'
import { AcademicFormations } from '../features/view/components/AcademicFormations'
import { Footer } from '../features/view/components/Footer'
import { UserNotFound } from '../features/view/components/UserNotFound'
import { SocialLinks } from '../features/view/components/SocialLinks'
import type { UserProfileResponse } from '../features/view/interfaces/user'

export const Route = createFileRoute('/profiles/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const response = await api.get<UserProfileResponse>(`/profiles/u/${params.username}`)
      return response.data
    } catch (error) {
      throw notFound()
    }
  },
  notFoundComponent: () => {
    const { username } = Route.useParams()
    return <UserNotFound username={username} />
  }
})

function RouteComponent() {
  const {
    profile,
    social_links,
    skills,
    soft_skills,
    academic_formations = [],
    academic_experiences,
    work_experiences,
    projects,
  } = Route.useLoaderData()

  const skills_parsed = Object.values(skills)
  const soft_skills_parsed = Object.values(soft_skills)
  const academic_formations_parsed = Object.values(academic_formations)
  const academic_experiences_parsed = Object.values(academic_experiences)
  const work_experiences_parsed = Object.values(work_experiences)
  const projects_parsed = Object.values(projects)
  const social_links_parsed = Object.values(social_links)
  const hasVisiblePortfolioInfo = Boolean(
    skills_parsed.length ||
    soft_skills_parsed.length ||
    academic_formations_parsed.length ||
    academic_experiences_parsed.length ||
    work_experiences_parsed.length ||
    projects_parsed.length,
  )

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <div className="flex flex-col gap-10">
        <div className="bg-background-dark flex flex-col gap-8 py-8">
          <Hero {...profile} />

          {!!social_links_parsed.length && (
            <SocialLinks social_links={social_links_parsed} />
          )}
        </div>

        {(!!skills_parsed.length || !!soft_skills_parsed.length) && (
          <Skills skills={skills_parsed} soft_skills={soft_skills_parsed} />
        )}

        {!!academic_formations_parsed.length && (
          <AcademicFormations academic_formations={academic_formations_parsed} />
        )}

        {!!academic_experiences_parsed.length && (
          <AcademicExperiences academic_experiences={academic_experiences_parsed} />
        )}

        {!!work_experiences_parsed.length && (
          <WorkExperiences work_experiences={work_experiences_parsed} />
        )}

        {!!projects_parsed.length && (
          <Projects projects={projects_parsed} />
        )}

        {!hasVisiblePortfolioInfo && (
          <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
            <div className="rounded-2xl border border-dashed border-primary/20 bg-white px-6 py-8 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-primary-soft">
                Portafolio privado
              </p>
              <h2 className="mt-2 font-serif text-2xl text-background-dark">
                La información profesional no está disponible
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-neutral-medium">
                Este usuario decidió mantener privadas sus habilidades, estudios, experiencia, proyectos y enlaces.
              </p>
            </div>
          </section>
        )}
      </div>

      <Footer
        first_name={profile.first_name}
        last_name={profile.last_name}
        professions={profile.professions}
        social_links={social_links_parsed}
      />
    </div>
  )
}
