import type { Metadata } from 'next'
import './site.css'
import { PreferencesProvider } from '@/components/site/Preferences'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  title: 'VolleyVision — volleyball, point by point',
  description:
    'Turning one camera’s volleyball match recording into a reviewable record: ball path, court, rallies and score. A research project from National Taiwan Ocean University, in progress.',
  icons: { icon: [{ url: `${basePath}/icon.svg`, type: 'image/svg+xml' }], apple: `${basePath}/icon.svg` },
}

// Applies the visitor's saved theme before first paint (light unless they chose dark).
const themeScript = `try{if(localStorage.getItem('vv-theme')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  )
}
