import { memo, useId, type CSSProperties } from 'react'
import type { ProjectTheme, ScreenVariant } from '@/types'

/**
 * Code-rendered product interface.
 * Abstract UI (bars, charts, cards) themed per project — crisp at any size,
 * zero image weight, and honest: it depicts layout, not fake data.
 */

interface ScreenProps {
  variant: ScreenVariant
  theme: ProjectTheme
  device?: 'laptop' | 'phone'
  title?: string
  className?: string
}

const bar = (w: string, color: string, h = '0.45em', extra?: CSSProperties): CSSProperties => ({
  width: w,
  height: h,
  borderRadius: 999,
  background: color,
  ...extra,
})

function Bars({ widths, color, gap = '0.45em', h }: { widths: string[]; color: string; gap?: string; h?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {widths.map((w, i) => (
        <div key={i} style={bar(w, color, h)} />
      ))}
    </div>
  )
}

function AreaChart({ theme, points = '0,70 12,58 24,62 36,40 48,46 60,28 72,34 84,18 100,22' }: { theme: ProjectTheme; points?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.accent} stopOpacity="0.35" />
          <stop offset="1" stopColor={theme.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,80 ${points} 100,80`} fill={`url(#${id})`} />
      <polyline points={points} fill="none" stroke={theme.accent} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <polyline
        points="0,76 14,70 28,72 42,60 56,64 70,52 84,56 100,44"
        fill="none"
        stroke={theme.accent2}
        strokeWidth="1.5"
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
        opacity="0.8"
      />
    </svg>
  )
}

function Columns({ theme, values = [45, 70, 55, 85, 60, 95, 75] }: { theme: ProjectTheme; values?: number[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6%', height: '100%', padding: '0 2%' }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${v}%`,
            borderRadius: '0.3em 0.3em 0.1em 0.1em',
            background: i === values.length - 2 ? theme.accent : `linear-gradient(to top, ${theme.accent}55, ${theme.accent}aa)`,
          }}
        />
      ))}
    </div>
  )
}

function Donut({ theme }: { theme: ProjectTheme }) {
  return (
    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }} aria-hidden>
      <circle cx="18" cy="18" r="14" fill="none" stroke={theme.muted} strokeWidth="5" />
      <circle cx="18" cy="18" r="14" fill="none" stroke={theme.accent} strokeWidth="5" strokeDasharray="56 88" transform="rotate(-90 18 18)" strokeLinecap="round" />
      <circle cx="18" cy="18" r="14" fill="none" stroke={theme.accent2} strokeWidth="5" strokeDasharray="18 88" strokeDashoffset="-60" transform="rotate(-90 18 18)" strokeLinecap="round" />
    </svg>
  )
}

const card = (theme: ProjectTheme, extra?: CSSProperties): CSSProperties => ({
  background: theme.surface,
  borderRadius: '0.6em',
  padding: '0.8em',
  boxShadow: '0 1px 2px rgb(0 0 0 / 0.06)',
  border: `1px solid ${theme.muted}66`,
  ...extra,
})

function Header({ theme, title }: { theme: ProjectTheme; title?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1em' }}>
      {title ? (
        <span style={{ fontWeight: 700, color: theme.text, fontSize: '1.15em', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>{title}</span>
      ) : (
        <div style={bar('22%', theme.text, '0.7em', { opacity: 0.85 })} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6em', flex: 1, justifyContent: 'flex-end' }}>
        <div style={bar('38%', theme.muted, '1.6em', { maxWidth: '14em', opacity: 0.7 })} />
        <div style={{ width: '1.7em', height: '1.7em', borderRadius: 999, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` }} />
      </div>
    </div>
  )
}

function Sidebar({ theme, active = 1 }: { theme: ProjectTheme; active?: number }) {
  const onDark = isDark(theme.nav)
  const item = onDark ? '#ffffff30' : theme.muted
  return (
    <div style={{ width: '17%', background: theme.nav, padding: '1em 0.8em', display: 'flex', flexDirection: 'column', gap: '0.9em', borderRight: `1px solid ${theme.muted}55` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em', marginBottom: '0.6em' }}>
        <div style={{ width: '1.4em', height: '1.4em', borderRadius: '0.35em', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` }} />
        <div style={bar('55%', onDark ? '#ffffffcc' : theme.text, '0.5em')} />
      </div>
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
            padding: '0.45em 0.5em',
            borderRadius: '0.4em',
            background: i === active ? `${theme.accent}${onDark ? '40' : '1f'}` : 'transparent',
          }}
        >
          <div style={{ width: '0.8em', height: '0.8em', borderRadius: '0.2em', background: i === active ? theme.accent : item }} />
          <div style={bar(`${50 + ((i * 17) % 35)}%`, i === active ? theme.accent : item, '0.4em')} />
        </div>
      ))}
    </div>
  )
}

