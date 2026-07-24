# Website Master Prompt — Dental (reference example)

This is Hamza's master website prompt for a dental clinic. Every industry website
prompt in this directory mirrors this structure, customized per niche.

---

Build a complete multi-page website for the dental practice described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified — just use clearly marked placeholders in place of the missing facts (for example "[PRACTICE NAME]", "[4.9 stars - 300+ reviews]", "[$XXX-$XXX]", "[DR. NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, calm, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a calm, modern clinic you instantly trust.

BRAND
Colors: deep teal (#0F766E) primary, warm off-white (#FAF9F6) backgrounds, soft sand (#E7DFD3) accents, charcoal (#1F2933) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: an elegant serif for headlines, a clean geometric sans for body. Imagery: warm, natural photos of real people smiling in daylight. No blue-gloved clinical stock photos, no dental chairs as hero images. Generate images in this style where needed. Copy tone: warm, plain English, reassuring, zero dental jargon, short sentences, written for someone slightly nervous about dentists.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Book Your Visit" and one secondary link "Take the 60-Second Smile Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, smiles treated, "New patients welcome". Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page (Checkups & Cleanings, Cosmetic & Whitening, Implants & Restorations, Emergency Care), one plain-English sentence each. Then a visually distinct gradient teal band: "Not sure what your smile needs?" with a button to the Smile Quiz. Then a "Real Results" smile gallery: 3 interactive before-and-after smile comparisons, each one an image with a draggable vertical divider the visitor slides left and right to reveal the before photo on one side and the after photo on the other, with a small "slide to compare" hint label and a one-line caption under each (treatment type and timeframe, e.g. "Clear aligners - 8 months"). The slider should work with both mouse drag and touch. If a draggable divider is not supported, build it as a tap-or-hover toggle that crossfades between the before and after photo instead. Use the before/after photo instructions in BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then an insurance and financing strip: which insurers are billed directly, payment plans from the monthly amount listed. Then a meet-the-dentist teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group (Checkups & Cleanings, Cosmetic & Whitening, Implants & Restorations, Emergency Care): a question-form heading like "What happens at a checkup?", then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button. In the Cosmetic & Whitening section and the Implants & Restorations section, also include one before-and-after smile slider each (same draggable-divider component as the home page gallery), relevant to that treatment.

PAGE 3 - SMILE QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Smile Quiz". One question per step, large tappable answer cards with simple icons, selected state in teal, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What bothers you most about your smile? (Color / Alignment / Missing or damaged teeth / Pain or sensitivity / Nothing, just due for a checkup)
2. How long has it bothered you? (Just noticed / Months / Years / As long as I can remember)
3. How do you feel about dental visits? (Totally fine / A little nervous / Very anxious / I avoid them)
4. When did you last see a dentist? (Under 6 months / 6-24 months / 2+ years / Can't remember)
5. If cost were no issue, what would you fix first? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized smile plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about cost - before you sit in the chair." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a treatment (cleaning / whitening / veneers / implant / clear aligners / not sure), step 2 insurance status (insured / not insured / not sure), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes need a quick exam, and a "Book a Free Consult" button. After the range, add one reassuring line: "Most patients are surprised it costs less than they feared - and we confirm your exact number before anything happens in the chair." Below the tool: financing explained in plain English using the financing details provided, what insurance typically covers, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The dentist's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we explain prices before we start / we never judge / we run on time - adjust to the practice's real promises), photos of the office, and only the credentials and memberships listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, parking note, an emergency line: "In pain right now? Call us - we hold same-day emergency slots." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a teal "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any dentist's website into something specific to this practice using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Practice name: Brightway Dental
Type of practice (family / cosmetic / implant): family and cosmetic
City and neighborhood: Maplewood district, Springfield
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Brightway Dental, 284 Cedar Avenue, Springfield, (555) 214-8890
Hours: Mon-Fri 8am-6pm, Sat 9am-2pm, closed Sunday
Parking note: Free patient parking behind the building

Dentist name: Dr. Sarah Bennett
3 facts for the About story (school, years practicing, connection to the city, why dentistry): graduated from State University College of Dentistry, 14 years practicing, grew up ten minutes from the clinic, became a dentist after her own childhood fear of dental visits
Team members (names and roles), if any: Maria (office manager, 9 years), James (hygienist), Priya (hygienist)
Real credentials and memberships: American Dental Association member, certified in clear aligner therapy

Google rating and review count (real numbers): 4.9 stars, 312 reviews
Years serving the city: 14 years
Number of smiles/patients treated (approximate is fine): 6,000+ patients
3 real differentiators (e.g. same-day appointments, direct insurance billing, judgment-free care): same-day emergency appointments, direct insurance billing, judgment-free care for nervous patients
3 real patient reviews to quote (first names only): "I avoided dentists for 8 years. Dr. Bennett never made me feel bad about it once." - Rachel / "In and out for a crown in one visit. They billed my insurance directly, zero paperwork." - Marcus / "My kids actually ask when they get to go back." - Danielle

Insurers billed directly: all major PPO plans, billed directly
Financing provider and starting monthly amount: financing available through Cherry, plans from $89/month

Price ranges (ranges are fine, these get published):
- Cleaning and checkup: $140-$190
- Whitening: $350-$600
- Veneers (per tooth): $950-$1,400
- Implant (single): $3,200-$5,000
- Clear aligners: $2,900-$5,500
- Emergency exam: $95 (applied to treatment cost if you proceed)

Booking calendar name (in the CRM): New Patient Consult
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the practice has them (otherwise the teal palette above is used): use the teal palette above

Logo available? (yes/no): no - create a simple clean wordmark
