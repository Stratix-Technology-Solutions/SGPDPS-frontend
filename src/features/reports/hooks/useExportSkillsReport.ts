import { createElement, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { SkillsReportPdfDocument } from '../components/pdf/SkillsReportPdfDocument'
import type {
  ReportSkillsResponse,
  SkillsReportFilter,
} from '../interfaces/report-skills.interface'

type PdfDocumentInput = Parameters<typeof pdf>[0]

export const useExportSkillsReport = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  const exportSkillsReport = async (
    report: ReportSkillsResponse,
    filter: SkillsReportFilter,
  ) => {
    setIsExporting(true)
    setExportError(null)

    try {
      const fileName = `reporte-habilidades-${report.user.username.toLowerCase()}`

      const documentNode = createElement(SkillsReportPdfDocument, {
        data: {
          report,
          filter,
          generatedAt: new Date().toISOString(),
        },
      }) as PdfDocumentInput

      downloadBlob(await pdf(documentNode).toBlob(), `${fileName}.pdf`)
    } catch (error) {
      console.error('Skills report export failed', error)
      setExportError('No se pudo generar el reporte. Intenta nuevamente.')
    } finally {
      setIsExporting(false)
    }
  }

  return {
    exportSkillsReport,
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
