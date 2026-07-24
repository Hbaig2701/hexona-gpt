// Website prompts — Home Maintenence B (generated from the dental master template)
export const HOME_MAINTENANCE_B_PROMPTS: Record<string, string> = {
  "Basement Waterproofing": `Build a complete multi-page website for the basement waterproofing and foundation drainage company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified — just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 200+ reviews]", "[$X,XXX-$XX,XXX per system]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: calm, competent, honest, generous white space, smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: the steady, no-pressure crew that finally makes the water problem go away for good.

BRAND
Colors: deep storm blue (#14425A) primary, cool off-white (#F6F8F9) backgrounds, soft stone (#D9DEE3) accents, charcoal (#20262B) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a sturdy modern serif for headlines, a clean sans for body. Imagery: real basements before and after, crews at work in tidy homes, dry finished spaces families actually use. No generic flood stock photos, no scare-tactic mold close-ups, no clip-art foundation diagrams. Copy tone: plain, calm, reassuring, zero engineering jargon, short sentences, written for a homeowner who is stressed about water and afraid of being upsold.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a dry, finished basement, an outcome-focused headline (write me 3 options to choose from), one primary button "Book My Free Inspection" and one secondary link "Take the 60-Second Dry Basement Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, basements dried, "Free no-pressure inspections". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Interior Drainage & Sump Pumps, Exterior Waterproofing & Grading, Foundation Crack Repair, Crawl Space Encapsulation), one plain-English sentence each. Then a visually distinct gradient storm-blue band: "Not sure why your basement gets wet?" with a button to the quiz. Then a "Real Results" proof section: 3 interactive before-and-after comparisons (wet or cracked before, dry and sealed after), each an image with a draggable vertical divider that works with mouse drag and touch, a small "slide to compare" hint, and a one-line caption (fix type and timeframe, e.g. "Interior drainage system - 2 days"). If a draggable divider is not supported, use a tap-or-hover crossfade toggle instead. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip using the financing line from BUSINESS DETAILS plus the warranty promise. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Interior Drainage & Sump Pumps, Exterior Waterproofing & Grading, Foundation Crack Repair, Crawl Space Encapsulation): a question-form heading like "Why does my basement leak after every rain?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. Include one before-and-after slider in the Interior Drainage section and one in the Crawl Space section (same draggable-divider component as the home page), relevant to that work.

PAGE 3 - DRY BASEMENT QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Dry Basement Quiz". One question per step, large tappable answer cards with simple icons, selected state in storm blue, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What is going on in your basement right now? (Water comes in during or after rain / Damp walls or a musty smell / Cracks in the walls or floor / Crawl space problems / Nothing yet - I want it checked before finishing the space)
2. How long has it been happening? (Just started / A few months / Years / Since we moved in)
3. How do you use the space? (Storage only / Finished living space / We want to finish it someday / It is a crawl space)
4. Have you had it looked at before? (Never / Years ago / Got quotes but never fixed it / Just bought the house)
5. If the basement were bone dry forever, what would you do with it? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized dry-basement plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about waterproofing cost - before anyone rings your doorbell." An interactive instant-estimate tool built as a short multi-step form: step 1 choose the problem (leaking walls or floor / sump pump / foundation cracks / crawl space / not sure), step 2 how much of the basement is affected (one spot / one wall / several walls / the whole basement), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that an exact quote needs a free inspection, and a "Book My Free Inspection" button. After the range, add one reassuring line: "Most homeowners are relieved the right fix costs less than they feared - and you approve the exact number before any work starts." Below the tool: financing explained in plain English using the financing line provided, what every job includes (free inspection with photos, written fixed quote, transferable warranty), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we never invent problems to sell a bigger system / you get photos and a written quote before anything starts / we leave your basement cleaner than we found it - adjust to the company's real promises), photos of completed work, and only the licenses and credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, an urgent line: "Water coming in right now? Call us - we hold same-day slots for active leaks." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a storm-blue "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any waterproofing company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: TrueDry Basement Solutions
Type of business: basement waterproofing and foundation drainage
City: Riverton
Exact business name, address, phone for the footer (must match Google Business Profile exactly): TrueDry Basement Solutions, 1420 Millbrook Road, Riverton, (555) 384-2210
Hours: Mon-Fri 7am-6pm, Sat 8am-1pm, closed Sunday
Service area: Riverton and every suburb within 40 miles

Owner name: Dan Kovac
3 facts for the About story: started as a foundation crew lead at 19, 16 years in basement work, founded TrueDry after watching a neighbor get sold a system twice the size she needed
Team members (names and roles): Luis (crew foreman, 10 years), Amber (office manager), Pete (inspection specialist)
Real credentials and licenses: state-licensed contractor, certified sump pump and drainage installer, fully insured

Google rating and review count: 4.9 stars, 243 reviews
Years serving the city: 16 years
Basements dried (approximate is fine): 2,100+ basements
3 real differentiators: free no-pressure inspections with photo reports, transferable lifetime warranty on installed systems, same-day response for active leaks
3 real reviews to quote (first names only): "Two other companies quoted me huge systems. Dan fixed one crack and told me to save my money." - Karen / "Water was pouring in on a Saturday. They were here by noon." - Jeff / "Basement has been bone dry through two spring storms." - Monica

Financing line: third-party financing available, plans from $125/month
Price ranges (ranges are fine, these get published):
- Inspection: free, with a written photo report
- Foundation crack repair: $450-$1,200 per crack
- Sump pump install or replacement: $1,800-$3,500
- Interior drainage system: $5,500-$12,000
- Exterior waterproofing and grading: $8,000-$20,000
- Crawl space encapsulation: $4,000-$14,000

Booking calendar name (in the CRM): Free Basement Inspection
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the storm-blue palette above is used): use the palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Home Staging": `Build a complete multi-page website for the home staging company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified — just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 150+ reviews]", "[$X,XXX per staging]", "[STAGER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap. This site speaks to two audiences at once - homeowners preparing to sell and realtors managing listings - and both must feel spoken to on every page.

This must feel like a premium, custom-designed site, not a template: editorial, warm, aspirational, generous white space, smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: walking into a beautifully staged home and hearing a buyer whisper "this is the one."

BRAND
Colors: deep espresso (#38302A) primary, warm ivory (#FAF7F2) backgrounds, soft greige (#CFC6B8) accents, near-black (#26221E) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a refined editorial serif for headlines, a light modern sans for body. Imagery: sunlit staged rooms, layered textures, real listing photos from BUSINESS DETAILS projects. No fake-perfect render-style rooms, no generic sold-sign handshake stock, no staged champagne flutes. Copy tone: polished but human, confident, benefit-led, short sentences, written for a seller anxious about a big sale and a realtor protecting their reputation.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a staged living room in natural light, an outcome-focused headline about selling faster and for more (write me 3 options to choose from), one primary button "Book a Staging Consult" and one secondary link "Take the 60-Second Sell-Faster Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years staging, homes staged, average days on market from BUSINESS DETAILS. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Vacant Home Staging, Occupied Home Staging, Staging Consultations, Realtor Partner Program), one plain-English sentence each. Then a visually distinct gradient espresso band: "Not sure what your listing needs?" with a button to the quiz. Then a "Real Transformations" proof section - this is where staging shines: 3 interactive before-and-after room comparisons (empty or cluttered before, staged after), each an image with a draggable vertical divider that works with mouse drag and touch, a small "slide to compare" hint, and a one-line caption (room and result, e.g. "Vacant living room - sold in 6 days"). If a draggable divider is not supported, use a tap-or-hover crossfade toggle instead. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls) - ideally one from a homeowner and one from a realtor. Then a payment strip: the pay-at-closing option from BUSINESS DETAILS explained in one sentence. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Vacant Home Staging, Occupied Home Staging, Staging Consultations, Realtor Partner Program): a question-form heading like "Why stage a vacant home at all?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. Include one before-and-after slider in the Vacant Staging section and one in the Occupied Staging section (same draggable-divider component as the home page), relevant to that service.

PAGE 3 - SELL-FASTER QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Sell-Faster Quiz". One question per step, large tappable answer cards with simple icons, selected state in espresso, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Which best describes your situation? (Homeowner selling soon / Realtor with a listing / The home is vacant / The home feels dated or cluttered / Just curious what staging costs)
2. When does the home hit the market? (Already listed / Within a month / 1-3 months / Not sure yet)
3. What worries you most? (Sitting on the market too long / Low offers / The cost of staging / Empty rooms photographing badly)
4. What is the home like right now? (Completely vacant / Lived-in and furnished / Partly furnished / A rental turnover)
5. If buyers remembered one room from the showing, which room should it be? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized staging plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & PRICING (the lead magnet)
Headline: "Honest answers about staging cost - before you list." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a service (vacant staging / occupied staging / consultation only / not sure), step 2 home size (under 1,500 sq ft / 1,500-2,500 / over 2,500), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that an exact quote needs a quick walkthrough, and a "Book a Staging Consult" button. After the range, add one reassuring line: "Most sellers find staging costs far less than their first price reduction would - and you approve the exact number before a single piece arrives." Below the tool: the pay-at-closing option explained in plain English, what every staging includes, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (photo-ready on the agreed date, every time / we stage for your buyer, not our taste / no surprise fees after the quote - adjust to the company's real promises), photos of staged rooms, and only the certifications and affiliations listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions - with a dropdown asking whether the sender is a homeowner or a realtor.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and an espresso "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any stager's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Willow & Main Home Staging
Type of business: home staging and staging consultations
City: Fairview
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Willow & Main Home Staging, 208 Grandview Avenue Suite 4, Fairview, (555) 726-4415
Hours: Mon-Fri 9am-5pm, weekends by appointment
Service area: Fairview and surrounding towns within 30 miles

Owner name: Melissa Grant
3 facts for the About story: spent 7 years as a realtor before staging full time, 9 years running Willow & Main, started staging after her own slow-selling listing transformed and sold in a week once furnished
Team members (names and roles): Jordan (lead designer), Tasha (logistics and install manager), two part-time install assistants
Real credentials and affiliations: certified staging professional, member of the regional realtor association affiliate program

Google rating and review count: 4.9 stars, 156 reviews
Years staging: 9 years
Homes staged (approximate is fine): 800+ homes
Average days on market for staged listings (demo stat): 11 days
3 real differentiators: photo-ready within 5 business days of booking, our own warehouse of furniture (no third-party rentals), a pay-at-closing option for qualified listings
3 real reviews to quote (first names only): "Our empty flip went from echoing to irresistible. Three offers the first weekend." - Sandra / "As an agent I use Melissa on every vacant listing. My sellers thank me." - Derek / "They worked with our own furniture and it finally looked like a magazine." - Priya

Payment line: pay-at-closing available for qualified listings; otherwise 50% to book, balance at install
Price ranges (ranges are fine, these get published):
- Staging consultation (occupied homes): $250-$350
- Occupied staging using the owner's furniture: $800-$2,000
- Vacant staging, main living areas, first 60 days: $2,400-$4,500
- Each additional month: $500-$900
- Single-room staging: $600-$1,200
- Realtor partner program: custom package pricing

Booking calendar name (in the CRM): Staging Consult
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the espresso palette above is used): use the palette above
Logo available? (yes/no): no - create a simple elegant wordmark`,

  "Kitchen Remodel": `Build a complete multi-page website for the kitchen remodeling contractor described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified — just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.8 stars - 200+ reviews]", "[$XX,XXX-$XX,XXX full remodel]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: warm, crafted, confident, generous white space, smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: standing in the finished kitchen you have been picturing for years, built by people who sweat the details.

BRAND
Colors: rich walnut (#5A4232) primary, warm cream (#FAF6EF) backgrounds, brushed brass (#C6A15B) accents, charcoal (#26221F) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a warm classic serif for headlines, a clean geometric sans for body. Imagery: finished kitchens in morning light, close-ups of cabinet joinery and stone counters, real families cooking. No sterile showroom stock, no renderings passed off as photos, no generic granite-slab close-ups. Copy tone: warm, plain English, zero construction jargon, short sentences, written for a homeowner excited about the result but nervous about cost, mess, and picking the wrong contractor.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a finished kitchen, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Design Consult" and one secondary link "Take the 60-Second Dream Kitchen Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, kitchens completed, "Fixed-price quotes". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Full Kitchen Remodels, Cabinets & Countertops, Layout Changes & Islands, Kitchen Refreshes), one plain-English sentence each. Then a simple 3-step design-build strip: design together, approve a fixed price, we build - one line each. Then a visually distinct gradient walnut band: "Not sure what your kitchen needs?" with a button to the quiz. Then a "Real Transformations" proof section: 3 interactive before-and-after kitchen comparisons, each an image with a draggable vertical divider that works with mouse drag and touch, a small "slide to compare" hint, and a one-line caption (scope and duration, e.g. "Full remodel with island - 5 weeks"). If a draggable divider is not supported, use a tap-or-hover crossfade toggle instead. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip using the financing line from BUSINESS DETAILS. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Full Kitchen Remodels, Cabinets & Countertops, Layout Changes & Islands, Kitchen Refreshes): a question-form heading like "How long does a full kitchen remodel really take?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. Include one before-and-after slider in the Full Remodels section and one in the Cabinets & Countertops section (same draggable-divider component as the home page), relevant to that work.

PAGE 3 - DREAM KITCHEN QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Dream Kitchen Quiz". One question per step, large tappable answer cards with simple icons, selected state in walnut, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What bothers you most about your kitchen? (Outdated look / Not enough storage / Cramped or awkward layout / Worn cabinets and counters / Nothing specific - dreaming and budgeting)
2. How old is your kitchen? (Under 10 years / 10-20 years / 20-40 years / Original to the house)
3. What has held you back so far? (Not knowing the cost / Fear of living through construction / Finding a contractor to trust / Settling on a design)
4. How long do you plan to stay in this home? (5+ years / A few years / Preparing to sell / Not sure)
5. If money were no object, what is the first thing you would change? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized kitchen plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about remodel cost - before you fall in love with a design." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a scope (full remodel / cabinets and counters / layout change or island / refresh - paint, hardware, backsplash / not sure), step 2 kitchen size (small / medium / large or open concept), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that an exact fixed quote needs a free design consult, and a "Book a Free Design Consult" button. After the range, add one reassuring line: "Most homeowners find a realistic budget faster than they expected - and your price is fixed before demo day, not after." Below the tool: financing explained in plain English using the financing line provided, what every project includes (fixed quote, dedicated crew, daily cleanup), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (your price is fixed before demo starts / one dedicated crew start to finish / we protect and clean your home daily - adjust to the company's real promises), photos of finished kitchens, and only the licenses and credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a walnut "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any remodeler's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Hearthstone Kitchen Remodeling
Type of business: design-build kitchen remodeling
City: Lakewood
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Hearthstone Kitchen Remodeling, 976 Fulton Street, Lakewood, (555) 291-7738
Hours: Mon-Fri 8am-5pm, Sat 9am-1pm, closed Sunday
Service area: Lakewood and communities within 35 miles

Owner name: Tony Alvarez
3 facts for the About story: started as a cabinetmaker at 17, 18 years remodeling kitchens, launched Hearthstone after too many jobs where he had to fix another contractor's shortcuts
Team members (names and roles): Rosa (design lead, 8 years), Mike (site foreman), Dave (cabinet and trim specialist)
Real credentials and licenses: state-licensed general contractor, certified kitchen and bath remodeler, fully insured

Google rating and review count: 4.8 stars, 187 reviews
Years serving the city: 18 years
Kitchens completed (approximate is fine): 350+ kitchens
3 real differentiators: fixed-price quotes signed before demo day, one dedicated crew from start to finish, dust-controlled job sites with daily cleanup
3 real reviews to quote (first names only): "The price on the contract was the price we paid. Unheard of." - Laura / "Same three guys every day for five weeks. They felt like family by the end." - Greg / "We cooked Thanksgiving for 14 in the new kitchen. Worth every penny." - Simone

Financing line: financing available through our lending partner, plans from $280/month
Price ranges (ranges are fine, these get published):
- Kitchen refresh (paint, hardware, backsplash): $4,000-$9,000
- Cabinet refacing plus new countertops: $12,000-$25,000
- Mid-range full remodel: $30,000-$55,000
- Custom full remodel with layout change: $55,000-$95,000
- Island addition: $3,500-$12,000
- In-home design consult: free

Booking calendar name (in the CRM): Free Design Consult
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the walnut palette above is used): use the palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Drywall Repair": `Build a complete multi-page website for the drywall repair and finishing company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified — just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 300+ reviews]", "[$XXX-$XXX per repair]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap. This company is proudly small-job friendly - no hole is too small to call about - and that welcome must come through on every page.

This must feel like a premium, custom-designed site, not a template: clean, crisp, friendly, generous white space, smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a wall so smooth you forget there was ever a hole in it.

BRAND
Colors: deep denim blue (#2C4A63) primary, crisp off-white (#FBFBF9) backgrounds, soft putty (#E4E0D8) accents, charcoal (#24282C) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a friendly rounded slab for headlines, a clean sans for body. Imagery: real repairs mid-process and finished, seamless painted walls, tidy drop cloths and clean workspaces. No generic tool-belt stock heroes, no cartoon handyman clip art, no dramatic demolition shots. Copy tone: plain, upbeat, honest, short sentences, written for a homeowner who assumes their job is too small to bother anyone with.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a flawless finished wall in a real room, an outcome-focused headline (write me 3 options to choose from), one primary button "Book My Repair Visit" and one secondary link "Take the 60-Second Wall Fix Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, repairs completed, "No job too small". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Patch & Small Hole Repair, Water-Damaged Walls & Ceilings, Texture Matching & Skim Coating, New Drywall & Full Rooms), one plain-English sentence each. Then a visually distinct gradient denim band: "Not sure what your walls need?" with a button to the quiz. Then a "Real Results" proof section: 3 interactive before-and-after repair comparisons (hole or stain before, seamless wall after), each an image with a draggable vertical divider that works with mouse drag and touch, a small "slide to compare" hint, and a one-line caption (repair type and duration, e.g. "Ceiling water damage - one visit"). If a draggable divider is not supported, use a tap-or-hover crossfade toggle instead. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then an upfront-pricing strip: flat prices quoted before work starts, most standard patches priced right over the phone. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Patch & Small Hole Repair, Water-Damaged Walls & Ceilings, Texture Matching & Skim Coating, New Drywall & Full Rooms): a question-form heading like "Is one doorknob hole really worth a service call?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. Include one before-and-after slider in the Water-Damaged Walls section and one in the Texture Matching section (same draggable-divider component as the home page), relevant to that work.

PAGE 3 - WALL FIX QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Wall Fix Quiz". One question per step, large tappable answer cards with simple icons, selected state in denim blue, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What needs fixing? (A hole or dent / Water-damaged wall or ceiling / Cracks or nail pops / Texture that does not match / A bigger project - new walls or a full room)
2. How many spots are we talking about? (Just one / 2-5 / More than 5 / Whole rooms)
3. What matters most to you? (An invisible finish / Getting it done fast / Keeping the price down / A clean, dust-free visit)
4. Should we paint it too? (Yes, paint it to match / I will paint it myself / Not sure yet)
5. What happened, in your own words? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized repair plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest repair prices - before anyone knocks on your door." An interactive instant-estimate tool built as a short multi-step form: step 1 choose the repair (small hole or dent / water damage / cracks / texture or skim coat / full room / not sure), step 2 how many spots (one / a few / many / whole rooms), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that an exact quote takes a quick photo or visit, and a "Book My Repair Visit" button. After the range, add one reassuring line: "Most repairs cost less than people expect - and you approve the exact flat price before we open a bucket of mud." Below the tool: how payment works in plain English (flat pricing, pay on completion, card or check), what every visit includes (dust containment, cleanup, paint-ready or painted finish), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we show up in the window we promised / the patch will match - or we come back free / we leave zero dust behind - adjust to the company's real promises), photos of finished repairs, and only the credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form with a photo-upload prompt: "Snap a photo of the damage and we can usually price it same day."

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a denim "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any drywall company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: SmoothWall Drywall Repair
Type of business: drywall repair, texture matching, and finishing
City: Brookfield
Exact business name, address, phone for the footer (must match Google Business Profile exactly): SmoothWall Drywall Repair, 512 Harmon Street, Brookfield, (555) 468-9921
Hours: Mon-Fri 7:30am-5:30pm, Sat 8am-12pm, closed Sunday
Service area: Brookfield and neighborhoods within 25 miles

Owner name: Kevin O'Rourke
3 facts for the About story: spent 8 years as a commercial taper before going solo, 12 years running SmoothWall, started the company because big contractors kept turning away the small repairs homeowners actually needed
Team members (names and roles): Sam (repair technician, 6 years), Dana (scheduling and office)
Real credentials: licensed and insured, lead-safe certified for older homes

Google rating and review count: 4.9 stars, 412 reviews
Years serving the city: 12 years
Repairs completed (approximate is fine): 5,000+ repairs
3 real differentiators: a texture-match guarantee (if you can find the patch, we fix it free), dust-contained sanding on every job, flat prices for standard patches quoted over the phone
3 real reviews to quote (first names only): "Doorknob hole gone in an hour. Cannot find where it was." - Alicia / "Three other companies never called back about my small ceiling stain. Kevin priced it on the phone." - Robert / "They put down runners, sealed the room, and vacuumed. Cleaner than before." - Jen

Payment line: flat pricing approved up front, pay on completion by card or check
Price ranges (ranges are fine, these get published):
- Small patch (1-2 holes): $150-$275
- Multiple patches in one visit: $250-$450
- Water-damaged ceiling repair: $350-$900
- Texture matching per area: $200-$500
- Skim coat per room: $600-$1,400
- Hang and finish a full room: $1,200-$3,000

Booking calendar name (in the CRM): Repair Visit
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the denim palette above is used): use the palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Landscaping": `Build a complete multi-page website for the landscaping design and maintenance company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified — just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.8 stars - 250+ reviews]", "[$XXX/month maintenance]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap. This company does both one-time design projects and recurring maintenance plans - the site must sell both without letting either bury the other.

This must feel like a premium, custom-designed site, not a template: fresh, organic, confident, generous white space, smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a yard the whole street slows down to look at.

BRAND
Colors: deep pine green (#2F5233) primary, warm off-white (#FAF9F4) backgrounds, soft moss (#DCE3D0) accents, charcoal (#23281F) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a natural humanist serif for headlines, a clean sans for body. Imagery: golden-hour photos of finished yards, crews planting, close-ups of stonework and healthy turf. No sterile suburban lawn stock, no generic riding-mower shots, no fake dew-drop grass close-ups. Copy tone: warm, plain English, zero horticulture jargon, short sentences, written for a homeowner who is embarrassed by their yard or tired of doing it all themselves.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width golden-hour photo of a finished landscape, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Yard Walkthrough" and one secondary link "Take the 60-Second Yard Plan Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, yards transformed, "Licensed and insured crews". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Landscape Design & Installation, Lawn Care & Maintenance Plans, Patios, Walkways & Hardscaping, Seasonal Cleanups & Mulching), one plain-English sentence each. Then a visually distinct gradient pine band: "Not sure where to start with your yard?" with a button to the quiz. Then a "Real Transformations" proof section: 3 interactive before-and-after yard comparisons, each an image with a draggable vertical divider that works with mouse drag and touch, a small "slide to compare" hint, and a one-line caption (project type and timeframe, e.g. "Full front-yard redesign - 2 weeks"). If a draggable divider is not supported, use a tap-or-hover crossfade toggle instead. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a maintenance-plan strip: flat monthly plans from the price in BUSINESS DETAILS, plus the financing line for larger installs. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Landscape Design & Installation, Lawn Care & Maintenance Plans, Patios, Walkways & Hardscaping, Seasonal Cleanups & Mulching): a question-form heading like "What does a landscape designer actually do?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. Include one before-and-after slider in the Design & Installation section and one in the Hardscaping section (same draggable-divider component as the home page), relevant to that work.

PAGE 3 - YARD PLAN QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Yard Plan Quiz". One question per step, large tappable answer cards with simple icons, selected state in pine green, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What does your yard need most? (A full redesign / Regular mowing and upkeep / A patio, walkway, or wall / A cleanup and fresh mulch / Not sure - I want ideas)
2. How do you feel about your yard today? (Honestly embarrassed / Fine but boring / Good, just needs upkeep / Blank slate - new build)
3. Who takes care of it now? (I do it all myself / A service I am not happy with / Nobody, it shows / A mix)
4. How big is the yard? (Small city lot / Average suburban yard / Large yard or acreage / Not sure)
5. Describe the yard you wish you had. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized yard plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & PLANS (the lead magnet)
Headline: "Honest answers about landscaping cost - before a truck ever pulls up." An interactive instant-estimate tool built as a short multi-step form: step 1 choose the work (design and install / monthly maintenance / patio or hardscaping / cleanup and mulch / not sure), step 2 yard size (small city lot / average suburban / large or acreage), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that an exact quote needs a free walkthrough, and a "Book a Free Yard Walkthrough" button. After the range, add one reassuring line: "Most homeowners are surprised how far their budget goes when a plan comes first - and you approve every number before we break ground." Below the tool: how maintenance plans bill (flat monthly, cancel anytime rules from BUSINESS DETAILS), the financing line for large installs, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (you see the design before we dig / flat plans, no surprise charges / we clean up every single day - adjust to the company's real promises), photos of crews and finished yards, and only the licenses and credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a pine "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any landscaper's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Cedar & Stone Landscapes
Type of business: landscape design, installation, and maintenance plans
City: Ashford
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Cedar & Stone Landscapes, 3340 Old Mill Road, Ashford, (555) 613-5502
Hours: Mon-Fri 7am-5pm, Sat 8am-12pm, closed Sunday
Service area: Ashford and towns within 30 miles

Owner name: Marcus Bell
3 facts for the About story: horticulture degree from the state university, 15 years in landscaping, started Cedar & Stone after redesigning his grandmother's overgrown backyard into the garden the neighborhood still visits
Team members (names and roles): Elena (landscape designer), Troy (install crew lead, 9 years), two maintenance crews of two
Real credentials and licenses: licensed landscape contractor, certified paver installer, fully insured

Google rating and review count: 4.8 stars, 264 reviews
Years serving the city: 15 years
Yards transformed (approximate is fine): 1,200+ yards
3 real differentiators: you approve a sketched design before we dig, flat monthly maintenance plans with no surprise charges, the same crew on your plan every visit
3 real reviews to quote (first names only): "The sketch Elena drew is exactly what my backyard looks like now." - Tom / "Same two guys every Thursday. My lawn has never looked like this." - Denise / "Patio done in 8 days, yard spotless every evening." - Raj

Financing line: financing available for installs over $5,000, plans from $150/month
Price ranges (ranges are fine, these get published):
- Mowing and edging plan: $180-$260 per month
- Full-service maintenance plan: $350-$600 per month
- Spring or fall cleanup: $400-$900
- Mulch refresh: $600-$1,500
- Paver patio or walkway: $6,000-$18,000
- Full landscape design and install: $8,000-$40,000
- Design fee: $400-$800, credited if we build it

Booking calendar name (in the CRM): Free Yard Walkthrough
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the pine palette above is used): use the palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Window Covering": `Build a complete multi-page website for the custom window coverings company (blinds, shades, and shutters) described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified — just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 250+ reviews]", "[$XXX-$XXX per window]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap. The core offer is a free in-home design consultation - samples brought to the customer's own windows, in their own light - and that should anchor every call to action.

This must feel like a premium, custom-designed site, not a template: soft, elegant, light-filled, generous white space, smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: afternoon light falling through a perfectly fitted shade, softened exactly the way you wanted.

BRAND
Colors: deep slate (#3E4A54) primary, soft linen (#F7F4EE) backgrounds, warm taupe (#B9AC98) accents, soft charcoal (#282C30) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a graceful light serif for headlines, a refined sans for body. Imagery: real windows with light filtering through shades, close-ups of fabric and wood textures, rooms at different times of day. No generic venetian-blind product-catalog stock, no showroom walls of samples, no staged hand-on-wand close-ups. Copy tone: calm, tasteful, helpful, short sentences, written for a homeowner overwhelmed by options who mostly wants someone to just tell them what will look right.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of soft light through a fitted shade, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free In-Home Design Consult" and one secondary link "Take the 60-Second Window Style Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, windows covered, "Free in-home consults". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Custom Blinds, Roller, Roman & Cellular Shades, Plantation Shutters, Motorized & Smart Shades), one plain-English sentence each. Then a visually distinct gradient slate band: "Not sure what suits your windows?" with a button to the quiz. Then a "Real Windows, Real Homes" proof section: 3 interactive before-and-after window comparisons (bare or builder-basic before, finished after), each an image with a draggable vertical divider that works with mouse drag and touch, a small "slide to compare" hint, and a one-line caption (product and room, e.g. "Motorized roller shades - great room"). If a draggable divider is not supported, use a tap-or-hover crossfade toggle instead. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip using the financing line from BUSINESS DETAILS. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Custom Blinds, Roller, Roman & Cellular Shades, Plantation Shutters, Motorized & Smart Shades): a question-form heading like "Are plantation shutters worth the price?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. Include one before-and-after slider in the Shades section and one in the Shutters section (same draggable-divider component as the home page), relevant to that product.

PAGE 3 - WINDOW STYLE QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Window Style Quiz". One question per step, large tappable answer cards with simple icons, selected state in slate, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What matters most for your windows? (Blocking light for better sleep / Privacy from neighbors / A designer look / Motorized convenience / Not sure - I want to see options)
2. Which windows are we covering? (Bedrooms / Main living areas / The whole home / One tricky window)
3. What is on your windows now? (Builder-basic blinds / Nothing - bare windows / Old curtains or drapes / A mix)
4. Which style feels most like your home? (Warm and natural / Clean and minimal / Classic and traditional / Bold and dramatic)
5. Tell us about your trickiest window. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized window plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about window covering cost - before anyone measures a thing." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a product (blinds / shades / shutters / motorized / not sure), step 2 how many windows (1-3 / 4-8 / 9-15 / whole home), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact pricing comes from a free in-home measure, and a "Book a Free In-Home Design Consult" button. After the range, add one reassuring line: "Most homeowners find custom costs less than they assumed - and your price is exact before anything is ordered, with measuring on us." Below the tool: financing explained in plain English using the financing line provided, what every order includes (professional measure, install, fit guarantee), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we bring samples to your light, not a showroom / if it does not fit perfectly, we remake it free / no pressure, ever - adjust to the company's real promises), photos of installed work, and only the certifications and partnerships listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the service-area note from BUSINESS DETAILS, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a slate "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any blinds company's website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Luna Shade & Shutter Co.
Type of business: custom blinds, shades, and shutters with in-home design service
City: Crestwood
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Luna Shade & Shutter Co., 88 Sycamore Lane Suite B, Crestwood, (555) 947-3360
Hours: Mon-Fri 9am-6pm, Sat 10am-3pm, closed Sunday
Service area: Crestwood and surrounding communities within 30 miles

Owner name: Grace Lin
3 facts for the About story: worked as an interior designer for 6 years before founding the company, 11 years in window coverings, started the business after watching clients get talked into products that fought their rooms' light
Team members (names and roles): Omar (measure and install lead, 8 years), Beth (design consultant), Kyle (installer)
Real credentials and partnerships: certified motorization specialist, authorized dealer for two national shade manufacturers, fully insured

Google rating and review count: 4.9 stars, 278 reviews
Years serving the city: 11 years
Windows covered (approximate is fine): 9,000+ windows
3 real differentiators: free in-home design consults with samples in your own light, a perfect-fit guarantee (remade free if it is not right), motorization expertise most local shops do not have
3 real reviews to quote (first names only): "Grace saw my room and picked the exact fabric I could not find in months of searching." - Hannah / "Blackout shades in the nursery. Baby sleeps, we sleep." - Miguel / "Motorized shades on 14 windows, all on one remote and schedule. Flawless install." - Patrice

Financing line: 12-month interest-free financing available on orders over $1,500
Price ranges (ranges are fine, these get published):
- Faux-wood blinds, per window installed: $120-$250
- Roller or cellular shades, per window: $180-$420
- Roman shades, per window: $350-$700
- Plantation shutters, per window: $450-$950
- Motorized shades, per window: $600-$1,200
- Whole-home packages (10+ windows): typically $3,500-$12,000

Booking calendar name (in the CRM): Free In-Home Design Consult
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them (otherwise the slate palette above is used): use the palette above
Logo available? (yes/no): no - create a simple elegant wordmark`,
};
