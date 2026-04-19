"use client"

import { useEffect, useState } from "react"
import { Play, Radio, ChevronRight, Trophy, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface LiveMatch {
  id: number
  league: string
  leagueLogo: string
  homeTeam: string
  homeLogo: string
  awayTeam: string
  awayLogo: string
  homeScore: number
  awayScore: number
  minute: number
  status: string
}

export function HeroSection() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([])
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pulseActive, setPulseActive] = useState(true)

  useEffect(() => {
    async function fetchLiveMatches() {
      try {
        setLoading(true)
        const response = await fetch("/api/football/live")
        const data = await response.json()
        
        if (data.matches && data.matches.length > 0) {
          setLiveMatches(data.matches)
          setError(null)
        } else {
          setError("No live matches at the moment")
        }
      } catch (err) {
        console.error("Error fetching live matches:", err)
        setError("Failed to load live matches")
      } finally {
        setLoading(false)
      }
    }

    fetchLiveMatches()
    
    // Refresh every 60 seconds
    const refreshInterval = setInterval(fetchLiveMatches, 60000)
    
    // Pulse animation
    const pulseInterval = setInterval(() => {
      setPulseActive((prev) => !prev)
    }, 1000)

    return () => {
      clearInterval(refreshInterval)
      clearInterval(pulseInterval)
    }
  }, [])

  // Cycle through live matches every 10 seconds
  useEffect(() => {
    if (liveMatches.length > 1) {
      const cycleInterval = setInterval(() => {
        setCurrentMatchIndex((prev) => (prev + 1) % liveMatches.length)
      }, 10000)
      return () => clearInterval(cycleInterval)
    }
  }, [liveMatches.length])

  const currentMatch = liveMatches[currentMatchIndex]

  const getStatusText = (status: string) => {
    switch (status) {
      case "1H":
        return "1st Half"
      case "2H":
        return "2nd Half"
      case "HT":
        return "Half Time"
      case "ET":
        return "Extra Time"
      case "P":
        return "Penalties"
      default:
        return "Live"
    }
  }

  return (
    <section id="live" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-border-green mb-8">
            <span className={`h-2 w-2 rounded-full bg-primary ${pulseActive ? "animate-pulse" : ""}`} />
            <Radio className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">LIVE NOW</span>
            <span className="text-sm text-muted-foreground" dir="rtl">مباشر الآن</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-foreground">S-SPORTS</span>
            <span className="text-primary neon-text-green ml-3">Kora</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-2 neon-text-green" dir="rtl">
            منصة البيانات الرياضية المتقدمة
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time sports analytics powered by cutting-edge AI technology
          </p>
        </div>

        {/* Live Match Card */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-6 md:p-8 glow-border-blue animate-pulse-glow">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading live matches...</p>
                <p className="text-sm text-secondary" dir="rtl">جاري تحميل المباريات المباشرة</p>
              </div>
            ) : error || !currentMatch ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Trophy className="h-12 w-12 text-secondary mb-4" />
                <p className="text-foreground font-medium mb-1">No Live Matches</p>
                <p className="text-muted-foreground text-center">
                  {error || "There are no live matches at the moment. Check back later!"}
                </p>
                <p className="text-sm text-secondary mt-2" dir="rtl">لا توجد مباريات مباشرة حالياً</p>
              </div>
            ) : (
              <>
                {/* League Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {currentMatch.leagueLogo ? (
                      <Image
                        src={currentMatch.leagueLogo}
                        alt={currentMatch.league}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <Trophy className="h-5 w-5 text-secondary" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{currentMatch.league}</p>
                      <p className="text-xs text-secondary">{getStatusText(currentMatch.status)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-bold text-primary">{currentMatch.minute}&apos;</span>
                  </div>
                </div>

                {/* Score Display */}
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
                  {/* Home Team */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                      {currentMatch.homeLogo ? (
                        <Image
                          src={currentMatch.homeLogo}
                          alt={currentMatch.homeTeam}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-foreground">
                          {currentMatch.homeTeam.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base font-semibold text-foreground line-clamp-2">
                      {currentMatch.homeTeam}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-4xl md:text-6xl font-bold text-primary neon-text-green">
                      {currentMatch.homeScore}
                    </span>
                    <span className="text-2xl md:text-3xl text-muted-foreground">:</span>
                    <span className="text-4xl md:text-6xl font-bold text-secondary neon-text-blue">
                      {currentMatch.awayScore}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center border-2 border-border overflow-hidden">
                      {currentMatch.awayLogo ? (
                        <Image
                          src={currentMatch.awayLogo}
                          alt={currentMatch.awayTeam}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-foreground">
                          {currentMatch.awayTeam.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base font-semibold text-foreground line-clamp-2">
                      {currentMatch.awayTeam}
                    </p>
                  </div>
                </div>

                {/* Match Navigation */}
                {liveMatches.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {liveMatches.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentMatchIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentMatchIndex
                            ? "bg-primary w-6"
                            : "bg-muted-foreground/50 hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                    {liveMatches.length > 5 && (
                      <span className="text-xs text-muted-foreground ml-2">
                        +{liveMatches.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-green">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Live
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto border-secondary text-secondary hover:bg-secondary/10 glow-border-blue">
                    View Stats
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: liveMatches.length > 0 ? `${liveMatches.length}` : "0", label: "Live Now", labelAr: "مباريات حية" },
            { value: "50K+", label: "Active Users", labelAr: "مستخدم نشط" },
            { value: "99.9%", label: "Uptime", labelAr: "وقت التشغيل" },
            { value: "AI", label: "Powered", labelAr: "مدعوم بالذكاء" },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-xl p-4 text-center hover:glow-border-green transition-all duration-300">
              <p className="text-2xl md:text-3xl font-bold text-primary neon-text-green">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-secondary" dir="rtl">{stat.labelAr}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
