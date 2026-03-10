import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
const GREY = '#9BA8B5'
const CREAM = '#F5F0E8'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
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
  const topRef = useRef(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

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
        ref={topRef}
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
          <div className="md:px-0" style={{ padding: '0' }}>
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
                    <div key={i}>
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
                              — {exp.location}
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
                      <p
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.65,
                          color: BLUE,
                        }}
                      >
                        {exp.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Right Column — Education + Skills */}
              <div className="w-full md:w-1/2 flex flex-col gap-12">
                {/* Education */}
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
                            marginBottom: '4px',
                          }}
                        >
                          {edu.school}
                        </h4>
                        <div
                          className="flex items-baseline justify-between gap-2"
                          style={{ fontSize: '14px' }}
                        >
                          <span style={{ color: BLUE }}>{edu.degree}</span>
                          <span
                            style={{
                              color: GREY,
                              fontSize: '13px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {edu.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* Skills */}
                <motion.section
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>Skills</SectionHeading>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {DATA.skills.map((skill, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.5,
                          color: BLUE,
                          paddingLeft: '16px',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            color: GREY,
                          }}
                        >
                          ·
                        </span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.section>
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
                        }}
                      >
                        {proj.name}
                      </h4>
                      <span
                        style={{
                          fontSize: '14px',
                          color: BLUE,
                        }}
                      >
                        — {proj.desc}
                      </span>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: '13px',
                            color: BLUE,
                            textDecoration: 'none',
                            marginLeft: '2px',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.textDecoration = 'underline')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.textDecoration = 'none')
                          }
                        >
                          →
                        </a>
                      )}
                    </div>
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
      </div>
    </>
  )
}
