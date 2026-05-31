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
import { toVisibleItems, formatMaybeDate, formatRange, getInitials, FileName } from '../../utils/helper'

interface Props {
  data: PortfolioExport
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 34,
    paddingHorizontal: 34,
    fontFamily: 'Helvetica',
    color: '#102033',
    backgroundColor: '#f6f8fc',
  },
  header: {
    borderRadius: 18,
    backgroundColor: '#102033',
    padding: 24,
    marginBottom: 18,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
  },
  headerGlow: {
    position: 'absolute',
    right: -30,
    top: -24,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#4870ff',
    opacity: 0.22,
  },
  headerContent: {
    flex: 1,
    paddingRight: 12,
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#7cc4ff',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    lineHeight: 1.1,
    fontWeight: 700,
    color: '#ffffff',
  },
  username: {
    marginTop: 4,
    fontSize: 11,
    color: '#cbd5e1',
  },
  professionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 14,
  },
  professionTag: {
    borderWidth: 1,
    borderColor: '#4b86ff55',
    backgroundColor: '#ffffff12',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#dbeafe',
    fontSize: 9,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#dbeafe',
    objectFit: 'cover',
    borderWidth: 3,
    borderColor: '#ffffff',
    alignSelf: 'center',
  },
  avatarFallback: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#dbeafe',
    borderWidth: 3,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatarFallbackText: {
    fontSize: 24,
    fontWeight: 700,
    color: '#2453a5',
  },
  section: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dce4f2',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: '#102033',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoChip: {
    minWidth: '48%',
    borderRadius: 10,
    backgroundColor: '#f6f8fc',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#66758d',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 10,
    color: '#102033',
    lineHeight: 1.35,
  },
  paragraph: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.5,
    marginBottom: 8,
  },
  list: {
    gap: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 12,
    lineHeight: 1.35,
    color: '#2453a5',
    width: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.45,
    color: '#334155',
  },
  link: {
    fontSize: 10,
    color: '#2453a5',
    textDecoration: 'none',
    lineHeight: 1.45,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#f8fbff',
    borderWidth: 1,
    borderColor: '#e4ebf6',
    padding: 12,
    marginBottom: 10,
  },
  cardHeader: {
    fontSize: 11,
    fontWeight: 700,
    color: '#102033',
    marginBottom: 4,
  },
  cardSubheader: {
    fontSize: 9,
    color: '#66758d',
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#eef4ff',
    color: '#2453a5',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 8,
  },
  footer: {
    marginTop: 8,
    fontSize: 8,
    color: '#7a8799',
    textAlign: 'right',
  },
})

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
          <View style={styles.headerGlow} />

          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>Portafolio profesional</Text>
            <Text style={styles.title}>{fullName || profile.username}</Text>
            <Text style={styles.username}>@{profile.username}</Text>

            {!!(profile.professions ?? []).length && (
              <View style={styles.professionRow}>
                {profile.professions.map((profession) => (
                  <Text
                    key={profession}
                    style={styles.professionTag}
                  >
                    {profession}
                  </Text>
                ))}
              </View>
            )}
          </View>

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoChip}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>{fullName || ''}</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoLabel}>País</Text>
              <Text style={styles.infoValue}>{profile.country || ''}</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{profile.phone || ''}</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoLabel}>Fecha de nacimiento</Text>
              <Text style={styles.infoValue}>{formatMaybeDate(profile.date_of_birth)}</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoLabel}>Género</Text>
              <Text style={styles.infoValue}>{profile.gender || ''}</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoLabel}>Última exportación</Text>
              <Text style={styles.infoValue}>{formatDate(data.generatedAt)}</Text>
            </View>
          </View>

          {!!profile.biography && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.infoLabel}>Biografía</Text>
              <Text style={styles.paragraph}>{profile.biography}</Text>
            </View>
          )}
        </View>

        {!!visibleLinks.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enlaces</Text>
            <View style={styles.list}>
              {visibleLinks.map((link) => (
                <View
                  key={link.id}
                  style={styles.bulletRow}
                >
                  <Text style={styles.bulletDot}>•</Text>
                  <PdfLink
                    src={link.url}
                    style={styles.link}
                  >
                    {link.url}
                  </PdfLink>
                </View>
              ))}
            </View>
          </View>
        )}

        {(visibleSkills.length || visibleSoftSkills.length) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>

            {!!visibleSkills.length && (
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.infoLabel}>Técnicas</Text>
                <View style={styles.tagRow}>
                  {visibleSkills.map((skill) => (
                    <Text
                      key={skill.id}
                      style={styles.tag}
                    >
                      {skill.name}
                      {skill.domain_level ? ` · ${skill.domain_level}` : ''}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {!!visibleSoftSkills.length && (
              <View>
                <Text style={styles.infoLabel}>Blandas</Text>
                <View style={styles.tagRow}>
                  {visibleSoftSkills.map((skill) => (
                    <Text
                      key={skill.id}
                      style={styles.tag}
                    >
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {!!visibleWorkExperiences.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia laboral</Text>
            {visibleWorkExperiences.map((experience) => (
              <View
                key={experience.id}
                style={styles.card}
              >
                <Text style={styles.cardHeader}>{experience.position}</Text>
                <Text style={styles.cardSubheader}>{experience.company} · {formatRange(experience.start_date, experience.end_date)}</Text>
                {!!experience.description && <Text style={styles.paragraph}>{experience.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {!!visibleAcademicExperiences.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiencia académica</Text>
            {visibleAcademicExperiences.map((experience) => (
              <View
                key={experience.id}
                style={styles.card}
              >
                <Text style={styles.cardHeader}>{experience.title}</Text>
                <Text style={styles.cardSubheader}>{experience.institution} · {formatRange(experience.start_date, experience.end_date)}</Text>
                {!!experience.description && <Text style={styles.paragraph}>{experience.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {!!visibleAcademicFormations.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formación académica</Text>
            {visibleAcademicFormations.map((formation) => (
              <View
                key={formation.id}
                style={styles.card}
              >
                <Text style={styles.cardHeader}>{formation.institution}</Text>
                <Text style={styles.cardSubheader}>{formation.education_level} · {formation.status}</Text>
                <Text style={styles.paragraph}>{formatMaybeDate(formation.emission_date)}</Text>
                {!!formation.field_of_study && <Text style={styles.paragraph}>{formation.field_of_study}</Text>}
                {!!formation.description && <Text style={styles.paragraph}>{formation.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {!!visibleProjects.length && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Proyectos</Text>
            {visibleProjects.map((project) => (
              <View
                key={project.id}
                style={styles.card}
              >
                <Text style={styles.cardHeader}>{project.title}</Text>
                <Text style={styles.cardSubheader}>{formatRange(project.start_date, project.end_date)}</Text>

                {!!project.roles.length && (
                  <View style={styles.tagRow}>
                    {project.roles.map((role) => (
                      <Text
                        key={role.id}
                        style={styles.tag}
                      >
                        {role.name}
                      </Text>
                    ))}
                  </View>
                )}

                {!!project.description && <Text style={styles.paragraph}>{project.description}</Text>}

                {!!project.skills.length && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.infoLabel}>Tecnologías</Text>
                    <View style={styles.tagRow}>
                      {project.skills.map((skill) => (
                        <Text
                          key={skill.id}
                          style={styles.tag}
                        >
                          {skill.name}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}

                {!!project.links.length && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.infoLabel}>Enlaces del proyecto</Text>
                    <View style={styles.list}>
                      {project.links.map((link) => (
                        <View
                          key={link.id}
                          style={styles.bulletRow}
                        >
                          <Text style={styles.bulletDot}>•</Text>
                          <PdfLink
                            src={link.url}
                            style={styles.link}
                          >
                            {link.url}
                          </PdfLink>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {!!project.assets.length && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.infoLabel}>Evidencia</Text>
                    <View style={styles.list}>
                      {project.assets.map((asset, index) => (
                        <View
                          key={asset.id}
                          style={styles.bulletRow}
                        >
                          <Text style={styles.bulletDot}>•</Text>
                          <PdfLink
                            src={asset.url}
                            style={styles.link}
                          >
                            <FileName path={asset.path} index={index} />
                          </PdfLink>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.footer} render={({ pageNumber }) => pageNumber} fixed />
      </Page>
    </Document>
  )
}
