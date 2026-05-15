import { VisibilityList } from './VisibilityList'
import { useGetTechnicalSkills } from '../../../skills/hooks/useGetTechnicalSkills'

export const Skills = () => {
  const query = useGetTechnicalSkills()

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
