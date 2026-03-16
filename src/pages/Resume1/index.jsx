import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { translations } from './i18n'

const DATA = {
  name: 'Harun',
  email: 'harunabdi8@gmail.com',
  website: 'harun.tech',
  linkedin: 'https://www.linkedin.com/in/harun-abdi/',
  experience: [
    {
      company: 'Omika',
      location: 'Copenhagen',
      bulletTitles: [null, null],
      tags: ['TypeScript', 'Python', 'LangGraph', 'LangChain', 'LangSmith', 'RAG', 'OCR', 'Prompt Engineering', 'LLM Orchestration', 'React', 'Node.js', 'Bun', 'PostgreSQL', 'Supabase', 'Turso', 'Redis', 'Qdrant', 'Prisma', 'Azure', 'Hetzner', 'Nginx'],
    },
    {
      company: 'Coding Pirates',
      location: '',
      tags: ['Python'],
    },
    {
      company: 'Landsbyggefonden',
      location: '',
      tags: ['MSSQL', 'C#', 'Azure DevOps'],
    },
    {
      company: 'Freelance',
      location: '',
      bulletTitles: ['Dovento', 'WordWorks'],
      tags: ['Node.js', 'React', 'Next.js', 'MongoDB', 'PostgreSQL', 'Supabase', 'RAG', 'OCR', 'LangChain', 'LangGraph', 'LangSmith', 'Prompt Engineering', 'LLM Orchestration'],
    },
    {
      company: 'Klimator DK',
      location: '',
      bulletTitles: [null, null, null],
      tags: ['Node.js', 'JavaScript', 'Azure', 'Azure Functions', 'MongoDB', 'Redis', 'MQTT', 'IoT', 'OCR'],
    },
  ],
  skills: {
    'Frontend': 'React, React Native, Next.js, TypeScript, JavaScript, Tailwind CSS',
    'Backend': 'Node.js, Bun, Python, C#, REST APIs',
    'AI/ML': 'RAG, OCR, LangChain, LangGraph, LangSmith, Prompt Engineering, LLM Orchestration',
    'Infrastructure': 'Azure, Hetzner, Nginx, Azure Functions, Google Cloud',
    'Databases': 'PostgreSQL, Supabase, Turso, Redis, MongoDB, MSSQL',
  },
  languages: [
    { lang: 'Danish' },
    { lang: 'English' },
  ],
  projects: [
    {
      name: 'CleverCost',
      type: 'work',
      tech: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'LLM', 'OCR'],
      link: null,
    },
    {
      name: 'AskPDFs.io',
      type: 'personal',
      hasDetails: true,
      tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'RAG', 'LLM'],
      link: 'https://askpdfs.io',
    },
    {
      name: 'BilligBid',
      type: 'personal',
      tech: ['React Native', 'Node.js'],
      link: 'https://apps.apple.com/us/app/billigbid/id6756362285',
    },
    {
      name: 'ExifM',
      type: 'spinoff',
      tech: ['Node.js', 'NPM', 'CLI'],
      link: 'https://npmjs.com/package/exifm',
    },
    {
      name: 'Dagensland.dk',
      type: 'personal',
      tech: ['JavaScript', 'CSS'],
      link: 'https://dagensland.dk',
    },
    {
      name: 'UDRP AI',
      type: 'work',
      tech: ['TypeScript', 'LangGraph', 'MS Teams', 'Qdrant', 'PostgreSQL', 'React'],
      link: 'https://abion.com',
    },
    {
      name: 'Gift-a-Friend',
      type: 'work',
      tech: ['Shopify', 'React', 'Prisma'],
      link: 'https://apps.shopify.com/gift-a-friend',
    },
    {
      name: 'FTP Security with inotify',
      type: 'work',
      tech: ['Linux', 'inotify', 'FTP', 'Security'],
      link: 'https://medium.com/@harunabdi8/mitigating-ftp-security-vulnerabilities-with-inotify-on-linux-5bb186a3c358',
    },
  ],
}

const BLUE = '#3B6B9E'
const GREY = '#9BA8B5'
const CREAM = '#F5F0E8'

const TYPE_STYLES = {
  work: { bg: 'rgba(59, 107, 158, 0.1)', color: BLUE },
  spinoff: { bg: 'rgba(142, 118, 95, 0.12)', color: '#7A6A52' },
  personal: { bg: 'rgba(107, 142, 95, 0.12)', color: '#5A7A4A' },
}

