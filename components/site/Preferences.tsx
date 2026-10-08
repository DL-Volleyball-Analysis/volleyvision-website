'use client'

// Language and theme, per visitor. Storage can be unavailable (private mode, blocked site data),
// so every access is guarded; the page then stays English and light.
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '@/lib/site/content'

type Prefs = { lang: Lang; setLang: (l: Lang) => void; dark: boolean; setDark: (d: boolean) => void }
const PrefsContext = createContext<Prefs | null>(null)

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // not persisted; the choice still applies to this visit
  }
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [dark, setDarkState] = useState(false)

  useEffect(() => {
    if (read('vv-lang') === 'zh') setLangState('zh')
    setDarkState(document.documentElement.dataset.theme === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant-TW' : 'en'
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    write('vv-lang', l)
  }
  const setDark = (d: boolean) => {
    setDarkState(d)
    if (d) document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    write('vv-theme', d ? 'dark' : 'light')
  }

  return <PrefsContext.Provider value={{ lang, setLang, dark, setDark }}>{children}</PrefsContext.Provider>
}

export function usePrefs(): Prefs {
  const p = useContext(PrefsContext)
  if (!p) throw new Error('usePrefs needs PreferencesProvider')
  return p
}
