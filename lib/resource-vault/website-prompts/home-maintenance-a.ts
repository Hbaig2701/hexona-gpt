// Website prompts — Home Maintenence A (generated from the dental master template)
export const HOME_MAINTENANCE_A_PROMPTS: Record<string, string> = {
  "Pool Maintenence": `Build a complete multi-page website for the pool maintenance and service company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[4.9 stars - 180+ reviews]", "[XXX pools on weekly routes]", "[$XXX/month]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, clean, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: the dependable pool company that finally takes the whole chore off your plate.

BRAND
Colors: deep pool blue (#0E7490) primary, crisp white (#F7FAFC) backgrounds, fresh aqua (#A5F3FC) accents, deep slate (#1E293B) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a confident rounded sans for headlines, a clean readable sans for body. Imagery: real backyard pools sparkling in natural sunlight, techs actually working, close-ups of clear water. No inflatable-flamingo stock photos, no staged models lounging with cocktails, no resort infinity pools that look nothing like a family backyard. Generate images in this style where needed. Copy tone: friendly, plain-spoken, relief-focused, zero water-chemistry jargon, short sentences, written for a homeowner who is tired of fighting green water and hauling chemicals.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width sunny backyard pool photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Get My Weekly Plan" and one secondary link "Take the 60-Second Pool Check". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, pools on weekly routes, "Same-week starts". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Weekly Cleaning Plans, Green-to-Clean Recovery, Equipment Repair & Upgrades, Openings & Closings), one plain-English sentence each. Then a visually distinct gradient aqua band: "Not sure what your pool needs?" with a button to the Pool Check quiz. Then a "Green to Clean" proof gallery: 3 interactive before-and-after pool comparisons, each an image with a draggable vertical divider the visitor slides left and right to reveal the green before on one side and the clear after on the other, with a small "slide to compare" hint and a one-line caption under each (e.g. "Full green-to-clean recovery - 6 days"). The slider must work with both mouse drag and touch; if a draggable divider is not supported, build it as a tap-or-hover toggle that crossfades between the two photos instead. Use the before/after photo instructions in BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a plans strip: the flat monthly plan pricing from BUSINESS DETAILS and what every visit includes, with chemicals-included called out if listed. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Weekly Cleaning Plans, Green-to-Clean Recovery, Equipment Repair & Upgrades, Openings & Closings): a question-form heading like "What does a weekly visit actually include?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Green-to-Clean Recovery section include one before-and-after slider (same draggable-divider component as the home page gallery).

PAGE 3 - POOL CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Pool Check". One question per step, large tappable answer cards with simple icons, selected state in pool blue, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What's going on with your pool right now? (Green or cloudy water / Equipment acting up / I'm tired of maintaining it myself / I need an opening or closing / Just comparing pool companies)
2. Who takes care of the pool today? (I do it myself / Another company / It's been neglected a while / It's a brand new pool)
3. How does the water look today? (Crystal clear / A little cloudy / Green / I can't see the bottom)
4. What kind of pool is it? (Inground chlorine / Saltwater / Above ground / Not sure)
5. If we could fix one thing about your pool this week, what would it be? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized pool care plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING & PLANS (the lead magnet)
Headline: "Honest answers about pool service pricing - before anyone shows up." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a service (weekly plan / green-to-clean recovery / equipment repair / opening or closing / not sure), step 2 pool type (inground / saltwater / above ground / not sure), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes need a quick look at the pool, and a "Book a Free Pool Assessment" button. After the range, add one reassuring line: "Most owners are surprised a full-service plan costs less than the chemicals, time and mistakes of doing it themselves - and we confirm your exact number before we start." Below the tool: how the flat monthly plans work in plain English, exactly what's included in every visit, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (same tech at your pool every week / a photo report after every visit / flat pricing with no surprise add-ons - adjust to the company's real promises), photos of the crew at work, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, an urgent line: "Pool turning green before a party or a home listing? Call us - we hold rush recovery slots." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a pool-blue "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any pool company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: ClearWave Pool Care
Type of company (weekly maintenance / repair / both): weekly maintenance, recovery and repair
City and area served: Lakeside district, Riverton
Exact business name, address, phone for the footer (must match Google Business Profile exactly): ClearWave Pool Care, 415 Harbor Lane, Riverton, (555) 301-4477
Hours: Mon-Fri 7am-5pm, Sat 8am-1pm, closed Sunday
Service area note: Riverton and surrounding suburbs within 25 minutes

Owner name: Mike Torres
3 facts for the About story (how he started, years in business, connection to the city): started cleaning neighborhood pools at 16 with a net and a bike trailer, 12 years running ClearWave, lifelong Riverton resident
Team members (names and roles), if any: Dana (office manager), Luis (lead service tech, 8 years), Kyle (repair tech)
Real licenses and certifications: Certified Pool Operator (CPO) #CPO-000000, licensed and insured

Google rating and review count (real numbers): 4.9 stars, 187 reviews
Years serving the city: 12 years
Pools on weekly routes (approximate is fine): 240+ pools
3 real differentiators: same tech at your pool every week, photo report texted after every visit, flat monthly price with chemicals included
3 real customer reviews to quote (first names only): "My pool went from swamp to swimmable in five days. I didn't touch a thing." - Karen / "Same tech every Tuesday, photo report every time. Zero surprises in two years." - Jeff / "They caught a failing pump before it died and saved me a fortune." - Alicia
Before/after photos available? (yes/no): yes - use the real green-to-clean photo pairs supplied; if none are supplied, use clearly watermarked demo pairs

Payment line: flat monthly plans, chemicals included, cancel anytime with 30 days notice

Price ranges (ranges are fine, these get published):
- Weekly full-service plan: $149-$199/month
- Green-to-clean recovery: $350-$700
- Filter clean and minor repairs: $150-$450
- Pump replacement: $800-$1,500
- Salt cell replacement: $500-$900
- Pool opening or closing: $250-$400

Booking calendar name (in the CRM): Free Pool Assessment
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the pool blue palette above is used): use the pool blue palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Sauna Installation": `Build a complete multi-page website for the home sauna design and installation company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[XXX saunas installed]", "[$X,XXX-$XX,XXX]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, warm, quietly luxurious, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a calm, high-end wellness retreat you could own at home.

BRAND
Colors: warm cedar (#9A5B33) primary, warm ivory (#FAF6EF) backgrounds, soft spruce (#43584C) accents, deep charcoal (#221F1C) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: an elegant refined serif for headlines, a clean quiet sans for body. Imagery: real cedar interiors, soft steam and warm evening light, finished installations in real homes and backyards. No spa-model stock photos with white towels and cucumber slices, no generic hotel spa scenes, no eucalyptus flat lays. Generate images in this style where needed. Copy tone: calm, premium, sensory but plain-spoken, short sentences, written for someone imagining a nightly ritual - not managing a construction project.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo of a finished sauna glowing at dusk, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Design Consult" and one secondary link "Take the 60-Second Sauna Match". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years in business, saunas installed, "Free in-home design consults". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Custom Indoor Saunas, Outdoor & Barrel Saunas, Infrared Saunas, Cold Plunge & Wellness Add-ons), one plain-English sentence each. Then a visually distinct gradient cedar band: "Not sure which sauna fits your home?" with a button to the Sauna Match quiz. Then a "Recent Projects" proof gallery: 6 project cards in a clean grid, each a large finished-install photo with a one-line caption (wood, heater type, build time, e.g. "Cedar barrel sauna, wood-fired - 2 weeks"), gentle zoom on hover, plus a small numbers wall beneath it with count-up stats from BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip: monthly payment option from BUSINESS DETAILS explained in one warm sentence. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Custom Indoor Saunas, Outdoor & Barrel Saunas, Infrared Saunas, Cold Plunge & Wellness Add-ons): a question-form heading like "What does a custom indoor sauna involve?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Custom Indoor and Outdoor & Barrel sections include 2-3 additional project photos each from the gallery style.

PAGE 3 - SAUNA MATCH QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Sauna Match". One question per step, large tappable answer cards with simple icons, selected state in cedar, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Where would your sauna live? (Inside the house / Backyard or patio / Basement or garage / Not sure yet / Replacing or upgrading an existing sauna)
2. Who will use it most? (Just me / Me and my partner / The whole family / Guests too)
3. What draws you to a sauna most? (Recovery and sore muscles / Sleep and stress / A hot-cold contrast routine / The look and ritual of it)
4. Traditional heat or infrared? (Traditional / Infrared / I want to compare both / Not sure)
5. Describe the space you have in mind - size, materials, anything you're picturing. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized sauna plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about sauna cost - before you fall in love with a design." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a project type (custom indoor / outdoor or barrel / infrared cabin / cold plunge add-on / not sure), step 2 how many people should it seat (just me / 2 / 4 / 6 or more), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes come after a free in-home design consult, and a "Book a Free Design Consult" button. After the range, add one reassuring line: "Most clients find a beautiful option well inside their budget once we see the space - and your fixed quote is in writing before any work begins." Below the tool: financing explained in plain English using the financing details provided, what a quote includes (materials, electrical hookup, cleanup), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (a fixed quote before work starts / one dedicated crew start to finish / we leave your home spotless - adjust to the company's real promises), photos of builds in progress, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions and photo uploads of the space they have in mind.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a cedar "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any sauna company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: Cedar & Ember Sauna Co.
Type of company (design-build / install-only / both): full design and installation
City and area served: Brookfield and surrounding towns
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Cedar & Ember Sauna Co., 88 Foundry Road, Brookfield, (555) 402-8816
Hours: Mon-Fri 8am-5pm, consults by appointment evenings and Saturdays
Service area note: Brookfield and towns within 45 minutes

Owner name: Erik Lindqvist
3 facts for the About story (how he started, years in business, connection to the craft): built his first sauna with his Finnish grandfather at 14, 9 years running Cedar & Ember, has lived in Brookfield for 15 years
Team members (names and roles), if any: Marta (design lead), Sam (lead carpenter, 7 years)
Real licenses and certifications: Licensed General Contractor #GC-000000, insured; electrical hookups by a partnered Licensed Master Electrician #EL-000000

Google rating and review count (real numbers): 5.0 stars, 74 reviews
Years in business: 9 years
Saunas installed (approximate is fine): 160+ saunas
3 real differentiators: fixed-price quotes in writing, one dedicated crew start to finish, 5-year craftsmanship warranty
3 real customer reviews to quote (first names only): "The quote never changed and the craftsmanship is stunning. We use it every single night." - Paul / "Erik designed around a tiny basement corner and made it feel like a boutique spa." - Renee / "Barrel sauna installed in two weeks, yard left cleaner than they found it." - Marcus

Financing provider and starting monthly amount: financing available through Hearth, plans from $165/month

Price ranges (ranges are fine, these get published):
- Infrared cabin, installed: $4,500-$9,000
- Outdoor barrel sauna, installed: $7,500-$14,000
- Custom indoor sauna build: $12,000-$30,000
- Cold plunge, installed: $5,000-$12,000
- Electrical hookup: $800-$2,000
- Annual maintenance visit: $150-$300

Booking calendar name (in the CRM): Free Design Consult
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the cedar palette above is used): use the cedar palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Electrician": `Build a complete multi-page website for the residential electrical company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[Licensed Master Electrician #EL-000000]", "[4.9 stars - 300+ reviews]", "[$XXX-$X,XXX]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, clean, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: the careful, licensed professional you actually want touching your home's wiring.

