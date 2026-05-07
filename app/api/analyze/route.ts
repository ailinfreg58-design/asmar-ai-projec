import { generateText, Output } from "ai";
import { z } from "zod";

const AdvancedAnalysisSchema = z.object({
  matchOverview: z.object({
    summary: z.string(),
    intensity: z.enum(["منخفضة", "متوسطة", "عالية", "مشتعلة"]),
    keyMoment: z.string().nullable(),
  }),
  prediction: z.object({
    finalScore: z.string(),
    winner: z.enum(["الفريق المضيف", "تعادل", "الفريق الضيف"]),
    confidence: z.number().min(0).max(100),
  }),
  teamAnalysis: z.object({
    home: z.object({
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      form: z.enum(["ممتاز", "جيد", "متوسط", "ضعيف"]),
      rating: z.number().min(1).max(10),
    }),
    away: z.object({
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      form: z.enum(["ممتاز", "جيد", "متوسط", "ضعيف"]),
      rating: z.number().min(1).max(10),
    }),
  }),
  tacticalAnalysis: z.object({
    homeFormation: z.string(),
    awayFormation: z.string(),
    keyBattles: z.array(z.string()),
    tacticalAdvantage: z.string(),
  }),
  statistics: z.object({
    possessionPrediction: z.object({
      home: z.number(),
      away: z.number(),
    }),
    expectedGoals: z.object({
      home: z.number(),
      away: z.number(),
    }),
    cornersPrediction: z.object({
      home: z.number(),
      away: z.number(),
    }),
  }),
  bettingInsights: z.object({
    recommendedBets: z.array(
      z.object({
        type: z.string(),
        selection: z.string(),
        confidence: z.number(),
        reasoning: z.string(),
      })
    ),
    riskLevel: z.enum(["منخفض", "متوسط", "عالي"]),
    avoidBets: z.array(z.string()),
  }),
  timeline: z.array(
    z.object({
      minute: z.string(),
      event: z.string(),
      probability: z.number(),
    })
  ),
});

export async function POST(req: Request) {
  const { homeTeam, awayTeam, score, status, league, elapsed, homelogo, awayLogo } =
    await req.json();

  const prompt = `أنت محلل كرة قدم خبير ومتخصص في التحليل التكتيكي والإحصائي. قم بتحليل هذه المباراة بشكل شامل ومفصل.

تفاصيل المباراة:
- البطولة: ${league}
- الفريق المضيف: ${homeTeam}
- الفريق الضيف: ${awayTeam}
- النتيجة الحالية: ${score}
- حالة المباراة: ${status}
- الدقيقة: ${elapsed || "لم تبدأ"}

قدم تحليلاً شاملاً يتضمن:

1. نظرة عامة على المباراة (ملخص، حدة المباراة، اللحظة المفصلية)

2. التوقع النهائي (النتيجة المتوقعة، الفائز، نسبة الثقة)

3. تحليل الفريقين:
   - نقاط القوة والضعف لكل فريق
   - مستوى الفورم الحالي
   - تقييم من 1-10

4. التحليل التكتيكي:
   - التشكيل المتوقع لكل فريق
   - المعارك الرئيسية في الملعب
   - الأفضلية التكتيكية

5. الإحصائيات المتوقعة:
   - الاستحواذ
   - الأهداف المتوقعة (xG)
   - الركنيات المتوقعة

6. نصائح للمراهنات:
   - الرهانات الموصى بها مع الثقة والسبب
   - مستوى المخاطرة
   - الرهانات التي يجب تجنبها

7. الجدول الزمني المتوقع:
   - أحداث متوقعة مع الدقيقة والاحتمالية

كن واقعياً ومحترفاً في تحليلك. جميع النصوص يجب أن تكون بالعربية.`;

  const result = await generateText({
    model: "openai/gpt-4o-mini",
    prompt,
    output: Output.object({ schema: AdvancedAnalysisSchema }),
  });

  return Response.json(result.object);
}
