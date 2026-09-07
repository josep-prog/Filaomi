import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { JobForm } from "@/components/admin/job-form";
import { updateJob, updateApplicationStatus } from "../../actions";
import { StatusSelect } from "@/components/admin/status-select";

const STATUSES = ["NEW", "REVIEWED", "SHORTLISTED", "INTERVIEW", "SELECTED", "REJECTED"];

export default async function ManageJobPage({ params }: { params: { id: string } }) {
  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: { applications: { orderBy: { createdAt: "desc" } } },
  });
  if (!job) notFound();

  const action = updateJob.bind(null, job.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">{job.title}</h1>

      <JobForm action={action} defaultValues={job} submitLabel="Save Changes" />

      <h2 className="mt-10 text-lg font-semibold text-stone-900">
        Applications ({job.applications.length})
      </h2>

      <div className="mt-4 overflow-hidden rounded-xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {job.applications.map((app) => (
              <tr key={app.id} className="border-t border-stone-100 align-top">
                <td className="px-4 py-3 font-medium text-stone-900">{app.fullName}</td>
                <td className="px-4 py-3 text-stone-600">{app.email}</td>
                <td className="px-4 py-3">
                  <StatusSelect
                    action={updateApplicationStatus.bind(null, app.id)}
                    defaultValue={app.status}
                    options={STATUSES}
                  />
                </td>
              </tr>
            ))}
            {job.applications.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-stone-400">No applications yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
