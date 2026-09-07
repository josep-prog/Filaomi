import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const article = await prisma.newsArticle.findUnique({ where: { slug: params.slug } });
  if (!article || article.status !== "PUBLISHED") notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">{article.title}</h1>
      {article.publishedAt && (
        <p className="mt-1 text-sm text-stone-500">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>
      )}
      <div className="mt-6 whitespace-pre-wrap text-stone-700">{article.content}</div>
    </div>
  );
}
