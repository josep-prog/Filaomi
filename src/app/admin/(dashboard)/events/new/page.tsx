import { createEvent } from "../../actions";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Create Event</h1>
      <form action={createEvent} className="mt-6 grid max-w-xl gap-3">
        <label className="text-sm font-medium text-stone-700">
          Title
          <input name="title" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-stone-700">
            Date
            <input name="date" type="date" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          </label>
          <label className="text-sm font-medium text-stone-700">
            Time
            <input name="time" placeholder="e.g. 10:00 AM" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          </label>
        </div>
        <label className="text-sm font-medium text-stone-700">
          Location
          <input name="location" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Description
          <textarea name="description" rows={4} required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
          <input name="registrationEnabled" type="checkbox" />
          Allow online registration
        </label>
        <label className="text-sm font-medium text-stone-700">
          Status
          <select name="status" defaultValue="DRAFT" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
        <button type="submit" className="mt-2 w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
          Create Event
        </button>
      </form>
    </div>
  );
}
