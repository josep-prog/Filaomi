import { prisma } from "@/lib/prisma";

export default async function DashboardHome() {
  const [
    newMessages,
    newRequests,
    newApplications,
    publishedProducts,
    publishedJobs,
    upcomingEvents,
  ] = await Promise.all([
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.serviceRequest.count({ where: { status: "NEW" } }),
    prisma.jobApplication.count({ where: { status: "NEW" } }),
    prisma.product.count({ where: { status: "PUBLISHED" } }),
    prisma.job.count({ where: { status: "PUBLISHED" } }),
    prisma.event.count({ where: { status: "PUBLISHED" } }),
  ]);

  const cards = [
    { label: "New Messages", value: newMessages },
    { label: "New Service Requests", value: newRequests },
    { label: "New Job Applications", value: newApplications },
    { label: "Published Products", value: publishedProducts },
    { label: "Published Jobs", value: publishedJobs },
    { label: "Upcoming Events", value: upcomingEvents },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
      <p className="mt-1 text-sm text-stone-500">Overview of your website&apos;s activity.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-stone-200 bg-white p-5">
            <p className="text-2xl font-bold text-green-800">{card.value}</p>
            <p className="mt-1 text-sm text-stone-500">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
