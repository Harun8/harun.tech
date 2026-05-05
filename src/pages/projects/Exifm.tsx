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
  .project .title {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.75rem;
    margin: 0 0 1.5rem;
    flex-wrap: wrap;
  }
  .project h1 {
    margin: 0;
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
  .project .thumb {
    width: min(28rem, 100vw - 3rem);
    margin: 0 auto 2.5rem;
    border: 1px solid #e1d8c2;
    border-radius: 4px;
    overflow: hidden;
    background: #ebe2cc;
    line-height: 0;
  }
  .project .thumb img { display: block; width: 100%; height: auto; }
`

export default function Exifm() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'exifm · Harun Abdi'
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

      <div className="title">
        <h1>exifm</h1>
        <a className="live" href="https://www.npmjs.com/package/exifm" target="_blank" rel="noreferrer">
          npm →
        </a>
      </div>
      <p className="lede">A tiny Node.js utility tool for safely setting JPEG EXIF orientation and optionally stripping GPS metadata.</p>

      <div className="thumb">
        <img src="/projects/exifm-thumb.jpg" alt="exifm article thumbnail" />
      </div>
    </div>
  )
}
