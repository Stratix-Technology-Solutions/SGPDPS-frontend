import {
  Document,
  Image,
  Link as PdfLink,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

import { formatDate } from '../../../view/utils/formatDate'
import type { PortfolioExport } from '../../interface'
import {
  FileName,
  formatMaybeDate,
  formatRange,
  getInitials,
  toVisibleItems,
} from '../../utils/pdfHelper'

interface Props {
  data: PortfolioExport
}

const C = {
  navySoft: '#1e293b',

  bg: '#f8fafc',
  white: '#ffffff',

  border: '#e2e8f0',

  text: '#0f172a',
  textMid: '#334155',
  textMuted: '#64748b',
  textFaint: '#94a3b8',

  leftBg: '#0f172a',
  leftBorder: '#1e293b',
  leftText: '#e2e8f0',
  leftMuted: '#94a3b8',
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    color: C.text,
    backgroundColor: C.bg,
    flexDirection: 'column',
  },

  header: {
    backgroundColor: C.leftBg,
    paddingTop: 28,
    paddingBottom: 20,
    paddingHorizontal: 28,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 18,
  },

  avatarWrap: {
    alignItems: 'center',
    marginTop: 2,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    objectFit: 'cover',
    borderWidth: 4,
    borderColor: C.leftBg,
  },

  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: C.navySoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: C.leftBg,
  },

  avatarFallbackText: {
    fontSize: 28,
    fontWeight: 700,
    color: C.white,
  },

  nameBlock: {
    flex: 1,
    paddingRight: 12,
  },

  nameText: {
    fontSize: 28,
    fontWeight: 700,
    color: C.white,
    lineHeight: 1.12,
  },

  profRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },

  headerLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },

  headerLinkBadge: {
    backgroundColor: C.white,
    color: C.leftBg,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    fontSize: 7.4,
  },

  profTag: {
    borderWidth: 1,
    borderColor: C.leftBorder,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: C.leftText,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 7.4,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  headerDivider: {
    height: 1,
    backgroundColor: C.leftBorder,
    marginVertical: 14,
  },

  headerInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },

  infoCol: {
    minWidth: 125,
    flexGrow: 1,
  },

  infoLabel: {
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
    color: C.leftMuted,
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 9.8,
    fontWeight: 600,
    letterSpacing: 0.2,
    color: C.leftText,
    lineHeight: 1.5,
  },

  bioText: {
    fontSize: 10,
    color: C.leftText,
    lineHeight: 1.6,
    marginBottom: 14,
    opacity: 0.9,
    maxWidth: '70%',
  },

  skillsContainer: {
    marginBottom: 0,
  },

  skillGroup: {
    marginBottom: 10,
  },

  skillGroupTitle: {
    fontSize: 8.5,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: 1.3,
    color: C.leftBg,
    marginBottom: 8,
  },

  sideTagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  sideTag: {
    backgroundColor: '#eef3fb',
    color: C.leftBg,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 7.3,
  },

  sideSoftTag: {
    borderWidth: 1,
    borderColor: '#cfd9e6',
    backgroundColor: '#ffffff',
    color: C.leftBg,
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 7.3,
  },

  main: {
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 28,
    backgroundColor: C.white,
  },

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingBottom: 4,
  },

  sectionPillText: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: C.leftBg,
  },

  itemBlock: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eef2f6',
  },

  lastItemBlock: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    marginBottom: 4,
  },

  itemTitle: {
    fontSize: 11.5,
    fontWeight: 700,
    color: C.text,
    flexShrink: 1,
    wordBreak: 'break-word',
  },
  statusBadgeBase: {
    fontSize: 7,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginLeft: 8,
    fontWeight: 700,
    letterSpacing: 0.6,
  },
  statusEnCurso: {
    backgroundColor: '#e2e8f0',
    color: '#0f172a',
  },
  statusCompletado: {
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
  },
  itemDate: {
    fontSize: 7.5,
    color: C.textMuted,
    backgroundColor: '#f1f5f9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    marginLeft: 8,
  },

  itemSubtitle: {
    fontSize: 8.5,
    fontWeight: 600,
    color: C.leftBg,
    marginBottom: 6,
  },

  itemDescription: {
    fontSize: 9,
    color: C.textMid,
    lineHeight: 1.55,
    marginBottom: 8,
  },

  rolesText: {
    fontSize: 7.5,
    fontWeight: 600,
    color: C.leftBg,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
    marginBottom: 6,
  },

  tag: {
    backgroundColor: '#eef2f6',
    color: C.leftBg,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 7,
    fontSize: 6.8,
  },

  linksRowMain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },

  link: {
    fontSize: 7.2,
    color: C.leftBg,
    textDecoration: 'none',
    backgroundColor: '#eef2f6',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 12,
  },

  assetLink: {
    fontSize: 7.2,
    color: C.textMuted,
    textDecoration: 'none',
    marginTop: 4,
  },

  footer: {
    position: 'absolute',
    bottom: 12,
    right: 24,
    fontSize: 7.2,
    color: C.textFaint,
  },

  footerLeft: {
    position: 'absolute',
    bottom: 12,
    left: 24,
    fontSize: 7.2,
    color: C.textFaint,
  },
})

