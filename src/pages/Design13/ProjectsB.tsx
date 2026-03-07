import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { portfolio, type Project } from '../../data/portfolio'

/* ─── ASCII Header ─── */

const HEADER = `
██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗
██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝
██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗
██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║
██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝
`.trimStart()

/* ─── Helpers ─── */

function parseRating(rating?: string): number {
  if (!rating) return 0
  const match = rating.match(/^(\d+)\/(\d+)$/)
  if (!match) return 0
  return Math.round((parseInt(match[1]) / parseInt(match[2])) * 10)
}

function RatingStars({ rating }: { rating?: string }) {
  const filled = parseRating(rating)
  const empty = 10 - filled
  return (
    <span className="text-[#8a8478]">
      {'★'.repeat(filled)}
      {'☆'.repeat(empty)}
      {rating ? ` ${rating}` : ''}
    </span>
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

/* ─── Project Card ─── */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="text-[#b8b0a4] group-hover:text-[#6b6560] transition-colors duration-200 text-xs sm:text-sm leading-none">
        {/* Top border */}
        <pre className="select-none" aria-hidden="true">
          {'╔' + '═'.repeat(38) + '╗'}
        </pre>

        {/* Title row */}
        <pre>
          <span className="select-none" aria-hidden="true">{'║  '}</span>
          <span className="text-[#3d3a35] font-bold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[#3d3a35] font-bold">
            {'  ' + project.name.toUpperCase()}
          </span>
          <span className="select-none" aria-hidden="true">
            {' '.repeat(Math.max(0, 33 - project.name.length - 4)) + '║'}
          </span>
        </pre>

        {/* Separator */}
        <pre className="select-none" aria-hidden="true">
          {'║' + '─'.repeat(38) + '║'}
        </pre>

        {/* Description - wrapped into lines */}
        <div className="px-0">
          {wrapText(project.description, 34).map((line, i) => (
            <pre key={i}>
              <span className="select-none" aria-hidden="true">{'║  '}</span>
              <span className="text-[#6b6560]">{line}</span>
              <span className="select-none" aria-hidden="true">
                {' '.repeat(Math.max(0, 36 - line.length)) + '║'}
              </span>
            </pre>
          ))}
        </div>

        {/* Empty line */}
        <pre className="select-none" aria-hidden="true">
          {'║' + ' '.repeat(38) + '║'}
        </pre>

        {/* Images */}
        <div className="relative">
          <pre className="select-none" aria-hidden="true">
            {'║  '}
            {project.images.slice(0, 2).map((_, i) => (
              <span key={i}>
                {i > 0 ? '  ' : ''}
                {'┌' + '─'.repeat(14) + '┐'}
              </span>
            ))}
            {' '.repeat(Math.max(0, 36 - project.images.slice(0, 2).length * 18))}
            {'║'}
          </pre>

          {/* Actual images row */}
          <div className="flex items-start" style={{ paddingLeft: '2ch' }}>
            <span className="select-none text-[#b8b0a4] group-hover:text-[#6b6560] transition-colors" aria-hidden="true">{'║  '}</span>
            <div className="flex gap-[2ch]">
              {project.images.slice(0, 2).map((img, i) => (
                <div key={i} className="relative">
                  <span className="select-none text-[#b8b0a4] group-hover:text-[#6b6560] transition-colors" aria-hidden="true">{'│'}</span>
                  <img
                    src={img}
                    alt={`${project.name} screenshot ${i + 1}`}
                    className="inline-block w-[12ch] h-[4em] object-cover align-middle"
                  />
                  <span className="select-none text-[#b8b0a4] group-hover:text-[#6b6560] transition-colors" aria-hidden="true">{'│'}</span>
                </div>
              ))}
            </div>
          </div>

          <pre className="select-none" aria-hidden="true">
            {'║  '}
            {project.images.slice(0, 2).map((_, i) => (
              <span key={i}>
                {i > 0 ? '  ' : ''}
                {'└' + '─'.repeat(14) + '┘'}
              </span>
            ))}
            {' '.repeat(Math.max(0, 36 - project.images.slice(0, 2).length * 18))}
            {'║'}
          </pre>
        </div>

        {/* Empty line */}
        <pre className="select-none" aria-hidden="true">
          {'║' + ' '.repeat(38) + '║'}
        </pre>

        {/* Tech */}
        <pre>
          <span className="select-none" aria-hidden="true">{'║  '}</span>
          <span className="text-[#8a8478]">
            {'tech: ' + project.tech.join(' · ')}
          </span>
          <span className="select-none" aria-hidden="true">
            {' '.repeat(Math.max(0, 36 - ('tech: ' + project.tech.join(' · ')).length)) + '║'}
          </span>
        </pre>

        {/* Date */}
        <pre>
          <span className="select-none" aria-hidden="true">{'║  '}</span>
          <span className="text-[#8a8478]">
            {'date: ' + project.launchDate}
          </span>
          <span className="select-none" aria-hidden="true">
            {' '.repeat(Math.max(0, 36 - ('date: ' + project.launchDate).length)) + '║'}
          </span>
        </pre>

        {/* Rating */}
        {project.rating && (
          <pre>
            <span className="select-none" aria-hidden="true">{'║  '}</span>
            <RatingStars rating={project.rating} />
            <span className="select-none" aria-hidden="true">
              {' '.repeat(Math.max(0, 36 - 10 - 1 - (project.rating?.length ?? 0))) + '║'}
            </span>
          </pre>
        )}

        {/* Bottom border */}
        <pre className="select-none" aria-hidden="true">
          {'╚' + '═'.repeat(38) + '╝'}
        </pre>
      </div>
    </motion.div>
  )
}

