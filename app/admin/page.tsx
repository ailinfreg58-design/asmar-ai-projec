"use client"

import { useState, useEffect } from "react"
import { 
  Lock, 
  LogOut, 
  Save, 
  Settings, 
  FileText, 
  Key, 
  Megaphone,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { defaultSiteConfig, SiteConfig } from "@/lib/site-config"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState<"texts" | "ads" | "api">("texts")
  
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig)

  // Check authentication on mount
  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/auth")
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      if (data.authenticated) {
        fetchConfig()
      }
    } catch {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  async function fetchConfig() {
    try {
      const res = await fetch("/api/admin/config")
      const data = await res.json()
      setConfig(data)
    } catch {
      console.error("Failed to fetch config")
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (data.success) {
        setIsAuthenticated(true)
        setPassword("")
        fetchConfig()
      } else {
        setError("كلمة المرور غير صحيحة | Invalid password")
      }
    } catch {
      setError("حدث خطأ | An error occurred")
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      setIsAuthenticated(false)
    } catch {
      console.error("Logout failed")
    }
  }

  async function handleSave() {
    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      const data = await res.json()

      if (data.success) {
        setSuccess("تم الحفظ بنجاح | Settings saved successfully")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError("فشل الحفظ | Failed to save")
      }
    } catch {
      setError("حدث خطأ | An error occurred")
    } finally {
      setSaving(false)
    }
  }

  async function handleReset() {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultSiteConfig),
      })
      const data = await res.json()
      if (data.success) {
        setConfig(data.config)
        setSuccess("تمت إعادة التعيين | Reset successful")
        setTimeout(() => setSuccess(""), 3000)
      }
    } catch {
      setError("فشلت إعادة التعيين | Reset failed")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    )
  }

  // Login Page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-8 glow-border-green">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
              <p className="text-muted-foreground mt-2">Admin Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  كلمة المرور | Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="أدخل كلمة المرور"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-green"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    دخول | Login
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">لوحة التحكم</h1>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="text-destructive border-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4 mr-2" />
            خروج
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-primary/20 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span>{success}</span>
          </div>
        )}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-destructive/20 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "texts", label: "النصوص", labelEn: "Texts", icon: FileText },
            { id: "ads", label: "الإعلانات", labelEn: "Ads", icon: Megaphone },
            { id: "api", label: "مفاتيح API", labelEn: "API Keys", icon: Key },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span className="text-xs opacity-70">| {tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass-card rounded-2xl p-6 md:p-8">
          {/* Texts Tab */}
          {activeTab === "texts" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">تعديل النصوص | Edit Texts</h2>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    اسم الموقع (إنجليزي)
                  </label>
                  <input
                    type="text"
                    value={config.siteName}
                    onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    اسم الموقع (عربي)
                  </label>
                  <input
                    type="text"
                    value={config.siteNameAr}
                    onChange={(e) => setConfig({ ...config, siteNameAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    شعار الموقع (إنجليزي)
                  </label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    شعار الموقع (عربي)
                  </label>
                  <input
                    type="text"
                    value={config.taglineAr}
                    onChange={(e) => setConfig({ ...config, taglineAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    عنوان البطل (عربي)
                  </label>
                  <input
                    type="text"
                    value={config.heroTitleAr}
                    onChange={(e) => setConfig({ ...config, heroTitleAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    عنوان مركز المباريات (عربي)
                  </label>
                  <input
                    type="text"
                    value={config.matchCenterTitleAr}
                    onChange={(e) => setConfig({ ...config, matchCenterTitleAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    عنوان التحليل الذكي (عربي)
                  </label>
                  <input
                    type="text"
                    value={config.aiAnalysisTitleAr}
                    onChange={(e) => setConfig({ ...config, aiAnalysisTitleAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    عنوان النشرة (عربي)
                  </label>
                  <input
                    type="text"
                    value={config.newsletterTitleAr}
                    onChange={(e) => setConfig({ ...config, newsletterTitleAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  نص الفوتر (عربي)
                </label>
                <textarea
                  value={config.footerTextAr}
                  onChange={(e) => setConfig({ ...config, footerTextAr: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary min-h-[100px]"
                  dir="rtl"
                />
              </div>
            </div>
          )}

          {/* Ads Tab */}
          {activeTab === "ads" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">إدارة الإعلانات | Manage Ads</h2>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                <div>
                  <p className="font-medium text-foreground">عرض الإعلانات | Show Ads</p>
                  <p className="text-sm text-muted-foreground">تفعيل أو تعطيل الإعلانات على الموقع</p>
                </div>
                <button
                  onClick={() => setConfig({ ...config, showAds: !config.showAds })}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    config.showAds ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      config.showAds ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  كود الإعلانات (Google AdSense أو غيره)
                </label>
                <textarea
                  value={config.adsScript}
                  onChange={(e) => setConfig({ ...config, adsScript: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:border-primary min-h-[150px] font-mono text-sm"
                  placeholder="<!-- أضف كود الإعلانات هنا -->"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground mb-6">إدارة مفاتيح API | API Key Management</h2>
              
              <div className="p-4 rounded-xl bg-secondary/20 border border-secondary/30">
                <div className="flex items-start gap-3">
                  <Key className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">API-Football Key</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      مفتاح API محفوظ بشكل آمن كمتغير بيئي على Vercel
                    </p>
                    <p className="text-xs text-secondary mt-2" dir="ltr">
                      Environment variable: API_FOOTBALL_KEY
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted">
                <p className="text-sm text-muted-foreground">
                  <strong>ملاحظة:</strong> لتحديث مفاتيح API، يرجى الانتقال إلى إعدادات المشروع على Vercel وتعديل المتغيرات البيئية.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Note:</strong> To update API keys, please go to your Vercel project settings and modify the environment variables.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-green"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              حفظ التغييرات | Save
            </Button>
            <Button
              onClick={handleReset}
              disabled={saving}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة تعيين | Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
