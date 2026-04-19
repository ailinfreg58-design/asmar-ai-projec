import { NextResponse } from "next/server"
import { type NextRequest } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface StandingTeam {
  rank: number
  team: {
    id: number
    name: string
    logo: string
  }
  points: number
  goalsDiff: number
  all: {
    played: number
    win: number
    draw: number
    lose: number
    goals: {
      for: number
      against: number
    }
  }
}

interface APIStandingsResponse {
  response: Array<{
    league: {
      id: number
      name: string
      country: string
      logo: string
      standings: StandingTeam[][]
    }
  }>
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.API_FOOTBALL_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    )
  }

  const searchParams = request.nextUrl.searchParams
  const leagueId = searchParams.get("league") || "39" // Default to Premier League
  const season = searchParams.get("season") || "2024"

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
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

    const data: APIStandingsResponse = await response.json()

    if (!data.response || data.response.length === 0) {
      return NextResponse.json({ standings: [], league: null })
    }

    const leagueData = data.response[0].league
    const standings = leagueData.standings[0].map((team: StandingTeam) => ({
      rank: team.rank,
      teamId: team.team.id,
      teamName: team.team.name,
      teamLogo: team.team.logo,
      played: team.all.played,
      won: team.all.win,
      drawn: team.all.draw,
      lost: team.all.lose,
      goalsFor: team.all.goals.for,
      goalsAgainst: team.all.goals.against,
      goalDifference: team.goalsDiff,
      points: team.points,
    }))

    return NextResponse.json({
      league: {
        id: leagueData.id,
        name: leagueData.name,
        country: leagueData.country,
        logo: leagueData.logo,
      },
      standings,
    })
  } catch (error) {
    console.error("Error fetching standings:", error)
    return NextResponse.json(
      { error: "Failed to fetch standings", standings: [], league: null },
      { status: 500 }
    )
  }
}
