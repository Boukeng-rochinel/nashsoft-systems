import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Boxes,
  Calculator,
  ChartNoAxesCombined,
  Cloud,
  Database,
  FolderKanban,
  Globe,
  Handshake,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  ShoppingCart,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'

const menu: Array<{ label: string; icon: LucideIcon }> = [
  { label: 'Tableau de bord', icon: LayoutDashboard },
  { label: 'Ventes', icon: ShoppingCart },
  { label: 'Achats', icon: Package },
  { label: 'Inventaire', icon: Boxes },
  { label: 'Comptabilité', icon: Calculator },
  { label: 'CRM', icon: Handshake },
  { label: 'Ressources humaines', icon: UsersRound },
  { label: 'Projets', icon: FolderKanban },
  { label: 'Paramètres', icon: Settings },
]

const kpis = [
  { label: 'Ventes', value: '1 248 000 FCFA', delta: '12 %' },
  { label: 'Commandes', value: '56', delta: '8 %' },
  { label: 'Stock', value: '3 420', delta: '5 %' },
  { label: 'Clients', value: '230', delta: '14 %' },
]

const share = [
  { label: 'Produits A', value: 45, color: '#087DFF' },
  { label: 'Produits B', value: 25, color: '#00C6FF' },
  { label: 'Produits C', value: 18, color: '#22C55E' },
  { label: 'Autres', value: 12, color: '#F97316' },
]

/** Donut segments as stroke-dasharray arcs on a circle of circumference 100, starting at 12 o'clock. */
const arcs = share.map((s, i) => ({ ...s, offset: 25 - share.slice(0, i).reduce((sum, x) => sum + x.value, 0) }))

function Donut() {
  return (
    <svg viewBox="0 0 42 42" className="size-[7em] shrink-0">
      {arcs.map((s) => (
        <circle
          key={s.label}
          cx="21"
          cy="21"
          r="15.915"
          fill="none"
          stroke={s.color}
          strokeWidth="6"
          strokeDasharray={`${s.value} ${100 - s.value}`}
          strokeDashoffset={s.offset}
        />
      ))}
    </svg>
  )
}

