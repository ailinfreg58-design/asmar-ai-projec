import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface APIFixture {
  fixture: {
    id: number
    status: {
      short: string
      elapsed: number | null
    }
  }
  league: {
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
  goals: {
    home: number | null
    away: number | null
  }
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
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": apiKey,
        },
        cache: "no-store",
      }
    )

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data = await response.json()
    
    const liveMatches = (data.response || []).map((match: APIFixture) => ({
      id: match.fixture.id,
      league: match.league.name,
      leagueLogo: match.league.logo,
      homeTeam: match.teams.home.name,
      homeLogo: match.teams.home.logo,
      awayTeam: match.teams.away.name,
      awayLogo: match.teams.away.logo,
      homeScore: match.goals.home ?? 0,
      awayScore: match.goals.away ?? 0,
      minute: match.fixture.status.elapsed ?? 0,
      status: match.fixture.status.short,
    }))

    return NextResponse.json({ matches: liveMatches })
  } catch (error) {
    console.error("Error fetching live matches:", error)
    return NextResponse.json(
      { error: "Failed to fetch live matches", matches: [] },
      { status: 500 }
    )
  }
}