const SectionTitle = ({ title }: { title: string }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionPillText}>{title}</Text>
  </View>
)

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export const PortfolioPdfDocument = ({ data }: Props) => {
  const { profile } = data

  const fullName = `${profile.first_name} ${profile.last_name}`.trim()

  const visibleSkills = toVisibleItems(data.skills ?? [])
  const visibleSoftSkills = toVisibleItems(data.softSkills ?? [])
  const visibleLinks = toVisibleItems(data.links ?? [])
  const visibleWorkExperiences = toVisibleItems(data.workExperiences ?? [])
  const visibleAcademicExperiences = toVisibleItems(data.academicExperiences ?? [])
  const visibleAcademicFormations = toVisibleItems(data.academicFormations ?? [])
  const visibleProjects = toVisibleItems(data.projects ?? [])

  const hasPicture = !!profile.picture && profile.picture.startsWith('data:')

  return (
    <Document
      title={`Portafolio profesional - ${fullName}`}
      author="FolioX"
      subject={profile.username}
      creator="FolioX"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.nameBlock}>
              <Text style={styles.nameText}>
                {`${profile.first_name} ${profile.last_name}`}
              </Text>
              {!!(profile.professions ?? []).length && (
                <View>
                  <View style={styles.profRow}>
                    {profile.professions.map((p) => (
                      <Text key={p} style={styles.profTag}>
                        {p}
                      </Text>
                    ))}
                  </View>

                  {!!visibleLinks.length && (
                    <View style={styles.headerLinksRow}>
                      {visibleLinks.map((link) => (
                        <PdfLink key={link.id} src={link.url} style={styles.headerLinkBadge}>
                          {getHostname(link.url)}
                        </PdfLink>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>

            <View style={styles.avatarWrap}>
              {hasPicture ? (
                <Image src={profile.picture!} style={styles.avatar} />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>
                    {getInitials(profile.first_name, profile.last_name)}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.headerDivider} />

          <View style={styles.headerInfoGrid}>
            {!!profile.country && (
              <Text style={styles.infoValue}>{profile.country}</Text>
            )}
            {!!profile.phone && (
              <Text style={styles.infoValue}>{profile.phone}</Text>
            )}
            {!!profile.date_of_birth && (
              <Text style={styles.infoValue}>
                {formatMaybeDate(profile.date_of_birth)}
              </Text>
            )}
            {!!profile.gender && (
              <Text style={styles.infoValue}>{profile.gender}</Text>
            )}
          </View>

          {!!profile.biography && (
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Acerca de mí</Text>
              <Text style={styles.bioText}>{profile.biography}</Text>
            </View>
          )}
        </View>

        <View style={styles.main}>
          {(visibleSkills.length > 0 || visibleSoftSkills.length > 0) && (
            <View style={styles.section}>
              <SectionTitle title="Habilidades" />
              <View style={styles.skillsContainer}>
                {!!visibleSkills.length && (
                  <View style={styles.skillGroup}>
                    <Text style={styles.skillGroupTitle}>técnicas</Text>
                    <View style={styles.sideTagGroup}>
                      {visibleSkills.map((skill) => (
                        <Text key={skill.id} style={styles.sideTag}>
                          {skill.name}
                          {skill.domain_level ? ` · ${skill.domain_level}` : ''}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {!!visibleSoftSkills.length && (
                  <View style={styles.skillGroup}>
                    <Text style={styles.skillGroupTitle}>blandas</Text>
                    <View style={styles.sideTagGroup}>
                      {visibleSoftSkills.map((skill) => (
                        <Text key={skill.id} style={styles.sideSoftTag}>
                          {skill.name}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {!!visibleProjects.length && (
            <View style={styles.section}>
              <SectionTitle title="Proyectos" />
              {visibleProjects.map((project, idx) => (
                <View
                  key={project.id}
                  style={
                    idx === visibleProjects.length - 1
                      ? [styles.itemBlock, styles.lastItemBlock]
                      : [styles.itemBlock]
                  }
                >
                  <View style={styles.headerRow}>
                    <Text style={styles.itemTitle}>{project.title}</Text>
                    <Text
                      style={[
                        styles.statusBadgeBase,
                        project.status === 'En curso'
                          ? styles.statusEnCurso
                          : styles.statusCompletado,
                      ]}
                    >
                      {project.status === 'En curso' ? 'En curso' : 'Completado'}
                    </Text>
                  </View>
                  {!!project.roles.length && (
                    <Text style={styles.rolesText}>
                      {project.roles.map((r) => r.name).join(' · ')}
                    </Text>
                  )}
                  {!!project.description && (
                    <Text style={styles.itemDescription}>{project.description}</Text>
                  )}
                  {!!project.skills.length && (
                    <View style={styles.tagRow}>
                      {project.skills.map((skill) => (
                        <Text key={skill.id} style={styles.tag}>
                          {skill.name}
                        </Text>
                      ))}
                    </View>
                  )}
                  {!!project.links.length && (
                    <View style={styles.linksRowMain}>
                      {project.links.map((link) => (
                        <PdfLink key={link.id} src={link.url} style={styles.link}>
                          {getHostname(link.url)}
                        </PdfLink>
                      ))}
                    </View>
                  )}
                  {!!project.assets.length && (
                    <View>
                      {project.assets.map((asset, index) => (
                        <PdfLink key={asset.id} src={asset.url} style={styles.assetLink}>
                          ↗ <FileName path={asset.path} index={index} />
                        </PdfLink>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {!!visibleWorkExperiences.length && (
            <View style={styles.section}>
              <SectionTitle title="Experiencia laboral" />
              {visibleWorkExperiences.map((exp, idx) => (
                <View
                  key={exp.id}
                  style={
                    idx === visibleWorkExperiences.length - 1
                      ? [styles.itemBlock, styles.lastItemBlock]
                      : [styles.itemBlock]
                  }
                >
                  <View style={styles.headerRow}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemDate}>
                      {formatRange(exp.start_date, exp.end_date)}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  {!!exp.description && (
                    <Text style={styles.itemDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {!!visibleAcademicFormations.length && (
            <View style={styles.section}>
              <SectionTitle title="Formación académica" />
              {visibleAcademicFormations.map((f, idx) => (
                <View
                  key={f.id}
                  style={
                    idx === visibleAcademicFormations.length - 1
                      ? [styles.itemBlock, styles.lastItemBlock]
                      : [styles.itemBlock]
                  }
                >
                  <View style={styles.headerRow}>
                    <Text style={styles.itemTitle}>{f.institution}</Text>
                    {!!f.emission_date && (
                      <Text style={styles.itemDate}>{formatMaybeDate(f.emission_date)}</Text>
                    )}
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {f.education_level}
                    {f.field_of_study ? ` · ${f.field_of_study}` : ''}
                    {` · ${f.status}`}
                  </Text>
                  {!!f.description && (
                    <Text style={styles.itemDescription}>{f.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {!!visibleAcademicExperiences.length && (
            <View style={styles.section}>
              <SectionTitle title="Experiencia académica" />
              {visibleAcademicExperiences.map((exp, idx) => (
                <View
                  key={exp.id}
                  style={
                    idx === visibleAcademicExperiences.length - 1
                      ? [styles.itemBlock, styles.lastItemBlock]
                      : [styles.itemBlock]
                  }
                >
                  <View style={styles.headerRow}>
                    <Text style={styles.itemTitle}>{exp.title}</Text>
                    <Text style={styles.itemDate}>
                      {formatRange(exp.start_date, exp.end_date)}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.institution}</Text>
                  {!!exp.description && (
                    <Text style={styles.itemDescription}>{exp.description}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
        <Text style={styles.footerLeft} fixed>
          {formatDate(data.generatedAt)}
        </Text>
      </Page>
    </Document>
  )
}
