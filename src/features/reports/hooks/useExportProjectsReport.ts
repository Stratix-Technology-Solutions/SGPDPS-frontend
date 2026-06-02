import { createElement, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { ProjectsReportPdfDocument } from '../components/pdf/ProjectsReportPdfDocument'
import type {
  ProjectReportVisibility,
  ReportProjectsResponse,
} from '../interfaces/report-projects.interface'

type PdfDocumentInput = Parameters<typeof pdf>[0]

export const useExportProjectsReport = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const exportProjectsReport = async (
    report: ReportProjectsResponse,
    visibility: ProjectReportVisibility,
  ) => {
    setIsExporting(true)
    setExportError(null)

    try {
      const documentNode = createElement(ProjectsReportPdfDocument, {
        data: {
          report,
          visibility,
          generatedAt: new Date().toISOString(),
        },
      }) as PdfDocumentInput

      downloadBlob(
        await pdf(documentNode).toBlob(),
        `reporte-proyectos-${report.user.username.toLowerCase()}.pdf`,
      )
    } catch (error) {
      console.error('Projects report export failed', error)
      setExportError('No se pudo generar el reporte. Intenta nuevamente.')
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportProjectsReport,
    isExporting,
    exportError,
  }
}

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  link.rel = 'noopener'
  link.click()

  window.setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}
