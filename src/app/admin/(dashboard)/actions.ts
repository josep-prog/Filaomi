"use server";

import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Not authenticated");
  return session.user.id;
}

async function logAction(action: string, entityType: string, entityId?: string, details?: string) {
  const userId = await requireUserId();
  await prisma.auditLog.create({ data: { userId, action, entityType, entityId, details } });
}

// ---------- Products ----------

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

async function uploadProductImage(formData: FormData): Promise<string | null> {
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) return null;
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error("Product photo must be an image file.");
  if (file.size > 10 * 1024 * 1024) throw new Error("Image too large (max 10MB).");

  const uploadsDir = path.join(process.cwd(), "public", "uploads", "products");
  await mkdir(uploadsDir, { recursive: true });

  const safeName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "product";
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${safeName}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);
  return `/uploads/products/${filename}`;
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");

  const imageUrl = await uploadProductImage(formData);

  const product = await prisma.product.create({
    data: {
      name,
      slug: slugify(name) + "-" + Math.random().toString(36).slice(2, 6),
      description: String(formData.get("description") ?? ""),
      price: formData.get("price") ? Number(formData.get("price")) : null,
      priceUnit: (formData.get("priceUnit") as string) || null,
      benefits: (formData.get("benefits") as string) || null,
      usageInstructions: (formData.get("usageInstructions") as string) || null,
      images: imageUrl ? JSON.stringify([imageUrl]) : "[]",
      featured: formData.get("featured") === "on",
      status: (formData.get("status") as string) || "DRAFT",
    },
  });

  await logAction("create", "Product", product.id, name);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required");

  const imageUrl = await uploadProductImage(formData);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description: String(formData.get("description") ?? ""),
      price: formData.get("price") ? Number(formData.get("price")) : null,
      priceUnit: (formData.get("priceUnit") as string) || null,
      benefits: (formData.get("benefits") as string) || null,
      usageInstructions: (formData.get("usageInstructions") as string) || null,
      ...(imageUrl ? { images: JSON.stringify([imageUrl]) } : {}),
      featured: formData.get("featured") === "on",
      status: (formData.get("status") as string) || "DRAFT",
    },
  });

  await logAction("update", "Product", id, name);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  await logAction("delete", "Product", id);
  revalidatePath("/admin/products");
  revalidatePath("/products");
}

// ---------- Jobs ----------

export async function createJob(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Title is required");

  const job = await prisma.job.create({
    data: {
      title,
      slug: slugify(title) + "-" + Math.random().toString(36).slice(2, 6),
      department: (formData.get("department") as string) || null,
      location: (formData.get("location") as string) || null,
      employmentType: (formData.get("employmentType") as string) || null,
      description: String(formData.get("description") ?? ""),
      responsibilities: (formData.get("responsibilities") as string) || null,
      qualifications: (formData.get("qualifications") as string) || null,
      status: (formData.get("status") as string) || "DRAFT",
    },
  });

  await logAction("create", "Job", job.id, title);
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Title is required");

  await prisma.job.update({
    where: { id },
    data: {
      title,
      department: (formData.get("department") as string) || null,
      location: (formData.get("location") as string) || null,
      employmentType: (formData.get("employmentType") as string) || null,
      description: String(formData.get("description") ?? ""),
      responsibilities: (formData.get("responsibilities") as string) || null,
      qualifications: (formData.get("qualifications") as string) || null,
      status: (formData.get("status") as string) || "DRAFT",
    },
  });

  await logAction("update", "Job", id, title);
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
  redirect(`/admin/jobs/${id}`);
}

export async function deleteJob(id: string) {
  await prisma.jobApplication.deleteMany({ where: { jobId: id } });
  await prisma.job.delete({ where: { id } });
  await logAction("delete", "Job", id);
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
}

export async function updateApplicationStatus(id: string, formData: FormData) {
  const status = String(formData.get("status"));
  await prisma.jobApplication.update({ where: { id }, data: { status } });
  await logAction("update-status", "JobApplication", id, status);
  revalidatePath("/admin/jobs");
}

// ---------- Requests & Messages ----------

export async function updateServiceRequestStatus(id: string, formData: FormData) {
  const status = String(formData.get("status"));
  await prisma.serviceRequest.update({ where: { id }, data: { status } });
  await logAction("update-status", "ServiceRequest", id, status);
  revalidatePath("/admin/requests");
}

export async function updateProductOrderStatus(id: string, formData: FormData) {
  const status = String(formData.get("status"));
  await prisma.productOrder.update({ where: { id }, data: { status } });
  await logAction("update-status", "ProductOrder", id, status);
  revalidatePath("/admin/requests");
}

