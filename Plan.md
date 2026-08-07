# Velex Infotech — SEO + GEO Plan

**Prepared:** 2026-08-04
**Domain:** velexinfotech.com
**Positioning:** India-headquartered (engineering hubs in **Ludhiana** and **Noida**) — serving **United States, United Kingdom, Canada and India**.

---

## How to read this document

Every claim below is tagged with how it was established:

| Tag | Meaning |
|---|---|
| **[SERP]** | A live search result page fetched on 2026-08-04 and read directly |
| **[HTML]** | Verified by fetching raw HTML and grepping the actual attribute |
| **[TRENDS]** | Google Trends, 12-month window |
| **[AUTOCOMPLETE]** | Google autocomplete API, real suggestions |
| **[PAA]** | Real "People Also Ask" block observed |
| **[STUDY]** | Published research, source linked |
| **[CODE]** | Verified against this repository |
| **[EST]** | Judgement or estimate — **not measured**. Treat with suspicion. |

Anything that could not be verified is labelled `unverified`. Nothing here is presented as fact when it is a guess. Where an earlier audit was wrong, that is stated plainly rather than quietly dropped.

---

# Part 0 — Where the site actually stands

## The real problem

| Metric | Value |
|---|---|
| URLs in sitemap.xml | 21 **[CODE]** |
| Indexed by Google | ~1–5 **[SERP]** |
| Indexed by **Bing** | **5** — `/`, `/about`, `/services`, `/contact`, `/services/agentic-ai` **[SERP]** |
| External backlinks | 0 |
| Internal links recorded by Google | 0 |
| Query mix | 100% branded (`velex`, `waljosh infotech`, `fabxpert`) |

**This is a Google-only indexation problem.** Bing already has the site. That reframes everything: nothing is technically broken enough to block a crawler — the domain simply has no crawl demand, because it has no external links and a weak internal graph.

## Corrections to the previous audit

Three claims in the earlier audit were checked and are **wrong**. Building against them would have wasted effort.

| Claim | Verdict | Evidence |
|---|---|---|
| "Homepage has 22 of 26 images missing `alt`" | ❌ **False** | There are exactly **3** image elements in the entire codebase: `app/services/[slug]/page.tsx:126`, `components/common/portfolio-preview.tsx:140`, `components/sections/integrations-section.tsx:28`. All three have `alt`. The third is `alt=""`, which is *correct* — it's a decorative logo beside a text label. **[CODE]** |
| "sitemap.xml / robots.txt need creating" | ❌ **Already exist and are good** | `app/sitemap.ts` and `app/robots.ts` generate both. The robots file already explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, CCBot. **[CODE]** |
| "Add hreflang for US/UK/CA/IN" | ❌ **Do not** | hreflang tells Google *which of several URLs* to serve to which audience. There is **one URL set**. Self-referential hreflang conveys zero information, adds 105 tags of maintenance surface, and creates a precedent that invites someone to later ship `/us/ /uk/ /ca/` duplicates — which would divide an already-invisible link graph by four. |

## Problems found that the audit missed

| # | Problem | Impact |
|---|---|---|
| 1 | **3 of 4 `sameAs` profiles are 404s.** LinkedIn, X/Twitter and YouTube all return 404. Only Instagram resolves. The footer renders a **visible broken LinkedIn link**. **[HTML]** | Critical — a `sameAs` pointing at nothing actively poisons the entity resolution that Google's Knowledge Graph and every LLM depend on |
| 2 | **`remark-gfm` is not installed.** `next.config.ts` calls `createMDX({})`; MDX v3 has no GFM. The table in `content/blog/ai-automation-roi.mdx:24-29` renders as literal pipe characters, and the `table`/`th`/`td` mappings in `mdx-components.tsx:89-110` are dead code. **[CODE]** | Blocks the entire comparison-table content strategy — and comparison pages have the highest AI-citation rate of any format |
| 3 | **The contact form discards every prospect's message.** `message` is validated in `lib/validations/lead.ts:47` and never included in the email sent by `app/api/contact/route.ts:56-66`. **[CODE]** | Every project description ever submitted has been silently lost |
| 4 | **Missing `RESEND_API_KEY` returns `{ok:true}`.** The lead evaporates while the user sees "Request received — the Velex team will respond within 24 hours." **[CODE]** | Silent lead loss |
| 5 | **The phone regex rejects `(555) 123-4567`.** `/^\+?[\d\s-]{10,20}$/` allows no parentheses and no dots. **[CODE]** | The two most common US and Canadian phone formats fail validation on the form about to receive US traffic |
| 6 | **The newsletter form makes no network call** and displays "You're on the list." **[CODE]** | Every signup discarded with a false confirmation |
| 7 | **The fake client names are provably fake.** "TechCorp India", "Bloom Retail", "Northline Logistics" and "Aether Studios" appear in `components/sections/trust-bar.tsx` **and** as the employers of the fake testimonial authors in `content/testimonials.json`. **[CODE]** | Findable in 30 seconds by anyone who checks |
| 8 | **`/locations/ludhiana` has zero inbound internal links.** It exists only in the sitemap. **[CODE]** | Textbook cause of "Discovered – currently not indexed" |
| 9 | **Three nav links point at anchors that don't exist** (`#content`, `#design`, `#video` on the web-development page) — broken in both navbar and footer. **[CODE]** | 3 of ~15 nav links dead |
| 10 | **`getServiceIcon` silently falls back to `Workflow`** for any unmapped icon — no error, no warning, no build failure. **[CODE]** | Trap for anyone adding a service |

---

# Part 1 — Keyword research

## 1.1 The single most important finding

> **The word "company" attracts directories and listicles.
> The word "services", a vertical, or a geography attracts ordinary vendor pages.**

Both SERPs below were fetched on the same day, in the same industry, for the same buyer: **[SERP]**

| Query | Directories | Vendor "Top N" listicles | Vendor service pages |
|---|---|---|---|
| `AI agent development **company**` | 2 | 4 | 4 |
| `agentic AI development **services**` | **0** | **0** | **10** |

This distinction is worth more than any keyword list in this document. Velex should not fight a single one of the four head terms it probably wants.

## 1.2 Short-tail head terms — relative interest **[TRENDS]**

Indexed 0–100 *within each comparison set*. Not comparable across sets.

**Set A — core service terms**

| Keyword | US | UK | Canada | India |
|---|---|---|---|---|
| AI agent | 45 | 37 | 45 | 55 |
| Data analysis | 42 | 43 | 37 | 64 |
| Software development | 22 | 20 | 19 | 30 |
| App development | 19 | 21 | 18 | 27 |
| Voice agent | 4 | 3 | 3 | 4 |

**Set B — buyer/commercial-intent terms**

| Keyword | US | UK | Canada | India |
|---|---|---|---|---|
| AI development company | 36 | 36 | 45 | 60 |
| Data analytics services | 16 | 16 | 20 | 27 |
| Custom software development | 11 | 20 | 7 | 17 |
| Mobile app development company | 6 | 10 | 3 | 26 |
| Chatbot development | 5 | 5 | 2 | 15 |

**Set C — terminology check (US)**

| Keyword | Avg interest |
|---|---|
| **AI agent** | **45** |
| AI automation | 27 |
| Agentic AI | 16 |
| AI chatbot | 12 |

**"AI agent" is ~3× "agentic AI"** and has the steepest growth curve of the four. The site currently leads with the lower-demand phrase.

## 1.3 Two intent traps — high volume, wrong buyer

These are the most valuable findings in the keyword research, because both terms *look* strong in Trends and are commercially worthless.

**Trap 1 — "data analysis" is education intent.** **[AUTOCOMPLETE]**
- `data analysis for` → *beginners, biologists, social scientists, research, python, dummies*
- `data analytics for` → *beginners, freshers, bcom students, commerce students, managers*

The strong Trends score (US 42 / UK 43 / CA 37 / IN 64) is overwhelmingly students looking for courses. **Never name the page "Data Analysis."** The commercial vocabulary is **"data analytics services"** and **"data analytics consulting"**.

**Trap 2 — "voice agent" / "voice ai" is consumer voice-changer intent.** **[AUTOCOMPLETE]**
- `voice ai` → *voice ai generator free, voice ai apk, voice ai vocal remover, voice ai download*

The literal phrase has near-zero commercial volume in all four markets **[TRENDS]**. The commercial vocabulary is **"AI receptionist"** and **"AI phone answering service"**, both of which have full autocomplete trees, live PAA blocks, and winnable SERPs.

**Trap 3 — `ai automation agency` attracts people who want to *start* one.** **[AUTOCOMPLETE]** `ai automation agency` → *course, course free, kya hota hai, near me, meaning, hub*. High Trends score, near-zero buyer intent. Deprioritise.

## 1.4 SERP reality check — can a DR<10 domain actually rank?

25+ live SERPs run on 2026-08-04. **[SERP]**

| Query | Verdict | What ranks |
|---|---|---|
| `agentic ai development services` | ✅ **Yes** | **10/10 vendor service pages. Zero directories.** |
| `whatsapp ai chatbot development company` | ✅ **Yes** | sumerudigital, kvistechlabs, studiokrew, arobit, metadesignsolutions, pixeltech.ai — **micro-domains. No Clutch, no GoodFirms, no DesignRush.** Softest SERP found anywhere. |
| `ai receptionist for dental clinics` | ✅ **Yes** ⭐ | getviva.ai, aumyai.com, dentiva.ai, fullchairhq.com, heygent.ai, huskyvoice.ai, sonixaai.com, dentilia.ai, airclinic.ai, dentalintel.com — **9 of 10 are micro-domains nobody has heard of. Zero directories. Zero authority sites.** |
| `data analytics services for small business` | ✅ **Yes** | Two boutique consultancies (valiotti.com, vidi-corp.com) **outrank the SaaS giants** — and both publish a price in the meta description. |
| `ai automation agency toronto` | ✅ **Yes** | torontoaiagency.ca, mehrana.agency, automiq.ca, theautomators.ai… **zero Clutch, zero GoodFirms, zero DesignRush.** |
| `how much does it cost to build an ai agent` | ✅ **Yes** | All agency blogs |
| `software development company in ludhiana` | ✅ **Yes** | techbehemoths + tiny local sites (eifasoft, geniusoffice, indujitechnologies) |
| `ai phone answering service` | ⚠️ Strong content only | "We tested N" listicles + product homepages. Zero directories. Reddit ×5 and YouTube ×6 also present. |
| `whatsapp ai chatbot for business` | ⚠️ Strong content only | Meta-platform locked; **Reddit ranks #3–#6, above every vendor** |
| `agentic ai vs ai automation` | ⚠️ Strong content only | builtin, searchengineland, aws.amazon.com, geeksforgeeks — heavy publisher authority |
| `ai agent development company` | ❌ **No** | **Clutch #1, GoodFirms #2**, then 4 self-ranking vendor listicles |
| `app development company for startups` | ❌ **No — worst tested** | **7 of 10 are directories**: Clutch ×2, GoodFirms ×2, DesignRush ×2, startupsavant |
| `custom software development company` | ❌ **No** | Clutch, Gartner, plus enterprise brands |
| `ai call center software` | ❌ **No — wrong buyer** | Pure SaaS SERP (zendesk, aircall, cloudtalk). Velex sells builds, not software. |
| `ai agent for business` | ❌ **No — wrong intent** | Tool listicles (Deloitte, Forbes, monday.com). Ranking wouldn't produce leads. |
| `best ai chatbots for business 2026` | ❌ **No** | Product-review listicles by tool vendors |
| `app development company in noida` | ❌ **No** | GoodFirms ×2, topdevelopers ×2, mobileappdaily, topappdevcos, F6S — **9/10 directories** |

