// Website prompts — Health and Wellness (generated from the dental master template)
export const HEALTH_WELLNESS_PROMPTS: Record<string, string> = {
  "Personal Trainer": `Build a complete multi-page website for the independent personal trainer described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing or the section is blank, still build the full site with clearly marked placeholders (for example "[TRAINER NAME]", "[4.9 stars - 150+ reviews]", "[$XX per session]", "[CERTIFICATION]") — never fabricate a real-looking number, name, or review.

The site must feel premium and custom, never templated: modern, confident, generous white space, subtle animation only — gentle fade-up per section (once), hover lift on cards and buttons, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a coach in your corner who takes you seriously from day one.

BRAND
Colors: deep charcoal (#1F2937), warm off-white (#FAFAF7), burnt orange (#EA580C) accents, slate (#475569) text — swap for brand colors in BUSINESS DETAILS if provided. Typography: condensed sans headlines, humanist sans body. Imagery: real coaching moments in natural light; no oiled bodybuilder stock, no rows of empty machines, no salad-pointing models. Tone: direct, encouraging, zero shame, written for someone who has started and stopped before and fears being judged.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: training photo, outcome headline (write 3 options), primary "Book Your Free Consultation", secondary link "Take the 60-Second Training Match Quiz". Count-up trust bar: rating and reviews, years coaching, clients coached, "New clients welcome". "How we're different": 3 differentiator cards, line icons, hover lift. Programs preview: 4 cards (1-on-1 Training, Small Group, Online Coaching, Nutrition Guidance), one plain sentence each. Gradient orange band pushing the quiz. Transformation stories: 3 client stories; before-and-after sliders only where BUSINESS DETAILS confirms written consent, framed body-positively (captions about what clients can do now, visible "shared with permission - results vary" note), otherwise written story cards. Testimonial carousel: the 3 real reviews, gentle auto-rotate, manual controls. Pricing strip of packages. Meet-the-trainer teaser. Booking section: embedded calendar beside address, hours, phone, map.

PAGE 2 - PROGRAMS
Four anchored sections, sticky in-page nav (1-on-1 Training, Small Group, Online Coaching, Nutrition Guidance). Each: question-form heading ("What actually happens in a 1-on-1 session?"), direct 2-3 sentence answer FIRST, details, honest price from BUSINESS DETAILS, 3-question FAQ, booking button.

PAGE 3 - TRAINING MATCH QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Training Match Quiz": one question per step, large tappable cards with icons, orange selected state, auto-advance, progress bar, back navigation.
1. Main goal right now? (Lose weight / Build strength / Get back into a routine / Train for an event / Feel better day to day)
2. Training in the past year? (Consistent / On and off / Barely / Not at all)
3. What stopped you before? (No plan / Boredom / Old injury / Life got busy / Nothing - new to this)
4. How do you like to train? (One-on-one / Small group / Online at home / Not sure)
5. If we worked together for six months, what would you love to be true? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized training plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), honest about effort, no promised transformations, each ending with the embedded booking calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Straight answers about pricing - before you ever step in the gym." Multi-step plan-match tool: choose a goal or program (1-on-1 / small group / online / nutrition / not sure), then realistic sessions per week, then timing, then capture (name, email), then the honest package options from BUSINESS DETAILS, a "Book a Free Consultation" button, and the line: "No contracts, no pressure - we build the plan around your life." Below: what packages include, payment options, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The trainer's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team with roles, "Our promises" with 3 items (we never judge your starting point / every plan is built for you / you know the price before you commit - adjust to the real promises), photos, and ONLY the certifications listed in BUSINESS DETAILS - never add credentials.

PAGE 6 - CONTACT / BOOK
Embedded booking calendar as the hero, click-to-call phone, address with map, hours, parking note, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, orange "Book Now" button always visible, including alongside the mobile hamburger; floating "Book" button bottom-right on mobile, never covering content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any trainer's website into something specific to this coach; flag any claim you cannot make specific instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Forge Personal Training
Type of business: independent personal trainer (private studio)
City and neighborhood: Old Mill district, Riverton
Exact footer name, address, phone (must match Google exactly): Forge Personal Training, 112 Union Street Suite B, Riverton, (555) 301-7742
Hours: Mon-Fri 6am-8pm, Sat 8am-12pm, closed Sunday
Parking note: Free parking behind the studio

Trainer: Marcus Hale
3 About-story facts: former college soccer player, 11 years coaching, became a trainer after helping his dad rebuild strength after heart surgery
Team members: none - Marcus works with every client personally
Certifications: NASM Certified Personal Trainer, Precision Nutrition Level 1

Google rating and reviews: 4.9 stars, 187 reviews
Years coaching: 11
Clients coached: 400+
3 differentiators: every program custom-built (no templates), free first consultation and movement assessment, text support between sessions
3 client reviews (first names only): "Two years with Marcus and counting." - Dana / "He rebuilt my confidence after knee surgery." - Priya / "No shame, just a plan that finally worked." - Tom
Consented before/after photos?: no - use written story cards

Payment options: packages split into monthly payments, no long-term contracts

Price list (these get published):
- Single session: $75
- 10-session pack: $650
- 20-session pack: $1,200
- Small group session: $35 per person
- Online coaching: $199/month
- Nutrition add-on: $99/month

Booking calendar name (in the CRM): Free Consultation
Pipeline for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Fitness Coach": `Build a complete multi-page website for the online and hybrid fitness coaching business described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing or the section is blank, still build the full site with clearly marked placeholders (for example "[COACH NAME]", "[$XXX/month]", "[4.8 stars - 90+ reviews]") — never fabricate a real-looking number, name, or review.

The site must feel premium and custom, never templated: modern, calm, structured, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a smart, structured coaching program that finally fits your real life.

BRAND
Colors: deep indigo (#3730A3), crisp off-white (#FAFAFC), fresh mint (#6EE7B7) accents, slate (#1E293B) text — swap for brand colors in BUSINESS DETAILS if provided. Typography: geometric sans headlines, readable sans body. Imagery: real people training in garages, living rooms and ordinary gyms, phone-in-hand check-ins; no six-pack close-ups, no beach-sprint stock, no neon "beast mode" cliches. Tone: clear, practical, hype-free, for a busy adult who wants a plan that survives a stressful week.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: real check-in photo, outcome headline (write 3 options), primary "Apply for Coaching", secondary link "Take the 60-Second Coaching Fit Quiz". Count-up trust bar: rating and reviews, years coaching, clients coached, states served. "How we're different": 3 differentiator cards, line icons, hover lift. Programs preview: 4 cards (1-on-1 Online Coaching, Hybrid Coaching, Program-Only Plans, Nutrition Coaching), one plain sentence each. Gradient indigo band pushing the quiz. Client results: 3 written case cards (starting point, what changed, their own words) with a "shared with permission - results vary" note. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Membership strip of monthly options. Meet-the-coach teaser. Booking section: embedded discovery-call calendar beside phone and email; address, hours, map if a studio exists.

PAGE 2 - PROGRAMS
Four anchored sections, sticky in-page nav (1-on-1 Online Coaching, Hybrid Coaching, Program-Only Plans, Nutrition Coaching). Each: question-form heading ("How does online coaching actually work week to week?"), direct 2-3 sentence answer FIRST, details (app, check-ins, form reviews), honest price from BUSINESS DETAILS, 3-question FAQ, booking button.

PAGE 3 - COACHING FIT QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Coaching Fit Quiz": one question per step, large tappable cards with icons, indigo selected state, auto-advance, progress bar, back navigation.
1. Main goal? (Lose weight sustainably / Get stronger / Build a consistent routine / Improve energy and health / Train for something specific)
2. Where do you train? (Full gym / Home with some equipment / Home with nothing / It varies)
3. What made past attempts fizzle? (Generic plans / No accountability / Travel and schedule chaos / Nutrition confusion / Never really started)
4. How much guidance do you want? (Full 1-on-1 / Hybrid check-ins / Just a smart program / Not sure)
5. What does a realistic training week look like for you? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized coaching plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), honest that results vary, each ending with the embedded discovery-call calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Exactly what coaching costs - no application games, no hidden tiers." Multi-step plan-match tool: support level (1-on-1 / hybrid / program-only / nutrition / not sure), then realistic training days per week, then timing, then capture (name, email), then the honest monthly options from BUSINESS DETAILS, a "Book a Discovery Call" button, and the line: "Every plan is month to month - if it stops fitting your life, we change the plan, not blame you." Below: what each level includes, payment details, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The coach's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team with roles, "Our promises" with 3 items (your plan fits your real week / you always know the price / check-ins happen on time, every time - adjust to the real promises), candid photos, and ONLY the certifications listed in BUSINESS DETAILS - never add credentials.

PAGE 6 - CONTACT / BOOK
Embedded discovery-call calendar as the hero, click-to-call phone, email, reply hours, map and parking note if a studio exists, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, indigo "Book a Call" button always visible, even with the mobile menu; floating mobile "Book" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any coach's website into something specific to this business; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Steady State Coaching
Type of business: online and hybrid fitness coaching
City and neighborhood (home base): Westside, Brookfield
Exact footer name, address, phone (must match Google exactly): Steady State Coaching, 47 Commerce Way Suite 210, Brookfield, (555) 412-9083
Hours: coaching replies Mon-Fri 7am-7pm, Sat 9am-1pm
Parking note: free visitor parking, visits by appointment

Coach: Alicia Moreno
3 About-story facts: 9 years coaching, former burned-out hospital nurse who rebuilt her health with 3 short workouts a week, clients in 12 states
Team members: Devon (assistant coach)
Certifications: NSCA-CSCS, Precision Nutrition Level 2

Google rating and reviews: 4.8 stars, 94 reviews
Years coaching: 9
Clients coached: 350+
3 differentiators: weekly video check-ins with a real human, plans built around your equipment and schedule, month-to-month with no lock-in contracts
3 client reviews (first names only): "First program that survived my work travel." - Karen / "My plan adjusts every single week." - Josh / "Down 30 pounds without giving up family pizza night." - Renata
Consented before/after photos?: no - use written case cards

Payment options: month to month, cancel anytime, pause option for travel

Price list (these get published):
- 1-on-1 Online Coaching: $299/month
- Hybrid Coaching (2 in-person sessions/month + online): $399/month
- Program-Only Plan: $89/month
- Nutrition Coaching add-on: $99/month
- 12-week Kickstart (program + 2 calls): $349 one-time

Booking calendar name (in the CRM): Discovery Call
Pipeline for quiz/quote leads: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Physical Therapy": `Build a complete multi-page website for the physical therapy clinic described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[CLINIC NAME]", "[PT NAME, DPT]", "[$XXX self-pay rate]") — never fabricate a real-looking number, name, or review.

