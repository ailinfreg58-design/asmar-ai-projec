'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { 
  LogOut, 
  Activity, 
  Users, 
  TrendingUp, 
  RefreshCw,
  Loader2,
  Calendar,
  Zap,
  BarChart3,
  Settings
} from 'lucide-react'
import type { Match } from '@/lib/types'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [adminEmail, setAdminEmail] = useState('')

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const data = await res.json()
        
        if (data.authenticated) {
          setIsAuthenticated(true)
          setAdminEmail(data.email)
        } else {
          router.push('/admin/login')
        }
      } catch {
        router.push('/admin/login')
      }
    }
    checkAuth()
  }, [router])

  // Fetch matches data
  const { data: matchesData, isLoading, mutate } = useSWR<{ matches: Match[], live: boolean }>(
    isAuthenticated ? '/api/matches' : null,
    fetcher,
    { refreshInterval: 60000 }
  )

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  const matches = matchesData?.matches || []
  const liveMatches = matches.filter(m => m.status.short === 'LIVE' || m.status.short === '1H' || m.status.short === '2H' || m.status.short === 'HT')
  const finishedMatches = matches.filter(m => m.status.short === 'FT')

  const stats = [
    { 
      label: 'المباريات الحية', 
      value: liveMatches.length, 
      icon: Activity, 
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    { 
      label: 'إجمالي المباريات', 
      value: matches.length, 
      icon: Calendar, 
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    { 
      label: 'المنتهية', 
      value: finishedMatches.length, 
      icon: TrendingUp, 
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10'
    },
    { 
      label: 'التنبؤات المتاحة', 
      value: matches.length, 
      icon: Zap, 
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-full w-64 bg-card border-l border-border p-6 hidden lg:block">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">لوحة التحكم</h2>
            <p className="text-xs text-muted-foreground">إدارة المباريات</p>
          </div>
        </div>

        <nav className="space-y-2">
          <a href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary">
            <Activity className="w-5 h-5" />
            الرئيسية
          </a>
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 transition-colors">
            <Users className="w-5 h-5" />
            صفحة المستخدمين
          </a>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted/50 transition-colors">
            <Settings className="w-5 h-5" />
            الإعدادات
          </button>
        </nav>

        <div className="absolute bottom-6 right-6 left-6">
          <div className="bg-muted/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-1">مسجل الدخول كـ</p>
            <p className="text-sm text-foreground font-medium truncate">{adminEmail}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:mr-64 p-6">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-foreground">لوحة التحكم</h1>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg border border-red-500/20 text-red-400"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">مرحباً بك!</h1>
            <p className="text-muted-foreground">إليك ملخص المباريات اليوم</p>
          </div>
          <button
            onClick={() => mutate()}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            تحديث البيانات
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-2xl p-5">
              <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Matches Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">جميع المباريات</h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
              <p className="text-muted-foreground">جاري تحميل المباريات...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">لا توجد مباريات حالياً</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-right px-5 py-3 text-sm font-medium text-muted-foreground">المباراة</th>
                    <th className="text-center px-5 py-3 text-sm font-medium text-muted-foreground">النتيجة</th>
                    <th className="text-center px-5 py-3 text-sm font-medium text-muted-foreground">الحالة</th>
                    <th className="text-center px-5 py-3 text-sm font-medium text-muted-foreground">الدوري</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {matches.map((match) => (
                    <tr key={match.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={match.homeTeam.logo} 
                            alt={match.homeTeam.name}
                            className="w-8 h-8 object-contain"
                          />
                          <span className="text-foreground font-medium">{match.homeTeam.name}</span>
                          <span className="text-muted-foreground">vs</span>
                          <span className="text-foreground font-medium">{match.awayTeam.name}</span>
                          <img 
                            src={match.awayTeam.logo} 
                            alt={match.awayTeam.name}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="px-3 py-1 bg-background rounded-lg font-bold text-foreground">
                          {match.goals.home ?? 0} - {match.goals.away ?? 0}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          match.status.short === 'LIVE' || match.status.short === '1H' || match.status.short === '2H'
                            ? 'bg-green-400/10 text-green-400'
                            : match.status.short === 'HT'
                            ? 'bg-amber-400/10 text-amber-400'
                            : match.status.short === 'FT'
                            ? 'bg-blue-400/10 text-blue-400'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {match.status.long}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <img 
                            src={match.league.logo} 
                            alt={match.league.name}
                            className="w-5 h-5 object-contain"
                          />
                          <span className="text-sm text-muted-foreground">{match.league.name}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