export async function updateContactMessageStatus(id: string, formData: FormData) {
  const status = String(formData.get("status"));
  await prisma.contactMessage.update({ where: { id }, data: { status } });
  await logAction("update-status", "ContactMessage", id, status);
  revalidatePath("/admin/messages");
}

// ---------- News ----------

export async function createNewsArticle(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Title is required");
  const status = (formData.get("status") as string) || "DRAFT";

  const article = await prisma.newsArticle.create({
    data: {
      title,
      slug: slugify(title) + "-" + Math.random().toString(36).slice(2, 6),
      excerpt: (formData.get("excerpt") as string) || null,
      content: String(formData.get("content") ?? ""),
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });

  await logAction("create", "NewsArticle", article.id, title);
  revalidatePath("/admin/news");
  revalidatePath("/news");
  redirect("/admin/news");
}

export async function deleteNewsArticle(id: string) {
  await prisma.newsArticle.delete({ where: { id } });
  await logAction("delete", "NewsArticle", id);
  revalidatePath("/admin/news");
  revalidatePath("/news");
}

// ---------- Events ----------

export async function createEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("Title is required");

  const event = await prisma.event.create({
    data: {
      title,
      slug: slugify(title) + "-" + Math.random().toString(36).slice(2, 6),
      date: new Date(String(formData.get("date"))),
      time: (formData.get("time") as string) || null,
      location: (formData.get("location") as string) || null,
      description: String(formData.get("description") ?? ""),
      registrationEnabled: formData.get("registrationEnabled") === "on",
      status: (formData.get("status") as string) || "DRAFT",
    },
  });

  await logAction("create", "Event", event.id, title);
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await prisma.eventRegistration.deleteMany({ where: { eventId: id } });
  await prisma.event.delete({ where: { id } });
  await logAction("delete", "Event", id);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

// ---------- Farmer Stories ----------

export async function createFarmerStory(formData: FormData) {
  const farmerName = String(formData.get("farmerName") ?? "").trim();
  if (!farmerName) throw new Error("Farmer name is required");

  const story = await prisma.farmerStory.create({
    data: {
      farmerName,
      district: (formData.get("district") as string) || null,
      testimonial: (formData.get("testimonial") as string) || null,
      results: (formData.get("results") as string) || null,
      status: (formData.get("status") as string) || "DRAFT",
    },
  });

  await logAction("create", "FarmerStory", story.id, farmerName);
  revalidatePath("/admin/farmer-stories");
  revalidatePath("/farmers");
  redirect("/admin/farmer-stories");
}

export async function deleteFarmerStory(id: string) {
  await prisma.farmerStory.delete({ where: { id } });
  await logAction("delete", "FarmerStory", id);
  revalidatePath("/admin/farmer-stories");
  revalidatePath("/farmers");
}

// ---------- Impact Metrics ----------

export async function updateImpactMetric(id: string, formData: FormData) {
  await prisma.impactMetric.update({
    where: { id },
    data: {
      value: Number(formData.get("value")),
      target: formData.get("target") ? Number(formData.get("target")) : null,
    },
  });
  await logAction("update", "ImpactMetric", id);
  revalidatePath("/admin/impact");
  revalidatePath("/impact");
  revalidatePath("/");
}

// ---------- Media ----------

const ALLOWED_MEDIA_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"]);

export async function uploadMedia(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("A file is required");
  if (!ALLOWED_MEDIA_TYPES.has(file.type)) throw new Error("Unsupported file type");
  if (file.size > 20 * 1024 * 1024) throw new Error("File too large (max 20MB)");

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const safeName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "file";
  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${safeName}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);

  const media = await prisma.media.create({
    data: {
      filename,
      url: `/uploads/${filename}`,
      type: file.type.startsWith("video") ? "video" : "image",
      category: (formData.get("category") as string) || null,
      description: (formData.get("description") as string) || null,
      altText: (formData.get("altText") as string) || null,
      size: file.size,
    },
  });

  await logAction("create", "Media", media.id, filename);
  revalidatePath("/admin/media");
  revalidatePath("/media");
}

export async function deleteMedia(id: string) {
  await prisma.media.delete({ where: { id } });
  await logAction("delete", "Media", id);
  revalidatePath("/admin/media");
  revalidatePath("/media");
}

// ---------- Settings ----------

const SETTINGS_KEYS = [
  "company_name",
  "phone",
  "email",
  "address",
  "instagram",
  "facebook",
];

export async function updateSettings(formData: FormData) {
  for (const key of SETTINGS_KEYS) {
    const value = String(formData.get(key) ?? "");
    await prisma.websiteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  await logAction("update", "WebsiteSetting", "bulk");
  revalidatePath("/admin/settings");
  revalidatePath("/");
}