The site must feel premium and custom, never templated: modern, calm, capable, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a calm, capable clinic that takes your pain seriously and gets you moving again.

HEALTH RULES: never promise outcomes or timelines and never diagnose — the site invites an evaluation with a licensed physical therapist; results are talking points for that visit. Proof is clinic stats and testimonials, never before/after imagery.

BRAND
Colors: deep blue-teal (#0E7490), warm off-white (#FAF9F7), soft sky (#DBEAFE) accents, charcoal (#1F2933) text — swap for any brand colors in BUSINESS DETAILS. Typography: humane serif headlines, clean sans body. Imagery: bright treatment spaces, therapists guiding real movement, all ages; no skeleton diagrams, no glowing-red-joint stock photos. Tone: plain English, warm, unhurried, zero jargon, for someone tired of being bounced around the system.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: warm clinic photo, promise-free outcome headline (write 3 options), primary "Book Your Evaluation", secondary link "Take the 60-Second Movement Check-In". Count-up trust bar: rating and reviews, years serving the city, patients helped, "Most insurance accepted". "How we're different": 3 differentiator cards, line icons, hover lift. Services preview: 4 cards (Back & Neck Pain, Sports Injuries, Post-Surgical Rehab, Balance & Mobility), one plain sentence each. Gradient teal band pushing the quiz. Proof section: only the outcome stats in BUSINESS DETAILS with a "results vary" note, plus short recovery quotes. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Insurance strip: insurers billed directly plus self-pay option. Meet-the-therapist teaser. Booking section: embedded calendar beside address, hours, phone, map.

PAGE 2 - SERVICES
Four anchored sections, sticky in-page nav (Back & Neck Pain, Sports Injuries, Post-Surgical Rehab, Balance & Mobility). Each: question-form heading ("What happens at a first evaluation?"), direct 2-3 sentence answer FIRST, details, honest self-pay range from BUSINESS DETAILS with an insurance note, 3-question FAQ, booking button. "We evaluate", never "we will fix".

PAGE 3 - MOVEMENT CHECK-IN QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Movement Check-In": one question per step, large tappable cards, teal selected state, auto-advance, progress bar, back navigation.
1. What brings you in? (Back or neck pain / Sports injury / Post-surgery recovery / Balance or mobility / Something else)
2. How long has this been going on? (Days / Weeks / Months / Over a year)
3. What does it interfere with most? (Work / Sleep / Exercise / Everyday tasks / Nothing yet)
4. Seen anyone about it? (Doctor / Another PT / Chiro or massage / No one yet)
5. What would getting better let you do again? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized next-steps plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), never diagnosing, explaining what that evaluation involves, each ending with the embedded booking calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - COST & INSURANCE (the lead magnet)
Headline: "Honest answers about cost and insurance - before your first visit." Multi-step estimate tool: concern (back or neck / sports injury / post-surgical / balance / not sure), then insurance status (insured / self-pay / not sure), timing, capture (name, email), then the honest self-pay range or billing explanation from BUSINESS DETAILS (exact costs after benefits verification), a "Book Your Evaluation" button, and the line: "We verify your benefits before your first visit - no surprise bills." Below: plain-English billing notes, what a first evaluation includes, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The lead therapist's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team with roles, "Our promises" with 3 items (a licensed therapist every visit / costs explained first / a plan, not endless visits - adjust to the real promises), clinic photos, and ONLY the credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
Embedded booking calendar as the hero, click-to-call phone, address with map, hours, parking, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, teal "Book Evaluation" button always visible, even with the mobile menu; floating mobile "Book" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any PT website into something specific to this clinic; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Clinic name: Restore Physical Therapy
Type: outpatient orthopedic PT clinic
City: Fairview, near Memorial Park
Exact footer name, address, phone (must match Google exactly): Restore Physical Therapy, 902 Harrison Boulevard, Fairview, (555) 738-2214
Hours: Mon-Thu 7am-7pm, Fri 7am-5pm, closed weekends
Parking: free, step-free side entrance

