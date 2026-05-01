# Image Prompts — Keys-Caldwell site

_All AI/photography image briefs, organized by page type. Each entry includes:_
_filename slot · use context · prompt · style notes._

---

## Brand-wide art direction

These constraints apply to every image produced for the site. Hand them to the photographer / illustrator / generator alongside the per-page prompt.

- **Color signature:** desaturated coastal palette — slate-blue water, warm sand neutrals, weathered teak / cypress, oxidized brass. Avoid Florida cliché saturation (no neon turquoise, no postcard-orange sunsets).
- **Light:** late afternoon "golden hour minus thirty minutes" — directional but soft. No harsh midday light, no flash.
- **Tone:** institutional dignity. Communities Keys-Caldwell manages are mature, established, often architecturally significant. Imagery should feel like a 1978-founded firm that has watched these buildings get built — calm, observant, lived-in.
- **What we never show:** vacation imagery (beach umbrellas, drinks, sunbathers). Stock-photo people in business attire shaking hands. Aspirational lifestyle shots. Skylines.
- **What we do show:** the buildings themselves, the operational side of community management (a board packet on a table, a reserve component being inspected, a quiet hallway), and the geography (mangroves, intracoastal docks, weathered concrete seawalls, royal palms in fog).
- **Aspect ratios:**
  - Hero photo (Pillar/About/Service): 4:3 portrait orientation, 1200×1600 or 1600×2000
  - OG share image: 1200×630 (16:8.4)
  - Geo card hero: 16:10
  - Inline editorial / blog: 3:2 landscape, 1600×1067
- **Format:** WebP for delivery, JPEG fallback. PNG only for transparent overlays.

---

## OG / share images (priority — these ship to every social card)

| Filename | Used by | Prompt |
|---|---|---|
| `/assets/og/keys-caldwell-default.jpg` | All pages without page-specific OG | Three-quarter angle of a 1970s-era Florida mid-rise condominium at golden hour, reading as institutional and substantial. Stucco façade in oxidized cream, dark bronze railings, royal palms casting long shadows on a manicured ground level. No people. Slightly elevated POV. Calm, established, trustworthy. 1200×630. |
| `/assets/og/keys-caldwell-condo.jpg` | `/condo-management/` and condo geo pages without their own OG | Quiet interior corridor of a coastal condominium — terrazzo or polished concrete floor, warm wall sconces, single open door at end of hall showing a slice of intracoastal water beyond a balcony. Shot at a slight angle so the perspective lines lead toward the light. Empty, contemplative. 1200×630. |
| `/assets/og/keys-caldwell-hoa.jpg` | `/hoa-management/` and HOA geo pages | Aerial-ish three-quarter view of a manicured single-family neighborhood entrance — stone monument sign reading [generic illegible], royal palms flanking a divided drive, sago palms and crotons at the base. Late afternoon shadows across the asphalt. 1200×630. |
| `/assets/og/keys-caldwell-accounting.jpg` | `/accounting/` | Top-down flat-lay on a walnut conference table: a leather-bound monthly board packet (cover-page visible — neutral cream with navy ribbon), a pair of horn-rim reading glasses, a brass desk lamp throwing warm light from one corner, a stainless coffee tumbler. No screens. No hands. Quiet, considered. 1200×630. |
| `/assets/og/keys-caldwell-brand-og.jpg` | `/reserve-studies/`, fallback for reserve content | Close-crop of a weathered concrete spalling repair on a coastal building façade — exposed rebar, fresh patch, tape lines from contractor's recent work. Shot at the angle where you can see both old (oxidized) and new (clean) concrete, telling the reserve-study story in one frame. 1200×630. |

**These five OG images replace `keys-caldwell-default.jpg` everywhere it currently appears as a placeholder.** Most pages reference one of these; produce them first.

---

## Hero photographs — Pillar pages

