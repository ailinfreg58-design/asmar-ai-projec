"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, ChevronRight, Star, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Match {
  id: number
  league: string
  leagueAr: string
  leagueLogo?: string
  homeTeam: string
  homeCode: string
  homeLogo?: string
  awayTeam: string
  awayCode: string
  awayLogo?: string
  date: string
  time: string
  odds?: {
    home: number
    draw: number
    away: number
  }
  isFeatured?: boolean
}

export function MatchCenter() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true)
        const response = await fetch("/api/football/fixtures")
        const data = await response.json()
        
        if (data.matches && data.matches.length > 0) {
          setMatches(data.matches)
          setError(null)
        } else if (data.error) {
          setError(data.error)
        } else {
          setError("No upcoming matches found")
        }
      } catch (err) {
        console.error("Error fetching matches:", err)
        setError("Failed to load upcoming matches")
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
    
    // Refresh every 5 minutes
    const refreshInterval = setInterval(fetchMatches, 300000)
    return () => clearInterval(refreshInterval)
  }, [])

  return (
    <section id="matches" className="relative py-20 md:py-32">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Calendar className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">UPCOMING MATCHES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            Match <span className="text-primary neon-text-green">Center</span>
          </h2>
          <p className="text-xl text-secondary font-semibold" dir="rtl">
            مركز المباريات
          </p>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Track upcoming fixtures with real-time odds and AI predictions
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading upcoming matches...</p>
            <p className="text-sm text-secondary" dir="rtl">جاري تحميل المباريات القادمة</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-foreground font-medium mb-1">Unable to Load Matches</p>
            <p className="text-muted-foreground text-center">{error}</p>
            <p className="text-sm text-secondary mt-2" dir="rtl">تعذر تحميل المباريات</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Matches Grid */}
        {!loading && !error && matches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className={`group glass-card rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                  match.isFeatured ? "glow-border-green" : "hover:glow-border-blue"
                }`}
              >
                {/* League & Featured Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {match.leagueLogo && (
                      <Image
                        src={match.leagueLogo}
                        alt={match.league}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{match.league}</p>
                      <p className="text-xs text-secondary" dir="rtl">{match.leagueAr}</p>
                    </div>
                  </div>
                  {match.isFeatured && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20">
                      <Star className="h-3 w-3 text-primary fill-primary" />
                      <span className="text-xs font-medium text-primary">Featured</span>
                    </div>
                  )}
                </div>

                {/* Teams */}
                <div className="flex items-center justify-between mb-4">
                  {/* Home Team */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border border-border overflow-hidden">
                      {match.homeLogo ? (
                        <Image
                          src={match.homeLogo}
                          alt={match.homeTeam}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-foreground">{match.homeCode}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground line-clamp-1">{match.homeTeam}</p>
                      <p className="text-xs text-muted-foreground">Home</p>
                    </div>
                  </div>

                  <span className="text-lg font-bold text-muted-foreground">VS</span>

                  {/* Away Team */}
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-sm font-semibold text-foreground text-right line-clamp-1">{match.awayTeam}</p>
                      <p className="text-xs text-muted-foreground text-right">Away</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border border-border overflow-hidden">
                      {match.awayLogo ? (
                        <Image
                          src={match.awayLogo}
                          alt={match.awayTeam}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm font-bold text-foreground">{match.awayCode}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-center gap-4 mb-4 py-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-secondary" />
                    <span>{match.date}</span>
                  </div>
                  <div className="w-px h-4 bg-border" />
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{match.time}</span>
                  </div>
                </div>

                {/* Odds */}
                {match.odds && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">1</p>
                      <p className="text-sm font-bold text-primary">{match.odds.home.toFixed(2)}</p>
                    </div>
                    <div className="text-center py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">X</p>
                      <p className="text-sm font-bold text-foreground">{match.odds.draw.toFixed(2)}</p>
                    </div>
                    <div className="text-center py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer">
                      <p className="text-xs text-muted-foreground mb-1">2</p>
                      <p className="text-sm font-bold text-secondary">{match.odds.away.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                {/* View Button */}
                <Button 
                  variant="ghost" 
                  className="w-full text-muted-foreground hover:text-foreground hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {!loading && !error && matches.length > 0 && (
          <div className="mt-10 text-center">
            <Button 
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow-blue"
            >
              View All Matches
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
