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
  .project h1 { margin: 0 0 0.5rem; font-size: 13px; font-weight: 500; }
  .project .client { margin: 0 0 2rem; color: #a89977; font-size: 12px; letter-spacing: 0.04em; }
  .project .lede { margin: 0 auto 3rem; color: #6b5840; max-width: 30rem; }
`

export default function WordWorks() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'wordworks · Harun Abdi'
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

      <h1>wordworks</h1>
      <p className="client">freelance</p>
      <p className="lede">Hired in to build the initial RAG platform and assemble the team around it.</p>
    </div>
  )
}