## 1.5 Keyword clusters — short-tail and long-tail

Difficulty is **[EST]** — judgement based on observed SERP composition, not a KD score. `⭐` = validated by a SERP actually run.

### Cluster 1 — AI Agents / Agentic AI → `/services/agentic-ai`

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| ai agent development company ⭐ | short head | comm-inv | High | listicle only — **not** the service page |
| **ai agent development services** ⭐ | mid | transactional | Med | `/services/agentic-ai` ← **primary** |
| **agentic ai development services** ⭐ | mid | transactional | Med | `/services/agentic-ai` |
| ai agent development cost ⭐ | mid | comm-inv | Med | blog (cost pillar) |
| how much does it cost to build an ai agent ⭐ | long-Q | comm-inv | Low-Med | blog |
| ai agent development cost in india | long | comm-inv | Low | blog |
| ai agent development cost per month | long | comm-inv | Low | blog |
| ai agents for small business ⭐ | mid | comm-inv | Med | blog |
| ai agents for small business owners | long | comm-inv | Low | blog |
| ai agent vs chatbot ⭐ | long-Q | informational | Med | blog |
| ai agent vs ai workflow | long-Q | informational | Low | update `ai-automation-vs-agentic-ai` |
| ai agent vs llm | long-Q | informational | Low | update `what-is-agentic-ai` |
| what is an ai agent in simple terms | long-Q | informational | Med | update `what-is-agentic-ai` |
| what is ai agent and how it works | long-Q | informational | Med | update `what-is-agentic-ai` |
| hire ai agent developers | mid | transactional | Low-Med | future `/hire-ai-agent-developers` |
| multi agent system development company | long | transactional | Low | `/services/agentic-ai` |
| ai agents for logistics / healthcare / manufacturing | long | comm-inv | **Low** | industry spokes |

> **[AUTOCOMPLETE]** `ai agent development` → *company, proposal, course, **services**, **company in india**, tools, means, framework, **cost***
> **[AUTOCOMPLETE]** `ai agent vs` → *agentic ai, llm, chatbot, ai workflow, automation* — a complete comparison cluster

### Cluster 2 — AI Automation → `/services/ai-automation`

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| ai automation agency ⭐ | head | comm-inv | High ⚠️ | — (wrong intent, see 1.3) |
| ai automation services | mid | transactional | Med | `/services/ai-automation` ← primary |
| **ai automation services for small business** ⭐ | long | transactional | Low-Med | `/services/ai-automation` |
| ai automation agency for small business ⭐ | long | transactional | Low-Med | `/services/ai-automation` |
| ai automation consulting for small business | long | transactional | **Low** | `/services/ai-automation` |
| ai workflow automation for small business | long | transactional | Low | blog |
| business process automation with ai | mid | comm-inv | Med | `/services/ai-automation` |
| ai automation vs rpa | long-Q | informational | Low | blog |
| n8n ai agent development services | long | transactional | **Low** | `/services/ai-automation` |
| n8n vs make vs zapier for business | long | comm-inv | Med | blog |
| ai automation for accounting firms | long | comm-inv | Low | spoke |
| ai automation for logistics companies | long | comm-inv | Low | spoke |
| ai automation for ecommerce | long | comm-inv | Med | spoke |
| what can ai automation do for my business | long-Q | informational | Low | service-page FAQ |
| how to automate customer support with ai | long-Q | informational | Low | blog |

> ⚠️ **`ai automation for real estate agents` is a trap** — the SERP is 100% tool listicles ("35+ Tools", "12 Best AI Tools"). A service page cannot rank; only a listicle can. **[SERP]**

### Cluster 3 — Voice / AI Receptionist → `/services/ai-receptionist` (**renamed from `/services/voice-agent`**)

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| ai phone answering service ⭐ | head | comm-inv | Med-High | listicle |
| **ai receptionist for small business** ⭐ | mid | transactional | Med | `/services/ai-receptionist` ← **primary** |
| ai receptionist cost ⭐ | mid | comm-inv | Low-Med | blog (cost pillar) |
| how much does an ai receptionist cost | long-Q | comm-inv | Low | blog |
| **ai receptionist for dental clinics** ⭐ | long | transactional | **Low** ⭐⭐ | vertical page |
| ai receptionist for law firms | long | transactional | Low | vertical page |
| ai receptionist for medical office / clinics | long | transactional | Low | vertical page |
| ai receptionist for salons / hotels | long | transactional | Low | vertical page |
| ai answering service for small business | long | transactional | Low-Med | `/services/ai-receptionist` |
| ai answering service for property management | long | transactional | **Low** | vertical page |
| ai answering service for restaurants | long | transactional | Low | vertical page |
| ai voice agent for appointment booking ⭐ | long | comm-inv | Low-Med | blog |
| ai voice agent for car dealerships | long | comm-inv | Low | spoke |
| ai voice agent for cold calling | long | comm-inv | Low | spoke |
| conversational ai development services | mid | transactional | Med | `/services/ai-receptionist` |
| voice ai agents for indian languages | long | comm-inv | **Low** | update `voice-ai-agents-call-centers` — a genuine India-only moat |
| ai voice agent vs human receptionist | long-Q | comm-inv | Low | comparison page |
| ai call center software ⭐ | head | comm-inv | High ⚠️ | — (SaaS SERP, wrong buyer) |

> **[PAA]** `ai receptionist for small business`: *"Which AI virtual receptionist is best for small businesses?"* · *"What's the best AI receptionist for 24/7 coverage?"* · *"What is an AI receptionist?"* · *"How can I use an AI virtual receptionist for my small business?"*

### Cluster 4 — WhatsApp / Chatbots → `/services/whatsapp-bot`

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| **whatsapp ai chatbot development company** ⭐ | mid | transactional | **Low** ⭐⭐ | `/services/whatsapp-bot` ← **primary** |
| whatsapp chatbot development company ⭐ | mid | transactional | **Low** | `/services/whatsapp-bot` |
| whatsapp ai chatbot for business ⭐ | head | comm-inv | Med | blog |
| whatsapp chatbot development cost india | long | comm-inv | Low | blog |
| whatsapp chatbot pricing | mid | comm-inv | Med | blog |
| how to create a whatsapp chatbot for my business | long-Q | informational | Med | update existing post |
| do i need whatsapp business api for a chatbot | long-Q | informational | Low | post FAQ |
| whatsapp ai chatbot for restaurants | long | comm-inv | Low | spoke |
| whatsapp chatbot for ecommerce | long | comm-inv | Low-Med | spoke |
| whatsapp chatbot for real estate | long | comm-inv | Low | spoke |
| whatsapp chatbot vs website chatbot | long-Q | comm-inv | Low | comparison |
| ai chatbot development company | mid | transactional | Med | `/services/whatsapp-bot` |
| ai chatbot for customer service | mid | comm-inv | Med | blog |
| best whatsapp chatbot for small business | long | comm-inv | Med | listicle |
| whatsapp business api pricing india ⭐ | long | comm-inv | Med ⚠️ | — (BSP SERP, wrong buyer) |

> **[PAA]** *"Which WhatsApp chatbot is best for small businesses?"* · *"Can I integrate the WhatsApp chatbot on the Website?"* · *"Does the WhatsApp AI chatbot support voice message processing?"*

### Cluster 5 — App Development → `/services/app-development`

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| app development company for startups ⭐ | head | comm-inv | **High** ❌ | — (7/10 directories) |
| mobile app development cost ⭐ | mid | comm-inv | Med | blog (cost pillar) |
| mobile app development cost in india ⭐ | long | comm-inv | Low-Med | blog |
| mobile app development cost in usa ⭐ | long | comm-inv | Med | blog |
| mobile app development cost in uk ⭐ | long | comm-inv | Low-Med | blog |
| how much does it cost to build an app in 2026 | long-Q | comm-inv | Med | blog |
| mobile app development for startups ⭐ | long | comm-inv | Med | `/services/app-development` |
| mobile app development for healthcare ⭐ | long | comm-inv | Low-Med | spoke |
| mvp app development company | mid | transactional | Low-Med | `/services/app-development` |
| ai mobile app development company | mid | transactional | Low-Med | `/services/app-development` |
| flutter app development company | mid | transactional | Med | `/services/app-development` |
| react native app development services | mid | transactional | Med | `/services/app-development` |
| cross platform app development services | mid | transactional | Low-Med | `/services/app-development` |
| hire mobile app developers india | long | transactional | Low-Med | hire page |
| how long does it take to build an app | long-Q | informational | Low | blog |

> **[AUTOCOMPLETE]** `mobile app development cost in` → *india, usa, uk, dubai, australia, 2026, calculator, breakdown pdf*. **Cost is the dominant commercial modifier in this cluster, not "company."**

