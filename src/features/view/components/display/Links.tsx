import { VisibilityList } from './VisibilityList'
import { useGetLinks } from '../../../links/hooks/useGetLink'

export const Links = () => {
  const query = useGetLinks()

  return (
    <VisibilityList
      {...query}
      data={query.data?.data}
      url="/links"
      queryKey={['user', 'links']}
      loadingMessage="Cargando enlaces..."
      emptyMessage="No hay enlaces registrados."
      getLabel={(item) => item.url}
    />
  )
}
