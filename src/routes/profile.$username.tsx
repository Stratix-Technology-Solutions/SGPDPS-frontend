import { createFileRoute, notFound } from '@tanstack/react-router'
import api from '../app/api/axios'
import { Hero } from '../features/view/components/Hero'
import { Skills } from '../features/view/components/Skills'
import { WorkExperiences } from '../features/view/components/WorkExperiences'
import { Projects } from '../features/view/components/Projects'
import { AcademicExperiences } from '../features/view/components/AcademicExperiences'
import { Footer } from '../features/view/components/Footer'
import { UserNotFound } from '../features/view/components/UserNotFound'
import { SocialLinks } from '../features/view/components/SocialLinks'
import type { UserProfileResponse } from '../features/view/interfaces/user'

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const response = await api.get<UserProfileResponse>(`/profile/u/${params.username}`)
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
    academic_experiences,
    work_experiences,
    projects,
  } = Route.useLoaderData()

  const skills_parsed = Object.values(skills)
  const soft_skills_parsed = Object.values(soft_skills)
  const academic_experiences_parsed = Object.values(academic_experiences)
  const work_experiences_parsed = Object.values(work_experiences)
  const projects_parsed = Object.values(projects)
  const social_links_parsed = Object.values(social_links)

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

        {!!academic_experiences_parsed.length && (
          <AcademicExperiences academic_experiences={academic_experiences_parsed} />
        )}

        {!!work_experiences_parsed.length && (
          <WorkExperiences work_experiences={work_experiences_parsed} />
        )}

        {!!projects_parsed.length && (
          <Projects projects={projects_parsed} />
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
