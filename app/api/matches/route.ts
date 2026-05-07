import { NextResponse } from "next/server";

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

export async function GET() {
  if (!API_KEY) {
    // Return demo data if no API key
    return NextResponse.json({
      response: getDemoMatches(),
    });
  }

  try {
    const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
      headers: {
        "x-apisports-key": API_KEY,
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch matches");
    }

    const data = await response.json();
    
    // If no live matches, return demo data
    if (!data.response || data.response.length === 0) {
      return NextResponse.json({
        response: getDemoMatches(),
        isDemo: true,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json({
      response: getDemoMatches(),
      isDemo: true,
    });
  }
}

function getDemoMatches() {
  return [
    {
      fixture: {
        id: 1,
        referee: "Ahmad Hassan",
        timezone: "UTC",
        date: new Date().toISOString(),
        timestamp: Date.now(),
        status: { long: "First Half", short: "1H", elapsed: 35 },
      },
      league: {
        id: 39,
        name: "Premier League",
        country: "England",
        logo: "https://media.api-sports.io/football/leagues/39.png",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
      teams: {
        home: {
          id: 33,
          name: "Manchester United",
          logo: "https://media.api-sports.io/football/teams/33.png",
          winner: null,
        },
        away: {
          id: 40,
          name: "Liverpool",
          logo: "https://media.api-sports.io/football/teams/40.png",
          winner: null,
        },
      },
      goals: { home: 2, away: 1 },
      score: {
        halftime: { home: 2, away: 1 },
        fulltime: { home: null, away: null },
      },
    },
    {
      fixture: {
        id: 2,
        referee: "Mohamed Ali",
        timezone: "UTC",
        date: new Date().toISOString(),
        timestamp: Date.now(),
        status: { long: "Second Half", short: "2H", elapsed: 67 },
      },
      league: {
        id: 140,
        name: "La Liga",
        country: "Spain",
        logo: "https://media.api-sports.io/football/leagues/140.png",
        flag: "https://media.api-sports.io/flags/es.svg",
      },
      teams: {
        home: {
          id: 529,
          name: "Barcelona",
          logo: "https://media.api-sports.io/football/teams/529.png",
          winner: true,
        },
        away: {
          id: 541,
          name: "Real Madrid",
          logo: "https://media.api-sports.io/football/teams/541.png",
          winner: false,
        },
      },
      goals: { home: 3, away: 2 },
      score: {
        halftime: { home: 1, away: 1 },
        fulltime: { home: null, away: null },
      },
    },
    {
      fixture: {
        id: 3,
        referee: "Khaled Omar",
        timezone: "UTC",
        date: new Date().toISOString(),
        timestamp: Date.now(),
        status: { long: "Halftime", short: "HT", elapsed: 45 },
      },
      league: {
        id: 135,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/135.png",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
      teams: {
        home: {
          id: 489,
          name: "AC Milan",
          logo: "https://media.api-sports.io/football/teams/489.png",
          winner: null,
        },
        away: {
          id: 496,
          name: "Juventus",
          logo: "https://media.api-sports.io/football/teams/496.png",
          winner: null,
        },
      },
      goals: { home: 1, away: 1 },
      score: {
        halftime: { home: 1, away: 1 },
        fulltime: { home: null, away: null },
      },
    },
    {
      fixture: {
        id: 4,
        referee: "Youssef Farid",
        timezone: "UTC",
        date: new Date().toISOString(),
        timestamp: Date.now(),
        status: { long: "First Half", short: "1H", elapsed: 22 },
      },
      league: {
        id: 78,
        name: "Bundesliga",
        country: "Germany",
        logo: "https://media.api-sports.io/football/leagues/78.png",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
      teams: {
        home: {
          id: 157,
          name: "Bayern Munich",
          logo: "https://media.api-sports.io/football/teams/157.png",
          winner: true,
        },
        away: {
          id: 165,
          name: "Borussia Dortmund",
          logo: "https://media.api-sports.io/football/teams/165.png",
          winner: false,
        },
      },
      goals: { home: 1, away: 0 },
      score: {
        halftime: { home: null, away: null },
        fulltime: { home: null, away: null },
      },
    },
  ];
}
