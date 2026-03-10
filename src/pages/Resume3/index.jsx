import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const DATA = {
  name: 'Harun',
  role: 'Full-Stack Developer & Indie Builder',
  email: 'harunabdi8@gmail.com',
  website: 'harun.tech',
  location: 'Copenhagen, Denmark',
  summary:
    'Full-stack developer and indie SaaS builder shipping multiple products simultaneously. Specializing in AI-powered applications, Shopify plugins, and React/React Native. I build fast, iterate with data, and treat every product like a small business.',
  experience: [
    {
      company: 'Abion',
      location: 'Copenhagen',
      role: 'Software Developer',
      period: '2024–Present',
      desc: 'Building UDRP AI, a Microsoft Teams bot that helps lawyers draft domain dispute complaints using AI and vector search.',
    },
    {
      company: 'Indie SaaS Builder',
      location: '',
      role: 'Founder & Developer',
      period: '2023–Present',
      desc: 'Shipping and maintaining multiple products: askpdfs.io, BilligBid, Gift-a-Friend, ExifM, Dagenslands.dk, and more.',
    },
  ],
  education: [
    {
      school: 'KEA — Copenhagen School of Design and Technology',
      degree: 'AP in Computer Science',
      year: '2022–2024',
    },
  ],
  skills: [
    'React, React Native, Next.js, TypeScript',
    'Node.js, Python, Prisma, Docker',
    'OpenAI, Claude API, Voyage AI, Qdrant',
    'Shopify App Development',
    'RAG pipelines & prompt engineering',
  ],
  languages: [
    { lang: 'Danish', level: 'native' },
    { lang: 'English', level: 'fluent' },
    { lang: 'Somali', level: 'native' },
  ],
  projects: [
    {
      name: 'askpdfs.io',
      desc: 'AI-powered PDF chat SaaS',
      tech: ['Next.js', 'Supabase', 'OpenAI'],
      link: 'https://askpdfs.io',
    },
    {
      name: 'BilligBid',
      desc: 'Danish grocery deals app',
      tech: ['React Native', 'Node.js'],
      link: null,
    },
    {
      name: 'ExifM',
      desc: 'Node.js toolkit for EXIF metadata',
      tech: ['Node.js', 'NPM', 'CLI'],
      link: 'https://npmjs.com/package/exifm',
    },
    {
      name: 'UDRP AI',
      desc: 'AI complaint drafting for domain lawyers',
      tech: ['MS Teams', 'OpenAI', 'Qdrant'],
      link: 'https://abion.com',
    },
    {
      name: 'Gift-a-Friend',
      desc: 'Shopify referral & rewards plugin',
      tech: ['Shopify', 'React', 'Prisma'],
      link: null,
    },
  ],
}

const BLUE = '#3B6B9E'
const PAPER = '#F5F0E8'
const DESK = '#E8E0D5'
const GREY = '#9BA8B5'

const ASCII_ART = `    ┌─────────┐
    │  ░░░░░  │
    │  ░░░░░  │
    └────┬────┘
         │
    ┌────┴────┐
    │ ○  ⌨  ○ │
    └─────────┘`

