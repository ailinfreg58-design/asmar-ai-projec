"use client"

import { Brain, TrendingUp, Target, Zap, BarChart3, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const analysisFeatures = [
  {
    icon: Brain,
    title: "Neural Predictions",
    titleAr: "توقعات عصبية",
    description: "Advanced machine learning models trained on millions of historical matches for accurate outcome predictions.",
    accuracy: "94.7%",
    color: "primary",
  },
  {
    icon: TrendingUp,
    title: "Trend Analysis",
    titleAr: "تحليل الاتجاهات",
    description: "Real-time market movement tracking with instant alerts on significant odds shifts and betting patterns.",
    accuracy: "Live",
    color: "secondary",
  },
  {
    icon: Target,
    title: "Value Detection",
    titleAr: "كشف القيمة",
    description: "Proprietary algorithms identify undervalued odds across 200+ bookmakers worldwide.",
    accuracy: "87.3%",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    titleAr: "تقييم المخاطر",
    description: "Comprehensive risk analysis for every prediction with detailed confidence intervals.",
    accuracy: "A+",
    color: "secondary",
  },
]

const recentPredictions = [
  { match: "Arsenal vs Chelsea", prediction: "Over 2.5", confidence: 89, result: "won" },
  { match: "Juventus vs Roma", prediction: "BTTS Yes", confidence: 76, result: "won" },
  { match: "Ajax vs PSV", prediction: "Home Win", confidence: 82, result: "pending" },
]

export function AIAnalysis() {
  return (
    <section id="analysis" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-border-green mb-6">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-POWERED</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            AI <span className="text-secondary neon-text-blue">Analysis</span>
          </h2>
          <p className="text-xl text-primary font-semibold" dir="rtl">
            تحليل الذكاء الاصطناعي
          </p>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Harness the power of artificial intelligence for data-driven sports insights and predictions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {analysisFeatures.map((feature, index) => (
            <div
              key={index}
              className={`group glass-card rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] ${
                feature.color === "primary" ? "hover:glow-border-green" : "hover:glow-border-blue"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${
                  feature.color === "primary" ? "bg-primary/20" : "bg-secondary/20"
                }`}>
                  <feature.icon className={`h-6 w-6 ${
                    feature.color === "primary" ? "text-primary" : "text-secondary"
                  }`} />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  feature.color === "primary" 
                    ? "bg-primary/20 text-primary" 
                    : "bg-secondary/20 text-secondary"
                }`}>
                  {feature.accuracy}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">{feature.title}</h3>
              <p className={`text-sm font-medium mb-3 ${
                feature.color === "primary" ? "text-primary" : "text-secondary"
              }`} dir="rtl">
                {feature.titleAr}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Animated Border */}
              <div className={`mt-4 h-1 rounded-full overflow-hidden bg-muted`}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 group-hover:w-full ${
                    feature.color === "primary" ? "bg-primary w-0" : "bg-secondary w-0"
                  }`}
                  style={{ width: feature.accuracy.includes("%") ? feature.accuracy : "100%" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Live Predictions Panel */}
        <div className="glass-card rounded-2xl p-6 md:p-8 glow-border-blue">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-secondary" />
                <h3 className="text-xl font-bold text-foreground">Recent AI Predictions</h3>
              </div>
              <p className="text-sm text-secondary" dir="rtl">أحدث توقعات الذكاء الاصطناعي</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 border-secondary text-secondary hover:bg-secondary/10">
              View All
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentPredictions.map((pred, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    pred.result === "won" ? "bg-primary" : "bg-secondary animate-pulse"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{pred.match}</p>
                    <p className="text-xs text-muted-foreground">{pred.prediction}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{pred.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pred.result === "won" 
                      ? "bg-primary/20 text-primary" 
                      : "bg-secondary/20 text-secondary"
                  }`}>
                    {pred.result === "won" ? "Won" : "Pending"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-green"
            >
              <Zap className="h-5 w-5 mr-2" />
              Get AI Predictions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
