import { createFileRoute, notFound } from '@tanstack/react-router'
import api from '../app/api/axios'

export const Route = createFileRoute('/profile/$username')({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      console.log(params.username)
      const response = await api.get(`/profile/u/${params.username}`)
      return response.data
    } catch (error) {
      throw notFound()
    }
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()

  const {
    profile: {
      first_name,
      last_name,
      biography,
      country,
      professions,
    },
    username,
  } = data

  return (
    <div>
      <h1>{first_name} {last_name}</h1>

      <div>
        <span>{username}</span>
        <span>{country}</span>
      </div>

      <p>{biography}</p>

      <ul>
        {professions.map(p => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  )
}
