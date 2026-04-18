import { useGetProfile } from './useGetProfile'

export const useProfileStatus = () => {
  const { data, isLoading, isError, error } = useGetProfile()

  const isProfileMissing = isError && error?.response?.status === 404

  return {
    profile: data,
    hasProfile: Boolean(data),
    isLoadingProfile: isLoading,
    isProfileMissing,
    isProfileError: isError && !isProfileMissing,
    profileError: isError ? error : null,
  }
}