/* ─── Text wrapping utility ─── */

function wrapText(text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    if (current.length + (current ? 1 : 0) + word.length > maxWidth) {
      if (current) lines.push(current)
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current)

  return lines.slice(0, 4) // limit to 4 lines
}

/* ─── Page ─── */

export default function ProjectsB() {
  const [tab, setTab] = useState<'personal' | 'work'>('personal')
  const projects = tab === 'personal' ? portfolio.projects : portfolio.workProjects

  return (
    <div
      className="relative min-h-screen font-mono"
      style={{ backgroundColor: '#e8e4dc' }}
    >
      <DotGrid />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-block text-[#8a8478] hover:text-[#3d3a35] transition-colors text-xs sm:text-sm mb-6"
          >
            {'[ back ]'}
          </Link>

          <pre className="text-[#3d3a35] text-[4px] sm:text-[6px] md:text-[8px] leading-tight overflow-x-auto whitespace-pre select-none mb-8 sm:mb-12">
            {HEADER}
          </pre>
        </motion.div>

        {/* Tab Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-3 mb-8 sm:mb-12 text-xs sm:text-sm"
        >
          <button
            onClick={() => setTab('personal')}
            className={`border px-3 py-1.5 transition-colors duration-200 ${
              tab === 'personal'
                ? 'border-[#3d3a35] text-[#3d3a35] bg-[#3d3a35]/5'
                : 'border-[#b8b0a4] text-[#8a8478] hover:border-[#8a8478]'
            }`}
          >
            {tab === 'personal' ? '[■ Personal]' : '[□ Personal]'}
          </button>
          <button
            onClick={() => setTab('work')}
            className={`border px-3 py-1.5 transition-colors duration-200 ${
              tab === 'work'
                ? 'border-[#3d3a35] text-[#3d3a35] bg-[#3d3a35]/5'
                : 'border-[#b8b0a4] text-[#8a8478] hover:border-[#8a8478]'
            }`}
          >
            {tab === 'work' ? '[■ Work]' : '[□ Work]'}
          </button>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
