/**
 * Locale-aware drop-ins for React Router's Link, NavLink, Navigate, useLocation
 * and useNavigate. Components keep writing locale-free paths (`/services`);
 * these add the active locale prefix (`/en/services`) on the way out and strip
 * it on the way in, so route matching and "active link" logic stay unchanged.
 */
import { forwardRef, useCallback, useMemo } from 'react'
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  Navigate as RouterNavigate,
  useLocation as useRouterLocation,
  useNavigate as useRouterNavigate,
  type LinkProps,
  type NavLinkProps,
  type NavigateOptions,
  type NavigateProps,
  type To,
} from 'react-router-dom'
import { getActiveLocale, localizePath, splitLocale } from './index'

function localizeTo(to: To): To {
  const locale = getActiveLocale()
  if (typeof to === 'string') return localizePath(to, locale)
  return to.pathname ? { ...to, pathname: localizePath(to.pathname, locale) } : to
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...rest }, ref) {
  return <RouterLink ref={ref} to={localizeTo(to)} {...rest} />
})

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink({ to, ...rest }, ref) {
  return <RouterNavLink ref={ref} to={localizeTo(to)} {...rest} />
})

export function Navigate({ to, ...rest }: NavigateProps) {
  return <RouterNavigate to={localizeTo(to)} {...rest} />
}

/** Location with the locale prefix removed from `pathname`. */
export function useLocation() {
  const location = useRouterLocation()
  return useMemo(() => ({ ...location, pathname: splitLocale(location.pathname).path }), [location])
}

export function useNavigate() {
  const navigate = useRouterNavigate()
  return useCallback(
    (to: To | number, options?: NavigateOptions) => (typeof to === 'number' ? navigate(to) : navigate(localizeTo(to), options)),
    [navigate],
  )
}
