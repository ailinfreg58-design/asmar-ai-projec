"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Radio } from "lucide-react";
import { Match } from "@/lib/types";
import { AIPredictionModal } from "./ai-prediction-modal";

interface LiveMatchCardProps {
  match: Match;
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  const [showPrediction, setShowPrediction] = useState(false);

  return (
    <>
      <div className="bg-card rounded-2xl border border-primary/30 p-6 hover:border-primary transition-all duration-300 relative overflow-hidden group">
        {/* Live Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-red-500 font-bold text-sm">LIVE</span>
          <span className="text-primary font-bold text-lg">
            {match.fixture.status.elapsed}&apos;
          </span>
        </div>

        {/* League Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
          <div className="relative w-5 h-5">
            <Image
              src={match.league.logo}
              alt={match.league.name}
              fill
              className="object-contain"
              crossOrigin="anonymous"
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {match.league.name}
          </span>
        </div>

        {/* Main Content */}
        <div className="mt-12 flex items-center justify-between gap-6">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-2 bg-muted/30 rounded-2xl">
              <Image
                src={match.teams.home.logo}
                alt={match.teams.home.name}
                fill
                className="object-contain p-2"
                crossOrigin="anonymous"
              />
            </div>
            <span className="text-base font-bold text-center text-balance line-clamp-2">
              {match.teams.home.name}
            </span>
            {match.teams.home.winner && (
              <span className="text-xs text-primary font-medium">متقدم</span>
            )}
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 px-8 py-4 rounded-2xl">
              <span className="text-4xl sm:text-5xl font-black text-foreground tracking-wider">
                {match.goals.home ?? 0} - {match.goals.away ?? 0}
              </span>
            </div>
            {match.score.halftime.home !== null && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>الشوط الأول:</span>
                <span className="font-medium">
                  {match.score.halftime.home} - {match.score.halftime.away}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">{match.fixture.status.long}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 p-2 bg-muted/30 rounded-2xl">
              <Image
                src={match.teams.away.logo}
                alt={match.teams.away.name}
                fill
                className="object-contain p-2"
                crossOrigin="anonymous"
              />
            </div>
            <span className="text-base font-bold text-center text-balance line-clamp-2">
              {match.teams.away.name}
            </span>
            {match.teams.away.winner && (
              <span className="text-xs text-primary font-medium">متقدم</span>
            )}
          </div>
        </div>

        {/* AI Button */}
        <button
          onClick={() => setShowPrediction(true)}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/40"
        >
          <Sparkles className="w-5 h-5" />
          <span>تحليل الذكاء الاصطناعي</span>
        </button>
      </div>

      {showPrediction && (
        <AIPredictionModal
          match={match}
          onClose={() => setShowPrediction(false)}
        />
      )}
    </>
  );
}
