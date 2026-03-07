import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio } from '../../data/portfolio'
import type { Project } from '../../data/portfolio'

function ProjectRow({
  project,
  index,
  showRating,
}: {
  project: Project
  index: number
  showRating: boolean
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      className="border-b border-neutral-200"
    >
      {/* Main row */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.5fr] gap-6 md:gap-8 py-10">
        {/* Project info */}
        <div className="flex gap-4">
          <span className="text-sm font-medium text-neutral-300 pt-0.5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold uppercase tracking-wide text-neutral-900 hover:text-neutral-500 transition-colors"
            >
              {project.name}
            </a>
            <p className="text-xs text-neutral-400 mt-1">
              ({project.launchDate})
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed text-neutral-500">
          {project.description}
        </p>

        {/* Gallery */}
        <div className="flex gap-3">
          {project.images.map((src, imgIdx) => (
            <div key={imgIdx} className="flex-1 overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`${project.name} screenshot ${imgIdx + 1}`}
                className="w-full aspect-[3/2] object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rating row — personal only */}
      {showRating && project.rating && (
        <div className="flex items-baseline gap-3 pb-6 pl-0 md:pl-10">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-300">
            Rating
          </span>
          <span className="text-sm font-bold text-neutral-900">
            {project.rating}
          </span>
          <span className="text-xs text-neutral-400">
            — {project.ratingReason}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  const [tab, setTab] = useState<'personal' | 'work'>('personal')
  const projects =
    tab === 'personal' ? portfolio.projects : portfolio.workProjects
  const showRating = tab === 'personal'

  return (
    <div className="min-h-screen bg-white font-inter">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors mb-16"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>

        {/* Toggle */}
        <div className="flex items-center gap-1 mb-12 bg-neutral-100 rounded-full p-1 w-fit">
          <button
            onClick={() => setTab('personal')}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
              tab === 'personal'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Personal
          </button>
          <button
            onClick={() => setTab('work')}
            className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
              tab === 'work'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-600'
            }`}
          >
            Work
          </button>
        </div>

        {/* Column headers — desktop only */}
        <div className="hidden md:grid md:grid-cols-[1fr_1.2fr_1.5fr] gap-8 pb-4 border-b border-neutral-200">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Projects
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Description
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-400">
            Gallery
          </span>
        </div>

        {/* Project rows */}
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
                showRating={showRating}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
