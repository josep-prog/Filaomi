import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductTabs } from "@/components/products/product-tabs";
import { Accordion } from "@/components/accordion";
import { AutoResetForm } from "@/components/forms/auto-reset-form";
import { submitProductOrder } from "../../actions";

function parseJsonArray(value: string): string[] {
  try {
    const arr = JSON.parse(value);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function parseFaq(value: string): { question: string; answer: string }[] {
  try {
    const arr = JSON.parse(value);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { tab?: string };
}) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { category: true } });

  if (!product || product.status !== "PUBLISHED") notFound();

  const images = parseJsonArray(product.images);
  const faq = parseFaq(product.faq);
  const orderAction = submitProductOrder.bind(null, product.id);
  const initialTab = searchParams.tab === "request" ? "request" : "view";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100">
          {images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={images[0]} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-stone-400">No photo yet</div>
          )}
        </div>
        <div>
          {product.category && (
            <p className="text-xs uppercase tracking-wide text-green-700">{product.category.name}</p>
          )}
          <h1 className="mt-1 text-3xl font-bold text-stone-900">{product.name}</h1>
          {product.price && (
            <p className="mt-3 text-lg font-semibold text-green-800">
              {product.currency} {product.price} / {product.priceUnit}
            </p>
          )}
          {product.availability && <p className="mt-1 text-sm text-stone-500">{product.availability}</p>}
          <p className="mt-4 text-stone-600">{product.description}</p>
        </div>
      </div>

      <div className="mt-10">
        <ProductTabs
          initialTab={initialTab}
          viewContent={
            <div className="space-y-6">
              {product.benefits && (
                <div>
                  <h2 className="font-semibold text-stone-900">Benefits</h2>
                  <p className="mt-1 text-sm text-stone-600">{product.benefits}</p>
                </div>
              )}
              {product.usageInstructions && (
                <div>
                  <h2 className="font-semibold text-stone-900">How to Use</h2>
                  <p className="mt-1 whitespace-pre-line text-sm text-stone-600">{product.usageInstructions}</p>
                </div>
              )}
              {faq.length > 0 && (
                <div>
                  <h2 className="font-semibold text-stone-900">Frequently Asked Questions</h2>
                  <div className="mt-2">
                    <Accordion items={faq.map((f) => ({ title: f.question, content: <p>{f.answer}</p> }))} />
                  </div>
                </div>
              )}
              {!product.benefits && !product.usageInstructions && faq.length === 0 && (
                <p className="text-sm text-stone-500">
                  Full usage instructions for this product have not been added yet. Contact us for details.
                </p>
              )}
            </div>
          }
          requestContent={
            <div>
              <p className="text-sm text-stone-600">
                Interested in this product? Send us your details below and our team will reach out with pricing
                and next steps — no payment needed up front.
              </p>
              <AutoResetForm
                action={orderAction}
                successMessage="Thank you — we've received your request and will reach out shortly."
                className="mt-4 grid gap-3"
              >
                <input name="name" required placeholder="Your name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                <input name="phone" required placeholder="Phone number" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                <input name="email" type="email" placeholder="Email (optional)" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                <input name="district" placeholder="District" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                <input name="quantity" placeholder="Quantity (e.g. 50 kg)" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                <textarea name="message" placeholder="Message (optional)" rows={2} className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
                <button
                  type="submit"
                  className="rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-900"
                >
                  Send Request
                </button>
              </AutoResetForm>
            </div>
          }
        />
      </div>
    </div>
  );
}
