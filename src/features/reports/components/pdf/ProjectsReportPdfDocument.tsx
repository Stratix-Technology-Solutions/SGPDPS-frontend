import {
  Document,
  Link as PdfLink,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type {
  ProjectReport,
  ProjectsReportExport,
} from '../../interfaces/report-projects.interface'
import {
  getProjectsReportInsights,
  projectVisibilityLabel,
} from '../../utils/projectsReport'

interface Props {
  data: ProjectsReportExport
}

const C = {
  navy: '#0f172a',
  blue: '#1d4ed8',
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#e2e8f0',
  muted: '#64748b',
  text: '#0f172a',
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
    paddingBottom: 42,
    backgroundColor: C.bg,
    color: C.text,
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
  header: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: C.navy,
    color: C.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 5,
    color: '#cbd5e1',
  },
  summary: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  summaryCard: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    backgroundColor: C.white,
  },
  summaryValue: {
    color: C.blue,
    fontSize: 16,
    fontWeight: 700,
  },
  summaryLabel: {
    marginTop: 3,
    color: C.muted,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    marginBottom: 7,
    color: C.navy,
    fontSize: 12,
    fontWeight: 700,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 10,
    backgroundColor: '#e0e7ff',
    color: C.navy,
    fontSize: 8,
  },
  empty: {
    color: C.muted,
    fontSize: 8,
  },
  project: {
    marginBottom: 10,
    padding: 11,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    backgroundColor: C.white,
  },
  projectTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  projectTitle: {
    color: C.navy,
    fontSize: 11,
    fontWeight: 700,
  },
  status: {
    color: C.blue,
    fontSize: 8,
    fontWeight: 700,
  },
  label: {
    marginTop: 7,
    marginBottom: 2,
    color: C.muted,
    fontSize: 7,
    fontWeight: 700,
  },
  text: {
    color: C.text,
    fontSize: 8.5,
    lineHeight: 1.4,
  },
  meta: {
    marginTop: 7,
    color: C.muted,
    fontSize: 8,
  },
  link: {
    marginTop: 4,
    color: C.blue,
    fontSize: 8,
    textDecoration: 'none',
  },
  footer: {
    position: 'absolute',
    bottom: 18,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: C.muted,
    fontSize: 7,
  },
})

export const ProjectsReportPdfDocument = ({ data }: Props) => {
  const insights = getProjectsReportInsights(data.report, data.visibility)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>REPORTE DE PROYECTOS</Text>
          <Text style={styles.subtitle}>
            {data.report.user.username} | Generado: {new Date(data.generatedAt).toLocaleDateString('es-BO')}
          </Text>
          <Text style={styles.subtitle}>Filtro aplicado: {projectVisibilityLabel[data.visibility]}</Text>
        </View>

        <View style={styles.summary}>
          <SummaryCard value={insights.projects.length} label="Proyectos incluidos" />
          <SummaryCard value={insights.completed} label="Completados" />
          <SummaryCard value={insights.inProgress} label="En curso" />
          <SummaryCard value={insights.withEvidence} label="Con evidencia" />
        </View>

        <Highlights title="TECNOLOGÍAS MÁS UTILIZADAS" items={insights.topSkills} />
        <Highlights title="ROLES MÁS FRECUENTES" items={insights.topRoles} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCIA POR PROYECTO</Text>
          {insights.projects.length > 0
            ? insights.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            : <Text style={styles.empty}>No hay proyectos para el filtro seleccionado.</Text>}
        </View>

        <View style={styles.footer} fixed>
          <Text>FolioX | Reporte profesional de proyectos</Text>
          <Text render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}

const SummaryCard = ({ value, label }: { value: number, label: string }) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryValue}>{value}</Text>
    <Text style={styles.summaryLabel}>{label}</Text>
  </View>
)

const Highlights = ({
  title,
  items,
}: {
  title: string
  items: [string, number][]
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {items.length > 0
      ? (
          <View style={styles.tagRow}>
            {items.map(([name, count]) => (
              <Text key={name} style={styles.tag}>{name} ({count})</Text>
            ))}
          </View>
        )
      : <Text style={styles.empty}>Sin información registrada.</Text>}
  </View>
)

const ProjectCard = ({ project }: { project: ProjectReport }) => (
  <View style={styles.project} wrap={false}>
    <View style={styles.projectTop}>
      <Text style={styles.projectTitle}>{project.title}</Text>
      <Text style={styles.status}>{project.status}</Text>
    </View>

    {!!project.contributions && (
      <>
        <Text style={styles.label}>APORTE PERSONAL</Text>
        <Text style={styles.text}>{project.contributions}</Text>
      </>
    )}

    {!!project.description && (
      <>
        <Text style={styles.label}>CONTEXTO DEL PROYECTO</Text>
        <Text style={styles.text}>{project.description}</Text>
      </>
    )}

    {!!project.roles.length && (
      <Text style={styles.meta}>Roles: {project.roles.map((role) => role.name).join(' · ')}</Text>
    )}
    {!!project.skills.length && (
      <Text style={styles.meta}>Tecnologías: {project.skills.map((skill) => skill.name).join(' · ')}</Text>
    )}
    {!!project.categories.length && (
      <Text style={styles.meta}>Categorías: {project.categories.map((category) => category.name).join(' · ')}</Text>
    )}
    <Text style={styles.meta}>
      Evidencia registrada: {project.assets_count} recurso{project.assets_count === 1 ? '' : 's'}
      {' | '}
      Enlaces: {project.links.length}
    </Text>
    {project.links.map((link) => (
      <PdfLink key={link.id} src={link.url} style={styles.link}>{link.url}</PdfLink>
    ))}
  </View>
)
