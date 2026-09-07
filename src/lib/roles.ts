export const ROLES = [
  "SUPER_ADMIN",
  "MANAGER",
  "CONTENT_MANAGER",
  "HR_MANAGER",
  "SALES_MANAGER",
  "FARMER_COORDINATOR",
  "EDITOR",
] as const;

export type Role = (typeof ROLES)[number];

// Which admin sections each role can access. SUPER_ADMIN always has full access.
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"],
  MANAGER: [
    "dashboard",
    "products",
    "services",
    "requests",
    "news",
    "events",
    "jobs",
    "applications",
    "media",
    "farmer-stories",
    "messages",
    "impact",
    "settings",
  ],
  CONTENT_MANAGER: ["dashboard", "news", "events", "media", "farmer-stories"],
  HR_MANAGER: ["dashboard", "jobs", "applications"],
  SALES_MANAGER: ["dashboard", "products", "services", "requests", "messages"],
  FARMER_COORDINATOR: ["dashboard", "farmer-stories", "requests"],
  EDITOR: ["dashboard", "news", "media"],
};

export function canAccess(role: string, section: string): boolean {
  const perms = ROLE_PERMISSIONS[role as Role];
  if (!perms) return false;
  return perms.includes("*") || perms.includes(section);
}