Lead therapist: Dr. Elena Vasquez, PT, DPT
3 About-story facts: DPT from State University, 12 years treating, opened the clinic after her own ACL rehab showed the value of one-on-one time
Team members: Sam (PT, DPT), Grace (patient coordinator)
Credentials: licensed physical therapists (PT, DPT), APTA members

Google rating: 4.9 stars, 214 reviews
Years serving the city: 12
Patients helped: 5,000+
Publishable outcome stats: average 9 visits to discharge, 92% report improved daily function (self-reported)
3 differentiators: a full hour one-on-one every visit, benefits verified before your first visit, exercise videos sent to your phone
3 patient reviews (first names only): "Two years of back pain, finally a plan that made sense." - Luis / "They checked my insurance before I walked in." - Amanda / "Back to running, and they never rushed me." - Kyle

Insurance: most major PPO plans and Medicare billed directly; self-pay welcome

Price ranges (self-pay, these get published):
- Initial evaluation (60 min): $140-$170
- Follow-up (55 min): $110-$135
- 6-visit self-pay package: $600-$720
- Post-surgical rehab program: quoted after evaluation
- Telehealth follow-up: $85-$100

Booking calendar (in the CRM): New Patient Evaluation
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Nutrition & Wellness": `Build a complete multi-page website for the nutrition and wellness coaching practice described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[COACH NAME]", "[CERTIFICATION]", "[$XXX/month]") — never fabricate a real-looking number, name, or review.

The site must feel premium and custom, never templated: modern, warm, unhurried, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a kind, realistic guide who is on your side - not another diet.

HEALTH RULES: never promise weight loss amounts, cures, or health outcomes; the practice coaches habits and does not diagnose or treat conditions. Add a natural "we work alongside your doctor, not instead of them" line, and "results vary" wherever client stories appear.

BRAND
Colors: sage green (#7C9070), cream (#FDFBF7), soft terracotta (#C97B5D) accents, deep olive-charcoal (#2F3327) text — swap for any brand colors in BUSINESS DETAILS. Typography: warm serif headlines, friendly rounded sans body. Imagery: real kitchens, colorful everyday meals, people cooking together in natural light; no waist measuring tapes, no smoothie-holding models, no "guilt-free" cliches. Tone: gentle, practical, zero food guilt, for someone tired of starting over every Monday.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: warm kitchen-table photo, promise-free outcome headline (write 3 options), primary "Book a Free Discovery Call", secondary link "Take the 60-Second Nutrition Reset Quiz". Count-up trust bar: rating and reviews, years coaching, clients guided, "No meal plans off a shelf". "How we're different": 3 differentiator cards, line icons, hover lift. Programs preview: 4 cards (1-on-1 Nutrition Coaching, The 12-Week Reset, Wellness & Habit Coaching, Group Workshops), one plain sentence each. Gradient sage band pushing the quiz. Client stories: 3 written story cards about energy, confidence and habits - not scale numbers - each with a "shared with permission - results vary" note. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Pricing strip of coaching options. Meet-the-coach teaser. Booking section: embedded calendar beside address, hours, phone, map.

PAGE 2 - PROGRAMS
Four anchored sections, sticky in-page nav (1-on-1 Nutrition Coaching, The 12-Week Reset, Wellness & Habit Coaching, Group Workshops). Each: question-form heading ("What actually happens in 1-on-1 coaching?"), direct 2-3 sentence answer FIRST, details, honest price from BUSINESS DETAILS, 3-question FAQ, booking button.

PAGE 3 - NUTRITION RESET QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Nutrition Reset Quiz": one question per step, large tappable cards, sage selected state, auto-advance, progress bar, back navigation.
1. What do you most want help with? (Losing weight without another diet / More energy / Eating well with a chaotic schedule / Feeling better after meals / Healthy habits for the whole family)
2. Your eating right now? (Pretty structured / Good weeks and bad weeks / Mostly winging it / Survival mode)
3. What made past attempts hard? (Too restrictive / Life got busy / Confusing advice / Picky family / Never tried with support)
4. How do you prefer support? (Weekly 1-on-1 calls / A structured program / Light check-ins / Not sure)
5. What would eating well make possible in your life? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized nutrition reset plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), never promising outcomes, pointing to small first steps, each ending with the embedded booking calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Exactly what coaching costs - and what you get for it." Multi-step plan-match tool: focus (weight and energy / busy-schedule eating / feeling better after meals / family habits / not sure), then support level (full coaching / structured program / light check-ins), then timing, then capture (name, email), then the honest program options from BUSINESS DETAILS, a "Book a Free Discovery Call" button, and the line: "No before photos, no weigh-ins, no shame - just a plan built around your actual life." Below: what each program includes, payment options, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The coach's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team with roles, "Our promises" with 3 items (no food is off-limits / never one-size-fits-all / you always know the price up front - adjust to the real promises), warm photos, and ONLY the certifications listed in BUSINESS DETAILS - never imply medical or dietetic licensure not listed.

