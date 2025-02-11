import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Blog from '@/components/Blog'
import BookCall from '@/components/BookCall'
import Footer from '@/components/Footer'

export default function Home() {
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