const SKILL_LISTS = Object.fromEntries(
  Object.entries(DATA.skills).map(([k, v]) => [k, v.split(', ')])
)

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function renderInline(text) {
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <span key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</span>
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>{linkMatch[1]}</a>
    }
    return part
  })
}

function renderText(text) {
  if (!text) return null
  const paragraphs = text.split('\n\n')
  return paragraphs.map((para, pi) => {
    const lines = para.split('\n')
    const bullets = lines.filter((l) => l.startsWith('• '))
    if (bullets.length > 0) {
      const intro = lines.filter((l) => !l.startsWith('• '))
      return (
        <span key={pi}>
          {pi > 0 && <><br /><br /></>}
          {intro.length > 0 && <>{renderInline(intro.join(' '))}<br /><br /></>}
          <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bullets.map((b, bi) => (
              <li key={bi} style={{ paddingLeft: '4px' }}>{renderInline(b.slice(2))}</li>
            ))}
          </ul>
        </span>
      )
    }
    return (
      <span key={pi}>
        {pi > 0 && <><br /><br /></>}
        {renderInline(para)}
      </span>
    )
  })
}

function ProjectModal({ project, onClose, t, projIndex }) {
  const details = t(`projDetails${projIndex}`)
  const desc = t(`projDesc${projIndex}`)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(59, 107, 158, 0.12)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: CREAM,
          border: '1px solid rgba(59, 107, 158, 0.15)',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '40px',
        }}
      >
        <div className="flex items-baseline justify-between mb-2">
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: '22px',
              color: BLUE,
            }}
          >
            {project.name}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: GREY,
              fontSize: '20px',
              padding: '4px 8px',
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: BLUE,
            marginBottom: '20px',
          }}
        >
          {renderText(details || desc)}
        </p>
        <div className="flex flex-wrap gap-2" style={{ marginBottom: '20px' }}>
          {project.tech.map((techItem, j) => (
            <span
              key={j}
              style={{
                fontSize: '12px',
                color: BLUE,
                backgroundColor: 'rgba(59, 107, 158, 0.08)',
                padding: '3px 10px',
                borderRadius: '12px',
                letterSpacing: '0.03em',
              }}
            >
              {techItem}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '14px', color: BLUE, textDecoration: 'underline' }}
          >
            {t('visitProject')}
          </a>
        )}
      </motion.div>
    </motion.div>
  )
}

function SectionHeading({ children }) {
  return (
    <h3
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: '13px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: BLUE,
        marginBottom: '20px',
      }}
    >
      {children}
    </h3>
  )
}

