import { prisma } from "@/lib/prisma";
import { updateServiceRequestStatus, updateProductOrderStatus } from "../actions";
import { StatusSelect } from "@/components/admin/status-select";

const STATUSES = ["NEW", "IN_PROGRESS", "RESPONDED", "RESOLVED"];

export default async function AdminRequestsPage() {
  const [requests, orders] = await Promise.all([
    prisma.serviceRequest.findMany({ orderBy: { createdAt: "desc" }, include: { service: true } }),
    prisma.productOrder.findMany({ orderBy: { createdAt: "desc" }, include: { product: true } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Product Requests</h1>
      <p className="mt-1 text-sm text-stone-500">
        People who asked about a product from the Products pages. Reach out to follow up.
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Qty / Note</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-stone-100 align-top">
                <td className="px-4 py-3 font-medium text-stone-900">{order.name}</td>
                <td className="px-4 py-3 text-stone-600">{order.phone}{order.email ? ` / ${order.email}` : ""}</td>
                <td className="px-4 py-3 text-stone-600">{order.product?.name ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs text-stone-600">
                  {[order.quantity, order.message].filter(Boolean).join(" — ") || "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect
                    action={updateProductOrderStatus.bind(null, order.id)}
                    defaultValue={order.status}
                    options={STATUSES}
                  />
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">No product requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h1 className="mt-10 text-2xl font-semibold text-stone-900">Service Requests</h1>

      <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t border-stone-100 align-top">
                <td className="px-4 py-3 font-medium text-stone-900">{req.name}</td>
                <td className="px-4 py-3 text-stone-600">{req.phone}{req.email ? ` / ${req.email}` : ""}</td>
                <td className="px-4 py-3 text-stone-600">{req.service?.name ?? "—"}</td>
                <td className="px-4 py-3 max-w-xs text-stone-600">{req.message ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusSelect
                    action={updateServiceRequestStatus.bind(null, req.id)}
                    defaultValue={req.status}
                    options={STATUSES}
                  />
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-400">No requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
