import { normalizeDialCode } from '../utils/normalize'
import countriesRaw from '../../../shared/assets/data/countries.json'

type CountryCodeRow = { country: string; code: string }

export const COUNTRY_DIAL_CODE_MAP = new Map(
  (countriesRaw as CountryCodeRow[]).map(({ country, code }) => [country, code]),
)

export const DIAL_CODES = new Set((countriesRaw as CountryCodeRow[]).map(({ code }) => normalizeDialCode(code)))
