import { prisma } from "@/lib/prisma";
import { updateSettings } from "../actions";

const FIELDS: { key: string; label: string }[] = [
  { key: "company_name", label: "Company Name" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Contact Email" },
  { key: "address", label: "Physical Address" },
  { key: "instagram", label: "Instagram Handle" },
  { key: "facebook", label: "Facebook Page" },
];

export default async function AdminSettingsPage() {
  const settings = await prisma.websiteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Website Settings</h1>

      <form action={updateSettings} className="mt-6 grid max-w-xl gap-3">
        {FIELDS.map((field) => (
          <label key={field.key} className="text-sm font-medium text-stone-700">
            {field.label}
            <input
              name={field.key}
              defaultValue={map[field.key] ?? ""}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
            />
          </label>
        ))}

        <button type="submit" className="mt-2 w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
          Save Settings
        </button>
      </form>
    </div>
  );
}