### `/condo-management/` (condo pillar)
- **Slot:** `KCPillarHero photo:`
- **Caption:** "Keys-Caldwell board meeting · Venice, FL · 2025"
- **Prompt:**
  > Three-quarter exterior of a Sarasota-area mid-rise condominium tower at golden hour, 6–10 stories, mid-century-modern footprint with horizontal balcony bands and concrete sun-shading fins. Oxidized bronze railings. Royal palms in foreground, intracoastal water just visible behind. No people, no signage. The building should read as architecturally specific (this is *a* building, not *any* building). Tonally calm, weathered, dignified. 4:3 vertical, 1600×2000.
- **Why this image:** The pillar's whole argument is "we manage 12–80-unit coastal condos with statute-aware operations." Show one. Specificity beats stock.

### `/hoa-management/` (HOA pillar)
- **Slot:** `KCPillarHero photo:`
- **Caption:** "Manatee County HOA entrance gate · 2025"
- **Prompt:**
  > Stone-and-stucco monument sign at the entrance to a Florida master-planned community, framed by mature royal palms and underplanted with sago palms and crotons. Late afternoon light raking across the stone. The wrought-iron gate behind is open. Generic enough that no specific community is identifiable, specific enough to feel real. No traffic, no people. 4:3 vertical, 1600×2000.

### `/accounting/`
- **Slot:** `KCPillarHero photo:`
- **Caption:** "Monthly close · Keys-Caldwell Venice office"
- **Prompt:**
  > Over-the-shoulder shot of a CPA at a desk reviewing a printed monthly financial packet, marked up with red pencil. Walnut desk, brass lamp, a second-monitor showing a ledger view (legible enough to read "Reserve · Roof · 18,420.00" but not so prominent it dominates). Frosted glass partition behind suggests an office, not a home. Hands and packet in focus, person blurred. No face. 4:3 vertical.
- **Why:** The page argues for human CPA review. Show the human, the packet, the red pencil. Operational, not decorative.

### `/reserve-studies/`
- **Slot:** Hero photo
- **Caption:** "Milestone inspection · Manatee County coastal building"
- **Prompt:**
  > A reserve-study consultant in soft-shell jacket and hard hat, standing on a coastal balcony, examining a section of railing-to-slab connection with a flashlight. Building face recedes behind. Late afternoon. The work is being done. No staged smiling, no model-attractive consultant — looks like a working engineer at the third building of the day. 4:3 vertical.

### `/property-services/`
- **Slot:** Hero photo
- **Caption:** "Capital project · Sarasota County, 2025"
- **Prompt:**
  > Concrete restoration work on a coastal high-rise façade — scaffolding visible, a worker in PPE applying a parge coat to a remediated section. Mid-project, mid-day, mid-mess. The building is not pretty right now and that's the point: this is the work, the operational reality of running capital projects on coastal buildings. 4:3 vertical.

### `/service-areas/`
- **Slot:** Hero photo
- **Caption:** "Sarasota County, FL"
- **Prompt:**
  > Wide environmental shot of the Venice, FL waterfront at golden hour — fishing pier, two royal palms, a single sailboat in the channel, a slice of the Keys-Caldwell office building visible at frame edge (or a generic 1970s mid-rise standing in for it). Establishes geography without resorting to a map. 16:9 wide hero.

---

## Hero photographs — About / People

### `/about/`
- **Slot:** Hero photo
- **Prompt:**
  > Three-quarter exterior of the actual Keys-Caldwell office building in Venice, FL — a 1970s-era low-rise with cypress siding and a navy awning. Late afternoon light. The KEYS-CALDWELL exterior signage (real, photographed) reads cleanly. A single car (older, well-kept) in the lot suggests it's the end of a working day. 4:3 vertical or 16:10 horizontal — depends on facade aspect.

### Team portraits — `/assets/team/`
- **Common direction:** Environmental portraits, not headshots. Subject in their actual workspace, doing something they actually do (reading a packet, on a phone call, walking a property). Soft natural light from a window — no studio strobes. Three-quarter framing, eyes to camera or three-quarters away. Subject is the second-most-interesting thing in the frame; the workspace is the first.

