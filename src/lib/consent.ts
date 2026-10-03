/**
 * Cookie consent store.
 *
 * The site sets no tracking cookies today; this records the visitor's choice so
 * any future analytics/marketing script can be gated with `hasConsent('analytics')`.
 */

export type ConsentLevel = 'all' | 'essential'

export interface ConsentRecord {
  level: ConsentLevel
  /** ISO date of the decision — lets us re-ask after a policy change. */
  decidedAt: string
  version: number
}

/** Bump when the cookie policy changes to ask visitors again. */
export const CONSENT_VERSION = 1
const STORAGE_KEY = 'nashsoft-consent'
/** Fired to reopen the banner (e.g. from the footer "Gérer les cookies" link). */
export const CONSENT_OPEN_EVENT = 'nashsoft:open-consent'

export function readConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>
    if ((parsed.level === 'all' || parsed.level === 'essential') && parsed.version === CONSENT_VERSION && typeof parsed.decidedAt === 'string') {
      return parsed as ConsentRecord
    }
    return null
  } catch {
    return null
  }
}

export function saveConsent(level: ConsentLevel): ConsentRecord {
  const record: ConsentRecord = { level, decidedAt: new Date().toISOString(), version: CONSENT_VERSION }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    /* storage unavailable (private mode): the choice holds for this visit only */
  }
  return record
}

/** Essential cookies are always allowed; anything else needs explicit acceptance. */
export function hasConsent(purpose: 'essential' | 'analytics' | 'marketing'): boolean {
  if (purpose === 'essential') return true
  return readConsent()?.level === 'all'
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))
}
