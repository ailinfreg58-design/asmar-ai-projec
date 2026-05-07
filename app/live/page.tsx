"use client";

import { useEffect, useState, useCallback } from "react";
import { Radio, RefreshCw, Wifi, WifiOff, Clock } from "lucide-react";
import { Match } from "@/lib/types";
import { LiveMatchCard } from "@/components/live-match-card";
import Link from "next/link";

export default function LivePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  const fetchLiveMatches = useCallback(async () => {
    try {
      const response = await fetch("/api/matches?live=true");
      if (!response.ok) throw new Error("فشل في جلب المباريات");
      const data = await response.json();
      
      // Filter only live matches
      const liveMatches = data.matches.filter((match: Match) => 
        ["1H", "2H", "HT", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(match.fixture.status.short)
      );
      
      setMatches(liveMatches);
      setLastUpdate(new Date());
      setIsConnected(true);
      setError(null);
    } catch (err) {
      setError("حدث خطأ في جلب المباريات الحية");
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [fetchLiveMatches]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Radio className="w-8 h-8 text-red-500" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold">المباريات الحية</h1>
                <p className="text-xs text-muted-foreground">تحديث تلقائي كل 30 ثانية</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-primary" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-xs ${isConnected ? "text-primary" : "text-red-500"}`}>
                  {isConnected ? "متصل" : "غير متصل"}
                </span>
              </div>

              {/* Last Update */}
              {lastUpdate && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">{formatTime(lastUpdate)}</span>
                </div>
              )}

              {/* Refresh Button */}
              <button
                onClick={fetchLiveMatches}
                disabled={loading}
                className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span className="text-sm font-medium">تحديث</span>
              </button>

              {/* Back to Home */}
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

      {/* Live Stats Bar */}
      <div className="bg-primary/5 border-b border-primary/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm font-medium">{matches.length} مباراة حية الآن</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="text-sm text-muted-foreground">
              متابعة مباشرة للمباريات مع تحليلات الذكاء الاصطناعي
            </div>
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
            <p className="mt-4 text-muted-foreground">جاري البحث عن المباريات الحية...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <WifiOff className="w-16 h-16 text-red-500/50 mb-4" />
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={fetchLiveMatches}
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
            <h2 className="text-xl font-bold mb-2">لا توجد مباريات حية حالياً</h2>
            <p className="text-muted-foreground text-center max-w-md">
              لا توجد مباريات جارية في الوقت الحالي. تحقق لاحقاً أو تصفح جميع المباريات.
            </p>
            <Link
              href="/"
              className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg transition-colors font-medium"
            >
              عرض جميع المباريات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {matches.map((match) => (
              <LiveMatchCard key={match.fixture.id} match={match} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>تحديث تلقائي للنتائج كل 30 ثانية - تحليلات الذكاء الاصطناعي مدعومة</p>
        </div>
      </footer>
    </div>
  );
}
