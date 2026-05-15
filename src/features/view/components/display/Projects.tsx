import { VisibilityList } from './VisibilityList'
import { useGetProjects } from '../../../projects/hooks/useProjects'

export const Projects = () => {
  const query = useGetProjects()

  return (
    <VisibilityList
      {...query}
      data={query.data?.data}
      url="/projects"
      queryKey={['user', 'projects']}
      loadingMessage="Cargando proyectos..."
      emptyMessage="No hay proyectos registrados."
      getLabel={(item) => item.title}
    />
  )
}
