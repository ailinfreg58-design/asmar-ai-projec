"use client";

import useSWR from "swr";
import { Match } from "@/lib/types";
import { MatchCard } from "./match-card";
import { Loader2, WifiOff, RefreshCw, Calendar, Radio } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MatchList() {
  const { data, error, isLoading, mutate } = useSWR("/api/matches", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground">جاري تحميل المباريات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <WifiOff className="w-10 h-10 text-destructive" />
        <p className="text-muted-foreground">حدث خطأ في تحميل المباريات</p>
        <button
          onClick={() => mutate()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const matches: Match[] = data?.response || [];

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Calendar className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">لا توجد مباريات متاحة حالياً</p>
        <button
          onClick={() => mutate()}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          إعادة التحميل
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Status Banner */}
      {data?.isLive && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center justify-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <Radio className="w-4 h-4 text-red-500" />
          <p className="text-sm text-red-500 font-medium">
            مباريات حية الآن - {matches.length} مباراة
          </p>
        </div>
      )}
      
      {data?.isToday && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <p className="text-sm text-blue-500 font-medium">
            {data.message || `مباريات اليوم - ${matches.length} مباراة`}
          </p>
        </div>
      )}
      
      {data?.isDemo && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
          <p className="text-sm text-yellow-500">
            {data.message || "وضع العرض التجريبي - لا توجد مباريات حية حالياً"}
          </p>
        </div>
      )}

      {/* Matches Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          عرض {matches.length} مباراة
        </p>
        <button
          onClick={() => mutate()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          تحديث
        </button>
      </div>

      {/* Matches Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.slice(0, 12).map((match) => (
          <MatchCard key={match.fixture.id} match={match} />
        ))}
      </div>

      {matches.length > 12 && (
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            و {matches.length - 12} مباراة أخرى - اذهب لصفحة Live لرؤية الكل
          </p>
        </div>
      )}
    </div>
  );
}
