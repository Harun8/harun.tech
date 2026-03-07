import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio, type Project } from '../../data/portfolio'

/* ─── Helpers ─── */

function formatDate(launchDate: string) {
  // "07.2024" -> "2024-07", "2024" -> "2024-01"
  const parts = launchDate.split('.')
  if (parts.length === 2) return `${parts[1]}-${parts[0]}`
  return `${parts[0]}-01`
}

function projectSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
}

function ratingBar(rating: string) {
  // "10/10" -> [██████████] 10/10
  const match = rating.match(/(\d+)\/(\d+)/)
  if (!match) return rating
  const value = parseInt(match[1])
  const max = parseInt(match[2])
  const filled = Math.round((value / max) * 10)
  const empty = 10 - filled
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${rating}`
}

/* ─── Dot grid (same as Design13 hero) ─── */

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle, #c8c0b4 0.8px, transparent 0.8px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Image preview on hover ─── */

function ImagePreview({ project }: { project: Project }) {
  const src = project.images[0]
  if (!src) return null
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-0 z-30 hidden lg:block"
      style={{ width: 240 }}
    >
      <pre className="text-[#8a8478] text-[10px] leading-none select-none font-mono">
{`+${'─'.repeat(30)}+
|${' '.repeat(30)}|`}
      </pre>
      <div className="mx-[1ch] -mt-[2px]">
        <img
          src={src}
          alt={project.name}
          className="w-full h-32 object-cover"
          style={{ imageRendering: 'auto' }}
        />
      </div>
      <pre className="text-[#8a8478] text-[10px] leading-none select-none font-mono -mt-[2px]">
{`|${' '.repeat(30)}|
+${'─'.repeat(30)}+`}
      </pre>
    </motion.div>
  )
}

/* ─── Single project row ─── */

function ProjectRow({
  project,
  index,
  isPersonal,
}: {
  project: Project
  index: number
  isPersonal: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const date = formatDate(project.launchDate)
  const slug = projectSlug(project.name)
  const isDir = project.url !== '#'
  const perm = isDir ? 'drwxr-xr-x' : '-rw-r--r--'
  const suffix = isDir ? '/' : ''

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`
          flex items-baseline gap-2 sm:gap-4 px-2 sm:px-4 py-1.5 sm:py-2 rounded-sm transition-colors duration-150 cursor-pointer
          ${hovered ? 'bg-[#3d3a35] text-[#e8e4dc]' : 'text-[#3d3a35]'}
        `}
      >
        {/* Permissions */}
        <span className="hidden sm:inline text-[10px] sm:text-xs shrink-0 opacity-60">
          {perm}
        </span>

        {/* Owner */}
        <span className="hidden md:inline text-[10px] sm:text-xs shrink-0 opacity-50">
          harun
        </span>

        {/* Date */}
        <span className="text-[10px] sm:text-xs shrink-0 opacity-50 w-[5.5ch] sm:w-[7ch]">
          {date}
        </span>

        {/* Name */}
        <span className="text-xs sm:text-sm font-bold shrink-0">
          {slug}{suffix}
        </span>

        {/* Description (truncated) */}
        <span
          className={`hidden sm:inline text-[10px] sm:text-xs truncate ${
            hovered ? 'opacity-80' : 'opacity-40'
          }`}
        >
          {project.description.slice(0, 60)}
          {project.description.length > 60 ? '...' : ''}
        </span>

        {/* Rating (personal only) */}
        {isPersonal && project.rating && (
          <span
            className={`ml-auto text-[10px] sm:text-xs shrink-0 ${
              hovered ? 'text-[#e8e4dc] opacity-90' : 'text-[#8a8478]'
            }`}
          >
            {ratingBar(project.rating)}
          </span>
        )}
      </div>

      {/* Image preview on hover */}
      <AnimatePresence>
        {hovered && <ImagePreview project={project} />}
      </AnimatePresence>
    </motion.div>
  )

  if (project.url && project.url !== '#') {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return content
}

/* ─── Blinking cursor ─── */

function BlinkingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      className="inline-block w-[0.6em] h-[1.1em] bg-[#3d3a35] align-text-bottom ml-1"
    />
  )
}

/* ─── Page ─── */

export default function ProjectsA() {
  const [tab, setTab] = useState<'personal' | 'work'>('personal')
  const projects =
    tab === 'personal' ? portfolio.projects : portfolio.workProjects

  return (
    <div
      className="relative min-h-screen overflow-hidden font-mono"
      style={{ backgroundColor: '#e8e4dc' }}
    >
      <DotGrid />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Header breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-lg sm:text-xl md:text-2xl text-[#3d3a35]">
            <span className="text-[#8a8478]">~/</span>
            harun
            <span className="text-[#8a8478]">/</span>
            projects
            <span className="text-[#8a8478]"> $</span>
            <BlinkingCursor />
          </h1>
        </motion.div>

        {/* Tab toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex gap-2 sm:gap-4 mb-6 sm:mb-8"
        >
          <button
            onClick={() => setTab('personal')}
            className={`text-xs sm:text-sm px-3 py-1.5 border transition-colors duration-200 ${
              tab === 'personal'
                ? 'bg-[#3d3a35] text-[#e8e4dc] border-[#3d3a35]'
                : 'text-[#6b6560] border-[#8a8478] hover:bg-[#3d3a35] hover:text-[#e8e4dc] hover:border-[#3d3a35]'
            }`}
          >
            $ ls personal/
          </button>
          <button
            onClick={() => setTab('work')}
            className={`text-xs sm:text-sm px-3 py-1.5 border transition-colors duration-200 ${
              tab === 'work'
                ? 'bg-[#3d3a35] text-[#e8e4dc] border-[#3d3a35]'
                : 'text-[#6b6560] border-[#8a8478] hover:bg-[#3d3a35] hover:text-[#e8e4dc] hover:border-[#3d3a35]'
            }`}
          >
            $ ls work/
          </button>
        </motion.div>

        {/* Column header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-baseline gap-2 sm:gap-4 px-2 sm:px-4 py-1 text-[10px] sm:text-xs text-[#8a8478] border-b border-[#c8c0b4] mb-2"
        >
          <span className="hidden sm:inline w-[10ch]">permissions</span>
          <span className="hidden md:inline w-[5ch]">owner</span>
          <span className="w-[5.5ch] sm:w-[7ch]">date</span>
          <span>name</span>
        </motion.div>

        {/* Listing */}
        <div className="mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {projects.map((project, i) => (
                <ProjectRow
                  key={project.name}
                  project={project}
                  index={i}
                  isPersonal={tab === 'personal'}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Total line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-[10px] sm:text-xs text-[#8a8478] px-2 sm:px-4 mb-8"
        >
          total {projects.length}
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link
            to="/"
            className="inline-block text-xs sm:text-sm text-[#6b6560] border border-[#8a8478] px-4 py-2 hover:bg-[#3d3a35] hover:text-[#e8e4dc] hover:border-[#3d3a35] transition-colors duration-200"
          >
            $ cd ..
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