/* ─── Hover Underline wrapper ─── */
function HoverLine({ children, className = '' }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.div
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: 2,
          background: BLUE,
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ─── Section heading ─── */
function SectionHeading({ children }) {
  return (
    <h3
      style={{
        fontFamily: '"DM Sans", sans-serif',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: BLUE,
        marginBottom: 16,
      }}
    >
      {children}
    </h3>
  )
}

/* ─── Project Card with folded corner ─── */
function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.08, duration: 0.4 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer relative"
      style={{
        border: `1px solid ${BLUE}20`,
        padding: '16px 20px',
        marginBottom: 12,
        background: PAPER,
        overflow: 'hidden',
      }}
    >
      {/* Folded corner */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderColor: `${DESK} transparent transparent transparent`,
        }}
        animate={{
          borderWidth: expanded ? '0px 0px 0px 0px' : '20px 20px 0px 0px',
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      {/* Inner fold line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderColor: `transparent ${BLUE}15 transparent transparent`,
        }}
        animate={{
          borderWidth: expanded ? '0px 0px 0px 0px' : '0px 20px 20px 0px',
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />

      <div className="flex items-start justify-between">
        <div>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: 15,
              color: BLUE,
            }}
          >
            {project.name}
          </span>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: GREY,
              marginLeft: 10,
            }}
          >
            {project.desc}
          </span>
        </div>
        <motion.span
          style={{
            fontSize: 12,
            color: GREY,
            flexShrink: 0,
            marginLeft: 8,
          }}
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▾
        </motion.span>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 12 }}>
              <div className="flex flex-wrap gap-2" style={{ marginBottom: 8 }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 12,
                      fontWeight: 500,
                      color: BLUE,
                      border: `1px solid ${BLUE}30`,
                      padding: '2px 8px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 13,
                    color: BLUE,
                    textDecoration: 'underline',
                    textUnderlineOffset: 3,
                  }}
                >
                  {project.link.replace('https://', '')} →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function Resume3() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .desk-bg { background: white !important; }
          .paper-sheet {
            box-shadow: none !important;
            transform: none !important;
            max-width: 100% !important;
            padding: 40px !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Desk surface */}
      <div
        className="desk-bg"
        style={{
          minHeight: '100vh',
          background: isMobile ? PAPER : DESK,
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile ? 0 : '40px 20px',
          overflowY: 'auto',
        }}
      >
        {/* Paper */}
        <motion.div
          className="paper-sheet"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            background: PAPER,
            maxWidth: 780,
            width: '100%',
            padding: isMobile ? '40px 24px' : '70px 80px',
            position: 'relative',
            alignSelf: 'flex-start',
            ...(isMobile
              ? {}
              : {
                  boxShadow:
                    '0 2px 30px rgba(80,70,60,0.12), 0 1px 8px rgba(80,70,60,0.08)',
                  transform: 'rotate(-0.5deg)',
                }),
          }}
        >
          {/* ASCII Art — top left, decorative */}
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            aria-hidden="true"
            style={{
              fontFamily: 'monospace',
              fontSize: 11,
              lineHeight: 1.3,
              color: BLUE,
              position: 'absolute',
              top: isMobile ? 16 : 28,
              left: isMobile ? 12 : 28,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {ASCII_ART}
          </motion.pre>

          {/* Header area */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {/* Top row: role + contact */}
            <div
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between"
              style={{ marginBottom: 6, paddingLeft: isMobile ? 0 : 120 }}
            >
              <p
                style={{
                  fontFamily: '"Patrick Hand", cursive',
                  fontSize: 24,
                  color: BLUE,
                  lineHeight: 1.2,
                }}
              >
                {DATA.role}
              </p>
              <div
                className="flex flex-col items-start sm:items-end"
                style={{ marginTop: isMobile ? 8 : 0, flexShrink: 0 }}
              >
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 13,
                    color: GREY,
                  }}
                >
                  {DATA.email}
                </span>
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 13,
                    color: GREY,
                  }}
                >
                  {DATA.website}
                </span>
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 13,
                    color: GREY,
                  }}
                >
                  {DATA.location}
                </span>
              </div>
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: isMobile ? 44 : 56,
                color: BLUE,
                lineHeight: 1.05,
                marginBottom: 20,
                paddingLeft: isMobile ? 0 : 120,
              }}
            >
              {DATA.name}
            </h1>

            {/* Summary */}
            <p
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: 15,
                color: BLUE,
                lineHeight: 1.65,
                maxWidth: 560,
                marginBottom: 40,
                paddingLeft: isMobile ? 0 : 120,
              }}
            >
              {DATA.summary}
            </p>
          </motion.div>

          {/* Divider */}
          <div
            style={{ height: 1, background: `${BLUE}18`, marginBottom: 36 }}
          />

          {/* Two-column layout */}
          <div
            className={`${isMobile ? 'flex flex-col gap-10' : 'grid gap-12'}`}
            style={
              isMobile ? {} : { gridTemplateColumns: '1.3fr 1fr' }
            }
          >
            {/* Left column — Experience */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <SectionHeading>Experience</SectionHeading>
              {DATA.experience.map((exp, i) => (
                <HoverLine key={i} className="mb-6 pb-1">
                  <div
                    className="flex items-baseline justify-between flex-wrap gap-x-4"
                    style={{ marginBottom: 3 }}
                  >
                    <span
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 700,
                        fontSize: 15,
                        color: BLUE,
                      }}
                    >
                      {exp.role}
                    </span>
                    <span
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontSize: 13,
                        color: GREY,
                        flexShrink: 0,
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 14,
                      color: BLUE,
                      marginBottom: 4,
                    }}
                  >
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ''}
                  </p>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 400,
                      fontSize: 14,
                      color: BLUE,
                      opacity: 0.8,
                      lineHeight: 1.55,
                    }}
                  >
                    {exp.desc}
                  </p>
                </HoverLine>
              ))}
            </motion.div>

            {/* Right column — Education + Skills + Languages */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Education */}
              <SectionHeading>Education</SectionHeading>
              {DATA.education.map((edu, i) => (
                <HoverLine key={i} className="mb-6 pb-1">
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: 15,
                      color: BLUE,
                    }}
                  >
                    {edu.degree}
                  </p>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 14,
                      color: BLUE,
                      opacity: 0.8,
                    }}
                  >
                    {edu.school}
                  </p>
                  <p
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontSize: 13,
                      color: GREY,
                    }}
                  >
                    {edu.year}
                  </p>
                </HoverLine>
              ))}

              {/* Skills */}
              <div style={{ marginTop: 28 }}>
                <SectionHeading>Skills</SectionHeading>
                {DATA.skills.map((skill, i) => (
                  <HoverLine key={i} className="mb-3 pb-1">
                    <p
                      style={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 400,
                        fontSize: 14,
                        color: BLUE,
                        lineHeight: 1.4,
                      }}
                    >
                      {skill}
                    </p>
                  </HoverLine>
                ))}
              </div>

              {/* Languages */}
              <div style={{ marginTop: 28 }}>
                <SectionHeading>Languages</SectionHeading>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {DATA.languages.map((l, i) => (
                    <HoverLine key={i} className="pb-1">
                      <span
                        style={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontWeight: 500,
                          fontSize: 14,
                          color: BLUE,
                        }}
                      >
                        {l.lang}
                      </span>
                      <span
                        style={{
                          fontFamily: '"DM Sans", sans-serif',
                          fontSize: 13,
                          color: GREY,
                          marginLeft: 6,
                        }}
                      >
                        ({l.level})
                      </span>
                    </HoverLine>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: `${BLUE}18`,
              marginTop: 40,
              marginBottom: 36,
            }}
          />

          {/* Selected Projects */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SectionHeading>Selected Projects</SectionHeading>
            {DATA.projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
          </motion.div>

          {/* Bottom: scroll-to-top */}
          <div
            style={{
              marginTop: 48,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <button
              onClick={scrollToTop}
              className="no-print"
              style={{
                background: 'none',
                border: `1px solid ${BLUE}30`,
                color: BLUE,
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                letterSpacing: '0.08em',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = `${BLUE}80`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = `${BLUE}30`)
              }
            >
              <ArrowUp size={14} />
              Back to top
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
