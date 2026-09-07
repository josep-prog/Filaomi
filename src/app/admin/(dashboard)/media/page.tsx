import { prisma } from "@/lib/prisma";
import { uploadMedia, deleteMedia } from "../actions";

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Media Library</h1>

      <form action={uploadMedia} encType="multipart/form-data" className="mt-6 grid max-w-xl gap-3 rounded-xl border border-stone-200 bg-white p-5">
        <label className="text-sm font-medium text-stone-700">
          File (image or video, max 20MB)
          <input name="file" type="file" required accept="image/*,video/mp4,video/webm" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Category
          <input name="category" placeholder="e.g. farmer stories, training, product" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Description
          <input name="description" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <button type="submit" className="w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
          Upload
        </button>
      </form>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {media.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            {item.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={item.altText ?? item.filename} className="h-32 w-full object-cover" />
            ) : (
              <video src={item.url} className="h-32 w-full object-cover" />
            )}
            <div className="p-3">
              <p className="truncate text-xs text-stone-500">{item.filename}</p>
              <form action={deleteMedia.bind(null, item.id)} className="mt-2">
                <button type="submit" className="text-xs text-red-600 hover:underline">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {media.length === 0 && <p className="text-stone-400">No media uploaded yet.</p>}
      </div>
    </div>
  );
}
