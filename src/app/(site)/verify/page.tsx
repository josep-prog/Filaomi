import { prisma } from "@/lib/prisma";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const ref = searchParams.ref?.trim();
  const record = ref
    ? await prisma.verificationRecord.findUnique({ where: { referenceNumber: ref } })
    : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Verify a Record</h1>
      <p className="mt-2 text-stone-600">
        Enter a reference number to verify a certificate, training record, or other official
        information.
      </p>

      <form action="/verify" className="mt-6 flex gap-2">
        <input
          name="ref"
          defaultValue={ref}
          placeholder="e.g. GLH-2026-00125"
          className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900"
        >
          Verify
        </button>
      </form>

      {ref && (
        <div className="mt-8">
          {record ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <p className="font-semibold text-green-800">✓ Verified</p>
              <p className="mt-2 text-stone-900">{record.title}</p>
              {record.participantName && <p className="text-sm text-stone-600">Participant: {record.participantName}</p>}
              {record.organization && <p className="text-sm text-stone-600">Organization: {record.organization}</p>}
              {record.date && <p className="text-sm text-stone-600">Date: {new Date(record.date).toLocaleDateString()}</p>}
              <p className="mt-2 text-xs text-stone-500">Reference: {record.referenceNumber}</p>
            </div>
          ) : (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <p className="font-semibold text-red-700">✗ Not Found</p>
              <p className="mt-1 text-sm text-stone-600">
                No record matches reference &ldquo;{ref}&rdquo;. Please check the number and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
