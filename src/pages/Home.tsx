import { useEffect, useState } from 'react'
import { Link } from 'react-router'

type Item = { to: string; label: string; external?: boolean }
type Mode = 'personal' | 'work'

const MODE_KEY = 'harun-home-project-mode'

const personal: Item[] = [
  { to: '/projects/askpdfs', label: 'askpdfs.io' },
  { to: '/projects/billigbid', label: 'billigbid' },
  { to: '/projects/veya', label: 'veya' },
  { to: '/projects/dagensland', label: 'dagensland.dk' },
  { to: '/projects/exifm', label: 'exifm' },
  { to: '/projects/deepcast', label: 'deepcast' },
  { to: '/resume', label: 'resume', external: true },
]

const work: Item[] = [
  { to: '/projects/abion', label: 'abion it' },
  { to: '/projects/clevercost', label: 'clevercost' },
  { to: '/projects/wordworks', label: 'wordworks' },
  { to: '/projects/dovento', label: 'dovento' },
  { to: '/projects/klimator', label: 'klimator' },
]

const styles = `
  html, body {
    background: #f5efe2;
    color: #2a1f0f;
    margin: 0;
    height: 100%;
    font: 13px/1.65 -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body.home-page { display: grid; place-items: center; padding: 2rem; }
  .home-card { width: 100%; max-width: 20rem; text-align: center; }
  .home-card h1 { margin: 0 0 1.75rem; font-size: 13px; font-weight: 500; }
  .home-card p { margin: 0 0 1.75rem; color: #6b5840; }
  .home-card .projects { position: relative; margin: 0 0 1.75rem; }
  .home-card ul { list-style: none; padding: 0; margin: 0; }
  .home-card li { margin: 0; }
  .home-card .brace-mark {
    position: absolute;
    right: calc(100% + 0.5rem);
    top: 0.1rem;
    bottom: 0.1rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #6b5840;
    pointer-events: none;
  }
  .home-card .brace-mark .label {
    font-size: 12px;
    line-height: 1;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }
  .home-card .brace-mark svg {
    display: block;
    width: 22px;
    height: 100%;
    color: #2a1f0f;
    opacity: 0.55;
  }
  @media (max-width: 520px) {
    .home-card .brace-mark { display: none; }
  }
  .home-card a {
    color: #2a1f0f;
    text-decoration: none;
    border-bottom: 1px solid #c9bea3;
    padding-bottom: 1px;
  }
  .home-card a:hover { border-bottom-color: #2a1f0f; }
  .home-card .quiet { color: #a89977; }
  .home-card .contact { display: flex; gap: 1.25rem; justify-content: center; margin: 0; }
  .home-card .contact a {
    display: inline-flex;
    align-items: center;
    color: #6b5840;
    border-bottom: none;
    padding: 0;
    transition: color 120ms ease;
  }
  .home-card .contact a:hover { color: #2a1f0f; }
  .home-card .contact svg { width: 16px; height: 16px; display: block; }
  .home-card .toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.6rem;
    margin: 0 0 1.25rem;
  }
  .home-card .toggle button {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 0;
    color: #a89977;
    font: inherit;
    cursor: pointer;
    transition: color 120ms ease;
  }
  .home-card .toggle button:hover { color: #2a1f0f; }
  .home-card .toggle button.active { color: #2a1f0f; }
  .home-card .toggle .sep { color: #c9bea3; user-select: none; }
`

export default function Home() {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === 'undefined') return 'personal'
    return window.localStorage.getItem(MODE_KEY) === 'work' ? 'work' : 'personal'
  })
  const items = mode === 'personal' ? personal : work

  const selectMode = (nextMode: Mode) => {
    setMode(nextMode)
    window.localStorage.setItem(MODE_KEY, nextMode)
  }

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Harun Abdi'
    document.body.classList.add('home-page')
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    document.head.appendChild(styleEl)
    return () => {
      document.title = prevTitle
      document.body.classList.remove('home-page')
      styleEl.remove()
    }
  }, [])

  return (
    <div className="home-card">
      <h1>Harun Abdi</h1>
      <p>software engineer. i just love building things</p>
      <div className="toggle" role="tablist" aria-label="Project type">
        <button
          role="tab"
          aria-selected={mode === 'personal'}
          className={mode === 'personal' ? 'active' : ''}
          onClick={() => selectMode('personal')}
        >
          personal
        </button>
        <span className="sep" aria-hidden="true">·</span>
        <button
          role="tab"
          aria-selected={mode === 'work'}
          className={mode === 'work' ? 'active' : ''}
          onClick={() => selectMode('work')}
        >
          work
        </button>
      </div>
      <div className="projects">
        <span className="brace-mark" aria-hidden="true">
          <span className="label">projects</span>
          <svg viewBox="0 0 16 140" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
            <path d="M13 4 C 5 7, 4 14, 4.5 30 C 5 50, 5 60, 5 66 C 5 70, 3 72, 1.5 72 C 3 72, 5 74, 5 78 C 5 84, 5 94, 4.5 110 C 4 126, 5 134, 13 137" vectorEffect="non-scaling-stroke" />
          </svg>
        </span>
        <ul>
          {items.map((item) => (
            <li key={item.to}>
              {item.external
                ? <a href={item.to}>{item.label}</a>
                : <Link to={item.to}>{item.label}</Link>
              }
            </li>
          ))}
        </ul>
      </div>
      <p><a href="mailto:harunabdi8@gmail.com">harunabdi8@gmail.com</a></p>
      <p className="contact">
        <a href="https://github.com/harun8" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/harun-abdi/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
          </svg>
        </a>
      </p>
    </div>
  )
}
