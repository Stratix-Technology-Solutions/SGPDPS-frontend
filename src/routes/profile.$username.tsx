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
  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      <Navbar />
      <Hero />
      <hr className="border-[#1B3D87]/08 max-w-5xl mx-auto px-6" />
      <Skills />
      <hr className="border-[#1B3D87]/08 max-w-5xl mx-auto px-6" />
      <WorkExperiences />
      <hr className="border-[#1B3D87]/08 max-w-5xl mx-auto px-6" />
      <Projects />
      <hr className="border-[#1B3D87]/08 max-w-5xl mx-auto px-6" />
      <AcademicExperiences />
      <Footer />
    </div>
  )
}
