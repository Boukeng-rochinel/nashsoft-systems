import type { ProjectTheme } from '@/types'

/** Color palettes used by the code-rendered product mockups. */
export const themes = {
  nashsoft: { bg: '#F5F8FC', surface: '#FFFFFF', accent: '#087DFF', accent2: '#6338F5', text: '#061426', muted: '#D5E0EC', nav: '#061426' },
  nashsoftDark: { bg: '#061426', surface: '#0C2644', accent: '#00C6FF', accent2: '#6338F5', text: '#E6F0FF', muted: '#1E3A5F', nav: '#03101F' },
  restaurant: { bg: '#14100C', surface: '#221A13', accent: '#D4A24C', accent2: '#B4502A', text: '#F6EBDD', muted: '#3A2E23', nav: '#0E0B08' },
  autofix: { bg: '#07101F', surface: '#101E36', accent: '#2F80FF', accent2: '#FF4D4D', text: '#E6EEFF', muted: '#1C2E4E', nav: '#050B16' },
  igwork: { bg: '#F4F7FB', surface: '#FFFFFF', accent: '#0F9D76', accent2: '#087DFF', text: '#0B1220', muted: '#DCE5EF', nav: '#0B2B26' },
  edutek: { bg: '#F6F8FF', surface: '#FFFFFF', accent: '#3B5BFF', accent2: '#00B8D9', text: '#101A3A', muted: '#DDE3F5', nav: '#FFFFFF' },
  odoo: { bg: '#F8F6F7', surface: '#FFFFFF', accent: '#714B67', accent2: '#F0A34B', text: '#2A1D27', muted: '#E8DFE5', nav: '#714B67' },
  health: { bg: '#F3FAF9', surface: '#FFFFFF', accent: '#0FA3A3', accent2: '#087DFF', text: '#0B2230', muted: '#D7EBEA', nav: '#FFFFFF' },
  finance: { bg: '#0A1426', surface: '#12203A', accent: '#1FC98E', accent2: '#087DFF', text: '#E6F0FF', muted: '#22375A', nav: '#060D1A' },
  retail: { bg: '#FFF8F3', surface: '#FFFFFF', accent: '#F26B3A', accent2: '#6338F5', text: '#2B1A10', muted: '#F2E2D6', nav: '#FFFFFF' },
  logistics: { bg: '#F4F6FA', surface: '#FFFFFF', accent: '#F5A300', accent2: '#087DFF', text: '#101828', muted: '#E1E6EF', nav: '#101828' },
  government: { bg: '#F5F8FC', surface: '#FFFFFF', accent: '#0B6B3A', accent2: '#C8102E', text: '#0B1220', muted: '#DDE5EE', nav: '#0B2A4A' },
  services: { bg: '#F7F7FB', surface: '#FFFFFF', accent: '#6338F5', accent2: '#087DFF', text: '#14112B', muted: '#E3E0F3', nav: '#14112B' },
} satisfies Record<string, ProjectTheme>