| File | Subject | Prompt |
|---|---|---|
| `/assets/team/james-bradley.jpg` | James Bradley, President | Standing at a conference table reviewing a stack of architectural drawings for a capital project. Navy quarter-zip, no tie. Window light from camera left. Walnut table, leather portfolio, brass lamp. The drawings are real (or convincing). 3:4 portrait. |
| `/assets/team/lauren-wilson.jpg` | Lauren Wilson, Director of Operations | At a standing desk, mid-conversation on a wired headset, hand gesturing toward a wall-mounted whiteboard with a Gantt-style assignment grid for association managers. Cardigan over button-down. Operational, in motion. 3:4 portrait. |
| `/assets/team/ande-duda.jpg` | Ande Duda, CPA | Seated at a desk reading a monthly board packet, red pencil in hand, a half-finished cup of coffee. Bookshelf behind with binders labeled by association ("Pelican Pointe HOA · 2024", etc — fictional). Reading glasses on. Looks like she has been doing this for thirty years because she has. 3:4 portrait. |

---

## Geo pages — condo (12 cities)

**Common pattern:** Each condo geo page should have a hero photo of a **representative coastal building from that specific city** — not generic Florida coastal, but identifiably *that place*. Below are city-specific prompts. Caption format: `"[Building type] · [City], FL"`.

| URL | Filename | Prompt |
|---|---|---|
| `/condo-management/venice/` | `/assets/geo/condo-venice.jpg` | A 1970s mid-rise condominium on the Venice barrier island, three to six stories, set back from the gulf with a sea-grape understory. Late afternoon, oxidized stucco façade in cream/sand. Quiet residential street in foreground. |
| `/condo-management/sarasota/` | `/assets/geo/condo-sarasota.jpg` | Downtown Sarasota waterfront — a contemporary glass-and-stucco mid-rise (8-12 stories) reflecting the bay at golden hour. Marina visible at frame edge with a few keel boats. The skyline reads as Sarasota, not Miami. |
| `/condo-management/longboat-key/` | `/assets/geo/condo-longboat.jpg` | A long, low gulf-front condo association on Longboat Key — three or four buildings of three stories each, white stucco with mansard tile roofs, manicured beach approach with sea oats and royal palms. Setting sun behind. |
| `/condo-management/siesta-key/` | `/assets/geo/condo-siesta.jpg` | A mid-rise condominium on Siesta Key, set back from the famous quartz beach — distinctive Siesta-Key architecture with screened lanais wrapping each unit, weathered cedar accents. The white sand foreground tells you which key without needing a sign. |
| `/condo-management/lakewood-ranch/` | `/assets/geo/condo-lakewood-ranch.jpg` | A luxury midrise condominium in a master-planned Lakewood Ranch community — Mediterranean-revival architecture, terracotta tile roof, orange-cream stucco, palmettos in the median, irrigation visible. Inland, not coastal. |
| `/condo-management/bradenton/` | `/assets/geo/condo-bradenton.jpg` | A waterfront mid-rise on the Manatee River, classic 1980s Florida architecture (six to eight stories, wide balconies, brown-and-cream stucco), with the river and a few sailboats in middle ground. |
| `/condo-management/anna-maria-island/` | `/assets/geo/condo-anna-maria.jpg` | Low-rise condominium on Anna Maria Island — three stories, board-and-batten siding painted soft seafoam or pale yellow, key-west influence, picket fence and a hand-painted address number. The island vernacular is the whole point. |
| `/condo-management/casey-key/` | `/assets/geo/condo-casey-key.jpg` | A small-footprint, two-to-three-story condominium on Casey Key — set against the gulf with mangroves at the property edge. Low density, deeply established landscaping with sabal palms and gumbo limbo. Almost residential in feel. |
| `/condo-management/osprey/` | `/assets/geo/condo-osprey.jpg` | A canal-front low-rise condominium in Osprey, FL — three stories, dock slips visible at the rear of the property, two boats in slips, the kind of community that defines Sarasota County's intracoastal interior. |
| `/condo-management/nokomis/` | `/assets/geo/condo-nokomis.jpg` | A Nokomis-area condo with intracoastal access — three or four stories, soft pastel stucco (peach or pale yellow), well-kept community pool deck visible at edge of frame. Quiet, residential, mid-1980s vintage. |
| `/condo-management/englewood/` | `/assets/geo/condo-englewood.jpg` | A gulf-side condo in Englewood, three stories, set among Australian pines, with the gulf in the gap between buildings. Less polished than Sarasota — older Florida, retiree-belt, beloved by long-term residents. |
| `/condo-management/manasota-key/` | `/assets/geo/condo-manasota.jpg` | A barrier-island condominium on Manasota Key — small-scale (under 30 units), with a wooden boardwalk to the beach visible at frame edge. Sea grapes and palmettos. Very Old Florida. |
| `/condo-management/north-port/` | `/assets/geo/condo-north-port.jpg` | An inland low-rise condominium near Warm Mineral Springs — Mediterranean stucco, two or three stories, oak hammocks beyond the property. North Port is inland and that should read in the image. |
| `/condo-management/charlotte-county/` | `/assets/geo/condo-charlotte.jpg` | A canal-home condo association in Punta Gorda — single-story or two-story architecture wrapped around a canal, dock slips with small powerboats, mature canal landscaping. Quintessential Charlotte County. |

