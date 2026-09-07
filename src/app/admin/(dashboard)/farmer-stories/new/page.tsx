import { createFarmerStory } from "../../actions";

export default function NewFarmerStoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Add Farmer Story</h1>
      <form action={createFarmerStory} className="mt-6 grid max-w-xl gap-3">
        <label className="text-sm font-medium text-stone-700">
          Farmer Name
          <input name="farmerName" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          District
          <input name="district" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Testimonial
          <textarea name="testimonial" rows={3} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Results
          <textarea name="results" rows={3} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Status
          <select name="status" defaultValue="DRAFT" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm">
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
        <button type="submit" className="mt-2 w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
          Save Story
        </button>
      </form>
    </div>
  );
}
