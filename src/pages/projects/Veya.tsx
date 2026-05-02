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
  .project .media {
    width: min(56rem, 100vw - 3rem);
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 2.5rem;
    border: 1px solid #e1d8c2;
    border-radius: 4px;
    overflow: hidden;
    background: #ebe2cc;
    line-height: 0;
  }
  .project .media video,
  .project .media img {
    display: block;
    width: 100%;
    height: auto;
  }
  .project .screens {
    width: min(56rem, 100vw - 3rem);
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 2.5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .project .screens img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid #e1d8c2;
    border-radius: 12px;
    background: #ebe2cc;
  }
  .project .live {
    color: #2a1f0f;
    text-decoration: none;
    border-bottom: 1px solid #c9bea3;
    padding-bottom: 1px;
    font-size: 13px;
  }
  .project .live:hover { border-bottom-color: #2a1f0f; }
  .project .quiet-note {
    margin-top: 1rem;
    color: #a89977;
    font-size: 12px;
  }
`

export default function Veya() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'veya · Harun Abdi'
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

      <h1>veya</h1>
      <p className="lede">A personal iOS fitness coaching app written in Swift/SwiftUI. Pulls signal from HealthKit, Strava, and Hevy and uses Gemma E2B as the AI layer to turn that into actually useful coaching. Built for people who want structured feedback, not generic advice.</p>

      <div className="media">
        <video
          src="/projects/veya-demo.mp4"
          poster="/projects/veya-demo-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className="screens">
        <img src="/projects/veya-dashboard.jpg" alt="Veya dashboard" />
        <img src="/projects/veya-recovery.jpg" alt="Veya recovery view" />
        <img src="/projects/veya-strength.jpg" alt="Veya strength programming" />
      </div>

      <p className="quiet-note">In development · TestFlight soon</p>
    </div>
  )
}
