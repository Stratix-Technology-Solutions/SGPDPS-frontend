import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { SkillsReportExport } from '../../interfaces/report-skills.interface'
import { filterLabel, getSkillRows } from '../../utils/skillsReport'

interface Props {
  data: SkillsReportExport
}

const C = {
  navy: '#0f172a',
  blue: '#1d4ed8',
  bg: '#f8fafc',
  white: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  muted: '#64748b',
}

const styles = StyleSheet.create({
  page: {
    padding: 32,
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
  table: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    backgroundColor: C.white,
  },
  headerRow: {
    backgroundColor: '#e2e8f0',
    fontWeight: 700,
  },
  nameCell: {
    width: '40%',
  },
  levelCell: {
    width: '35%',
  },
  visibilityCell: {
    width: '25%',
  },
  empty: {
    padding: 10,
    color: C.muted,
    backgroundColor: C.white,
  },
  softGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  softCard: {
    width: '48%',
    padding: 10,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    backgroundColor: C.white,
  },
  softSkillName: {
    color: C.navy,
    fontSize: 10,
    fontWeight: 700,
  },
  softSkillVisibility: {
    marginTop: 4,
    color: C.muted,
    fontSize: 8,
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

export const SkillsReportPdfDocument = ({ data }: Props) => {
  const rows = getSkillRows(data.report, data.filter)
  const technicalRows = rows.filter((row) => row.type === 'Técnica')
  const softRows = rows.filter((row) => row.type === 'Blanda')

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>REPORTE DE HABILIDADES</Text>
          <Text style={styles.subtitle}>
            {data.report.user.username} | Generado: {new Date(data.generatedAt).toLocaleDateString('es-BO')}
          </Text>
          <Text style={styles.subtitle}>Filtro aplicado: {filterLabel[data.filter]}</Text>
        </View>

        <View style={styles.summary}>
          <SummaryCard value={rows.length} label="Habilidades incluidas" />
          <SummaryCard value={technicalRows.length} label="Técnicas" />
          <SummaryCard value={softRows.length} label="Blandas" />
        </View>

        {data.filter !== 'soft' && (
          <SkillsTable title="HABILIDADES TÉCNICAS" rows={technicalRows} />
        )}

        {data.filter !== 'technical' && (
          <SoftSkillsCards rows={softRows} />
        )}

        <View style={styles.footer} fixed>
          <Text>FolioX | Reporte profesional de habilidades</Text>
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

const SkillsTable = ({
  title,
  rows,
}: {
  title: string
  rows: ReturnType<typeof getSkillRows>
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        <Text style={styles.nameCell}>Habilidad</Text>
        <Text style={styles.levelCell}>Nivel de dominio</Text>
        <Text style={styles.visibilityCell}>Visibilidad</Text>
      </View>
      {rows.length > 0
        ? rows.map((row) => (
            <View key={`${row.type}-${row.id}`} style={styles.row}>
              <Text style={styles.nameCell}>{row.name}</Text>
              <Text style={styles.levelCell}>{row.level}</Text>
              <Text style={styles.visibilityCell}>{row.visibility}</Text>
            </View>
          ))
        : <Text style={styles.empty}>No hay habilidades registradas.</Text>}
    </View>
  </View>
)

const SoftSkillsCards = ({ rows }: { rows: ReturnType<typeof getSkillRows> }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>HABILIDADES BLANDAS</Text>
    {rows.length > 0
      ? (
          <View style={styles.softGrid}>
            {rows.map((row) => (
              <View key={`${row.type}-${row.id}`} style={styles.softCard}>
                <Text style={styles.softSkillName}>{row.name}</Text>
                <Text style={styles.softSkillVisibility}>Visibilidad: {row.visibility}</Text>
              </View>
            ))}
          </View>
        )
      : <Text style={styles.empty}>No hay habilidades registradas.</Text>}
  </View>
)
