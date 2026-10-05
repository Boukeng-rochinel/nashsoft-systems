import { Navigate, useParams } from 'react-router-dom'
import { getServiceBySlug } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'
import { serviceSeo } from '@/data/seo'
import { ServiceDetailView } from '@/components/sections/ServiceDetailView'
import type { Service } from '@/types'
import { SoftwareHeroVisual } from '@/components/visuals/SoftwareHeroVisual'

function ServiceDetail({ service }: { service: Service }) {
  usePageMeta(serviceSeo(service))
  return <ServiceDetailView service={service} heroVisual={service.slug === 'developpement-logiciel' ? <SoftwareHeroVisual /> : undefined} />
}

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <Navigate to="/404" replace />
  return <ServiceDetail service={service} />
}
