type JobFormValues = {
  title?: string;
  department?: string | null;
  location?: string | null;
  employmentType?: string | null;
  description?: string;
  responsibilities?: string | null;
  qualifications?: string | null;
  status?: string;
};

export function JobForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: JobFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="mt-6 grid max-w-xl gap-3">
      <label className="text-sm font-medium text-stone-700">
        Title
        <input name="title" required defaultValue={defaultValues?.title} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-medium text-stone-700">
          Department
          <input name="department" defaultValue={defaultValues?.department ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Location
          <input name="location" defaultValue={defaultValues?.location ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
      </div>
      <label className="text-sm font-medium text-stone-700">
        Employment Type
        <input name="employmentType" defaultValue={defaultValues?.employmentType ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-stone-700">
        Description
        <textarea name="description" rows={4} defaultValue={defaultValues?.description} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-stone-700">
        Responsibilities
        <textarea name="responsibilities" rows={3} defaultValue={defaultValues?.responsibilities ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-stone-700">
        Qualifications
        <textarea name="qualifications" rows={3} defaultValue={defaultValues?.qualifications ?? undefined} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
      </label>
      <label className="text-sm font-medium text-stone-700">
        Status
        <select name="status" defaultValue={defaultValues?.status ?? "DRAFT"} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm">
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="CLOSED">Closed</option>
        </select>
      </label>
      <button type="submit" className="mt-2 w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
        {submitLabel}
      </button>
    </form>
  );
}
