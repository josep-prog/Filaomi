import { submitContactMessage } from "../actions";
import { AutoResetForm } from "@/components/forms/auto-reset-form";

const CATEGORIES = [
  "Buy hydroponic fodder",
  "Request training",
  "Request system installation",
  "Partnership inquiry",
  "Job inquiry",
  "General inquiry",
  "Technical support",
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Contact Us</h1>
      <p className="mt-2 text-stone-600">How can we help you?</p>

      <AutoResetForm
        action={submitContactMessage}
        successMessage="Thank you for reaching out. We will respond as soon as possible."
        className="mt-8 grid gap-3"
      >
        <select name="category" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" defaultValue="">
          <option value="" disabled>Select a topic</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <input name="name" required placeholder="Your name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        <input name="email" type="email" placeholder="Email" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        <input name="phone" placeholder="Phone number" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        <textarea name="message" required placeholder="Your message" rows={5} className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
        <button
          type="submit"
          className="rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900"
        >
          Send Message
        </button>
      </AutoResetForm>
    </div>
  );
}
