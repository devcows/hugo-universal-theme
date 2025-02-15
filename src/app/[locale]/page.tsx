import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Blog from '@/components/Blog'
import BookCall from '@/components/BookCall'
import Footer from '@/components/Footer'
import { Locale } from '@/i18n/config'

export const runtime = 'edge'
export const preferredRegion = 'auto'
export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

export default function Home({
  params: { locale }
}: {
  params: { locale: Locale }
}) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <BookCall />
        <Blog />
      </main>
      <Footer />
    </div>
  )
} 