---

## Geo pages — HOA (13 cities)

**Common pattern:** Entrance shots, monument signs, divided drives, master-planned community vernacular. Less coastal, more landscape-architectural. Each prompt should let the viewer recognize the city by built environment.

| URL | Filename | Prompt |
|---|---|---|
| `/hoa-management/venice/` | `/assets/geo/hoa-venice.jpg` | Entrance to a Venice, FL master-planned community — stone monument with the community name (illegible but architectural), royal palms flanking a divided entrance drive, irrigation casting a faint mist in golden light. |
| `/hoa-management/sarasota/` | `/assets/geo/hoa-sarasota.jpg` | A Sarasota gated community entrance — clean modernist stone-and-stucco monument, contemporary pendant lighting, a narrow palm allée leading toward the gatehouse. More upscale-contemporary than Venice. |
| `/hoa-management/lakewood-ranch/` | `/assets/geo/hoa-lakewood-ranch.jpg` | A Lakewood Ranch village entrance — village-specific signage (each LWR village has its own brand), brick paver drive, manicured median with seasonal annuals, the planned-community polish that defines LWR. Late afternoon light. |
| `/hoa-management/bradenton/` | `/assets/geo/hoa-bradenton.jpg` | A Manatee County master-planned community entrance — stone monument, oak-canopied drive, golf-cart path running parallel to the road, a glimpse of a clubhouse with a tile roof in the distance. |
| `/hoa-management/longboat-key/` | `/assets/geo/hoa-longboat.jpg` | The entrance to a Longboat Key bayside or gulfside HOA enclave — minimalist monument signage, a deeply established hedge, a security gatehouse with a single staff member visible in silhouette. Quietly affluent. |
| `/hoa-management/anna-maria-island/` | `/assets/geo/hoa-anna-maria.jpg` | A small Anna Maria Island HOA — residential street with cottage-scale homes in seafoam, butter, and shell-pink, white picket fences, golf carts in driveways. The HOA covers maybe 30 homes; the streetscape is the entire identity. |
| `/hoa-management/siesta-key/` | `/assets/geo/hoa-siesta.jpg` | A Siesta Key residential HOA — winding road through tropical-lush landscaping, individual driveways tucked behind hedges, the scale tells you it's beach-adjacent but not on the beach. |
| `/hoa-management/osprey/` | `/assets/geo/hoa-osprey.jpg` | An Oaks-style Osprey gated community entrance — substantial stone-and-iron gate, a long oak-canopied drive, equestrian-fenced common area. The Oaks-tier architecture is the whole brand. |
| `/hoa-management/nokomis/` | `/assets/geo/hoa-nokomis.jpg` | A Nokomis residential HOA entrance — slightly smaller, slightly more modest than Sarasota proper, with mature live oaks shading the entry monument. The unpretentiousness is the point. |
| `/hoa-management/englewood/` | `/assets/geo/hoa-englewood.jpg` | An Englewood single-family HOA — retiree-belt vernacular (1980s ranch homes with terrazzo floors, glassed lanais, mature crotons), modest entrance signage, golf-cart-friendly streets. |
| `/hoa-management/casey-key/` | `/assets/geo/hoa-casey-key.jpg` | A Casey Key residential association — barely-an-HOA scale, a single shared driveway through mangroves, beach-house architecture. The "community" is more like ten neighbors with shared dune-walkover responsibility. |
| `/hoa-management/manasota-key/` | `/assets/geo/hoa-manasota.jpg` | A Manasota Key barrier-island HOA — beach-cottage architecture, shell-and-sand driveway, a community access path through the dunes visible at frame edge. Small and rustic. |
| `/hoa-management/north-port/` | `/assets/geo/hoa-north-port.jpg` | A North Port, FL master-planned community — newer construction (2010s), Mediterranean-revival vernacular, formal entry monument with cascading water feature. Inland feel — palmettos and oaks, not palms. |
| `/hoa-management/charlotte-county/` | `/assets/geo/hoa-charlotte.jpg` | A Punta Gorda or Burnt Store HOA entrance — golf-course community vernacular, a rendered clubhouse roofline visible past the gatehouse, the kind of community where every home has a lanai facing the fairway. |