### Cluster 6 — Web Development → `/services/web-development`

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| web development company | head | comm-inv | High ❌ | — |
| website development for small business ⭐ | long | comm-inv | Med | `/services/web-development` |
| website development for startups ⭐ | long | comm-inv | Med | `/services/web-development` |
| custom website development services | mid | transactional | Med | `/services/web-development` |
| how much does a website cost for a small business | long-Q | comm-inv | Med | blog |
| website development cost india | long | comm-inv | Low | blog |
| **nextjs development company** | mid | transactional | **Low** | `/services/web-development` |
| headless cms website development | long | transactional | Low | spoke |
| b2b website development agency | long | transactional | Low | `/services/web-development` |
| website redesign services for small business | long | transactional | Low | spoke |
| landing page development services | mid | transactional | Low-Med | `/services/web-development` |
| website speed optimization services | mid | transactional | Low-Med | spoke |
| seo friendly website development | long | comm-inv | Low-Med | `/services/web-development` |
| **website development for manufacturers / exporters** | long | comm-inv | **Low** | spoke — direct Ludhiana fit |
| web development company in ludhiana ⭐ | local | local | **Low** | `/locations/ludhiana` |

### Cluster 7 — Software Development → **NEW `/services/software-development`**

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| custom software development company ⭐ | head | comm-inv | **High** ❌ | — |
| **custom software development services** | mid | transactional | Med | NEW page ← **primary** |
| custom software development for startups ⭐ | long | comm-inv | Med | NEW page |
| custom software development for small businesses ⭐ | long | transactional | Low-Med | NEW page |
| custom software development for healthcare ⭐ | long | comm-inv | Low-Med | spoke |
| custom software development for logistics ⭐ | long | comm-inv | **Low** | spoke |
| custom software development for manufacturing | long | comm-inv | **Low** | spoke — Ludhiana fit |
| software development company in india ⭐ | mid | comm-inv | High | NEW page |
| offshore software development company india | long | transactional | Med | NEW page |
| software development cost india | long | comm-inv | Low | blog |
| how much does custom software cost | long-Q | comm-inv | Med | blog |
| saas development company | mid | transactional | Med | spoke |
| mvp development company for startups | long | transactional | Low-Med | spoke |
| erp software development company | mid | transactional | Med | spoke |
| legacy software modernization services | mid | transactional | Low | spoke |
| custom software vs off the shelf | long-Q | comm-inv | Low | blog |
| hire dedicated developers india | mid | transactional | Med | hire page |
| software development company in ludhiana ⭐ | local | local | **Low** | `/locations/ludhiana` |

> **[AUTOCOMPLETE]** `custom software development for` → *startups, healthcare, small businesses, logistics, iot, enterprise, travel, automotive*. **The industry modifier is the whole opportunity.**

### Cluster 8 — Data Analytics → **NEW `/services/data-analytics`**

| Keyword | Type | Intent | Diff | Target page |
|---|---|---|---|---|
| data analysis / data analytics | head | **education** ❌ | — | **Do not target** (see 1.3) |
| data analytics services ⭐ | mid | transactional | Med | NEW page ← **primary** |
| data analytics consulting services ⭐ | mid | transactional | Med | NEW page |
| **data analytics services for small business** ⭐ | long | transactional | **Low-Med** ⭐ | NEW page |
| small business data analytics consulting ⭐ | long | transactional | **Low** | NEW page |
| data analytics services in usa ⭐ | long | transactional | Med | NEW page + US market page |
| data analytics services in india ⭐ | long | transactional | Low-Med | NEW page |
| power bi consulting services ⭐ | mid | transactional | Med | spoke |
| power bi development services india | long | transactional | **Low** | spoke |
| ecommerce data analytics services ⭐ | long | transactional | Low-Med | spoke |
| data analytics for manufacturing | long | comm-inv | **Low** | spoke — Ludhiana fit |
| business intelligence services for small business | long | transactional | Low | spoke |
| how much does data analytics consulting cost | long-Q | comm-inv | **Low** | blog |
| dashboard development services | mid | transactional | Low | spoke |
| data visualization services | mid | transactional | Med | NEW page |
| data engineering services company | mid | transactional | Med | spoke |
| looker studio consulting services | long | transactional | **Low** | spoke |
| data warehouse development services | mid | transactional | Med | spoke |
| ai powered analytics services | long | transactional | Low | NEW page — ties to the AI positioning |

> **[PAA]** `data analytics for small business`: *"What are the benefits of using data analytics tools for small businesses?"* · *"How do I choose the right data analytics tool for my small business?"*
> **Related searches observed:** *small business data analytics consulting* · *benefits of big data for small business* · *how is analytics in a small business different from a large one*

## 1.6 Geo-modified keywords

**Architecture note:** if country pages are ever built, use **locale subfolders** (`/us/`, `/uk/`, `/ca/`) — the pattern Appinventiv and Vegavid use successfully — not inconsistent flat slugs. A verified working template: `automatenexus.com/locations/international/canada/toronto` ranks #6 for `ai automation agency toronto` on ~1,200–1,400 words with a city-specific FAQ and sibling-city links. **[SERP]**

### 🇺🇸 United States
| Keyword | Realistic? |
|---|---|
| ai automation agency for us small business | ✅ Realistic |
| ai receptionist for small business usa | ✅ Realistic |
| data analytics services in usa ⭐ | ✅ Realistic |
| ai automation agency [Austin / Denver / Phoenix / Charlotte] | ✅ Realistic — tier-2 cities |
| offshore ai development company for us clients | ✅ Realistic |
| ai agent development services usa | ⚠️ Borderline |
| ai agent development company usa ⭐ | ❌ Vanity — 2 directories + 7 listicles |
| ai automation agency new york / san francisco | ❌ Vanity |
| custom software development company usa | ❌ Vanity |

### 🇬🇧 United Kingdom
| Keyword | Realistic? |
|---|---|
| **ai automation agency [Manchester / Birmingham / Leeds / Bristol]** | ✅ **Best UK entry point** |
| ai receptionist for uk small business | ✅ Realistic |
| whatsapp chatbot development uk | ✅ Realistic |
| data analytics consulting uk small business | ✅ Realistic |
| mobile app development cost uk ⭐ | ✅ Realistic |
| ai automation agency uk ⭐ | ⚠️ Borderline — micro-domains, but exact-match domains hold it |
| ai development company uk ⭐ | ❌ Vanity — F6S, DesignRush, Clutch, topdevelopers |
| ai automation agency london ⭐ | ❌ Vanity — Clutch at #4 |

### 🇨🇦 Canada — **the softest of the four markets**
`ai automation agency toronto` top 10: torontoaiagency.ca, torontodigital.ca, mehrana.agency, theautomators.ai, automiq.ca, automatenexus.com, bestplacestohire.com, yzautomations.com, swiftbiz.ca, builts.ai. **Zero Clutch, zero GoodFirms, zero DesignRush.** **[SERP]**

| Keyword | Realistic? |
|---|---|
| **ai automation agency toronto** ⭐ | ✅ **Highly realistic — no directories at all** |
| ai automation agency [Vancouver / Calgary / Ottawa / Mississauga] | ✅ Highly realistic |
| ai receptionist for canadian small business | ✅ Realistic |
| whatsapp chatbot development canada | ✅ Realistic |
| data analytics consulting toronto | ✅ Realistic |
| ai agent development company canada | ⚠️ Borderline |
| ai automation agency montreal | ⚠️ French-language competition |
| ai development company canada | ❌ Vanity |

### 🇮🇳 India — Ludhiana
**Honest finding:** `ai company in ludhiana` returns only **2** autocomplete suggestions, versus 10 for `digital marketing company in ludhiana`. **AI terms in Ludhiana have near-zero volume.** Web/software terms are real but small. **[AUTOCOMPLETE]**

| Keyword | Realistic? |
|---|---|
| software development company in ludhiana ⭐ | ✅ Realistic |
| web development company in ludhiana ⭐ | ✅ Realistic |
| it company in ludhiana ⭐ | ✅ Realistic |
| top software companies in ludhiana ⭐ | ✅ Realistic |
| erp software company in ludhiana ⭐ | ✅ Realistic |
| app development company in ludhiana | ✅ Realistic |
| whatsapp chatbot for hosiery exporters / manufacturers | ✅ Tiny volume, **very high conversion** |
| ai automation company in punjab ⭐ | ⚠️ Borderline — techbehemoths, F6S, topdevelopers, Sortlist |
| ai company in ludhiana | ❌ **Vanity — near-zero volume** |

### 🇮🇳 India — Noida / Delhi-NCR
| Keyword | Realistic? |
|---|---|
| whatsapp chatbot development company noida | ✅ Realistic |
| ai automation agency delhi ncr | ✅ Realistic |
| ai receptionist for clinics in delhi | ✅ Realistic |
| hire ai developers noida | ✅ Realistic |
| software development company in noida ⭐ | ⚠️ Borderline — real demand, directory-heavy SERP |
| data analytics company in noida | ⚠️ Borderline |
| ai development company noida ⭐ | ❌ Vanity — DesignRush, F6S, topdevelopers ×2, techbehemoths, Tracxn = 7/10 directories |
| app development company in noida ⭐ | ❌ **Worst tested** — 9/10 directories |

> ⚠️ **Blunt assessment.** Noida and Ludhiana *city* terms are the most directory-locked and lowest-volume keywords in this entire document. They matter for **local credibility and Google Business Profile**, not for traffic. **Canada city pages will return more leads per hour of work than anything in Delhi-NCR.**

## 1.7 Intent map

| Intent | Examples | Owns |
|---|---|---|
| Informational | *what is an ai agent*, *ai automation vs agentic ai*, *ai agent vs chatbot* | Top-of-funnel blog; AI-citation surface |
| Commercial investigation | *ai receptionist cost*, *how much does it cost to build an ai agent*, *best whatsapp chatbot for small business* | Cost posts, comparison posts, listicles |
| Transactional | *agentic ai development services*, *whatsapp ai chatbot development company*, *data analytics consulting services* | Service pages |
| Local | *software development company in ludhiana*, *ai automation agency toronto* | Location pages + GBP |

---

# Part 2 — Competitor analysis **[SERP]**

Eight verified competitors, all serving US/UK/CA from India or an offshore-hybrid base.

### The tactic that matters most

**Four of the top-10 for `AI agent development company` are vendors ranking a listicle that lists themselves.** Azilen ranks itself **#1 of 10**. eSparkBiz ranks itself **#1 of 25** ("Best Overall AI Agent Partner: eSparkBiz"). Intuz ranks itself **#3 of 10** — the more credible variant for an unknown brand, and the one Velex should copy.

