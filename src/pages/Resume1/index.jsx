import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const DATA = {
  name: 'Harun',
  role: 'Software Engineer',
  email: 'harunabdi8@gmail.com',
  website: 'harun.tech',
  linkedin: 'https://www.linkedin.com/in/harun-abdi/',
  location: 'Copenhagen, Denmark',
  summary:
    'Software engineer who\'s built solutions for billion-dollar industries such as BaneDanmark and Landsbyggefonden. Experience in startups and scale-ups.',
  experience: [
    {
      company: 'Omika',
      location: 'Copenhagen',
      role: 'Software Developer',
      period: 'Nov 2025–Present',
      desc: 'Building UDRP AI for Abion, a Microsoft Teams bot that helps lawyers draft domain dispute complaints using AI and vector search.',
    },
    {
      company: 'Coding Pirates',
      location: '',
      role: 'Board Member & Volunteer',
      period: 'Feb 2025–Present',
      desc: 'Contributing to the creation of activities for children and young people, where they develop their technological courage and creativity through play and learning with programming and technology.',
    },
    {
      company: 'Landsbyggefonden',
      location: '',
      role: 'Consultant (Software Developer)',
      period: 'Aug 2025 - Nov 2025',
      desc: 'Developed solutions for Landsbyggefonden at DCAB, supporting the review and reporting of operations and maintenance data.',
    },
    {
      company: 'Freelance',
      location: '',
      role: 'Software Developer',
      period: 'Feb 2025–Nov 2025',
      bullets: [
        { title: 'Dovento', text: 'Sole developer on the web application, building a web alternative to the mobile app for 3,000+ users.' },
        { title: 'WordWorks', text: 'Sole developer responsible for full-stack development, creating and integrating RAG systems.' },
      ],
    },
    {
      company: 'Klimator DK',
      location: '',
      role: 'Student Software Developer & Intern',
      period: 'Jun 2023–Dec 2024',
      bullets: [
        { text: 'Developed a semi-automatic monitoring system that generates and sends PDFs automatically via email, saving the installation team up to 6 hours of manual work weekly.' },
        { text: 'Developed a device audit log for tracking metadata changes across 4,000+ devices.' },
        { text: 'Participated in integrating sensor data through the Danish Environmental Portal\'s IoT platform, helping Banedanmark improve railway monitoring.' },
      ],
    },
  ],
  education: [],
  skills: {
    'Frontend': 'React, React Native, Next.js, TypeScript',
    'Backend': 'Node.js, Java',
    'AI Tools': 'Claude Code, Codex',
    'Infrastructure': 'Azure, Hetzner, Azure Functions, Google Cloud Console',
    'Databases': 'SQL, PostgreSQL, NoSQL, MongoDB',
  },
  languages: [
    { lang: 'Danish', level: 'native' },
    { lang: 'English', level: 'fluent' },
    { lang: 'Somali', level: 'native' },
  ],
  projects: [
    {
      name: 'askpdfs.io',
      desc: 'An interactive platform allowing users to upload PDFs and chat with them using LLMs',
      tech: ['Next.js', 'Supabase', 'OpenAI'],
      link: 'https://askpdfs.io',
    },
    {
      name: 'BilligBid',
      desc: 'An iOS app that displays discounted products in nearby Salling Group stores (Netto, Bilka, Føtex). Designed for people who struggle to make ends meet, offering a much cheaper alternative by allowing them to shop discounted grocery items first',
      tech: ['React Native', 'Node.js'],
      link: null,
    },
    {
      name: 'ExifM',
      desc: 'A way to manipulate the exif data on images to change orientation',
      tech: ['Node.js', 'NPM', 'CLI'],
      link: 'https://npmjs.com/package/exifm',
    },
    {
      name: 'Dagenslands.dk',
      desc: 'A daily guessing game where you guess the country of the day. Built out of a personal interest in geography and a desire to create something simple, free, and quick to play ranging from a few seconds to a couple of minutes. The game has had over 2,000 visitors',
      tech: ['JavaScript', 'CSS'],
      link: 'https://dagenslands.dk',
    },
    {
      name: 'UDRP AI',
      desc: 'AI complaint drafting for domain lawyers',
      tech: ['MS Teams', 'OpenAI', 'Qdrant'],
      link: 'https://abion.com',
    },
    {
      name: 'Gift-a-Friend',
      desc: 'Referral Shopify plugin created for a multimillion DKK shop',
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
                              {b.text}
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
                    {Object.entries(DATA.skills).map(([category, items]) => (
                      <div key={category}>
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
                          {items}
                        </p>
                      </div>
                    ))}
                  </div>
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
                        {proj.desc}
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
