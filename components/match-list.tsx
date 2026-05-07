"use client";

import useSWR from "swr";
import { Match } from "@/lib/types";
import { MatchCard } from "./match-card";
import { Loader2, WifiOff, RefreshCw } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MatchList() {
  const { data, error, isLoading, mutate } = useSWR("/api/matches", fetcher, {
    refreshInterval: 60000, // Refresh every minute
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
        <p className="text-muted-foreground">لا توجد مباريات حية حالياً</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.isDemo && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-center">
          <p className="text-sm text-yellow-500">
            وضع العرض التجريبي - لا توجد مباريات حية حالياً
          </p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.fixture.id} match={match} />
        ))}
      </div>
      <div className="text-center pt-4">
        <button
          onClick={() => mutate()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          تحديث المباريات
        </button>
      </div>
    </div>
  );
}
