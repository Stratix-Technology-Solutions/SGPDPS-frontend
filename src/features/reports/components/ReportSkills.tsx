import { useState } from 'react'
import { FiDownload, FiEye, FiEyeOff } from 'react-icons/fi'
import { useGetReportSkills } from '../hooks/useGetReportSkills'
import { useExportSkillsReport } from '../hooks/useExportSkillsReport'
import type {
  DomainLevels,
  SkillsReportFilter,
} from '../interfaces/report-skills.interface'

const levelStyles: Record<keyof DomainLevels, string> = {
  'Básico': 'bg-amber-50 text-amber-700',
  Intermedio: 'bg-blue-50 text-primary',
  Avanzado: 'bg-green-50 text-green-700',
}

export const ReportSkills = () => {
  const { data, isLoading, isError, error } = useGetReportSkills()
  const { exportSkillsReport, isExporting, exportError } = useExportSkillsReport()
  const [filter, setFilter] = useState<SkillsReportFilter>('all')

  if (isLoading) {
    return (
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 flex justify-center">
        <div className="w-8 h-8 border-2 border-primary-soft/30 border-t-primary-soft rounded-full animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-white border border-red-200 rounded-2xl p-6">
        <p className="text-red-500">
          {error?.response?.data?.message ?? 'Error al generar el reporte'}
        </p>
      </div>
    )
  }

  if (!data) return null

  const hiddenSkills = data.summary.hidden_technical_skills
    + data.summary.hidden_soft_skills

  const advancedSkills = data.technical_skills.filter(
    (skill) => skill.domain_level === 'Avanzado',
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-background-dark">
            Generar reporte de habilidades
          </h2>
          <p className="text-sm text-neutral-medium mt-1">
            Descarga una versión compartible para procesos de selección.
          </p>
        </div>

        <label htmlFor="skills-report-filter" className="flex flex-col gap-1 text-sm text-neutral-medium">
          Tipo de habilidad
          <select
            id="skills-report-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value as SkillsReportFilter)}
            className="min-w-44 px-3 py-2 rounded-xl border border-neutral-200 bg-white text-background-dark"
          >
            <option value="all">Todas</option>
            <option value="technical">Técnicas</option>
            <option value="soft">Blandas</option>
          </select>
        </label>

        <button
          type="button"
          disabled={isExporting}
          onClick={() => exportSkillsReport(data, filter)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-white transition-colors hover:bg-primary-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiDownload />
          {isExporting ? 'Generando...' : 'Descargar reporte'}
        </button>
      </div>

      {exportError && (
        <div className="bg-white border border-red-200 rounded-2xl p-4">
          <p className="text-sm text-red-500">{exportError}</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Habilidades técnicas" value={data.summary.total_technical_skills} color="text-primary" />
        <SummaryCard label="Habilidades blandas" value={data.summary.total_soft_skills} color="text-purple-700" />
        <SummaryCard label="Visibles" value={data.summary.visible_technical_skills + data.summary.visible_soft_skills} color="text-green-600" />
        <SummaryCard label="Ocultas" value={hiddenSkills} color="text-red-500" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <h3 className="font-semibold text-background-dark mb-4">
            Nivel de dominio técnico
          </h3>

          <div className="flex flex-col gap-3">
            {Object.entries(data.domain_levels).map(([level, count]) => (
              <div key={level} className="flex justify-between items-center text-sm">
                <span className="text-neutral-medium">{level}</span>
                <span className="font-semibold text-background-dark">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <h3 className="font-semibold text-background-dark mb-4">
            Fortalezas destacadas
          </h3>

          <div className="flex flex-wrap gap-2">
            {advancedSkills.length > 0
              ? advancedSkills.map((skill) => (
                  <span key={skill.id} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))
              : <span className="text-sm text-neutral-medium">Aún no registraste habilidades avanzadas.</span>}
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-4">
          <h3 className="font-semibold text-background-dark mb-4">
            Observaciones
          </h3>

          <div className="flex flex-col gap-2 text-sm text-neutral-medium">
            <span>{hiddenSkills} habilidades ocultas en tu portafolio</span>
            <span>{data.summary.total_technical_skills} habilidades técnicas registradas</span>
            <span>{data.summary.total_soft_skills} habilidades blandas registradas</span>
          </div>
        </div>
      </div>

      <SkillSection title="Habilidades técnicas">
        {data.technical_skills.map((skill) => (
          <div key={skill.id} className="bg-white border border-neutral-200 rounded-2xl p-4 flex justify-between items-center gap-4">
            <span className="font-semibold text-background-dark">{skill.name}</span>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                skill.domain_level
                  ? levelStyles[skill.domain_level]
                  : 'bg-neutral-100 text-neutral-medium'
              }`}
              >
                {skill.domain_level ?? 'Nivel no especificado'}
              </span>
              <VisibilityBadge isVisible={skill.is_visible} />
            </div>
          </div>
        ))}
      </SkillSection>

      <SkillSection title="Habilidades blandas">
        {data.soft_skills.map((skill) => (
          <div key={skill.id} className="bg-white border border-neutral-200 rounded-2xl p-4 flex justify-between items-center gap-4">
            <span className="font-semibold text-background-dark">{skill.name}</span>
            <VisibilityBadge isVisible={skill.is_visible} />
          </div>
        ))}
      </SkillSection>
    </div>
  )
}

const SummaryCard = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="bg-white border border-neutral-200 rounded-2xl p-4">
    <p className="text-sm text-neutral-medium">{label}</p>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
)

const VisibilityBadge = ({ isVisible }: { isVisible: boolean }) => (
  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
    isVisible ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
  }`}
  >
    {isVisible ? <FiEye size={12} /> : <FiEyeOff size={12} />}
    {isVisible ? 'Visible' : 'Oculta'}
  </span>
)

const SkillSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-xl font-semibold text-background-dark">{title}</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
)