function isDark(hex: string) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 120
}

/* ------------------------------------------------------------------ */
/* Laptop layouts                                                      */
/* ------------------------------------------------------------------ */

function DashboardLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar theme={theme} />
      <div style={{ flex: 1, padding: '1.1em', display: 'flex', flexDirection: 'column', gap: '0.9em', minWidth: 0 }}>
        <Header theme={theme} title={title} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7em' }}>
          {[theme.accent, theme.accent2, theme.accent, theme.accent2].map((c, i) => (
            <div key={i} style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.5em' })}>
              <div style={{ width: '1.3em', height: '1.3em', borderRadius: '0.35em', background: `${c}26` }} />
              <div style={bar('70%', theme.text, '0.75em', { opacity: 0.85 })} />
              <div style={bar('45%', theme.muted, '0.4em')} />
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.7em', flex: 1, minHeight: 0 }}>
          <div style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.6em' })}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={bar('30%', theme.text, '0.55em', { opacity: 0.8 })} />
              <div style={bar('18%', theme.muted, '0.55em')} />
            </div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <AreaChart theme={theme} />
            </div>
          </div>
          <div style={card(theme, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6em' })}>
            <div style={{ width: '70%', aspectRatio: '1' }}>
              <Donut theme={theme} />
            </div>
            <Bars widths={['80%', '60%', '70%']} color={theme.muted} h="0.4em" />
          </div>
        </div>
        <div style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.55em' })}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6em' }}>
              <div style={{ width: '1.2em', height: '1.2em', borderRadius: 999, background: theme.muted }} />
              <div style={bar('28%', theme.text, '0.45em', { opacity: 0.7 })} />
              <div style={{ flex: 1 }} />
              <div style={bar('12%', `${i === 1 ? theme.accent2 : theme.accent}40`, '0.9em')} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LandingLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  const dark = isDark(theme.bg)
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9em 1.4em', borderBottom: `1px solid ${theme.muted}66` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45em' }}>
          <div style={{ width: '1.3em', height: '1.3em', borderRadius: '0.35em', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` }} />
          {title ? (
            <span style={{ fontWeight: 700, color: theme.text, fontSize: '1em', whiteSpace: 'nowrap' }}>{title}</span>
          ) : (
            <div style={bar('5em', theme.text, '0.55em')} />
          )}
        </div>
        <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
          {[3, 4, 3.5, 3].map((w, i) => (
            <div key={i} style={bar(`${w}em`, dark ? `${theme.text}55` : theme.muted, '0.4em')} />
          ))}
          <div style={bar('5.5em', theme.accent, '1.7em')} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '1.4em', padding: '1.6em 1.4em', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7em' }}>
          <div style={bar('35%', theme.accent, '0.45em')} />
          <div style={bar('92%', theme.text, '1.3em', { opacity: 0.92 })} />
          <div style={bar('70%', theme.text, '1.3em', { opacity: 0.92 })} />
          <div style={{ height: '0.2em' }} />
          <Bars widths={['95%', '85%', '60%']} color={dark ? `${theme.text}33` : theme.muted} h="0.45em" />
          <div style={{ display: 'flex', gap: '0.6em', marginTop: '0.6em' }}>
            <div style={bar('7em', `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`, '2em')} />
            <div style={bar('6em', 'transparent', '2em', { border: `1px solid ${dark ? `${theme.text}40` : theme.muted}` })} />
          </div>
        </div>
        <div
          style={{
            height: '85%',
            borderRadius: '0.9em',
            background: `radial-gradient(circle at 30% 30%, ${theme.accent2}cc, transparent 60%), linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: '14% 12% auto auto', width: '40%', aspectRatio: '1', borderRadius: 999, background: '#ffffff26' }} />
          <div style={{ position: 'absolute', left: '10%', bottom: '10%', right: '30%', ...card(theme, { padding: '0.6em' }) }}>
            <Bars widths={['60%', '85%']} color={theme.muted} h="0.4em" />
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8em', padding: '0 1.4em 1.4em' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={card(theme, { display: 'flex', gap: '0.6em', alignItems: 'center' })}>
            <div style={{ width: '1.8em', height: '1.8em', borderRadius: '0.45em', background: `${i === 1 ? theme.accent2 : theme.accent}2e`, flexShrink: 0 }} />
            <Bars widths={['70%', '90%']} color={theme.muted} h="0.4em" gap="0.35em" />
          </div>
        ))}
      </div>
    </div>
  )
}

function TableLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  const statuses = [theme.accent, '#16A34A', '#F59E0B', theme.accent2, '#16A34A', theme.accent]
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar theme={theme} active={3} />
      <div style={{ flex: 1, padding: '1.1em', display: 'flex', flexDirection: 'column', gap: '0.8em', minWidth: 0 }}>
        <Header theme={theme} title={title} />
        <div style={{ display: 'flex', gap: '0.5em' }}>
          {['4.5em', '4em', '5em', '3.5em'].map((w, i) => (
            <div key={i} style={bar(w, i === 0 ? theme.accent : `${theme.muted}`, '1.5em', { opacity: i === 0 ? 1 : 0.7 })} />
          ))}
          <div style={{ flex: 1 }} />
          <div style={bar('6em', theme.accent, '1.5em')} />
        </div>
        <div style={card(theme, { flex: 1, display: 'flex', flexDirection: 'column', gap: 0, padding: 0, overflow: 'hidden' })}>
          <div style={{ display: 'flex', gap: '1em', padding: '0.7em 0.9em', background: `${theme.muted}55` }}>
            {['22%', '18%', '16%', '14%'].map((w, i) => (
              <div key={i} style={bar(w, theme.text, '0.4em', { opacity: 0.45 })} />
            ))}
          </div>
          {statuses.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1em', padding: '0.62em 0.9em', borderTop: `1px solid ${theme.muted}66` }}>
              <div style={{ width: '22%', display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <div style={{ width: '1.3em', height: '1.3em', borderRadius: 999, background: `${c}33`, flexShrink: 0 }} />
                <div style={bar('80%', theme.text, '0.45em', { opacity: 0.75 })} />
              </div>
              <div style={bar('18%', theme.muted, '0.45em')} />
              <div style={bar('16%', theme.muted, '0.45em')} />
              <div style={{ width: '14%' }}>
                <div style={bar('70%', `${c}30`, '1.1em', { border: `1px solid ${c}55` })} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AnalyticsLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  return (
    <div style={{ height: '100%', padding: '1.1em', display: 'flex', flexDirection: 'column', gap: '0.8em' }}>
      <Header theme={theme} title={title} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7em' }}>
        {[theme.accent, theme.accent2, theme.accent].map((c, i) => (
          <div key={i} style={card(theme, { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5em' })}>
            <Bars widths={['60%', '90%']} color={theme.muted} h="0.45em" />
            <div style={{ width: '38%', height: '2em' }}>
              <svg viewBox="0 0 40 16" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} aria-hidden>
                <polyline points={i === 1 ? '0,4 8,8 16,6 24,11 32,9 40,13' : '0,13 8,10 16,11 24,6 32,7 40,2'} fill="none" stroke={c} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '0.7em', flex: 1, minHeight: 0 }}>
        <div style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.6em' })}>
          <div style={bar('28%', theme.text, '0.55em', { opacity: 0.8 })} />
          <div style={{ flex: 1, minHeight: 0 }}>
            <Columns theme={theme} />
          </div>
        </div>
        <div style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.6em' })}>
          <div style={bar('40%', theme.text, '0.55em', { opacity: 0.8 })} />
          <div style={{ flex: 1, minHeight: 0 }}>
            <AreaChart theme={theme} points="0,60 15,52 30,56 45,34 60,38 75,20 100,14" />
          </div>
        </div>
      </div>
      <div style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.5em' })}>
        {[82, 64, 45].map((v, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
            <div style={bar('18%', theme.text, '0.4em', { opacity: 0.6 })} />
            <div style={{ flex: 1, height: '0.5em', borderRadius: 999, background: `${theme.muted}88` }}>
              <div style={bar(`${v}%`, i === 1 ? theme.accent2 : theme.accent, '100%')} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CatalogLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  return (
    <div style={{ height: '100%', padding: '1.1em 1.3em', display: 'flex', flexDirection: 'column', gap: '0.9em' }}>
      <Header theme={theme} title={title} />
      <div style={{ display: 'flex', gap: '0.5em' }}>
        {['4em', '5em', '4.5em', '3.5em', '4em'].map((w, i) => (
          <div key={i} style={bar(w, i === 0 ? theme.accent : 'transparent', '1.5em', { border: i === 0 ? 'none' : `1px solid ${theme.muted}` })} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8em', flex: 1, minHeight: 0 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={card(theme, { padding: '0.5em', display: 'flex', flexDirection: 'column', gap: '0.5em' })}>
            <div
              style={{
                flex: 1,
                minHeight: '2.5em',
                borderRadius: '0.45em',
                background: `radial-gradient(circle at ${30 + ((i * 23) % 50)}% 40%, ${i % 2 ? theme.accent2 : theme.accent}bb, ${i % 2 ? theme.accent : theme.accent2}55 70%)`,
              }}
            />
            <div style={bar('75%', theme.text, '0.45em', { opacity: 0.75 })} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={bar('35%', theme.accent, '0.5em')} />
              <div style={{ width: '1.2em', height: '1.2em', borderRadius: 999, background: `${theme.accent}30` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LearningLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0.9em 1.3em', borderBottom: `1px solid ${theme.muted}88` }}>
        <Header theme={theme} title={title} />
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '0.9em', padding: '1em 1.3em', minHeight: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8em', minHeight: 0 }}>
          <div
            style={{
              flex: 1,
              borderRadius: '0.8em',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              display: 'grid',
              placeItems: 'center',
              minHeight: '5em',
            }}
          >
            <div style={{ width: '2.6em', height: '2.6em', borderRadius: 999, background: '#ffffffe6', display: 'grid', placeItems: 'center' }}>
              <div style={{ width: 0, height: 0, borderTop: '0.5em solid transparent', borderBottom: '0.5em solid transparent', borderLeft: `0.8em solid ${theme.accent}`, marginLeft: '0.2em' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6em' }}>
            {[72, 40, 90].map((v, i) => (
              <div key={i} style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.45em' })}>
                <div style={bar('70%', theme.text, '0.45em', { opacity: 0.75 })} />
                <div style={{ height: '0.4em', borderRadius: 999, background: `${theme.muted}` }}>
                  <div style={bar(`${v}%`, theme.accent, '100%')} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={card(theme, { display: 'flex', flexDirection: 'column', gap: '0.65em' })}>
          <div style={bar('50%', theme.text, '0.6em', { opacity: 0.85 })} />
          {[true, true, true, false, false, false].map((done, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55em' }}>
              <div
                style={{
                  width: '1.1em',
                  height: '1.1em',
                  borderRadius: 999,
                  background: done ? theme.accent : 'transparent',
                  border: done ? 'none' : `1.5px solid ${theme.muted}`,
                  flexShrink: 0,
                }}
              />
              <div style={bar(`${55 + ((i * 13) % 35)}%`, done ? theme.text : theme.muted, '0.45em', { opacity: done ? 0.7 : 1 })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ChatLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '32%', borderRight: `1px solid ${theme.muted}88`, padding: '1em 0.8em', display: 'flex', flexDirection: 'column', gap: '0.6em', background: theme.surface }}>
        {title ? <span style={{ fontWeight: 700, color: theme.text, fontSize: '1.05em' }}>{title}</span> : <div style={bar('50%', theme.text, '0.6em')} />}
        <div style={bar('100%', theme.muted, '1.6em', { opacity: 0.6 })} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.5em', alignItems: 'center', padding: '0.4em', borderRadius: '0.5em', background: i === 0 ? `${theme.accent}18` : 'transparent' }}>
            <div style={{ width: '1.7em', height: '1.7em', borderRadius: 999, background: i % 2 ? `${theme.accent2}40` : `${theme.accent}40`, flexShrink: 0 }} />
            <Bars widths={['60%', '90%']} color={i === 0 ? theme.accent : theme.muted} h="0.4em" gap="0.35em" />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1em', gap: '0.7em', minWidth: 0 }}>
        {[
          { me: false, w: '55%' },
          { me: true, w: '45%' },
          { me: false, w: '62%' },
          { me: true, w: '35%' },
          { me: false, w: '48%' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <div
              style={{
                width: m.w,
                padding: '0.65em 0.8em',
                borderRadius: m.me ? '0.8em 0.8em 0.2em 0.8em' : '0.8em 0.8em 0.8em 0.2em',
                background: m.me ? `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` : theme.surface,
                border: m.me ? 'none' : `1px solid ${theme.muted}88`,
              }}
            >
              <Bars widths={['90%', '65%']} color={m.me ? '#ffffff99' : theme.muted} h="0.4em" gap="0.35em" />
            </div>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
          <div style={bar('100%', theme.surface, '2.1em', { border: `1px solid ${theme.muted}` })} />
          <div style={{ width: '2.1em', height: '2.1em', borderRadius: 999, background: theme.accent, flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
}

/** Code editor: file tree, syntax-colored lines, terminal. */
function CodeLayout({ theme, title }: { theme: ProjectTheme; title?: string }) {
  const tokens = ['#C792EA', '#82AAFF', '#C3E88D', '#F78C6C', '#89DDFF', theme.accent]
  const lines = [
    [12, 22, 30],
    [8, 18],
    [16, 26, 14, 10],
    [24, 34],
    [6, 20, 28],
    [16, 12, 22],
    [30, 18],
    [10, 26, 16],
    [20, 14],
    [8, 32, 12],
    [18, 24],
    [14, 10, 26],
    [22, 30],
    [12, 16],
  ]
  return (
    <div style={{ display: 'flex', height: '100%', background: '#0B1220' }}>
      <div style={{ width: '18%', background: '#070D18', padding: '1em 0.8em', display: 'flex', flexDirection: 'column', gap: '0.7em', borderRight: '1px solid #ffffff14' }}>
        {title ? <span style={{ color: '#E6EDF7', fontWeight: 700, fontSize: '0.95em' }}>{title}</span> : null}
        {[60, 75, 50, 80, 65, 55, 70].map((w, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.4em', alignItems: 'center', paddingLeft: i > 1 && i < 5 ? '0.8em' : 0 }}>
            <div style={{ width: '0.7em', height: '0.7em', borderRadius: '0.15em', background: i === 3 ? theme.accent : '#ffffff30' }} />
            <div style={bar(`${w}%`, i === 3 ? `${theme.accent}cc` : '#ffffff26', '0.4em')} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '0.2em', background: '#070D18', padding: '0.5em 0.6em 0' }}>
          {[true, false, false].map((on, i) => (
            <div key={i} style={{ padding: '0.45em 1em', borderRadius: '0.4em 0.4em 0 0', background: on ? '#0B1220' : 'transparent' }}>
              <div style={bar('4em', on ? '#ffffffaa' : '#ffffff40', '0.4em')} />
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '0.9em 1em', display: 'flex', flexDirection: 'column', gap: '0.62em', overflow: 'hidden' }}>
          {lines.map((segs, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              <span style={{ width: '1.4em', color: '#ffffff40', fontSize: '0.7em', textAlign: 'right' }}>{i + 1}</span>
              <div style={{ width: `${(i % 4) * 1.2}em` }} />
              {segs.map((w, j) => (
                <div key={j} style={bar(`${w / 3}em`, tokens[(i + j * 2) % tokens.length], '0.45em', { opacity: 0.85 })} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #ffffff14', background: '#070D18', padding: '0.7em 1em', display: 'flex', flexDirection: 'column', gap: '0.45em' }}>
          <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
            <div style={bar('0.6em', '#22C55E', '0.6em')} />
            <div style={bar('30%', '#ffffff55', '0.4em')} />
          </div>
          <div style={bar('45%', '#ffffff2e', '0.4em')} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Phone layouts                                                       */
/* ------------------------------------------------------------------ */

function PhoneLayout({ theme, variant, title }: { theme: ProjectTheme; variant: ScreenVariant; title?: string }) {
  const dark = isDark(theme.bg)
  const soft = dark ? `${theme.text}30` : theme.muted
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '0.9em', padding: '2.2em 1em 1em', fontSize: '1.9em' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35em' }}>
          <div style={bar('4em', soft, '0.4em')} />
          {title ? (
            <span style={{ fontWeight: 700, color: theme.text, fontSize: '1.1em', whiteSpace: 'nowrap' }}>{title}</span>
          ) : (
            <div style={bar('6em', theme.text, '0.7em')} />
          )}
        </div>
        <div style={{ width: '1.9em', height: '1.9em', borderRadius: 999, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` }} />
      </div>

      {variant === 'analytics' ? (
        <>
          <div style={card(theme, { height: '38%', display: 'flex', flexDirection: 'column', gap: '0.5em' })}>
            <div style={bar('45%', theme.text, '0.5em', { opacity: 0.8 })} />
            <div style={{ flex: 1, minHeight: 0 }}>
              <Columns theme={theme} values={[40, 65, 50, 90, 70]} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6em' }}>
            {[theme.accent, theme.accent2].map((c, i) => (
              <div key={i} style={card(theme, { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4em' })}>
                <div style={{ width: '60%', aspectRatio: '1' }}>
                  <Donut theme={{ ...theme, accent: c }} />
                </div>
                <div style={bar('70%', soft, '0.4em')} />
              </div>
            ))}
          </div>
        </>
      ) : variant === 'table' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55em' }}>
          {[theme.accent, '#16A34A', '#F59E0B', theme.accent2, '#16A34A', theme.accent].map((c, i) => (
            <div key={i} style={card(theme, { display: 'flex', alignItems: 'center', gap: '0.6em', padding: '0.65em' })}>
              <div style={{ width: '1.8em', height: '1.8em', borderRadius: '0.5em', background: `${c}30`, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <Bars widths={['75%', '45%']} color={soft} h="0.4em" gap="0.35em" />
              </div>
              <div style={bar('2.8em', `${c}35`, '1em')} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            style={{
              borderRadius: '0.9em',
              padding: '1em',
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5em',
            }}
          >
            <div style={bar('40%', '#ffffff99', '0.4em')} />
            <div style={bar('65%', '#ffffff', '1em')} />
            <div style={{ height: '2.6em', marginTop: '0.2em' }}>
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} aria-hidden>
                <polyline points="0,24 15,20 30,22 45,12 60,15 75,6 100,8" fill="none" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.55em' }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35em' }}>
                <div style={{ width: '100%', aspectRatio: '1', borderRadius: '0.7em', background: theme.surface, border: `1px solid ${theme.muted}88`, display: 'grid', placeItems: 'center' }}>
                  <div style={{ width: '42%', aspectRatio: '1', borderRadius: '0.3em', background: i % 2 ? theme.accent2 : theme.accent, opacity: 0.85 }} />
                </div>
                <div style={bar('80%', soft, '0.35em')} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={card(theme, { display: 'flex', alignItems: 'center', gap: '0.6em', padding: '0.6em' })}>
                <div style={{ width: '1.8em', height: '1.8em', borderRadius: 999, background: `${i === 1 ? theme.accent2 : theme.accent}30`, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <Bars widths={['70%', '45%']} color={soft} h="0.4em" gap="0.35em" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0.6em 0', borderTop: `1px solid ${theme.muted}66` }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ width: '1.2em', height: '1.2em', borderRadius: '0.35em', background: i === 0 ? theme.accent : soft }} />
        ))}
      </div>
    </div>
  )
}

const laptopLayouts: Record<ScreenVariant, (p: { theme: ProjectTheme; title?: string }) => React.JSX.Element> = {
  dashboard: DashboardLayout,
  landing: LandingLayout,
  table: TableLayout,
  analytics: AnalyticsLayout,
  catalog: CatalogLayout,
  learning: LearningLayout,
  chat: ChatLayout,
  code: CodeLayout,
  mobile: LandingLayout,
}

function ScreenImpl({ variant, theme, device = 'laptop', title, className }: ScreenProps) {
  const Layout = laptopLayouts[variant]
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: theme.bg,
        color: theme.text,
        // Scales every `em` inside the mockup with its container width.
        fontSize: 'clamp(3px, 1.35cqw, 11px)',
        fontFamily: 'var(--font-sans)',
        lineHeight: 1.2,
      }}
      aria-hidden
    >
      {device === 'phone' ? <PhoneLayout theme={theme} variant={variant} title={title} /> : <Layout theme={theme} title={title} />}
    </div>
  )
}

export const Screen = memo(ScreenImpl)
