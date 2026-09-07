import { prisma } from "@/lib/prisma";

export default async function FarmerStoriesPage() {
  const stories = await prisma.farmerStory.findMany({ where: { status: "PUBLISHED" } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Farmer Stories</h1>
      <p className="mt-2 text-stone-600">Real results from farmers using our hydroponic fodder system.</p>

      {stories.length === 0 ? (
        <p className="mt-8 text-stone-500">No farmer stories published yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {stories.map((story) => (
            <div key={story.id} className="rounded-xl border border-stone-200 p-5">
              <p className="font-semibold text-stone-900">{story.farmerName}</p>
              {story.district && <p className="text-xs text-stone-500">{story.district}</p>}
              {story.testimonial && <p className="mt-3 text-sm italic text-stone-600">&ldquo;{story.testimonial}&rdquo;</p>}
              {story.results && <p className="mt-3 text-sm text-stone-600">{story.results}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
