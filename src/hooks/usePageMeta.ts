import { useEffect } from 'react'
import { useLocation } from '@/i18n/router'
import { site } from '@/data/site'
import { DEFAULT_OG_IMAGE, alternateUrls, formatTitle, localizedUrl, type PageSeo } from '@/data/seo'
import { getActiveLocale, localeInfo, t } from '@/i18n'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = href
}

function setAlternates(links: Array<{ hreflang: string; href: string }>) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  for (const { hreflang, href } of links) {
    const el = document.createElement('link')
    el.rel = 'alternate'
    el.hreflang = hreflang
    el.href = href
    document.head.appendChild(el)
  }
}

/**
 * Updates document title, description, Open Graph, canonical and hreflang tags
 * per page, in the active language. The build also writes these into each
 * route's HTML (vite.config.ts), so crawlers and link previews get them without JavaScript.
 */
export function usePageMeta({ title, description = site.description, image = DEFAULT_OG_IMAGE, noindex = false, type = 'website' }: Partial<PageSeo> & { title: string }) {
  // Locale-free path (`/services`), whatever the URL prefix.
  const { pathname } = useLocation()

  useEffect(() => {
    const locale = getActiveLocale()
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '')
    const fullTitle = formatTitle(title)
    const text = t(description)
    const url = localizedUrl(path, locale)
    const imageUrl = `${site.url}${image}`

    document.title = fullTitle
    setMeta('name', 'description', text)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', text)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:locale', localeInfo[locale].ogLocale)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', text)
    setMeta('name', 'twitter:image', imageUrl)
    setCanonical(url)
    setAlternates(noindex ? [] : alternateUrls(path))
  }, [title, description, image, noindex, type, pathname])
}
