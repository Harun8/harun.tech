import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowUp,
  ChevronDown,
  Monitor,
  Code2,
  Coffee,
  Rocket,
} from 'lucide-react'

/* ─── Data ──────────────────────────────────────────────────── */

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

/* ─── Colors / Tokens ───────────────────────────────────────── */

const BG = '#F5F0E8'
const INK = '#3B6B9E'
const MUTED = '#9BA8B5'

/* ─── Google Fonts ──────────────────────────────────────────── */

function FontLoader() {
  useEffect(() => {
    const id = 'resume2-fonts'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=DM+Sans:wght@400;500;700&display=swap'
    document.head.appendChild(link)
  }, [])
  return null
}

/* ─── Print Styles ──────────────────────────────────────────── */

function PrintStyles() {
  useEffect(() => {
    const id = 'resume2-print'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @media print {
        body { background: white !important; }
        .resume2-root { background: white !important; }
        .resume2-section { min-height: auto !important; padding: 24px 0 !important; }
        .resume2-sticky-role,
        .resume2-scroll-top,
        .resume2-scroll-indicator { display: none !important; }
        .resume2-root * {
          color: #222 !important;
          opacity: 1 !important;
          transform: none !important;
        }
      }
    `
    document.head.appendChild(style)
  }, [])
  return null
}

/* ─── Bounce animation style ────────────────────────────────── */

function BounceStyle() {
  useEffect(() => {
    const id = 'resume2-bounce'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes gentle-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(6px); }
      }
    `
    document.head.appendChild(style)
  }, [])
  return null
}

/* ─── Shared animation variants ─────────────────────────────── */

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/* ─── Icon Composition ──────────────────────────────────────── */

