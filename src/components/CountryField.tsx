import { useState, useRef, useEffect } from 'react'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import type { AnyFieldApi } from '@tanstack/react-form'
import { InputMessageError } from './InputMessageError'
import paisesRaw from './cuntries/paises.json'

const ALPHA2_MAP: Record<string, string> = {
  'Afganistán': 'af', 'Albania': 'al', 'Alemania': 'de', 'Andorra': 'ad',
  'Angola': 'ao', 'Antigua y Barbuda': 'ag', 'Arabia Saudita': 'sa',
  'Argelia': 'dz', 'Argentina': 'ar', 'Armenia': 'am', 'Australia': 'au',
  'Austria': 'at', 'Azerbaiyán': 'az', 'Bahamas': 'bs', 'Bangladés': 'bd',
  'Barbados': 'bb', 'Baréin': 'bh', 'Bélgica': 'be', 'Belice': 'bz',
  'Benín': 'bj', 'Bielorrusia': 'by', 'Birmania (Myanmar)': 'mm',
  'Bolivia': 'bo', 'Bosnia y Herzegovina': 'ba', 'Botsuana': 'bw',
  'Brasil': 'br', 'Brunéi': 'bn', 'Bulgaria': 'bg', 'Burkina Faso': 'bf',
  'Burundi': 'bi', 'Bután': 'bt', 'Cabo Verde': 'cv', 'Camboya': 'kh',
  'Camerún': 'cm', 'Canadá': 'ca', 'Catar': 'qa', 'Chad': 'td',
  'Chile': 'cl', 'China': 'cn', 'Chipre': 'cy', 'Colombia': 'co',
  'Comoras': 'km', 'Corea del Norte': 'kp', 'Corea del Sur': 'kr',
  'Costa de Marfil': 'ci', 'Costa Rica': 'cr', 'Croacia': 'hr',
  'Cuba': 'cu', 'Dinamarca': 'dk', 'Dominica': 'dm', 'Ecuador': 'ec',
  'Egipto': 'eg', 'El Salvador': 'sv', 'Emiratos Árabes Unidos': 'ae',
  'Eritrea': 'er', 'Eslovaquia': 'sk', 'Eslovenia': 'si', 'España': 'es',
  'Estados Unidos': 'us', 'Estonia': 'ee', 'Esuatini': 'sz',
  'Etiopía': 'et', 'Filipinas': 'ph', 'Finlandia': 'fi', 'Fiyi': 'fj',
  'Francia': 'fr', 'Gabón': 'ga', 'Gambia': 'gm', 'Georgia': 'ge',
  'Ghana': 'gh', 'Granada': 'gd', 'Grecia': 'gr', 'Guatemala': 'gt',
  'Guinea': 'gn', 'Guinea-Bisáu': 'gw', 'Guinea Ecuatorial': 'gq',
  'Guyana': 'gy', 'Haití': 'ht', 'Honduras': 'hn', 'Hungría': 'hu',
  'India': 'in', 'Indonesia': 'id', 'Irak': 'iq', 'Irán': 'ir',
  'Irlanda': 'ie', 'Islandia': 'is', 'Islas Marshall': 'mh',
  'Islas Salomón': 'sb', 'Israel': 'il', 'Italia': 'it', 'Jamaica': 'jm',
  'Japón': 'jp', 'Jordania': 'jo', 'Kazajistán': 'kz', 'Kenia': 'ke',
  'Kirguistán': 'kg', 'Kiribati': 'ki', 'Kuwait': 'kw', 'Laos': 'la',
  'Lesoto': 'ls', 'Letonia': 'lv', 'Líbano': 'lb', 'Liberia': 'lr',
  'Libia': 'ly', 'Liechtenstein': 'li', 'Lituania': 'lt',
  'Luxemburgo': 'lu', 'Madagascar': 'mg', 'Malasia': 'my',
  'Malaui': 'mw', 'Maldivas': 'mv', 'Malí': 'ml', 'Malta': 'mt',
  'Marruecos': 'ma', 'Mauricio': 'mu', 'Mauritania': 'mr', 'México': 'mx',
  'Micronesia': 'fm', 'Moldavia': 'md', 'Mónaco': 'mc', 'Mongolia': 'mn',
  'Montenegro': 'me', 'Mozambique': 'mz', 'Namibia': 'na', 'Nauru': 'nr',
  'Nepal': 'np', 'Nicaragua': 'ni', 'Níger': 'ne', 'Nigeria': 'ng',
  'Noruega': 'no', 'Nueva Zelanda': 'nz', 'Omán': 'om',
  'Países Bajos': 'nl', 'Pakistán': 'pk', 'Palaos': 'pw',
  'Palestina': 'ps', 'Panamá': 'pa', 'Papúa Nueva Guinea': 'pg',
  'Paraguay': 'py', 'Perú': 'pe', 'Polonia': 'pl', 'Portugal': 'pt',
  'Reino Unido': 'gb', 'República Centroafricana': 'cf',
  'República Checa': 'cz', 'República del Congo': 'cg',
  'República Democrática del Congo': 'cd', 'República Dominicana': 'do',
  'Ruanda': 'rw', 'Rumania': 'ro', 'Rusia': 'ru', 'Samoa': 'ws',
  'San Cristóbal y Nieves': 'kn', 'San Marino': 'sm',
  'San Vicente y las Granadinas': 'vc', 'Santa Lucía': 'lc',
  'Santo Tomé y Príncipe': 'st', 'Senegal': 'sn', 'Serbia': 'rs',
  'Seychelles': 'sc', 'Sierra Leona': 'sl', 'Singapur': 'sg',
  'Siria': 'sy', 'Somalia': 'so', 'Sri Lanka': 'lk', 'Sudáfrica': 'za',
  'Sudán': 'sd', 'Sudán del Sur': 'ss', 'Suecia': 'se', 'Suiza': 'ch',
  'Surinam': 'sr', 'Tailandia': 'th', 'Tanzania': 'tz',
  'Tayikistán': 'tj', 'Timor Oriental': 'tl', 'Togo': 'tg',
  'Tonga': 'to', 'Trinidad y Tobago': 'tt', 'Túnez': 'tn',
  'Turkmenistán': 'tm', 'Turquía': 'tr', 'Tuvalu': 'tv',
  'Ucrania': 'ua', 'Uganda': 'ug', 'Uruguay': 'uy', 'Uzbekistán': 'uz',
  'Vanuatu': 'vu', 'Vaticano': 'va', 'Venezuela': 've', 'Vietnam': 'vn',
  'Yemen': 'ye', 'Yibuti': 'dj', 'Zambia': 'zm', 'Zimbabue': 'zw',
}

