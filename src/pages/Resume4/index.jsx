import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Sections Config ─────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'languages', label: 'Languages' },
]

// ─── Colors ──────────────────────────────────────────────────────────────────

const BLUE = '#3B6B9E'
const CREAM = '#F5F0E8'
const CREAM_DARK = '#EDE8DD'
const GREY = '#9BA8B5'

// ─── SVG Illustration ────────────────────────────────────────────────────────

const DeskIllustration = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 160"
    className={className}
    style={{ color: BLUE, opacity: 0.2 }}
    fill="currentColor"
  >
    {/* Person — head */}
    <circle cx="52" cy="42" r="14" />
    {/* Person — torso */}
    <path d="M38 58 Q40 78 48 84 L56 84 Q64 78 62 58 Q57 54 52 54 Q47 54 42 56 Z" />
    {/* Person — arm reaching to keyboard */}
    <path d="M62 64 Q70 70 78 78 L82 76 Q74 66 64 60 Z" />
    {/* Monitor */}
    <rect x="72" y="18" width="62" height="46" rx="4" />
    {/* Screen (cutout lighter) */}
    <rect
      x="76"
      y="22"
      width="54"
      height="38"
      rx="2"
      style={{ fill: CREAM_DARK, opacity: 1 }}
    />
    {/* Code lines on screen */}
    <rect x="82" y="30" width="24" height="3" rx="1" />
    <rect x="82" y="36" width="36" height="3" rx="1" />
    <rect x="82" y="42" width="18" height="3" rx="1" />
    <rect x="82" y="48" width="30" height="3" rx="1" />
    {/* Monitor stand */}
    <rect x="95" y="64" width="16" height="8" rx="1" />
    <rect x="85" y="72" width="36" height="4" rx="2" />
    {/* Desk surface */}
    <rect x="20" y="88" width="170" height="6" rx="3" />
    {/* Desk legs */}
    <rect x="30" y="94" width="5" height="42" rx="1" />
    <rect x="175" y="94" width="5" height="42" rx="1" />
    {/* Keyboard */}
    <rect x="84" y="80" width="40" height="6" rx="2" />
    {/* Coffee mug */}
    <rect x="140" y="76" width="14" height="12" rx="3" />
    <path d="M154 80 Q160 82 154 86" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
)

// ─── Section Heading ─────────────────────────────────────────────────────────

const SectionHeading = ({ children }) => (
  <h2
    style={{
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: BLUE,
      marginBottom: 28,
      paddingBottom: 12,
      borderBottom: `1px solid ${BLUE}15`,
    }}
  >
    {children}
  </h2>
)

// ─── Animated Section Wrapper ────────────────────────────────────────────────

