<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Content and claims

These rules exist because the site previously shipped invented client names,
a "5.0 across 47 client reviews" badge backed by nothing, and round
performance figures with no source — on the same pages being pushed for
E-E-A-T. Each one is a claim a buyer or a quality rater can falsify in under a
minute, and a GEO strategy is explicitly designed to get such claims quoted
back at you by a prospect's AI tool.

1. **No number, client name, or quote ships unless it is traceable to a real
   engagement.** A specific small number ("14 projects, 9 clients") reads as
   more credible than a round large one and survives being asked about.
   Prefer one fully-stated result — "Bonn: 340 monthly enquiries, average
   handling time cut from 6 minutes to 40 seconds, measured over 8 weeks" —
   over four averages.
2. **Never emit schema for content that is not visible on the page.** This is
   why FAQ markup and the rendered accordion travel together.
3. **A `sameAs` entry must resolve.** A link to a 404 is worse than omitting
   the profile: it breaks the entity resolution that Google's Knowledge Graph
   and every LLM depend on. Three of the four social URLs here were 404s.
4. **No `aggregateRating` until real reviews are displayed on the page that
   carries the markup.** `lib/schema.ts` already enforces this — keep it.
5. **One `@id` per entity.** Two nodes claiming one identity is worse than a
   changed id.
6. **Addresses are only for places that exist.** An office with
   `hasAddress: false` in `config/site.ts` must never emit a `PostalAddress`
   or a LocalBusiness node. Fabricated NAP gets Google Business Profiles
   suspended, and suspensions cascade across an account.
7. **Availability claims must agree across pages.** If `/contact` says
   09:00–19:00 IST, nothing elsewhere may claim 24/7.
8. **Location pages are hand-written, one file each.** There is deliberately
   no `app/locations/[slug]/page.tsx` — a dynamic route makes adding a 30th
   city a one-line edit, and that ergonomic is how doorway pages get built.

See `Plan.md` for the SEO/GEO strategy these rules support.

# Adding a service

`content/services.json` is the source of truth, but three other files must be
updated in lockstep or the failure is silent:

1. `lib/icons.ts` — add the icon to **both** the import list and
   `serviceIconMap`. `getServiceIcon` falls back to `Workflow` with no error,
   no warning and no build failure.
2. `lib/validations/lead.ts` — add the service title to `SERVICE_OPTIONS`. It
   must **byte-match** the `title` in `services.json`, because the service page
   passes `presetService={service.title}` into a `SERVICE_OPTIONS.find(...)`.
   A one-character drift makes the form preselect silently do nothing.
3. `config/navigation.ts` — otherwise the page is orphaned.

`app/sitemap.ts` and `app/llms.txt/route.ts` derive from the JSON and need no
edit. Run `npm run verify:content` to check all of the above.
