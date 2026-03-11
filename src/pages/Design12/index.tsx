import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: 'easeOut' as const },
  }),
}

function Header() {
  return (
    <header className="relative z-10 flex flex-col items-center pt-12 pb-8 sm:pt-16 sm:pb-10">
      <motion.p
        custom={0}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="text-xs tracking-[0.35em] uppercase mb-3 sm:mb-4"
        style={{ color: '#8a7e6b', fontFamily: 'var(--font-inter)' }}
      >
        Portfolio
      </motion.p>
      <motion.h1
        custom={1}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide"
        style={{ color: '#2c2418', fontFamily: 'var(--font-cormorant)' }}
      >
        {portfolio.name}
      </motion.h1>
      <motion.p
        custom={2}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="mt-2 text-sm sm:text-base tracking-widest uppercase"
        style={{ color: '#6b5e4b', fontFamily: 'var(--font-inter)', letterSpacing: '0.2em' }}
      >
        {portfolio.title}
      </motion.p>
      <motion.div
        custom={3}
        variants={fade}
        initial="hidden"
        animate="visible"
        className="mt-4 w-12 h-px"
        style={{ backgroundColor: '#c4b8a4' }}
      />
    </header>
  )
}

function Landscape() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 50vh, 560px)' }}>
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #c8ceb8 0%, #d4dcc8 30%, #dde3d0 55%, #e8e0cc 80%, #ede5d4 100%)',
        }}
      />

      {/* Distant misty mountains */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '70%',
          background: `
            linear-gradient(165deg, transparent 30%, rgba(140,155,120,0.35) 40%, rgba(140,155,120,0.35) 45%, transparent 55%),
            linear-gradient(195deg, transparent 25%, rgba(130,148,110,0.3) 35%, rgba(130,148,110,0.3) 42%, transparent 52%),
            linear-gradient(175deg, transparent 20%, rgba(150,162,130,0.25) 30%, rgba(150,162,130,0.25) 38%, transparent 48%)
          `,
        }}
      />

      {/* Mid-range hills */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '55%',
          borderRadius: '60% 80% 0 0 / 100% 100% 0 0',
          background: 'linear-gradient(180deg, #8a9f6a 0%, #7a8f5a 60%, #6b7f4e 100%)',
          opacity: 0.7,
        }}
      />

      <div
        className="absolute bottom-0 right-0"
        style={{
          width: '70%',
          height: '45%',
          borderRadius: '80% 40% 0 0 / 100% 100% 0 0',
          background: 'linear-gradient(180deg, #7a8f5a 0%, #6a7f4a 60%, #5a6e3a 100%)',
          opacity: 0.8,
        }}
      />

      {/* Foreground rolling hills */}
      <div
        className="absolute bottom-0 left-0"
        style={{
          width: '80%',
          height: '35%',
          borderRadius: '0 90% 0 0 / 0 100% 0 0',
          background: 'linear-gradient(180deg, #6a7f4a 0%, #5a6e3a 50%, #4d6030 100%)',
          opacity: 0.9,
        }}
      />

      <div
        className="absolute bottom-0 right-0"
        style={{
          width: '60%',
          height: '28%',
          borderRadius: '70% 0 0 0 / 100% 0 0 0',
          background: 'linear-gradient(180deg, #5a6e3a 0%, #4d6030 60%, #3f5228 100%)',
        }}
      />

      {/* Closest foreground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '18%',
          background: 'linear-gradient(180deg, #4d6030 0%, #3f5228 50%, #354822 100%)',
        }}
      />

      {/* Subtle warm haze overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(210,200,180,0.15) 0%, transparent 40%, rgba(210,200,180,0.1) 100%)',
        }}
      />

      {/* Subtle texture overlay (painted feel) */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content overlay on landscape */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="text-center px-6"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-4"
            style={{
              color: '#faf5ef',
              fontFamily: 'var(--font-cormorant)',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Tales of {portfolio.name}
          </h2>
          <p
            className="max-w-md mx-auto text-sm sm:text-base mb-6 leading-relaxed"
            style={{
              color: 'rgba(250,245,239,0.9)',
              fontFamily: 'var(--font-inter)',
              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
            }}
          >
            Crafting digital experiences with care and intention, one project at a time.
          </p>
          <Link
            to="/projects"
            className="inline-block px-8 py-2.5 text-xs tracking-[0.25em] uppercase transition-all duration-300"
            style={{
              color: '#faf5ef',
              fontFamily: 'var(--font-inter)',
              border: '1px solid rgba(250,245,239,0.5)',
              backdropFilter: 'blur(4px)',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(250,245,239,0.15)'
              e.currentTarget.style.borderColor = 'rgba(250,245,239,0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'
              e.currentTarget.style.borderColor = 'rgba(250,245,239,0.5)'
            }}
          >
            Explore
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl mx-auto px-6 py-16 sm:py-24 text-center"
    >
      <p
        className="text-xs tracking-[0.35em] uppercase mb-6"
        style={{ color: '#8a7e6b', fontFamily: 'var(--font-inter)' }}
      >
        The Craft
      </p>
      <p
        className="text-lg sm:text-xl leading-relaxed"
        style={{ color: '#3d3425', fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)' }}
      >
        {portfolio.bio}
      </p>
      <div className="mt-8 w-12 h-px mx-auto" style={{ backgroundColor: '#c4b8a4' }} />
    </motion.section>
  )
}

function SelectedWorks() {
  const featured = portfolio.projects.slice(0, 3)

  return (
    <section className="px-6 pb-16 sm:pb-24">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-xs tracking-[0.35em] uppercase mb-10 text-center"
        style={{ color: '#8a7e6b', fontFamily: 'var(--font-inter)' }}
      >
        Selected Works
      </motion.p>

      <div className="max-w-3xl mx-auto space-y-10">
        {featured.map((project, i) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 pb-10"
            style={{ borderBottom: '1px solid #ddd5c8' }}
          >
            <span
              className="text-xs shrink-0"
              style={{ color: '#a89d8c', fontFamily: 'var(--font-inter)' }}
            >
              {project.launchDate}
            </span>
            <div className="flex-1">
              <h3
                className="text-xl sm:text-2xl font-light mb-2"
                style={{ color: '#2c2418', fontFamily: 'var(--font-cormorant)' }}
              >
                {project.name}
              </h3>
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ color: '#6b5e4b', fontFamily: 'var(--font-inter)' }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1"
                    style={{
                      color: '#8a7e6b',
                      fontFamily: 'var(--font-inter)',
                      border: '1px solid #d5ccbc',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12"
      >
        <Link
          to="/projects"
          className="inline-block px-8 py-2.5 text-xs tracking-[0.25em] uppercase transition-all duration-300"
          style={{
            color: '#5a6e3a',
            fontFamily: 'var(--font-inter)',
            border: '1px solid #5a6e3a',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5a6e3a'
            e.currentTarget.style.color = '#faf5ef'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#5a6e3a'
          }}
        >
          See all work
        </Link>
      </motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="px-6 py-12 sm:py-16"
      style={{ backgroundColor: '#2c2418' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <p
          className="text-2xl sm:text-3xl font-light mb-6"
          style={{ color: '#e8e0cc', fontFamily: 'var(--font-cormorant)' }}
        >
          Let's craft something together
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={`mailto:${portfolio.email}`}
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: '#a89d8c', fontFamily: 'var(--font-inter)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e0cc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a89d8c')}
          >
            Email
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: '#a89d8c', fontFamily: 'var(--font-inter)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e0cc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a89d8c')}
          >
            LinkedIn
          </a>
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            style={{ color: '#a89d8c', fontFamily: 'var(--font-inter)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e8e0cc')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a89d8c')}
          >
            GitHub
          </a>
        </div>
        <div className="mt-8 w-12 h-px" style={{ backgroundColor: '#4d3f2e' }} />
        <p
          className="mt-6 text-[10px] tracking-[0.15em] uppercase"
          style={{ color: '#6b5e4b', fontFamily: 'var(--font-inter)' }}
        >
          {portfolio.name} &mdash; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default function Design12() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf5ef' }}>
      <Header />
      <Landscape />
      <About />
      <SelectedWorks />
      <Footer />
    </div>
  )
}
