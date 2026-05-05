import { useEffect } from 'react'
import { Link } from 'react-router'

const styles = `
  html, body {
    background: #f5efe2;
    color: #2a1f0f;
    margin: 0;
    font: 14px/1.7 -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  body.project-page { padding: 4rem 1.5rem 5rem; }
  .project { max-width: 38rem; margin: 0 auto; }
  .project .head { text-align: center; margin-bottom: 3rem; }
  .project .back {
    display: inline-block;
    margin-bottom: 4rem;
    color: #a89977;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    font-size: 13px;
  }
  .project .back:hover { color: #2a1f0f; border-bottom-color: #c9bea3; }
  .project h1 { margin: 0 0 0.5rem; font-size: 13px; font-weight: 500; }
  .project .client { margin: 0 0 3rem; color: #a89977; font-size: 12px; letter-spacing: 0.04em; }

  .project article { color: #3a2d18; }
  .project article h2 {
    margin: 2.5rem 0 0.75rem;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a89977;
  }
  .project article h2:first-child { margin-top: 0; }
  .project article p {
    margin: 0 0 1rem;
    color: #3a2d18;
  }
  .project article ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
  }
  .project article li {
    position: relative;
    padding-left: 1.1rem;
    margin: 0 0 0.85rem;
  }
  .project article li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.7rem;
    width: 6px;
    height: 1px;
    background: #a89977;
  }
  .project article strong {
    color: #2a1f0f;
    font-weight: 500;
  }
  .project .tldr {
    margin: 0 0 3rem;
    padding: 1.25rem 1.5rem;
    border-left: 2px solid #c9bea3;
    background: #ebe2cc;
    color: #3a2d18;
    border-radius: 0 4px 4px 0;
  }
  .project .tldr-label {
    display: block;
    margin-bottom: 0.4rem;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a89977;
  }
  .project .tldr p { margin: 0; }
`

export default function CleverCost() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'clevercost · Harun Abdi'
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
      <div className="head">
        <Link to="/" className="back">← back</Link>
        <h1>clevercost</h1>
      </div>

      <article>
        <aside className="tldr">
          <span className="tldr-label">tldr</span>
          <p>
            Inherited a fragile invoice-extraction prototype that silently returned wrong
            data. Rebuilt it into a reliable system: accuracy went from ~60% to 95% on
            invoices with 1,000+ line items, large documents now process in parallel, and
            silent failures are gone.
          </p>
        </aside>

        <h2>What it is</h2>
        <p>
          CleverCost takes invoices (the PDFs businesses get from suppliers every day) and
          automatically pulls out the line items, totals, dates, and supplier info that
          someone would otherwise have to type into their accounting system by hand.
          Instead of a person spending hours copying numbers off a 20-page Hørkram invoice
          into a spreadsheet, the document goes in and clean, structured data comes out
          the other side.
        </p>

        <h2>What was wrong when I took it over</h2>
        <p>
          The system technically "worked" but couldn't be trusted with real customer
          invoices. Documents got stuck for days without anyone noticing. Big multi-page
          invoices would silently come back with missing line items or wrong totals, but
          still marked as successfully processed. That's the worst kind of failure,
          because nothing alerts you that the data is wrong. Large invoices also choked
          the queue, leaving small jobs waiting minutes for a free slot. And when too
          many requests came in, the system threw confusing errors instead of telling
          clients to slow down.
        </p>

        <h2>How I fixed it</h2>
        <p>
          I went through every failing invoice end-to-end and grouped the problems into
          root causes, then rebuilt the parts that were unreliable:
        </p>
        <ul>
          <li>
            <strong>Lifted extraction accuracy from ~60% to 95%</strong> on invoices with
            1,000+ line items, and built a chunked extraction pipeline that handles
            documents up to 45 pages without batch failures. The long, dense invoices
            that used to break the system are now the system's strong suit.
          </li>
          <li>
            <strong>Made it faster on large invoices.</strong> Pages used to be processed
            one after another, so a long invoice could tie up the system for 20 minutes.
            I made it process pages in parallel, and added a shortcut that reads text
            directly from PDFs when possible, skipping the OCR step entirely on documents
            that don't need it.
          </li>
          <li>
            <strong>Stopped the silent failures.</strong> When the AI occasionally
            returned malformed output, the old code would shrug and mark the invoice as
            "done" with empty data. I made it retry properly and fail loudly when
            something's wrong, so bad data never reaches the customer's books.
          </li>
          <li>
            <strong>Made it self-healing.</strong> Stuck invoices now get detected and
            retried automatically. Jobs survive crashes. The system can be left alone
            without leaving a trail of half-processed documents.
          </li>
          <li>
            <strong>Fixed the overload behavior.</strong> When the system is busy, clients
            now get a proper "try again in N seconds" response instead of cryptic errors,
            and the upload tools back off correctly.
          </li>
          <li>
            <strong>Tightened accuracy on tricky invoices.</strong> Refined how long
            invoices are split, how repeated lines are deduplicated, and how the AI is
            instructed, so edge cases like Danish packaging surcharges and totals that
            carry across pages get captured reliably.
          </li>
        </ul>

        <h2>Result</h2>
        <p>
          What I inherited was a prototype that looked finished but couldn't be trusted
          with paying customers. What it is now is a system that handles real invoices
          reliably, recovers on its own when things go wrong, and most importantly never
          quietly hands back the wrong numbers.
        </p>
      </article>
    </div>
  )
}
