import type { AcademicFormationResponse } from '../dtos/academicFormation.interface'
import { getAcademicFormationLevelLabel } from '../utils/academicFormationLabels'

interface Props {
  item: AcademicFormationResponse
  isPending: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDeleteAcademicFormation = ({ item, isPending, onConfirm, onCancel }: Props) => {
  return (
    <>
      <p className="text-neutral-medium/70">
        ¿Estás seguro de que deseas eliminar la formación académica de{' '}
        <span className="font-semibold text-background-dark">{item.institution}</span>
        {' '}({getAcademicFormationLevelLabel(item.education_level)})? Esta acción no se puede deshacer.
      </p>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border cursor-pointer hover:bg-neutral-light"
        >
          Cancelar
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Eliminando...' : 'Sí, eliminar'}
        </button>
      </div>
    </>
  )
}
