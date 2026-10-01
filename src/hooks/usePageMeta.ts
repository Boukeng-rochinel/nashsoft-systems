import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@/data/site'

interface PageMeta {
  title: string
  description?: string
  /** Set to true for pages that should not be indexed (404, legal drafts…). */
  noindex?: boolean
  type?: 'website' | 'article'
}

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

/** Updates document title, description, Open Graph and canonical tags per page. */
export function usePageMeta({ title, description = site.description, noindex = false, type = 'website' }: PageMeta) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title === site.name ? `${site.name} — Ideas · Code · Solutions` : `${title} | ${site.name}`
    const url = `${site.url}${pathname === '/' ? '/' : pathname}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setCanonical(url)
  }, [title, description, noindex, type, pathname])
}
