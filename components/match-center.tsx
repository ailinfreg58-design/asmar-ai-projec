"use client"

import { Calendar, Clock, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Match {
  id: number
  league: string
  leagueAr: string
  homeTeam: string
  homeCode: string
  awayTeam: string
  awayCode: string
  date: string
  time: string
  odds?: {
    home: number
    draw: number
    away: number
  }
  isFeatured?: boolean
}

const upcomingMatches: Match[] = [
  {
    id: 1,
    league: "Premier League",
    leagueAr: "الدوري الإنجليزي",
    homeTeam: "Manchester City",
    homeCode: "MCI",
    awayTeam: "Liverpool",
    awayCode: "LIV",
    date: "Apr 20",
    time: "17:30",
    odds: { home: 1.85, draw: 3.60, away: 4.20 },
    isFeatured: true,
  },
  {
    id: 2,
    league: "La Liga",
    leagueAr: "الدوري الإسباني",
    homeTeam: "Barcelona",
    homeCode: "BAR",
    awayTeam: "Atletico Madrid",
    awayCode: "ATM",
    date: "Apr 21",
    time: "21:00",
    odds: { home: 1.65, draw: 3.80, away: 5.50 },
  },
  {
    id: 3,
    league: "Serie A",
    leagueAr: "الدوري الإيطالي",
    homeTeam: "AC Milan",
    homeCode: "ACM",
    awayTeam: "Inter Milan",
    awayCode: "INT",
    date: "Apr 22",
    time: "20:45",
    odds: { home: 2.90, draw: 3.20, away: 2.45 },
    isFeatured: true,
  },
  {
    id: 4,
    league: "Bundesliga",
    leagueAr: "الدوري الألماني",
    homeTeam: "Borussia Dortmund",
    homeCode: "BVB",
    awayTeam: "RB Leipzig",
    awayCode: "RBL",
    date: "Apr 22",
    time: "18:30",
    odds: { home: 2.10, draw: 3.50, away: 3.40 },
  },
  {
    id: 5,
    league: "Ligue 1",
    leagueAr: "الدوري الفرنسي",
    homeTeam: "Paris Saint-Germain",
    homeCode: "PSG",
    awayTeam: "Monaco",
    awayCode: "MON",
    date: "Apr 23",
    time: "20:00",
    odds: { home: 1.45, draw: 4.50, away: 7.00 },
  },
  {
    id: 6,
    league: "Saudi Pro League",
    leagueAr: "دوري روشن السعودي",
    homeTeam: "Al-Hilal",
    homeCode: "HIL",
    awayTeam: "Al-Nassr",
    awayCode: "NAS",
    date: "Apr 24",
    time: "21:00",
    odds: { home: 2.00, draw: 3.40, away: 3.60 },
    isFeatured: true,
  },
]

export function MatchCenter() {
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

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {upcomingMatches.map((match) => (
            <div
              key={match.id}
              className={`group glass-card rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                match.isFeatured ? "glow-border-green" : "hover:glow-border-blue"
              }`}
            >
              {/* League & Featured Badge */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{match.league}</p>
                  <p className="text-xs text-secondary" dir="rtl">{match.leagueAr}</p>
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
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-foreground border border-border">
                    {match.homeCode}
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
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-foreground border border-border">
                    {match.awayCode}
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

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Button 
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 neon-glow-blue"
          >
            View All Matches
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
