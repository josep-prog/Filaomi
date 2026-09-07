"use client";

export function StatusSelect({
  action,
  defaultValue,
  options,
}: {
  action: (formData: FormData) => void;
  defaultValue: string;
  options: string[];
}) {
  return (
    <form action={action}>
      <select
        name="status"
        defaultValue={defaultValue}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-stone-300 px-2 py-1 text-xs"
      >
        {options.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </form>
  );
}
