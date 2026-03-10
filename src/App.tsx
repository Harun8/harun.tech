import { Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'
import { Agentation } from 'agentation'

const Resume1 = lazy(() => import('./pages/Resume1'))

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
        <Route path="/" element={<Resume1 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </Suspense>
  )
}
