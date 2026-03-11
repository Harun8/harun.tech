import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'

/* ─── ASCII Art Elements ─── */

const SUN = `
        \\   |   /
         \\  |  /
      --- (   ) ---
         /  |  \\
        /   |   \\
`

const CLOUD_1 = `
                   .--~~--.
                .-~        ~-.
               /    .--~~--.   \\
              |   -~        ~-  |
    .--~~--.  |  |            | |  .--~~--.
 .-~        ~-|  |            | |-~        ~-.
|              \\  \\          /  /              |
 \\              \\  '-.____.-'  /              /
  '-.                                    .-'
     '~--.                        .--~'
          '~---..________..---~'
`

const CLOUD_2 = `
              .--~~--.
           .-~        ~-.
    .---. |    .--~~--.   |
  .'     '|  -~        ~- |
 /         |  |          | |   .--~~--.
|          \\  \\        /  / .-~        ~-.
 \\          '-.'.____.'.-' |              |
  '.                       \\            /
    '~--.              .-'  '-.      .-'
         '~--......--~'       '~--~'
`

const CLOUD_SMALL = `
      .--~~--.
   .-~        ~-.
  |              |
   \\            /
    '-.______.-'
`

const BIRD_1 = `  ~  ~  `
const BIRD_2 = ` v    v `

/* ─── Floating animation ─── */
const floatVariants = {
  animate: (i: number) => ({
    y: [0, -8, 0],
    transition: {
      duration: 4 + i,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }),
}

const driftVariants = {
  animate: (i: number) => ({
    x: [0, 12, 0],
    transition: {
      duration: 8 + i * 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }),
}

/* ─── Components ─── */

function AsciiSun() {
  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.3 }}
      className="absolute top-8 right-8 sm:top-16 sm:right-20 text-[#8a8478] text-xs sm:text-sm leading-tight select-none"
      aria-hidden="true"
    >
      {SUN}
    </motion.pre>
  )
}

function AsciiBirds() {
  return (
    <>
      <motion.pre
        custom={0}
        variants={driftVariants}
        animate="animate"
        className="absolute top-24 left-[15%] text-[#a09888] text-xs select-none"
        aria-hidden="true"
      >
        {BIRD_1}
      </motion.pre>
      <motion.pre
        custom={1}
        variants={driftVariants}
        animate="animate"
        className="absolute top-32 left-[35%] text-[#a09888] text-xs select-none"
        aria-hidden="true"
      >
        {BIRD_2}
      </motion.pre>
      <motion.pre
        custom={2}
        variants={driftVariants}
        animate="animate"
        className="absolute top-20 right-[30%] text-[#a09888] text-xs select-none"
        aria-hidden="true"
      >
        {BIRD_1}
      </motion.pre>
    </>
  )
}

function HorizonLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      className="absolute bottom-[38%] sm:bottom-[35%] left-0 right-0 mx-8 sm:mx-16 border-t-2 border-dotted border-[#b8b0a4] origin-left"
      aria-hidden="true"
    />
  )
}

function AsciiClouds() {
  return (
    <>
      <motion.pre
        custom={0}
        variants={floatVariants}
        animate="animate"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-4 -left-4 sm:left-8 text-[#b8b0a4] text-[8px] sm:text-xs leading-tight select-none"
        aria-hidden="true"
      >
        {CLOUD_1}
      </motion.pre>
      <motion.pre
        custom={1}
        variants={floatVariants}
        animate="animate"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-2 right-0 sm:right-12 text-[#b8b0a4] text-[8px] sm:text-xs leading-tight select-none"
        aria-hidden="true"
      >
        {CLOUD_2}
      </motion.pre>
      <motion.pre
        custom={2}
        variants={floatVariants}
        animate="animate"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-16 left-[30%] sm:left-[40%] text-[#c8c0b4] text-[7px] sm:text-[10px] leading-tight select-none hidden sm:block"
        aria-hidden="true"
      >
        {CLOUD_SMALL}
      </motion.pre>
    </>
  )
}

function NameCard() {
  return (
    <div className="relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left px-6 sm:px-0">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.3em] text-[#3d3a35] font-mono uppercase"
      >
        {portfolio.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-4 sm:mt-6 max-w-md"
      >
        <pre className="text-[#6b6560] text-[10px] sm:text-xs leading-relaxed whitespace-pre-wrap font-mono">
{`+------------------------------------------+
|                                          |
|  Full-stack engineer building modern     |
|  digital experiences for the web.        |
|                                          |
+------------------------------------------+`}
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start font-mono text-xs sm:text-sm"
      >
        <Link
          to="/projects"
          className="border border-[#8a8478] px-4 py-2 text-[#3d3a35] hover:bg-[#3d3a35] hover:text-[#e8e4dc] transition-colors duration-200"
        >
          {'[ See my work ]'}
        </Link>
        <a
          href={`mailto:${portfolio.email}`}
          className="border border-[#8a8478] px-4 py-2 text-[#3d3a35] hover:bg-[#3d3a35] hover:text-[#e8e4dc] transition-colors duration-200"
        >
          {'[ Email ]'}
        </a>
        <a
          href={portfolio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[#8a8478] px-4 py-2 text-[#3d3a35] hover:bg-[#3d3a35] hover:text-[#e8e4dc] transition-colors duration-200"
        >
          {'[ LinkedIn ]'}
        </a>
      </motion.div>
    </div>
  )
}

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'radial-gradient(circle, #c8c0b4 0.8px, transparent 0.8px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    />
  )
}

function GroundPattern() {
  return (
    <motion.pre
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2, delay: 1.5 }}
      className="absolute bottom-[28%] sm:bottom-[26%] left-8 sm:left-16 text-[#b8b0a4] text-[8px] sm:text-[10px] leading-tight select-none font-mono"
      aria-hidden="true"
    >
{`  ,,,   ,,,       ,,,   ,,,       ,,,
 ////  ////      ////  ////      ////
  ''    ''        ''    ''        ''`}
    </motion.pre>
  )
}

/* ─── Page ─── */
export default function Design13() {
  return (
    <div
      className="relative min-h-screen overflow-hidden font-mono"
      style={{ backgroundColor: '#e8e4dc' }}
    >
      <DotGrid />
      <AsciiSun />
      <AsciiBirds />

      {/* Main content — centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center sm:justify-start sm:pl-16 md:pl-24 lg:pl-32">
        <NameCard />
      </div>

      <HorizonLine />
      <GroundPattern />
      <AsciiClouds />
    </div>
  )
}
