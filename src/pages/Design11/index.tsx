import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-20 h-20 rounded-full overflow-hidden mb-8"
      >
        <img
          src="/projects/avatar.jpg"
          alt={portfolio.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        className="max-w-2xl text-center text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-neutral-900 font-inter"
      >
        Hello, I'm {portfolio.name}, a full-stack software engineer shaping
        modern digital experiences.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        className="mt-10 flex gap-4"
      >
        <Link
          to="/projects"
          className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 font-inter"
        >
          See my work
        </Link>
        <a
          href="mailto:harunabdi8@gmail.com"
          className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 font-inter"
        >
          Email me
        </a>
        <a
          href="https://www.linkedin.com/in/harun-abdi/?skipRedirect=true"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 font-inter"
        >
          LinkedIn
        </a>
      </motion.div>
    </section>
  )
}

/* ─── Page ─── */
export default function Design11() {
  return (
    <div className="font-inter">
      <Hero />
    </div>
  )
}
