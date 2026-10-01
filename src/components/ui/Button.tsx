import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline-dark' | 'white' | 'link' | 'link-dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold whitespace-nowrap transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-gradient text-white shadow-[0_8px_24px_-10px_rgb(8_125_255/0.7)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgb(8_125_255/0.8)] active:translate-y-0',
  secondary:
    'border border-line-strong bg-white text-navy shadow-card hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand active:translate-y-0 on-dark:border-white/20 on-dark:bg-white/5 on-dark:text-white on-dark:shadow-none on-dark:backdrop-blur-sm on-dark:hover:border-cyan/60 on-dark:hover:bg-white/10 on-dark:hover:text-white',
  'outline-dark':
    'border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-cyan/60 hover:bg-white/10 active:translate-y-0',
  white: 'bg-white text-navy shadow-float hover:-translate-y-0.5 hover:text-brand active:translate-y-0',
  link: 'px-0! py-0! text-brand hover:text-violet',
  'link-dark': 'px-0! py-0! text-cyan hover:text-white',
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
