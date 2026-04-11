import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <h1 className="text-center py-15 font-extrabold text-4xl">Bienvenido/a a FolioX</h1>
  )
}
