import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { defaultSiteConfig, SiteConfig } from "@/lib/site-config"

// In-memory storage for demo (in production, use a database)
let siteConfig: SiteConfig = { ...defaultSiteConfig }

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin_session")
  return session?.value === "authenticated"
}

export async function GET() {
  return NextResponse.json(siteConfig)
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    siteConfig = { ...siteConfig, ...body }
    
    return NextResponse.json({ success: true, config: siteConfig })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    siteConfig = { ...defaultSiteConfig, ...body }
    
    return NextResponse.json({ success: true, config: siteConfig })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
