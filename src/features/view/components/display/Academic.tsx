import { VisibilityList } from './VisibilityList'
import { useAcademic } from '../../../academic/hooks/useAcademic'

export const Academic = () => {
  const query = useAcademic()

  return (
    <VisibilityList
      {...query}
      data={query.data?.data}
      url="/academic-experiences"
      queryKey={['user', 'academic-experiences']}
      loadingMessage="Cargando experiencias académicas..."
      emptyMessage="No hay experiencias académicas registradas."
      getLabel={(item) => item.title}
    />
  )
}
