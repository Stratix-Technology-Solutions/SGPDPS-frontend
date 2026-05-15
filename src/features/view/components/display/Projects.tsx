import { VisibilityList } from './VisibilityList'
import { useGetProjects } from '../../../projects/hooks/useProjects'

export const Projects = ({ enabled }: { enabled: boolean }) => {
  const query = useGetProjects({ enabled })

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
