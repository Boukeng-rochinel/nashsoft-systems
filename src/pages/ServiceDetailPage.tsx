import { Navigate, useParams } from 'react-router-dom'
import { getServiceBySlug } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ServiceDetailView } from '@/components/sections/ServiceDetailView'
import type { Service } from '@/types'

function ServiceDetail({ service }: { service: Service }) {
  usePageMeta({ title: service.title, description: `${service.tagline} ${service.description}` })
  return <ServiceDetailView service={service} />
}

export default function ServiceDetailPage() {
  const { slug = '' } = useParams()
  const service = getServiceBySlug(slug)
  if (!service) return <Navigate to="/404" replace />
  return <ServiceDetail service={service} />
}
