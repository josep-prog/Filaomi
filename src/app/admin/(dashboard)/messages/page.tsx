import { prisma } from "@/lib/prisma";
import { updateContactMessageStatus } from "../actions";
import { StatusSelect } from "@/components/admin/status-select";

const STATUSES = ["NEW", "IN_PROGRESS", "RESPONDED", "RESOLVED"];

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Messages</h1>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t border-stone-100 align-top">
                <td className="px-4 py-3 font-medium text-stone-900">{msg.name}</td>
                <td className="px-4 py-3 text-stone-600">{msg.email}{msg.phone ? ` / ${msg.phone}` : ""}</td>
                <td className="px-4 py-3 text-stone-600">{msg.category ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs text-stone-600">{msg.message}</td>
                <td className="px-4 py-3">
                  <StatusSelect
                    action={updateContactMessageStatus.bind(null, msg.id)}
                    defaultValue={msg.status}
                    options={STATUSES}
                  />
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">No messages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
