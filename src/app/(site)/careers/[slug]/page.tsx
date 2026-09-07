import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { submitJobApplication } from "../../actions";
import { AutoResetForm } from "@/components/forms/auto-reset-form";

export default async function JobDetailPage({ params }: { params: { slug: string } }) {
  const job = await prisma.job.findUnique({ where: { slug: params.slug } });
  if (!job || job.status !== "PUBLISHED") notFound();

  const applyAction = submitJobApplication.bind(null, job.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">{job.title}</h1>
      <p className="mt-1 text-sm text-stone-500">
        {[job.department, job.location, job.employmentType].filter(Boolean).join(" · ")}
      </p>

      <p className="mt-6 text-stone-600">{job.description}</p>

      {job.responsibilities && (
        <div className="mt-6">
          <h2 className="font-semibold text-stone-900">Responsibilities</h2>
          <p className="mt-1 text-stone-600">{job.responsibilities}</p>
        </div>
      )}
      {job.qualifications && (
        <div className="mt-6">
          <h2 className="font-semibold text-stone-900">Qualifications</h2>
          <p className="mt-1 text-stone-600">{job.qualifications}</p>
        </div>
      )}

      <div className="mt-10 rounded-xl border border-stone-200 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Apply for This Position</h2>
        <AutoResetForm
          action={applyAction}
          successMessage="Thank you — your application has been received. Our team will review it and reach out if there is a match."
          className="mt-4 grid gap-3"
        >
          <input name="fullName" required placeholder="Full name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <input name="phone" placeholder="Phone number" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <input name="education" placeholder="Education background" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <input name="experience" placeholder="Relevant experience" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <input name="skills" placeholder="Key skills" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <textarea name="coverLetter" placeholder="Cover letter / additional information" rows={4} className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
          <button
            type="submit"
            className="rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900"
          >
            Submit Application
          </button>
        </AutoResetForm>
      </div>
    </div>
  );
}