PAGE 6 - CONTACT / BOOK
Embedded booking calendar as the hero, click-to-call phone, address with map, hours, parking, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, sage "Book a Call" button always visible, even with the mobile menu; floating mobile "Book" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any nutrition site into something specific to this practice; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Rooted Nutrition & Wellness
Type: nutrition and wellness coaching practice
City: downtown Cedar Falls
Exact footer name, address, phone (must match Google exactly): Rooted Nutrition & Wellness, 316 Main Street Suite 4, Cedar Falls, (555) 264-5519
Hours: Mon-Fri 9am-6pm, Sat by appointment, closed Sunday
Parking: free 2-hour street parking on Main Street

Coach: Hannah Okafor
3 About-story facts: 8 years coaching, former restaurant chef who left after burnout changed her relationship with food, teaches a free monthly community cooking class
Team members: Lily (client care coordinator)
Certifications: NBC-HWC Board Certified Health & Wellness Coach, Precision Nutrition Level 2

Google rating: 4.9 stars, 86 reviews
Years coaching: 8
Clients guided: 500+
3 differentiators: no off-the-shelf meal plans - everything built around your kitchen and schedule, weekly check-ins with the same coach, grocery-store walkthrough included in every 12-week program
3 client reviews (first names only): "The first person who never made me feel bad about food." - Meredith / "My 3pm energy is completely different now." - Angela / "We cook as a family now. Worth it for that alone." - David

Payment options: monthly payment plans, HSA/FSA accepted where eligible

Price list (these get published):
- Free discovery call (20 min): $0
- 1-on-1 Nutrition Coaching: $249/month
- The 12-Week Reset: $649 one-time
- Wellness & Habit Coaching: $149/month
- Single strategy session (75 min): $120
- Group workshops: from $400 per session

Booking calendar (in the CRM): Discovery Call
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Podiatrist": `Build a complete multi-page website for the podiatry clinic described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[DR. NAME, DPM]", "[CLINIC NAME]", "[$XXX new patient visit]") — never fabricate a real-looking number, name, or review.

The site must feel premium and custom, never templated: modern, calm, professional, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a professional clinic that takes your foot pain seriously and can see you this week.

HEALTH RULES: never promise outcomes and never diagnose — the site invites an assessment with a licensed podiatrist; every quiz result is "worth having examined", never a conclusion. Testimonials, not graphic clinical imagery.

BRAND
Colors: deep navy (#1E3A5F), soft off-white (#F9FAFB), calm sky blue (#BFDBFE) accents, charcoal (#1F2933) text — swap for any brand colors in BUSINESS DETAILS. Typography: confident serif headlines, clean sans body. Imagery: people walking comfortably — trails, morning runs, grandkids — plus bright clinic rooms; no graphic foot close-ups, no surgical imagery, no clipboard-doctor stock. Tone: plain English, respectful, direct, for someone who has lived with foot pain for months and finally wants it looked at.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: comfortable-everyday-movement photo, promise-free outcome headline (write 3 options), primary "Book an Assessment", secondary link "Take the 60-Second Foot Health Quiz". Count-up trust bar: rating and reviews, years serving the city, patients treated, "Same-week appointments". "How we're different": 3 differentiator cards, line icons, hover lift. Services preview: 4 cards (Heel & Arch Pain, Nail & Skin Care, Diabetic Foot Care, Custom Orthotics), one plain sentence each. Gradient navy band pushing the quiz. Proof section: outcome-neutral - testimonials in patients' own words plus the clinic facts from BUSINESS DETAILS, with a "results vary" note, no before/after imagery. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Insurance strip: insurers billed directly, self-pay option. Meet-the-podiatrist teaser. Booking section: embedded calendar beside address, hours, phone, map.

PAGE 2 - SERVICES
Four anchored sections, sticky in-page nav (Heel & Arch Pain, Nail & Skin Care, Diabetic Foot Care, Custom Orthotics). Each: question-form heading ("What happens at a heel pain assessment?"), direct 2-3 sentence answer FIRST, details, honest price range from BUSINESS DETAILS with an insurance note, 3-question FAQ, booking button. The clinic examines and advises; the website never concludes.

PAGE 3 - FOOT HEALTH QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Foot Health Quiz": one question per step, large tappable cards, navy selected state, auto-advance, progress bar, back navigation.
1. What is bothering you most? (Heel or arch pain / A toenail or skin concern / Diabetes-related foot care / Aching feet or ankles when walking / Something else)
2. How long has it been going on? (Days / Weeks / Months / Over a year)
3. When is it worst? (First steps in the morning / After a day on my feet / During exercise / All the time)
4. Had it looked at? (Yes, by a doctor / Home remedies / Looked it up online / Not yet)
5. What would comfortable feet let you get back to? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized foot care plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), never diagnosing, explaining why that concern is worth a professional assessment and what the first visit involves, each ending with the embedded booking calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - COST & INSURANCE (the lead magnet)
Headline: "Honest answers about cost and insurance - before you book." Multi-step estimate tool: concern (heel or arch pain / nail or skin care / diabetic foot care / orthotics / not sure), then insurance status (insured / self-pay / not sure), timing, capture (name, email), then the honest self-pay range or billing explanation from BUSINESS DETAILS (exact costs after benefits verification), a "Book an Assessment" button, and the line: "We check your coverage before your visit - no surprise bills." Below: plain-English billing notes, what a first assessment includes, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The podiatrist's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team with roles, "Our promises" with 3 items (costs explained first / we never rush your visit / honest advice, even "you don't need treatment" - adjust to the real promises), clinic photos, and ONLY the credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
Embedded booking calendar as the hero, click-to-call phone, address with map, hours, parking, the urgent line: "In real pain right now? Call us - we hold same-week slots for acute foot pain." and a short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, navy "Book Now" button always visible, even with the mobile menu; floating mobile "Book" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any podiatry site into something specific to this clinic; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Clinic name: Stride Foot & Ankle Clinic
Type: general and sports podiatry
City: Riverside district, Ashford
Exact footer name, address, phone (must match Google exactly): Stride Foot & Ankle Clinic, 58 Riverside Drive Suite 102, Ashford, (555) 847-3306
Hours: Mon-Fri 8am-5pm, closed weekends
Parking: free in front, wheelchair-accessible entrance

