import { createFileRoute, notFound } from '@tanstack/react-router'
import api from '../app/api/axios'
import { Navbar } from '../features/view/components/Navbar'
import { Hero } from '../features/view/components/Hero'
import { Skills } from '../features/view/components/Skills'
import { WorkExperiences } from '../features/view/components/WorkExperiences'
import { Projects } from '../features/view/components/Projects'
import { AcademicExperiences } from '../features/view/components/AcademicExperiences'
import { Footer } from '../features/view/components/Footer'
import { UserNotFound } from '../features/view/components/UserNotFound'
import { SocialLinks } from '../features/view/components/SocialLinks'
import { user } from '../features/view/constants/user'

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const response = await api.get(`/profile/u/${params.username}`)
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
  } = user

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Navbar />

      <div className="flex flex-col gap-10">
        <div className="bg-background-dark flex flex-col gap-8 py-8">
          <Hero {...profile} />
          <SocialLinks social_links={social_links} />
        </div>

        <Skills skills={skills} soft_skills={soft_skills} />

        <AcademicExperiences academic_experiences={academic_experiences} />

        <WorkExperiences work_experiences={work_experiences} />

        <Projects projects={projects} />
      </div>

      <Footer
        first_name={profile.first_name}
        last_name={profile.last_name}
        professions={profile.professions}
        social_links={social_links}
      />
    </div>
  )
}
