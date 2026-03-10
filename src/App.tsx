import { Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'

const Design11 = lazy(() => import('./pages/Design11'))
const Design11Projects = lazy(() => import('./pages/Design11/Projects'))
const Resume1 = lazy(() => import('./pages/Resume1'))
const Resume2 = lazy(() => import('./pages/Resume2'))
const Resume3 = lazy(() => import('./pages/Resume3'))
const Resume4 = lazy(() => import('./pages/Resume4'))

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      Loading...
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Design11 />} />
        <Route path="/projects" element={<Design11Projects />} />
        <Route path="/resume1" element={<Resume1 />} />
        <Route path="/resume2" element={<Resume2 />} />
        <Route path="/resume3" element={<Resume3 />} />
        <Route path="/resume4" element={<Resume4 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
