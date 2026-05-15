import { VisibilityList } from './VisibilityList'
import { useGetTechnicalSkills } from '../../../skills/hooks/useGetTechnicalSkills'

export const Skills = ({ enabled }: { enabled: boolean }) => {
  const query = useGetTechnicalSkills({ enabled })

  return (
    <VisibilityList
      {...query}
      data={query.data?.data}
      url="/skills"
      queryKey={['user', 'skills', 'technical']}
      loadingMessage="Cargando habilidades técnicas..."
      emptyMessage="No hay habilidades técnicas registradas."
      getLabel={(item) => item.name}
    />
  )
}