const FadeInSection = ({ children, id }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    style={{ marginBottom: 64 }}
  >
    {children}
  </motion.section>
)

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Resume4() {
  const [activeSection, setActiveSection] = useState('summary')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const rightPanelRef = useRef(null)

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers = []
    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        })
      }, options)

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Scroll to section
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileNavOpen(false)
    }
  }, [])

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          .left-panel { display: none !important; }
          .right-panel {
            margin-left: 0 !important;
            padding: 20px !important;
          }
          .mobile-header { display: none !important; }
          section { break-inside: avoid; }
        }
      `}</style>

      <div
        style={{
          minHeight: '100vh',
          background: CREAM,
          fontFamily: '"DM Sans", sans-serif',
          color: BLUE,
        }}
      >
        {/* ─── Mobile Sticky Header ─────────────────────────────────── */}
        <div
          className="mobile-header md:hidden"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: CREAM_DARK,
            borderBottom: `1px solid ${BLUE}15`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: 22,
                  color: BLUE,
                  lineHeight: 1.1,
                }}
              >
                {DATA.name}
              </div>
              <div
                style={{
                  fontFamily: '"Kalam", cursive',
                  fontSize: 14,
                  color: BLUE,
                  opacity: 0.7,
                }}
              >
                {DATA.role}
              </div>
            </div>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: BLUE,
                cursor: 'pointer',
                padding: 8,
                fontSize: 20,
                lineHeight: 1,
              }}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile nav dropdown */}
          <AnimatePresence>
            {mobileNavOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden', borderTop: `1px solid ${BLUE}10` }}
              >
                <div style={{ padding: '8px 20px 16px' }}>
                  {SECTIONS.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      style={{
                        display: 'block',
                        background: 'none',
                        border: 'none',
                        color: BLUE,
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: activeSection === id ? 700 : 500,
                        fontSize: 13,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        padding: '6px 0',
                        cursor: 'pointer',
                        opacity: activeSection === id ? 1 : 0.6,
                        width: '100%',
                        textAlign: 'left',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Left Panel (Desktop) ─────────────────────────────────── */}
        <motion.div
          className="left-panel hidden md:flex"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: '35%',
            maxWidth: 350,
            background: CREAM_DARK,
            borderRight: `1px solid ${BLUE}18`,
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 40px',
            zIndex: 40,
            overflowY: 'auto',
          }}
        >
          {/* Illustration */}
          <div style={{ width: 180, marginBottom: 32 }}>
            <DeskIllustration />
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 700,
              fontSize: 48,
              color: BLUE,
              lineHeight: 1,
              margin: 0,
              marginBottom: 6,
            }}
          >
            {DATA.name}
          </h1>

          {/* Role (handwritten) */}
          <p
            style={{
              fontFamily: '"Kalam", cursive',
              fontSize: 20,
              color: BLUE,
              margin: 0,
              marginBottom: 20,
              lineHeight: 1.3,
            }}
          >
            {DATA.role}
          </p>

          {/* Contact info */}
          <div
            style={{
              fontSize: 13,
              color: GREY,
              lineHeight: 1.8,
              marginBottom: 0,
            }}
          >
            <div>{DATA.location}</div>
            <div>{DATA.email}</div>
            <div>{DATA.website}</div>
          </div>

          {/* Separator */}
          <div
            style={{
              width: 1,
              height: 40,
              background: `${BLUE}18`,
              margin: '24px 0',
            }}
          />

          {/* Section Navigation */}
          <nav style={{ flex: 1 }}>
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '7px 0',
                  width: '100%',
                  textAlign: 'left',
                  position: 'relative',
                }}
              >
                {/* Active indicator dot */}
                <motion.div
                  animate={{
                    scale: activeSection === id ? 1 : 0,
                    opacity: activeSection === id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: BLUE,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: activeSection === id ? 700 : 500,
                    fontSize: 13,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: BLUE,
                    opacity: activeSection === id ? 1 : 0.5,
                    transition: 'opacity 0.2s, font-weight 0.2s',
                  }}
                >
                  {label}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom arrow */}
          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: `1px solid ${BLUE}25`,
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: BLUE,
              cursor: 'pointer',
              opacity: 0.5,
              marginTop: 16,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </motion.div>

        {/* ─── Right Panel (Content) ────────────────────────────────── */}
        <motion.div
          className="right-panel"
          ref={rightPanelRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ background: CREAM }}
        >
          <div
            className="md:ml-[min(35%,350px)]"
          >
            <div
              className="max-w-[680px] px-6 py-8 md:px-14 md:pt-[72px] md:pb-[100px] mx-auto md:mx-0"
            >
              <ContentSections />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

// ─── Content Sections ────────────────────────────────────────────────────────

function ContentSections() {
  return (
    <>
      {/* Summary */}
      <FadeInSection id="summary">
        <SectionHeading>Professional Summary</SectionHeading>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.8,
            color: BLUE,
            margin: 0,
          }}
        >
          {DATA.summary}
        </p>
      </FadeInSection>

      {/* Experience */}
      <FadeInSection id="experience">
        <SectionHeading>Work Experience</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {DATA.experience.map((exp, i) => (
            <div key={i}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: 4,
                  marginBottom: 4,
                }}
              >
                <h3
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    color: BLUE,
                    margin: 0,
                  }}
                >
                  {exp.role}
                </h3>
                <span
                  style={{
                    fontSize: 13,
                    color: GREY,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {exp.period}
                </span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: GREY,
                  marginBottom: 8,
                }}
              >
                {exp.company}
                {exp.location ? `, ${exp.location}` : ''}
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: BLUE,
                  margin: 0,
                }}
              >
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Projects */}
      <FadeInSection id="projects">
        <SectionHeading>Selected Projects</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {DATA.projects.map((proj, i) => (
            <div key={i}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <h3
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    color: BLUE,
                    margin: 0,
                  }}
                >
                  {proj.name}
                </h3>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 13,
                      color: BLUE,
                      opacity: 0.5,
                      textDecoration: 'none',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = '1')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = '0.5')
                    }
                  >
                    ↗
                  </a>
                )}
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: BLUE,
                  margin: 0,
                  marginBottom: 6,
                  lineHeight: 1.5,
                }}
              >
                {proj.desc}
              </p>
              <div style={{ fontSize: 13, color: GREY }}>
                {proj.tech.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </FadeInSection>

      {/* Skills */}
      <FadeInSection id="skills">
        <SectionHeading>Skills</SectionHeading>
        <ul
          style={{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {DATA.skills.map((skill, i) => (
            <li
              key={i}
              style={{
                fontSize: 15,
                color: BLUE,
                lineHeight: 1.5,
                paddingLeft: 16,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.55em',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: `${BLUE}35`,
                }}
              />
              {skill}
            </li>
          ))}
        </ul>
      </FadeInSection>

      {/* Education */}
      <FadeInSection id="education">
        <SectionHeading>Education</SectionHeading>
        {DATA.education.map((edu, i) => (
          <div key={i}>
            <h3
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: BLUE,
                margin: 0,
                marginBottom: 4,
              }}
            >
              {edu.degree}
            </h3>
            <div style={{ fontSize: 14, color: BLUE, marginBottom: 4 }}>
              {edu.school}
            </div>
            <div style={{ fontSize: 13, color: GREY }}>{edu.year}</div>
          </div>
        ))}
      </FadeInSection>

      {/* Languages */}
      <FadeInSection id="languages">
        <SectionHeading>Languages</SectionHeading>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          {DATA.languages.map((l, i) => (
            <div key={i}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: BLUE,
                }}
              >
                {l.lang}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: GREY,
                  marginLeft: 6,
                  textTransform: 'capitalize',
                }}
              >
                {l.level}
              </span>
            </div>
          ))}
        </div>
      </FadeInSection>
    </>
  )
}
