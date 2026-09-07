import { prisma } from "@/lib/prisma";
import { submitServiceRequest } from "../actions";
import { AutoResetForm } from "@/components/forms/auto-reset-form";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { status: "PUBLISHED" } });

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Services</h1>
      <p className="mt-2 text-stone-600">
        Hydroponic fodder supply, system installation, farmer training, and institutional
        programs.
      </p>

      <div className="mt-8 space-y-10">
        {services.map((service) => (
          <div key={service.id} className="rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-semibold text-stone-900">{service.name}</h2>
            <p className="mt-2 text-stone-600">{service.description}</p>

            <AutoResetForm
              action={submitServiceRequest}
              successMessage="Thank you — your request has been received. Our team will contact you shortly."
              className="mt-5 grid gap-3 sm:grid-cols-2"
            >
              <input type="hidden" name="serviceId" value={service.id} />
              <input name="name" required placeholder="Your name" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              <input name="phone" required placeholder="Phone number" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              <input name="email" type="email" placeholder="Email (optional)" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              <input name="district" placeholder="District" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              <input name="organization" placeholder="Cooperative / organization" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              <input name="livestockType" placeholder="Type of livestock" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" />
              <textarea name="message" placeholder="Message" className="sm:col-span-2 rounded-lg border border-stone-300 px-3 py-2 text-sm" rows={3} />
              <button
                type="submit"
                className="sm:col-span-2 rounded-full bg-green-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-900"
              >
                Request This Service
              </button>
            </AutoResetForm>
          </div>
        ))}
      </div>
    </div>
  );
}
