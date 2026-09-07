import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@filaomicompany.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Super Admin",
      email: adminEmail,
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const impactMetrics = [
    { key: "monthly_production_kg", label: "Monthly Fodder Production (kg)", value: 1000, target: 5000, unit: "kg" },
    { key: "farmers_reached", label: "Farmers Reached", value: 100, target: 300, unit: "farmers" },
    { key: "youth_trained", label: "Youth Trained", value: 200, target: 200, unit: "people" },
    { key: "water_saved_liters", label: "Water Saved (liters)", value: 0, target: 200000, unit: "liters" },
    { key: "feed_cost_reduction_pct", label: "Feed Cost Reduction", value: 50, target: 50, unit: "%" },
    { key: "partnerships_established", label: "Partnerships Established", value: 4, target: 8, unit: "partners" },
  ];

  for (const metric of impactMetrics) {
    await prisma.impactMetric.upsert({
      where: { key: metric.key },
      update: {},
      create: metric,
    });
  }

  const websiteSettings: { key: string; value: string }[] = [{ key: "instagram", value: "@livestock_farm_" }];

  for (const setting of websiteSettings) {
    await prisma.websiteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  const category = await prisma.productCategory.upsert({
    where: { slug: "hydroponic-fodder" },
    update: {},
    create: { name: "Hydroponic Fodder", slug: "hydroponic-fodder" },
  });

  // Curated from the supplied photo set: these frames clearly show the fodder
  // trays/product itself. A few source photos (a signed certificate and an
  // unrelated conference-attendance graphic) were deliberately left out of
  // every seeded list below rather than reused as generic filler.
  const productImageNumbers = [19, 8, 23, 12, 24, 29];
  const productImages = productImageNumbers.map((n) => `/images/gallery/farm-${String(n).padStart(2, "0")}.webp`);

  const fodderUsageInstructions =
    "Feed the fresh fodder mat (roots and shoots together) directly to your livestock — no chopping or soaking needed. Introduce it gradually over 3-4 days if your animals are used to dry feed, then feed as a full or partial replacement based on the animal type and daily quantity your extension officer recommends. Store any unused fodder in a cool, shaded place and use within 24 hours for best freshness.";
  const fodderFaq = JSON.stringify([
    {
      question: "How long does the fodder stay fresh?",
      answer: "It is best fed within 24 hours of delivery. Keep it in a cool, shaded place and avoid direct sunlight while waiting to feed it out.",
    },
    {
      question: "Which animals can eat this fodder?",
      answer: "It is suitable for cattle, goats, sheep, pigs, poultry, and rabbits. Portion sizes vary by animal — contact us or request training for a feeding guide.",
    },
    {
      question: "Do I need to cook or process it before feeding?",
      answer: "No preparation is required. The fodder mat, including the root layer, can be fed as-is.",
    },
  ]);

  await prisma.product.upsert({
    where: { slug: "fresh-hydroponic-fodder" },
    update: {
      images: JSON.stringify(productImages),
      usageInstructions: fodderUsageInstructions,
      faq: fodderFaq,
    },
    create: {
      name: "Fresh Hydroponic Fodder",
      slug: "fresh-hydroponic-fodder",
      categoryId: category.id,
      description:
        "Fresh, nutrient-rich hydroponic fodder grown from maize or wheat seeds without soil, ready in as little as 4 days.",
      price: 0.3,
      priceUnit: "kg",
      currency: "EUR",
      availability: "In Stock",
      images: JSON.stringify(productImages),
      benefits: "Cuts feed costs by up to 50%, uses 80% less water than conventional feed production.",
      usageInstructions: fodderUsageInstructions,
      faq: fodderFaq,
      featured: true,
      status: "PUBLISHED",
    },
  });

  const excludedNumbers = new Set([2, 22, 31, ...productImageNumbers]);
  const galleryNumbers = Array.from({ length: 33 }, (_, i) => i + 1).filter((n) => !excludedNumbers.has(n));

  for (let i = 0; i < galleryNumbers.length; i++) {
    const n = galleryNumbers[i];
    const url = `/images/gallery/farm-${String(n).padStart(2, "0")}.webp`;
    await prisma.media.upsert({
      where: { id: `seed-gallery-${n}` },
      update: {},
      create: {
        id: `seed-gallery-${n}`,
        filename: url.split("/").pop()!,
        url,
        type: "image",
        category: "Farm Gallery",
        description: "Photo from Filaomi Company Ltd's fieldwork, training, and community engagements in Rwanda.",
      },
    });
  }

  await prisma.service.upsert({
    where: { slug: "farmer-training" },
    update: {},
    create: {
      name: "Farmer Training",
      slug: "farmer-training",
      description:
        "Hands-on training for farmers and cooperatives on hydroponic fodder production, system operation, maintenance, and livestock feeding.",
      status: "PUBLISHED",
    },
  });

  await prisma.job.upsert({
    where: { slug: "agricultural-extension-officer" },
    update: {},
    create: {
      title: "Agricultural Extension Officer",
      slug: "agricultural-extension-officer",
      department: "Farmer Support",
      location: "Rusizi, Rwanda",
      employmentType: "Full-time",
      description:
        "Support farmer onboarding, training, and quality control for hydroponic fodder production across our partner cooperatives.",
      qualifications: "Degree in Agriculture or related field, experience with smallholder farmers.",
      status: "PUBLISHED",
    },
  });

  console.log(`Seed complete. Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
