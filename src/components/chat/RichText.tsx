import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Minimal, safe Markdown for assistant replies: paragraphs, "- " lists,
 * **bold** and [links](/path). Builds React elements — never innerHTML.
 * Internal paths use the router; external links must be http(s).
 */
function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const key = `${keyPrefix}-${i++}`
    if (match[1]) {
      nodes.push(<strong key={key}>{match[1]}</strong>)
    } else {
      const [, , label, href] = match
      if (href.startsWith('/') && !href.startsWith('//')) {
        nodes.push(
          <Link key={key} to={href} className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand">
            {label}
          </Link>,
        )
      } else if (/^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) {
        nodes.push(
          <a key={key} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="font-semibold text-brand underline underline-offset-2">
            {label}
          </a>,
        )
      } else {
        nodes.push(label)
      }
    }
    last = pattern.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function RichText({ text }: { text: string }) {
  const blocks = text.replace(/\r/g, '').split(/\n{2,}/)
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split('\n').filter((l) => l.trim() !== '')
        const isList = lines.length > 0 && lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))
        if (isList) {
          return (
            <ul key={b} className="my-1.5 list-disc space-y-1 pl-4">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\s*([-*•]|\d+\.)\s+/, ''), `${b}-${i}`)}</li>
              ))}
            </ul>
          )
        }
        return (
          <p key={b} className="my-1.5 first:mt-0 last:mb-0">
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {inline(l, `${b}-${i}`)}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}