BRAND
Colors: deep navy (#14324F) primary, warm off-white (#FAFAF7) backgrounds, amber (#F59E0B) accents, charcoal (#1F2933) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a strong confident sans for headlines, a clean readable sans for body. Imagery: tidy labeled panel work, a uniformed electrician at a real home, warm finished lighting scenes. No flying-sparks stock photos, no tangled-wire chaos shots, no hard-hat models pointing at clipboards. Generate images in this style where needed. Copy tone: calm, safety-first, plain English, no trade jargon, short sentences, written for a homeowner quietly worried that something in the walls isn't right. IMPORTANT: never give DIY electrical instructions anywhere on the site beyond switching off a breaker - every safety mention routes to calling a licensed electrician.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Book an Electrician" and one secondary link "Take the 60-Second Home Power Check". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, homes served, "Same-day slots available". Then a slim safety triage strip: "Seeing sparks or smelling something burning? If you see smoke or fire, call 911 first. Otherwise switch off that breaker and call us now." with the click-to-call number. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Troubleshooting & Repairs, Panel Upgrades & Rewiring, Lighting & Ceiling Fans, EV Chargers & Generators), one plain-English sentence each. Then a visually distinct gradient navy band: "Not sure what your home's wiring needs?" with a button to the Home Power Check quiz. Then a proof section: a numbers wall with count-up stats from BUSINESS DETAILS plus a project gallery of 4-6 cards (tidy panel upgrades shown as side-by-side old-and-new photo pairs, finished lighting installs), each with a one-line caption. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip: panel upgrades and larger jobs from the monthly amount listed. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Troubleshooting & Repairs, Panel Upgrades & Rewiring, Lighting & Ceiling Fans, EV Chargers & Generators): a question-form heading like "Why do my breakers keep tripping?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Panel Upgrades section include one side-by-side old-panel and new-panel photo pair.

PAGE 3 - HOME POWER CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Home Power Check". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What brings you here today? (Something isn't working / Flickering, buzzing or tripping breakers / A panel or whole-home upgrade / An EV charger or generator / New lighting or renovation wiring)
2. How old is your home? (Under 10 years / 10-30 years / 30-60 years / Over 60 years / Not sure)
3. Have you noticed any of these? (Warm outlets or a faint burning smell / Breakers tripping often / Lights dimming when appliances start / None of these)
4. What's in your electrical panel? (Breakers / Fuses / Not sure)
5. In your own words, what would you like an electrician to look at? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized home power plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. If they chose "Warm outlets or a faint burning smell" in question 3, their result must open with: "Please treat this as urgent. If you ever see smoke or fire, call 911 first. Otherwise switch off that breaker and call us today." Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest answers about electrical pricing - before anyone opens your panel." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a job (repair or troubleshooting visit / panel upgrade / EV charger / lighting project / generator / not sure), step 2 home age (under 10 years / 10-30 / 30-60 / over 60 / not sure), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes need an in-person look, and a "Book an Electrician" button. After the range, add one reassuring line: "You approve a flat, written price before any work starts - the number we quote is the number you pay." Below the tool: financing explained in plain English using the financing details provided, what's included (diagnostic fee applied to the work, upfront flat quotes), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (a flat price approved before work starts / background-checked, uniformed electricians / we leave your home cleaner than we found it - adjust to the company's real promises), photos of real jobs, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, an urgent line: "Seeing sparks, hearing buzzing, or smelling something burning? If you see smoke or fire, call 911 first. Otherwise switch off the breaker for that circuit and call us - we hold same-day emergency slots." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and an amber "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any electrician's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: Beacon Electric
Type of company (residential / commercial / both): residential
City and area served: Fairview and surrounding suburbs
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Beacon Electric, 902 Commerce Street, Fairview, (555) 617-3020
Hours: Mon-Fri 7:30am-6pm, 24/7 emergency line
Service area note: Fairview and suburbs within 30 minutes

Owner name: Tom Reyes
3 facts for the About story (how he started, years licensed, connection to the city): apprenticed under his uncle at 18, Licensed Master Electrician for 16 years, raising his family ten minutes from the shop in Fairview
Team members (names and roles), if any: Nikki (office manager), Drew (journeyman electrician), Paul (apprentice)
Real licenses and certifications: Licensed Master Electrician #EL-000000, licensed and insured, all work permitted and code-inspected

Google rating and review count (real numbers): 4.9 stars, 342 reviews
Years serving the city: 16 years
Homes served (approximate is fine): 4,800+ homes
3 real differentiators: flat written price approved before work starts, background-checked uniformed electricians, we leave your home cleaner than we found it
3 real customer reviews to quote (first names only): "Found the fault two other companies missed, fixed it same day, price exactly as quoted." - Sandra / "Panel upgrade done in a day, spotless cleanup, walked me through every breaker." - Victor / "They treated my mom's old house with real care and never talked down to her." - Emily

Financing provider and starting monthly amount: financing available for panel upgrades and larger jobs, plans from $120/month

Price ranges (ranges are fine, these get published):
- Diagnostic visit: $89-$149 (applied to the repair if you proceed)
- Outlet or switch repair: $150-$300
- Ceiling fan or fixture install: $250-$450
- EV charger install: $800-$1,800
- Panel upgrade: $2,200-$4,500
- Whole-home generator, installed: $8,000-$15,000

Booking calendar name (in the CRM): Electrical Service Visit
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the navy palette above is used): use the navy palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Plumbing": `Build a complete multi-page website for the plumbing company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[Licensed Master Plumber #PL-000000]", "[4.8 stars - 500+ reviews]", "[$XXX-$X,XXX]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, clean, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: the calm, honest plumber who answers the phone and shows up when promised.

