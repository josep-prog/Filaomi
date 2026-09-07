import { createNewsArticle } from "../../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Write Article</h1>
      <form action={createNewsArticle} className="mt-6 grid max-w-xl gap-3">
        <label className="text-sm font-medium text-stone-700">
          Title
          <input name="title" required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Excerpt
          <input name="excerpt" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Content
          <textarea name="content" rows={8} required className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm font-medium text-stone-700">
          Status
          <select name="status" defaultValue="DRAFT" className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm">
            <option value="DRAFT">Save as Draft</option>
            <option value="PUBLISHED">Publish Now</option>
          </select>
        </label>
        <button type="submit" className="mt-2 w-fit rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900">
          Save
        </button>
      </form>
    </div>
  );
}