---

## Blog spokes — editorial imagery

Each spoke gets ONE inline editorial image, used both as the OG image and as a hero treatment in the article. Style is photo-illustrative — real photography, but composed with one clean conceptual idea, not just a stock shot.

| URL | Filename | Concept | Prompt |
|---|---|---|---|
| `/blog/florida-sirs-milestone-inspection-guide/` | `/assets/blog/sirs-inspection.jpg` | The inspection in progress | A structural engineer on a coastal balcony with a thickness gauge against a railing post. Hard hat, clipboard, the physical act of inspection. Building face stretches into perspective behind. |
| `/blog/hoa-accounting-best-practices/` | `/assets/blog/accounting-practices.jpg` | The packet on the table | A monthly board packet open to the budget-vs-actual page, a calculator, a half-empty glass of iced tea. Late evening light. The volunteer treasurer's view. |
| `/blog/reserve-study-special-assessment/` | `/assets/blog/special-assessment.jpg` | The unwelcome letter | An envelope on a kitchen counter, opened, with a folded letter visible. The mood is "this is the conversation no board wants to have." Out of focus: a glass of wine and a phone face-down. |
| `/blog/management-fees-guide/` | `/assets/blog/management-fees.jpg` | The proposal review | Two RFP responses side by side on a conference table, sticky-notes flagged on differences in scope. The composition makes "compare carefully" the visual idea. |
| `/blog/insurance-guide/` | `/assets/blog/insurance.jpg` | The post-storm calm | A coastal building the morning after a tropical storm — palm fronds on the deck, a single roof tile dislodged, the gulf unnaturally calm behind. Quiet, post-event. The insurance question begins here. |
| `/blog/what-does-a-management-company-do/` | `/assets/blog/what-cam-does.jpg` | The day in the life | A community association manager in a polo shirt, walking a property with a clipboard and a phone — multitasking visible. The breadth of the job in one frame. |
| `/blog/florida-law-changes/` | `/assets/blog/law-changes.jpg` | The law in process | An open copy of the Florida Statutes (real spine visible), a highlighter, a board's annotated copy of bylaws. The image is "doing the homework." |
| `/blog/how-to-change-management-company/` | `/assets/blog/change-management.jpg` | The handoff | Two manila folders being passed across a table — one labeled with the outgoing firm, one with the incoming. Composition: the moment of transfer. |

---

## Resource hub & support pages