| # | Domain | Base | Top-ranking page | Location pages | Self-listicle? | Worth copying |
|---|---|---|---|---|---|---|
| 1 | **leewayhertz.com** | US-reg / India delivery | `/ai-agent-development-company/` — money page at **#3** | None | ❌ | Root-level exact-match URLs (not `/services/…/`) + an "As Mentioned In" press band |
| 2 | **esparkinfo.com** | Ahmedabad | `/generative-ai/ai-agent/top-companies` — **self-#1 listicle** | **~900+ URLs**, `…/top-companies/[location]`, ~8–9k words each — **not thin** | ✅ Purest example | The 3-template silo: money page + `/top-companies` listicle + `/hire-[role]`, then × location |
| 3 | **azilen.com** | Ahmedabad | `/learning/top-ai-agent-development-companies/` — **self-#1, ranks #4** | ~10, **inconsistent slugs** (anti-pattern) | ✅ | `/learning/` instead of `/blog/`, and a **vendor-selection criteria section published *before* the rankings** — that is what makes self-ranking defensible |
| 4 | **appinventiv.com** | **Noida** | `/ai-agent-development-services/` — note *services*, not *company* | **Locale subfolders** `/ca/`, `/en-uk/`, `/en-au/`, `/en-us/` — ~500+ URLs | ❌ | Locale-prefix architecture + a named compliance/security block (SOC2/GDPR/HIPAA) |
| 5 | **intuz.com** | SF + Ahmedabad | Both a self-#3 listicle and a service page | None | ✅ soft | ⭐ **Publishes real price tiers:** $5–10k exploration / $15–40k prototype / $40–150k production / $8–25k-mo scale |
| 6 | **datatobiz.com** | **Mohali, Punjab (~100km from Ludhiana)** | `/ai-agent-development-company/` at **#8** | Few | ✅ in blog | **~30 landing pages + ~400 posts ranks top-10 on the head term.** Runs the exact AI+Analytics dual positioning Velex is adding |
| 7 | **bitcot.com** | San Diego + India | `/services/ai-automation-agency/` + a root-level listicle | Talent-led `/[role]-[city]/` | ✅ | Root-level listicle URLs beat `/blog/` ones; prominent **US phone number** |
| 8 | **ampcome.com** | India (smallest — closest to Velex today) | `/post/ai-agent-development-company-india` — **#9 on a listicle SERP with a single-vendor page** | One | ❌ | ⭐ A **"Why India Is the Global Hub…"** on-page section — converts the offshore objection into ranking content |