Podiatrist: Dr. James Whitfield, DPM
3 About-story facts: DPM from State University, 16 years in practice, became a podiatrist after his marathon-runner mother lost a season to untreated heel pain
Team members: Nadia (practice manager), Colin (medical assistant)
Credentials: DPM, board certified (American Board of Podiatric Medicine), APMA member

Google rating: 4.8 stars, 261 reviews
Years serving the city: 16
Patients treated: 9,000+
3 differentiators: same-week appointments for acute pain, benefits verified before your visit, honest advice including when you do not need treatment
3 patient reviews (first names only): "Six months of heel pain, gone after his plan. Wish I had come sooner." - Teresa / "Told me I did not need orthotics yet. Earned my trust for life." - Mark / "Got my dad in two days for his diabetic foot check." - Simone

Insurance: most major PPO plans and Medicare billed directly; self-pay welcome

Price ranges (self-pay, these get published):
- New patient assessment: $125-$165
- Follow-up visit: $85-$110
- Nail and skin care visit: $90-$140
- Diabetic foot check: $110-$150
- Custom orthotics (pair): $380-$550
- In-office procedures: quoted after assessment

Booking calendar (in the CRM): New Patient Assessment
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Fitness Bootcamp": `Build a complete multi-page website for the group fitness bootcamp described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[BOOTCAMP NAME]", "[CLASS TIMES]", "[$XX/month]") — never fabricate a real-looking number, name, or review. The entire site funnels to one action: booking a FREE TRIAL CLASS.

The site must feel premium and custom, never templated: modern, energetic but clean, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a fun, sweaty crew that will cheer you through your first class - and every one after.

BRAND
Colors: near-black charcoal (#18181B), bright off-white (#FAFAFA), high-energy coral red (#E11D48) accents, warm gray (#52525B) text — swap for any brand colors in BUSINESS DETAILS. Typography: bold athletic sans headlines, clean sans body. Imagery: real class moments — huddles, partners laughing mid-burpee, sunrise high-fives, all body types visible; no perfect-makeup stock models, no dungeon-gym shots, no "no pain no gain" cliches. Tone: upbeat, welcoming, playful, zero intimidation, for someone nervous they will be the least fit person in the room.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: high-energy class photo, outcome headline (write 3 options), primary "Claim Your Free Trial Class", secondary link "Take the 60-Second Bootcamp Fit Quiz". Count-up trust bar: rating and reviews, years running, members strong, "First class always free". "How we're different": 3 differentiator cards, line icons, hover lift. Programs preview: 4 cards (Morning Bootcamp, Strength Sessions, Beginner Foundations, 6-Week Challenge), one plain sentence each. Gradient coral band: "Nervous about your first class? Everyone was." pushing the quiz. Transformation stories: 3 member stories; before-and-after sliders only where BUSINESS DETAILS confirms written consent, framed body-positively (captions celebrate what members can do now, visible "shared with permission - results vary" note), otherwise written story cards. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Membership strip of options. Meet-the-coaches teaser. Booking section: embedded trial calendar beside address, class schedule, phone, map.

PAGE 2 - PROGRAMS
Four anchored sections, sticky in-page nav (Morning Bootcamp, Strength Sessions, Beginner Foundations, 6-Week Challenge). Each: question-form heading ("What is a bootcamp class actually like?"), direct 2-3 sentence answer FIRST, details (format, length, what to bring, every exercise scalable), honest price from BUSINESS DETAILS, 3-question FAQ, "Book Your Free Trial" button.

PAGE 3 - BOOTCAMP FIT QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Bootcamp Fit Quiz": one question per step, large tappable cards, coral selected state, auto-advance, progress bar, back navigation.
1. What do you want most? (Lose weight and feel fitter / Get stronger / A community that keeps me showing up / A structured kickstart challenge / Something new and fun)
2. Last regular workouts? (I still do / A few months ago / Over a year ago / Honestly, high school)
3. What worries you about group classes? (Being the least fit there / Getting injured / Not knowing the moves / Nothing, let me in)
4. Best time of day? (Early morning / Lunchtime / Evening / Weekends)
5. What would showing up 3 times a week change for you? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized bootcamp game plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), always noting every exercise scales to every level, each ending with the embedded trial calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Simple, honest pricing - and your first class is free either way." Multi-step plan-match tool: program (bootcamp / strength / beginner foundations / 6-week challenge / not sure), then realistic classes per week, then timing, then capture (name, email), then the honest membership options from BUSINESS DETAILS, a "Claim Your Free Trial Class" button, and the line: "No joining fees, no lock-in contracts - sweat with us once for free and decide after." Below: what memberships include, payment details, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The head coach's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), coaches with roles, "Our promises" with 3 items (every workout scales to you / nobody works out alone / you always know the price - adjust to the real promises), class photos, and ONLY the certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
Embedded trial calendar as the hero, click-to-call phone, address with map, full class schedule, parking, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, coral "Free Trial" button always visible, even with the mobile menu; floating mobile "Free Trial" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, schedule summary, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any bootcamp site into something specific to this gym; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Sunrise Squad Bootcamp
Type: outdoor and indoor group fitness bootcamp
City: Lakeview Park area, Milldale
Exact footer name, address, phone (must match Google exactly): Sunrise Squad Bootcamp, 21 Lakeview Park Road, Milldale, (555) 590-6647
Class schedule: Mon-Fri 5:45am, 6:45am, 12:15pm, 6pm; Sat 8am; closed Sunday
Parking: free at the Lakeview Park lot

Head coach: Coach Riley Dunn
3 About-story facts: 10 years coaching groups, former army fitness instructor, started with 4 people in a park and grew by word of mouth
Team members: Coach Bri (strength lead), Coach Omar (beginner foundations)
Certifications: ACE Certified Group Fitness Instructor, CPR/AED certified coaching team

