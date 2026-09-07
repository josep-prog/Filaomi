import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { updateProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) notFound();

  const action = updateProduct.bind(null, product.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Edit Product</h1>
      <ProductForm action={action} defaultValues={product} submitLabel="Save Changes" />
    </div>
  );
}
