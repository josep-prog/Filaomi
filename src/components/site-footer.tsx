import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-stone-600 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-semibold text-stone-900">Green Livestock &amp; Hydroponics Initiative</p>
          <p className="mt-2 max-w-sm">
            A family-owned initiative based in Rusizi, Rwanda, producing affordable and
            climate-resilient livestock feed through hydroponic fodder technology.
          </p>
        </div>
        <div>
          <p className="font-semibold text-stone-900">Explore</p>
          <ul className="mt-2 space-y-1">
            <li><Link href="/services" className="transition-colors hover:text-green-800">Services</Link></li>
            <li><Link href="/impact" className="transition-colors hover:text-green-800">Impact</Link></li>
            <li><Link href="/farmers" className="transition-colors hover:text-green-800">Farmer Stories</Link></li>
            <li><Link href="/news" className="transition-colors hover:text-green-800">News</Link></li>
            <li><Link href="/events" className="transition-colors hover:text-green-800">Events</Link></li>
            <li><Link href="/media" className="transition-colors hover:text-green-800">Media</Link></li>
            <li><Link href="/careers" className="transition-colors hover:text-green-800">Careers</Link></li>
            <li><Link href="/verify" className="transition-colors hover:text-green-800">Verify a Record</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-stone-900">Connect</p>
          <p className="mt-2">Rusizi, Rwanda</p>
          <p>Instagram: @livestock_farm_</p>
          <Link href="/contact" className="mt-2 inline-block transition-colors hover:text-green-800">Contact Us →</Link>
          <p className="mt-4">
            <Link href="/admin/login" className="text-xs text-stone-400 transition-colors hover:text-green-800">Staff Login</Link>
          </p>
        </div>
      </div>
      <div className="border-t border-stone-200 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Filaomi Company Ltd. All rights reserved.
      </div>
    </footer>
  );
}
