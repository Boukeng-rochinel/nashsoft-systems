/**
 * Build-time entry used by `seo()` in vite.config.ts (loaded through one
 * runnerImport so i18n state and page metadata share a single module graph).
 * Returns every indexable page in every locale, with translated metadata.
 */
import { DEFAULT_LOCALE, LOCALES, catalogLoaders, localeInfo, localizePath, setActiveLocale, t, type Catalog, type Locale } from '@/i18n'
import { DEFAULT_OG_IMAGE, alternateUrls, formatTitle, localizedUrl, seoRoutes } from './seo'
import { site } from './site'

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
}

export { site }

export async function buildPages(): Promise<BuiltPage[]> {
  const pages: BuiltPage[] = []
  for (const locale of LOCALES) {
    const catalog: Catalog = locale === 'fr' ? {} : (await catalogLoaders[locale]()).default
    setActiveLocale(locale, catalog)
    for (const route of seoRoutes()) {
      pages.push({
        locale,
        path: route.path,
        outPath: localizePath(route.path, locale),
        url: localizedUrl(route.path, locale),
        title: formatTitle(route.title),
        description: t(route.description),
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
