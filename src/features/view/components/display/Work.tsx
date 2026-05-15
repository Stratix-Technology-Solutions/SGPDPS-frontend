import { VisibilityList } from './VisibilityList'
import { useWorkExperiences } from '../../../work/hooks/useWorkExperiences'

export const Work = ({ enabled }: { enabled: boolean }) => {
  const query = useWorkExperiences({ enabled })

  return (
    <VisibilityList
      {...query}
      data={query.data}
      url="/work-experiences"
      queryKey={['work-experiences']}
      loadingMessage="Cargando experiencias laborales..."
      emptyMessage="No hay experiencias laborales registradas."
      getLabel={(item) => item.company}
    />
  )
}
