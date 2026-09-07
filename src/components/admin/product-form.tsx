type ProductFormValues = {
  name?: string;
  description?: string;
  price?: number | null;
  priceUnit?: string | null;
  benefits?: string | null;
  usageInstructions?: string | null;
  images?: string;
  featured?: boolean;
  status?: string;
};

export function ProductForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: ProductFormValues;
  submitLabel: string;
}) {
  const existingImages: string[] = defaultValues?.images ? JSON.parse(defaultValues.images) : [];

  return (
    <form action={action} encType="multipart/form-data" className="mt-6 grid max-w-xl gap-3">
      <label className="text-sm font-medium text-stone-700">
        Name
        <input name="name" required defaultValue={defaultValues?.name} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-stone-700">
        Description
        <textarea name="description" rows={4} defaultValue={defaultValues?.description} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-medium text-stone-700">
          Price
          <input name="price" type="number" step="0.01" defaultValue={defaultValues?.price ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Unit (e.g. kg)
          <input name="priceUnit" defaultValue={defaultValues?.priceUnit ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
      </div>
      <label className="text-sm font-medium text-stone-700">
        Benefits
        <textarea name="benefits" rows={2} defaultValue={defaultValues?.benefits ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-stone-700">
        How to Use (shown on the product&apos;s View tab)
        <textarea
          name="usageInstructions"
          rows={4}
          defaultValue={defaultValues?.usageInstructions ?? undefined}
          placeholder="Explain clearly how a customer should use this product once they receive it."
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="text-sm font-medium text-stone-700">
        Product Photo
        <input name="image" type="file" accept="image/*" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        {existingImages.length > 0 && (
          <div className="mt-2 flex gap-2">
            {existingImages.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="" className="h-16 w-16 rounded-lg border border-stone-200 object-cover" />
            ))}
          </div>
        )}
        <span className="mt-1 block text-xs font-normal text-stone-400">Uploading a new photo replaces the current one shown on the card.</span>
      </label>
      <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
        <input name="featured" type="checkbox" defaultChecked={defaultValues?.featured} />
        Featured on homepage
      </label>
      <label className="text-sm font-medium text-stone-700">
        Status
        <select name="status" defaultValue={defaultValues?.status ?? "DRAFT"} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="ARCHIVED">Archived</option>
        </select>
      </label>
      <button type="submit" className="mt-2 w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
        {submitLabel}
      </button>
    </form>
  );
}