interface Pais {
  country: string
  code: string
  alpha2: string
}

const paises: Pais[] = (paisesRaw as { country: string; code: string }[]).map((p) => ({
  ...p,
  alpha2: ALPHA2_MAP[p.country] ?? '',
}))

function FlagIcon({ alpha2 }: { alpha2: string }) {
  return <span className={`fi fi-${alpha2} rounded-sm`} style={{ width: 20, height: 15, display: 'inline-block' }} />
}

export function CountryField({ field }: { field: AnyFieldApi }) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = paises.find((p) => p.country === field.state.value) ?? null

  const filtered = search
    ? paises.filter((p) => p.country.toLowerCase().includes(search.toLowerCase()))
    : paises

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      <label className="block text-sm font-medium text-background-dark mb-1.5">País</label>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors text-left"
        >
          {selected ? (
            <>
              {selected.alpha2 && <FlagIcon alpha2={selected.alpha2} />}
              <span className="flex-1 truncate">{selected.country}</span>
            </>
          ) : (
            <span className="flex-1 text-neutral-400">Seleccionar país</span>
          )}
          <svg className="w-4 h-4 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-neutral-light overflow-hidden">
            <ul className="max-h-52 overflow-y-auto">
              <li>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-50 transition-colors"
                  onClick={() => {
                    field.handleChange('')
                    setOpen(false)
                    setSearch('')
                  }}
                >
                  Sin país
                </button>
              </li>
              {filtered.map((p) => (
                <li key={p.country}>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-background-dark hover:bg-neutral-50 transition-colors"
                    onClick={() => {
                      field.handleChange(p.country)
                      setOpen(false)
                      setSearch('')
                    }}
                  >
                    {p.alpha2 && <FlagIcon alpha2={p.alpha2} />}
                    <span className="truncate">{p.country}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
        <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
      )}
    </div>
  )
}
