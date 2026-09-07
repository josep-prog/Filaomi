import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteNewsArticle } from "../actions";

export default async function AdminNewsPage() {
  const articles = await prisma.newsArticle.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">News</h1>
        <Link href="/admin/news/new" className="rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900">
          + Write Article
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-900">{article.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${article.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteNewsArticle.bind(null, article.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-stone-400">No articles yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
