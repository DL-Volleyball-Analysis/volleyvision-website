'use client'

import { APP_FEATURES, CLAIMS, COPY, CORE_REPO, KIND, ORG, PIPELINE, REPORT_REPO, STATUS, WEBAPP_REPO } from '@/lib/site/content'
import { MatchIllustration } from './MatchIllustration'
import { usePrefs } from './Preferences'

export function Hero() {
  const { lang } = usePrefs()
  return (
    <section id="top" className="hero">
      <div className="container">
        <h1>{COPY.hero.title[lang]}</h1>
        <p className="lede">{COPY.hero.sub[lang]}</p>
        <div className="cta">
          <a className="button primary" href="#research">{COPY.hero.primary[lang]}</a>
          <a className="button" href={ORG}>{COPY.hero.secondary[lang]}</a>
        </div>
        <p className="status-note">{COPY.hero.status[lang]}</p>
      </div>
      <div className="container wide">
        <MatchIllustration />
        <p className="caption">{COPY.hero.caption[lang]}</p>
      </div>
    </section>
  )
}

const MEDIA = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/media`

export function Output() {
  const { lang } = usePrefs()
  return (
    <section id="output" className="section">
      <div className="container">
        <h2>{COPY.output.title[lang]}</h2>
        <p className="section-sub">{COPY.output.sub[lang]}</p>
        <figure className="output-figure">
          {/* preload="none": the 1 MB clip loads only when played */}
          <video controls muted loop playsInline preload="none" poster={`${MEDIA}/analysis-poster.jpg`} width={1280} height={720}>
            <source src={`${MEDIA}/analysis.mp4`} type="video/mp4" />
          </video>
          <figcaption>{COPY.output.video[lang]}</figcaption>
        </figure>
        <div className="output-grid">
          <figure className="output-figure">
            <img src={`${MEDIA}/review-app.jpg`} alt={COPY.output.app[lang]} loading="lazy" width={1600} height={1000} />
            <figcaption>{COPY.output.app[lang]}</figcaption>
          </figure>
          <figure className="output-figure">
            <img src={`${MEDIA}/boards-and-stats.png`} alt={COPY.output.boards[lang]} loading="lazy" width={1125} height={378} />
            <figcaption>{COPY.output.boards[lang]}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export function Numbers() {
  const { lang } = usePrefs()
  return (
    <section className="section">
      <div className="container">
        <h2>{COPY.numbers.title[lang]}</h2>
        <p className="section-sub">{COPY.numbers.sub[lang]}</p>
        <dl className="claims">
          {CLAIMS.map((c) => (
            <div key={c.value} className="claim">
              <dt className="claim-value">{c.value}</dt>
              <dd>
                <p>{c.label[lang]}</p>
                <p className="claim-meta">
                  <span className={`kind ${c.kind}`}>{KIND[c.kind][lang]}</span>
                  <a href={c.source.href}>{c.source.text[lang]}</a>
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Pipeline() {
  const { lang } = usePrefs()
  return (
    <section id="how" className="section">
      <div className="container">
        <h2>{COPY.how.title[lang]}</h2>
        <p className="section-sub">{COPY.how.sub[lang]}</p>
        {/* a real sequence: stages run in this order */}
        <ol className="pipeline">
          {PIPELINE.map((s, k) => (
            <li key={s.name.en}>
              <span className="step">{k + 1}</span>
              <div>
                <h3>{s.name[lang]}</h3>
                <p>{s.what[lang]}</p>
              </div>
              <span className={`status ${s.status}`}>{STATUS[s.status][lang]}</span>
            </li>
          ))}
        </ol>
        <h2 className="sub-heading">{COPY.app.title[lang]}</h2>
        <ul className="features">
          {APP_FEATURES.map((f) => (
            <li key={f.name.en}>
              <h3>{f.name[lang]}</h3>
              <p>{f.what[lang]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Research() {
  const { lang } = usePrefs()
  return (
    <section id="research" className="section">
      <div className="container">
        <h2>{COPY.research.title[lang]}</h2>
        <div className="research">
          {COPY.research.items.map((r) => (
            <article key={r.name.en}>
              <h3>{r.name[lang]}</h3>
              <p>{r.what[lang]}</p>
            </article>
          ))}
        </div>
        <p className="section-sub">{COPY.research.links[lang]}</p>
        <ul className="links">
          <li><a href={`${CORE_REPO}/tree/main/docs/prd`}>docs/prd</a></li>
          <li><a href={`${CORE_REPO}/tree/main/openspec/specs`}>openspec/specs</a></li>
          <li><a href={`${CORE_REPO}/tree/main/docs/results`}>docs/results</a></li>
          <li><a href={WEBAPP_REPO}>webapp</a></li>
        </ul>
      </div>
    </section>
  )
}

export function Team() {
  const { lang } = usePrefs()
  return (
    <section className="section">
      <div className="container">
        <h2>{COPY.team.title[lang]}</h2>
        <p className="body-text">{COPY.team.body[lang]}</p>
        <ul className="links plain">
          <li><a href={REPORT_REPO}>{COPY.team.report[lang]}</a></li>
          <li><a href={`${ORG}?q=capstone-&type=archived`}>{COPY.team.archive[lang]}</a></li>
        </ul>
      </div>
    </section>
  )
}

export function SiteFooter() {
  const { lang } = usePrefs()
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{COPY.footer[lang]}</p>
      </div>
    </footer>
  )
}
