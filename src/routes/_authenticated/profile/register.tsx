import { createFileRoute } from '@tanstack/react-router'
import { ProfileForm } from '../../../features/profile/components/ProfileForm'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'
import { useCreateProfile } from '../../../features/profile/hooks/useCreateProfile'
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner'

export const Route = createFileRoute('/_authenticated/profile/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: currentProfile, isLoading } = useGetProfile()
  const { mutate: create, error, isPending, isSuccess } = useCreateProfile()
  const hasProfile = Boolean(currentProfile)

  if (isLoading || hasProfile) return <LoadingSpinner message="Verificando tu perfil..." />

  return (
    <ProfileForm
      mode="register"
      onSubmit={create}
      error={error}
      isPending={isPending}
      isSuccess={isSuccess}
      successMessage="Perfil creado exitosamente."
      title="Completa tu perfil"
      subtitle="Esta información será visible en tu portafolio público."
      submitLabel="Guardar perfil"
      pendingLabel="Guardando..."
      avatarUrl={currentProfile?.picture}
    />
  )
}
