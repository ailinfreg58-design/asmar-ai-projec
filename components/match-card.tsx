"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Clock, Trophy } from "lucide-react";
import { Match } from "@/lib/types";
import { AIPredictionModal } from "./ai-prediction-modal";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const [showPrediction, setShowPrediction] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "1H":
      case "2H":
        return "bg-primary/20 text-primary";
      case "HT":
        return "bg-yellow-500/20 text-yellow-500";
      case "FT":
        return "bg-muted-foreground/20 text-muted-foreground";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-4 hover:border-primary/50 transition-all duration-300 group">
        {/* League Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <div className="relative w-5 h-5">
            {match.league.logo && (
              <Image
                src={match.league.logo}
                alt={match.league.name}
                fill
                className="object-contain"
                unoptimized
              />
            )}
          </div>
          <span className="text-sm text-muted-foreground font-medium">
            {match.league.name}
          </span>
          <span className="text-xs text-muted-foreground/60">
            {match.league.country}
          </span>
          <div className="mr-auto">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                match.fixture.status.short
              )}`}
            >
              {match.fixture.status.elapsed
                ? `${match.fixture.status.elapsed}'`
                : match.fixture.status.short}
            </span>
          </div>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              {match.teams.home.logo && (
                <Image
                  src={match.teams.home.logo}
                  alt={match.teams.home.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <span className="text-sm font-medium text-center text-balance line-clamp-2">
              {match.teams.home.name}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-muted px-4 py-2 rounded-lg">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                {match.goals.home ?? 0} - {match.goals.away ?? 0}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{match.fixture.status.long}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              {match.teams.away.logo && (
                <Image
                  src={match.teams.away.logo}
                  alt={match.teams.away.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>
            <span className="text-sm font-medium text-center text-balance line-clamp-2">
              {match.teams.away.name}
            </span>
          </div>
        </div>

        {/* AI Analysis Button */}
        <button
          onClick={() => setShowPrediction(true)}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-4 rounded-lg transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/20"
        >
          <Sparkles className="w-4 h-4" />
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
