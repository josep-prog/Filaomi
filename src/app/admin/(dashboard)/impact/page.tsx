import { prisma } from "@/lib/prisma";
import { updateImpactMetric } from "../actions";

export default async function AdminImpactPage() {
  const metrics = await prisma.impactMetric.findMany();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Impact Metrics</h1>
      <p className="mt-1 text-sm text-stone-500">
        These figures appear on the homepage and impact page.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => (
          <form
            key={metric.id}
            action={updateImpactMetric.bind(null, metric.id)}
            className="rounded-xl border border-stone-200 bg-white p-4"
          >
            <p className="font-medium text-stone-900">{metric.label}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="text-xs text-stone-500">
                Current Value
                <input name="value" type="number" step="0.01" defaultValue={metric.value} className="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1 text-sm" />
              </label>
              <label className="text-xs text-stone-500">
                Target
                <input name="target" type="number" step="0.01" defaultValue={metric.target ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1 text-sm" />
              </label>
            </div>
            <button type="submit" className="mt-3 rounded-full bg-green-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-green-900">
              Update
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