/** Mock ERP dashboard. Sized in `em` so the whole screen scales with the laptop width. */
function Dashboard() {
  return (
    <div className="flex size-full bg-white text-navy" style={{ fontSize: '1.45cqw' }}>
      <aside className="w-[24%] shrink-0 border-r border-line bg-light/70 px-[0.9em] py-[1em]">
        <p className="font-display text-[1.9em] leading-none font-bold tracking-tight text-[#714B67]">odoo</p>
        <ul className="mt-[1.3em] space-y-[0.25em]">
          {menu.map((m, i) => (
            <li
              key={m.label}
              className={cn('flex items-center gap-[0.6em] rounded-[0.4em] px-[0.6em] py-[0.45em] text-[0.82em]', i === 0 ? 'bg-brand-50 font-semibold text-brand' : 'text-slate')}
            >
              <m.icon aria-hidden className="size-[1.15em] shrink-0" strokeWidth={1.8} />
              <span className="truncate">{m.label}</span>
            </li>
          ))}
        </ul>
      </aside>
      <div className="min-w-0 flex-1 px-[1.4em] py-[1.2em]">
        <div className="flex items-center justify-between">
          <p className="font-display text-[1.35em] font-semibold">Tableau de bord</p>
          <span className="flex gap-[0.5em]">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-[0.7em] rounded-full bg-line-strong" />
            ))}
          </span>
        </div>
        <div className="mt-[1em] grid grid-cols-4 gap-[0.7em]">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-[0.5em] border border-line px-[0.7em] py-[0.6em] shadow-card">
              <p className="text-[0.75em] text-slate">{k.label}</p>
              <p className="mt-[0.3em] text-[0.95em] font-semibold whitespace-nowrap">{k.value}</p>
              <p className="mt-[0.2em] text-[0.7em] font-semibold text-emerald-600">↑ {k.delta}</p>
            </div>
          ))}
        </div>
        <div className="mt-[0.9em] grid grid-cols-[1.35fr_1fr] gap-[0.7em]">
          <div className="rounded-[0.5em] border border-line p-[0.8em] shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-[0.8em] font-semibold">Évolution des ventes</p>
              <span className="rounded-[0.3em] border border-line px-[0.5em] py-[0.15em] text-[0.62em] text-slate">30 derniers jours</span>
            </div>
            <svg viewBox="0 0 200 80" className="mt-[0.6em] h-[7em] w-full" preserveAspectRatio="none">
              {[20, 40, 60].map((y) => (
                <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#E3EAF3" strokeWidth="0.6" />
              ))}
              <defs>
                <linearGradient id="sales-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#087DFF" stopOpacity="0.18" />
                  <stop offset="1" stopColor="#087DFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 74 L22 58 L42 48 L62 56 L84 42 L106 40 L126 40 L146 30 L164 18 L182 28 L200 8 L200 80 L0 80Z" fill="url(#sales-fill)" />
              <polyline
                points="0,74 22,58 42,48 62,56 84,42 106,40 126,40 146,30 164,18 182,28 200,8"
                fill="none"
                stroke="#087DFF"
                strokeWidth="1.6"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="rounded-[0.5em] border border-line p-[0.8em] shadow-card">
            <p className="text-[0.8em] font-semibold">Répartition par produit</p>
            <div className="mt-[0.6em] flex items-center gap-[0.9em]">
              <Donut />
              <ul className="space-y-[0.45em]">
                {share.map((s) => (
                  <li key={s.label} className="flex items-center gap-[0.4em] text-[0.68em] text-slate">
                    <span className="size-[0.7em] rounded-full" style={{ backgroundColor: s.color }} />
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CalloutProps {
  icon: ReactNode
  title: string
  description: string
  tile: string
  className?: string
  delay?: number
  arrow?: boolean
  children?: ReactNode
}

function Callout({ icon, title, description, tile, className, delay = 0, arrow = true, children }: CalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn('absolute z-10', className)}
    >
      <div
        className="flex animate-float items-center gap-3 rounded-2xl border border-white bg-white/95 py-2.5 pr-3 pl-2.5 shadow-float backdrop-blur sm:gap-3.5 sm:py-3 sm:pr-4 sm:pl-3"
        style={{ animationDelay: `${delay * 1.7}s` }}
      >
        <span aria-hidden className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-xl sm:size-11', tile)}>
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block font-display text-[0.72rem] font-semibold whitespace-nowrap text-navy sm:text-[0.82rem]">{title}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[0.62rem] whitespace-nowrap text-slate sm:text-[0.72rem]">
            {description}
            {children}
          </span>
        </span>
        {arrow && <ArrowRight aria-hidden className="ml-1 hidden size-4 shrink-0 text-brand sm:block" />}
      </div>
    </motion.div>
  )
}

const rail: Array<{ label: string; node: ReactNode }> = [
  { label: 'Odoo', node: <span className="inline-flex size-full items-center justify-center rounded-full bg-[#714B67] text-[0.6rem] font-bold text-white">odoo</span> },
  { label: 'Web', node: <Globe className="size-5 text-brand" strokeWidth={1.8} /> },
  { label: 'Cloud', node: <Cloud className="size-5 text-brand" strokeWidth={1.8} /> },
  { label: 'Base de données', node: <Database className="size-5 text-brand" strokeWidth={1.8} /> },
]

/** "Développement logiciel" hero: ERP dashboard on a laptop with floating callouts (reference design). */
export function SoftwareHeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[640px] pt-14 pb-16 sm:pt-16 sm:pb-20 lg:max-w-none lg:pt-12 lg:pb-12" role="img" aria-label="Tableau de bord d’un logiciel de gestion sur ordinateur portable">
      <div aria-hidden className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-50 via-[#eef4ff] to-violet-50/70" />

      {/* Laptop */}
      <div className="relative mr-10 sm:mr-14">
        <div className="rounded-t-[1.1rem] bg-[#1b2433] p-[1.6%] pb-[2%] shadow-[0_40px_80px_-40px_rgb(6_20_38/0.55)]">
          <div className="@container aspect-[16/10] overflow-hidden rounded-[0.4rem]">
            <Dashboard />
          </div>
        </div>
        <div className="relative mx-[-5%] h-3 rounded-b-[1rem] bg-gradient-to-b from-[#d5dbe4] to-[#9aa4b2] sm:h-4">
          <span className="absolute top-0 left-1/2 h-1.5 w-[14%] -translate-x-1/2 rounded-b-md bg-[#aeb7c4]" />
        </div>
      </div>

      {/* Integrations rail */}
      <motion.ul
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="absolute top-[30%] right-0 flex flex-col gap-2.5 rounded-full border border-white bg-white/90 p-1.5 shadow-float backdrop-blur sm:gap-3 sm:p-2"
      >
        {rail.map((r) => (
          <li key={r.label} title={r.label} className="inline-flex size-8 items-center justify-center rounded-full bg-light sm:size-10">
            {r.node}
          </li>
        ))}
      </motion.ul>

      <Callout
        className="top-0 left-[4%]"
        tile="bg-violet-50 text-violet"
        icon={<UsersRound className="size-5" strokeWidth={1.8} />}
        title="Vos clients"
        description="Toujours connectés"
        arrow={false}
      >
        <span className="size-2 rounded-full bg-emerald-500" />
      </Callout>
      <Callout
        className="top-0 right-0 hidden sm:block"
        tile="bg-emerald-50 text-emerald-600"
        icon={<ChartNoAxesCombined className="size-5" strokeWidth={1.8} />}
        title="Gestion complète"
        description="Ventes, achats, stock, comptabilité…"
        delay={0.15}
      />
      <Callout
        className="bottom-2 left-0"
        tile="bg-brand-50 text-brand"
        icon={<ShieldCheck className="size-5" strokeWidth={1.8} />}
        title="Sécurisé & fiable"
        description="Vos données, notre priorité"
        delay={0.3}
      />
      <Callout
        className="right-0 bottom-0 hidden sm:block"
        tile="bg-orange-50 text-orange-500"
        icon={<Package className="size-5" strokeWidth={1.8} />}
        title="Solutions sur mesure"
        description="Adaptées à votre secteur"
        delay={0.45}
      />
    </div>
  )
}
