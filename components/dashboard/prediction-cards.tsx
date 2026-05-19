import { Sparkles } from "lucide-react";

type Prediction = {
  id: string;
  title: string;
  prediction: string;
  confidence: number;
  urgency: string;
};

export function PredictionCards({ predictions }: { predictions: Prediction[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {predictions.map((item) => (
        <article key={item.id} className="glass rounded-2xl p-4">
          <div className="mb-2 flex items-center gap-2 text-cyan-200">
            <Sparkles className="h-4 w-4" />
            <p className="text-xs uppercase tracking-[0.2em]">AI Insight</p>
          </div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-neon-100/85">{item.prediction}</p>
          <div className="mt-4 flex justify-between text-xs text-neon-100/70">
            <span>Confidence {item.confidence}%</span>
            <span>{item.urgency}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
