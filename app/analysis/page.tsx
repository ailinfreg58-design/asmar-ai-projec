"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Match } from "@/lib/types";
import {
  Brain,
  TrendingUp,
  Target,
  Shield,
  Swords,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronRight,
  Sparkles,
  Zap,
  Activity,
} from "lucide-react";
import Image from "next/image";

interface AdvancedAnalysis {
  matchOverview: {
    summary: string;
    intensity: string;
    keyMoment: string | null;
  };
  prediction: {
    finalScore: string;
    winner: string;
    confidence: number;
  };
  teamAnalysis: {
    home: {
      strengths: string[];
      weaknesses: string[];
      form: string;
      rating: number;
    };
    away: {
      strengths: string[];
      weaknesses: string[];
      form: string;
      rating: number;
    };
  };
  tacticalAnalysis: {
    homeFormation: string;
    awayFormation: string;
    keyBattles: string[];
    tacticalAdvantage: string;
  };
  statistics: {
    possessionPrediction: { home: number; away: number };
    expectedGoals: { home: number; away: number };
    cornersPrediction: { home: number; away: number };
  };
  bettingInsights: {
    recommendedBets: Array<{
      type: string;
      selection: string;
      confidence: number;
      reasoning: string;
    }>;
    riskLevel: string;
    avoidBets: string[];
  };
  timeline: Array<{
    minute: string;
    event: string;
    probability: number;
  }>;
}

