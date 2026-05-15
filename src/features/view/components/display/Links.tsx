import { VisibilityList } from './VisibilityList'
import { useGetLinks } from '../../../links/hooks/useGetLink'

export const Links = ({ enabled }: { enabled: boolean }) => {
  const query = useGetLinks({ enabled })

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
