/**
 * Clients we are allowed to name, in public, by name.
 *
 * This list previously carried eight names, six of which were invented — and
 * four of those ("TechCorp India", "Bloom Retail", "Northline Logistics",
 * "Aether Studios") were the same companies used as the employers of the fake
 * testimonial authors in content/testimonials.json. Anyone who checked would
 * have found the pattern in about thirty seconds, on the exact pages we're
 * trying to build authority with.
 *
 * Bonn and FabXpert Metal are real — both appear in content/portfolio.json with
 * live, linked sites.
 *
 * To add a name here you need WRITTEN PERMISSION from the client. Naming a
 * client without consent is a legal exposure independent of any SEO concern.
 *
 * Lives in lib/ rather than inside trust-bar.tsx because the lead-form panel
 * names the same clients, and two copies of a list governed by a permission
 * rule is how one of them goes stale.
 */
export const permittedClients = [
  "Bonn",
  "FabXpert Metal",
  "Ground Zero",
  "DAUR",
] as const;
