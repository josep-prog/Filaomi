import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "../../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Add Product</h1>
      <ProductForm action={createProduct} submitLabel="Create Product" />
    </div>
  );
}