BRAND
Colors: deep marine blue (#1E4E79) primary, warm off-white (#FAF9F6) backgrounds, brushed copper (#C0713A) accents, charcoal (#1F2933) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a sturdy confident sans for headlines, a clean readable sans for body. Imagery: clean organized work vans, real techs in shoe covers at real homes, gleaming finished fixtures. No plumber-crack gags, no cartoon wrench mascots, no models in spotless coveralls frowning at a pipe. Generate images in this style where needed. Copy tone: calm, direct, reassuring, zero trade jargon, short sentences, written for someone either standing in water right now or dreading a surprise bill.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Plumber" and one secondary link "Take the 60-Second Plumbing Check". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, jobs completed, "24/7 emergency line". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Emergency Repairs, Drains & Sewer, Water Heaters, Kitchen & Bath Plumbing), one plain-English sentence each. Then a visually distinct gradient blue band: "Not sure how serious your plumbing problem is?" with a button to the Plumbing Check quiz. Then a proof section: a numbers wall with count-up stats from BUSINESS DETAILS plus a project gallery of 4-6 cards (finished water heater installs, remodeled bathrooms, before-and-after drain camera stills shown as side-by-side pairs), each with a one-line caption. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip: water heaters and larger repairs from the monthly amount listed. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Emergency Repairs, Drains & Sewer, Water Heaters, Kitchen & Bath Plumbing): a question-form heading like "How fast can you get here for a burst pipe?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Water Heaters and Kitchen & Bath sections include 1-2 finished-install photos each.

PAGE 3 - PLUMBING CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Plumbing Check". One question per step, large tappable answer cards with simple icons, selected state in marine blue, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What's going on with your plumbing? (A leak or drip / A clogged or slow drain / Water heater trouble / A remodel or new fixture / Something else entirely)
2. Where is it happening? (Kitchen / Bathroom / Basement or utility room / Outside or the main line / More than one place)
3. How long has it been going on? (It just started / A few days / Weeks / Months or longer)
4. How old is your home? (Under 10 years / 10-30 years / 30-60 years / Over 60 years / Not sure)
5. Describe what you're seeing or hearing in your own words. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized plumbing plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest answers about plumbing prices - before the van pulls up." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a job (drain clearing / leak repair / water heater replacement / faucet or fixture install / not sure), step 2 home age (under 10 years / 10-30 / 30-60 / over 60 / not sure), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes need a quick in-person look, and a "Book a Plumber" button. After the range, add one reassuring line: "Most repairs cost less than people fear - and you approve the exact flat price before any work begins." Below the tool: financing explained in plain English using the financing details provided, what's included (call-out fee applied to the repair, flat-rate quotes upfront), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (flat price approved before work starts / we answer our own phones / shoe covers and floor mats on every job - adjust to the company's real promises), photos of the crew and vans, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, an urgent line: "Burst pipe or water everywhere right now? Shut off your main water valve if you can reach it safely, then call us - our emergency line answers 24/7." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a copper "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any plumber's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: TrueFlow Plumbing
Type of company (residential / commercial / both): residential, everyday and emergency
City and area served: Cedar Falls and surrounding towns
Exact business name, address, phone for the footer (must match Google Business Profile exactly): TrueFlow Plumbing, 67 Mill Street, Cedar Falls, (555) 903-5512
Hours: Mon-Sat 7am-7pm, 24/7 emergency line
Service area note: Cedar Falls and towns within 30 minutes

Owner name: Dave Kowalski
3 facts for the About story (how he started, years licensed, connection to the city): third-generation plumber who grew up riding along in his dad's van, licensed 18 years, coaches little league in Cedar Falls
Team members (names and roles), if any: Rosa (dispatcher), Ben (journeyman plumber), Nate (apprentice)
Real licenses and certifications: Licensed Master Plumber #PL-000000, licensed, bonded and insured

Google rating and review count (real numbers): 4.8 stars, 526 reviews
Years serving the city: 18 years
Jobs completed (approximate is fine): 9,000+ jobs
3 real differentiators: flat-rate price approved before work starts, we answer our own phones 24/7, shoe covers and floor mats on every job
3 real customer reviews to quote (first names only): "Burst pipe at 11pm, Dave answered the phone himself and was here in 40 minutes." - Greg / "Quoted a flat price, found extra corrosion, still charged the quoted price." - Maya / "Cleanest tradesman who has ever set foot in my house." - Arlene

Financing provider and starting monthly amount: financing available for water heaters and larger repairs, plans from $75/month

Price ranges (ranges are fine, these get published):
- Drain clearing: $150-$350
- Leak repair: $180-$450
- Faucet or fixture install: $150-$400
- Sump pump replacement: $600-$1,200
- Tank water heater, replaced: $1,400-$2,600
- Tankless upgrade: $3,000-$5,500
- Emergency call-out: $99 (applied to the repair if you proceed)

Booking calendar name (in the CRM): Plumbing Service Visit
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the marine blue palette above is used): use the marine blue palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Home Security": `Build a complete multi-page website for the home security and alarm installation company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[X,XXX homes protected]", "[$XX-$XX/month monitoring]", "[State Alarm Contractor License #AC-000000]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, warm, calm, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: the quiet confidence of a home that's looked after - never fear.

BRAND
Colors: deep evergreen (#1F4E3D) primary, soft warm white (#FAF9F5) backgrounds, porch-light amber (#E8A13D) accents, deep charcoal (#26231F) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a friendly modern sans for headlines, a clean readable sans for body. Imagery: warm homes at dusk with porch lights on, families arriving home, clean close-ups of devices in real rooms. Absolutely no burglars in ski masks, shattered glass, red alarm glare, or ominous night-vision shots - nothing fear-based anywhere on the site. Generate images in this style where needed. Copy tone: reassuring, warm, plain English, short sentences - sell peace of mind and convenience, never fear, written for a homeowner who wants to check in on home, not lock it down.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo of a home at dusk, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Home Walkthrough" and one secondary link "Take the 60-Second Home Safety Check". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years in business, homes protected, "Local 24/7 monitoring". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Alarm & Sensor Systems, Cameras & Video Doorbells, Smart Locks & Automation, 24/7 Monitoring Plans), one plain-English sentence each. Then a visually distinct gradient evergreen band: "Not sure what your home actually needs?" with a button to the Home Safety Check quiz. Then a proof section: a numbers wall with count-up stats from BUSINESS DETAILS plus a clean install gallery of 4-6 cards (tidy keypads, doorbells and camera placements in real homes), each with a one-line caption. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a monitoring plans strip: the monthly monitoring pricing from BUSINESS DETAILS with the no-long-contract note called out. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Alarm & Sensor Systems, Cameras & Video Doorbells, Smart Locks & Automation, 24/7 Monitoring Plans): a question-form heading like "What actually happens when the alarm goes off?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Cameras & Video Doorbells section include 1-2 clean install photos.

PAGE 3 - HOME SAFETY CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Home Safety Check". One question per step, large tappable answer cards with simple icons, selected state in evergreen, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Keep every question warm and curious, never alarming. Questions in order:
1. What would give you the most peace of mind? (Knowing who's at the door and where packages are / An alarm that's actually monitored / Checking in on home while I travel / Kids or parents coming and going safely / Replacing an old system that never worked right)
2. What kind of home is it? (House / Townhome / Condo or apartment / A rental property I own)
3. What do you have today? (Nothing yet / A few standalone cameras / An old unmonitored alarm / A full system I've outgrown)
4. How would you like it watched? (Professional 24/7 monitoring / Self-monitoring on my phone / Show me both / Not sure yet)
5. Anything about your home or routine we should know? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized home security plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest answers about security cost - no scare tactics, no hidden fees." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a setup (alarm system / cameras and doorbell / smart locks / complete package / not sure), step 2 home size (1-2 bedrooms / 3-4 bedrooms / 5+ bedrooms), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes come after a free walkthrough, and a "Book a Free Home Walkthrough" button. After the range, add one reassuring line: "Most homes cost less to protect than a monthly streaming bundle - and you'll approve the exact number in writing before anything is installed." Below the tool: the monitoring plans explained in plain English (what's included, month-to-month terms), equipment ownership explained, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (no long-term contracts pushed / no fear-based selling, ever / we teach you the whole system before we leave - adjust to the company's real promises), photos of the team, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions. No urgency or emergency framing anywhere on this page - keep it calm and welcoming.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and an amber "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any security company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: Homestead Security
Type of company (install-only / install + monitoring): installation plus 24/7 monitoring plans
City and area served: Oakdale and surrounding suburbs
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Homestead Security, 233 Grant Avenue, Oakdale, (555) 744-2286
Hours: Mon-Fri 8am-6pm, Sat 9am-1pm, closed Sunday
Service area note: Oakdale and suburbs within 30 minutes

Owner name: Angela Brooks
3 facts for the About story (how she started, years in business, connection to the city): spent 11 years installing for a national security chain before opening her own shop, founded Homestead 8 years ago, Oakdale homeowner and mom of two
Team members (names and roles), if any: Priya (office manager), Marcus (lead installer), Dean (installer)
Real licenses and certifications: State Alarm Contractor License #AC-000000, insured, background-checked technicians

Google rating and review count (real numbers): 4.9 stars, 214 reviews
Years in business: 8 years
Homes protected (approximate is fine): 1,900+ homes
3 real differentiators: no long-term contracts, local technicians never subcontractors, plain-English training at every install
3 real customer reviews to quote (first names only): "Nobody tried to scare me into anything. They asked how we live and built around that." - Diane / "Install was tidy, and Marcus stayed until my 74-year-old dad could run the app himself." - Steve / "Month-to-month monitoring like they promised. Two years in, zero surprises on the bill." - Whitney

Monitoring and payment line: professional monitoring $25-$45/month, month-to-month, cancel anytime, you own the equipment

Price ranges (ranges are fine, these get published):
- Video doorbell, installed: $250-$450
- Smart lock, installed: $220-$400
- Camera package (3-4 cameras), installed: $700-$1,500
- Alarm and sensor package, installed: $450-$900
- Complete home package: $1,500-$3,000
- 24/7 professional monitoring: $25-$45/month

Booking calendar name (in the CRM): Free Home Walkthrough
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the evergreen palette above is used): use the evergreen palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Land Clearing": `Build a complete multi-page website for the land clearing and excavation company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[X,XXX acres cleared]", "[$X,XXX-$X,XXX per acre]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, rugged but clean, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: serious equipment run by a crew that shows up, works safely, and finishes.

BRAND
Colors: deep pine (#2E4A34) primary, warm bone white (#F8F6F1) backgrounds, earth tan (#C9A876) accents, near-black soil (#211E1A) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a bold condensed sans for headlines, a clean readable sans for body. Imagery: real machines working real sites, wide drone shots of freshly cleared acreage, the crew at work in daylight. No bulldozer clip art, no spotless showroom machinery, no hard-hat handshake stock photos. Generate images in this style where needed. Copy tone: straight-talking, capable, respectful of the landowner's plans, short sentences, no heavy-equipment jargon, written for someone who owns land and wants it usable.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width drone shot of cleared acreage, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Site Walk" and one secondary link "Take the 60-Second Site Check". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years in business, acres cleared, "Free site walks". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Lot & Land Clearing, Forestry Mulching, Excavation & Grading, Demolition & Site Prep), one plain-English sentence each. Then a visually distinct gradient pine band: "Not sure what your land needs?" with a button to the Site Check quiz. Then a "Recent Projects" proof gallery: 6 project cards in a clean grid, each a wide finished-site photo with a one-line caption (acreage, service and timeframe, e.g. "4 acres mulched for pasture - 3 days"), gentle zoom on hover, plus a numbers wall beneath it with count-up stats from BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a payment strip: the written-fixed-quote and progress-billing terms from BUSINESS DETAILS in one plain sentence. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Lot & Land Clearing, Forestry Mulching, Excavation & Grading, Demolition & Site Prep): a question-form heading like "What's the difference between mulching and full clearing?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Lot & Land Clearing and Forestry Mulching sections include 1-2 wide project photos each.

PAGE 3 - SITE CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Site Check". One question per step, large tappable answer cards with simple icons, selected state in pine green, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What are you planning for the land? (Building a home, barn or shop / Clearing overgrown acreage / Pasture, trails or hunting land / A driveway, pad or grading work / Removing an old structure)
2. Roughly how much land are we talking about? (Under 1 acre / 1-3 acres / 3-10 acres / More than 10 acres / Not sure)
3. What's on it right now? (Light brush / Heavy brush and small trees / Mature trees / An old structure / A mix of everything)
4. How's the access? (Easy road access / Tight or steep access / No access cut yet / Not sure)
5. Tell us about the property and what "done" looks like to you. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized land plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST ESTIMATOR (the lead magnet)
Headline: "Honest answers about clearing costs - before you walk the property with anyone." An interactive acreage estimator built as a short multi-step form: step 1 choose a service (forestry mulching / full clearing with haul-off / grading or driveway / demolition / not sure), step 2 approximate acreage (under 1 acre / 1-3 / 3-10 / 10+), step 3 timing, then a capture step (name and email), then show the honest per-acre or per-project range for their selection from BUSINESS DETAILS with a note that exact quotes need a site walk, and a "Book a Free Site Walk" button. After the range, add one reassuring line: "Most landowners overestimate mulching and underestimate haul-off - the free site walk gets you a real number in writing." Below the tool: how pricing works in plain English (per-acre versus per-day, what changes the price), what's included (utility locates, cleanup, final grade), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (a written fixed quote after the site walk / utility locates called in on every job / land left graded and clean, never rutted - adjust to the company's real promises), photos of the equipment and crew, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, an urgent line: "Storm damage or a downed tree blocking your drive? Call us - storm response jobs jump the schedule." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a pine "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any land clearing company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: Ridgeline Land Works
Type of company (clearing / excavation / both): land clearing, mulching, excavation and demolition
City and area served: Millbrook and surrounding counties
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Ridgeline Land Works, 1480 County Road 9, Millbrook, (555) 268-9034
Hours: Mon-Sat 7am-6pm, closed Sunday
Service area note: Millbrook and properties within 60 minutes

Owner name: Cole Danner
3 facts for the About story (how he started, years in business, connection to the area): grew up on a working farm outside Millbrook, ran equipment for a highway contractor for 10 years, started Ridgeline 7 years ago
Team members (names and roles), if any: Jess (office and scheduling), Ray (operator), Tucker (operator)
Real licenses and certifications: licensed and fully insured, Contractor License #CT-000000, utility-locate certified

Google rating and review count (real numbers): 4.9 stars, 96 reviews
Years in business: 7 years
Acres cleared (approximate is fine): 1,100+ acres
3 real differentiators: fixed written quotes after a free site walk, utility locates called in on every job, land left graded and clean with no buried debris
3 real customer reviews to quote (first names only): "Five overgrown acres to buildable pad in a week, exactly at the quoted price." - Hank / "They called in the utility locates before I even asked. Pros." - Sarah / "Other outfits buried the debris. Ridgeline hauled it, graded it, done." - Wade

Payment line: written fixed quotes, progress billing on multi-day projects, no deposit games

Price ranges (ranges are fine, these get published):
- Forestry mulching: $1,500-$3,000 per acre
- Heavy clearing with haul-off: $3,000-$6,000 per acre
- Grading and pad prep: $2,000-$6,000
- Gravel driveway install: $2,500-$8,000
- Small structure demolition: $4,000-$15,000
- Stump removal: $150-$450 each

Booking calendar name (in the CRM): Free Site Walk
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the pine palette above is used): use the pine palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Flooring Installation": `Build a complete multi-page website for the flooring installation company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[COMPANY NAME]", "[X,XXX floors installed]", "[$X-$XX per sq ft installed]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, warm, design-forward, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a design showroom that comes to your living room.

BRAND
Colors: warm walnut (#6E4B2A) primary, warm ivory (#FAF7F1) backgrounds, soft sage (#8A9B84) accents, deep espresso (#2A211A) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: an elegant serif for headlines, a clean modern sans for body. Imagery: real installed floors in warm natural light, honest texture close-ups, rooms people actually live in. No empty gray staging rooms, no swatch-fan hands, no models pointing at samples. Generate images in this style where needed. Copy tone: warm, design-savvy but plain English, decision-easing, short sentences, written for a homeowner excited about the new look but nervous about dust, mess and cost.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a beautiful finished floor in real light, an outcome-focused headline (write me 3 options to choose from), one primary button "Book Your Free In-Home Measure" and one secondary link "Take the 60-Second Floor Finder". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years in business, floors installed, "Free in-home measures". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Hardwood & Engineered Wood, Luxury Vinyl & Laminate, Tile & Stone, Carpet & Refinishing), one plain-English sentence each. Then a visually distinct gradient walnut band: "Not sure which floor fits your life?" with a button to the Floor Finder quiz. Then a "Real Transformations" proof gallery: 3 interactive before-and-after room comparisons, each an image with a draggable vertical divider the visitor slides left and right to reveal the old floor on one side and the new floor on the other, with a small "slide to compare" hint and a one-line caption under each (material and timeframe, e.g. "Carpet to wide-plank LVP - 2 days"). The slider must work with both mouse drag and touch; if a draggable divider is not supported, build it as a tap-or-hover toggle that crossfades between the two photos instead. Use the before/after photo instructions in BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip: monthly payment option from BUSINESS DETAILS in one plain sentence. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Hardwood & Engineered Wood, Luxury Vinyl & Laminate, Tile & Stone, Carpet & Refinishing): a question-form heading like "Is luxury vinyl really waterproof?", then a direct 2-3 sentence answer FIRST, then details, then the honest installed price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Hardwood & Engineered Wood and Carpet & Refinishing sections include one before-and-after slider each (same draggable-divider component as the home page gallery).

PAGE 3 - FLOOR FINDER QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Floor Finder". One question per step, large tappable answer cards with simple icons, selected state in walnut, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Which space are you flooring? (The whole main floor / Kitchen or bathrooms / Bedrooms / The basement / Just one room)
2. What look are you drawn to? (Real hardwood / Wood look but waterproof / Tile or stone / Soft carpet / Not sure yet - that's why I'm here)
3. What's life like at home? (Kids and pets everywhere / Pets only / Adults, pretty calm / It's a rental or a flip)
4. What's down right now? (Carpet / Older hardwood / Tile / Vinyl or laminate / Bare subfloor)
5. Describe the look you're going for - colors, styles, a photo you've saved, anything. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized flooring plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about flooring cost - before anyone measures a thing." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a flooring type (luxury vinyl / laminate / hardwood / tile / carpet / refinishing / not sure), step 2 rough square footage (under 300 / 300-800 / 800-1,500 / over 1,500), step 3 timing, then a capture step (name and email), then show the honest installed per-square-foot range for their selection from BUSINESS DETAILS with a note that the exact all-in quote comes from the free in-home measure, and a "Book Your Free In-Home Measure" button. After the range, add one reassuring line: "Installed price per square foot is the only number that matters - yours gets confirmed in writing at the free measure, materials and labor included." Below the tool: financing explained in plain English using the financing details provided, what's included (furniture moving, old floor haul-away, cleanup), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (a written all-in quote that doesn't change / dust control and daily cleanup / we move the furniture, you don't - adjust to the company's real promises), photos of installs in progress, and only the certifications and memberships listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions and inspiration-photo uploads.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a walnut "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any flooring company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: Heartwood Floors
Type of company (install-only / supply and install): supply and install
City and area served: Ashford and surrounding towns
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Heartwood Floors, 512 Main Street, Ashford, (555) 486-7710
Hours: Mon-Fri 9am-6pm, Sat 10am-3pm, closed Sunday
Service area note: Ashford and towns within 40 minutes

Owner name: Laura Chen
3 facts for the About story (how she started, years in the trade, connection to the city): started as an installer's apprentice at 19, 15 years in flooring, opened Heartwood in her hometown of Ashford
Team members (names and roles), if any: Omar (lead installer, 11 years), Beth (design consultant), Cody (installer)
Real certifications and memberships: licensed and insured, National Wood Flooring Association member, manufacturer-certified installers

Google rating and review count (real numbers): 4.9 stars, 268 reviews
Years in business: 15 years
Floors installed (approximate is fine): 2,300+ floors
3 real differentiators: free in-home measure with samples brought to you, written all-in quote that doesn't change, furniture moving and old-floor haul-away included
3 real customer reviews to quote (first names only): "Beth brought samples to my living room and the choice was suddenly easy." - Nicole / "Whole main floor in three days, quote never moved a dollar." - Raj / "They moved everything, sealed off the dust, and vacuumed before they left each night." - Carol
Before/after photos available? (yes/no): yes - use the real before-and-after room pairs supplied; if none are supplied, use clearly watermarked demo pairs

Financing provider and starting monthly amount: financing available, 12 months no interest, plans from $95/month

Price ranges (installed, per square foot - these get published):
- Luxury vinyl plank: $4-$7
- Laminate: $3.50-$6
- Engineered hardwood: $8-$14
- Solid hardwood: $10-$16
- Tile: $10-$18
- Carpet: $3-$6
- Hardwood refinishing: $3-$5

Booking calendar name (in the CRM): Free In-Home Measure
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the walnut palette above is used): use the walnut palette above
Logo available? (yes/no): no - create a simple clean wordmark`,
};
