import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { canAccess } from "@/lib/roles";
import { SignOutButton } from "@/components/sign-out-button";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", section: "dashboard" },
  { href: "/admin/products", label: "Products", section: "products" },
  { href: "/admin/requests", label: "Requests", section: "requests" },
  { href: "/admin/jobs", label: "Jobs & Applications", section: "jobs" },
  { href: "/admin/news", label: "News", section: "news" },
  { href: "/admin/events", label: "Events", section: "events" },
  { href: "/admin/farmer-stories", label: "Farmer Stories", section: "farmer-stories" },
  { href: "/admin/media", label: "Media Library", section: "media" },
  { href: "/admin/messages", label: "Messages", section: "messages" },
  { href: "/admin/impact", label: "Impact Metrics", section: "impact" },
  { href: "/admin/settings", label: "Settings", section: "settings" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const role = session.user.role;
  const items = NAV_ITEMS.filter((item) => canAccess(role, item.section));

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="w-64 shrink-0 border-r border-stone-200 bg-white">
        <div className="border-b border-stone-200 p-4">
          <p className="font-semibold text-green-800">GLHI Admin</p>
          <p className="mt-1 text-xs text-stone-500">{session.user.email}</p>
          <p className="text-xs text-stone-400">{role.replaceAll("_", " ")}</p>
        </div>
        <nav className="flex flex-col gap-1 p-3 text-sm">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-stone-700 hover:bg-stone-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