export default function AnalysisPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [analysis, setAnalysis] = useState<AdvancedAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [matchesLoading, setMatchesLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch("/api/matches");
      const data = await res.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setMatchesLoading(false);
    }
  };

  const analyzeMatch = async (match: Match) => {
    setSelectedMatch(match);
    setLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeTeam: match.teams.home.name,
          awayTeam: match.teams.away.name,
          score: `${match.goals.home ?? 0}-${match.goals.away ?? 0}`,
          status: match.fixture.status.long,
          league: match.league.name,
          elapsed: match.fixture.status.elapsed,
          homeLogo: match.teams.home.logo,
          awayLogo: match.teams.away.logo,
        }),
      });

      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      console.error("Error analyzing match:", error);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 70) return "text-primary bg-primary/10";
    if (confidence >= 50) return "text-yellow-500 bg-yellow-500/10";
    return "text-red-500 bg-red-500/10";
  };

  const getRiskColor = (risk: string) => {
    if (risk === "منخفض") return "text-primary bg-primary/10";
    if (risk === "متوسط") return "text-yellow-500 bg-yellow-500/10";
    return "text-red-500 bg-red-500/10";
  };

  const getFormColor = (form: string) => {
    if (form === "ممتاز") return "text-primary";
    if (form === "جيد") return "text-blue-500";
    if (form === "متوسط") return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">تحليل متقدم</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            تحليل المباريات بالذكاء الاصطناعي
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            اختر مباراة للحصول على تحليل شامل يتضمن التوقعات والإحصائيات
            والتحليل التكتيكي
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Matches List */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-4">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                المباريات المتاحة
              </h2>

              {matchesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : matches.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  لا توجد مباريات متاحة حالياً
                </p>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {matches.map((match) => (
                    <button
                      key={match.fixture.id}
                      onClick={() => analyzeMatch(match)}
                      className={`w-full text-right p-4 rounded-xl border transition-all ${
                        selectedMatch?.fixture.id === match.fixture.id
                          ? "bg-primary/10 border-primary"
                          : "bg-muted/50 border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {match.league.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                          {match.fixture.status.short}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Image
                              src={match.teams.home.logo}
                              alt=""
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span className="text-sm font-medium truncate">
                              {match.teams.home.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Image
                              src={match.teams.away.logo}
                              alt=""
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                            <span className="text-sm font-medium truncate">
                              {match.teams.away.name}
                            </span>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-background px-3 py-1 rounded-lg">
                            <span className="font-bold">
                              {match.goals.home ?? 0} - {match.goals.away ?? 0}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="lg:col-span-2">
            {!selectedMatch ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">اختر مباراة للتحليل</h3>
                <p className="text-muted-foreground">
                  اختر مباراة من القائمة للحصول على تحليل شامل من الذكاء
                  الاصطناعي
                </p>
              </div>
            ) : loading ? (
              <div className="bg-card border border-border rounded-2xl p-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <Brain className="w-16 h-16 text-primary" />
                    <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1 animate-pulse" />
                  </div>
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">
                      جاري تحليل المباراة...
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      الذكاء الاصطناعي يحلل جميع جوانب المباراة
                    </p>
                  </div>
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-6">
                {/* Match Header */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {selectedMatch.league.name}
                    </span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        analysis.matchOverview.intensity === "مشتعلة"
                          ? "bg-red-500/20 text-red-500"
                          : analysis.matchOverview.intensity === "عالية"
                          ? "bg-orange-500/20 text-orange-500"
                          : analysis.matchOverview.intensity === "متوسطة"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-blue-500/20 text-blue-500"
                      }`}
                    >
                      حدة {analysis.matchOverview.intensity}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <Image
                        src={selectedMatch.teams.home.logo}
                        alt=""
                        width={64}
                        height={64}
                        className="mx-auto mb-2"
                      />
                      <p className="font-bold">{selectedMatch.teams.home.name}</p>
                      <p
                        className={`text-sm ${getFormColor(
                          analysis.teamAnalysis.home.form
                        )}`}
                      >
                        فورم: {analysis.teamAnalysis.home.form}
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="bg-muted px-6 py-3 rounded-xl mb-2">
                        <span className="text-2xl font-bold">
                          {selectedMatch.goals.home ?? 0} -{" "}
                          {selectedMatch.goals.away ?? 0}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedMatch.fixture.status.long}
                      </p>
                    </div>

                    <div className="text-center">
                      <Image
                        src={selectedMatch.teams.away.logo}
                        alt=""
                        width={64}
                        height={64}
                        className="mx-auto mb-2"
                      />
                      <p className="font-bold">{selectedMatch.teams.away.name}</p>
                      <p
                        className={`text-sm ${getFormColor(
                          analysis.teamAnalysis.away.form
                        )}`}
                      >
                        فورم: {analysis.teamAnalysis.away.form}
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-muted-foreground mt-4">
                    {analysis.matchOverview.summary}
                  </p>
                </div>

                {/* Prediction Card */}
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">توقع الذكاء الاصطناعي</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-card/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        النتيجة المتوقعة
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {analysis.prediction.finalScore}
                      </p>
                    </div>
                    <div className="bg-card/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">الفائز</p>
                      <p className="text-lg font-bold">
                        {analysis.prediction.winner}
                      </p>
                    </div>
                    <div className="bg-card/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">الثقة</p>
                      <p
                        className={`text-2xl font-bold ${
                          analysis.prediction.confidence >= 70
                            ? "text-primary"
                            : analysis.prediction.confidence >= 50
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {analysis.prediction.confidence}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Team Analysis */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Home Team */}
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={selectedMatch.teams.home.logo}
                        alt=""
                        width={32}
                        height={32}
                      />
                      <div>
                        <h4 className="font-bold">
                          {selectedMatch.teams.home.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          تقييم: {analysis.teamAnalysis.home.rating}/10
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-primary font-medium mb-1">
                          نقاط القوة
                        </p>
                        <ul className="space-y-1">
                          {analysis.teamAnalysis.home.strengths.map((s, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-center gap-2"
                            >
                              <CheckCircle className="w-3 h-3 text-primary" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-red-500 font-medium mb-1">
                          نقاط الضعف
                        </p>
                        <ul className="space-y-1">
                          {analysis.teamAnalysis.home.weaknesses.map((w, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-center gap-2"
                            >
                              <XCircle className="w-3 h-3 text-red-500" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={selectedMatch.teams.away.logo}
                        alt=""
                        width={32}
                        height={32}
                      />
                      <div>
                        <h4 className="font-bold">
                          {selectedMatch.teams.away.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          تقييم: {analysis.teamAnalysis.away.rating}/10
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-primary font-medium mb-1">
                          نقاط القوة
                        </p>
                        <ul className="space-y-1">
                          {analysis.teamAnalysis.away.strengths.map((s, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-center gap-2"
                            >
                              <CheckCircle className="w-3 h-3 text-primary" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-red-500 font-medium mb-1">
                          نقاط الضعف
                        </p>
                        <ul className="space-y-1">
                          {analysis.teamAnalysis.away.weaknesses.map((w, i) => (
                            <li
                              key={i}
                              className="text-sm flex items-center gap-2"
                            >
                              <XCircle className="w-3 h-3 text-red-500" />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tactical Analysis */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Swords className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">التحليل التكتيكي</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        تشكيلة {selectedMatch.teams.home.name}
                      </p>
                      <p className="text-xl font-bold">
                        {analysis.tacticalAnalysis.homeFormation}
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        تشكيلة {selectedMatch.teams.away.name}
                      </p>
                      <p className="text-xl font-bold">
                        {analysis.tacticalAnalysis.awayFormation}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      المعارك الرئيسية
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.tacticalAnalysis.keyBattles.map((battle, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {battle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-primary/10 rounded-xl p-4">
                    <p className="text-sm text-primary font-medium">
                      الأفضلية التكتيكية
                    </p>
                    <p className="text-foreground">
                      {analysis.tacticalAnalysis.tacticalAdvantage}
                    </p>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">الإحصائيات المتوقعة</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Possession */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{analysis.statistics.possessionPrediction.home}%</span>
                        <span className="text-muted-foreground">الاستحواذ</span>
                        <span>{analysis.statistics.possessionPrediction.away}%</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary"
                          style={{
                            width: `${analysis.statistics.possessionPrediction.home}%`,
                          }}
                        />
                        <div
                          className="bg-muted"
                          style={{
                            width: `${analysis.statistics.possessionPrediction.away}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Expected Goals */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{analysis.statistics.expectedGoals.home.toFixed(1)}</span>
                        <span className="text-muted-foreground">
                          الأهداف المتوقعة (xG)
                        </span>
                        <span>{analysis.statistics.expectedGoals.away.toFixed(1)}</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary"
                          style={{
                            width: `${
                              (analysis.statistics.expectedGoals.home /
                                (analysis.statistics.expectedGoals.home +
                                  analysis.statistics.expectedGoals.away)) *
                              100
                            }%`,
                          }}
                        />
                        <div
                          className="bg-muted"
                          style={{
                            width: `${
                              (analysis.statistics.expectedGoals.away /
                                (analysis.statistics.expectedGoals.home +
                                  analysis.statistics.expectedGoals.away)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Corners */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>{analysis.statistics.cornersPrediction.home}</span>
                        <span className="text-muted-foreground">الركنيات المتوقعة</span>
                        <span>{analysis.statistics.cornersPrediction.away}</span>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary"
                          style={{
                            width: `${
                              (analysis.statistics.cornersPrediction.home /
                                (analysis.statistics.cornersPrediction.home +
                                  analysis.statistics.cornersPrediction.away)) *
                              100
                            }%`,
                          }}
                        />
                        <div
                          className="bg-muted"
                          style={{
                            width: `${
                              (analysis.statistics.cornersPrediction.away /
                                (analysis.statistics.cornersPrediction.home +
                                  analysis.statistics.cornersPrediction.away)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Betting Insights */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-lg">نصائح المراهنات</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getRiskColor(
                        analysis.bettingInsights.riskLevel
                      )}`}
                    >
                      مخاطرة {analysis.bettingInsights.riskLevel}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    {analysis.bettingInsights.recommendedBets.map((bet, i) => (
                      <div
                        key={i}
                        className="bg-muted/50 rounded-xl p-4 border-r-4 border-primary"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{bet.type}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${getConfidenceColor(
                              bet.confidence
                            )}`}
                          >
                            {bet.confidence}% ثقة
                          </span>
                        </div>
                        <p className="text-primary font-bold mb-1">
                          {bet.selection}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {bet.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>

                  {analysis.bettingInsights.avoidBets.length > 0 && (
                    <div className="bg-red-500/10 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-red-500 font-medium">
                          تجنب هذه الرهانات
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {analysis.bettingInsights.avoidBets.map((bet, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {bet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg">الأحداث المتوقعة</h3>
                  </div>

                  <div className="space-y-3">
                    {analysis.timeline.map((event, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-muted/50 rounded-xl p-3"
                      >
                        <div className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm min-w-[60px] text-center">
                          {event.minute}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{event.event}</p>
                        </div>
                        <div
                          className={`text-sm px-2 py-0.5 rounded-full ${
                            event.probability >= 70
                              ? "bg-primary/20 text-primary"
                              : event.probability >= 50
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {event.probability}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-muted-foreground">
                  هذا التحليل مقدم من الذكاء الاصطناعي للأغراض الترفيهية والتعليمية
                  فقط. المراهنة تنطوي على مخاطر ويجب الرهان بمسؤولية.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
