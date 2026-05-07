"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Radio, Clock, MapPin } from "lucide-react";
import { Match } from "@/lib/types";
import { AIPredictionModal } from "./ai-prediction-modal";

interface LiveMatchCardProps {
  match: Match;
}

export function LiveMatchCard({ match }: LiveMatchCardProps) {
  const [showPrediction, setShowPrediction] = useState(false);

  const isLive = ["1H", "2H", "HT", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(
    match.fixture.status.short
  );
  
  const isFinished = ["FT", "AET", "PEN"].includes(match.fixture.status.short);
  const isScheduled = ["NS", "TBD", "PST"].includes(match.fixture.status.short);

  const formatMatchTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <>
      <div className={`bg-card rounded-2xl border p-6 hover:border-primary transition-all duration-300 relative overflow-hidden group ${
        isLive ? "border-red-500/50" : isFinished ? "border-muted" : "border-primary/30"
      }`}>
        {/* Status Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          {isLive ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-500 font-bold text-sm">LIVE</span>
              <span className="text-primary font-bold text-lg">
                {match.fixture.status.elapsed}&apos;
              </span>
            </>
          ) : isFinished ? (
            <span className="bg-muted px-3 py-1 rounded-full text-muted-foreground font-medium text-sm">
              انتهت
            </span>
          ) : isScheduled ? (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold text-sm">
                {formatMatchTime(match.fixture.date)}
              </span>
            </div>
          ) : (
            <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full font-medium text-sm">
              {match.fixture.status.long}
            </span>
          )}
        </div>

        {/* League Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
          {match.league.logo && (
            <div className="relative w-5 h-5">
              <Image
                src={match.league.logo}
                alt={match.league.name}
                fill
                className="object-contain"
                crossOrigin="anonymous"
                unoptimized
              />
            </div>
          )}
          <span className="text-xs text-muted-foreground font-medium line-clamp-1 max-w-[100px]">
            {match.league.name}
          </span>
        </div>

        {/* Date for scheduled matches */}
        {isScheduled && (
          <div className="absolute top-12 left-4 text-xs text-muted-foreground">
            {formatMatchDate(match.fixture.date)}
          </div>
        )}

        {/* Main Content */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 p-2 bg-muted/30 rounded-2xl">
              {match.teams.home.logo ? (
                <Image
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  fill
                  className="object-contain p-2"
                  crossOrigin="anonymous"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {match.teams.home.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm font-bold text-center text-balance line-clamp-2">
              {match.teams.home.name}
            </span>
            {match.teams.home.winner && isLive && (
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">متقدم</span>
            )}
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-3">
            {isScheduled ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl sm:text-4xl font-black text-muted-foreground">VS</span>
                <span className="text-sm text-muted-foreground">{formatMatchTime(match.fixture.date)}</span>
              </div>
            ) : (
              <>
                <div className={`px-6 py-3 rounded-2xl ${
                  isLive 
                    ? "bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30" 
                    : "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
                }`}>
                  <span className="text-3xl sm:text-4xl font-black text-foreground tracking-wider">
                    {match.goals.home ?? 0} - {match.goals.away ?? 0}
                  </span>
                </div>
                {match.score.halftime.home !== null && (
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <span>ش.أ:</span>
                    <span className="font-medium">
                      {match.score.halftime.home} - {match.score.halftime.away}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  {isLive && <Radio className="w-3 h-3 text-red-500 animate-pulse" />}
                  <span className="text-xs font-medium">{match.fixture.status.long}</span>
                </div>
              </>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 p-2 bg-muted/30 rounded-2xl">
              {match.teams.away.logo ? (
                <Image
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  fill
                  className="object-contain p-2"
                  crossOrigin="anonymous"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  {match.teams.away.name.charAt(0)}
                </div>
              )}
            </div>
            <span className="text-sm font-bold text-center text-balance line-clamp-2">
              {match.teams.away.name}
            </span>
            {match.teams.away.winner && isLive && (
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">متقدم</span>
            )}
          </div>
        </div>

        {/* Venue */}
        {match.fixture.venue?.name && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{match.fixture.venue.name}</span>
          </div>
        )}

        {/* AI Button */}
        <button
          onClick={() => setShowPrediction(true)}
          className={`mt-4 w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-200 ${
            isLive
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
              : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>{isScheduled ? "تحليل ما قبل المباراة" : "تحليل الذكاء الاصطناعي"}</span>
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
