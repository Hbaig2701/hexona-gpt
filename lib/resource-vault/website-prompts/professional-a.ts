// Website prompts — Professional Services A (generated from the dental master template)
export const PROFESSIONAL_A_PROMPTS: Record<string, string> = {
  "Professional Organizer": `Build a complete multi-page website for the home and office organizing service described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[BUSINESS NAME]", "[4.9 stars - 150+ reviews]", "[$XX-$XX per hour]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: calm, orderly, warm, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a calm, capable professional who can finally get your space under control, with zero judgment.

BRAND
Colors: muted sage (#7C9070) primary, warm cream (#FAF7F0) backgrounds, soft terracotta (#D9A18C) accents, deep charcoal (#2B2B28) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: a warm modern serif for headlines, a clean airy sans for body. Imagery: real organized spaces in natural daylight, hands sorting and labeling, homes that look lived in. No sterile all-white pantry stock photos, no impossible rainbow-order shelves, no staged minimalism. Copy tone: warm, gentle, completely judgment-free, short sentences, written for someone embarrassed by their clutter who has been putting this off for years.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a calm organized space, an outcome-focused headline (write me 3 options), primary button "Book a Free Discovery Call" and secondary link "Take the 60-Second Clutter Quiz". Trust bar with count-up numbers: Google rating and review count, years serving the city, spaces organized, "Judgment-free, always". "How we're different": 3 cards from the BUSINESS DETAILS differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Home Organization, Home Office & Paperwork, Moving Packing & Unpacking, Decluttering & Downsizing), one plain-English sentence each. A gradient sage band: "Not sure where to even start?" with a quiz button. A "Real Results" gallery: 3 before-and-after comparisons, each an image with a draggable vertical divider revealing before on one side and after on the other (mouse and touch; fall back to a tap-to-toggle crossfade if unsupported), a small "slide to compare" hint, and a one-line caption (space and session length, e.g. "Garage reset - 2 sessions"). Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A pricing strip: hourly rate and package pricing in plain English. Meet-the-owner teaser linking to About. Booking section: embedded booking calendar beside address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Home Organization, Home Office & Paperwork, Moving Packing & Unpacking, Decluttering & Downsizing): a question-form heading like "What actually happens during an organizing session?", a direct 2-3 sentence answer FIRST, then details, the honest price range from BUSINESS DETAILS, a 3-question FAQ, and a booking button. Include one before-and-after slider in Home Organization and one in Decluttering & Downsizing (same component as the home page).

PAGE 3 - CLUTTER QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Clutter Quiz". One question per step, large tappable answer cards with simple icons, selected state in sage, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Which space stresses you out the most? (Closets & bedrooms / Kitchen & pantry / Garage, basement or storage / Home office & paperwork / Honestly, the whole house)
2. How long has it been like this? (Just got out of hand / A few months / A few years / As long as I can remember)
3. What has stopped you from tackling it? (No time / No idea where to start / It feels overwhelming / I've tried and it came right back)
4. Who uses the space? (Just me / Me and a partner / A family with kids / A shared or multi-generational home)
5. If one space could be perfectly organized by next week, which would change your daily life most? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized organizing plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & PACKAGES (the lead magnet)
Headline: "Honest answers about cost - before anyone sets foot in your home." An instant-estimate tool as a short multi-step form: step 1 choose a space (single closet or small space / one full room / several rooms / whole home / an office), step 2 how full it feels (lightly cluttered / pretty full / packed floor to ceiling), step 3 timing, then a capture step (name and email), then the honest price range for their selection from BUSINESS DETAILS with a note that exact quotes come after a quick free walkthrough, and a "Book a Free Discovery Call" button. Add one reassuring line: "Most clients are surprised how affordable it is compared to living with the stress - and you approve the exact plan before we touch a thing." Below: how hourly and package billing works, what every session includes (supplies planning, donation drop-off, zero judgment), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we never judge, ever / you decide what stays / we handle the donation runs - adjust to the real promises), photos of finished spaces, and only the credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, service-area note with embedded map, hours, a line for movers on a deadline: "Moving date coming up fast? Ask about priority packing and unpacking slots." and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and a sage "Book Now" button always visible; clean mobile hamburger that keeps the Book button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any organizer's website into something specific to this business; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Clear Path Organizing
Type of business: home and office organizing service
City and neighborhood: Fairview, Willow Park area
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Clear Path Organizing, 118 Alder Lane Suite B, Fairview, (555) 268-4410
Hours: Mon-Fri 9am-5pm, Sat by appointment, closed Sunday
Service-area note: Serving Fairview and towns within 30 minutes

Owner name: Emily Tran
3 facts for the About story: former elementary school teacher of 8 years, started organizing after helping her mother downsize a 30-year family home, has lived in Fairview since college
Team members (names and roles): Sofia (lead organizer), Beth (organizer and donation coordinator)
Credentials and memberships: NAPO member, insured

Google rating and review count: 4.9 stars, 143 reviews
Years serving the city: 6 years
Spaces organized: 900+ spaces
3 real differentiators: zero-judgment guarantee, we haul donations away for you, systems built for how your family actually lives
3 real customer reviews (first names only): "Six years of closet chaos gone in one afternoon, and Emily never once made me feel bad." - Megan / "They unpacked our entire house in two days. We never lived out of boxes." - Carlos / "My home office finally works. I found paperwork I'd been missing for a year." - Dana

Payment note: packages can be split into two payments; gift certificates available

Price ranges (these get published):
- Hourly rate (per organizer): $75-$95/hour
- Single closet or small space: $350-$550
- One full room: $600-$1,200
- Kitchen and pantry: $800-$1,500
- Whole-home package: $2,800-$6,000
- Moving pack/unpack (per day, two organizers): $1,200-$1,800

Booking calendar name (in the CRM): Free Discovery Call
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the sage palette above): use the sage palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Public Adjuster": `Build a complete multi-page website for the public insurance adjusting firm described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[FIRM NAME]", "[4.9 stars - 120+ reviews]", "[X% of settlement]", "[LICENSE #]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or settlement result to fill a gap.

This must feel like a premium, custom-designed site, not a template: steady, authoritative, reassuring, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a seasoned advocate who is finally on your side of the table.

BRAND
Colors: deep navy (#152A45) primary, warm off-white (#F8F7F3) backgrounds, brass gold (#B9975B) accents, charcoal (#22262B) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: an authoritative serif for headlines, a clean legible sans for body. Imagery: real homes and storefronts being documented, an adjuster on site with a tablet, honest photos of repaired properties. No gavel-and-scales clichés, no dramatic burning-house stock, no suited handshake photos. Copy tone: calm, plain English, zero insurance jargon, short sentences, written for someone stressed after property damage who suspects the insurance company's number is too low.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a restored home, an outcome-focused headline (write me 3 options), primary button "Get a Free Claim Review" and secondary link "Take the 60-Second Claim Check". Trust bar with count-up numbers: Google rating and review count, years licensed, claims handled, total recovered for clients (from BUSINESS DETAILS only). "How we're different": 3 cards from the differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Storm & Wind Damage, Water & Flood Damage, Fire & Smoke Damage, Denied & Underpaid Claims), one plain-English sentence each. A gradient navy band: "Not sure if your settlement offer is fair?" with a quiz button. A "Case Results" strip: 3 anonymized case cards showing damage type, the insurer's first offer, and the final settlement - using ONLY the case results in BUSINESS DETAILS, otherwise bracketed placeholders. Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A fee strip: "No upfront cost - we are paid a percentage of your settlement, only when you get paid." Meet-the-owner teaser linking to About. Booking section: embedded booking calendar beside address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Storm & Wind Damage, Water & Flood Damage, Fire & Smoke Damage, Denied & Underpaid Claims): a question-form heading like "What does a public adjuster do after storm damage?", a direct 2-3 sentence answer FIRST, then details, the honest fee structure from BUSINESS DETAILS, a 3-question FAQ, and a booking button.

PAGE 3 - CLAIM CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Claim Check". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What are you dealing with? (Storm or wind damage / Water or flood damage / Fire or smoke damage / A denied or lowballed claim / Not sure what my policy covers)
2. Where is the claim right now? (Haven't filed yet / Filed, waiting on the insurer / Got an offer that feels low / Claim was denied)
3. How big does the damage feel? (One room or area / Several rooms / Major structural / Total loss)
4. What kind of property? (My home / A rental I own / My business / Condo or HOA)
5. What worries you most about this claim? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized claim review?" collecting name, email, phone. Then a results step: a calm 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - OUR FEE (the lead magnet)
Headline: "Honest answers about our fee - and what you actually keep." An instant multi-step tool: step 1 choose the damage type (storm / water / fire / denied claim / not sure), step 2 claim status (not filed / filed / offer received / denied), step 3 timing, then a capture step (name and email), then show the fee structure from BUSINESS DETAILS in plain English - the exact percentage, when it is paid, and a worked plain-words explanation with bracketed example numbers only, plus a "Book a Free Claim Review" button. Add one reassuring line: "You pay nothing upfront and nothing at all unless your settlement comes through - our fee only exists if your payout does." Below: what our service includes (full damage documentation, independent estimate, negotiation with the insurer), why policyholders hire us, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we tell you honestly if your offer is already fair / we handle every call with the insurer / you approve every step - adjust to the real promises), photos, and only the licenses and memberships listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, address with embedded map, hours, service-area note, an urgent line: "Storm just hit? Don't sign the insurer's first offer - call us first. We answer nights and weekends after major storms." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and a navy "Free Claim Review" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, license number, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any adjuster's website into something specific to this firm; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: TrueNorth Public Adjusters
Type of business: licensed public insurance adjusting firm (residential and commercial)
City and neighborhood: Gulfport area, Bayview
Exact business name, address, phone for the footer (must match Google Business Profile exactly): TrueNorth Public Adjusters, 940 Harbor Street Suite 210, Bayview, (555) 402-7738
Hours: Mon-Fri 8am-6pm, on-call after major storms
Service-area note: Serving Bayview and the entire coastal county

Owner name: Frank DeLuca
3 facts for the About story: spent 11 years as a staff adjuster for a major insurance carrier before switching sides, licensed public adjuster for 14 years, started the firm after watching a neighbor's hurricane claim get underpaid by half
Team members (names and roles): Rosa (claims manager, 8 years), Ty (field adjuster), Nina (client coordinator)
Credentials and licenses: state-licensed public adjuster, license #PA-20841, member of NAPIA

Google rating and review count: 4.9 stars, 117 reviews
Years in business: 14 years
Claims handled: 1,300+ claims
Total recovered for clients: $46 million+
3 real differentiators: we worked inside the insurance industry so we know their playbook, you never pay unless you get paid, one adjuster owns your claim start to finish
3 real client reviews (first names only): "The insurer offered $19,000. Frank's team settled it at $67,500. Same roof, same policy." - Alan / "They handled every call so I could just rebuild." - Sandra / "Our denied water claim got reopened and paid. I'd given up." - Miguel
3 anonymized case results for the results strip: hail roof claim, first offer $19,000, settled $67,500 / kitchen fire, first offer $42,000, settled $96,000 / denied pipe-burst claim, reopened and settled $38,400

Fee structure (this gets published):
- Fee: 10% of the total settlement, paid only when you are paid
- Free claim and policy review: $0
- No upfront costs, no hourly billing, no hidden charges
- Denied-claim reopening: same 10%, still nothing unless we recover
- Emergency documentation visit after a storm: included
- If we can't improve your settlement, you owe nothing

Booking calendar name (in the CRM): Free Claim Review
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the navy palette above): use the navy palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Real Estate": `Build a complete multi-page website for the residential real estate agent or team described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[TEAM NAME]", "[4.9 stars - 200+ reviews]", "[X homes sold]", "[AGENT NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or sold price to fill a gap.

This must feel like a premium, custom-designed site, not a template: polished, candid, local, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a sharp, honest local expert who treats your move like it is their own.

BRAND
Colors: deep forest green (#1E3A2F) primary, warm ivory (#FAF8F2) backgrounds, soft gold (#C9A96A) accents, ink (#20242A) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: an elegant editorial serif for headlines, a clean geometric sans for body. Imagery: real neighborhood streets, natural-light interiors, people on porches and at closing tables. No handshake-over-contract stock, no generic city skylines from another city, no sold-sign clip art. Copy tone: candid, warm, plain English, short sentences, written for someone making the biggest financial decision of their life who fears being just another transaction.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a local street or home at golden hour, an outcome-focused headline (write me 3 options), primary button "Book a Free Strategy Call" and secondary link "Take the 60-Second Next Move Quiz". Trust bar with count-up numbers: Google rating and review count, homes sold, average days on market, sale-to-list percentage (from BUSINESS DETAILS only). "How we're different": 3 cards from the differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Buying a Home, Selling Your Home, Buying & Selling at Once, Relocation & Investment), one plain-English sentence each. A gradient green band: "Not sure what your next move is?" with a quiz button. A "Track Record" numbers wall plus a recently-sold strip: 3 sold-property cards using only the sales listed in BUSINESS DETAILS or bracketed placeholders (photo, neighborhood, days on market). Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A fees strip: plain-English line about commission and what it includes. Meet-the-agent teaser linking to About. Booking section: embedded booking calendar beside office address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Buying a Home, Selling Your Home, Buying & Selling at Once, Relocation & Investment): a question-form heading like "What does it actually cost to sell my home?", a direct 2-3 sentence answer FIRST, then details, the honest fee structure from BUSINESS DETAILS, a 3-question FAQ, and a booking button.

PAGE 3 - NEXT MOVE QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Next Move Quiz". One question per step, large tappable answer cards with simple icons, selected state in green, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What's your next move? (Buying my first home / Buying my next home / Selling my home / Selling and buying at the same time / Just watching the market)
2. When do you picture yourself moved? (Within 3 months / 3-6 months / 6-12 months / No date yet)
3. What matters most to you? (Getting top dollar / Finding the right home / A smooth low-stress process / Expert guidance - this is new to me)
4. What's your current situation? (I own my home / I'm renting / I own and have equity to use / Other)
5. Describe what a perfect outcome for this move looks like. (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized next-move plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - FEES & YOUR NET (the lead magnet)
Headline: "Honest answers about what it costs to buy or sell - before you sign anything." An instant multi-step tool: step 1 choose your path (selling / buying / both / not sure), step 2 rough price range of the home (use bracketed local price bands from BUSINESS DETAILS or placeholders), step 3 timing, then a capture step (name and email), then show the honest fee structure from BUSINESS DETAILS - commission, what it includes, and typical seller or buyer costs in plain English - with a "Book a Free Strategy Call" button. Add one reassuring line: "You'll see every number on paper before you commit to anything - no surprises at the closing table." Below: what's included at every price (photography, staging consult, negotiation), how buyer representation is paid, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The agent's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we tell you the honest number, not the flattering one / we answer our phones / no pressure, ever - adjust to the real promises), photos, and only the licenses and designations listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, office address with embedded map, hours, service-area note, and a short message form for questions. No fake urgency - just an easy way to start the conversation.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and a green "Book a Call" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, brokerage and license line, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any agent's website into something specific to this team; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Harborlight Realty Group
Type of business: residential real estate team (buyers and sellers)
City and neighborhood: Lakeside, Old Mill district
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Harborlight Realty Group, 27 Commerce Row Suite 4, Lakeside, (555) 316-9021
Hours: Mon-Sat 9am-6pm, Sun by appointment
Service-area note: Serving Lakeside and every town around the lake

Lead agent name: Dana Whitfield
3 facts for the About story: 15 years selling homes in Lakeside, raised two kids three blocks from the office, became an agent after a bad experience selling her own first condo
Team members (names and roles): Priya (buyer's agent), Cole (listing coordinator), Mae (transaction manager)
Credentials and licenses: licensed broker, license #RB-44172, Accredited Buyer's Representative (ABR)

Google rating and review count: 4.9 stars, 214 reviews
Homes sold: 340+ homes
Average days on market: 11 days (area average 26)
Sale-to-list percentage: 101%
3 real differentiators: we publish our track record numbers, weekly written updates so you never chase us, honest pricing advice even when it's not what you hoped
3 real client reviews (first names only): "Dana told us our house was overpriced by 30K. We listened, got three offers in a week." - Steve / "First-time buyers, a thousand questions, zero impatience from this team." - Aisha / "Sold and bought in the same month without losing our minds." - The Nguyens
3 recent sales for the sold strip: Old Mill craftsman, 8 days on market / Lakefront cottage, 6 days / Brick ranch on Cherry Street, 14 days

Fee structure (this gets published):
- Listing commission: 2.5% (full service, no upfront cost)
- Professional photography, floor plan, and staging consult: included
- Buyer representation: typically 2%-2.5%, discussed and signed in writing first
- Free home valuation: $0
- Cancel anytime before an accepted offer: no fee
- Typical seller closing costs beside commission: explained line by line at the strategy call

Booking calendar name (in the CRM): Free Strategy Call
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the green palette above): use the green palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Solar Installation": `Build a complete multi-page website for the residential solar installation company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[COMPANY NAME]", "[4.8 stars - 250+ reviews]", "[X kW system: $XX,XXX-$XX,XXX]", "[FEDERAL TAX CREDIT]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or incentive amount to fill a gap - incentives change, so anything not listed in BUSINESS DETAILS stays a bracketed placeholder.

This must feel like a premium, custom-designed site, not a template: clean, grounded, trustworthy, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a straight-shooting local installer who will tell you honestly if solar isn't right for your roof.

BRAND
Colors: deep evergreen (#1B4332) primary, warm white (#FBFAF6) backgrounds, sun amber (#E8A33D) accents, charcoal (#24282C) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: a confident modern sans for headlines, a clean humanist sans for body. Imagery: real installed roofs in daylight, real crews on real jobs, monitoring-app screenshots. No globe-in-cupped-hands eco stock, no utility-scale panel fields, no sunset lens flares. Copy tone: plain, numbers-first, zero hype, short sentences, written for a homeowner burned out on pushy solar sales calls and fake "government program" ads.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a finished local install, an outcome-focused headline (write me 3 options), primary button "Get My Free Solar Assessment" and secondary link "Take the 60-Second Solar Fit Quiz". Trust bar with count-up numbers: Google rating and review count, years installing, systems installed, total kilowatts installed (from BUSINESS DETAILS only). "How we're different": 3 cards from the differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Home Solar Panels, Battery Storage & Backup, EV Charger Installation, Service Monitoring & Repairs), one plain-English sentence each. A gradient evergreen band: "Not sure if your roof even qualifies?" with a quiz button. A "Recent Installs" project gallery: a 6-tile grid of real installations, each with a one-line caption (system size and neighborhood) using only projects from BUSINESS DETAILS or bracketed placeholders. Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A financing and incentives strip: the financing line from BUSINESS DETAILS plus a note that current incentives are confirmed in writing at the assessment. Meet-the-owner teaser linking to About. Booking section: embedded booking calendar beside address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Home Solar Panels, Battery Storage & Backup, EV Charger Installation, Service Monitoring & Repairs): a question-form heading like "How much does home solar actually cost?", a direct 2-3 sentence answer FIRST, then details, the honest price range from BUSINESS DETAILS, a 3-question FAQ, and a booking button.

PAGE 3 - SOLAR FIT QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Solar Fit Quiz". One question per step, large tappable answer cards with simple icons, selected state in evergreen, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What's driving your interest in solar? (Lowering my electric bill / Backup power during outages / Going greener / Charging an EV / Just checking if my roof qualifies)
2. What's your average monthly electric bill? (Under $100 / $100-$200 / $200-$350 / Over $350)
3. What kind of roof do you have? (Asphalt shingle / Metal / Tile / Flat or other / Not sure)
4. How old is your roof? (0-5 years / 5-15 years / 15+ years / Not sure)
5. What would make solar a clear yes for you? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized solar plan?" collecting name, email, phone. Then a results step: a plain-spoken 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & SAVINGS (the lead magnet)
Headline: "Honest answers about solar cost - no pushy sales call required." An instant multi-step estimate tool: step 1 average monthly bill (the four bands above), step 2 sun exposure (full sun most of the day / partial shade / heavily shaded / not sure), step 3 timing, then a capture step (name and email), then show the honest system price range from BUSINESS DETAILS that fits their bill band, a note that exact numbers require a roof assessment, incentive lines shown ONLY as the bracketed placeholders "[FEDERAL TAX CREDIT]" and "[STATE OR UTILITY INCENTIVE]" unless real figures are in BUSINESS DETAILS, and a "Book My Free Assessment" button. Add one reassuring line: "If the math doesn't work for your roof, we'll tell you at the assessment - we'd rather lose a sale than install a bad system." Below: financing in plain English from the BUSINESS DETAILS line, what every install includes (permits, interconnection, monitoring, workmanship warranty), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we quote real numbers, not teaser rates / your roof's health comes before the sale / we service what we sell - adjust to the real promises), photos of crews and installs, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, address with embedded map, hours, service-area note, a line for existing customers: "System down or an error on your monitoring app? Call - service visits get priority scheduling." and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and an evergreen "Free Assessment" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, license numbers, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any solar company's website into something specific to this installer; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Ridgeline Solar
Type of business: residential solar installation company
City and neighborhood: Brookdale and the north valley
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Ridgeline Solar, 1550 Industry Drive Unit 7, Brookdale, (555) 274-6612
Hours: Mon-Fri 8am-5pm, closed weekends
Service-area note: Installing across Brookdale and the north valley, up to 60 minutes out

Owner name: Matt Okafor
3 facts for the About story: master electrician for 15 years before founding the company, installed his own first system in 2014 and still lives under it, started the company after seeing door-to-door crews oversell undersized systems
Team members (names and roles): Jess (operations manager), Devon (lead installer, NABCEP), Sam (service technician)
Credentials and licenses: state electrical contractor license #EC-8804, NABCEP-certified installer on every crew, fully insured

Google rating and review count: 4.8 stars, 262 reviews
Years installing: 11 years
Systems installed: 1,150+ systems
Total installed: 9,200+ kilowatts
3 real differentiators: no door-knockers and no commissioned closers, a licensed electrician on every roof, we service every system we sell for life
3 real customer reviews (first names only): "Two other companies quoted us bigger systems than our roof needed. Matt showed us the math on why." - Greg / "Install crew was in and out in a day and the app worked that night." - Latoya / "Three years in, one service call, fixed in 48 hours free." - Bruce
6 recent installs for the gallery: 7.2 kW, Brookdale / 9.6 kW with battery, North Valley / 5.8 kW, Cedar Heights / 11.4 kW, Brookdale / 8.0 kW with EV charger, Milton / 6.5 kW, Fairground district

Financing line: $0-down solar loans through Lumen Lending, from $115/month; cash and phased purchase also welcome
Incentives: confirmed in writing per project - leave as [FEDERAL TAX CREDIT] and [STATE OR UTILITY INCENTIVE] placeholders unless real current figures are provided

Price ranges (before incentives, these get published):
- 6 kW system: $14,500-$18,500
- 8 kW system: $18,000-$23,000
- 10+ kW system: $22,000-$28,000+
- Home battery (installed): $9,500-$14,000
- EV charger installation: $850-$1,600
- Service visit (non-warranty): $150

Booking calendar name (in the CRM): Free Solar Assessment
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the evergreen palette above): use the evergreen palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Catering": `Build a complete multi-page website for the catering company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 180+ reviews]", "[$XX-$XX per person]", "[CHEF NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or menu price to fill a gap.

This must feel like a premium, custom-designed site, not a template: warm, appetizing, effortless, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a warm, unflappable kitchen that makes hosting feel easy.

BRAND
Colors: deep burgundy (#6E2B34) primary, warm cream (#FBF8F1) backgrounds, olive (#7A8450) accents, espresso (#2B2320) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: an inviting high-contrast serif for headlines, a clean sans for body. Imagery: real plated dishes in natural light, hands passing platters, real events mid-toast and mid-laugh. No chafing-dish buffet rows, no sterile white-tablecloth stock spreads, no generic champagne-clink close-ups. Copy tone: warm, generous, plain English, short sentences, written for a stressed host juggling a hundred details who just wants the food handled beautifully.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of a real event table, an outcome-focused headline (write me 3 options), primary button "Get Your Event Quote" and secondary link "Take the 60-Second Event Planner Quiz". Trust bar with count-up numbers: Google rating and review count, years catering, events served, guests fed. "How we're different": 3 cards from the BUSINESS DETAILS differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Weddings, Corporate & Office, Private Parties & Celebrations, Drop-Off & Pickup), one plain-English sentence each. A gradient burgundy band: "Planning something and not sure where to start?" with a quiz button. A "From Our Kitchen" gallery: a 6-tile grid of signature dishes and real events with one-line captions, using only details from BUSINESS DETAILS or bracketed placeholders. Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A pricing strip: honest per-person starting ranges in plain English. Meet-the-chef teaser linking to About. Booking section: embedded booking calendar beside kitchen address, hours, phone, and an embedded map.

PAGE 2 - MENUS & SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Weddings, Corporate & Office, Private Parties & Celebrations, Drop-Off & Pickup): a question-form heading like "What does wedding catering actually cost per person?", a direct 2-3 sentence answer FIRST, then a short sample menu preview (3-4 signature dishes, clearly marked as a sample - seasonal menus change), the honest per-person range from BUSINESS DETAILS, a 3-question FAQ, and a booking button.

PAGE 3 - EVENT PLANNER QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Event Planner Quiz". One question per step, large tappable answer cards with simple icons, selected state in burgundy, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What are you planning? (A wedding / A corporate event / A private party or milestone / Drop-off catering for a gathering / Not sure yet)
2. How many guests? (Under 25 / 25-75 / 75-150 / 150+)
3. What style of service? (Plated dinner / Buffet / Family-style / Stations or passed appetizers / Not sure)
4. When is the event? (Within a month / 1-3 months / 3-6 months / 6+ months or no date yet)
5. Describe the one moment you most want your guests to remember. (open text)
6. How soon do you want your date and menu locked in? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized event menu plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest answers about catering cost - before you commit to anything." An instant multi-step quote tool: step 1 choose the event type (wedding / corporate / private party / drop-off / not sure), step 2 guest count (the four bands above), step 3 timing, then a capture step (name and email), then show the honest per-person range for their selection from BUSINESS DETAILS with a note that exact quotes come after a quick menu consult, and a "Book a Free Menu Consult" button. Add one reassuring line: "Your quote is itemized down to the last fork - most hosts are relieved there are no surprise service fees hiding at the bottom." Below: what every event includes (staffing, setup, cleanup, rentals coordination), how deposits and payment schedules work from BUSINESS DETAILS, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The chef-owner's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (your quote is itemized, no surprise fees / we taste everything before you do / we leave your venue spotless - adjust to the real promises), kitchen and event photos, and only the certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, kitchen address with embedded map, hours, delivery-radius note, tasting-appointment note, and a short message form for questions. No urgency lines - just a warm, easy way to start planning.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and a burgundy "Get a Quote" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any caterer's website into something specific to this kitchen; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Harvest & Vine Catering
Type of business: full-service and drop-off catering company
City and neighborhood: Ashford, Market Street district
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Harvest & Vine Catering, 66 Market Street, Ashford, (555) 388-1245
Hours: Mon-Fri 9am-6pm, event service seven days
Service-area note: Catering across Ashford and venues within 45 minutes

Chef-owner name: Chef Lena Morales
3 facts for the About story: ran the kitchen at a downtown Ashford restaurant for 9 years before founding the company, culinary school graduate, started catering after cooking her sister's 120-guest backyard wedding
Team members (names and roles): Tomás (sous chef), Rachel (event manager), Kim (lead server, 6 years)
Credentials and certifications: licensed commercial kitchen, ServSafe certified staff, fully insured

Google rating and review count: 4.9 stars, 176 reviews
Years catering: 8 years
Events served: 1,100+ events
Guests fed: 85,000+ guests
3 real differentiators: itemized quotes with zero hidden service fees, a real chef builds your menu (not a packet), we handle rentals and staffing so you have one contact
3 real client reviews (first names only): "Guests are still talking about the short rib a year later." - Whitney / "The quote we signed was the amount we paid. Every other caterer padded theirs." - Deval / "They turned our office launch into the best meal our team's ever had at work." - Monica
6 gallery tiles: braised short rib plate / harvest grazing table / 140-guest tent wedding / taco and elote station / rooftop corporate lunch / lemon-thyme roasted chicken

Payment note: 25% deposit locks your date, balance due 7 days before the event; tastings credited toward booked events

Per-person price ranges (these get published):
- Drop-off catering: $18-$28 per person
- Buffet service: $32-$48 per person
- Family-style dinner: $45-$62 per person
- Plated dinner: $58-$85 per person
- Appetizer and station receptions: $42-$65 per person
- Full wedding packages: $75-$120 per person
- Bar staffing add-on: $8-$14 per person

Booking calendar name (in the CRM): Free Menu Consult
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the burgundy palette above): use the burgundy palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Home Inspector (Direct Import)": `Build a complete multi-page website for the home inspection service described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[COMPANY NAME]", "[4.9 stars - 250+ reviews]", "[$XXX per inspection]", "[INSPECTOR NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: precise, calm, thorough, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a meticulous expert who works for you, not for the deal.

BRAND
Colors: deep navy (#1D3557) primary, paper white (#FAFAF7) backgrounds, warm amber (#E09F3E) accents, slate (#252A31) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: a sturdy slab serif for headlines, a highly legible sans for body. Imagery: a real inspector on a roof or in a crawlspace with a flashlight, thermal-camera shots, real annotated report pages. No clipboard-and-thumbs-up stock, no magnifying-glass-over-a-house clip art, no hard hats indoors. Copy tone: calm, precise, plain English, short sentences, written for a buyer under contract with an option period ticking down who needs certainty fast.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of an inspector at work, an outcome-focused headline (write me 3 options), primary button "Schedule My Inspection" and secondary link "Take the 60-Second Inspection Quiz", plus a third quiet link in the hero: "See a Sample Report". Trust bar with count-up numbers: Google rating and review count, years inspecting, inspections completed, "Reports within 24 hours". "How we're different": 3 cards from the BUSINESS DETAILS differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Buyer Inspections, Pre-Listing Inspections, Specialty Testing, New Construction & Warranty), one plain-English sentence each. A gradient navy band: "Not sure which inspection you need?" with a quiz button. A "What You Actually Get" sample-report showcase: 3 annotated report-page mockups with photo callouts and severity labels, plus a "Download a Sample Report" button (email capture allowed). Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A pricing strip: published flat pricing by home size. Meet-the-inspector teaser linking to About. Booking section: embedded booking calendar beside address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Buyer Inspections, Pre-Listing Inspections, Specialty Testing - radon, termite, sewer scope, New Construction & Warranty): a question-form heading like "What does a buyer's inspection actually cover?", a direct 2-3 sentence answer FIRST, then details, the honest published price from BUSINESS DETAILS, a 3-question FAQ, a "See a Sample Report" link, and a booking button.

PAGE 3 - INSPECTION QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Inspection Quiz". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Where are you in the process? (Under contract - I need an inspection fast / Making an offer soon / Selling - I want a pre-listing inspection / New build or under builder warranty / Homeowner - just want a checkup)
2. How old is the home? (Under 10 years / 10-30 years / 30-60 years / 60+ years or not sure)
3. What worries you most? (Roof / Foundation and structure / Plumbing and electrical / Radon, termites or air quality / Everything - check it all)
4. How big is the home? (Under 1,500 sq ft / 1,500-2,500 / 2,500-4,000 / Over 4,000)
5. Is there anything about this home that already concerns you? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized inspection plan?" collecting name, email, phone. Then a results step: a calm 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING (the lead magnet)
Headline: "Published inspection pricing - not hidden behind a phone call." An instant multi-step tool: step 1 choose the inspection type (buyer / pre-listing / specialty testing / new construction / not sure), step 2 home size (the four bands above), step 3 timing, then a capture step (name and email), then show the exact published price or range from BUSINESS DETAILS with recommended add-ons priced honestly, a "Schedule My Inspection" button, and a "Download a Sample Report" link. Add one reassuring line: "One flat price, every system checked, and a report you can actually read - no upsells at the front door." Below: what every inspection includes (full report with photos in 24 hours, free phone walkthrough of findings), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The inspector's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (we work for you, not the sale / every report in plain English within 24 hours / call us about your report anytime, free - adjust to the real promises), photos of inspections in progress, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, address with embedded map, hours, service-area note, an urgent line: "Option period closing fast? Call - we hold next-day slots for buyers on a deadline." and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and a navy "Schedule Now" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, license number, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any inspector's website into something specific to this company; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Keystone Home Inspections
Type of business: residential home inspection service
City and neighborhood: Redwood Falls and surrounding county
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Keystone Home Inspections, 310 Foundry Road Suite 12, Redwood Falls, (555) 429-8830
Hours: Mon-Sat 8am-6pm, closed Sunday
Service-area note: Inspecting homes across Redwood Falls and the county, within 50 minutes

Owner name: Greg Halloran
3 facts for the About story: framing contractor for 12 years before becoming an inspector, has inspected homes in Redwood Falls for 10 years, became an inspector after buying his own first house and finding $30,000 of hidden problems the seller's disclosure missed
Team members (names and roles): Dee (scheduling coordinator), Aaron (licensed inspector, 4 years)
Credentials and licenses: state-licensed home inspector #HI-3327, InterNACHI Certified Professional Inspector, radon and termite certified, insured with E&O coverage

Google rating and review count: 4.9 stars, 288 reviews
Years inspecting: 10 years
Inspections completed: 3,100+ inspections
Report turnaround: within 24 hours, usually same evening
3 real differentiators: reports written in plain English with photo callouts, we walk every roof we safely can, free follow-up calls about your report for as long as you own the home
3 real client reviews (first names only): "Found a foundation issue two other buyers' inspectors missed. Saved us from a money pit." - Priya / "Report landed at 9pm the same day, with photos of everything." - Jordan / "Greg spent 40 minutes on the phone walking us through it. Didn't charge a cent extra." - Beth

Published pricing (these get published):
- Buyer inspection, under 1,500 sq ft: $375
- Buyer inspection, 1,500-2,500 sq ft: $425-$495
- Buyer inspection, 2,500-4,000 sq ft: $525-$650
- Pre-listing inspection: $400-$600
- Radon test: $150 / Termite inspection: $95 / Sewer scope: $185
- New construction or 11-month warranty inspection: $400-$575

Booking calendar name (in the CRM): Inspection Booking
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the navy palette above): use the navy palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Real Estate Investing (Single Family)": `Build a complete multi-page website for the single-family home buying company described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[COMPANY NAME]", "[4.8 stars - 90+ reviews]", "[X homes purchased]", "[OWNER NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, review, or purchase story to fill a gap.

This must feel like a premium, custom-designed site, not a template: respectful, calm, human, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy, and absolutely none of the loud "WE BUY UGLY HOUSES" energy. The feeling is: a fair, patient buyer who gives you a real option, not an ultimatum.

BRAND
Colors: deep spruce (#264653) primary, warm ivory (#FAF7F1) backgrounds, soft clay (#C97B4A) accents, charcoal (#26262A) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: a humane modern serif for headlines, a clean sans for body. Imagery: real ordinary houses, kitchen-table conversations, keys changing hands, quiet neighborhoods. No stacks-of-cash photos, no cartoon ugly-house mascots, no "SOLD FAST" starbursts. Copy tone: gentle, dignified, plain English, short sentences, zero pressure, written for someone in a hard season - an inheritance, a foreclosure notice, a rental they're done with - who is wary of being taken advantage of.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width photo of an ordinary well-loved house, an outcome-focused headline (write me 3 options), primary button "Get My Cash Offer" and secondary link "Take the 60-Second Home Sale Quiz". Trust bar with count-up numbers: Google rating and review count, years buying locally, homes purchased, average days to close. "How we're different": 3 cards from the BUSINESS DETAILS differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Sell As-Is for Cash, Foreclosure & Payment Relief, Inherited & Probate Homes, Landlord & Rental Exits), one plain-English sentence each. A gradient spruce band: "Not sure if selling to us is even your best option?" with a quiz button. A "Recent Purchases" case strip: 3 story cards (situation, timeline, how it closed) using ONLY the cases in BUSINESS DETAILS, otherwise bracketed placeholders - no invented sellers, ever. Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). A no-fees strip: "No commissions, no repairs, no cleanout, we pay standard closing costs." Meet-the-owner teaser linking to About. Booking section: embedded booking calendar beside office address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Sell As-Is for Cash, Foreclosure & Payment Relief, Inherited & Probate Homes, Landlord & Rental Exits): a question-form heading like "What does selling as-is actually mean?", a direct 2-3 sentence answer FIRST, then details, the honest terms from BUSINESS DETAILS (timeline, costs covered, how offers work), a 3-question FAQ, and a booking button. In every section, say plainly that listing with an agent may net more money and that we will say so when it's true.

PAGE 3 - HOME SALE QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Home Sale Quiz". One question per step, large tappable answer cards with simple icons, selected state in spruce, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What best describes your situation? (I inherited a property / I'm behind on payments or facing foreclosure / I'm done being a landlord / The house needs more repairs than I can take on / Just exploring my options)
2. What condition is the house in? (Move-in ready / Needs some work / Needs major repairs / I'd rather not say)
3. Is anyone living in the home? (I live there / Tenants / It's vacant / A family member)
4. What matters most to you? (Speed and certainty / The highest possible number / No repairs or cleanout / A private, no-pressure process)
5. What would a good outcome look like for you? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized home sale plan?" collecting name, email, phone, and the property address. Then a results step: a warm, pressure-free 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - CASH OFFER ESTIMATOR (the lead magnet)
Headline: "How our cash offers actually work - the honest math, before you talk to anyone." An instant multi-step tool: step 1 property condition (move-in ready / needs some work / needs major repairs / not sure), step 2 how fast you'd like to close (2 weeks / a month / flexible), step 3 timing, then a capture step (name and email), then show a transparent explanation of the offer formula from BUSINESS DETAILS - market value after repairs, minus repair costs, minus our margin, all spelled out in plain words with the typical percentage range published - plus a "Book a No-Obligation Walkthrough" button. Add one reassuring line: "Take the offer, list with an agent instead, or walk away - all three are fine with us, and we'll tell you honestly if listing would net you more." Below: what selling to us includes (no commissions, no repairs, we pay standard closing costs, leave behind anything you don't want), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (a real written offer, never a bait-and-switch / no pressure and no countdown timers / we'll tell you if listing is your better move - adjust to the real promises), photos, and only the credentials and associations listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, office address with embedded map, hours, service-area note, an urgent line used gently: "Foreclosure date on the calendar? Call today - with enough lead time we can often close before the auction." and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and a spruce "Get My Offer" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any home-buying company's website into something specific to this company; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Fair Door Home Buyers
Type of business: local single-family home buying company (cash purchases)
City and neighborhood: Millbrook and surrounding towns
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Fair Door Home Buyers, 204 Union Avenue Suite 3, Millbrook, (555) 351-7784
Hours: Mon-Fri 9am-6pm, Sat 10am-2pm
Service-area note: Buying houses across Millbrook and towns within 45 minutes

Owner name: Sam Rivera
3 facts for the About story: Millbrook native who bought his first fixer-upper at 24, has been buying and restoring local houses for 12 years, started the company after helping his grandmother sell her house without repairs when she moved to assisted living
Team members (names and roles): Katie (acquisitions manager), Rob (project manager), Elena (closing coordinator)
Credentials and associations: licensed real estate agent on staff (license #RS-9917), member of the Millbrook Chamber of Commerce

Google rating and review count: 4.8 stars, 94 reviews
Years buying locally: 12 years
Homes purchased: 210+ homes
Average days to close: 18 days (as fast as 10)
3 real differentiators: written offers with the math shown, we recommend listing with an agent when it nets you more, no pressure - our offers stay open for 14 days
3 real seller reviews (first names only): "They told us Mom's house would actually do better listed, then bought our other property as-is. Who does that?" - Carol / "Behind on payments and out of options. Closed in 12 days and I walked away with real money." - Dre / "Fifteen years of tenants, done in three weeks with zero repairs." - Pat
3 case stories for the strip: inherited 1950s ranch, closed in 16 days, family kept what they wanted and left the rest / pre-foreclosure colonial, closed 9 days before the auction date / tired-landlord duplex sold with tenants in place, 21 days

Terms and numbers (these get published):
- Commissions and fees: $0
- Repairs and cleanout required: none - sell fully as-is
- Standard closing costs: we pay them
- Typical offer range: 70%-85% of after-repair market value, minus documented repair costs - the math is shown in writing
- Typical close: 10-21 days, or on your chosen date
- Offer validity: 14 days, no pressure

Booking calendar name (in the CRM): No-Obligation Offer Call
Pipeline or workflow for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the spruce palette above): use the spruce palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Orthodontist": `Build a complete multi-page website for the orthodontic practice described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere and never invent facts that are not listed there. If a detail is missing or the section is left blank, still build the full site exactly as specified using clearly marked placeholders (for example "[PRACTICE NAME]", "[4.9 stars - 400+ reviews]", "[$X,XXX-$X,XXX]", "[DR. NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: bright, friendly, modern, generous white space, smooth subtle animations - gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a warm, modern practice where a new smile feels exciting, not clinical.

BRAND
Colors: deep indigo (#312E81) primary, warm off-white (#FAF9F7) backgrounds, blush coral (#F2A9A0) accents, ink (#22242B) text (swap for brand colors in BUSINESS DETAILS if provided). Typography: a friendly rounded sans for headlines, a clean humanist sans for body. Imagery: real teens and adults laughing in daylight, aligner close-ups in natural light, candid in-office moments. No neon-blue braces clip art, no dental chairs as hero images, no impossibly white stock smiles. Copy tone: encouraging, plain English, zero orthodontic jargon, short sentences, written for self-conscious adults and parents weighing a big decision for their kid.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo of a real smile, an outcome-focused headline (write me 3 options), primary button "Book Your Free Consult" and secondary link "Take the 60-Second Smile Quiz". Trust bar with count-up numbers: Google rating and review count, years in the city, smiles transformed, "Free consults, always". "How we're different": 3 cards from the BUSINESS DETAILS differentiators with line icons and hover lift. Services preview: 4 cards linking to the Services page (Clear Aligners, Braces - Metal & Ceramic, Kids & Early Treatment, Retainers & Aftercare), one plain-English sentence each. A gradient indigo band: "Not sure if you need aligners or braces?" with a quiz button. A "Real Smiles" gallery: 3 before-and-after smile comparisons, each an image with a draggable vertical divider revealing before on one side and after on the other (mouse and touch; fall back to a tap-to-toggle crossfade if unsupported), a small "slide to compare" hint, and a one-line caption (treatment and duration, e.g. "Clear aligners - 10 months"). Testimonial carousel with the 3 reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). An insurance and financing strip: insurers accepted and the monthly payment line from BUSINESS DETAILS. Meet-the-orthodontist teaser linking to About. Booking section: embedded booking calendar beside address, hours, phone, and an embedded map.

PAGE 2 - SERVICES
One page, four anchored sections with sticky in-page navigation. For each group (Clear Aligners, Braces - Metal & Ceramic, Kids & Early Treatment, Retainers & Aftercare): a question-form heading like "Are clear aligners as effective as braces?", a direct 2-3 sentence answer FIRST, then details, the honest price range from BUSINESS DETAILS, a 3-question FAQ, and a booking button. Include one before-and-after smile slider in the Clear Aligners section and one in the Braces section (same component as the home page), relevant to that treatment.

PAGE 3 - SMILE QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Smile Quiz". One question per step, large tappable answer cards with simple icons, selected state in indigo, auto-advance on selection, animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What would you change about your smile? (Crowded or crooked teeth / Gaps between teeth / My bite - overbite, underbite or crossbite / A smile that shifted after past treatment / Not sure - I want an expert opinion)
2. Who is this for? (Me - I'm an adult / My teen / My child under 12 / More than one of us)
3. Which option appeals to you most? (Nearly invisible aligners / Traditional braces / Whichever works best / Whichever fits my budget)
4. Have you had orthodontic treatment before? (Never / Braces years ago / Aligners before / Currently in treatment elsewhere)
5. If your smile were exactly how you wanted it, what would that change for you? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized smile plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation for each of the 5 question-1 paths, each ending with the booking calendar embedded right there. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COST & FINANCING (the lead magnet)
Headline: "Honest answers about braces and aligner cost - before your first visit." An instant multi-step tool: step 1 choose a treatment (clear aligners / braces / early treatment for my child / retainers / not sure), step 2 insurance status (insured / not insured / not sure), step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with the monthly payment framing and a note that exact numbers come after a free consult and scan, plus a "Book Your Free Consult" button. Add one reassuring line: "Most families are surprised the monthly number is smaller than their phone bill - and you'll see your exact plan in writing before anything starts." Below: financing explained in plain English from BUSINESS DETAILS, what insurance typically covers, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The orthodontist's story told warmly in first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team photos with names and roles, an "Our promises" section with 3 items (one written price, no surprise add-ons / we see kids and adults with equal care / running-on-time is a policy, not a hope - adjust to the real promises), office photos, and only the credentials and board certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero, plus click-to-call phone, address with embedded map, hours, parking note, a comfort line: "Broken bracket or a poking wire? Call us - we hold same-day comfort visits." and a short message form for non-urgent questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone, and an indigo "Book Now" button always visible; clean mobile hamburger that keeps the button. Floating "Book" button bottom-right on mobile that never covers content. Footer: business name, address, and phone EXACTLY as in BUSINESS DETAILS, hours, quick links, Google reviews link, privacy policy. Every form and the quiz creates CRM contacts with the tags specified. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique titles and meta descriptions mentioning the city, LocalBusiness schema with exact name, address, phone, hours, and FAQ schema on FAQ sections. Rewrite anything that could appear on any orthodontist's website into something specific to this practice; if a claim cannot be made specific, flag it instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Archway Orthodontics
Type of practice: orthodontics for kids, teens, and adults
City and neighborhood: Crestview, Orchard Park area
Exact business name, address, phone for the footer (must match Google Business Profile exactly): Archway Orthodontics, 512 Orchard Park Boulevard, Crestview, (555) 293-5560
Hours: Mon-Thu 8am-5pm, Fri 8am-2pm, closed weekends
Parking note: Free parking lot with a dedicated patient entrance

Orthodontist name: Dr. Maya Castillo
3 facts for the About story: completed her orthodontic residency at State University, 12 years in practice, wore braces twice herself as a teen - which is exactly why she obsesses over getting it right the first time
Team members (names and roles): Grace (treatment coordinator, 10 years), Leo (orthodontic assistant), Hana (front desk)
Credentials and memberships: board-certified orthodontist, American Association of Orthodontists member, certified in clear aligner therapy

Google rating and review count: 4.9 stars, 421 reviews
Years serving the city: 12 years
Smiles transformed: 5,200+ patients
3 real differentiators: one written all-inclusive price with retainers included, same-day starts if you're ready, evening-friendly scheduling for school kids
3 real patient reviews (first names only): "My daughter counts down to her adjustment days. That says everything." - Renee / "Adult braces at 41. Best decision I put off for twenty years." - Marcus / "The price they quoted day one was the price. Retainers included." - Steph

Insurers accepted: most major PPO dental plans with orthodontic coverage, billed directly
Financing line: 0% in-house payment plans from $129/month, low down payments

Price ranges (these get published):
- Free consult with digital scan: $0
- Clear aligners: $3,500-$5,800
- Metal braces: $3,200-$5,200
- Ceramic (clear) braces: $3,800-$5,900
- Kids early treatment (Phase 1): $1,800-$3,000
- Replacement retainers: $250-$450 per set

Booking calendar name (in the CRM): Free Smile Consult
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the indigo palette above): use the indigo palette above
Logo available? (yes/no): no - create a simple clean wordmark`,
};
