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
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const CareersPage = lazy(() => import('@/pages/CareersPage'))
const InsightsPage = lazy(() => import('@/pages/InsightsPage'))
const ArticlePage = lazy(() => import('@/pages/ArticlePage'))
const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'))
const StartProjectPage = lazy(() => import('@/pages/StartProjectPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
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
        <Route path="a-propos" element={<AboutPage />} />
        <Route path="carrieres" element={<CareersPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="insights/:slug" element={<ArticlePage />} />
        <Route path="solutions" element={<SolutionsPage />} />
        <Route path="demarrer-un-projet" element={<StartProjectPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
