# Green Livestock and Hydroponics Initiative — Website & CMS

A company website with a built-in admin dashboard so staff can manage products, services,
jobs, news, events, farmer stories, media, and incoming requests without touching code.

## Stack

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- **Prisma** ORM with SQLite for local development (swap `DATABASE_URL` for Postgres/MySQL in production)
- **NextAuth (Credentials)** for staff login, with role-based access control
- Server Actions for all mutations (no separate REST/GraphQL layer needed)

## Getting Started

```bash
npm install
npx prisma migrate dev   # creates the local SQLite database
npm run db:seed          # creates a super admin + sample content
npm run dev
```

Visit http://localhost:3000 for the public site and http://localhost:3000/admin/login
for the staff dashboard.

Seeded admin login (change the password after first login, or set
`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars before seeding):

- Email: `admin@filaomicompany.com`
- Password: `ChangeMe123!`

## Project Structure

- `src/app/(site)/*` — public website pages (home, about, products, services, careers, etc.)
- `src/app/admin/*` — staff dashboard (protected by middleware + NextAuth)
- `src/app/admin/(dashboard)/actions.ts` — server actions for all admin CRUD operations
- `src/app/(site)/actions.ts` — server actions for public forms (contact, job applications, service/event requests)
- `prisma/schema.prisma` — full data model (products, services, jobs, news, events, media, farmer stories, impact metrics, settings, audit log, etc.)
- `data/` — source material (Instagram photos/videos, pitch deck, application draft) for populating real content

## What's fully built vs. scaffolded

**Fully working (create/edit/delete/publish + public rendering):**
Products, Jobs & Applications, Service Requests, Contact Messages, Media Library (real file
uploads to `public/uploads`), Impact Metrics, Website Settings.

**Basic (create/list/delete, following the same pattern — extend as needed):**
News, Events, Farmer Stories.

**Not yet built** (noted in the original spec but out of scope for this first pass):
verification-record admin UI (the public `/verify` page works against the `VerificationRecord`
table, but records must currently be added via Prisma Studio or a script), user management UI
for creating additional staff accounts, SEO fields UI, analytics/reporting, audit log viewer.

## Roles

Defined in `src/lib/roles.ts`: `SUPER_ADMIN`, `MANAGER`, `CONTENT_MANAGER`, `HR_MANAGER`,
`SALES_MANAGER`, `FARMER_COORDINATOR`, `EDITOR`. The sidebar only shows sections a role can
access; `SUPER_ADMIN` sees everything.

## Useful commands

```bash
npm run db:studio   # visual database browser (Prisma Studio)
npm run db:seed     # re-run the seed script
npm run build        # production build
```
