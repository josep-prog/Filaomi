import { Accordion } from "@/components/accordion";

const STEPS = [
  {
    title: "1. Seed Preparation",
    desc: "Seeds (maize or wheat) are weighed and cleaned.",
    detail:
      "We select clean, viable maize or wheat seed and weigh it out per batch so every tray produces a consistent, predictable yield. The seed is screened to remove damaged grains, dust, and debris before it ever touches water — this is the single biggest factor in preventing mould later in the cycle.",
  },
  {
    title: "2. Soaking",
    desc: "Seeds soak in water for about 4 hours to begin activation.",
    detail:
      "Cleaned seed is submerged in clean water for roughly four hours. This rehydrates the grain and triggers the enzymes that start the germination process. Water is changed rather than reused, which keeps bacterial and fungal growth to a minimum.",
  },
  {
    title: "3. Germination",
    desc: "Seeds rest for 48 hours in a controlled, soil-free environment.",
    detail:
      "The soaked seed is spread thinly and left to rest for about 48 hours in a dark, humid, soil-free environment. No fertilizer or soil is needed — the seed's own reserves are enough to sprout the first root and shoot.",
  },
  {
    title: "4. Growth",
    desc: "Germinated seeds are spread in trays and watered three times a day.",
    detail:
      "Sprouted seed is spread evenly across stacked hydroponic trays and watered on a fixed schedule — typically three times a day. Controlled light and airflow keep the mat growing evenly from edge to edge, which is what gives the final fodder its dense, mat-like root structure.",
  },
  {
    title: "5. Harvest",
    desc: "Fodder is ready in 4–8 days depending on the livestock it feeds.",
    detail:
      "Depending on the target animal, the fodder mat is harvested between day 4 and day 8. Shorter cycles give a higher-energy, seed-dense feed; longer cycles give more leaf mass and fibre. We tailor the harvest day to whether the feed is going to poultry, pigs, or larger livestock like cattle and goats.",
  },
  {
    title: "6. Livestock Feed",
    desc: "Fresh fodder is delivered to farmers for immediate feeding.",
    detail:
      "The full root-and-shoot mat is delivered fresh — usually the same day it's cut — so farmers get maximum nutritional value with none of the storage losses associated with dried commercial feed. Farmers are shown how much to feed per animal type during onboarding and training.",
  },
];

const FAQS = [
  {
    q: "Why is hydroponic fodder cheaper than commercial feed?",
    a: "Because one kilogram of seed produces 6–7 kilograms of fresh feed in about a week, with no land preparation, ploughing, or seasonal planting cost. That conversion ratio, plus the water savings from a closed growing system, is what drives the feed-cost savings down by up to 50% compared to buying commercial feed.",
  },
  {
    q: "Do I need a lot of land or special soil to start?",
    a: "No. The entire point of the system is that it does not use soil at all — fodder is grown in stacked trays, so a small room or shaded shed is enough to produce meaningful volumes of feed year-round.",
  },
  {
    q: "How much water does the system actually use?",
    a: "Because water is recycled through the trays rather than lost to soil absorption and runoff, the system uses up to 80% less water than growing the equivalent feed conventionally.",
  },
  {
    q: "What happens during the dry season or drought?",
    a: "The system is climate-resilient by design — because it does not depend on rainfall, seasonal soil conditions, or irrigation from open sources, production continues year-round regardless of drought or land limitations.",
  },
  {
    q: "Can I get trained on how to run this myself?",
    a: "Yes — hands-on farmer training on production, system operation, maintenance, and feeding is one of our core services. Visit the Services page to request a training session for you or your cooperative.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">Our Solution: Hydroponic Fodder</h1>
      <p className="mt-4 text-stone-600">
        Hydroponics allows animal feed to be produced without conventional soil-based
        cultivation, using controlled growing conditions and trays. One kilogram of seeds can
        produce 6–7 kilograms of feed within seven days, enabling rapid, continuous production
        regardless of land size or season.
      </p>

      <h2 className="mt-12 text-xl font-semibold text-stone-900">How It Works</h2>
      <p className="mt-1 text-sm text-stone-500">Tap a step to read the full explanation.</p>
      <div className="mt-4">
        <Accordion
          items={STEPS.map((step, i) => ({
            title: step.title,
            badge: (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-800 text-xs font-semibold text-white">
                {i + 1}
              </span>
            ),
            content: (
              <div>
                <p className="text-stone-500">{step.desc}</p>
                <p className="mt-2">{step.detail}</p>
              </div>
            ),
          }))}
        />
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-stone-200 p-5">
          <p className="font-semibold text-stone-900">Feed-Cost Savings</p>
          <p className="mt-1 text-sm text-stone-600">Up to 50% lower feed costs compared to commercial feed.</p>
        </div>
        <div className="rounded-xl border border-stone-200 p-5">
          <p className="font-semibold text-stone-900">Water Efficiency</p>
          <p className="mt-1 text-sm text-stone-600">Consumes up to 80% less water through recycling.</p>
        </div>
        <div className="rounded-xl border border-stone-200 p-5">
          <p className="font-semibold text-stone-900">Climate Resilience</p>
          <p className="mt-1 text-sm text-stone-600">Operates year-round, unaffected by drought or land limits.</p>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-semibold text-stone-900">Frequently Asked Questions</h2>
      <div className="mt-4">
        <Accordion items={FAQS.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
      </div>
    </div>
  );
}
