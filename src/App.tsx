import { Routes, Route, Navigate } from 'react-router'
import { lazy, Suspense } from 'react'
import { Agentation } from 'agentation'
import Home from './pages/Home'
import AskPdfs from './pages/projects/AskPdfs'
import Veya from './pages/projects/Veya'
import Billigbid from './pages/projects/Billigbid'
import Deepcast from './pages/projects/Deepcast'
import Dagensland from './pages/projects/Dagensland'
import Exifm from './pages/projects/Exifm'

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
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<Resume1 />} />
        <Route path="/projects/askpdfs" element={<AskPdfs />} />
        <Route path="/projects/veya" element={<Veya />} />
        <Route path="/projects/billigbid" element={<Billigbid />} />
        <Route path="/projects/deepcast" element={<Deepcast />} />
        <Route path="/projects/dagensland" element={<Dagensland />} />
        <Route path="/projects/exifm" element={<Exifm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
    </Suspense>
  )
}
