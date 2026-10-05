import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@/data/site'
import { DEFAULT_OG_IMAGE, formatTitle, type PageSeo } from '@/data/seo'

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

/**
 * Updates document title, description, Open Graph and canonical tags per page.
 * The build also writes these into each route's HTML (vite.config.ts), so
 * crawlers and link previews get them without running JavaScript.
 */
export function usePageMeta({ title, description = site.description, image = DEFAULT_OG_IMAGE, noindex = false, type = 'website' }: Partial<PageSeo> & { title: string }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = formatTitle(title)
    const url = `${site.url}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`
    const imageUrl = `${site.url}${image}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', imageUrl)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)
    setCanonical(url)
  }, [title, description, image, noindex, type, pathname])
}
