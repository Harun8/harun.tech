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
  .project .screens {
    width: min(48rem, 100vw - 3rem);
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
    border-radius: 18px;
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
`

export default function Billigbid() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'billigbid · Harun Abdi'
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

      <h1>billigbid</h1>
      <p className="lede">A Danish food-waste app on iOS and Android that helps people find discounted groceries before they're thrown out. Built for people who have a hard time making ends meet.</p>

      <div className="screens">
        <img src="/projects/billigbid-1.jpg" alt="Billigbid store selection at Føtex Food Torveporten" />
        <img src="/projects/billigbid-2.jpg" alt="Billigbid discounted offers list" />
        <img src="/projects/billigbid-3.jpg" alt="Billigbid filtered by meat & fish" />
      </div>

      <a className="live" href="https://apps.apple.com/us/app/billigbid/id6756362285" target="_blank" rel="noreferrer">
        get it on the app store →
      </a>
    </div>
  )
}