export default function Resume1() {
  const [hoveredExp, setHoveredExp] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const t = (key) => translations[lang][key] || key

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        @media print {
          * { animation: none !important; transition: none !important; }
          body { background: white !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div
        style={{
          backgroundColor: CREAM,
          minHeight: '100vh',
          fontFamily: "'DM Sans', sans-serif",
          color: BLUE,
        }}
      >
        {/* ───────── Page Container ───────── */}
        <div
          className="mx-auto px-6 py-10 md:px-0 md:py-0"
          style={{
            maxWidth: '800px',
            paddingTop: '60px',
            paddingBottom: '60px',
          }}
        >
            {/* ═══════════ TOP SECTION ═══════════ */}
            <motion.header
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ overflow: 'visible' }}
            >
              {/* Row 1: Role title (left) + Contact info (right) */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-6">
                <p
                  style={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: '24px',
                    color: BLUE,
                    lineHeight: 1.2,
                  }}
                >
                  {t('role')}
                </p>
                <div
                  className="flex flex-col md:items-end gap-0.5"
                  style={{ fontSize: '14px', color: GREY }}
                >
                  <span>{DATA.email}</span>
                  <span>{DATA.website}</span>
                  <a
                    href={DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: GREY, textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                  >
                    LinkedIn
                  </a>
                  <span>{t('location')}</span>
                  <div className="no-print flex gap-1" style={{ marginTop: '4px', fontSize: '13px' }}>
                    <button
                      onClick={() => setLang('en')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        color: lang === 'en' ? BLUE : GREY,
                        fontWeight: lang === 'en' ? 700 : 400,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '13px',
                      }}
                    >
                      EN
                    </button>
                    <span style={{ color: GREY }}>/</span>
                    <button
                      onClick={() => setLang('da')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px 4px',
                        color: lang === 'da' ? BLUE : GREY,
                        fontWeight: lang === 'da' ? 700 : 400,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '13px',
                      }}
                    >
                      DA
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Monogram (left) + Name & Summary (right) */}
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-0 mb-16">
                {/* Decorative Monogram */}
                <div
                  className="hidden md:flex items-start justify-center"
                  style={{
                    width: '40%',
                    minHeight: '200px',
                    paddingTop: '10px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: '220px',
                      fontWeight: 700,
                      color: BLUE,
                      opacity: 0.15,
                      lineHeight: 0.85,
                      userSelect: 'none',
                    }}
                  >
                    H
                  </span>
                </div>

                {/* Mobile monogram — smaller */}
                <div
                  className="flex md:hidden items-center justify-start"
                  style={{ marginBottom: '-8px', overflow: 'visible' }}
                >
                  <span
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: '120px',
                      fontWeight: 700,
                      color: BLUE,
                      opacity: 0.12,
                      lineHeight: 0.85,
                      userSelect: 'none',
                      display: 'inline-block',
                      padding: '10px 15px 0 0',
                    }}
                  >
                    H
                  </span>
                </div>

                {/* Name + Summary */}
                <div
                  className="w-full md:w-[60%]"
                  style={{ paddingTop: '4px' }}
                >
                  <h1
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: '56px',
                      color: BLUE,
                      lineHeight: 1.05,
                      marginBottom: '20px',
                    }}
                    className="text-[42px] md:text-[56px]"
                  >
                    {DATA.name}
                  </h1>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15.5px',
                      lineHeight: 1.7,
                      color: BLUE,
                    }}
                  >
                    {t('summary')}
                  </p>
                </div>
              </div>
            </motion.header>

            {/* ═══════════ MIDDLE SECTION — Two Columns ═══════════ */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-10 mb-16">
              {/* Left Column — Work Experience */}
              <motion.section
                className="w-full md:w-1/2"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionHeading>{t('workExperience')}</SectionHeading>
                <div className="flex flex-col gap-8">
                  {DATA.experience.map((exp, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoveredExp(i)}
                      onMouseLeave={() => setHoveredExp(null)}
                      style={{
                        cursor: 'default',
                        borderRadius: '6px',
                        padding: '8px',
                        margin: '-8px',
                        transition: 'background-color 0.2s ease',
                        backgroundColor: hoveredExp === i ? 'rgba(59, 107, 158, 0.04)' : 'transparent',
                      }}
                    >
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h4
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 700,
                            fontSize: '16px',
                            color: BLUE,
                          }}
                        >
                          {exp.company}
                          {exp.location && (
                            <span style={{ fontWeight: 400 }}>
                              {' '}
                              {exp.location}
                            </span>
                          )}
                        </h4>
                      </div>
                      <div
                        className="flex items-baseline justify-between gap-2 mb-2"
                        style={{ fontSize: '14px' }}
                      >
                        <span style={{ color: BLUE, fontWeight: 500 }}>
                          {t(`expRole${i}`)}
                        </span>
                        <span
                          style={{
                            color: GREY,
                            fontSize: '13px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t(`expPeriod${i}`)}
                        </span>
                      </div>
                      {t(`expDesc${i}`) !== `expDesc${i}` && (
                        <p
                          style={{
                            fontSize: '15px',
                            lineHeight: 1.65,
                            color: BLUE,
                          }}
                        >
                          {t(`expDesc${i}`)}
                        </p>
                      )}
                      {exp.bulletTitles && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {exp.bulletTitles.map((title, j) => (
                            <p
                              key={j}
                              style={{
                                fontSize: '15px',
                                lineHeight: 1.65,
                                color: BLUE,
                              }}
                            >
                              {title && (
                                <span style={{ fontWeight: 700 }}>{title}</span>
                              )}
                              {title ? <br /> : null}
                              {renderText(t(`expBullet${i}_${j}`))}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Right Column — Education + Skills */}
              <div className="w-full md:w-1/2 flex flex-col gap-12 md:sticky md:top-[60px] md:self-start">
                {/* Skills */}
                <motion.section
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>{t('skills')}</SectionHeading>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {(() => {
                      const hasHover = hoveredExp !== null
                      const activeTags = hasHover ? (DATA.experience[hoveredExp].tags || []) : []
                      return Object.entries(SKILL_LISTS).map(([category, skillList]) => {
                      const categoryHasMatch = hasHover && skillList.some((s) => activeTags.includes(s))

                      return (
                        <div
                          key={category}
                          style={{
                            opacity: hasHover && !categoryHasMatch ? 0.25 : 1,
                            transition: 'opacity 0.3s ease',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '13px',
                              fontWeight: 700,
                              color: BLUE,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {category}
                          </span>
                          <p
                            style={{
                              fontSize: '15px',
                              lineHeight: 1.5,
                              color: BLUE,
                              marginTop: '2px',
                            }}
                          >
                            {skillList.map((skill, idx) => {
                              const isMatch = hasHover && activeTags.includes(skill)
                              const isDimmed = hasHover && !isMatch
                              return (
                                <span
                                  key={idx}
                                  style={{
                                    opacity: isDimmed ? 0.25 : 1,
                                    fontWeight: isMatch ? 600 : 400,
                                    transition: 'opacity 0.3s ease, font-weight 0.3s ease',
                                  }}
                                >
                                  {idx > 0 ? ', ' : ''}
                                  {skill}
                                </span>
                              )
                            })}
                          </p>
                        </div>
                      )
                    })
                    })()}
                  </div>
                </motion.section>

                {/* Education */}
                {(
                  <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <SectionHeading>{t('education')}</SectionHeading>
                    <div className="flex flex-col gap-4">
                      {[0].map((i) => (
                        <div key={i}>
                          <h4
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 700,
                              fontSize: '16px',
                              color: BLUE,
                            }}
                          >
                            {t(`eduSchool${i}`)}
                          </h4>
                          <div
                            className="flex items-baseline justify-between gap-2"
                            style={{ fontSize: '14px' }}
                          >
                            <span style={{ color: BLUE, fontWeight: 500 }}>
                              {t(`eduDegree${i}`)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </div>
            </div>

            {/* ═══════════ LANGUAGES ═══════════ */}
            <motion.section
              className="mb-16"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading>{t('languages')}</SectionHeading>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {DATA.languages.map((l, i) => (
                  <span key={i} style={{ fontSize: '15px', color: BLUE }}>
                    <span style={{ fontWeight: 700 }}>{l.lang}</span>
                    <span style={{ color: GREY, marginLeft: '6px', fontSize: '14px' }}>
                      {i === 0 ? t('native') : t('fluent')}
                    </span>
                  </span>
                ))}
              </div>
            </motion.section>

            {/* ═══════════ SELECTED PROJECTS ═══════════ */}
            <motion.section
              className="mb-20"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionHeading>{t('selectedProjects')}</SectionHeading>
              <div className="flex flex-col gap-6">
                {DATA.projects.map((proj, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h4
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: '15.5px',
                          color: BLUE,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {proj.link ? (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: BLUE, textDecoration: 'none' }}
                          >
                            {proj.name}
                          </a>
                        ) : proj.name}
                        {proj.type && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              backgroundColor: TYPE_STYLES[proj.type]?.bg,
                              color: TYPE_STYLES[proj.type]?.color,
                            }}
                          >
                            {proj.type}
                          </span>
                        )}
                      </h4>
                      <span
                        style={{
                          fontSize: '14px',
                          color: BLUE,
                        }}
                      >
                        {renderText(t(`projDesc${i}`))}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((techItem, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: '12px',
                              color: GREY,
                              letterSpacing: '0.03em',
                            }}
                          >
                            {techItem}
                          </span>
                        ))}
                      </div>
                      {proj.hasDetails && (
                        <button
                          onClick={() => setSelectedProject({ proj, index: i })}
                          className="pulse-glow"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: BLUE,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            whiteSpace: 'nowrap',
                            backgroundColor: 'rgba(59, 107, 158, 0.08)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(59, 107, 158, 0.15)'
                            e.currentTarget.classList.remove('pulse-glow')
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(59, 107, 158, 0.08)'
                          }}
                        >
                          {t('moreInfo')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* ═══════════ FOOTER — Scroll to top ═══════════ */}
            <motion.div
              className="no-print"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <button
                onClick={scrollToTop}
                aria-label={t('scrollToTop')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: BLUE,
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowUp size={20} strokeWidth={2} />
              </button>
            </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject.proj}
            projIndex={selectedProject.index}
            t={t}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