Google rating: 4.9 stars, 228 reviews
Years running: 10
Members: 300+ active
3 differentiators: first class always free, every exercise shown with a beginner and advanced version, squads capped at 20 so coaches know your name
3 member reviews (first names only): "Terrified to start. By week two I had 10 new friends." - Jess / "Coaches scale everything. My mom and I do the same class." - Trina / "5:45am is my favorite hour now." - Malik
Consented before/after photos?: yes - 3 members gave written consent

Payment options: month to month, no joining fees, pause anytime

Price list (these get published):
- First class: free
- Unlimited membership: $149/month
- 3 classes per week: $109/month
- Class 10-pack: $150
- 6-Week Challenge: $299
- Beginner Foundations course (4 weeks): $99

Booking calendar (in the CRM): Free Trial Class
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Healing": `Build a complete multi-page website for the holistic healing and wellness studio described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[STUDIO NAME]", "[PRACTITIONER NAME]", "[$XX per session]") — never fabricate a real-looking number, name, or review.

The site must feel premium and custom, never templated: modern, quiet, warm, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a quiet, grounded space where you can finally exhale.

TONE AND CLAIMS: grounded, not mystical. No medical claims — the studio does not diagnose, treat, or cure anything, and copy never promises health outcomes. Describe services through rest, relaxation, and how guests say they feel, noting experiences vary and the studio complements, never replaces, medical care.

BRAND
Colors: warm clay (#B08968), soft sand (#F5EFE6), deep moss (#3F4A3C) accents and text, muted cream (#FDFBF7) cards — swap for any brand colors in BUSINESS DETAILS. Typography: graceful serif headlines, light airy sans body. Imagery: natural light, linen textures, sauna steam, plants and wood; no galaxy gradients, no glowing chakra diagrams, no mountaintop-meditation stock. Tone: calm, warm, unpretentious, for someone stressed and skeptical who just wants to feel like themselves again.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: serene studio photo, calm benefit-of-rest headline with no health claims (write 3 options), primary "Book a Session", secondary link "Take the 60-Second Reset Quiz". Count-up trust bar: rating and reviews, years open, guests welcomed, "New guests welcome". "How we're different": 3 differentiator cards, line icons, hover lift. Services preview: 4 cards (Massage Therapy, Energy Work, Infrared Sauna, Breathwork & Meditation), one plain sentence each. Gradient clay band pushing the quiz. Guest experiences: 3 written story cards in guests' own words about how sessions felt, each with an "every guest's experience is different" note - no outcome claims, no before/after imagery. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Membership strip of packages. Meet-the-practitioner teaser. Booking section: embedded calendar beside address, hours, phone, map.

PAGE 2 - SERVICES
Four anchored sections, sticky in-page nav (Massage Therapy, Energy Work, Infrared Sauna, Breathwork & Meditation). Each: question-form heading ("What happens during an energy work session?"), direct 2-3 sentence expectation-setting answer FIRST, details (what to wear, session length, what guests commonly notice), honest price from BUSINESS DETAILS, 3-question FAQ, booking button.

PAGE 3 - RESET QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Reset Quiz": one question per step, large tappable cards, clay selected state, auto-advance, progress bar, back navigation.
1. What do you most need right now? (Release physical tension / Quiet a racing mind / Deep rest and recovery / Warmth and a full-body reset / Curious and exploring)
2. How does stress show up for you? (Tight shoulders and back / Poor sleep / Restless thoughts / Low energy / All of the above)
3. Tried anything like this before? (Regular massages / Some meditation or breathwork / A sauna here and there / First time)
4. How do you like to unwind? (Hands-on bodywork / Quiet stillness / Heat and warmth / Guided practices)
5. If you left feeling exactly how you wanted, how would you describe it? (open text)
6. How soon do you want to come in? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized reset plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), suggesting a first session in grounded language with no outcome promises, each ending with the embedded booking calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Simple, honest pricing - know exactly what your visit costs." Multi-step plan-match tool: what draws you in (massage / energy work / sauna / breathwork / not sure), then one-time visit or regular ritual, then timing, then capture (name, email), then the honest session prices or membership options from BUSINESS DETAILS, a "Book a Session" button, and the line: "No pressure, no packages you do not need - start with a single session and see how it feels." Below: what each session includes, membership perks, payment details, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The founder's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), practitioners with roles and modalities, "Our promises" with 3 items (no mid-session upselling / your comfort and consent lead every session / honest about what our work is and is not - adjust to the real promises), photos of the space, and ONLY the trainings listed in BUSINESS DETAILS - never imply medical licensure.

PAGE 6 - CONTACT / BOOK
Embedded booking calendar as the hero, click-to-call phone, address with map, hours, parking, a first-visit note (arrive 10 minutes early, what to wear), short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, clay "Book Now" button always visible, even with the mobile menu; floating mobile "Book" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any wellness-studio site into something specific to this studio; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Studio name: Stillwater Healing Studio
Type: holistic healing studio (massage, energy work, infrared sauna, breathwork)
City: Old Town, Crestwood
Exact footer name, address, phone (must match Google exactly): Stillwater Healing Studio, 14 Willow Lane, Crestwood, (555) 173-4428
Hours: Tue-Fri 10am-8pm, Sat-Sun 9am-5pm, closed Monday
Parking: free in the shared lot next door

Founder: Mara Ellison
3 About-story facts: 12 years as a licensed massage therapist before opening, left a corporate HR career after burnout, designed the studio around the quiet she could not find in town
Team members: Theo (massage therapist), June (breathwork facilitator), Priya (Reiki practitioner)
Trainings: state-licensed massage therapists, Reiki Level II practitioner, certified breathwork facilitator

Google rating: 4.9 stars, 134 reviews
Years open: 6
Guests welcomed: 4,000+
3 differentiators: sessions never watched by the clock - transition time built into every booking, a quiet room to land in before and after, honest guidance on which service fits (including "start with just the sauna")
3 guest reviews (first names only): "The only hour of my week that is truly mine." - Caroline / "Walked in wired, walked out human again." - Devon / "No woo-woo pressure. Just calm, kind people." - Ivy

Payment options: single sessions, packages, monthly memberships; gift cards available

Price list (these get published):
- Massage (60 min): $95
- Massage (90 min): $135
- Energy work session (60 min): $85
- Infrared sauna (45 min): $40
- Breathwork small group session: $30
- Monthly membership (2 sessions + sauna access): $159/month

Booking calendar (in the CRM): New Guest Session
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Mixed Martial Arts Gym": `Build a complete multi-page website for the mixed martial arts gym described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[GYM NAME]", "[HEAD COACH]", "[$XXX/month]") — never fabricate a real-looking number, name, or review. The entire site funnels to one action: starting a FREE TRIAL WEEK.

