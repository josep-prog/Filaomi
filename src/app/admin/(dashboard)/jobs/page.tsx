import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteJob } from "../actions";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Jobs &amp; Applications</h1>
        <Link href="/admin/jobs/new" className="rounded-full bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900">
          + Create Job
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Applications</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t border-stone-100">
                <td className="px-4 py-3 font-medium text-stone-900">{job.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${job.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-600"}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-stone-600">{job._count.applications}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/jobs/${job.id}`} className="mr-3 text-green-700 hover:underline">Manage</Link>
                  <form action={deleteJob.bind(null, job.id)} className="inline">
                    <button type="submit" className="text-red-600 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-stone-400">No jobs yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
