/**
 * Build-time entry used by `seo()` in vite.config.ts (loaded through one
 * runnerImport so i18n state and page metadata share a single module graph).
 * Returns every indexable page in every locale, with translated metadata.
 */
import { DEFAULT_LOCALE, LOCALES, localeInfo, localizePath, setActiveLocale, t, type Catalog, type Locale } from '@/i18n'
// Static imports: runnerImport closes its module runner once this module loads,
// so lazy `catalogLoaders` calls inside buildPages() would fail.
import en from '@/i18n/catalogs/en'
import pt from '@/i18n/catalogs/pt'

const catalogs: Record<Locale, Catalog> = { fr: {}, en, pt }
import { DEFAULT_OG_IMAGE, alternateUrls, formatTitle, localizedUrl, seoRoutes } from './seo'
import { site } from './site'
import { services, serviceHref } from './services'
import { projects, projectHref } from './projects'
import { footerNav, START_PROJECT_HREF } from './navigation'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Static, crawlable markup placed inside #root: H1, intro, internal links and
 * real text for crawlers that do not run JavaScript. React replaces it on mount.
 */
function staticShell(path: string, heading: string, description: string, locale: Locale): string {
  const href = (p: string) => esc(localizePath(p, locale))
  const link = (p: string, label: string) => `<a href="${href(p)}">${esc(t(label))}</a>`
  const serviceItems = services
    .map((s) => `<li><h3>${link(serviceHref(s.slug), s.title)}</h3><p>${esc(t(s.description))}</p></li>`)
    .join('')
  const projectItems = projects.map((p) => `<li>${link(projectHref(p.slug), p.title)} — ${esc(t(p.summary))}</li>`).join('')
  const nav = footerNav.navigation.map((n) => `<li>${link(n.href, n.label)}</li>`).join('')
  return [
    '<div class="seo-shell" style="max-width:1100px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;color:#0b1220">',
    `<header><a href="${href('/')}"><strong>${esc(site.name)}</strong></a> — Ideas · Code · Solutions<nav aria-label="${esc(t('Navigation'))}"><ul>${nav}</ul></nav></header>`,
    '<main>',
    `<h1>${esc(heading)}</h1>`,
    `<p>${esc(description)}</p>`,
    path === '/' ? `<p>${esc(t(site.description))}</p>` : '',
    `<p>${link(START_PROJECT_HREF, 'Démarrer un projet')} · ${link('/contact', 'Contact')}</p>`,
    `<section><h2>${esc(t('Nos services'))}</h2><ul>${serviceItems}</ul></section>`,
    `<section><h2>${esc(t('Projets'))}</h2><ul>${projectItems}</ul></section>`,
    '</main>',
    `<footer><p>${esc(site.name)} · ${esc(t(site.contact.city))} · <a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a> · <a href="${esc(site.contact.phoneHref)}">${esc(site.contact.phone)}</a></p></footer>`,
    '</div>',
  ].join('')
}

export interface BuiltPage {
  locale: Locale
  /** Locale-free path (`/services`). */
  path: string
  /** Output path with the locale prefix (`/en/services`). */
  outPath: string
  url: string
  title: string
  description: string
  image: string
  type: 'website' | 'article'
  noindex: boolean
  htmlLang: string
  ogLocale: string
  alternates: Array<{ hreflang: string; href: string }>
  lastmod?: string
  changefreq: string
  priority: number
  /** Crawlable HTML for #root (replaced by React on mount). */
  shell: string
}

export { site }

export async function buildPages(): Promise<BuiltPage[]> {
  const pages: BuiltPage[] = []
  for (const locale of LOCALES) {
    setActiveLocale(locale, catalogs[locale])
    for (const route of seoRoutes()) {
      const heading = route.path === '/' ? `${t('Nous transformons vos idées en')} ${t('solutions digitales.')}` : t(route.title)
      const description = t(route.description)
      pages.push({
        shell: staticShell(route.path, heading, description, locale),
        locale,
        path: route.path,
        outPath: localizePath(route.path, locale),
        url: localizedUrl(route.path, locale),
        title: formatTitle(route.title),
        description,
        image: `${site.url}${route.image ?? DEFAULT_OG_IMAGE}`,
        type: route.type ?? 'website',
        noindex: Boolean(route.noindex),
        htmlLang: localeInfo[locale].htmlLang,
        ogLocale: localeInfo[locale].ogLocale,
        alternates: alternateUrls(route.path),
        lastmod: route.lastmod,
        changefreq: route.changefreq,
        priority: route.priority,
      })
    }
  }
  setActiveLocale(DEFAULT_LOCALE, {})
  return pages
}
