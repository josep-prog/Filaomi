import { prisma } from "@/lib/prisma";

export default async function ImpactPage() {
  const metrics = await prisma.impactMetric.findMany();

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Our Impact</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Transparent, measurable progress against our environmental and community objectives.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const pct = metric.target ? Math.min(100, (metric.value / metric.target) * 100) : 100;
          return (
            <div key={metric.id} className="rounded-xl border border-stone-200 p-5">
              <p className="font-semibold text-stone-900">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold text-green-800">
                {metric.value.toLocaleString()} {metric.unit}
                {metric.target ? ` / ${metric.target.toLocaleString()}` : ""}
              </p>
              {metric.target && (
                <div className="mt-3 h-2 w-full rounded-full bg-stone-100">
                  <div className="h-2 rounded-full bg-green-700" style={{ width: `${pct}%` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
