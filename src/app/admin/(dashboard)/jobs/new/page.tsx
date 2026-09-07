import { JobForm } from "@/components/admin/job-form";
import { createJob } from "../../actions";

export default function NewJobPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Create Job</h1>
      <JobForm action={createJob} submitLabel="Create Job" />
    </div>
  );
}
