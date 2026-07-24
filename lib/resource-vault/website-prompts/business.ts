// Website prompts — Business (generated from the dental master template)
export const BUSINESS_PROMPTS: Record<string, string> = {
  "Small Business (Direct Import)": `Build a complete multi-page website for the local business described in the BUSINESS DETAILS section at the very end of this prompt. The BUSINESS DETAILS section defines what kind of business this is - use those details everywhere and adapt every page, headline, and service name to that business type. Do not invent facts that are not listed there. If a detail is missing or the section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[BUSINESS NAME]", "[4.8 stars - 200+ reviews]", "[$XXX-$XXX]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: clean, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a well-run local business you would recommend to a friend without hesitating.

BRAND
Colors: deep navy (#1E3A5F) primary, warm off-white (#FAF9F6) backgrounds, soft warm gray (#E5E1DA) accents, charcoal (#1F2933) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a confident serif for headlines, a clean sans for body. Imagery: real people doing real work in real local settings, natural light. No handshake stock photos, no fake smiling call-center headsets, no generic skyline shots. Copy tone: plain, friendly, specific, short sentences, written for a busy local customer who wants to know they can trust this business before they call.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo relevant to the business type, an outcome-focused headline (write me 3 options to choose from), one primary button "Book an Appointment" and one secondary link "Take the 60-Second Fit Quiz". Under the hero, a trust bar with animated count-up numbers: Google rating and review count, years serving the city, customers served, plus one more stat from BUSINESS DETAILS. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a services preview: 4 cards linking to the Services page ([SERVICE 1], [SERVICE 2], [SERVICE 3], [SERVICE 4] - use the service groups from BUSINESS DETAILS), one plain-English sentence each. Then a visually distinct gradient navy band: "Not sure exactly what you need?" with a button to the Fit Quiz. Then a proof section fitted to this business type: a "Recent Work" or "Happy Customers" gallery of 3-6 photos with one-line captions, using only photos and facts from BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip: the starting-price or payment line from BUSINESS DETAILS if provided. Then a meet-the-owner teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each service group ([SERVICE 1] through [SERVICE 4] from BUSINESS DETAILS): a question-form heading a real customer would type into Google, then a direct 2-3 sentence answer FIRST, then details, then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a booking button.

PAGE 3 - FIT QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Fit Quiz". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What do you need help with? ([SERVICE 1] / [SERVICE 2] / [SERVICE 3] / [SERVICE 4] / Not sure yet)
2. How did this come up? (Just came up / Been putting it off / Planning ahead / It's a recurring need)
3. What matters most to you? (Price / Speed / Quality / Clear communication)
4. Have you used a [BUSINESS TYPE] before? (Yes, good experience / Yes, bad experience / No, this is my first time)
5. Tell us anything else about what you need. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized recommendation?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest answers about price - before you ever pick up the phone." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a service ([SERVICE 1] / [SERVICE 2] / [SERVICE 3] / [SERVICE 4] / not sure), step 2 one simple qualifier that fits the business type (size, scope, or frequency), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes need a quick conversation, and a "Book an Appointment" button. After the range, add one reassuring line: "Most customers are relieved it costs less than they feared - and you confirm the exact number before anything is booked." Below the tool: payment options in plain English using the payment line from BUSINESS DETAILS, what is always included, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we show up when we say we will / you know the price before we start / we treat you like a neighbor - adjust to the business's real promises), photos of the business, and only the credentials and licenses listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, the parking note from BUSINESS DETAILS, and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a navy "Book Now" button always visible; clean hamburger menu on mobile with the Book button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any similar business's website into something specific to this business using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. The bracketed lines
define the business type and services - fill them in first.
For a real client, replace every line below with their real
information - whatever you leave unchanged will appear on
the site.)
=====================================================

Business name: Cedar & Main Services
Type of business: [BUSINESS TYPE - e.g. plumbing, salon, pet grooming, repair shop]
City and neighborhood: Riverside district, Springfield
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Cedar & Main Services, 118 Main Street, Springfield, (555) 316-4420
Hours: Mon-Fri 8am-6pm, Sat 9am-1pm, closed Sunday
Parking note: Free customer parking out front

Owner name: Sam Carter
3 facts for the About story (background, years in the trade, connection to the city, why they started): 16 years in the trade, born and raised in Springfield, started the business after seeing too many customers overcharged and underserved
Team members (names and roles), if any: Jordan (operations manager, 6 years), Riley (senior technician)
Real credentials and licenses: [LICENSES AND CERTIFICATIONS]

Google rating and review count (real numbers): 4.8 stars, 214 reviews
Years serving the city: 16 years
Customers served (approximate is fine): 3,500+ customers
3 real differentiators: upfront pricing before work starts, same-week appointments, a real person answers the phone
3 real customer reviews to quote (first names only): "They quoted a price, stuck to it, and finished early. That never happens." - Dana / "Sam explained everything in plain English. No upsell, no pressure." - Luis / "The only [BUSINESS TYPE] I'll ever call again." - Priya

Payment options line: all major cards accepted, payment plans available on larger jobs
Price ranges (ranges are fine, these get published):
- [SERVICE 1]: [$XXX-$XXX]
- [SERVICE 2]: [$XXX-$XXX]
- [SERVICE 3]: [$XXX-$XXX]
- [SERVICE 4]: [$XXX-$XXX]
- [ADD-ON OR CALL-OUT FEE]: [$XX]

Booking calendar name (in the CRM): New Customer Appointment
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the business has them (otherwise the navy palette above is used): use the navy palette above

Logo available? (yes/no): no - create a simple clean wordmark`,

  "Business Coaching": `Build a complete multi-page website for the business coaching practice described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[COACH NAME]", "[4.9 stars - 80+ reviews]", "[$X,XXX per engagement]", "[CLIENT RESULT]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or client result to fill a gap.

This must feel like a premium, custom-designed site, not a template: sharp, calm, quietly authoritative, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a seasoned advisor who has seen your exact problem a hundred times and is not going to waste your time.

BRAND
Colors: deep ink navy (#14213D) primary, warm off-white (#FBFAF7) backgrounds, muted brass (#C9A227) accents used sparingly, charcoal (#1F2933) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a refined serif for headlines, a clean grotesque sans for body. Imagery: candid working sessions, whiteboards mid-idea, real client conversations in natural light. No fists-in-the-air seminar crowds, no private jets, no watch-and-supercar shots, no stock handshakes. Copy tone: direct, calm, zero hype, short sentences, written for an owner who is working too many hours and is skeptical of coaches.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width candid photo, an outcome-focused headline about the owner's business, not the coach (write me 3 options to choose from), one primary button "Book a Free Discovery Call" and one secondary link "Take the 60-Second Growth Bottleneck Quiz". Under the hero, a trust bar with animated count-up numbers: rating and review count, years coaching, owners coached, industries served. Then a "How this is different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (One-on-One Coaching, Group Mastermind, 90-Day Intensive, Team Workshops), one plain-English sentence each. Then a visually distinct gradient navy band: "Not sure what's actually holding your business back?" with a button to the Bottleneck Quiz. Then a proof section: a "Client Results" wall of 3 result cards using only the client outcomes listed in BUSINESS DETAILS, each with the result, first name, and business type. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a meet-the-coach teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded discovery-call calendar next to location, hours, phone, and an embedded map if the practice meets in person.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation. For each program (One-on-One Coaching, Group Mastermind, 90-Day Intensive, Team Workshops): a question-form heading like "What actually happens in one-on-one coaching?", then a direct 2-3 sentence answer FIRST, then details (who it's for, cadence, what a month looks like), then the honest price from BUSINESS DETAILS, then a 3-question FAQ, then a "Book a Discovery Call" button.

PAGE 3 - GROWTH BOTTLENECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Growth Bottleneck Quiz". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What's holding your business back most right now? (Leads and marketing / Sales and conversion / Team and hiring / My time and systems / Not sure - everything feels stuck)
2. How long have you felt stuck at this level? (Just hit it / A few months / Over a year / As long as I can remember)
3. What stage is your business in? (Just starting out / Growing but chaotic / Established and ready to scale / Established - I want my time back)
4. Have you worked with a coach before? (Never / Once, mixed results / Yes, and it helped / Only courses, never a real coach)
5. If we solved one thing in the next 90 days, what should it be? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized growth plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the discovery-call calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Straight answers about what coaching costs - before you get on a call." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a program (one-on-one / mastermind / 90-day intensive / team workshop / not sure), step 2 business stage (under 5 employees / 5-20 / 20+), step 3 timing, then a capture step (name and email), then show the honest price from BUSINESS DETAILS for their selection with a note that fit is confirmed on a free discovery call, and a "Book a Free Discovery Call" button. After the price, add one reassuring line: "The discovery call is free, and if coaching isn't the right answer for you, I'll say so on that call." Below the tool: what every engagement includes, the payment terms line from BUSINESS DETAILS, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The coach's story told in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs - the business they ran or built, why they coach now), any team members, an "My promises" section with 3 items (no hype, ever / I tell you what I'd do, not what you want to hear / if I'm not the right fit, I'll tell you who is - adjust to the coach's real promises), candid photos, and only the credentials and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded discovery-call calendar as the hero of the page, plus click-to-call phone, location with embedded map if in person, hours, a note on virtual sessions, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a navy "Book a Call" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any coach's website into something specific to this practice using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Practice name: Northstar Business Coaching
Type of coaching (general / niche): small business owners doing $200k-$2M in revenue
City and neighborhood: downtown Brookfield
Exact business name, address, phone for the footer: Northstar Business Coaching, 412 Commerce Street, Suite 204, Brookfield, (555) 728-3310
Hours: Mon-Thu 9am-5pm, Fri 9am-1pm
Parking note: Validated parking in the Commerce Street garage

Coach name: Alex Morgan
3 facts for the About story: built and sold a 22-person home services company, 11 years coaching owners, started coaching after nearly burning out running their own business
Team members (names and roles), if any: Casey (client success manager)
Real credentials and certifications: certified EOS-style operating system practitioner, [CERTIFICATION]

Rating and review count (real numbers): 4.9 stars, 87 reviews
Years coaching: 11 years
Owners coached (approximate is fine): 240+ business owners
3 real differentiators: only works with 15 clients at a time, every client gets Alex directly (no junior coaches), a written 90-day plan after the first session
3 real client reviews to quote (first names only): "I got my Sundays back within two months." - Marcus / "Alex told me to stop a launch that would have cost me $40k. Worth every penny." - Tina / "First coach who gave me homework instead of hype." - Devon
3 client result examples (result, first name, business type): grew from $340k to $610k in 14 months - Sarah, cleaning company / cut owner hours from 70 to 45 per week - James, HVAC / hired a manager and took a first real vacation in 6 years - Dana, bakery

Payment terms line: monthly billing, no long-term contracts, cancel with 30 days notice
Prices (these get published):
- Free discovery call: $0
- One-on-One Coaching: $950/month
- Group Mastermind: $450/month
- 90-Day Intensive: $4,500
- Half-day Team Workshop: $2,200
- Full-day Team Workshop: $3,800

Booking calendar name (in the CRM): Free Discovery Call
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the practice has them: use the navy palette above

Logo available? (yes/no): no - create a simple clean wordmark`,

  "Boat Rental": `Build a complete multi-page website for the boat rental company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 400+ reviews]", "[$XXX per half day]", "[BOAT MODEL]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: bright, breezy, effortless, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: vacation mode starts the moment the page loads - the easiest part of planning your day on the water.

BRAND
Colors: deep lake blue (#0C4A6E) primary, bright off-white (#FBFDFF) backgrounds, warm sand (#E8DCC3) accents, deep slate (#22303B) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a relaxed rounded serif or friendly display face for headlines, a clean sans for body. Imagery: real boats on this water in golden light, families and friends mid-laugh, wakes and shorelines. No stock yacht-party champagne shots, no generic tropical islands that don't match the actual lake, no staged captain-hat photos. Copy tone: sunny, helpful, zero boating jargon, short sentences, written for someone planning a day out who may have never driven a boat.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a boat on the actual water, an outcome-focused headline about the day, not the boat (write me 3 options to choose from), one primary button "Reserve Your Boat" and one secondary link "Take the 60-Second Perfect Day Quiz". Under the hero, a trust bar with animated count-up numbers: rating and review count, years on the water, trips launched, boats in the fleet. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a fleet preview: 4 cards linking to the Fleet page (Pontoon Boats, Fishing Boats, Speedboats & Watersports, Kayaks & Paddleboards), one plain-English sentence each. Then a visually distinct gradient blue band: "Not sure which boat fits your crew?" with a button to the Perfect Day Quiz. Then a proof section: a fleet showcase gallery - 3-6 photos of the actual boats with capacity and a one-line caption each, using only boats listed in BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip: half-day and full-day starting rates from BUSINESS DETAILS. Then a meet-the-owner teaser: photo at the dock, two warm sentences, link to About. Finally a booking section: the embedded reservation calendar next to the marina address, hours, phone, and an embedded map.

PAGE 2 - THE FLEET
One page, four anchored sections with sticky in-page navigation. For each group (Pontoon Boats, Fishing Boats, Speedboats & Watersports, Kayaks & Paddleboards): a question-form heading like "How many people fit on a pontoon?", then a direct 2-3 sentence answer FIRST, then details (capacity, what's included, license or age requirements from BUSINESS DETAILS only), then the honest rates from BUSINESS DETAILS, then a 3-question FAQ, then a "Reserve" button.

PAGE 3 - PERFECT DAY QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Perfect Day on the Water Quiz". One question per step, large tappable answer cards with simple icons, selected state in lake blue, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What kind of day are you planning? (Relaxed cruise with family or friends / A fishing trip / Tubing, skiing and speed / Quiet paddling and exploring / A birthday or special occasion)
2. How many people are coming? (1-2 / 3-6 / 7-10 / More than 10)
3. How much boat-driving experience do you have? (First time / A little / Plenty / We'd rather have a captain)
4. How long do you want to be out? (A couple of hours / Half day / Full day / More than a day)
5. Anything special we should know about your trip? (open text)
6. How soon is your trip? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized day-on-the-water plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored boat recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the reservation calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - RATES (the lead magnet)
Headline: "Honest rates, no surprise fees - see your price before you call." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a boat type (pontoon / fishing boat / speedboat / kayak or paddleboard / not sure), step 2 trip length (couple of hours / half day / full day), step 3 timing, then a capture step (name and email), then show the honest rate for their selection from BUSINESS DETAILS with a note about fuel and deposit from BUSINESS DETAILS, and a "Reserve Your Boat" button. After the rate, add one reassuring line: "The price you see is the price you pay - fuel and deposit policies are spelled out before you ever confirm." Below the tool: what every rental includes (safety gear, orientation, life jackets), the deposit and cancellation line from BUSINESS DETAILS, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (every boat inspected before every trip / a real orientation, not a rushed handoff / no surprise fees at the dock - adjust to the company's real promises), photos of the marina and fleet, and only the certifications and licenses listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded reservation calendar as the hero of the page, plus click-to-call phone, marina address with embedded map, hours, parking and launch note, and a short message form for questions about group events or special trips.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a blue "Reserve Now" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Reserve" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the lake and city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any boat rental website into something specific to this company using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Company name: Blue Heron Boat Rentals
Body of water: Lake Fairview
City: Lakeside
Exact business name, address, phone for the footer: Blue Heron Boat Rentals, 7 Marina Way, Lakeside, (555) 402-7788
Hours: daily 8am-7pm, May through October
Parking note: Free parking at the marina lot, trailer parking available

Owner name: Captain Dave Reyes
3 facts for the About story: 20 years on Lake Fairview, former charter captain, started the company with one used pontoon and a folding table
Team members (names and roles), if any: Mia (dock manager), Toby and Lena (dock crew)
Real certifications and licenses: US Coast Guard licensed captain on staff, state livery certified

Rating and review count (real numbers): 4.9 stars, 438 reviews
Years on the water: 12 years renting
Trips launched (approximate is fine): 9,000+ trips
Boats in the fleet: 14 boats
3 real differentiators: free 10-minute orientation for first-timers, every boat under 5 years old, no surprise fees at the dock
3 real customer reviews to quote (first names only): "First time driving a boat and they made it easy. Best day of our vacation." - Kelly / "Boat was spotless and the tank was full. Zero hassle." - Andre / "They moved our reservation when it rained, no fee, no fuss." - Sophie

Deposit and cancellation line: $200 refundable deposit, free rescheduling for weather, free cancellation up to 48 hours out
Rates (these get published):
- Pontoon (up to 10 people): $325 half day / $495 full day
- Fishing boat: $275 half day / $425 full day
- Speedboat with tow package: $395 half day / $595 full day
- Kayak or paddleboard: $45 half day / $75 full day
- Captain add-on: $150 per trip
- Fuel: pay for what you use at return

Booking calendar name (in the CRM): Boat Reservation Call
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the company has them: use the lake blue palette above

Logo available? (yes/no): no - create a simple clean wordmark`,

  "Auto Dealer": `Build a complete multi-page website for the independent used car dealership described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[DEALERSHIP NAME]", "[4.7 stars - 500+ reviews]", "[$XX,XXX-$XX,XXX]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, price, or interest rate to fill a gap.

This must feel like a premium, custom-designed site, not a template: clean, honest, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a straight-talking local dealer where nobody follows you around the lot.

BRAND
Colors: deep graphite (#25303B) primary, clean off-white (#FAFAF8) backgrounds, confident signal red (#B3202C) used sparingly for CTAs, near-black (#171D23) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a strong condensed sans for headlines, a clean readable sans for body. Imagery: real cars on the real lot in daylight, honest close-ups, real customers picking up keys. No balloons-and-flags clip art, no cheering stock families in showrooms, no spinning-chrome renders. Copy tone: plain, direct, no-pressure, short sentences, written for a buyer who has been burned by pushy dealers and inflated fees before.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of the actual lot or a featured vehicle, an outcome-focused headline (write me 3 options to choose from), one primary button "Browse Our Inventory" and one secondary link "Take the 60-Second Car Match Quiz". Under the hero, a trust bar with animated count-up numbers: rating and review count, years in business, cars sold, plus the inspection-point stat from BUSINESS DETAILS. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then an inventory preview: 4 cards linking to the Inventory & Services page (Sedans & Commuters, SUVs & Family Vehicles, Trucks & Work Vehicles, Trade-Ins & Financing), one plain-English sentence each. Then a visually distinct gradient graphite band: "Not sure what car fits your life and budget?" with a button to the Car Match Quiz. Then a proof section: a "Recent Arrivals" grid of 3-6 vehicle cards (photo, year-make-model placeholder, mileage placeholder, price placeholder - populated from live inventory, never invented). Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a financing strip: the financing partners line from BUSINESS DETAILS with the disclaimer "financing subject to credit approval; terms vary by lender." Then a meet-the-owner teaser: photo on the lot, two warm sentences, link to About. Finally a booking section: the embedded test-drive calendar next to address, hours, phone, and an embedded map.

PAGE 2 - INVENTORY & SERVICES
One page, four anchored sections with sticky in-page navigation. For each section (Sedans & Commuters, SUVs & Family Vehicles, Trucks & Work Vehicles, Trade-Ins & Financing): a question-form heading like "What should a good used SUV cost here?", then a direct 2-3 sentence answer FIRST, then details, then the honest typical price range from BUSINESS DETAILS, then a 3-question FAQ, then a "Book a Test Drive" button. In the Trade-Ins & Financing section, explain the trade-in process in three plain steps and note that written offers are valid for the number of days listed in BUSINESS DETAILS.

PAGE 3 - CAR MATCH QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Car Match Quiz". One question per step, large tappable answer cards with simple icons, selected state in graphite, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What are you shopping for? (A sedan or commuter / An SUV or family vehicle / A truck or work vehicle / Something fun / Not sure yet)
2. Do you have a trade-in? (Yes / Maybe / No)
3. How do you plan to pay? (Financing / Cash / Not sure yet)
4. What monthly payment feels comfortable? (Under $250 / $250-$400 / $400-$600 / Flexible)
5. Anything specific you're looking for - make, model, features, must-haves? (open text)
6. How soon do you want to be driving it? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized car matches?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the test-drive calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PAYMENTS & TRADE-INS (the lead magnet)
Headline: "See what your payment could look like - before you set foot on a lot." An interactive payment-estimator tool built as a short multi-step form: step 1 choose a vehicle budget (under $12k / $12k-$20k / $20k-$30k / over $30k), step 2 rough down payment or trade-in (none / under $2,000 / $2,000-$5,000 / over $5,000), step 3 timing, then a capture step (name and email), then show an illustrative monthly payment range for their selection based only on the example figures in BUSINESS DETAILS, always followed by this disclaimer: "Estimates are for illustration only and are not a financing offer. Actual rates, terms, and payments depend on lender approval and your credit profile." Never display a specific APR unless one is provided in BUSINESS DETAILS - use "[APR]" if a rate must appear. End with a "Book a Test Drive" button and one reassuring line: "No obligation, no hard credit pull to get a real number - we'll walk you through actual lender options in one visit." Below the tool: how trade-ins work in plain English, the doc fee from BUSINESS DETAILS stated plainly, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (the price on the windshield is the price / every car gets the full inspection before it hits the lot / no add-on fees sprung at signing - adjust to the dealership's real promises), photos of the lot, and only the licenses and memberships listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded test-drive calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, parking note, and a short message form for vehicle questions or trade-in photos.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a red "Book a Test Drive" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Test Drive" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy, and the dealer license number from BUSINESS DETAILS. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any dealership's website into something specific to this dealership using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Dealership name: Lakeview Auto Sales
Type: independent used car dealership
City and neighborhood: Route 9 corridor, Riverton
Exact business name, address, phone for the footer: Lakeview Auto Sales, 2280 Route 9, Riverton, (555) 683-2214
Hours: Mon-Sat 9am-7pm, closed Sunday
Parking note: Customer parking at the main entrance
Dealer license number: [DEALER LICENSE NUMBER]

Owner name: Tony Rivera
3 facts for the About story: 18 years in the car business, started as a lot porter at 17, opened Lakeview after promising himself he'd run a lot with no games and no pressure
Team members (names and roles), if any: Gloria (finance manager, 8 years), Sam (sales), Pete (lot and detail)
Real licenses and memberships: state licensed dealer, member of the Independent Auto Dealers Association

Rating and review count (real numbers): 4.7 stars, 512 reviews
Years in business: 9 years
Cars sold (approximate is fine): 3,200+ cars
Inspection stat: every car passes a 120-point inspection
3 real differentiators: windshield price is the real price, 120-point inspection with the report handed to you, 5-day exchange policy
3 real customer reviews to quote (first names only): "Nobody hovered. I asked for keys, took a test drive, bought the car. Done in 90 minutes." - Jess / "They showed me the inspection report before I asked. First dealer to ever do that." - Omar / "Trade-in offer beat the big-box store by $900." - Renee

Financing partners line: financing arranged through local credit unions and national lenders, subject to credit approval
Doc fee (stated plainly): $299 documentation fee, disclosed upfront
Trade-in offer validity: written trade-in offers valid for 7 days
Typical price ranges (these get published):
- Sedans and commuters: $9,500-$18,000
- SUVs and family vehicles: $14,000-$28,000
- Trucks and work vehicles: $16,000-$34,000
- Something fun (coupes, convertibles): $12,000-$26,000
- Example financing figure for the estimator: illustrative payments based on 60-month terms with [APR] APR
- 5-day exchange policy: no charge

Booking calendar name (in the CRM): Test Drive Appointment
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the dealership has them: use the graphite palette above

Logo available? (yes/no): no - create a simple clean wordmark`,

  "Dance Studio": `Build a complete multi-page website for the dance studio described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[STUDIO NAME]", "[4.9 stars - 150+ reviews]", "[$XX/month]", "[DIRECTOR NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: joyful, warm, full of motion, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a studio where your kid will be known by name by week two - and where adults are never the awkward one in the back.

BRAND
Colors: deep plum (#5B2A4E) primary, warm cream (#FBF7F2) backgrounds, soft blush (#EDD5D0) accents, deep charcoal (#26222A) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: an expressive serif or graceful display face for headlines, a clean friendly sans for body. Imagery: real students mid-movement in the actual studio, candid recital moments, small wins and big grins. No stock silhouettes leaping at sunset, no ballet-shoes-on-white-background clichés, no intimidating competition trophy walls as heroes. Copy tone: warm, encouraging, zero dance-world jargon, short sentences, written for a parent choosing their child's first studio and for an adult nervous about being a beginner.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of real students dancing, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Trial Class" and one secondary link "Take the 60-Second Class Match Quiz". Under the hero, a trust bar with animated count-up numbers: rating and review count, years teaching in the city, students taught, styles offered. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (Kids 3-6, Kids 7-12 & Teens, Adult Classes, Performance & Competition Teams), one plain-English sentence each. Then a visually distinct gradient plum band: "Not sure which class is the right fit?" with a button to the Class Match Quiz. Then a proof section: a "Studio Life" gallery of 3-6 photos from real classes and recitals with one-line captions, using only photos from BUSINESS DETAILS. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip: monthly tuition starting point and the free trial line from BUSINESS DETAILS. Then a meet-the-director teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded trial-class calendar next to address, hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation. For each program group (Kids 3-6, Kids 7-12 & Teens, Adult Classes, Performance & Competition Teams): a question-form heading like "What age can my child start dance?", then a direct 2-3 sentence answer FIRST, then details (styles, class length, what to wear, what a first class looks like), then the honest tuition from BUSINESS DETAILS, then a 3-question FAQ, then a "Book a Free Trial" button.

PAGE 3 - CLASS MATCH QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Class Match Quiz". One question per step, large tappable answer cards with simple icons, selected state in plum, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Who's the dancer? (My child, age 3-6 / My child, age 7-12 / My teen / Me - adult beginner / Me - returning to dance)
2. How much dance experience do they have? (Brand new / A few classes before / A year or more / Danced for years)
3. Which style calls to them most? (Ballet / Hip hop / Jazz and contemporary / Tap / Not sure - want to explore)
4. What's the main goal? (Fun and confidence / Real technique and training / Performing on stage / Fitness and community)
5. Anything we should know about your dancer? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized class plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored class recommendation based on their answer to question 1 (write one result template for each of the 5 paths), each ending with the trial-class calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - TUITION (the lead magnet)
Headline: "Clear tuition, no surprise fees - see your monthly cost in 30 seconds." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a program (kids 3-6 / kids 7-12 and teens / adult classes / competition team / not sure), step 2 classes per week (one / two / unlimited), step 3 timing, then a capture step (name and email), then show the honest monthly tuition for their selection from BUSINESS DETAILS with a note that the first trial class is free, and a "Book a Free Trial Class" button. After the tuition, add one reassuring line: "Most families are surprised it costs about what they'd spend on any other activity - and the first class is free, so you risk nothing." Below the tool: what tuition includes, the registration and costume fee lines from BUSINESS DETAILS stated plainly, sibling or multi-class discounts if listed, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The director's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), instructor photos with names, styles, and roles, an "Our promises" section with 3 items (every child gets seen, not just the stars / we tell you about all fees upfront / adults are never made to feel like beginners forever - adjust to the studio's real promises), photos of the studio spaces, and only the training and credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded trial-class calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, parking and drop-off note, and a short message form for schedule questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a plum "Free Trial" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Free Trial" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any dance studio's website into something specific to this studio using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Studio name: Brightsteps Dance Studio
Styles taught: ballet, hip hop, jazz, contemporary, tap
City and neighborhood: Oakdale neighborhood, Cedar Falls
Exact business name, address, phone for the footer: Brightsteps Dance Studio, 96 Willow Lane, Cedar Falls, (555) 917-6604
Hours: Mon-Fri 3pm-9pm, Sat 9am-2pm, closed Sunday
Parking and drop-off note: Free lot behind the studio with a covered drop-off door

Director name: Elena Vasquez
3 facts for the About story: danced professionally for 8 years with a touring contemporary company, teaching for 15 years, opened Brightsteps because her own first studio made shy kids feel invisible
Instructors (names, styles, roles): Marcus (hip hop), Claire (ballet, junior company director), Dana (jazz and contemporary), Sofia (front desk and parent liaison)
Real training and credentials: [CERTIFICATIONS AND AFFILIATIONS]

Rating and review count (real numbers): 4.9 stars, 168 reviews
Years teaching in the city: 10 years
Students taught (approximate is fine): 2,000+ students
Styles offered: 5 styles
3 real differentiators: capped class sizes of 12, a free trial class for every new student, no-audition performance opportunities for every level
3 real reviews to quote (first names only): "My daughter went from hiding behind me to performing on stage in one year." - Amanda / "As a 34-year-old beginner I expected to feel silly. I never did, not once." - Chris / "They emailed the full year's fees before we enrolled. No surprises, ever." - Whitney

Tuition and fees (these get published):
- Free trial class: $0
- Kids 3-6: $68/month (one class per week)
- Kids 7-12 and teens: $78/month (one class per week)
- Second weekly class: add $40/month
- Adult drop-in: $18 per class
- Adult 10-class pack: $150
- Competition team: $145/month plus costume fees announced each September
- Annual registration: $35 per family

Booking calendar name (in the CRM): Free Trial Class
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the studio has them: use the plum palette above

Logo available? (yes/no): no - create a simple clean wordmark`,

  "Assisted Living": `Build a complete multi-page website for the assisted living community described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[COMMUNITY NAME]", "[4.8 stars - 90+ reviews]", "[$X,XXX/month]", "[DIRECTOR NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This site speaks to adult children making one of the hardest, most loving decisions of their lives - and to the parents who will live here. Every word must be warm, dignified, and honest. No fear-based selling, no urgency tactics, no guilt. This must feel like a premium, custom-designed site, not a template: calm, light-filled, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a warm, capable place where Mom will be known by name - and where your family can finally exhale.

BRAND
Colors: soft sage green (#6B8F71) primary, warm cream (#FBF8F1) backgrounds, gentle terracotta (#D9A38A) accents, warm deep gray (#3A3733) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a warm humanist serif for headlines, a highly readable sans for body, generous font sizes throughout. Imagery: real residents laughing at real activities, gardens, shared meals, staff kneeling to eye level. No stock photos of lonely seniors staring out windows, no clinical hallway shots, no staged hand-holding close-ups. Copy tone: warm, plain, respectful, unhurried, written for a daughter or son who feels guilt, love, and worry all at once - reassure, never pressure.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of real community life in natural light, a warm outcome-focused headline about life here, not "facilities" (write me 3 options to choose from), one primary button "Schedule a Tour" and one secondary link "Take the 60-Second Care Options Quiz". Under the hero, a trust bar with animated count-up numbers: rating and review count, years serving families, families served, staff-to-resident ratio from BUSINESS DETAILS. Then a "What makes life here different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a care options preview: 4 cards linking to the Care Options page (Independent Living, Assisted Living, Memory Care, Short-Term & Respite Stays), one plain-English sentence each. Then a visually distinct gradient sage band: "Not sure which level of care fits your family?" with a button to the Care Options Quiz. Then a proof section: a "Life at [COMMUNITY NAME]" gallery of 3-6 photos of real activities, dining, and gardens with one-line captions, using only photos from BUSINESS DETAILS. Then a testimonial carousel with the 3 real family reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a meet-the-director teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded tour calendar next to address, hours, phone, and an embedded map.

PAGE 2 - CARE OPTIONS
One page, four anchored sections with sticky in-page navigation. For each option (Independent Living, Assisted Living, Memory Care, Short-Term & Respite Stays): a question-form heading a family member would actually ask, like "How do I know if Mom needs assisted living?", then a direct, gentle 2-3 sentence answer FIRST, then details (daily life, care included, apartment options), then the honest starting monthly rate from BUSINESS DETAILS, then a 3-question FAQ, then a "Schedule a Tour" button.

PAGE 3 - CARE OPTIONS QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Care Options Quiz", framed as a helpful guide, never a sales tool. One question per step, large tappable answer cards with simple icons, selected state in sage, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Who are you exploring options for? (My mom / My dad / Both of my parents / My spouse or partner / Myself)
2. How much day-to-day support is needed right now? (Mostly independent / Help with a few daily tasks / Regular daily support / Memory-related support)
3. What's the current living situation? (At home alone / At home with family / In another community / In a hospital or rehab stay)
4. What matters most to your family in a community? (Safety and quality of care / Social life and activities / Comfort and dining / Staying close to family)
5. What matters most to your family right now? Tell us in your own words. (open text)
6. What's your family's timeline? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized care options guide?" collecting name, email, phone. Then a results step: a warm, reassuring 3-4 sentence response based on their answer to question 1 (write one result template for each of the 5 paths - each should acknowledge how hard this decision is, gently point to the likely fit, and invite a no-pressure tour), each ending with the tour calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - UNDERSTANDING THE COST OF CARE (the lead magnet)
Headline: "Understanding the cost of care - honest numbers, explained with kindness." This page must feel like guidance, not a quote engine. An interactive multi-step guide: step 1 choose a care type (independent living / assisted living / memory care / short-term stay / not sure), step 2 level of daily support (a little / moderate / significant), step 3 timeline, then a capture step (name and email), then show the honest starting monthly range for their selection from BUSINESS DETAILS with a gentle note that a care assessment confirms the exact number, and a "Schedule a Tour" button. After the range, add one reassuring line: "Most families tell us the all-inclusive number was less than the patchwork of home care, meals, and worry they were already paying for - and we'll walk through every line together, unhurried." Below the tool: what the monthly rate includes, the community fee and assessment lines from BUSINESS DETAILS stated plainly, a short plain-English note on payment options listed in BUSINESS DETAILS, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The executive director's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), key team members with photos, names, and roles, an "Our promises to your family" section with 3 items (you'll always reach a real person / we tell you the full cost before you decide / we learn every resident's story, not just their chart - adjust to the community's real promises), photos of the community, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / SCHEDULE A TOUR
The embedded tour calendar as the hero of the page, plus click-to-call phone, address with embedded map, visiting hours, parking note, and a short message form for questions - with a gentle line: "No question is too small. Many families start with a simple phone call."

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a sage "Schedule a Tour" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Tour" button bottom-right on mobile that never covers content. Footer on every page: community name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed, and font sizes generous for older visitors. Accessibility: strong contrast, alt text, visible focus states, large touch targets. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any senior living website into something specific to this community using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Community name: Willow Grove Senior Living
Care levels offered: independent living, assisted living, memory care, respite stays
City and neighborhood: Garden district, Fairview
Exact business name, address, phone for the footer: Willow Grove Senior Living, 45 Willow Grove Lane, Fairview, (555) 274-9931
Hours: tours daily 9am-5pm, phone answered 24/7
Parking note: Free visitor parking at the main entrance

Executive director name: Margaret Chen
3 facts for the About story: 22 years in senior care, started as a weekend activities aide, chose this work after helping her own grandmother move communities twice
Key team members (names and roles): Robert (director of nursing, 12 years), Alma (memory care coordinator), Dee (dining director)
Real licenses and certifications: state licensed assisted living residence, memory care certified staff

Rating and review count (real numbers): 4.8 stars, 94 reviews
Years serving families: 18 years
Families served (approximate is fine): 1,100+ families
Staff-to-resident ratio: 1 caregiver to 6 residents on day shift
3 real differentiators: caregivers assigned to the same residents every day, chef-led dining with resident recipe nights, family updates by phone or app as often as you want them
3 real family reviews to quote (first names only): "Mom knows every caregiver's name, and they know her stories. That's everything." - Susan / "They told us the full monthly cost in the first conversation. No games." - David / "Dad said the food is better than the cruise we took him on." - Karen

Payment options line: private pay, long-term care insurance accepted, veterans benefits guidance available
Monthly rates (starting points, these get published):
- Independent living: from $2,800/month
- Assisted living: from $3,900/month
- Memory care: from $5,400/month
- Short-term respite stay: from $145/day
- One-time community fee: $1,500
- Care assessment: free

Booking calendar name (in the CRM): Community Tour
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the community has them: use the sage palette above

Logo available? (yes/no): no - create a simple clean wordmark`,

  "Charter School": `Build a complete multi-page website for the charter school described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders (for example "[SCHOOL NAME]", "[4.8 stars - 120+ reviews]", "[GRADES SERVED]", "[PRINCIPAL NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or academic statistic to fill a gap.

This site speaks to parents deciding where their child will spend their days - a decision made with equal parts hope and worry. This must feel like a premium, custom-designed site, not a template: bright, warm, credible, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a school where teachers know your child's name by day one - and where you'll wish you could enroll yourself.

BRAND
Colors: deep scholarly navy (#1E3A6E) primary, warm bright white (#FCFBF7) backgrounds, warm gold (#D9B24A) accents, deep ink (#20242C) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a warm classic serif for headlines, a clean friendly sans for body. Imagery: real students mid-discovery in real classrooms, hallway high-fives, science messes, library corners. No stock rows of hands raised in unison, no generic graduation-cap clip art, no empty pristine classrooms. Copy tone: warm, clear, confident, zero education jargon, short sentences, written for a parent who wants smaller classes and a school that actually calls them back.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of real students learning, an outcome-focused headline about the child, not the institution (write me 3 options to choose from), one primary button "Schedule a Campus Tour" and one secondary link "Take the 60-Second School Fit Quiz". Under the hero, a trust bar with animated count-up numbers: rating and review count, years serving the city, students enrolled, average class size from BUSINESS DETAILS. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (Elementary Program, Middle School Program, Arts & Enrichment, Student Support Services), one plain-English sentence each. Then a visually distinct gradient navy band: "Wondering if we're the right fit for your child?" with a button to the School Fit Quiz. Then a proof section: a "Student Life" gallery of 3-6 photos of real classroom and campus moments with one-line captions, plus an outcomes strip using only the academic results listed in BUSINESS DETAILS. Then a testimonial carousel with the 3 real parent reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then an enrollment strip: "Tuition-free public charter school - now enrolling [GRADES SERVED]" using the tuition line from BUSINESS DETAILS. Then a meet-the-principal teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded tour calendar next to address, office hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation. For each section (Elementary Program, Middle School Program, Arts & Enrichment, Student Support Services): a question-form heading a parent would actually ask, like "What does a day in second grade look like here?", then a direct 2-3 sentence answer FIRST, then details (curriculum approach, class sizes, a sample day), then any program costs from BUSINESS DETAILS stated honestly (or "included - tuition-free"), then a 3-question FAQ, then a "Schedule a Tour" button.

PAGE 3 - SCHOOL FIT QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second School Fit Quiz". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What grade will your child enter? (Kindergarten / Grades 1-2 / Grades 3-5 / Grades 6-8 / I have children in multiple grades)
2. What matters most to you in a school? (Smaller classes and more attention / Strong academics / Arts and enrichment / A safe, kind community)
3. Where is your child in school now? (Public school / Private school / Homeschool / Starting school for the first time)
4. How is school going for your child right now? (Great - we want even better / Fine, but not thriving / They're struggling / Not in school yet)
5. What do you want most for your child's school experience? (open text)
6. When would your child start? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized enrollment guide?" collecting name, email, phone. Then a results step: a warm 3-4 sentence response based on their answer to question 1 (write one result template for each of the 5 paths - each should speak to that grade band and invite the family to a tour), each ending with the tour calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - TUITION & ENROLLMENT (the lead magnet)
Headline: "Tuition-free. Here's exactly how enrollment works." (If BUSINESS DETAILS lists tuition or fees instead, use "Honest answers about tuition - before you apply" and publish the real numbers.) An interactive enrollment-guide tool built as a short multi-step form: step 1 choose your child's grade (kindergarten / grades 1-2 / grades 3-5 / grades 6-8 / multiple children), step 2 desired start (this school year / next school year / not sure), step 3 timing, then a capture step (name and email), then show a personalized plain-English enrollment path for their selection: the steps and dates from BUSINESS DETAILS (application window, lottery if applicable, enrollment paperwork), any real costs from BUSINESS DETAILS stated plainly (uniforms, activity fees, before/after care), and a "Schedule a Campus Tour" button. After the steps, add one reassuring line: "Enrollment is simpler than most families expect - one application, and our office walks you through every step from there." Below the tool: what tuition-free actually means in plain English, the modest fees from BUSINESS DETAILS listed honestly, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The principal's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), leadership and teacher highlights with names and roles, an "Our promises to families" section with 3 items (you'll hear from us before problems become big / every child is known by name / we publish our results, good and bad - adjust to the school's real promises), photos of campus, and only the accreditations and authorizations listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / SCHEDULE A TOUR
The embedded tour calendar as the hero of the page, plus click-to-call phone, address with embedded map, office hours, parking and visitor check-in note, and a short message form for enrollment questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a gold "Schedule a Tour" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Tour" button bottom-right on mobile that never covers content. Footer on every page: school name, address, and phone written EXACTLY as in BUSINESS DETAILS, office hours, quick links, reviews link, privacy policy, and the nondiscrimination line from BUSINESS DETAILS. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any school's website into something specific to this school using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

School name: Horizon Charter Academy
Grades served: K-8
City and neighborhood: Westside, Maplewood
Exact school name, address, phone for the footer: Horizon Charter Academy, 730 Founders Boulevard, Maplewood, (555) 538-1160
Office hours: Mon-Fri 7:30am-4pm during the school year
Parking and visitor note: Visitor parking at the front office entrance, check in at the front desk
Nondiscrimination line: [SCHOOL'S REQUIRED NONDISCRIMINATION STATEMENT]

Principal name: Dr. Angela Foster
3 facts for the About story: 19 years in education, taught 4th grade for 8 of them, helped found Horizon after watching great students get lost in classes of 32
Leadership and teacher highlights (names and roles): Mr. Delgado (assistant principal), Ms. Park (kindergarten lead, 11 years), Coach Bryant (PE and student mentoring)
Real accreditations and authorizations: authorized by the [STATE CHARTER AUTHORIZER], fully accredited by [ACCREDITING BODY]

Rating and review count (real numbers): 4.8 stars, 126 reviews
Years serving the city: 9 years
Students enrolled: 410 students
Average class size: 18 students
Academic results that may be published (real only): [TEST RESULTS OR GROWTH METRICS - e.g. reading growth percentile, state rating]
3 real differentiators: average class size of 18, every family gets a teacher call in the first two weeks, daily arts or music for every grade
3 real parent reviews to quote (first names only): "Her teacher called me in week one just to introduce herself. Nine years of public school and that never happened once." - Monica / "My son went from hating reading to reading at the dinner table." - James / "The principal knows every kid's name. I've watched her do it at drop-off." - Alicia

Tuition line: tuition-free public charter school, open to all students
Enrollment steps and dates: application opens [DATE], lottery held [DATE] if applications exceed seats, enrollment paperwork due [DATE]
Costs (real fees only, these get published):
- Tuition: $0 - tuition-free
- Application fee: $0
- Uniforms: approximately $120 per year
- Activity fee: $75 per year
- Before/after care: $6 per hour
- School lunch: $4.25 per day (free/reduced program available)

Booking calendar name (in the CRM): Campus Tour
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the school has them: use the navy and gold palette above

Logo available? (yes/no): no - create a simple clean wordmark`,
};
