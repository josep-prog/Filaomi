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

export default async function HomePage() {
  const [metrics, featuredProducts, galleryPhotos, settingsRows] = await Promise.all([
    prisma.impactMetric.findMany(),
    prisma.product.findMany({ where: { status: "PUBLISHED", featured: true }, take: 3 }),
    prisma.media.findMany({ where: { type: "image" }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.websiteSetting.findMany({ where: { key: "instagram" } }),
  ]);

  const instagramHandle = settingsRows[0]?.value || "@livestock_farm_";
  const heroImage = firstImage(featuredProducts[0]?.images ?? "[]") ?? undefined;

  return (
    <div>
      <section className="relative overflow-hidden bg-green-900 text-white">
        {heroImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
        )}
        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Affordable and Climate-Resilient Livestock Feed for Rwanda
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            We produce fresh hydroponic fodder using limited space and efficient water
            management to help farmers maintain livestock production despite land, water,
            and climate constraints.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/solutions" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-green-900 transition-colors hover:bg-green-50">
              Explore Our Solutions
            </Link>
            <Link href="/products" className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10">
              View Products
            </Link>
            <Link href="/contact" className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-2xl font-semibold text-stone-900">Our Impact</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-xl border border-stone-200 p-4 text-center">
              <p className="text-2xl font-bold text-green-800">
                {metric.value.toLocaleString()}
                {metric.target ? ` / ${metric.target.toLocaleString()}` : ""}
              </p>
              <p className="mt-1 text-xs text-stone-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="bg-stone-50 py-14">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-semibold text-stone-900">Featured Products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {featuredProducts.map((product) => {
                const image = firstImage(product.images);
                return (
                  <div key={product.id} className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-lg">
                    <Link href={`/products/${product.slug}`} className="block">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-stone-400">No photo yet</div>
                        )}
                      </div>
                      <div className="p-5">
                        <p className="font-semibold text-stone-900">{product.name}</p>
                        <p className="mt-2 line-clamp-3 text-sm text-stone-600">{product.description}</p>
                        {product.price && (
                          <p className="mt-3 text-sm font-medium text-green-800">
                            {product.currency} {product.price} / {product.priceUnit}
                          </p>
                        )}
                      </div>
                    </Link>
                    <div className="flex gap-2 px-5 pb-5">
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
                );
              })}
            </div>
          </div>
        </section>
      )}

      {galleryPhotos.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-2xl font-semibold text-stone-900">From the Farm</h2>
            <a
              href={`https://instagram.com/${instagramHandle.replace(/^@/, "")}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-green-800 hover:underline"
            >
              Follow us on Instagram {instagramHandle}
            </a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryPhotos.map((photo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.id}
                src={photo.url}
                alt={photo.altText ?? photo.description ?? "Photo from our farm"}
                className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/media" className="text-sm font-medium text-green-800 hover:underline">
              View the full media gallery →
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold text-stone-900">Work With Us</h2>
        <p className="mx-auto mt-3 max-w-2xl text-stone-600">
          Whether you are a farmer, cooperative, NGO, or institution, we can help you adopt
          climate-resilient hydroponic feeding systems.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/services" className="rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-900">
            Request Training
          </Link>
          <Link href="/careers" className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-stone-100">
            View Careers
          </Link>
        </div>
      </section>
    </div>
  );
}
