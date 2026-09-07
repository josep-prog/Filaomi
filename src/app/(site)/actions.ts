"use server";

import { prisma } from "@/lib/prisma";

export async function submitServiceRequest(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!name || !phone) throw new Error("Name and phone are required.");

  await prisma.serviceRequest.create({
    data: {
      name,
      phone,
      email: (formData.get("email") as string) || null,
      district: (formData.get("district") as string) || null,
      organization: (formData.get("organization") as string) || null,
      livestockType: (formData.get("livestockType") as string) || null,
      animalCount: formData.get("animalCount") ? Number(formData.get("animalCount")) : null,
      message: (formData.get("message") as string) || null,
      serviceId: (formData.get("serviceId") as string) || null,
    },
  });
}

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!name || !message) throw new Error("Name and message are required.");

  await prisma.contactMessage.create({
    data: {
      name,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      category: (formData.get("category") as string) || null,
      message,
    },
  });
}

export async function submitJobApplication(jobId: string, formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  if (!fullName || !email) throw new Error("Name and email are required.");

  await prisma.jobApplication.create({
    data: {
      jobId,
      fullName,
      email,
      phone: (formData.get("phone") as string) || null,
      education: (formData.get("education") as string) || null,
      experience: (formData.get("experience") as string) || null,
      skills: (formData.get("skills") as string) || null,
      coverLetter: (formData.get("coverLetter") as string) || null,
    },
  });
}

export async function submitEventRegistration(eventId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required.");

  await prisma.eventRegistration.create({
    data: {
      eventId,
      name,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      organization: (formData.get("organization") as string) || null,
    },
  });
}

export async function submitProductOrder(productId: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  if (!name || !phone) throw new Error("Name and phone are required.");

  await prisma.productOrder.create({
    data: {
      productId,
      name,
      phone,
      email: (formData.get("email") as string) || null,
      district: (formData.get("district") as string) || null,
      quantity: (formData.get("quantity") as string) || null,
      message: (formData.get("message") as string) || null,
    },
  });
}
