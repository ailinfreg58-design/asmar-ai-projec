import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface APIFixture {
  fixture: {
    id: number
    date: string
    status: {
      short: string
    }
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
  }
  teams: {
    home: {
      id: number
      name: string
      logo: string
    }
    away: {
      id: number
      name: string
      logo: string
    }
  }
}

// League name translations to Arabic
const leagueTranslations: Record<string, string> = {
  "Premier League": "الدوري الإنجليزي الممتاز",
  "La Liga": "الدوري الإسباني",
  "Serie A": "الدوري الإيطالي",
  "Bundesliga": "الدوري الألماني",
  "Ligue 1": "الدوري الفرنسي",
  "UEFA Champions League": "دوري أبطال أوروبا",
  "UEFA Europa League": "الدوري الأوروبي",
  "Saudi Pro League": "دوري روشن السعودي",
  "Egyptian Premier League": "الدوري المصري",
  "FIFA World Cup": "كأس العالم",
}

function getTeamCode(teamName: string): string {
  const words = teamName.split(" ")
  if (words.length === 1) {
    return teamName.substring(0, 3).toUpperCase()
  }
  return words
    .map((word) => word[0])
    .join("")
    .substring(0, 3)
    .toUpperCase()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export async function GET() {
  const apiKey = process.env.API_FOOTBALL_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    )
  }

  try {
    // Get today's date and next 7 days
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)

    const fromDate = today.toISOString().split("T")[0]
    const toDate = nextWeek.toISOString().split("T")[0]

    // Fetch fixtures from top leagues
    const topLeagues = [39, 140, 135, 78, 61, 2, 3, 307, 233] // Premier League, La Liga, Serie A, Bundesliga, Ligue 1, UCL, UEL, Saudi Pro League, Egyptian League
    
    const allFixtures: APIFixture[] = []
    
    for (const leagueId of topLeagues.slice(0, 5)) { // Limit to 5 leagues to avoid rate limits
      const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=${leagueId}&from=${fromDate}&to=${toDate}&status=NS`,
        {
          headers: {
            "x-apisports-key": apiKey,
          },
          cache: "no-store",
        }
      )

      if (response.ok) {
        const data = await response.json()
        allFixtures.push(...(data.response || []))
      }
    }

    // Sort by date and take first 6
    const sortedFixtures = allFixtures
      .sort(
        (a, b) =>
          new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
      )
      .slice(0, 6)

    const upcomingMatches = sortedFixtures.map((match, index) => ({
      id: match.fixture.id,
      league: match.league.name,
      leagueAr: leagueTranslations[match.league.name] || match.league.name,
      leagueLogo: match.league.logo,
      homeTeam: match.teams.home.name,
      homeCode: getTeamCode(match.teams.home.name),
      homeLogo: match.teams.home.logo,
      awayTeam: match.teams.away.name,
      awayCode: getTeamCode(match.teams.away.name),
      awayLogo: match.teams.away.logo,
      date: formatDate(match.fixture.date),
      time: formatTime(match.fixture.date),
      // Generate mock odds for demo (real odds would require a different API)
      odds: {
        home: parseFloat((1.5 + Math.random() * 2).toFixed(2)),
        draw: parseFloat((2.5 + Math.random() * 2).toFixed(2)),
        away: parseFloat((2 + Math.random() * 3).toFixed(2)),
      },
      isFeatured: index % 3 === 0,
    }))

    return NextResponse.json({ matches: upcomingMatches })
  } catch (error) {
    console.error("Error fetching fixtures:", error)
    return NextResponse.json(
      { error: "Failed to fetch fixtures", matches: [] },
      { status: 500 }
    )
  }
}
