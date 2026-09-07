import Link from "next/link";
import { prisma } from "@/lib/prisma";

function firstImage(images: string): string | null {
  try {
    const arr = JSON.parse(images);
    return Array.isArray(arr) && arr.length > 0 ? arr[0] : null;
  } catch {
    return null;
  }
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Products</h1>
      <p className="mt-2 text-stone-600">
        Fresh hydroponic fodder and related offerings. Reach out and we&apos;ll follow up with you directly.
      </p>

      {products.length === 0 ? (
        <p className="mt-8 text-stone-500">No products published yet.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const image = firstImage(product.images);
            return (
              <div key={product.id} className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-lg">
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-stone-400">
                      No photo yet
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {product.category && (
                    <p className="text-xs uppercase tracking-wide text-green-700">{product.category.name}</p>
                  )}
                  <p className="mt-1 font-semibold text-stone-900">{product.name}</p>
                  <p className="mt-2 line-clamp-3 text-sm text-stone-600">{product.description}</p>
                  {product.price && (
                    <p className="mt-3 text-sm font-medium text-green-800">
                      {product.currency} {product.price} / {product.priceUnit}
                    </p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/products/${product.slug}?tab=view`}
                      className="flex-1 rounded-full border border-green-800 px-4 py-2 text-center text-sm font-medium text-green-800 transition-colors hover:bg-green-50"
                    >
                      View
                    </Link>
                    <Link
                      href={`/products/${product.slug}?tab=request`}
                      className="flex-1 rounded-full bg-green-800 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-green-900"
                    >
                      Request
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
