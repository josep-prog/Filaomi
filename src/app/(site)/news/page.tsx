import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NewsPage() {
  const articles = await prisma.newsArticle.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">News</h1>

      {articles.length === 0 ? (
        <p className="mt-8 text-stone-500">No news articles published yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="block rounded-xl border border-stone-200 p-5 hover:shadow-md"
            >
              <p className="font-semibold text-stone-900">{article.title}</p>
              {article.excerpt && <p className="mt-1 text-sm text-stone-600">{article.excerpt}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
