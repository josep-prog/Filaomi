import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function EventsPage() {
  const events = await prisma.event.findMany({ where: { status: "PUBLISHED" }, orderBy: { date: "asc" } });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Events</h1>

      {events.length === 0 ? (
        <p className="mt-8 text-stone-500">No upcoming events right now.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.slug}`}
              className="block rounded-xl border border-stone-200 p-5 hover:shadow-md"
            >
              <p className="font-semibold text-stone-900">{event.title}</p>
              <p className="mt-1 text-sm text-stone-500">
                {new Date(event.date).toLocaleDateString()} {event.location ? `· ${event.location}` : ""}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