The site must feel premium and custom, never templated: modern, strong, disciplined, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: a serious gym with a welcoming door - beginners and kids train here every day.

BRAND
Colors: near-black (#0B0B0D), clean off-white (#F8F8F7), deep crimson (#B91C1C) accents, steel gray (#4B5563) text — swap for any brand colors in BUSINESS DETAILS. Typography: strong angular sans headlines, clean sans body. Imagery: real training — technique drilling, coaches teaching kids stance, fist bumps after a roll, parents watching; no bloody cage-fight stock, no snarling close-ups, no skull graphics. Tone: confident, respectful, welcoming, for two readers at once — a nervous adult beginner and a parent judging if this is safe for their kid.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: training photo, outcome headline (write 3 options), primary "Start Your Free Trial Week", secondary link "Take the 60-Second Program Match Quiz". Count-up trust bar: rating and reviews, years open, members training, "Kids and adults welcome". "How we're different": 3 differentiator cards, line icons, hover lift. Programs preview: 4 cards (Brazilian Jiu-Jitsu, Striking - Muay Thai & Boxing, Kids Martial Arts, MMA & Conditioning), one plain sentence each. Gradient crimson band: "Not sure which program fits you or your kid?" pushing the quiz. Member stories: 3 written story cards - an adult beginner, a parent about their child, a longtime member - on confidence, discipline and community, with a "shared with permission" note; no before/after body imagery. Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Membership strip of options. Meet-the-coaches teaser. Booking section: embedded trial calendar beside address, class schedule, phone, map.

PAGE 2 - PROGRAMS
Four anchored sections, sticky in-page nav (Brazilian Jiu-Jitsu, Striking - Muay Thai & Boxing, Kids Martial Arts, MMA & Conditioning). Each: question-form heading ("What is my first jiu-jitsu class actually like?"), direct 2-3 sentence answer FIRST, details (class structure, gear, plain-English sparring policy, kids age groups), honest price from BUSINESS DETAILS, 3-question FAQ, "Start Your Free Trial Week" button.

PAGE 3 - PROGRAM MATCH QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Program Match Quiz": one question per step, large tappable cards, crimson selected state, auto-advance, progress bar, back navigation.
1. Who is this for, and what is the goal? (Me - self-defense / Me - get in fighting shape / Me - train and maybe compete / My child - confidence and discipline / Just curious)
2. Any experience? (None / A little, years ago / Currently training elsewhere / My child has some)
3. What appeals most? (Grappling / Striking / A mix of everything / Whatever builds confidence fastest)
4. Biggest hesitation? (Getting hurt / Being the newest in the room / Schedule / My kid's temperament / None - ready)
5. What would training regularly change for you or your child? (open text)
6. How soon do you want to start? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized training plan?" (name, email, phone). Results: one warm 3-4 sentence template per question 1 path (5 total), always mentioning the no-pressure trial week and that beginners never spar until ready, each ending with the embedded trial calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Straightforward pricing - and your first week is free." Multi-step plan-match tool: program (jiu-jitsu / striking / kids / MMA & conditioning / not sure), then who is training (just me / my child / whole family), then timing, then capture (name, email), then the honest membership options from BUSINESS DETAILS including family discounts, a "Start Your Free Trial Week" button, and the line: "No contracts on day one - train free for a week, meet the coaches, then decide." Below: what memberships include, gear costs, payment details, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The head coach's story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), coaches with roles and ranks, "Our promises" with 3 items (beginners are protected, not thrown to the wolves / kids coaches are background-checked and trained to coach kids / you always know the full price - adjust to the real promises), gym photos, and ONLY the ranks and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
Embedded trial calendar as the hero, click-to-call phone, address with map, full schedule including kids class times, parking, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, crimson "Free Trial Week" button always visible, even with the mobile menu; floating mobile "Free Trial" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, schedule summary, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any MMA-gym site into something specific to this gym; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Gym name: Iron Path MMA
Type: MMA gym (BJJ, striking, kids programs, conditioning)
City: East Industrial district, Harborview
Exact footer name, address, phone (must match Google exactly): Iron Path MMA, 740 Foundry Street Unit 3, Harborview, (555) 628-1194
Class schedule: adults Mon-Fri 6am, 12pm, 5:30pm, 7pm; kids Mon/Wed/Fri 4:30pm; Sat open mat 10am; closed Sunday
Parking: free lot in front of Unit 3

Head coach: Coach Dan Kowalski
3 About-story facts: BJJ black belt, 18 years training and 9 running the gym, opened Iron Path after martial arts pulled him out of a rough patch in his twenties
Team members: Coach Lena (Muay Thai lead), Coach Sam (kids lead, brown belt), Coach Vic (conditioning)
Credentials: BJJ black belt, kids coaches background-checked, staff CPR/first aid certified

Google rating: 4.9 stars, 176 reviews
Years open: 9
Members training: 250+
3 differentiators: free full trial week (not just one class), dedicated beginner classes so day one is never survival mode, kids curriculum built on confidence and discipline with parent progress updates
3 member reviews (first names only): "34 years old, zero experience. Everyone made room for me." - Peter / "My son's teacher asked what changed. It was this place." - Monica / "Serious training without the meathead energy." - Alejandro

Payment options: month to month after the free week, family discount, no annual contracts

Price list (these get published):
- Trial week: free
- Adult unlimited: $159/month
- Adult 2 classes per week: $119/month
- Kids membership: $99/month
- Family discount: 15% off each additional member
- Beginner gear bundle (gloves, wraps): $75

Booking calendar (in the CRM): Free Trial Week
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,

  "Family Fun": `Build a complete multi-page website for the family entertainment center described in the BUSINESS DETAILS section at the end of this prompt. Use those details everywhere; never invent facts. If a detail is missing, still build everything with clearly marked placeholders (for example "[CENTER NAME]", "[PARTY PACKAGE PRICE]", "[ATTRACTION LIST]") — never fabricate a real-looking number, name, or review. Visitors are always "guests" - never patients or clients. The site funnels to two actions: booking a birthday party and planning a visit.

The site must feel premium and custom, never templated: modern, bright, joyful but organized, generous white space, subtle animation only — gentle fade-up per section (once), hover lift, count-up stats, smooth page and quiz transitions, never busy. The feeling is: the easiest great day out your family will have this year.

BRAND
Colors: bright blue (#2563EB), clean white (#FFFFFF), sunny yellow (#FDE047) accents, playful magenta (#DB2777) highlights, deep navy (#1E293B) text — swap for any brand colors in BUSINESS DETAILS. Typography: friendly rounded display headlines, readable sans body. Imagery: real families mid-laugh, kids celebrating, arcade glow, birthday cake moments; no sterile empty-venue shots, no clip-art balloons, no thumbs-up stock kids. Tone: warm, playful, effortless, for a busy parent who wants zero hassle and no hidden costs.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: joyful photo, fun outcome headline (write 3 options), primary "Book a Birthday Party", secondary link "Take the 60-Second Party & Visit Planner". Count-up trust bar: rating and reviews, years of fun, guests hosted per year, parties thrown. "How we're different": 3 differentiator cards, line icons, hover lift. Attractions preview: 4 cards using the attraction groups from BUSINESS DETAILS, one plain sentence each. Gradient blue band: "Planning a party or just a big day out?" pushing the quiz. Happy guests: 3 short story cards from real parties and visits (a birthday parent, a grandparent, a group organizer). Testimonial carousel: the 3 real reviews, auto-rotate, manual controls. Pricing strip of admission and party packages. Meet-the-owners teaser. Booking section: embedded party calendar beside address, hours, phone, map.

PAGE 2 - ATTRACTIONS & PARTIES
Four anchored sections, sticky in-page nav, one per attraction group from BUSINESS DETAILS. Each: question-form heading ("What is included in a laser tag party?"), direct 2-3 sentence answer FIRST, details (age ranges, plain-English height and safety rules, group options), honest price from BUSINESS DETAILS, 3-question FAQ, "Book This" button.

PAGE 3 - PARTY & VISIT PLANNER QUIZ (the most important page)
Full-screen multi-step quiz, "The 60-Second Party & Visit Planner": one question per step, large tappable cards, blue selected state, auto-advance, progress bar, back navigation.
1. What are you planning? (A birthday party / A family day out / A group or team event / A school or camp trip / Just seeing what you offer)
2. Who is coming? (Little kids 2-6 / Big kids 7-12 / Teens / Mixed ages, toddlers to grandparents)
3. Roughly how many? (Under 10 / 10-20 / 20-40 / 40+)
4. What matters most? (Zero-stress hosting - you handle everything / Best value / The wow factor / Food and cake made easy)
5. Anything special - themes, allergies, surprises? (open text)
6. When is the big day? (ASAP / This month / Just researching)
Capture BEFORE results: "Almost done - where should we send your personalized party plan?" (name, email, phone). Results: one warm, excited 3-4 sentence template per question 1 path (5 total), matching them to the right package or visit option from BUSINESS DETAILS, each ending with the embedded party calendar. Tag every quiz lead "quiz-lead".

PAGE 4 - PRICING (the lead magnet)
Headline: "Honest pricing for parties and play - no surprises at checkout." Multi-step estimate tool: what you are pricing (birthday party / general admission / group event / just browsing), then roughly how many guests, then timing, then capture (name, email), then the honest package prices or admission rates from BUSINESS DETAILS, a "Book Your Date" button, and the line: "The price you see is the price you pay - food, setup and cleanup are spelled out in every package." Below: what every party package includes (host, room time, food, setup and cleanup), deposit and payment details, 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owners' story in warm first person from the BUSINESS DETAILS facts (2-3 short paragraphs), team with roles, "Our promises" with 3 items (clean and safe is our obsession / party parents get to enjoy the party too / no hidden fees, ever - adjust to the real promises), photos of the space in action, and ONLY the safety credentials listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
Embedded party calendar as the hero, click-to-call phone, address with map, hours, parking, group visit info, short message form.

GLOBAL REQUIREMENTS
Sticky header: logo, links, phone, blue "Book a Party" button always visible, even with the mobile menu; floating mobile "Book" button that never covers content. Footer: business name, address, phone EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. All forms and the quiz create CRM contacts with the specified tags. Mobile-first, thumb-sized buttons, quiz usable one-handed. Accessibility: strong contrast, alt text, focus states. SEO: unique titles and descriptions mentioning the city, LocalBusiness and FAQ schema with the exact NAP and hours. Rewrite anything that could sit on any entertainment-center site into something specific to this business; flag claims you cannot make specific.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Jumpstart Family Fun Center
Type: indoor family entertainment center
City: Commerce Park, Lakeside
Exact footer name, address, phone (must match Google exactly): Jumpstart Family Fun Center, 1200 Commerce Park Drive, Lakeside, (555) 906-2281
Hours: Mon-Thu 11am-8pm, Fri 11am-10pm, Sat 9am-10pm, Sun 10am-7pm
Parking: free, 200+ spaces, stroller-friendly entrance

Owners: Tony and Grace Marino
3 About-story facts: married couple, opened 7 years ago after driving their own three kids 40 minutes to the nearest arcade, Tony ran restaurant kitchens for 15 years so the party food is actually good
Team members: Whitney (events manager), Cole (floor and safety lead)
Safety credentials: attractions inspected annually, staff CPR/first aid certified, background-checked party hosts

Google rating: 4.7 stars, 438 reviews
Years of fun: 7
Guests hosted: 60,000+ per year, 1,200+ parties thrown
4 attraction groups: Arcade & Games, Laser Tag, Mini Bowling, Soft Play & Toddler Zone
3 differentiators: a dedicated party host handles setup, serving and cleanup, toddler zone separated from big-kid areas, transparent package pricing with no hidden fees
3 guest reviews (first names only): "First party where I actually watched my kid have fun." - Erin / "Clean, organized, and the staff genuinely like kids." - Hassan / "We drove past two other places to come back." - Beth

Deposit and payment: $50 deposit books your date, refundable up to 7 days before, remainder due day-of

Price list (these get published):
- General admission (all-access wristband): $18 weekdays, $24 weekends
- Toddler zone only (under 4): $10
- Classic Party Package (10 kids): $299
- Ultimate Party Package (10 kids, laser tag + bowling): $399
- Additional party guest: $22 each
- Group events (20+ guests): from $16 per guest

Booking calendar (in the CRM): Party Booking Call
Quiz/quote lead pipeline: New Leads, stage "Quiz/Quote Lead"
Brand colors: use the palette above
Logo available?: no - create a simple clean wordmark`,
};
