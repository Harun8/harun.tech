import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const DATA = {
  name: 'Harun',
  role: 'Software Engineer',
  email: 'harunabdi8@gmail.com',
  website: 'harun.tech',
  linkedin: 'https://www.linkedin.com/in/harun-abdi/',
  location: 'Denmark',
  summary:
    'Software engineer with experience building solutions for clients like Banedanmark and Landsbyggefonden. Background in startups and scale-ups.',
  experience: [
    {
      company: 'Omika',
      location: 'Copenhagen',
      role: 'Software Engineer',
      period: 'Nov 2025–Present',
      bullets: [
        { text: 'Built an AI-powered Microsoft Teams bot that drafts UDRP domain dispute complaints end-to-end using RAG, WHOIS lookups, and legal formatting validation.' },
        { text: 'Built a full-stack matching platform connecting Danish companies with certified marketing agencies using a hybrid RAG pipeline with contextual retrieval, combining vector search, BM25, and LLM scoring. Delivered accurate recommendations in under **15 seconds**.' },
      ],
      tags: ['TypeScript', 'LangGraph', 'LangChain', 'React', 'Node.js', 'PostgreSQL', 'Qdrant', 'Prisma', 'Azure', 'Hetzner'],
    },
    {
      company: 'Coding Pirates',
      location: '',
      role: 'Board Member & Volunteer',
      period: 'Feb 2025–Present',
      desc: 'Contributing to the creation of activities for children and young people, where they develop their technological courage and creativity through play and learning with programming and technology.',
      tags: ['Python'],
    },
    {
      company: 'Landsbyggefonden',
      location: '',
      role: 'Consultant (Software Engineer)',
      period: 'Aug 2025 - Nov 2025',
      desc: 'Developed solutions for Landsbyggefonden at DCAB, supporting the review and reporting of operations and maintenance data.',
      tags: ['MSSQL', 'C#', 'Azure DevOps'],
    },
    {
      company: 'Freelance',
      location: '',
      role: 'Freelance Software Engineer',
      period: 'Feb 2025–Nov 2025',
      bullets: [
        { title: 'Dovento', text: 'Sole developer on the web application, building a web alternative to the mobile app for **3,000+** users.' },
        { title: 'WordWorks', text: 'Led a team of 2 interns and two developers, responsible for full-stack development, creating and integrating RAG systems.' },
      ],
      tags: ['Node.js', 'React', 'Next.js', 'MongoDB', 'PostgreSQL'],
    },
    {
      company: 'Klimator DK',
      location: '',
      role: 'Software Engineer',
      period: 'Jun 2023–Dec 2024',
      bullets: [
        { text: 'Developed a semi-automatic monitoring system that generates and sends PDFs automatically via email, saving the installation team up to **6 hours** of manual work weekly.' },
        { text: 'Developed a device audit log for tracking metadata changes across **4,000+** devices.' },
        { text: 'Participated in integrating sensor data through the Danish Environmental Portal\'s IoT platform, helping Banedanmark improve railway monitoring.' },
      ],
      tags: ['Node.js', 'JavaScript', 'Azure', 'Azure Functions', 'MongoDB', 'MQTT', 'IoT'],
    },
  ],
  education: [
    {
      school: 'Southern University of Denmark',
      degree: 'Software Technology',
    },
  ],
  skills: {
    'Frontend': 'React, React Native, Next.js, TypeScript, JavaScript',
    'Backend': 'Node.js, C#, Python',
    'AI Tools': 'Claude Code, Codex',
    'Infrastructure': 'Azure, Hetzner, Azure Functions, Azure DevOps, Google Cloud Console, MQTT, IoT',
    'Databases': 'SQL, PostgreSQL, MSSQL, NoSQL, MongoDB',
  },
  languages: [
    { lang: 'Danish', level: 'native' },
    { lang: 'English', level: 'fluent' },
  ],
  projects: [
    {
      name: 'CleverCost',
      type: 'work',
      desc: 'Financial document processing API. Brought a failing AI-powered invoice processing system to production readiness.\n\nImproved extraction accuracy from ~80% to 99.9% on invoices with **1,000+** line items. Eliminated batch failures and built a chunked extraction pipeline for documents up to 45 pages.\n\nTook the system from "client rejected delivery" to production use within **3 weeks**',
      details: 'Brought a failing AI-powered invoice processing system to production readiness after client acceptance testing revealed critical data loss and reliability issues. The system extracts structured financial data from scanned invoices using OCR and large language models.\n\n• Resolved systemic data loss on multi-page documents (4+ pages), improving extraction accuracy from ~80% to 99.9% on invoices with 1,000+ line items — verified against manually audited ground truth\n• Eliminated batch processing failures where documents stalled indefinitely in queue, enabling reliable concurrent uploads\n• Built chunked extraction pipeline for large documents (up to 45 pages), with intelligent deduplication that preserves legitimate repeat entries\n• Added OCR caching, native PDF text extraction, and retry mechanisms — reducing processing costs and improving reliability against upstream API failures\n• Took the system from "client rejected delivery" to production use within 3 weeks',
      tech: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'LLM', 'OCR'],
      link: null,
    },
    {
      name: 'AskPDFs.io',
      type: 'personal',
      desc: 'An interactive platform allowing users to upload PDFs and chat with them using LLMs',
      tech: ['Next.js', 'Supabase', 'OpenAI'],
      link: 'https://askpdfs.io',
    },
    {
      name: 'BilligBid',
      type: 'personal',
      desc: 'An iOS app that displays discounted products in nearby Salling Group stores (Netto, Bilka, Føtex). Designed for people who struggle to make ends meet, offering a much cheaper alternative by allowing them to shop discounted grocery items first',
      tech: ['React Native', 'Node.js'],
      link: 'https://apps.apple.com/us/app/billigbid/id6756362285',
    },
    {
      name: 'ExifM',
      type: 'spinoff',
      desc: 'A way to manipulate the exif data on images to change orientation',
      tech: ['Node.js', 'NPM', 'CLI'],
      link: 'https://npmjs.com/package/exifm',
    },
    {
      name: 'Dagensland.dk',
      type: 'personal',
      desc: 'A daily guessing game where you guess the country of the day. Built out of a personal interest in geography and a desire to create something simple, free, and quick to play ranging from a few seconds to a couple of minutes. The game has had over **2,000 visitors**',
      tech: ['JavaScript', 'CSS'],
      link: 'https://dagensland.dk',
    },
    {
      name: 'UDRP AI',
      type: 'work',
      desc: 'AI-powered legal drafting platform for domain name dispute lawyers. Multi-stage LangGraph agent conducts structured interviews, performs WHOIS lookups, retrieves precedent cases via RAG, and generates court-ready DOCX complaints — delivered through a Microsoft Teams bot.\n\nBuilt with AES-256-GCM encryption at rest, full PostgreSQL audit trail, and a React admin dashboard for cost monitoring and document ingestion.',
      tech: ['TypeScript', 'LangGraph', 'MS Teams', 'Qdrant', 'PostgreSQL', 'React'],
      link: 'https://abion.com',
    },
    {
      name: 'Gift-a-Friend',
      type: 'work',
      desc: 'Referral Shopify plugin created for Cana Care, a multimillion DKK shop',
      tech: ['Shopify', 'React', 'Prisma'],
      link: 'https://apps.shopify.com/gift-a-friend',
    },
    {
      name: 'FTP Security with inotify',
      type: 'work',
      desc: 'Developed a solution to enhance FTP security for legacy systems using inotify on Linux for secure, real-time file monitoring. Wrote an article about the approach on Medium',
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

function renderText(text) {
  if (!text) return null
  const paragraphs = text.split('\n\n')
  return paragraphs.map((para, pi) => {
    const parts = para.split(/(\*\*.*?\*\*)/)
    const rendered = parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={i} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</span>
      }
      return part
    })
    return (
      <span key={pi}>
        {pi > 0 && <><br /><br /></>}
        {rendered}
      </span>
    )
  })
}

