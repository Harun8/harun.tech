import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { portfolio, type Project } from '../../data/portfolio'

/* ─── Typewriter Effect ─── */

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.05, delay: delay + i * 0.08 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: delay + text.length * 0.08,
        }}
      >
        _
      </motion.span>
    </span>
  )
}

/* ─── Rating Bar ─── */

function RatingBar({ rating }: { rating: string }) {
  const match = rating.match(/(\d+)\/(\d+)/)
  if (!match) return null
  const value = parseInt(match[1])
  const max = parseInt(match[2])
  const filled = Math.round((value / max) * 10)
  const empty = 10 - filled
  return (
    <span className="text-[#5a5650]">
      Rating: {'█'.repeat(filled)}
      {'░'.repeat(empty)} {rating}
    </span>
  )
}

/* ─── Timeline Project Entry ─── */

function TimelineEntry({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const isLeft = index % 2 === 0

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-8">
      {/* Left content or spacer */}
      <div className={`${isLeft ? 'block' : 'hidden md:block'}`}>
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:text-right"
          >
            <ProjectCard project={project} align="right" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex items-start justify-end pt-1"
          >
            <span className="text-[#8a8478] text-sm font-mono">
              {project.launchDate}
            </span>
          </motion.div>
        )}
      </div>

      {/* Center timeline dot */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="relative"
        >
          {/* Horizontal connector lines */}
          <span className="absolute top-1/2 -translate-y-1/2 right-full w-6 border-t border-[#b8b0a4]" />
          <span className="absolute top-1/2 -translate-y-1/2 left-full w-6 border-t border-[#b8b0a4]" />
          <span className="text-[#5a5650] text-lg leading-none select-none">
            ●
          </span>
        </motion.div>
        <div className="flex-1 w-px border-l-2 border-dotted border-[#b8b0a4]" />
      </div>

      {/* Right content or spacer */}
      <div className={`${!isLeft ? 'block' : 'hidden md:block'}`}>
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <ProjectCard project={project} align="left" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            className="hidden md:flex items-start pt-1"
          >
            <span className="text-[#8a8478] text-sm font-mono">
              {project.launchDate}
            </span>
          </motion.div>
        )}
      </div>

      {/* Mobile layout — stacked single side */}
      <div className={`md:hidden ${isLeft ? 'hidden' : ''}`}>
        <MobileEntry project={project} />
      </div>
    </div>
  )
}

/* ─── Mobile Entry ─── */

function MobileEntry({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative pl-8 pb-10 border-l-2 border-dotted border-[#b8b0a4] ml-4"
    >
      <span className="absolute left-[-5px] top-0 text-[#5a5650] text-sm select-none">
        ●
      </span>
      <ProjectCard project={project} align="left" />
    </motion.div>
  )
}

/* ─── Project Card ─── */

function ProjectCard({
  project,
  align,
}: {
  project: Project
  align: 'left' | 'right'
}) {
  const textAlign = align === 'right' ? 'md:text-right' : 'text-left'

  return (
    <div className={`pb-12 ${textAlign}`}>
      <p className="text-[#8a8478] text-xs font-mono mb-1 md:hidden">
        {project.launchDate}
      </p>
      <h3 className="text-[#3d3a35] text-lg font-bold font-mono uppercase tracking-wider">
        {project.name}
      </h3>
      <div
        className={`w-24 border-t border-[#b8b0a4] my-2 ${align === 'right' ? 'md:ml-auto' : ''}`}
      />
      <p className="text-[#6b6560] text-sm font-mono leading-relaxed max-w-sm">
        {project.description.length > 120
          ? project.description.slice(0, 120) + '...'
          : project.description}
      </p>

      {/* Images */}
      <div
        className={`flex gap-2 mt-4 ${align === 'right' ? 'md:justify-end' : 'justify-start'}`}
      >
        {project.images.slice(0, 2).map((img, i) => (
          <div
            key={i}
            className="w-28 border border-[#b8b0a4] overflow-hidden"
            style={{ aspectRatio: '3/2' }}
          >
            <img
              src={img}
              alt={`${project.name} screenshot ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Tech */}
      <p className="text-[#8a8478] text-xs font-mono mt-3">
        {project.tech.join(' · ')}
      </p>

      {/* Rating */}
      {project.rating && (
        <p className="text-xs font-mono mt-1">
          <RatingBar rating={project.rating} />
        </p>
      )}
    </div>
  )
}

/* ─── Dot Grid Background ─── */

function DotGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle, #c8c0b4 0.8px, transparent 0.8px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Page ─── */

export default function ProjectsC() {
  const [tab, setTab] = useState<'personal' | 'work'>('personal')
  const projects: Project[] =
    tab === 'personal' ? portfolio.projects : portfolio.workProjects

  return (
    <div
      className="relative min-h-screen font-mono"
      style={{ backgroundColor: '#e8e4dc' }}
    >
      <DotGrid />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="text-[#8a8478] text-sm font-mono hover:text-[#3d3a35] transition-colors"
          >
            {'[ cd .. ]'}
          </Link>
        </motion.div>

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] text-[#3d3a35] font-mono uppercase mt-8">
          <TypewriterText text="PROJECTS" delay={0.3} />
        </h1>

        {/* Tab toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-8 mb-16 font-mono text-sm flex items-center gap-1"
        >
          <span className="text-[#8a8478]">{'<'}</span>
          <button
            onClick={() => setTab('personal')}
            className={`px-2 py-1 transition-colors ${
              tab === 'personal'
                ? 'text-[#3d3a35]'
                : 'text-[#b8b0a4] hover:text-[#6b6560]'
            }`}
          >
            personal
          </button>
          <span className="text-[#8a8478]">|</span>
          <button
            onClick={() => setTab('work')}
            className={`px-2 py-1 transition-colors ${
              tab === 'work'
                ? 'text-[#3d3a35]'
                : 'text-[#b8b0a4] hover:text-[#6b6560]'
            }`}
          >
            work
          </button>
          <span className="text-[#8a8478]">{'>'}</span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 border-l-2 border-dotted border-[#b8b0a4]"
            aria-hidden="true"
          />

          {/* Desktop entries */}
          <div className="hidden md:block">
            {projects.map((project, i) => (
              <TimelineEntry key={project.name} project={project} index={i} />
            ))}
          </div>

          {/* Mobile entries */}
          <div className="md:hidden">
            {projects.map((project) => (
              <MobileEntry key={project.name} project={project} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 pb-8"
        >
          <pre className="text-[#b8b0a4] text-xs font-mono">
            {`── EOF ──`}
          </pre>
        </motion.div>
      </div>
    </div>
  )
}
