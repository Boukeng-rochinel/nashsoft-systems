import type { Technology } from '@/types'

export const technologies: Technology[] = [
  { name: 'React', category: 'Frontend', mono: 'Re', color: '#149ECA' },
  { name: 'TypeScript', category: 'Frontend', mono: 'TS', color: '#3178C6' },
  { name: 'Next.js', category: 'Frontend', mono: 'N', color: '#0B1220' },
  { name: 'Tailwind CSS', category: 'Frontend', mono: 'Tw', color: '#0EA5E9' },
  { name: 'Framer Motion', category: 'Frontend', mono: 'Fm', color: '#7C3AED' },
  { name: 'Flutter', category: 'Mobile', mono: 'Fl', color: '#0468D7' },
  { name: 'React Native', category: 'Mobile', mono: 'RN', color: '#0B7BC0' },
  { name: 'Node.js', category: 'Backend', mono: 'No', color: '#3C873A' },
  { name: 'Python', category: 'Backend', mono: 'Py', color: '#3776AB' },
  { name: '.NET', category: 'Backend', mono: '.N', color: '#512BD4' },
  { name: 'PostgreSQL', category: 'Base de données', mono: 'Pg', color: '#336791' },
  { name: 'MongoDB', category: 'Base de données', mono: 'Mo', color: '#13AA52' },
  { name: 'MySQL', category: 'Base de données', mono: 'My', color: '#00758F' },
  { name: 'Firebase', category: 'Base de données', mono: 'Fb', color: '#FFA000', foreground: '#3B2300' },
  { name: 'Docker', category: 'Cloud & DevOps', mono: 'Dk', color: '#1D63ED' },
  { name: 'AWS', category: 'Cloud & DevOps', mono: 'aws', color: '#232F3E' },
  { name: 'GitHub', category: 'Outils', mono: 'Gh', color: '#181717' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', mono: 'GA', color: '#2088FF' },
  { name: 'Linux', category: 'Cloud & DevOps', mono: 'Lx', color: '#E8A200', foreground: '#2A1D00' },
  { name: 'Nginx', category: 'Cloud & DevOps', mono: 'Nx', color: '#009639' },
  { name: 'Vercel', category: 'Cloud & DevOps', mono: '▲', color: '#0B1220' },
  { name: 'Cloudflare', category: 'Cloud & DevOps', mono: 'Cf', color: '#F38020' },
  { name: 'TensorFlow', category: 'IA & Data', mono: 'TF', color: '#FF6F00' },
  { name: 'TensorFlow Lite', category: 'IA & Data', mono: 'TL', color: '#FF8F00' },
  { name: 'PyTorch', category: 'IA & Data', mono: 'Pt', color: '#EE4C2C' },
  { name: 'scikit-learn', category: 'IA & Data', mono: 'sk', color: '#F7931E', foreground: '#2F1A00' },
  { name: 'Power BI', category: 'IA & Data', mono: 'BI', color: '#E3A400', foreground: '#2C1F00' },
  { name: 'Odoo', category: 'ERP', mono: 'Od', color: '#714B67' },
  { name: 'Cloudinary', category: 'Outils', mono: 'Cl', color: '#3448C5' },
  { name: 'JWT', category: 'Outils', mono: 'JW', color: '#D63AFF' },
]

const byName = new Map(technologies.map((t) => [t.name.toLowerCase(), t]))

export const getTechnology = (name: string): Technology =>
  byName.get(name.toLowerCase()) ?? { name, category: 'Outils', mono: name.slice(0, 2), color: '#087DFF' }

/** Core stack shown on the homepage, in the order requested by the brand brief. */
export const coreStack = [
  'React',
  'TypeScript',
  'Flutter',
  'Node.js',
  'Python',
  '.NET',
  'PostgreSQL',
  'MongoDB',
  'Firebase',
  'Docker',
  'AWS',
  'GitHub',
].map(getTechnology)
