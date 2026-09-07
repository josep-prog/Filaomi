export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-3xl font-bold text-stone-900">About Us</h1>
      <p className="mt-4 text-stone-600">
        The Green Livestock and Hydroponics Initiative grew out of lived experience in a
        farming family in Rusizi, Rwanda, where livestock represented an important economic
        safety net and high feeding costs became a major challenge. Today, Filaomi Company Ltd
        helps smallholder livestock farmers overcome rising feed costs, limited land, water
        scarcity, and a changing climate through affordable hydroponic fodder production.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Mission</h2>
          <p className="mt-2 text-stone-600">
            To make climate-resilient livestock feeding accessible and affordable for every
            smallholder farmer in Rwanda.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-stone-900">Vision</h2>
          <p className="mt-2 text-stone-600">
            A Rwanda, and eventually a region, where livestock productivity is no longer
            constrained by land, water, or climate variability.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-stone-900">Our Story</h2>
        <p className="mt-2 text-stone-600">
          We tested hydroponic fodder production with more than 100 farmers from cooperatives
          in Nyaruguru and Gisagara, and with support from EU-Global Youth Mobilization,
          trained over 200 young people across youth centers in Western Rwanda. Our current
          production capacity is approximately one ton of fodder per month, and we are scaling
          toward more than five tons per month.
        </p>
      </div>
    </div>
  );
}
