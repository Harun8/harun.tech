import { useEffect } from 'react'
import { Link } from 'react-router'

const styles = `
  html, body {
    background: #f5efe2;
    color: #2a1f0f;
    margin: 0;
    font: 13px/1.65 -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body.project-page { padding: 4rem 1.5rem 5rem; }
  .project { max-width: 36rem; margin: 0 auto; text-align: center; }
  .project .back {
    display: inline-block;
    margin-bottom: 4rem;
    color: #a89977;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
  }
  .project .back:hover { color: #2a1f0f; border-bottom-color: #c9bea3; }
  .project h1 {
    margin: 0 0 1.5rem;
    font-size: 13px;
    font-weight: 500;
  }
  .project .lede {
    margin: 0 auto 3rem;
    color: #6b5840;
    max-width: 30rem;
  }
  .project .live {
    color: #2a1f0f;
    text-decoration: none;
    border-bottom: 1px solid #c9bea3;
    padding-bottom: 1px;
    font-size: 13px;
  }
  .project .live:hover { border-bottom-color: #2a1f0f; }
`

export default function Dagensland() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'dagensland.dk · Harun Abdi'
    document.body.classList.add('project-page')
    const styleEl = document.createElement('style')
    styleEl.textContent = styles
    document.head.appendChild(styleEl)
    return () => {
      document.title = prevTitle
      document.body.classList.remove('project-page')
      styleEl.remove()
    }
  }, [])

  return (
    <div className="project">
      <Link to="/" className="back">← back</Link>

      <h1>dagensland.dk</h1>
      <p className="lede">A Wordle/Wørdle inspired geography game. Grown to ~3,000 unique monthly visitors.</p>

      <a className="live" href="https://dagensland.dk" target="_blank" rel="noreferrer">
        see it live →
      </a>
    </div>
  )
}
