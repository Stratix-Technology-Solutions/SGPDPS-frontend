import { useGetProfile } from './useGetProfile'

export const useProfileStatus = () => {
  const { data, isLoading, isError, error } = useGetProfile()

  const isProfileMissing = isError && error?.response?.status === 404
  const hasProfile = !isError && Boolean(data)

  return {
    profile: data,
    hasProfile,
    isLoadingProfile: isLoading,
    isProfileMissing,
    isProfileError: isError && !isProfileMissing,
    profileError: isError ? error : null,
  }
}
