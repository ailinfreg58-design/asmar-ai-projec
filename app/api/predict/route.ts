import { generateText, Output } from "ai";
import { z } from "zod";

const PredictionSchema = z.object({
  prediction: z.enum(["فوز الفريق المضيف", "تعادل", "فوز الفريق الضيف"]),
  confidence: z.number().min(0).max(100),
  analysis: z.string(),
  keyFactors: z.array(z.string()),
  suggestedBet: z.string().nullable(),
});

export async function POST(req: Request) {
  const { homeTeam, awayTeam, score, status, league, elapsed } =
    await req.json();

  const prompt = `You are an expert football analyst. Analyze this live match and provide a prediction.

Match Details:
- League: ${league}
- Home Team: ${homeTeam}
- Away Team: ${awayTeam}
- Current Score: ${score}
- Match Status: ${status}
- Minutes Elapsed: ${elapsed || "N/A"}

Based on the current score, match status, and the teams involved, provide:
1. Your prediction for the final result
2. Confidence level (0-100%)
3. Brief analysis in Arabic
4. Key factors influencing your prediction (in Arabic)
5. Suggested bet if any (in Arabic, or null if you don't recommend betting)

Be realistic and consider:
- Current score advantage
- Time remaining
- Historical performance of these teams
- League context`;

  const result = await generateText({
    model: "openai/gpt-4o-mini",
    prompt,
    output: Output.object({ schema: PredictionSchema }),
  });

  return Response.json(result.object);
}
