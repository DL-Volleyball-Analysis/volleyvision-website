import { Hero, Numbers, Output, Pipeline, Research, SiteFooter, Team } from '@/components/site/Sections'
import { SiteHeader } from '@/components/site/SiteHeader'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Output />
        <Numbers />
        <Pipeline />
        <Research />
        <Team />
      </main>
      <SiteFooter />
    </>
  )
}
