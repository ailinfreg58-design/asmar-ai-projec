"use client"

import { useEffect, useState } from "react"
import { Play, Radio, ChevronRight, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LiveMatch {
  id: number
  league: string
  leagueAr: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  minute: number
  status: "live" | "halftime"
}

const liveMatch: LiveMatch = {
  id: 1,
  league: "UEFA Champions League",
  leagueAr: "دوري أبطال أوروبا",
  homeTeam: "Real Madrid",
  awayTeam: "Bayern Munich",
  homeScore: 2,
  awayScore: 1,
  minute: 67,
  status: "live",
}

export function HeroSection() {
  const [currentMinute, setCurrentMinute] = useState(liveMatch.minute)
  const [pulseActive, setPulseActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMinute((prev) => (prev < 90 ? prev + 1 : prev))
      setPulseActive((prev) => !prev)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

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
            {/* League Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{liveMatch.league}</p>
                  <p className="text-xs text-secondary" dir="rtl">{liveMatch.leagueAr}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-bold text-primary">{currentMinute}&apos;</span>
              </div>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-6">
              {/* Home Team */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-foreground border-2 border-border">
                  RM
                </div>
                <p className="text-sm md:text-base font-semibold text-foreground">{liveMatch.homeTeam}</p>
              </div>

              {/* Score */}
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-4xl md:text-6xl font-bold text-primary neon-text-green">
                  {liveMatch.homeScore}
                </span>
                <span className="text-2xl md:text-3xl text-muted-foreground">:</span>
                <span className="text-4xl md:text-6xl font-bold text-secondary neon-text-blue">
                  {liveMatch.awayScore}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-foreground border-2 border-border">
                  BM
                </div>
                <p className="text-sm md:text-base font-semibold text-foreground">{liveMatch.awayTeam}</p>
              </div>
            </div>

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
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "500+", label: "Live Matches", labelAr: "مباراة مباشرة" },
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
