import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(session.value, 'base64').toString('utf-8')
    )
    
    // Check if session is expired (24 hours)
    if (Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ 
      authenticated: true, 
      email: decoded.email 
    })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
