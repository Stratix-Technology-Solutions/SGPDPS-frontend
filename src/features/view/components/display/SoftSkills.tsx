import { VisibilityList } from './VisibilityList'
import { useGetSoftSkills } from '../../../skills/hooks/useGetSoftSkills'

export const SoftSkills = ({ enabled }: { enabled: boolean }) => {
  const query = useGetSoftSkills({ enabled })

  return (
    <VisibilityList
      {...query}
      data={query.data?.data}
      url="/soft-skills"
      queryKey={['user', 'skills', 'soft']}
      loadingMessage="Cargando habilidades blandas..."
      emptyMessage="No hay habilidades blandas registradas."
      getLabel={(item) => item.name}
    />
  )
}
