import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { submitEventRegistration } from "../../actions";
import { AutoResetForm } from "@/components/forms/auto-reset-form";

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await prisma.event.findUnique({ where: { slug: params.slug } });
  if (!event || event.status !== "PUBLISHED") notFound();

  const registerAction = submitEventRegistration.bind(null, event.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">{event.title}</h1>
      <p className="mt-1 text-sm text-stone-500">
        {new Date(event.date).toLocaleDateString()} {event.time ?? ""} {event.location ? `· ${event.location}` : ""}
      </p>
      <p className="mt-6 text-stone-600">{event.description}</p>

      {event.registrationEnabled && (
        <div className="mt-10 rounded-xl border border-stone-200 p-6">
          <h2 className="text-lg font-semibold text-stone-900">Register</h2>
          <AutoResetForm
            action={registerAction}
            successMessage="You're registered! We look forward to seeing you there."
            className="mt-4 grid gap-3"
          >
            <input name="name" required placeholder="Full name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
            <input name="email" type="email" placeholder="Email" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
            <input name="phone" placeholder="Phone number" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
            <input name="organization" placeholder="Organization" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
            <button
              type="submit"
              className="rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900"
            >
              Register
            </button>
          </AutoResetForm>
        </div>
      )}
    </div>
  );
}
