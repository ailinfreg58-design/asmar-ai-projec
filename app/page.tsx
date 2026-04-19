import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MatchCenter } from "@/components/match-center"
import { AIAnalysis } from "@/components/ai-analysis"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MatchCenter />
      <AIAnalysis />
      <Footer />
    </main>
  )
}
