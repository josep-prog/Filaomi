import { prisma } from "@/lib/prisma";

export default async function MediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Media Center</h1>
      <p className="mt-2 text-stone-600">Videos, interviews, and photographs from our work.</p>

      {media.length === 0 ? (
        <p className="mt-8 text-stone-500">No media items uploaded yet.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-stone-200">
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.altText ?? item.filename} className="h-40 w-full object-cover" />
              ) : (
                <video src={item.url} controls className="h-40 w-full object-cover" />
              )}
              <div className="p-3">
                <p className="text-sm font-medium text-stone-900">{item.description ?? item.filename}</p>
                {item.category && <p className="text-xs text-stone-500">{item.category}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