function ProjectModal({ project, onClose }) {
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
          {renderText(project.details || project.desc)}
        </p>
        <div className="flex flex-wrap gap-2" style={{ marginBottom: '20px' }}>
          {project.tech.map((t, j) => (
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
              {t}
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
            Visit project
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
                  {DATA.role}
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
                  <span>{DATA.location}</span>
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
                  style={{ marginBottom: '-8px' }}
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
                    {DATA.summary}
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
                <SectionHeading>Work Experience</SectionHeading>
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
                          {exp.role}
                        </span>
                        <span
                          style={{
                            color: GREY,
                            fontSize: '13px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      {exp.desc && (
                        <p
                          style={{
                            fontSize: '15px',
                            lineHeight: 1.65,
                            color: BLUE,
                          }}
                        >
                          {exp.desc}
                        </p>
                      )}
                      {exp.bullets && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {exp.bullets.map((b, j) => (
                            <p
                              key={j}
                              style={{
                                fontSize: '15px',
                                lineHeight: 1.65,
                                color: BLUE,
                              }}
                            >
                              {b.title && (
                                <span style={{ fontWeight: 700 }}>{b.title}</span>
                              )}
                              {b.title ? <br /> : null}
                              {renderText(b.text)}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Right Column — Education + Skills */}
              <div className="w-full md:w-1/2 flex flex-col gap-12">
                {/* Skills */}
                <motion.section
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>Skills</SectionHeading>
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
                {DATA.education.length > 0 && (
                  <motion.section
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <SectionHeading>Education</SectionHeading>
                    <div className="flex flex-col gap-4">
                      {DATA.education.map((edu, i) => (
                        <div key={i}>
                          <h4
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontWeight: 700,
                              fontSize: '16px',
                              color: BLUE,
                            }}
                          >
                            {edu.school}
                          </h4>
                          <div
                            className="flex items-baseline justify-between gap-2"
                            style={{ fontSize: '14px' }}
                          >
                            <span style={{ color: BLUE, fontWeight: 500 }}>
                              {edu.degree}
                            </span>
                            {edu.period && (
                              <span
                                style={{
                                  color: GREY,
                                  fontSize: '13px',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {edu.period}
                              </span>
                            )}
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
              <SectionHeading>Languages</SectionHeading>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {DATA.languages.map((l, i) => (
                  <span key={i} style={{ fontSize: '15px', color: BLUE }}>
                    <span style={{ fontWeight: 700 }}>{l.lang}</span>
                    <span style={{ color: GREY, marginLeft: '6px', fontSize: '14px' }}>
                      {l.level}
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
              <SectionHeading>Selected Projects</SectionHeading>
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
                        {renderText(proj.desc)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: '12px',
                              color: GREY,
                              letterSpacing: '0.03em',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedProject(proj)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: BLUE,
                          opacity: 0.6,
                          padding: 0,
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.textDecoration = 'underline'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.6'
                          e.currentTarget.style.textDecoration = 'none'
                        }}
                      >
                        More info
                      </button>
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
                aria-label="Scroll to top"
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
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
