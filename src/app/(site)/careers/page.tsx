import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({ where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Careers</h1>
      <p className="mt-2 text-stone-600">Join our team.</p>

      {jobs.length === 0 ? (
        <p className="mt-8 text-stone-500">No open positions right now. Please check back soon.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.slug}`}
              className="block rounded-xl border border-stone-200 p-5 hover:shadow-md"
            >
              <p className="font-semibold text-stone-900">{job.title}</p>
              <p className="mt-1 text-sm text-stone-500">
                {[job.department, job.location, job.employmentType].filter(Boolean).join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
