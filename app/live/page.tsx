"use client";

import { useEffect, useState, useCallback } from "react";
import { Radio, RefreshCw, Wifi, WifiOff, Clock, Calendar, Trophy } from "lucide-react";
import { Match } from "@/lib/types";
import { LiveMatchCard } from "@/components/live-match-card";
import Link from "next/link";

type ViewType = "live" | "today" | "upcoming";

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [viewType, setViewType] = useState<ViewType>("live");
  const [message, setMessage] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const fetchMatches = useCallback(async (type: ViewType = viewType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/matches?type=${type}`);
      if (!response.ok) throw new Error("فشل في جلب المباريات");
      const data = await response.json();
      
      setMatches(data.response || []);
      setLastUpdate(new Date());
      setIsConnected(true);
      setError(null);
      setMessage(data.message || null);
      setIsDemo(data.isDemo || false);
    } catch (err) {
      setError("حدث خطأ في جلب المباريات");
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, [viewType]);

  useEffect(() => {
    fetchMatches(viewType);
    const interval = setInterval(() => fetchMatches(viewType), 30000);
    return () => clearInterval(interval);
  }, [viewType, fetchMatches]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const liveStatuses = ["1H", "2H", "HT", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
    if (liveStatuses.includes(status)) return "text-red-500";
    if (status === "FT" || status === "AET" || status === "PEN") return "text-muted-foreground";
    return "text-primary";
  };

  const isLiveMatch = (match: Match) => {
    const liveStatuses = ["1H", "2H", "HT", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
    return liveStatuses.includes(match.fixture.status.short);
  };

  const liveCount = matches.filter(isLiveMatch).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Radio className="w-8 h-8 text-red-500" />
                {liveCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold">المباريات</h1>
                <p className="text-xs text-muted-foreground">تحديث تلقائي كل 30 ثانية</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isConnected ? (
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary">متصل</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <WifiOff className="w-4 h-4 text-red-500" />
                  <span className="text-xs text-red-500">غير متصل</span>
                </div>
              )}

              {lastUpdate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">{formatTime(lastUpdate)}</span>
                </div>
              )}

              <button
                onClick={() => fetchMatches(viewType)}
                disabled={loading}
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span className="text-sm font-medium hidden sm:inline">تحديث</span>
              </button>

              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* View Type Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 py-2">
            <button
              onClick={() => setViewType("live")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewType === "live"
                  ? "bg-red-500/10 text-red-500"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`${viewType === "live" ? "animate-ping" : ""} absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75`}></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="font-medium">مباشر</span>
              {liveCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {liveCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setViewType("today")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewType === "today"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="font-medium">اليوم</span>
            </button>

            <button
              onClick={() => setViewType("upcoming")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                viewType === "upcoming"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span className="font-medium">القادمة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Banner */}
      {(message || isDemo) && (
        <div className={`py-2 px-4 text-center text-sm ${isDemo ? "bg-yellow-500/10 text-yellow-500" : "bg-primary/10 text-primary"}`}>
          {message || "عرض بيانات تجريبية"}
        </div>
      )}

      {/* Stats Bar */}
      <div className="bg-primary/5 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{matches.length} مباراة</span>
            </div>
            {liveCount > 0 && viewType !== "live" && (
              <>
                <div className="h-4 w-px bg-border"></div>
                <div className="flex items-center gap-2 text-red-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-sm font-medium">{liveCount} حية الآن</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <Radio className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
            </div>
            <p className="mt-4 text-muted-foreground">جاري جلب المباريات...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <WifiOff className="w-16 h-16 text-red-500/50 mb-4" />
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => fetchMatches(viewType)}
              className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-muted/50 rounded-full p-6 mb-4">
              <Radio className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">لا توجد مباريات</h2>
            <p className="text-muted-foreground text-center max-w-md">
              {viewType === "live" 
                ? "لا توجد مباريات حية حالياً. جرب عرض مباريات اليوم أو المباريات القادمة."
                : "لا توجد مباريات متاحة في هذا القسم."}
            </p>
            {viewType === "live" && (
              <button
                onClick={() => setViewType("today")}
                className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors font-medium"
              >
                عرض مباريات اليوم
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matches.map((match) => (
              <LiveMatchCard 
                key={match.fixture.id} 
                match={match}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>تحديث تلقائي للنتائج كل 30 ثانية - البيانات من API-Football</p>
        </div>
      </footer>
    </div>
  );
}
