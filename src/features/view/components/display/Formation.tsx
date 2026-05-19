import { VisibilityList } from './VisibilityList'
import { useAcademicFormation } from '../../../academicFormation/hooks/useAcademicFormation'
import { getAcademicFormationLevelLabel } from '../../../academicFormation/utils/academicFormationLabels'

export const Formation = ({ enabled }: { enabled: boolean }) => {
  const query = useAcademicFormation({ enabled })

  return (
    <VisibilityList
      {...query}
      data={query.data?.data}
      url="/academic-formations"
      queryKey={['user', 'academic-formations']}
      loadingMessage="Cargando formaciones académicas..."
      emptyMessage="No hay formaciones académicas registradas."
      getLabel={(item) => `${item.institution} · ${getAcademicFormationLevelLabel(item.education_level)}`}
    />
  )
}
