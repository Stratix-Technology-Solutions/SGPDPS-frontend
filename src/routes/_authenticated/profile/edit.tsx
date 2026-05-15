import { createFileRoute } from '@tanstack/react-router'
import { ProfileForm } from '../../../features/profile/components/ProfileForm'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'
import { useUpdateProfile } from '../../../features/profile/hooks/useUpdateProfile'
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner'

export const Route = createFileRoute('/_authenticated/profile/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isLoading, isError, error: errorGetData, isSuccess } = useGetProfile()
  const { mutate: update, error, isPending, isSuccess: isSuccessUpdate } = useUpdateProfile()
  const isProfileMissing = isError && errorGetData.response?.status === 404

  if (isLoading) return <LoadingSpinner message="Cargando tu perfil..." />
  if (isProfileMissing) return <LoadingSpinner message="Redirigiendo al registro de perfil..." />
  if (!isSuccess) return null

  return (
    <ProfileForm
      mode="edit"
      initialData={data || undefined}
      onSubmit={update}
      error={error}
      isPending={isPending}
      isSuccess={isSuccessUpdate}
      successMessage="Perfil actualizado exitosamente."
      title="Edita tu perfil"
      subtitle="Esta información será visible en tu portafolio público."
      submitLabel="Actualizar perfil"
      pendingLabel="Guardando..."
    />
  )
}
