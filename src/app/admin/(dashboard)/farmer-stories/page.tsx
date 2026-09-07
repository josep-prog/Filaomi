import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteFarmerStory } from "../actions";

export default async function AdminFarmerStoriesPage() {
  const stories = await prisma.farmerStory.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Farmer Stories</h1>
        <Link href="/admin/farmer-stories/new" className="rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900">
          + Add Story
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Farmer</th>
              <th className="px-4 py-3">District</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-900">{story.farmerName}</td>
                <td className="px-4 py-3 text-stone-600">{story.district ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${story.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`}>
                    {story.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteFarmerStory.bind(null, story.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {stories.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-stone-400">No stories yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
