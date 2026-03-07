import { Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'

const Design11 = lazy(() => import('./pages/Design11'))
const Design11Projects = lazy(() => import('./pages/Design11/Projects'))

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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
