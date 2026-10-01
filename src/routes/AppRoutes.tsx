import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'))
const AIDataPage = lazy(() => import('@/pages/AIDataPage'))
const CloudPage = lazy(() => import('@/pages/CloudPage'))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        {/* Dedicated pages take precedence over the generic service template. */}
        <Route path="services/ia-data" element={<AIDataPage />} />
        <Route path="services/cloud-devops" element={<CloudPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="projets" element={<ProjectsPage />} />
        <Route path="projets/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
