import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import BreakingTicker from '../components/sections/BreakingTicker'
import CategoryHighlightsSection from '../components/sections/CategoryHighlightsSection'
import HeroSection from '../components/sections/HeroSection'
import HomeMarketsSection from '../components/sections/HomeMarketsSection'
import LatestNewsSection from '../components/sections/LatestNewsSection'
import QuickBriefsSection from '../components/sections/QuickBriefsSection'
import Sidebar from '../components/sections/Sidebar'

function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <BreakingTicker />

      <main className="container-shell flex-1 py-8">
        <HeroSection />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <LatestNewsSection />
          </div>
          <Sidebar />
        </div>

        <CategoryHighlightsSection />
        <HomeMarketsSection />
        <QuickBriefsSection />
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