| URL | Filename | Prompt |
|---|---|---|
| `/blog/` (resource hub) | `/assets/blog/hub-hero.jpg` | A long, low bookshelf in the Keys-Caldwell office holding past board packets, statute binders, and reserve study volumes. Eye-level shot. The visual argument: there's institutional knowledge here, and we're sharing it. 16:10. |
| `/blog/glossary/` | `/assets/blog/glossary-hero.jpg` | An open dictionary or legal-terminology binder, a pencil resting in the gutter, a single highlighted definition just out of focus. Educational, calm. |
| `/blog/events/` | `/assets/blog/events-hero.jpg` | A community room set up for a board education event — chairs in rows, a projection screen with the Keys-Caldwell logo barely visible, late afternoon light through Venetian blinds. Empty before the event. |
| `/blog/newsletter/` | `/assets/blog/newsletter-hero.jpg` | A printed quarterly newsletter on a kitchen counter next to a coffee mug, the masthead reading [generic but Keys-Caldwell-branded]. The image of "this lands in your inbox and you actually read it." |
| `/blog/state-of-the-association-2026/` | `/assets/blog/state-2026-hero.jpg` | An aerial of Sarasota County's coastline at dawn, with one weathered coastal building in the foreground. The image of stocktaking — a year-end report on a region. |
| `/case-studies/` | `/assets/case-studies-hero.jpg` | A board meeting room, empty, after a meeting has ended — chairs slightly askew, a printed packet at every seat, a single coffee cup left behind. Documentary, non-glossy. |
| `/careers/` | `/assets/careers-hero.jpg` | The Keys-Caldwell office break-area or a corner of the Venice office that reads "small firm with long-tenured staff" — a corkboard with thank-you cards from clients, a coffee station, a window onto the parking lot. Quietly affirming, not corporate-aspirational. |
| `/owners/` | `/assets/owners-hero.jpg` | An owner at home opening a Keys-Caldwell-branded envelope at a kitchen counter — the mundane, important moment of "the management company sent me something." Soft natural light. No face. |
| `/vendors/` | `/assets/vendors-hero.jpg` | A trade contractor's pickup truck pulled up to a coastal building service entrance — ladders, equipment, the moment of arriving on site. Working photography, not advertising. |
| `/condocerts/` | `/assets/condocerts-hero.jpg` | A real-estate closing table — a stack of estoppel paperwork, a notary stamp, a bottle of water sweating on a coaster. The image of the closing process. |
| `/faq/` | `/assets/faq-hero.jpg` | A single chair at a board meeting, the board packet open in front of it. The visual: "you have questions; we have a chair for you." |
| `/request-proposal/` | `/assets/request-proposal-hero.jpg` | A printed proposal cover-page on a desk, branded simply, awaiting the recipient. The artifact at the moment before it changes hands. |
| `/testimonials/` | `/assets/hero/keys-caldwell-board-testimonials.jpg` | A board member at a podium during a community annual meeting, mid-applause. Documentary. The viewer should feel like the room is real and it's been a long meeting. |

---

## Hero images for service-areas / pricing

| URL | Filename | Prompt |
|---|---|---|
| `/service-areas/` | `/assets/service-areas-hero.jpg` | A two-lane coastal road through a stand of slash pines and palmettos, the kind of road that connects Venice to Englewood. Empty road, late golden hour. The image of "we drive this region every week." 16:10. |
| `/pricing/` | `/assets/pricing-hero.jpg` | A printed pricing schedule on a clipboard next to a calculator and a budget binder. The artifact-on-the-table treatment. The image is "we put this in writing." |
| `/services/` (sub-pillar overview) | `/assets/services-hero.jpg` | A workbench at the Venice office with the operational tools of community management spread out — a board packet, a tablet showing a portal dashboard, a roll of architectural drawings, a hard hat. The breadth of the practice in one frame. 16:10. |

---

## Production notes

1. **Order to produce:** OG share images first (5 files — these affect every page's social card). Then pillar heroes (6 files). Then geo pages (27 files — biggest set). Then blog and support.
2. **Sourcing:** Where possible, real photography of Keys-Caldwell-managed buildings (with HOA/condo board permission) beats AI-generated imagery. AI is acceptable for the editorial / conceptual blog images and for landscape establishing shots; less appropriate for specific-building geo heroes and team portraits.
3. **Permission:** Any image of a real managed community needs board sign-off; bake the request into the next quarterly board packet.
4. **Naming:** Stick to the filenames exactly as specified above — they're already wired into the OG meta tags and team schema. New images can drop into `/assets/og/`, `/assets/team/`, `/assets/geo/`, `/assets/blog/`, and `/assets/hero/` without code changes.
5. **Fallback strategy:** Until real photography is in hand, the type-led hero treatments on most pages (no-image renders) are acceptable. The ONE place a missing image is actively harmful is the social-share OG card — use the brand-default OG (`keys-caldwell-default.jpg`) until others are produced.
