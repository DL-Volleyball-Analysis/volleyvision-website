import { Hero, Numbers, Pipeline, Research, SiteFooter, Team } from '@/components/site/Sections'
import { SiteHeader } from '@/components/site/SiteHeader'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Numbers />
        <Pipeline />
        <Research />
        <Team />
      </main>
      <SiteFooter />
    </>
  )
}
