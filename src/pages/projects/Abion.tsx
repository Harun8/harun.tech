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
  .project article ol {
    list-style: none;
    counter-reset: item;
    padding: 0;
    margin: 0 0 1rem;
  }
  .project article ol li {
    position: relative;
    counter-increment: item;
    padding-left: 1.6rem;
    margin: 0 0 0.85rem;
  }
  .project article ol li::before {
    content: counter(item) '.';
    position: absolute;
    left: 0;
    color: #a89977;
    font-variant-numeric: tabular-nums;
  }
  .project article ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
  }
  .project article ul li {
    position: relative;
    padding-left: 1.1rem;
    margin: 0 0 0.85rem;
  }
  .project article ul li::before {
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

export default function Abion() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'abion it · Harun Abdi'
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
        <h1>abion it</h1>
      </div>

      <article>
        <aside className="tldr">
          <span className="tldr-label">tldr</span>
          <p>
            Built a Microsoft Teams bot from scratch that lets a 7-lawyer brand-protection
            firm draft UDRP domain-dispute complaints by chatting with an AI instead of
            filling out templates by hand. What used to be a 4 to 6 hour manual drafting
            process now produces a properly formatted DOCX in minutes, with WHOIS
            lookups, precedent retrieval, and schema-compliant output baked in.
          </p>
        </aside>

        <h2>What it is</h2>
        <p>
          UDRP AI is the bot a lawyer at Abion talks to in a Teams channel when a client
          gets cybersquatted. The bot interviews the lawyer through eight UDRP sections
          (parties, disputed domains, trade marks, factual background, the three legal
          grounds, remedies, annexes), automatically pulls registrant data from WHOIS/RDAP
          for every disputed domain, retrieves passages from a corpus of precedent
          complaints, drafts each section in British English, validates against the WIPO
          schema, and returns a finished DOCX in the chat. The lawyer reviews and submits.
          The bot never files anything itself.
        </p>

        <h2>What was hard</h2>
        <p>Three categories of risk on this kind of project:</p>
        <ol>
          <li>
            <strong>Multi-user state.</strong> Seven lawyers share one Teams channel. A
            naive bot would mix one lawyer's trade marks into another's draft. There's no
            second chance with legal documents.
          </li>
          <li>
            <strong>LLM reliability.</strong> A model that hallucinates a trade mark
            registration number, drops a disputed domain, or invents a precedent is worse
            than no bot at all. Silent wrong answers are the failure mode that gets you
            fired.
          </li>
          <li>
            <strong>Format rigidity.</strong> UDRP complaints have to comply with WIPO's
            schema down to British spelling ("trade mark", two words), DD MMMM YYYY dates,
            and a 5,000-word cap on the legal grounds section. The DOCX has to look like
            something a partner signs.
          </li>
        </ol>

        <h2>How I built it</h2>
        <ul>
          <li>
            <strong>LangGraph state machine</strong> for the interview, drafting,
            validation, review, and delivery flow, with a PostgreSQL checkpointer so each
            lawyer's session is isolated and survives server restarts. State is keyed by
            a composite (conversationId, userId) so two lawyers in the same channel never
            see each other's data.
          </li>
          <li>
            <strong>Parallel section drafting</strong> with a configurable batch size and
            a semaphore around LLM calls. Long complaints (eight sections, multiple
            domains) draft in roughly the time of one section instead of eight.
          </li>
          <li>
            <strong>WHOIS/RDAP auto-lookup</strong> runs the moment the lawyer names a
            domain, so registrant data is in CaseData before drafting starts and the LLM
            never has to guess.
          </li>
          <li>
            <strong>Qdrant-backed RAG</strong> over the precedent corpus with citation
            tracking, so retrieved passages are traceable to their source complaint.
          </li>
          <li>
            <strong>Hardened LLM extraction:</strong> robust JSON parsing, TLD allowlist
            to reject hallucinated domains, dedup of trade marks by registration number,
            and a final cross-section pass to catch data the lawyer mentioned out of
            order.
          </li>
          <li>
            <strong>Schema-driven validation</strong> against schemaUDRP.yaml plus
            hardcoded rules (British English enforcement, date formatting, word limits)
            running before DOCX assembly. Failures surface to the lawyer with specific
            fixes, not a generic "try again".
          </li>
          <li>
            <strong>AES-256-GCM encryption at rest</strong> for uploaded evidence files,
            audit logging of every LLM call (model, tokens, cost, duration) to
            PostgreSQL, and an admin dashboard that aggregates spend by user and date.
          </li>
          <li>
            <strong>Multi-file delivery.</strong> The bot serves the DOCX through an
            authenticated HTTP endpoint instead of inline data URLs (which Teams silently
            truncates), with structured preview cards before the lawyer downloads.
          </li>
        </ul>

        <h2>Result</h2>
        <p>
          A drafting tool the firm actually trusts with paying clients: state is isolated
          per lawyer, the LLM's output is constrained by the schema and the precedent
          corpus rather than left to vibes, every interaction is audited, and evidence is
          encrypted on disk. What started as a Phase 0 prototype is now a system handling
          real cases end-to-end inside Teams.
        </p>
      </article>
    </div>
  )
}
