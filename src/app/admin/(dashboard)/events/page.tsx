import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteEvent } from "../actions";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Events</h1>
        <Link href="/admin/events/new" className="rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900">
          + Create Event
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Registrations</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-900">{event.title}</td>
                <td className="px-4 py-3 text-stone-600">{new Date(event.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${event.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-600">{event._count.registrations}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteEvent.bind(null, event.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">No events yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