function IconComposition() {
  return (
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-8 sm:mb-10">
      <Monitor
        size={80}
        strokeWidth={1}
        style={{ color: INK, opacity: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <Code2
        size={28}
        strokeWidth={1.5}
        style={{ color: INK, opacity: 0.25, transform: 'rotate(-15deg)' }}
        className="absolute top-2 left-4"
      />
      <Coffee
        size={24}
        strokeWidth={1.5}
        style={{ color: INK, opacity: 0.25, transform: 'rotate(10deg)' }}
        className="absolute bottom-4 left-2"
      />
      <Rocket
        size={26}
        strokeWidth={1.5}
        style={{ color: INK, opacity: 0.25, transform: 'rotate(12deg)' }}
        className="absolute top-3 right-4"
      />
    </div>
  )
}

/* ─── Section wrapper ───────────────────────────────────────── */

function Section({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      className={`resume2-section min-h-screen flex items-center justify-center px-6 sm:px-8 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="w-full max-w-3xl">{children}</div>
    </motion.section>
  )
}

/* ─── Section heading with parallax ─────────────────────────── */

function SectionHeading({ children, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -20])

  return (
    <motion.h2
      variants={itemVariants}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: INK,
        y,
      }}
      className="mb-10 sm:mb-12"
    >
      {children}
    </motion.h2>
  )
}

/* ─── Sticky Role Title ─────────────────────────────────────── */

function StickyRole({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.15], [1, 0.6, 0.6])

  return (
    <motion.div
      className="resume2-sticky-role fixed top-6 left-6 sm:top-8 sm:left-10 z-50 hidden sm:block"
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 24,
        color: INK,
        opacity,
      }}
    >
      {DATA.role}
    </motion.div>
  )
}

/* ─── Scroll Indicator ──────────────────────────────────────── */

function ScrollIndicator() {
  return (
    <div
      className="resume2-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      style={{ color: INK, opacity: 0.5 }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        scroll
      </span>
      <ChevronDown
        size={20}
        style={{ animation: 'gentle-bounce 2s ease-in-out infinite' }}
      />
    </div>
  )
}

/* ─── Back to Top Button ────────────────────────────────────── */

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="resume2-scroll-top fixed bottom-6 left-6 sm:bottom-8 sm:left-10 z-50 p-2 cursor-pointer"
      style={{ color: INK, background: 'none', border: 'none' }}
      aria-label="Scroll to top"
    >
      <ArrowUp size={22} />
    </button>
  )
}

/* ─── Hero Section ──────────────────────────────────────────── */

function HeroSection() {
  return (
    <section
      id="hero"
      className="resume2-section relative min-h-screen flex items-center justify-center px-6 sm:px-8"
    >
      <motion.div
        className="w-full max-w-3xl text-center"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <IconComposition />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(48px, 8vw, 80px)',
            color: INK,
            lineHeight: 1.05,
          }}
          className="mb-4"
        >
          {DATA.name}
        </motion.h1>

        {/* Role — visible on mobile (hidden on sm+ where sticky takes over) */}
        <motion.p
          variants={itemVariants}
          className="sm:hidden mb-4"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 22,
            color: INK,
          }}
        >
          {DATA.role}
        </motion.p>

        {/* Role — visible on sm+ in hero (sticky also shows, but this anchors it) */}
        <motion.p
          variants={itemVariants}
          className="hidden sm:block mb-6"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 24,
            color: INK,
            opacity: 0, // hidden in flow since sticky handles it
            height: 32,
          }}
          aria-hidden="true"
        >
          {DATA.role}
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: MUTED,
          }}
          className="mb-6"
        >
          {DATA.location} &middot;{' '}
          <a href={`mailto:${DATA.email}`} style={{ color: MUTED }}>
            {DATA.email}
          </a>{' '}
          &middot; {DATA.website}
        </motion.p>

        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: INK,
            lineHeight: 1.7,
          }}
          className="max-w-xl mx-auto"
        >
          {DATA.summary}
        </motion.p>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}

/* ─── Experience Section ────────────────────────────────────── */

function ExperienceSection({ scrollYProgress }) {
  return (
    <Section id="experience">
      <SectionHeading scrollYProgress={scrollYProgress}>
        Work Experience
      </SectionHeading>
      {DATA.experience.map((exp, i) => (
        <motion.div key={i} variants={itemVariants} className="mb-10 last:mb-0">
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: INK,
            }}
          >
            {exp.company}
            {exp.location && (
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  color: MUTED,
                  marginLeft: 8,
                }}
              >
                {exp.location}
              </span>
            )}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: MUTED,
              marginTop: 2,
              marginBottom: 8,
            }}
          >
            {exp.role} &middot; {exp.period}
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: INK,
              lineHeight: 1.7,
            }}
          >
            {exp.desc}
          </p>
        </motion.div>
      ))}
    </Section>
  )
}

/* ─── Projects Section ──────────────────────────────────────── */

function ProjectsSection({ scrollYProgress }) {
  return (
    <Section id="projects">
      <SectionHeading scrollYProgress={scrollYProgress}>
        Selected Projects
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
        {DATA.projects.map((proj, i) => (
          <motion.div key={i} variants={itemVariants}>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: INK,
              }}
              className="mb-1"
            >
              {proj.name}
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: INK,
                lineHeight: 1.6,
              }}
              className="mb-2"
            >
              {proj.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: MUTED,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            {proj.link && (
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: INK,
                }}
              >
                &rarr; {proj.link.replace(/^https?:\/\//, '')}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ─── Skills / Education / Languages Section ────────────────── */

function BottomSection({ scrollYProgress }) {
  return (
    <Section id="skills" className="pb-24">
      <SectionHeading scrollYProgress={scrollYProgress}>
        Skills &amp; Background
      </SectionHeading>

      {/* Skills */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: INK,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          className="mb-4"
        >
          Technical Skills
        </h3>
        <ul className="space-y-2">
          {DATA.skills.map((skill, i) => (
            <li
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: INK,
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: MUTED, marginRight: 10 }}>&bull;</span>
              {skill}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Education */}
      <motion.div variants={itemVariants} className="mb-12">
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: INK,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          className="mb-4"
        >
          Education
        </h3>
        {DATA.education.map((edu, i) => (
          <div key={i}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                color: INK,
              }}
            >
              {edu.school}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: MUTED,
                marginTop: 2,
              }}
            >
              {edu.degree} &middot; {edu.year}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Languages */}
      <motion.div variants={itemVariants}>
        <h3
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: INK,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
          className="mb-4"
        >
          Languages
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: INK,
            lineHeight: 1.8,
          }}
        >
          {DATA.languages.map((l, i) => (
            <span key={l.lang}>
              <span style={{ fontWeight: 500 }}>{l.lang}</span>
              <span style={{ color: MUTED, fontSize: 14 }}> ({l.level})</span>
              {i < DATA.languages.length - 1 && (
                <span style={{ color: MUTED, margin: '0 12px' }}>&middot;</span>
              )}
            </span>
          ))}
        </p>
      </motion.div>
    </Section>
  )
}

/* ─── Main Component ────────────────────────────────────────── */

export default function Resume2() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  /* Use window scroll instead for full-page sections */
  const { scrollYProgress: windowProgress } = useScroll()

  return (
    <>
      <FontLoader />
      <PrintStyles />
      <BounceStyle />

      <div
        className="resume2-root"
        style={{ background: BG, minHeight: '100vh' }}
      >
        <StickyRole scrollYProgress={windowProgress} />
        <ScrollToTop />

        <HeroSection />
        <ExperienceSection scrollYProgress={windowProgress} />
        <ProjectsSection scrollYProgress={windowProgress} />
        <BottomSection scrollYProgress={windowProgress} />
      </div>
    </>
  )
}
