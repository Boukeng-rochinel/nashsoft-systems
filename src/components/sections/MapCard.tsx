import { useEffect, useState } from 'react'
import { Building2, MapPin, Navigation } from 'lucide-react'
import { site } from '@/data/site'
import { hasConsent, onConsentChange } from '@/lib/consent'
import { cn } from '@/lib/cn'
import { t } from '@/i18n'

const query = encodeURIComponent(site.contact.city)
const EMBED_URL = `https://maps.google.com/maps?q=${query}&z=12&output=embed`
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${query}`

/** Illustrated stand-in shown until Google Maps may load (it sets third-party cookies). */
function MapPlaceholder({ onLoad }: { onLoad: () => void }) {
  return (
    <div className="relative size-full overflow-hidden bg-[#e8f1fb] on-dark:bg-navy-900">
      <svg aria-hidden viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        {/* Wouri estuary */}
        <path d="M-10 120 C 40 110 70 150 110 160 S 170 230 150 280 L -10 280 Z" className="fill-[#b9d7f5] on-dark:fill-brand/25" />
        <path d="M-10 40 C 30 60 60 70 80 100 S 100 140 110 160" className="fill-none stroke-[#b9d7f5] on-dark:stroke-brand/25" strokeWidth="14" strokeLinecap="round" />
        {/* Roads */}
        <g className="fill-none stroke-white on-dark:stroke-white/10" strokeLinecap="round">
          <path d="M120 40 C 180 70 230 90 410 80" strokeWidth="7" />
          <path d="M150 260 C 190 200 230 150 260 -10" strokeWidth="7" />
          <path d="M180 170 C 250 160 320 190 410 200" strokeWidth="5" />
          <path d="M110 160 C 160 140 200 120 300 130" strokeWidth="4" />
          <path d="M320 -10 C 310 80 330 160 300 270" strokeWidth="4" />
        </g>
        <g className="fill-navy/60 on-dark:fill-slate-400" fontFamily="Inter, sans-serif">
          <text x="205" y="44" fontSize="11">{t('Bonabéri')}</text>
          <text x="330" y="160" fontSize="11">{t('Bessengue')}</text>
          <text x="282" y="236" fontSize="11">{t('Bonapriso')}</text>
          <text x="196" y="196" fontSize="20" fontWeight="700" className="fill-navy on-dark:fill-white">{t('Douala')}</text>
        </g>
      </svg>

      {/* Pin + label */}
      <div className="absolute top-[34%] left-[46%] flex -translate-x-1/2 -translate-y-full items-end gap-2">
        <span className="relative inline-flex">
          <span aria-hidden className="absolute -bottom-1 left-1/2 h-2 w-5 -translate-x-1/2 rounded-full bg-navy/20 blur-[2px]" />
          <MapPin aria-hidden className="relative size-9 fill-brand text-white drop-shadow-md" strokeWidth={1.6} />
        </span>
        <span className="mb-3 rounded-lg bg-white px-3 py-1.5 text-[0.72rem] leading-tight font-semibold text-navy shadow-card">{t('Nashsoft Systems')}<span className="block font-normal text-slate">{t('Siège social')}</span>
        </span>
      </div>

      <button
        type="button"
        onClick={onLoad}
        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[0.72rem] font-semibold text-brand shadow-card transition-colors hover:bg-brand hover:text-white"
      >
        <Navigation aria-hidden className="size-3.5" />{t('Afficher la carte interactive')}</button>
    </div>
  )
}

export function MapCard({ className }: { className?: string }) {
  const [allowed, setAllowed] = useState(() => hasConsent('marketing'))
  const [loadedOnce, setLoadedOnce] = useState(false)

  useEffect(() => onConsentChange(() => setAllowed(hasConsent('marketing'))), [])

  const showMap = allowed || loadedOnce

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-line bg-white',
        'on-dark:border-white/10 on-dark:bg-white/[0.03]',
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {showMap ? (
          <iframe
            title={t('Carte : {0}, {1}', [site.name, site.contact.city])}
            src={EMBED_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <MapPlaceholder onLoad={() => setLoadedOnce(true)} />
        )}
      </div>

      <div className="flex items-center gap-3 border-t border-line px-5 py-4 on-dark:border-white/10">
        <Building2 aria-hidden className="size-[18px] shrink-0 text-brand on-dark:text-brand-300" strokeWidth={1.8} />
        <p className="min-w-0 flex-1 text-[0.88rem] text-slate on-dark:text-slate-300">
          <span className="font-semibold text-navy on-dark:text-white">{t('Notre siège social')}</span> · {t(site.contact.city)}
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex shrink-0 items-center gap-1 text-[0.82rem] font-semibold text-brand transition-colors hover:text-brand-600 on-dark:text-brand-300"
        >
          {t('Itinéraire')}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          <span className="sr-only">{t('(nouvel onglet)')}</span>
        </a>
      </div>
    </div>
  )
}
