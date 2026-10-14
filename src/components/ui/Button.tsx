import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { glassButton } from '@/lib/styles'

type Variant = 'primary' | 'secondary' | 'glass' | 'outline-dark' | 'white' | 'link' | 'link-dark'
type Size = 'sm' | 'md' | 'lg'

/** Pill buttons, no gradients or glow. Primary = liquid glass: translucent fill, blur, brand-blue border. */
const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-display font-medium whitespace-nowrap transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-60'

const glass = glassButton

const variants: Record<Variant, string> = {
  primary: glass,
  secondary:
    'border-[1.5px] border-brand bg-white text-brand hover:bg-brand-50 on-dark:border-white/70 on-dark:bg-transparent on-dark:text-white on-dark:hover:bg-white/10',
  /** Liquid-glass: translucent fill, backdrop blur, brand-blue border. */
  glass,
  'outline-dark':'border-[1.5px] border-white/70 bg-transparent text-white hover:bg-white/10',
  white: 'bg-white text-navy hover:bg-brand-50 hover:text-brand',
  link: 'px-0! py-0! text-brand hover:text-brand-600',
  'link-dark': 'px-0! py-0! text-brand-300 hover:text-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8rem]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-[0.95rem]',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  /** Trailing arrow that nudges on hover (default true for primary/link). */
  arrow?: boolean
  /** Leading icon. */
  icon?: LucideIcon
  className?: string
  children: ReactNode
}

function Inner({ children, arrow, icon: Icon }: Pick<CommonProps, 'children' | 'arrow' | 'icon'>) {
  return (
    <>
      {Icon && <Icon aria-hidden className="size-4 shrink-0" />}
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </>
  )
}

const defaultArrow = (variant: Variant) => variant === 'primary' || variant === 'link' || variant === 'link-dark' || variant === 'white'

type ButtonLinkProps = CommonProps & { to: string; external?: boolean; 'aria-label'?: string; onClick?: () => void }

/** Router-aware link styled as a button. Use `external` for mailto/tel/http links. */
export function ButtonLink({ to, external, variant = 'primary', size = 'md', arrow, icon, className, children, ...rest }: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const showArrow = arrow ?? defaultArrow(variant)
  if (external || /^(https?:|mailto:|tel:)/.test(to)) {
    const isHttp = to.startsWith('http')
    return (
      <a href={to} className={classes} {...(isHttp ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
        <Inner arrow={showArrow} icon={icon}>
          {children}
        </Inner>
      </a>
    )
  }
  return (
    <Link to={to} className={classes} {...rest}>
      <Inner arrow={showArrow} icon={icon}>
        {children}
      </Inner>
    </Link>
  )
}

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>

export function Button({ variant = 'primary', size = 'md', arrow, icon, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <Inner arrow={arrow ?? defaultArrow(variant)} icon={icon}>
        {children}
      </Inner>
    </button>
  )
}
