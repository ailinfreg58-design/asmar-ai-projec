"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, TrendingUp, AlertCircle, Loader2 } from "lucide-react";
import { Match } from "@/lib/types";

interface AIPredictionModalProps {
  match: Match;
  onClose: () => void;
}

interface Prediction {
  prediction: string;
  confidence: number;
  analysis: string;
  keyFactors: string[];
  suggestedBet: string | null;
}

export function AIPredictionModal({ match, onClose }: AIPredictionModalProps) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            score: `${match.goals.home ?? 0}-${match.goals.away ?? 0}`,
            status: match.fixture.status.long,
            league: match.league.name,
            elapsed: match.fixture.status.elapsed,
          }),
        });

        if (!response.ok) {
          throw new Error("فشل في الحصول على التنبؤ");
        }

        const data = await response.json();
        setPrediction(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [match]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-primary";
    if (confidence >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-bold text-lg">تحليل الذكاء الاصطناعي</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Match Info */}
          <div className="bg-muted rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {match.league.name}
            </p>
            <div className="flex items-center justify-center gap-4">
              <span className="font-medium">{match.teams.home.name}</span>
              <span className="bg-background px-3 py-1 rounded-lg font-bold">
                {match.goals.home ?? 0} - {match.goals.away ?? 0}
              </span>
              <span className="font-medium">{match.teams.away.name}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-muted-foreground">جاري تحليل المباراة...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : prediction ? (
            <>
              {/* Prediction Result */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">التوقع</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp
                      className={`w-4 h-4 ${getConfidenceColor(
                        prediction.confidence
                      )}`}
                    />
                    <span
                      className={`font-bold ${getConfidenceColor(
                        prediction.confidence
                      )}`}
                    >
                      {prediction.confidence}%
                    </span>
                  </div>
                </div>
                <p className="text-xl font-bold text-primary">
                  {prediction.prediction}
                </p>
              </div>

              {/* Analysis */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  التحليل
                </h3>
                <p className="text-foreground leading-relaxed">
                  {prediction.analysis}
                </p>
              </div>

              {/* Key Factors */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  العوامل الرئيسية
                </h3>
                <ul className="space-y-2">
                  {prediction.keyFactors.map((factor, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-foreground"
                    >
                      <span className="text-primary mt-1">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggested Bet */}
              {prediction.suggestedBet && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h3 className="font-semibold text-sm text-yellow-500 mb-1">
                    اقتراح الرهان
                  </h3>
                  <p className="text-foreground">{prediction.suggestedBet}</p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-xs text-muted-foreground text-center pt-2">
                هذا التحليل مقدم من الذكاء الاصطناعي للأغراض الترفيهية فقط
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