**Second tier:** **Vegavid** runs `/uk/ai-agent-development-company` and `/ca/…` — country-subfolder pages that rank (UK #9, CA #7) *and* double-dip with a listicle on the same SERP. **CloudPartner.ai** ranks #10 on the head term with ~12 blog posts — the closest existence proof that a tiny site can do this.

### Structural baseline to match **[EST — word counts estimated from page summaries]**
Money pages **4,500–9,500 words** · FAQ accordion of **6–12 questions** · 3–8 case studies with hard percentages · named stack (LangGraph, CrewAI, n8n) · 5–7 step process · 6–14 industry verticals.

**Velex's current gap:** `/services/voice-agent` is **~800 words with no FAQ section**. That is a **6–10× content gap on every money page.**

---

# Part 3 — GEO (AI answer engine optimisation)

## 3.1 What the evidence actually says

| Finding | Number | Source |
|---|---|---|
| AI Overview citations that also rank top-10 | **37.9%** — down from ~76% in Jul 2025 (863K keywords, 4M AIO URLs, Mar 2026) | [Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/) |
| Competing estimates for the same metric | 17% (BrightEdge) / 52% (Originality.AI) — **genuinely contested** | SEJ |
| Reddit share of ChatGPT citations | **16.7% — the #1 domain.** Wikipedia 8.9%, Forbes 3.3% | [Ahrefs](https://ahrefs.com/blog/most-cited-domains-in-chatgpt/) |
| Branded web **mentions** vs AI citations | **r = 0.664** | [Ahrefs, 75K brands](https://ahrefs.com/blog/ai-overview-brand-correlation/) |
| **Backlinks** vs AI citations | **r = 0.218** — mentions beat links ~3× | same |
| **YouTube** mentions vs AI citations | **r = 0.737 — strongest single signal** | same |
| **Comparison pages** | **1.87 citations/retrieval — highest of any format, +45% vs average** | [DeltaV, 21K responses](https://www.deltavdigital.com/resources/reports/ai-citation-study/) |
| **Listicle** share of citations in B2B tech services | **61%** | same |
| A B2B brand's **own domain** share of top-30 citations | **0.0%** — LinkedIn was #1 (736 citations) | same ⚠️ n=1 brand |
| Query fan-out | AI Mode decomposes 1 query into **8–16 sub-queries** | Search Engine Land |
| AI Overview activation on **question-phrased** queries | **64.7%** vs 13.7% overall | arXiv survey |
| Optimised review profiles | **9.5× more AI co-mentions**; ChatGPT quoted the star rating in **59%** of responses | [Seer/Trustpilot, 800K responses](https://www.seerinteractive.com/insights/study-of-800k-ai-responses-how-reviews-shape-brand-presence-in-ai-search) |

**The academic debunk, stated honestly:** the widely-quoted "GEO boosts visibility 40%" figure ([arXiv 2311.09735](https://arxiv.org/abs/2311.09735)) is substantially narrowed by a [2026 critical survey of 45 studies](https://arxiv.org/html/2607.14035v1). The 40% is a *relative* move in one metric, "conditional on a source already being present in a fixed context." It establishes "neither organic discoverability nor durable traffic effects." **Formatting alone has weak effects; keyword stuffing measurably hurts.** Relevance and being in the retrieval pool are first-order; formatting is second-order.

## 3.2 llms.txt — keep it, but stop investing in it

- Ahrefs studied **137,210 domains**: 28% published a valid llms.txt; **97% of those files received zero requests.** AI *retrieval* bots (PerplexityBot, OAI-SearchBot) were **1.1%** of hits — SEO audit tools hit it more than all AI bots combined. ([study](https://ahrefs.com/blog/llmstxt-study/))
- Google, officially: *"You don't need to create new machine readable files, AI text files, markup, or Markdown… Google Search itself doesn't use them."* Mueller compared it to the keywords meta tag.
- The 45-study arXiv survey does not mention llms.txt at all.

**Verdict:** the route already exists and costs nothing to keep. Add `X-Robots-Tag: noindex` so it can't be indexed as a page. **Do not build llms-full.txt or invest further.** The things that actually work are: explicit robots.txt allowlisting (already done), server-rendering every route (already done — every page returns `X-Nextjs-Prerender: 1`), and accurate `lastmod`.

**Also honest:** SE Ranking found pages *with* FAQ schema averaged **3.6** ChatGPT citations vs **4.2** without. Do FAQ schema for entity disambiguation and because it forces good on-page Q&A structure — **do not expect it to move AI citations by itself.** Note also that since August 2023, Google shows FAQ rich results only for authoritative government and health sites, so FAQPage markup will **not** produce a SERP accordion for Velex.

## 3.3 Six tactical rules

**1. Your own domain will not be the citation surface — plan for that.** Listicles earn 61% of AI citations in B2B tech services, and in that vertical the brand's own domain earned **0.0%** of top-30 citations. So: (a) publish your own ranked roundup that **includes competitors honestly** — one that omits them reads as a service page and forfeits the format's advantage; (b) pitch inclusion in the roundups already ranking. One inclusion beats five of your own posts.

**2. Publish real prices — the highest-leverage, lowest-effort change available.** On the data-analytics SERP, the *only* two boutiques that outranked SaaS giants both put a number in the meta description (`"Packages from $3,000"`, `"starting from $1,000"`). Same on voice: `heyrosie.com "From $49"`. Intuz publishes four tiers while every competitor hides behind "contact us". **Put a starting price and delivery window in the `<title>` and first 40 words of every service page.** It wins the large verified `…cost` demand, it is the exact passage LLMs extract, and it pre-qualifies leads.

**3. Build one comparison page per service line.** Highest citation rate of any format (1.87/retrieval). Format: the title names the exact entities; a 3-column decision table above the fold; a 40-word "which should you pick" verdict; 150 words per option; a "when this is the wrong choice" section. **Include the option you don't sell** — that is what makes it quotable rather than a pitch.

**4. Write for fan-out sub-queries, phrased as questions.** AI Mode fans out into 8–16 sub-queries, and 62–83% of citations come from pages *not* ranking top-10 for the head term. AI Overview activation jumps 13.7% → **64.7%** on question-phrased queries. Make every H2 a literal question, answer in **≤40 words** immediately below, then 120–180 words of support.

**5. Spend on mentions, not links.** Mentions correlate 0.664 vs backlinks 0.218 — good news for a 0-backlink domain, since **unlinked mentions count**. Order of effort: **LinkedIn** (the #1 cited domain for B2B tech services — post comparison tables *natively*, don't just link out) → **YouTube** (0.737, strongest single signal) → **Reddit** → guest-roundup inclusion.

**6. Participate on Reddit honestly; refresh on a 30-day cycle.** Reddit is ChatGPT's #1 cited domain and ranks #1–#6 on three of four tested commercial queries. Relevant subs: r/AI_Agents, r/automation, r/n8n, r/smallbusiness, r/Entrepreneur, r/analytics, **r/Construction** (where trades ask about AI call answering). Answer with real prices and real failure modes; **disclose affiliation** — astroturfing gets the account nuked and takes the citation with it. Separately, carry a visible "Last verified: [date]" plus `dateModified`, and genuinely re-verify quarterly: AI-cited content is 25.7% fresher than organic.

## 3.4 The citable-passage template

Use this for every new H2 on both blog posts and service pages. `content/blog/what-is-agentic-ai.mdx` already does this well and is the in-repo reference implementation.

```
## [Question-shaped heading matching a real query]
   ("What is an AI phone answering service?" — not "Voice Agent Overview")

[SENTENCE 1 — the answer, ≤40 words, no pronouns pointing outside the
sentence, liftable verbatim into a snippet.]

[PARAGRAPH — 60–110 words of mechanism: how it works, what's included,
what it depends on.]

[OPTIONAL: 3–5 bullets, a numbered sequence, or a short comparison —
each bullet a complete, self-contained claim.]

[CLOSING SENTENCE — restates the answer in different words.]
```

Target **134–167 words** for answer + supporting paragraph combined, excluding bullets. That is the length of the passage in `what-is-agentic-ai.mdx` that already reads as citation-ready.

Additional rules:
1. **Every number carries a unit and a basis.** Never "up to 80%" with no source.
2. **Self-contained paragraphs** — each must survive being lifted alone. Repeat the subject instead of "it"/"this".
3. **Entity co-occurrence** — at least one factual sentence per post naming *Velex Infotech* + the service + the market, so an extractor has an attributable claim.
4. **`## Frequently asked questions`** at the end, backed by real FAQPage markup, with the Q&As **visible on the page**.

## 3.5 GEO readiness — current scores **[EST]**

| Dimension | Score | Note |
|---|---|---|
| Technical accessibility | 88/100 | Every page returns `X-Nextjs-Prerender: 1` — full SSR, no CSR gating. AI crawler allowlist correct. |
| Citability | 78/100 | Blog is genuinely well-structured; **service pages have no Q&A surface at all** |
| Structural readability | 75/100 | Question-shaped H2s in blog, not on money pages |
| Authority & brand signals | 40/100 | No reviews, 3 dead social profiles, no Wikipedia/Crunchbase/Clutch |
| Multi-modal content | 30/100 | No video, no images in blog |
| **Overall** | **~65/100** | The engineering foundation is ahead of most agency sites this size. The gap is off-page proof, not code. |

Platform readiness **[EST — no live AI answers were observed]**: Perplexity ~55 (favours direct-answer content over domain authority — best relative fit) · ChatGPT Search ~45 · Google AI Overviews ~35 (leans on organic strength this domain lacks) · Bing Copilot ~30 (Bing Webmaster not yet verified).

---

# Part 4 — Content plan: 20 blog posts

Each post opens with a direct, quotable 2–3 sentence answer, then goes deeper for human readers, then closes with a CTA to the matching service page. Target 2 posts/week. **Stagger the publish dates** — the existing six posts all carry `2026-08-03`, which is a visible content-dump signature.

## 4.1 The existing 6 posts — re-optimisation verdicts

| Post | Verdict | Action |
|---|---|---|
| `what-is-agentic-ai` — *"…for Indian Business Owners"* | 🔴 **Retitle** | Drop "Indian" — it caps a global informational term at one market. Retarget to `what is an ai agent in simple terms` + `ai agent vs llm`. Add a 40-word definition block at the very top and a comparison table (agent vs chatbot vs workflow vs LLM). **Make this the Pillar A hub.** |
| `voice-ai-agents-call-centers` | 🔴 **Retarget vocabulary** | Currently targets `ai voice agent` — near-zero volume. Retarget to **`ai receptionist cost`** + `voice ai agents for indian languages` (a genuine India-only moat). Retitle toward "AI Receptionist". Point at `/services/ai-receptionist`. |
| `ai-automation-vs-agentic-ai` | 🟡 **Restructure as a true comparison** | Comparison pages have the highest citation rate. Add a 3-column decision table above the fold, a 40-word verdict, and a "when this is the wrong choice" section. Absorb `ai agent vs ai workflow` and `ai agent vs automation`. |
| `ai-automation-roi` | 🟡 **Add real numbers** | Add a worked cost model with actual currency figures and an ROI table. Best candidate on the site for AI citation — statistics are one of the few levers the arXiv survey rates moderate-to-strong. Retarget to `ai automation roi calculator`. |
| `whatsapp-business-api-ai-integration` | 🟢 **Keep — extend** | Strongest asset; the WhatsApp SERP is the softest found. Add the real PAA questions as an FAQ block. Add a non-India pricing section for US/UK/CA. |
| `how-to-choose-ai-agency-india` | 🟡 **Keep — spawn siblings** | Keep the India version; clone the **criteria framework** into the listicles. That criteria section is exactly what makes self-ranking defensible (Azilen's device). Retarget to `how to choose an ai automation agency`. |

## 4.2 Cluster architecture

- **Pillar A — AI Agents:** `what-is-agentic-ai` (updated) ← posts 1–5
- **Pillar B — AI Automation for SMBs:** **new post 6** ← posts 7, 8, 9
- **Pillar C — AI Receptionist / Voice:** **new post 10** ← posts 11, 12, 13
- **Pillar D — WhatsApp AI:** `whatsapp-business-api-ai-integration` (updated) ← posts 14, 15
- **Pillar E — Build economics:** **new post 16** ← posts 17, 18
- **Pillar F — Data Analytics:** **new post 19** ← post 20

### Pillar A — AI Agents

**1. AI Agent Development Cost in 2026: Real Prices from Real Builds**
Primary `ai agent development cost` · Secondary `how much does it cost to build an ai agent`, `ai agent development cost in india`, `ai agent development cost per month`, `ai agent cost per hour` · Commercial-investigation · **2,800 words** · → `/services/agentic-ai` · US-first
*Opening:* "A production AI agent costs $12,000–$85,000 to build and $400–$4,000 a month to run, depending on how many systems it touches and whether it acts autonomously or only recommends."
*FAQ* **[PAA]**: How much does enterprise AI agent development cost? · How much do AI development companies charge for building an AI agent? · What is the cost of agentic AI implementation? · What's the pricing for developing an AI agent?

**2. AI Agent vs Chatbot: What Actually Changes When You Upgrade**
Primary `ai agent vs chatbot` · Secondary `ai agent vs llm`, `ai agent vs ai assistant`, `ai agent vs ai workflow` · Informational · **2,000 words** · → `/services/agentic-ai` · Global
*Opening:* "A chatbot answers; an AI agent acts — it can call your CRM, book the appointment and update the record, where a chatbot can only tell the customer to do it themselves."
*FAQ:* Is an AI agent just a chatbot with extra steps? · Can an AI agent replace my support chatbot? · What is an AI agent in simple words? · Do AI agents need an LLM?

**3. AI Agents for Small Business: 9 That Pay for Themselves in 90 Days**
Primary `ai agents for small business` · Secondary `ai agents for small business owners`, `best ai agents for small business`, `ai sales agent for small business` · Commercial-investigation · **2,600 words** · → `/services/agentic-ai` · US/UK/CA
*Opening:* "For a business under 50 people, the AI agents that actually pay back inside a quarter are the ones that answer inbound — calls, WhatsApp and email — because those have a measurable cost per missed lead."
*FAQ:* What can an AI agent do for a small business? · How much does an AI agent cost for a small business? · Do I need a developer to run an AI agent? · Which AI agent should a small business start with?

**4. Top 12 AI Agent Development Companies for SMBs in 2026** ⚠️ *the listicle play*
Primary `ai agent development company` · Secondary `ai agent development companies usa`, `best ai agent development company`, `top agentic ai companies` · Commercial-investigation · **3,500 words** · → `/services/agentic-ai` · US/UK/CA
*Opening:* "Twelve AI agent development companies, ranked by what they actually charge, how long they take, and the company size they fit — with a selection framework you can use even if you hire none of them."
*Format:* criteria section **first** (Azilen's device), then numbered H2s, each with a bolded 35–40-word verdict, a 5-row spec block (HQ / team size / starting price / timeline / best-fit), then prose. **Include real competitors. Rank Velex #3, not #1** — Intuz's more credible pattern. Publish at **root level**, not under `/blog/`.
*FAQ:* How do I choose an AI agent development company? · What should an AI agent build cost? · Should I hire offshore for AI agent development? · How long does an AI agent take to build?

**5. Build vs Buy: Custom AI Agent, Zapier/Make, or an Off-the-Shelf Copilot**
Primary `build vs buy ai agent` · Secondary `n8n vs make vs zapier`, `custom ai agent vs off the shelf` · Commercial-investigation · **2,400 words** · → `/services/agentic-ai` + `/services/ai-automation` · Global
*Opening:* "Buy when your process is standard and your volume is under roughly 500 events a month; build when the process is your competitive advantage or when per-task pricing overtakes a fixed build cost."
*FAQ:* Is n8n better than Zapier for AI agents? · When is a custom AI agent worth it? · Can I start on Make and migrate later? · What does it cost to run n8n for a business?

### Pillar B — AI Automation

**6. 🏛️ PILLAR — AI Automation for Small Business: The 2026 Implementation Guide**
Primary `ai automation for small business` · Secondary `ai automation services for small business`, `ai workflow automation for small business`, `ai automation consulting for small business` · Commercial-investigation · **3,800 words** · → `/services/ai-automation` · US/UK/CA
*Opening:* "AI automation for a small business means connecting the tools you already pay for so that a lead, an invoice or a support ticket moves without anyone re-typing it — typically 3–6 workflows, live in 2–5 weeks, for $3,000–$15,000."
*FAQ:* What is AI automation for small business? · How much does AI automation cost for a small business? · What should a small business automate first? · Do I need to replace my existing software? · How long does AI automation take to set up?

**7. AI Automation vs RPA: Why Rule-Based Bots Keep Breaking**
Primary `ai automation vs rpa` · Secondary `rpa vs ai agents`, `is rpa dead`, `intelligent automation vs rpa` · Informational · **1,900 words** · → `/services/ai-automation` · Global
*Opening:* "RPA follows the screen; AI automation follows the intent — which is why an RPA bot breaks when a vendor redesigns a form and an AI-based one usually doesn't."
*FAQ:* Is RPA still relevant in 2026? · Can AI replace RPA? · Which is cheaper, RPA or AI automation? · Should I migrate my RPA bots?

**8. AI Automation for Logistics & Freight: 7 Workflows That Return Hours**
Primary `ai automation for logistics companies` · Secondary `ai in freight forwarding`, `automate shipping documentation`, `ai document processing logistics` · Commercial-investigation · **2,200 words** · → `/services/ai-automation` · US/UK + IN exporters
*Opening:* "In freight, the highest-return AI automation isn't route optimisation — it's document extraction, because a single mis-keyed bill of lading costs more than a month of the software."
*FAQ:* Can AI read bills of lading and packing lists? · How accurate is AI document extraction? · Does this work with my TMS? · What does logistics AI automation cost?

**9. AI Automation for Accounting Firms: What to Automate Before Tax Season**
Primary `ai automation for accounting firms` · Secondary `ai for bookkeeping automation`, `automate client onboarding accounting` · Commercial-investigation · **2,000 words** · → `/services/ai-automation` · US/UK/CA
*Opening:* "For an accounting firm the three automations that survive audit scrutiny are client onboarding, document chase-up, and bank-statement extraction — everything downstream of those still needs a human sign-off."
*FAQ:* Is AI safe for accounting data? · Can AI do bookkeeping unsupervised? · What accounting tasks should stay manual? · Does it integrate with Xero/QuickBooks?

### Pillar C — AI Receptionist / Voice

**10. 🏛️ PILLAR — AI Receptionist Cost in 2026: Every Pricing Model Compared**
Primary `ai receptionist cost` · Secondary `how much does an ai receptionist cost`, `ai receptionist for small business pricing`, `ai answering service cost` · Commercial-investigation · **3,000 words** · → `/services/ai-receptionist` · US/UK/CA
*Opening:* "An AI receptionist costs $49–$400 a month off-the-shelf, or $6,000–$30,000 to build custom — and the break-even against a human answering service usually lands around 300 calls a month."
*FAQ* **[PAA]**: Which AI virtual receptionist is best for small businesses? · What's the best AI receptionist for 24/7 coverage? · What is an AI receptionist? · How can I use an AI virtual receptionist for my small business?

**11. AI Receptionist for Dental Practices: What It Books and What It Can't** ⭐ *highest-confidence win in this plan*
Primary `ai receptionist for dental clinics` · Secondary `ai receptionist for dentist`, `ai receptionist for dental office`, `dental ai phone answering` · Transactional · **2,200 words** · → `/services/ai-receptionist` · US/UK/CA
*Opening:* "An AI receptionist for a dental practice reliably handles new-patient enquiries, appointment booking and rescheduling, and after-hours triage — but it should always hand off clinical questions and insurance disputes to a human."
*FAQ:* Can an AI receptionist book into my dental software? · Is an AI receptionist HIPAA compliant? · What happens if a patient has an emergency? · How much does a dental AI receptionist cost?
*Why:* all 10 rankers on this SERP are micro-domains; zero directories. **[SERP]**

**12. AI Answering Service for Law Firms: Intake Without the Missed Calls**
Primary `ai answering service for law firms` · Secondary `ai receptionist for law firms`, `legal intake automation`, `ai call screening for attorneys` · Transactional · **2,200 words** · → `/services/ai-receptionist` · US/UK/CA
*Opening:* "For a law firm, an AI answering service earns its cost on conflict-checking and intake screening — capturing matter type, jurisdiction and urgency before a paralegal ever picks up."
*FAQ:* Is an AI answering service confidential for legal calls? · Can it run a conflict check? · Will clients know it's AI? · What does legal AI intake cost per month?

**13. AI Voice Agent for Appointment Booking: Setup, Latency and Failure Modes**
Primary `ai voice agent for appointment booking` · Secondary `ai appointment scheduling agent`, `ai voice agent for clinics`, `voice ai calendar integration` · Commercial-investigation · **2,400 words** · → `/services/ai-receptionist` · Global
*Opening:* "A booking voice agent needs sub-800ms response latency and write access to your calendar — without both, callers talk over it and double-bookings appear within the first week."
*FAQ:* Can an AI voice agent write to Google Calendar? · How natural does an AI voice agent sound? · What happens when it doesn't understand? · Can it handle two languages in one call?

### Pillar D — WhatsApp

**14. WhatsApp AI Chatbot Cost: India, US and UK Pricing Compared**
Primary `whatsapp chatbot development cost india` · Secondary `whatsapp chatbot pricing`, `whatsapp ai chatbot cost`, `how much does a whatsapp chatbot cost` · Commercial-investigation · **2,400 words** · → `/services/whatsapp-bot` · IN + US/UK
*Opening:* "A WhatsApp AI chatbot costs ₹40,000–₹3,00,000 (roughly $500–$3,600) to build, plus Meta's per-conversation fee — which is where most quotes quietly omit 60% of the real running cost."
*FAQ* **[PAA]**: Which WhatsApp chatbot is best for small businesses? · Do I need WhatsApp Business API for a chatbot? · Can I integrate the WhatsApp chatbot on the website? · Is there a free WhatsApp AI chatbot for business? · Do I need a separate phone number?

**15. WhatsApp AI Chatbot for Restaurants: Orders, Bookings and the 24-Hour Window**
Primary `whatsapp ai chatbot for restaurants` · Secondary `whatsapp chatbot for food ordering`, `whatsapp booking bot restaurant` · Transactional · **1,900 words** · → `/services/whatsapp-bot` · IN + UK/CA
*Opening:* "A restaurant WhatsApp bot works because reservations and orders both arrive inside Meta's free 24-hour service window — it's the marketing follow-up afterwards that costs money."
*FAQ:* Can a WhatsApp bot take payments? · What is the WhatsApp 24-hour window? · Can it handle a menu with daily specials? · Will Meta ban promotional messages?

### Pillar E — Build economics

**16. 🏛️ PILLAR — What Software Actually Costs to Build in 2026: App, Web, AI and Custom**
Primary `how much does custom software cost` · Secondary `mobile app development cost`, `custom software development cost`, `software development cost india` · Commercial-investigation · **3,600 words** · → `/services/software-development` · Global
*Opening:* "Custom software in 2026 runs $18,000–$150,000 depending on integration count, and the offshore-versus-onshore gap is roughly 3× on rate but only about 1.6× on total cost once management overhead is counted."
*FAQ:* How much does custom software cost? · Is offshore software development cheaper overall? · What makes software projects go over budget? · How long does custom software take?

**17. Mobile App Development Cost: India vs US vs UK, Line by Line**
Primary `mobile app development cost in india` · Secondary `mobile app development cost in usa`, `…in uk`, `…in 2026`, `app development cost breakdown` · Commercial-investigation · **2,800 words** · → `/services/app-development` · US/UK/CA + IN
*Opening:* "The same mid-complexity app costs roughly $60,000–$120,000 built in the US, $45,000–$90,000 in the UK, and $15,000–$40,000 in India — and the difference is almost entirely blended hourly rate, not scope."
*FAQ:* How much does it cost to build an app in India? · Is it cheaper to build an app offshore? · What is the cost breakdown of app development? · How long does an app take to build?

**18. Custom Software for Manufacturers: ERP, Traceability and Export Documentation**
Primary `custom software development for manufacturing` · Secondary `erp software development company`, `custom software for exporters`, `production tracking software development` · Commercial-investigation · **2,400 words** · → `/services/software-development` · IN (Ludhiana) + US/UK buyers
*Opening:* "For a mid-size manufacturer the build-versus-buy line falls at traceability: standard ERP handles orders and stock, but batch-level traceability and export documentation are almost always custom."
*FAQ:* Should a manufacturer buy ERP or build custom? · How much does manufacturing software cost? · Can custom software integrate with Tally/SAP? · How long does an ERP implementation take?

### Pillar F — Data Analytics

**19. 🏛️ PILLAR — Data Analytics for Small Business: What to Measure Before You Buy a Tool**
Primary `data analytics services for small business` · Secondary `small business data analytics consulting`, `business intelligence services for small business`, `how much does data analytics consulting cost` · Commercial-investigation · **3,200 words** · → `/services/data-analytics` · US/UK/CA
*Opening:* "For a business under $10M revenue, a working analytics setup costs $1,000–$5,000 to build and under $100 a month to run — the expensive part is deciding which six numbers matter, not the software."
*FAQ* **[PAA]**: What are the benefits of using data analytics tools for small businesses? · How do I choose the right data analytics tool for my small business? · How much does data analytics consulting cost? · Do I need a data warehouse for a small business?
**Per rule 2: put a price band in the meta description** — the two boutiques outranking SaaS giants on this exact SERP both do.

**20. Power BI vs Looker Studio vs Metabase for a 20-Person Company**
Primary `power bi vs looker studio` · Secondary `power bi consulting services`, `looker studio consulting`, `best bi tool for small business`, `metabase vs power bi` · Commercial-investigation · **2,600 words** · → `/services/data-analytics` · US/UK/CA
*Opening:* "For a 20-person company, Looker Studio wins on cost, Power BI wins if you already pay for Microsoft 365, and Metabase wins if your data lives in Postgres and you want to self-host."
*FAQ:* Is Power BI worth it for a small business? · Is Looker Studio really free? · Can I migrate from Looker Studio to Power BI later? · Do I need a consultant to set up BI?

## 4.3 Internal-linking matrix

**Rules:** every spoke links **up** to its pillar and **across** to exactly one sibling · every post links to **exactly one** money page with a descriptive anchor · pillars link **down** to all their spokes · cost posts cross-link to each other regardless of cluster, because they share buyer intent.

| Post | Links up to | Links across to | Money page |
|---|---|---|---|
| 1 Agent cost | `what-is-agentic-ai` | 5, 16, 17 | `/services/agentic-ai` |
| 2 Agent vs chatbot | `what-is-agentic-ai` | 5, `ai-automation-vs-agentic-ai` | `/services/agentic-ai` |
| 3 Agents for SMB | `what-is-agentic-ai` | 6, 4 | `/services/agentic-ai` |
| 4 **Listicle** | `what-is-agentic-ai` | 1, `how-to-choose-ai-agency-india` | `/services/agentic-ai` |
| 5 Build vs buy | `what-is-agentic-ai` | 1, 7 | `/services/ai-automation` |
| 6 🏛️ Automation pillar | — | 3, 10, 19 | `/services/ai-automation` |
| 7 AI vs RPA | 6 | 5 | `/services/ai-automation` |
| 8 Logistics | 6 | 18 | `/services/ai-automation` |
| 9 Accounting | 6 | 19 | `/services/ai-automation` |
| 10 🏛️ Receptionist pillar | — | 6, `voice-ai-agents-call-centers` | `/services/ai-receptionist` |
| 11 Dental | 10 | 12 | `/services/ai-receptionist` |
| 12 Legal | 10 | 11 | `/services/ai-receptionist` |
| 13 Booking | 10 | 11, 15 | `/services/ai-receptionist` |
| 14 WhatsApp cost | `whatsapp-business-api-ai-integration` | 1, 17 | `/services/whatsapp-bot` |
| 15 Restaurants | `whatsapp-business-api-ai-integration` | 13 | `/services/whatsapp-bot` |
| 16 🏛️ Cost pillar | — | 1, 14, 17, 19 | `/services/software-development` |
| 17 App cost | 16 | 1, 14 | `/services/app-development` |
| 18 Manufacturing | 16 | 8 | `/services/software-development` |
| 19 🏛️ Analytics pillar | — | 6, 9, 20 | `/services/data-analytics` |
| 20 BI comparison | 19 | 5 | `/services/data-analytics` |

**Hub reciprocity:** each money page carries a "Related reading" block linking to its pillar plus its two best spokes. The service template already renders this section from `relatedServices` — populate it.

---

# Part 5 — Link building and first indexation

## 5.1 The uncomfortable truth about directories **[HTML]**

Verified by fetching raw HTML and grepping the actual `rel` attribute — **not** by reading SEO blogs, which are demonstrably wrong about this.

| Directory | Verified `rel` on the outbound company link |
|---|---|
| **Clutch** | `rel="nofollow"` **and** wrapped in `r.clutch.co/redirect?…&u=https%3A%2F%2F…` — doubly non-passing |
| **GoodFirms** | `rel="nofollow noopener"` — including paid "Featured" links |
| **DesignRush** | `rel="nofollow noopener"` ×78 |
| **The Manifest** | `rel="nofollow"` ×80, zero dofollow external |
| **TechBehemoths** | `rel="nofollow"` |
| **Techreviewer** | `rel="nofollow"` ×85 |
| **SuperbCompanies** | `rel="nofollow"` ×50 |
| **aiagentsdirectory.com** | `rel="noopener noreferrer nofollow"` |
| **Sortlist** | Outbound links **cloaked** — hrefs base64-obfuscated into `rel` attributes. No crawlable link at all. |
| **YellowPages.ca** | `/gourl/<sha1>?redirect=` + `rel="nofollow noopener"`, 175 nofollows/page |
| **GitHub** (org website + README links) | `rel="nofollow"` — 10/10 external links on `github.com/vercel/next.js` |

**So: do directories for referral traffic, buyer trust and NAP consistency. Never for link equity. Budget accordingly.**

Anyone who tells you Clutch, Crunchbase, F6S or Wellfound are "high-DA dofollow" has not checked the HTML. Treat every "DA 90 dofollow list" blog post as noise.

## 5.2 The highest-ROI link play: listicle inclusion

Four SERPs checked. **The big directories rank for only one of them.** **[SERP]**

| Query | Do Clutch/GoodFirms/DesignRush rank? | What actually ranks |
|---|---|---|
| `AI agent development company` | **Yes** — Clutch #1, GoodFirms #2 | Then agency listicles |
| `top AI development companies 2026` | **No** | 100% agency listicles (Straive, Netguru, Analytics Insight, FullStack, LinkedIn Pulse) |
| `voice AI agent development company` | **No — zero directories** | 6 agency listicles (RaftLabs, MirrorFly, Intellectyx, Analytics Insight, Softcery, Inoxoft) |
| `whatsapp chatbot development company india` | **No** | Agency listicles + individual company pages |

**For the niches Velex actually sells — voice AI, WhatsApp bots, AI automation — getting into other agencies' "Top 10" posts is worth more than every directory listing combined.** Almost nobody does this systematically.

**Outreach targets** (all currently ranking for Velex's terms): RaftLabs · MirrorFly · Softcery · Inoxoft · Intellectyx · codeless.co/best-ai-automation-agencies · aisuperior.com/ai-agencies-for-small-businesses · masterofcode.com/blog/top-ai-agent-development-companies · techreviewer.co · theautomators.ai. Offer a genuine case study with real numbers, not a link request. Analytics Insight ranks for **multiple** Velex queries and sells advertorials (pricing `unverified`; market rate for listicle placement ~$250–1,500 **[EST]**).

**Also proven:** LinkedIn Pulse articles rank in the top 10 for `ai agent development company in india` (×2), `ai development company uk`, `ai development company noida`, `app development company in noida`, `whatsapp chatbot development cost india` and `ai agent vs chatbot`. **[SERP]** That is a free, immediate route onto page 1 of geo terms the domain cannot win on its own. Publish the listicles there first, then on-site.

## 5.3 The four free backlinks sitting unclaimed

`content/portfolio.json` lists four **real, live** client sites. **None of them mention "velex" anywhere.** **[HTML]**

- `bonn.in` — **note: this is the same domain as the account email, so it is likely directly controllable**
- `groundzero.in`
- `fabxpertmetal.ae`
- `daur-ten.vercel.app`

Ask each for a "Built by Velex Infotech" footer credit. **These are the fastest real dofollow backlinks available and they cost nothing.**

## 5.4 Directories worth doing anyway

| Source | Cost | Link | Verdict |
|---|---|---|---|
| **Google Business Profile** ×2 (Ludhiana, Noida — *only where a real staffed address exists*) | Free | N/A | **Top priority.** Only route into the local pack. |
| **LinkedIn company page** | Free | Nofollow | **Do first — the schema already references it and it currently 404s.** #1 cited domain for B2B tech services. |
| **Clutch** | Free profile | Nofollow + redirect | Ranks #1 for the head term. Value is buyer intent. **Profiles without reviews are invisible — get 3–5 reviews in 60 days.** Never buy sponsorship ($2k–15k/mo, 12-month commit) at this stage. |
| **GoodFirms** | Free | Nofollow | Ranks #2 for the head term |
| **TechBehemoths** | Free | Nofollow | **Ranks #1 and #2 for `software development company in ludhiana`, #1 for `web development company in ludhiana`, #1 for `ai automation company in punjab`. For Ludhiana specifically this beats Clutch.** |
| **The Manifest** | Free | Nofollow | 10 minutes, rides Clutch data |
| **Techreviewer** | Free tier `unverified` | Nofollow | Has exact-match categories: `/top-ai-agent-development-companies`, `/ai-automation-agencies`, `/ai-consulting-firms` |
| **TopDevelopers.co** | Basic free | `unverified` | Appeared in **five** of the geo SERPs run — highest directory hit-rate for Velex's exact geos |
| **DesignRush** | Free tier | Nofollow | Ranked #1 for `ai development company noida`, #2 for `ai development company uk` |
| **The AI Rolodex** | Free | **Dofollow — verified `rel="noopener"` only** | Purpose-built for AI *agencies*, categories map 1:1. ⚠️ **But** `site:theairolodex.com` shows **no `/agency/` profile pages in the index** — a dofollow link on an unindexed page passes little. Still worth 15 free minutes. |
| **AI Agents Directory** | Free | Nofollow | `/agency` section, ~160 agencies |
| **Kompass India** (in.kompass.com) | Free listing | Dofollow `unverified`, DR~69 | **Best legitimate UK-visibility play** — honest Indian NAP, visible to UK B2B buyers, no fake address |
| **Startup India (DPIIT)** | **Free** | `unverified` | Underrated — indexed public profile on a `.gov.in` domain |
| **Udyam / MSME** | **Free** | N/A | Free, permanent, trust signal |
| **Crunchbase** | Free tier | Treat as nofollow | Entity / Knowledge-Graph signal only |
| **Bing Places + Apple Business Connect** | Free | N/A | **Do both — Bing feeds ChatGPT, Copilot and Perplexity** |
| **NASSCOM** | Paid, Associate tier for <₹2 Cr revenue | `unverified` | Genuine authority. Consider month 3+. |

## 5.5 Do not waste time on these

**Ineligible — the application will be rejected:**
- **G2 / Capterra / TrustRadius** — list *software products*, not service providers. (Note: G2 acquired Capterra/GetApp/Software Advice from Gartner, closed 5 Feb 2026 — all three are now one ineligible bucket.)
- **Product Hunt** — Featuring Guidelines explicitly exclude *"Services."* Only path is productising a free tool first.
- **Wellfound** — bans third-party agencies.
- **Yelp Canada** — excludes *"businesses that primarily serve commercial customers"* **and** requires a supported-country address.
- **There's An AI For That / Futurepedia / Toolify** — AI *tools* only.

**Dead or fake:** `Extract.co` (parked domain, 114-byte JS redirect) · AI Scout (520) · AI Tool Hunt (404) · aiagencydirectory.com (empty client-side SPA that won't index) · Terkel (absorbed into Featured) · Prowly journalist-requests (retired).

**Spam risk — actively harmful:**
- The 8+ "Yellow Pages India" clone cluster (yellowpages.in, indianyellowpages.com, yellowpages.org.in, jimyellowpages.com, …) — an unaffiliated spam network; listing across them is the exact footprint that flags a manufactured profile.
- **Fabricating UK or Canada addresses — the highest-severity risk in this document.** Cylex geo-blocks by IP, Scoot rejects non-UK postcodes at field level, Yell's signup starts with a postcode lookup. Even if you succeeded, the payoff is nofollow. You would be risking two real Indian GBPs (suspensions cascade account-wide) to gain nothing — and contradictory country data makes the brand *less* citable by ChatGPT and Perplexity, which resolve identity by citation consensus.
- Toolify's "Guest Post / Link Insert" products — paid links, against Google's spam policy.
- JustDial / IndiaMART / TradeIndia paid packages — money burned on the wrong buyer.

**UK/Canada verdict: don't.** Use Kompass India (honest NAP) + Clutch/GoodFirms (which accept Indian HQ and are where UK/CA buyers actually shop) + UK/US landing pages. That last pattern is proven — Indian agencies already rank for `hire AI agent developers UK` with UK-targeted pages served from India (fulminous.uk, vegavid.com/uk/, aiinfox.com/ai-agent-development-uk, which openly says it serves UK clients from India). **[SERP]**

## 5.6 Indexing APIs — correcting two common myths

- **Google Indexing API does NOT work for these pages.** Officially **JobPosting and BroadcastEvent-in-VideoObject only**. Every "instant indexing" tool claiming otherwise is abusing it.
- **IndexNow is supported by Bing, Yandex, Naver, Seznam and Yep — Google evaluated it after the 2021 launch and never adopted it.** Still worth doing, because **Bing's index feeds ChatGPT Search, Copilot and Perplexity**. Key generated free in Bing Webmaster Tools → URL Submission → IndexNow. Bing URL Submission quota ~10,000 URLs/day.
- **GSC "Request Indexing" is capped at ~10–12 URLs/day per property**, typically 2–7 days to index. Re-requesting the same URL does not speed it up, and it **cannot override weak architecture** — "Discovered – currently not indexed" is an authority/architecture signal, and **orphaned pages are a classic cause**.

## 5.7 Journalist requests — the HARO story, corrected

HARO → Connectively → shut down 9 Dec 2024. **But it came back:**

| Date | Event |
|---|---|
| Apr 2025 | Cision **sells the HARO brand to Featured.com**; relaunched as a free newsletter |
| **26 May 2026** | Featured.com **revives the Connectively brand**, migrating all opportunities, profiles and subscriptions |
| **2 Jun 2026** | **connectively.com relaunches**; Featured.com repositions as "AI co-pilot for PR" |

| Platform | Free tier | Verdict |
|---|---|---|
| **HARO** (helpareporter.com) | **Fully free**, 3× daily digests | Start here — highest volume, zero cost |
| **MentionMatch** (mentionmatch.com) | **Free**, 8,000+ sources | ⭐ Best topical fit — B2B/SaaS/tech writers. **Verified rebrand:** helpab2bwriter.com 301s here. |
| **Source of Sources** | **Free** (donation-based) | Strong free option, strict off-topic removal |
| **Qwoted** | 2 pitches/mo + a **2-hour delay** | Free tier deliberately crippled — speed is everything. $149/mo, or $99/mo annual. Only upgrade once free converts. |
| **SourceBottle** | Free | AU/NZ/UK-weighted, low competition |
| **Newshook** | 3-day trial | 2026 entrant, aggregates HARO + 11 sources |

**Honest expectation:** no platform produces links — publications do, and most large outlets nofollow contributor links. Realistic rate for an India-based founder: **5–15% generic, 20–30% when pitching only where you have first-hand operator numbers** **[EST]**. US/UK journalists favour local sources for business stories, so the lane is **technical/vendor commentary** ("real containment rates from N voice-AI deployments", "what breaks in WhatsApp bot rollouts at scale") — expertise neutralises the geography penalty. ~15–25 min/pitch; expect 1–3 placements/month initially.

---

# Part 6 — Roadmap

## Phase 0 — Human inputs that block work

| Blocker | Blocks |
|---|---|
| **Google Search Console property + verification token** | **All indexing diagnosis.** Nothing else is knowable until this exists. |
| Bing Webmaster Tools property + token | IndexNow, Copilot/ChatGPT visibility |
| Confirm SPF/DKIM for `velexinfotech.com` in hPanel | Lead mail landing in the inbox rather than spam |
| Vercel Firewall rate-limit rule on `/api/contact` | Protects the shared mailbox quota; the in-code limiter is per-instance only |
| **Real Ludhiana street address + postcode** | Correct `PostalAddress` — currently `streetAddress: "Ludhiana"`, which is a city, not a street |
| **Real project / client counts** | Replacing the unsourced 200+/50+ figures |
| Which clients may be named; which testimonials are real | Trust bar, testimonials |
| Founder's personal LinkedIn URL | `Person.sameAs` |
| Compliance posture per market (legal review) | The three market pages |
| Invoicing currency + payment rails per market | Market pages, pricing copy |

## Phase 1 — Truth + foundations ✅ *built in this pass*
`config/site.ts` restructured into offices + markets registries · `lib/schema.ts` rebuilt (four-country `areaServed`, per-office `@id`s, `Person`, `WebPage`, `ItemList`, `knowsAbout`) · `lang="en"` · verification tokens wired · **honesty pass** (fabricated clients, the "47 reviews" claim, the ₹10,000Cr valuation, unsourced stats) · dead `sameAs` profiles pruned · contact API hardened (HTML escaping, `message` included, fail-loud, honeypot, PII log removed) · phone regex fixed for US/CA formats · budget bands moved to currency-agnostic ids · `remark-gfm` + `rehype-slug` · `not-found.tsx` · blog-registry build invariant · `verify-content` script

## Phase 2 — Positioning + two new service pages ✅ *built in this pass*
Homepage / about / contact / services copy repositioned to four markets with India as HQ · hero H1 shifted from "AI Automation" to "AI Agents" · `/services/data-analytics` and `/services/software-development` created · `/services/voice-agent` → `/services/ai-receptionist` with a 301 · `agentic-ai` retitled "AI Agent Development" (slug kept — it is the only indexed service page) · navigation rebalanced and the three broken anchors fixed · homepage latest-posts section added

## Phase 3 — Locations 🔜 *designed, deferred*
```
/locations                 hub — delivery model, hubs-vs-markets table, 600+ words
├── /locations/india       country page → both hubs, INR/GST invoicing
│   ├── /locations/ludhiana   OFFICE — real NAP, ProfessionalService schema
│   └── /locations/noida      ENGINEERING HUB — WebPage + FAQ, no address, no LocalBusiness
├── /locations/usa         MARKET — WebPage + market-scoped Service + FAQ
├── /locations/uk          MARKET
└── /locations/canada      MARKET
```
**Two page classes, never conflated.** Office pages emit `ProfessionalService` with real NAP. Market pages emit **no address, no geo, no LocalBusiness** — emitting one for a country you have no address in is the fabricated-NAP failure that gets GBPs suspended.

**Do NOT build `app/locations/[slug]/page.tsx`.** A dynamic route makes adding a 30th city a one-line JSON edit — and that ergonomic is exactly how doorway pages get generated. Build a presentational `LocationShell` (chrome only, zero location strings) and one hand-written route file per location. The file-per-route constraint is the guardrail.

**Anti-thin-content contract — if a page can't fill these, don't ship it:** timezone overlap table (IST vs ET/PT/GMT, with actual daily overlap hours — currently unanswered anywhere on the site) · contracting entity, invoice currency, payment rails · **data & compliance posture** (US: CCPA/CPRA, SOC 2 status — *say "not certified" if not certified*; UK: UK GDPR, ICO registration, IDTA/SCCs for India transfers; Canada: PIPEDA, Quebec Law 25) · market-specific service emphasis · engagement model + local-currency pricing · 5–6 market-specific FAQs, none shared · a proof slot.

⚠️ **Never claim "GDPR compliant" as a bare adjective.** Describe what you actually do: where data is stored, which sub-processors, whether a DPA is available. And note the interaction — you cannot publish a UK compliance posture while logging visitor phone numbers to a third-party log sink.

## Phase 4 — FAQ + blog infrastructure 🔜
Prop-driven `FaqSection` (currently hardcodes `content/faqs.json`, which is why the Ludhiana page duplicates the whole accordion) · 5 FAQs per service page = **45+ new Q&A passages, the single biggest GEO content win available** · `category` field + client-side filter chips on `/blog` (**not** `/blog/category/[slug]` archive routes — five thin listing pages on a site with 1 indexed page is net-negative) · smarter "Keep reading" (currently `slice(0,3)` over a newest-first array, which strands posts 4+) · RSS feed at `app/feed.xml/route.ts` · author bio block per post → `/about#mohit-dutta` · `content/blog/AUTHORING.md`

## Phase 5 — Content production 🔜
The 20 posts in Part 4, **staggered across a real calendar**, following the §3.4 citable-passage template. Plus the six re-optimisations in §4.1.

## Phase 6 — Measurement 🔜
Analytics (**Vercel Analytics is cookieless — GA4 needs a consent banner if you publish a UK compliance posture**) · IndexNow post-deploy script · `app/manifest.ts` · monthly AI-citation query panel (see below)

---

# Part 7 — Search Console runbook

**Do this first. Everything downstream is guesswork until it exists.**

1. **Verify the property at DNS level** (covers apex + www) at [search.google.com/search-console](https://search.google.com/search-console). A meta-tag slot is already wired in `app/layout.tsx` via `siteConfig.verification.google` — paste the token there as an alternative.
2. **Submit `https://velexinfotech.com/sitemap.xml`** under Sitemaps.
3. **URL Inspect → Request Indexing** on the priority URLs, ~10/day (the daily cap): `/`, `/services`, `/services/agentic-ai`, `/services/ai-automation`, `/services/ai-receptionist`, `/services/whatsapp-bot`, `/services/data-analytics`, `/services/software-development`, `/blog`, `/about`.
4. **Read the Page Indexing report before doing anything else.** The three likely statuses have completely different fixes:
   - *Discovered – currently not indexed* → crawl demand / authority. **Needs external links.** No on-page change fixes this.
   - *Crawled – currently not indexed* → quality signal. Look at the honesty pass and thin pages.
   - *Duplicate, Google chose a different canonical* → the www→apex redirect in `next.config.ts` isn't firing on the deployment platform.
5. **Bing Webmaster Tools** — import from GSC, submit the sitemap, enable IndexNow.

## Monthly AI-visibility check (~20 min, free)

Run a fixed query list against ChatGPT (web search on), Perplexity, Google (watch for an AI Overview box), Copilot and Claude. Log `Date | Platform | Query | Cited Y/N | URL | Snippet`.

Query panel: *AI agent development services* · *AI receptionist for dental clinics* · *AI receptionist cost* · *whatsapp ai chatbot development company* · *data analytics services for small business* · *how much does it cost to build an AI agent* · *software development company in Ludhiana* · *AI automation agency Toronto*.

Also audit edge logs monthly for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` — confirm they hit 200s, not 404s or redirect chains.

---

# Part 8 — The rules that keep this honest

Added to `AGENTS.md` so they survive the next 20 posts:

1. **No number, client name, or quote ships unless it is traceable to a real engagement.** A specific small number ("14 projects, 9 clients") reads as *more* credible than a round large one, and it survives questioning.
2. **Never emit schema for content that isn't visible on the page.** This is why `FaqSection` renders the accordion and the JSON-LD together.
3. **A `sameAs` entry must resolve.** A link to a 404 is worse than omitting the profile.
4. **No `aggregateRating` until real reviews are displayed on the page.** `lib/schema.ts` already enforces this; keep it.
5. **One `@id` per entity.** Two nodes claiming one identity is worse than a changed id.
6. **Location pages are hand-written, one file each.** No `[city]` template — that ergonomic is how doorway pages get built.

---

## The five things that matter most

1. **Fix indexation this week.** 16+ of 21 sitemap URLs are missing from Google. Nothing else in this document functions until that's resolved — and it starts with a Search Console property that does not yet exist.
2. **Never target the word "company"; target "services" + a vertical + a geography.** `agentic AI development services` = 10/10 vendor pages. `AI agent development company` = 6/10 directories and listicles. Same buyer, opposite outcome.
3. **`/services/voice-agent` → `/services/ai-receptionist`, then build the verticals** (dental, legal, property management, restaurants). `ai receptionist for dental clinics` is held by nine micro-domains and zero directories — the most winnable structure found anywhere in this research.
4. **Publish real prices.** The only small players beating SaaS giants on any tested SERP were the ones showing a number in the meta description. It wins the verified `…cost` demand, it's the passage AI engines extract, and it qualifies leads before they call.
5. **Your own domain will not be the citation surface — plan for that.** In B2B tech services, brands' own sites earned 0.0% of top-30 AI citations while LinkedIn ranked #1. LinkedIn Pulse articles already rank page 1 for six target geo terms. Use them, plus listicle inclusion, plus Reddit. All free, all where the citations actually live.

**The single biggest trap:** Noida and Ludhiana city terms are the most directory-locked and lowest-volume keywords in this entire document. They earn local credibility and a Google Business Profile — not traffic. **Canada city pages, where Clutch, GoodFirms and DesignRush are completely absent, will return more leads per hour of effort than anything in Delhi-NCR.**
