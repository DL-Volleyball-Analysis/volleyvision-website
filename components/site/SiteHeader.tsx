'use client'

import { COPY, ORG } from '@/lib/site/content'
import { usePrefs } from './Preferences'

export function SiteHeader() {
  const { lang, setLang, dark, setDark } = usePrefs()
  return (
    <header className="site-header">
      <div className="container header-row">
        <a href="#top" className="wordmark">VolleyVision</a>
        <nav aria-label="Sections">
          <a href="#how">{COPY.nav.how[lang]}</a>
          <a href="#research">{COPY.nav.research[lang]}</a>
          <a href={ORG}>{COPY.nav.code[lang]}</a>
        </nav>
        <div className="header-tools">
          <button type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} aria-label="Switch language">
            {lang === 'en' ? '中文' : 'English'}
          </button>
          <button type="button" onClick={() => setDark(!dark)}>
            {dark ? (lang === 'en' ? 'Light' : '淺色') : lang === 'en' ? 'Dark' : '深色'}
          </button>
        </div>
      </div>
    </header>
  )
}
