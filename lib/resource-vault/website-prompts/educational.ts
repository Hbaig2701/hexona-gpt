// Website prompts — Educational Services (generated from the dental master template)
export const EDUCATIONAL_PROMPTS: Record<string, string> = {
  "Tutoring": `Build a complete multi-page website for the tutoring center described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders in place of the missing facts (for example "[CENTER NAME]", "[4.9 stars - 180+ reviews]", "[$XX/hour]", "[DIRECTOR NAME]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, calm, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a warm, organized learning center where a worried parent instantly thinks "these people will actually help my kid."

BRAND
Colors: deep navy (#1E3A5F) primary, warm cream (#FCF9F2) backgrounds, soft amber (#F2B84B) accents, charcoal (#22292F) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a friendly rounded serif for headlines, a clean humanist sans for body. Imagery: natural photos of real tutors and students working together in daylight, relaxed and focused, smiling at small wins. No chalkboard-and-lightbulb cliches, no apple-on-a-desk stock photos, no kids in graduation caps. Generate images in this style where needed. Copy tone: warm, plain English, reassuring, zero education jargon, short sentences, written for a parent who is worried about their child's grades and slightly guilty they did not act sooner.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Book a Free Skills Assessment" and one secondary link "Take the 60-Second Learning Check". Under the hero, a trust bar with animated count-up numbers from BUSINESS DETAILS: rating and review count, years serving the city, students tutored, and the grade-improvement stat. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (Math, Reading & Writing, SAT/ACT Test Prep, Homework Help & Study Skills), one plain-English sentence each. Then a visually distinct gradient navy band: "Not sure what kind of help your child needs?" with a button to the Learning Check. Then a proof section built as a results wall: grade-improvement stats, short parent quotes, and student milestones, using only facts from BUSINESS DETAILS - no before-and-after sliders anywhere. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip summarizing the published rates and the monthly plan line. Then a meet-the-director teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation (Math, Reading & Writing, SAT/ACT Test Prep, Homework Help & Study Skills). For each: a question-form heading like "How do tutoring sessions actually work?", then a direct 2-3 sentence answer FIRST, then details (session length, group size, who it is for), then the honest price range from BUSINESS DETAILS, then a 3-question FAQ, then a "Book a Free Assessment" button.

PAGE 3 - LEARNING CHECK QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Learning Check". One question per step, large tappable answer cards with simple icons, selected state in navy, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What is your biggest concern about your child's schoolwork? (Falling grades / An upcoming SAT or ACT / Homework battles and focus / Reading or writing struggles / Nothing urgent - I want them ahead)
2. How long has this been going on? (Just this semester / About a year / Several years / Hard to say)
3. How does your child feel about school right now? (Mostly confident / Frustrated / Anxious / Checked out)
4. Have you tried tutoring before? (Never / Yes, it helped / Yes, it did not stick / Currently with someone else)
5. If one thing improved by the next report card, what would it be? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your child's personalized learning plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on the answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - TUITION (the lead magnet)
Headline: "Honest answers about tutoring cost - before you ever commit." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a program (math / reading and writing / SAT-ACT prep / homework help / not sure), step 2 one qualifier - 1-on-1 or small group, step 3 timing, then a capture step (name and email), then show the honest price range for their selection from BUSINESS DETAILS with a note that the free assessment confirms the exact plan, and a "Book a Free Assessment" button. After the range, add one reassuring line: "Most families are surprised it costs less than they expected - and you will know your exact plan before paying anything." Below the tool: the payment plan explained in plain English, what is included in every plan (assessment, matched tutor, weekly progress reports), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The director's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), tutor photos with names and specialties, an "Our promises" section with 3 items (same tutor every session / progress reports every week / no long-term contracts - adjust to the center's real promises), photos of the center, and only the credentials and memberships listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, parking note, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and an amber "Book Free Assessment" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any tutoring website into something specific to this center using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Center name: Bright Path Learning Center
Type of center: K-12 subject tutoring and SAT/ACT prep
City and neighborhood: Riverside district, Fairview
Exact business name, address, phone for the footer (must match the Google Business Profile exactly): Bright Path Learning Center, 412 Oakwood Lane, Fairview, (555) 302-4471
Hours: Mon-Fri 3pm-8pm, Sat 9am-3pm, closed Sunday
Parking note: Free parking lot beside the building

Director name: Elena Ortiz
3 facts for the About story: taught middle-school math for 11 years before opening the center, holds a Master of Education from State University, started by tutoring neighborhood kids at her kitchen table
Team members (names and roles): David (lead SAT/ACT tutor), Hannah (reading and writing specialist), Marcus (math tutor), Joy (front desk and scheduling)
Real credentials and memberships: all lead tutors are state-certified teachers, member of the National Tutoring Association

Google rating and review count (real numbers): 4.9 stars, 187 reviews
Years serving the city: 8 years
Students tutored and results stat: 1,200+ students; 9 out of 10 families report a grade improvement within one semester
3 real differentiators: free skills assessment before any commitment, the same tutor every session, weekly progress reports to parents
3 real parent reviews to quote (first names only): "My daughter went from dreading math to teaching ME fractions at dinner." - Karen / "SAT score up 210 points. Worth every penny." - Robert / "They send me a progress note after every single session." - Amina

Payment plan line: monthly plans from $199/month, no long-term contracts, cancel anytime
Price ranges (these get published):
- Free skills assessment: $0
- 1-on-1 tutoring: $55-$70 per hour
- Small group (max 4 students): $35-$45 per hour
- SAT/ACT prep course (8 weeks): $499-$749
- Homework Help membership: $199 per month
- Summer catch-up program: $350-$550

Booking calendar name (in the CRM): Free Skills Assessment
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if the center has them (otherwise the navy palette above is used): use the navy palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Driving Instructor": `Build a complete multi-page website for the independent driving instructor described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders in place of the missing facts (for example "[INSTRUCTOR NAME]", "[92% first-time pass rate]", "[$XX per lesson]", "[2,000+ learners taught]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, calm, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a patient, experienced instructor who makes a nervous learner think "I could actually do this with him."

BRAND
Colors: confident green (#2F7A52) primary, soft off-white (#FAFAF7) backgrounds, warm slate (#5B6670) accents, near-black (#20262B) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a sturdy modern sans for headlines, a highly readable sans for body. Imagery: bright daylight photos of real lessons - a relaxed learner at the wheel, the instructor coaching calmly from the passenger seat, quiet residential streets. No hands-at-ten-and-two stock closeups, no giant red L-plates, no white-knuckle steering wheel shots. Generate images in this style where needed. Copy tone: calm, encouraging, plain English, short sentences, written for a nervous learner (or their parent) who worries they will be judged for stalling, failing before, or starting late.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Book Your First Lesson" and one secondary link "Take the 60-Second Road-Ready Check". Under the hero, a trust bar with animated count-up numbers from BUSINESS DETAILS: first-time pass rate, learners taught, years instructing, rating and review count. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (Beginner Lessons, Test Preparation & Mock Tests, Nervous Driver & Refresher Lessons, Intensive Courses), one plain-English sentence each. Then a visually distinct gradient green band: "Not sure how many lessons you need?" with a button to the Road-Ready Check. Then a proof section built as a results wall: the pass rate front and center, recent pass milestones, and short learner quotes, using only facts from BUSINESS DETAILS - no before-and-after sliders anywhere. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip summarizing lesson and package prices with the payment line. Then a meet-the-instructor teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded booking calendar next to the service area, hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation (Beginner Lessons, Test Preparation & Mock Tests, Nervous Driver & Refresher Lessons, Intensive Courses). For each: a question-form heading like "What happens on a first driving lesson?", then a direct 2-3 sentence answer FIRST, then details (lesson length, pickup, the dual-control car), then the honest price from BUSINESS DETAILS, then a 3-question FAQ, then a "Book a Lesson" button.

PAGE 3 - ROAD-READY QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Road-Ready Check". One question per step, large tappable answer cards with simple icons, selected state in green, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Where are you on your driving journey? (Never driven before / Some practice, still nervous / My test is booked soon / I failed a test before / Licensed but rusty)
2. How much practice have you had? (None / A few hours / Regular practice with family / Lots, but not recently)
3. How do you feel behind the wheel? (Excited / A little nervous / Very anxious / Depends on the day)
4. Do you have a car to practice in between lessons? (Yes, a family car / Yes, my own / No, I need the instructor's car / Not sure)
5. What is the one thing about driving that worries you most? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized lesson plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on the answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - LESSON PRICES (the lead magnet)
Headline: "Honest lesson prices - and an honest answer on how many you need." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a program (beginner lessons / test prep / refresher / intensive course / not sure), step 2 one qualifier - current experience level, step 3 timing, then a capture step (name and email), then show the honest price or package from BUSINESS DETAILS with a note that the first lesson confirms the exact plan, and a "Book Your First Lesson" button. After the price, add one reassuring line: "Most learners need fewer lessons than they fear - and you will get an honest number after your first drive, never a padded package." Below the tool: the payment line explained simply, what every lesson includes (pickup, dual-control car, progress notes), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The instructor's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), a photo, an "Our promises" section with 3 items (no shouting, ever / honest lesson counts / you drive from minute one - adjust to the instructor's real promises), a photo of the lesson car, and only the licenses and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, the pickup area with embedded map, hours, the pickup note, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a green "Book a Lesson" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any driving instructor's website into something specific to this instructor using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Business name: Steady Wheel Driving Lessons
Type of business: independent driving instructor, one dual-control car
City and service area: Cedar Falls and the Northgate area
Exact business name, address, phone for the footer (must match the Google Business Profile exactly): Steady Wheel Driving Lessons, 77 Birch Street, Cedar Falls, (555) 641-2280
Hours: Mon-Sat 8am-7pm, closed Sunday
Parking / pickup note: every lesson starts with free pickup from home, school, or work

Instructor name: Mark Ellison
3 facts for the About story: 12 years as a full-time driving instructor, former fleet safety trainer, grew up in Cedar Falls and still teaches on the streets he learned on
Team members: none - every lesson is with Mark
Real credentials: state-licensed driving instructor, certified defensive driving trainer, fully insured dual-control lesson car

Google rating and review count (real numbers): 5.0 stars, 214 reviews
Years instructing: 12 years
Learners taught and pass rate: 2,300+ learners taught; 92% first-time pass rate
3 real differentiators: dual-control car so you are never truly alone at the wheel, free pickup for every lesson, a calm-nerves specialty for anxious learners
3 real reviews to quote (first names only): "I failed twice with another instructor. Mark got me a pass in six lessons and never once raised his voice." - Jenna / "He explains everything before you do it, so nothing feels scary." - Tom / "My daughter actually looked forward to her lessons." - Priya

Payment plan line: lesson packs can be split into two payments, no extra charge
Price ranges (these get published):
- Single lesson (60 min): $65
- 5-lesson pack: $299
- 10-lesson pack: $549
- Mock test (90 min): $70
- Test-day package (warm-up lesson plus car for the test): $150
- Nervous driver refresher (60 min): $65

Booking calendar name (in the CRM): First Lesson Booking
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the green palette above is used): use the green palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "BJJ School": `Build a complete multi-page website for the Brazilian jiu-jitsu academy described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders in place of the missing facts (for example "[ACADEMY NAME]", "[HEAD COACH NAME]", "[$XXX/month]", "[300+ active members]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, calm, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a disciplined, welcoming academy where a total beginner - or a parent - instantly feels "I would not be embarrassed walking in here."

BRAND
Colors: deep ink navy (#141C2B) primary, bone white (#F7F5F0) backgrounds, muted crimson (#9E2B25) accents, dark charcoal (#1E2430) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a strong condensed sans for headlines, a clean neutral sans for body. Imagery: bright, honest photos of real classes - coaches teaching technique, kids lined up bowing, adults smiling after a hard roll. No aggressive fight-face stock photos, no dark cage-fighting imagery, no snarling posed staredowns. Generate images in this style where needed. Copy tone: grounded, encouraging, plain English, short sentences, written for a beginner who is intimidated by martial arts gyms and for a parent deciding if this is safe for their child.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Claim Your Free Trial Class" and one secondary link "Take the 60-Second Mat-Ready Check". Under the hero, a trust bar with animated count-up numbers from BUSINESS DETAILS: rating and review count, years open, active members, belts promoted. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (Kids BJJ, Adult Fundamentals, Advanced & Competition, Private & Small-Group Training), one plain-English sentence each. Then a visually distinct gradient navy band: "Not sure which class is right for you or your child?" with a button to the Mat-Ready Check. Then a proof section built as a results wall: member milestones, belt promotions, competition results if listed, and short member quotes, using only facts from BUSINESS DETAILS - no before-and-after sliders anywhere. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a membership pricing strip with the published rates and the family discount line. Then a meet-the-head-coach teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded trial class calendar next to address, hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation (Kids BJJ, Adult Fundamentals, Advanced & Competition, Private & Small-Group Training). For each: a question-form heading like "What happens at my first class?", then a direct 2-3 sentence answer FIRST, then details (schedule style, what to wear, loaner gi note), then the honest price from BUSINESS DETAILS, then a 3-question FAQ, then a "Book a Free Trial" button.

PAGE 3 - MAT-READY QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Mat-Ready Check". One question per step, large tappable answer cards with simple icons, selected state in crimson, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Who is the trial class for? (Me - total beginner / Me - I have trained before / My child / Both me and my child / Just exploring options)
2. What is the main goal? (Get in shape / Learn real self-defense / Confidence and discipline / Compete one day)
3. How do you feel about walking into a martial arts gym? (Ready to go / A little intimidated / Very nervous / I tried one before and hated it)
4. How active are you (or your child) right now? (Very active / Somewhat active / Starting from the couch / It varies)
5. Anything you are nervous about before a first class? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized trial class plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on the answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - MEMBERSHIP PRICING (the lead magnet)
Headline: "Honest membership prices - no contracts hidden until you walk in." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a program (kids / adult fundamentals / advanced / private training / not sure), step 2 one qualifier - how many days per week you can realistically train, step 3 timing, then a capture step (name and email), then show the honest membership rate from BUSINESS DETAILS with a note that the free trial comes first, and a "Claim Your Free Trial" button. After the rate, add one reassuring line: "Every membership starts with a free trial class - you will never be asked to pay before you have stepped on the mat." Below the tool: the family discount and payment terms in plain English, what is included (all classes at your level, open mats, no belt-testing fees if true), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The head coach's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), coach photos with names, belts, and roles, an "Our promises" section with 3 items (beginners are never thrown to the sharks / egos stay off the mat / kids coaches are background-checked - adjust to the academy's real promises), photos of the academy, and only the ranks and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded trial class calendar as the hero of the page, plus click-to-call phone, address with embedded map, class hours, parking note, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a crimson "Free Trial" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Free Trial" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any BJJ academy's website into something specific to this academy using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

Academy name: Ironwood Jiu-Jitsu Academy
Type of academy: Brazilian jiu-jitsu for kids and adults, gi and no-gi
City and neighborhood: Eastside, Millbrook
Exact business name, address, phone for the footer (must match the Google Business Profile exactly): Ironwood Jiu-Jitsu Academy, 908 Foundry Road, Millbrook, (555) 483-9917
Hours: Mon-Fri 6am-9pm, Sat 9am-1pm, closed Sunday
Parking note: Free parking lot in front of the building

Head coach name: Daniel Reyes
3 facts for the About story: black belt with 16 years on the mats, competed at national level before opening the academy, started teaching six students in a rented garage seven years ago
Team members (names, belts, roles): Coach Alyssa (brown belt, head of the kids program), Coach Tom (purple belt, fundamentals), Sam (front desk)
Real credentials: IBJJF-registered black belt, all kids coaches background-checked, staff first-aid certified

Google rating and review count (real numbers): 4.9 stars, 156 reviews
Years open: 7 years
Members and milestones: 300+ active members; 400+ belt promotions awarded
3 real differentiators: a free trial week for every new student, a structured beginner curriculum so no one gets thrown to the sharks, a dedicated kids program split by age group
3 real reviews to quote (first names only): "I was terrified to start at 38. Three months in, it is the best part of my week." - Laura / "My son has ADHD and his focus at school has genuinely improved since joining." - Derek / "Zero ego in this gym. Upper belts actually help you." - Chris

Payment plan line: month-to-month memberships, 10% family discount for two or more family members, cancel with 30 days notice
Price ranges (these get published):
- Free trial class: $0
- Kids BJJ (2 classes/week): $99 per month
- Adult 2 classes/week: $109 per month
- Adult unlimited: $149 per month
- Private lesson: $80 per session
- Drop-in (visitors): $25

Booking calendar name (in the CRM): Free Trial Class
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the navy and crimson palette above is used): use the palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Driving School": `Build a complete multi-page website for the driving school described in the BUSINESS DETAILS section at the very end of this prompt. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders in place of the missing facts (for example "[SCHOOL NAME]", "[89% first-time pass rate]", "[$XXX teen package]", "[9,000+ students trained]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, calm, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: an established, professional school where a parent handing over their teenager - or an adult starting late - immediately feels safe.

BRAND
Colors: confident blue (#1E5AA8) primary, light cloud (#F6F8FB) backgrounds, warm yellow (#F5B301) accents, deep slate (#232B36) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a clean geometric sans for headlines, a highly readable sans for body. Imagery: bright daylight photos of real instructors and students - a teen grinning with a pass certificate, an instructor walking a student around the training car, the clean multi-car fleet. No hands-at-ten-and-two stock closeups, no cartoon traffic cones, no staged thumbs-up-through-the-window shots. Generate images in this style where needed. Copy tone: reassuring, professional, plain English, short sentences, written for two readers at once: the parent of a new teen driver and the adult learner embarrassed about starting late.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm photo, an outcome-focused headline (write me 3 options to choose from), one primary button "Enroll Now" and one secondary link "Take the 60-Second Driver Readiness Check". Under the hero, a trust bar with animated count-up numbers from BUSINESS DETAILS: first-time pass rate, students trained, years serving the city, rating and review count. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (Teen Driver's Ed, Adult Beginner Lessons, Road Test Prep, Refresher & Defensive Driving), one plain-English sentence each. Then a visually distinct gradient blue band: "Not sure which program fits?" with a button to the Readiness Check. Then a proof section built as a results wall: the pass rate front and center, recent student passes, and short parent and student quotes, using only facts from BUSINESS DETAILS - no before-and-after sliders anywhere. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip summarizing packages and the payment plan line. Then a meet-the-team teaser: owner photo, two warm sentences about the instructor team, link to About. Finally a booking section: the embedded booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation (Teen Driver's Ed, Adult Beginner Lessons, Road Test Prep, Refresher & Defensive Driving). For each: a question-form heading like "What does teen driver's ed include?", then a direct 2-3 sentence answer FIRST, then details (classroom vs behind-the-wheel hours, scheduling, which instructors), then the honest price from BUSINESS DETAILS, then a 3-question FAQ, then an "Enroll" button.

PAGE 3 - DRIVER READINESS QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Driver Readiness Check". One question per step, large tappable answer cards with simple icons, selected state in blue, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. Who needs driving lessons? (My teen - just starting / My teen - test coming up / Me - adult beginner / Me - licensed but need a refresher / Not sure yet)
2. How much driving experience so far? (None / A permit and a little practice / Regular supervised practice / Licensed, but out of practice)
3. How does the learner feel about driving? (Confident and eager / A little nervous / Very anxious / Reluctant - being pushed by family)
4. What schedule works best? (After school / Weekends / Weekday daytime / Flexible)
5. What is the one thing you most want an instructor to focus on? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized lesson plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on the answer to question 1 (write one result template for each of the 5 paths), each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - PRICING & PACKAGES (the lead magnet)
Headline: "Straightforward package prices - published, not hidden behind a phone call." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a program (teen driver's ed / adult lessons / road test prep / refresher / not sure), step 2 one qualifier - experience level, step 3 timing, then a capture step (name and email), then show the honest package price from BUSINESS DETAILS with a note that a quick call confirms scheduling, and an "Enroll Now" button. After the price, add one reassuring line: "What you see is what you pay - no surprise add-ons on test day." Below the tool: the split-payment plan in plain English, what every package includes (licensed instructor, dual-control car, progress tracking), and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The owner's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs), instructor photos with names and specialties, an "Our promises" section with 3 items (every instructor licensed and background-checked / no yelling, ever / honest advice on when you are test-ready - adjust to the school's real promises), photos of the fleet and classroom, and only the state approvals and certifications listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, parking note, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a yellow "Enroll Now" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Enroll" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any driving school's website into something specific to this school using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

School name: Greenlight Driving Academy
Type of school: state-approved driving school, teen and adult programs, six instructors
City and neighborhood: Harborview district, Lakeside
Exact business name, address, phone for the footer (must match the Google Business Profile exactly): Greenlight Driving Academy, 1520 Commerce Drive Suite B, Lakeside, (555) 728-3345
Hours: Mon-Fri 9am-8pm, Sat 8am-5pm, closed Sunday
Parking note: Free parking in the Commerce Drive lot, entrance B

Owner name: Karen Doyle
3 facts for the About story: former high-school teacher who founded the school 15 years ago, built the instructor team around patience rather than seniority, both of her own kids learned to drive in the school's cars
Team members (names and roles): six state-licensed instructors including three female instructors (students can request one), Beth (office manager)
Real credentials: state-approved driver education provider, every instructor state-licensed and background-checked, full dual-control training fleet

Google rating and review count (real numbers): 4.8 stars, 402 reviews
Years serving the city: 15 years
Students trained and pass rate: 9,000+ students trained; 89% first-time pass rate
3 real differentiators: choose or request your instructor, online parent portal to track a teen's progress, published package prices with no test-day add-ons
3 real reviews to quote (first names only): "The parent portal let me see every lesson note. I always knew where my son stood." - Michelle / "I got my license at 34 and no one made me feel weird about it even once." - Andre / "Requested a female instructor for my daughter - easy, no questions asked." - Fatima

Payment plan line: every package can be split into three interest-free payments
Price ranges (these get published):
- Teen driver's ed package (classroom plus 6 behind-the-wheel lessons): $499
- Behind-the-wheel add-on lesson: $70
- Adult single lesson (60 min): $70
- Adult 5-lesson package: $325
- Road test prep package (2 lessons plus car for the test): $165
- Refresher / defensive driving lesson: $75

Booking calendar name (in the CRM): Enrollment Call
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the blue palette above is used): use the blue palette above
Logo available? (yes/no): no - create a simple clean wordmark`,

  "Firearms Training": `Build a complete multi-page website for the licensed firearms safety training school described in the BUSINESS DETAILS section at the very end of this prompt. This is a lawful, licensed instruction business focused on safety education, license preparation, and beginner fundamentals - the entire site must reflect a safety-first culture, never tactical or combat framing. Use those details everywhere; do not invent facts that are not listed there. If a detail is missing or the BUSINESS DETAILS section is left entirely blank, still build the full site exactly as specified - just use clearly marked placeholders in place of the missing facts (for example "[ACADEMY NAME]", "[LEAD INSTRUCTOR NAME]", "[$XX safety course]", "[4,000+ students certified]") so every placeholder is easy to find and swap later. Never fabricate a real-looking number, name, or review to fill a gap.

This must feel like a premium, custom-designed site, not a template: modern, calm, confident, generous white space, and smooth subtle animations throughout. Gentle fade-up on each section as it scrolls into view (once only), soft hover lift on cards and buttons, animated count-up numbers for stats, smooth transitions between pages and quiz steps. Never busy, never flashy. The feeling is: a professional, safety-obsessed classroom where a nervous first-timer immediately thinks "these are the responsible people to learn from."

BRAND
Colors: deep forest green (#2C4A3B) primary, warm stone (#F4F1EA) backgrounds, muted brass (#B08D3E) accents, dark charcoal (#26292B) text (swap for the brand colors in BUSINESS DETAILS if provided). Typography: a solid, trustworthy serif for headlines, a clean neutral sans for body. Imagery: bright classroom and supervised-range photos - an instructor calmly coaching, eye and ear protection in use, orderly well-lit facilities. Absolutely no tactical gear, camo, dramatic dark lighting, or aggressive posturing; the visual language is education, not action. Generate images in this style where needed. Copy tone: calm, responsible, welcoming, plain English, short sentences, written for a nervous first-time student who wants to do this the right way and may feel intimidated about asking basic questions.

BUILD 6 PAGES:

PAGE 1 - HOME
Hero: full-width warm classroom photo, an outcome-focused headline about safety and confidence (write me 3 options to choose from), one primary button "Book a Safety Course" and one secondary link "Take the 60-Second Safety Readiness Check". Under the hero, a trust bar with animated count-up numbers from BUSINESS DETAILS: rating and review count, years teaching, students certified, course completion rate. Then a "How we're different" section: 3 cards using the differentiators from BUSINESS DETAILS, each with a simple line icon and hover lift. Then a programs preview: 4 cards linking to the Programs page (First-Time Owner Safety Course, License & Permit Prep, Beginner Fundamentals, Safe Storage & Home Safety Workshop), one plain-English sentence each. Then a visually distinct gradient green band: "Not sure which course to start with?" with a button to the Readiness Check. Then a proof section built as a results wall: students certified, completion rate, course milestones, and short student quotes, using only facts from BUSINESS DETAILS - no before-and-after sliders anywhere. Then a testimonial carousel with the 3 real reviews from BUSINESS DETAILS (gentle auto-rotate, manual controls). Then a pricing strip summarizing published course prices. Then a meet-the-instructor teaser: photo, two warm sentences, link to About. Finally a booking section: the embedded course booking calendar next to address, hours, phone, and an embedded map.

PAGE 2 - PROGRAMS
One page, four anchored sections with sticky in-page navigation (First-Time Owner Safety Course, License & Permit Prep, Beginner Fundamentals, Safe Storage & Home Safety Workshop). For each: a question-form heading like "What happens in the first-time owner safety course?", then a direct 2-3 sentence answer FIRST, then details (class size, duration, what is provided, range rules covered), then the honest price from BUSINESS DETAILS, then a 3-question FAQ, then a "Reserve a Seat" button.

PAGE 3 - SAFETY READINESS QUIZ (the most important page)
A beautiful full-screen multi-step quiz called "The 60-Second Safety Readiness Check". One question per step, large tappable answer cards with simple icons, selected state in green, auto-advance on selection, an animated progress bar, back navigation, smooth slide transitions. Questions in order:
1. What best describes you? (Completely new - never handled a firearm / New owner who wants proper safety training / Preparing for a license or permit / Returning after years away / Researching for a family member)
2. What is your main goal? (Safe storage and home safety / A license or permit / Learning fundamentals properly / General knowledge and confidence)
3. How comfortable do you feel right now? (Comfortable, just need instruction / A little nervous / Very nervous / Honestly intimidated)
4. What class format do you prefer? (Small group class / Private one-on-one / Women's intro session / No preference)
5. What questions or concerns do you most want a course to address? (open text)
6. How soon do you want to get started? (ASAP / This month / Just researching)
Then a capture step BEFORE any results, titled "Almost done - where should we send your personalized safety training plan?" collecting name, email, phone. Then a results step: a warm 3-4 sentence tailored recommendation based on the answer to question 1 (write one result template for each of the 5 paths), each reassuring the student that beginners are the specialty and each ending with the booking calendar embedded right there on the page. Tag every quiz lead "quiz-lead" in the CRM.

PAGE 4 - COURSE PRICING (the lead magnet)
Headline: "Clear course prices - published up front, no surprises." An interactive instant-estimate tool built as a short multi-step form: step 1 choose a course (first-time owner safety / license and permit prep / beginner fundamentals / safe storage workshop / not sure), step 2 one qualifier - group class or private session, step 3 timing, then a capture step (name and email), then show the honest price from BUSINESS DETAILS with a note about what is included, and a "Reserve a Seat" button. After the price, add one reassuring line: "Every course includes all safety equipment and patient, judgment-free instruction - you never need to bring or buy anything to start." Below the tool: what every course includes (loaner equipment, eye and ear protection, printed safety materials), class size limits, and a 4-question FAQ. Tag these leads "quote-lead".

PAGE 5 - ABOUT
The lead instructor's story told warmly in first person using the facts in BUSINESS DETAILS (2-3 short paragraphs) with safety education as the heart of the story, instructor photos with names and certifications, an "Our promises" section with 3 items (safety rules come before anything touches your hands / no question is a dumb question / small classes, never rushed - adjust to the school's real promises), photos of the classroom, and only the certifications and licenses listed in BUSINESS DETAILS.

PAGE 6 - CONTACT / BOOK
The embedded course booking calendar as the hero of the page, plus click-to-call phone, address with embedded map, hours, parking note, and a short message form for questions.

GLOBAL REQUIREMENTS
Sticky header on every page: logo left, page links, phone number, and a green "Book a Course" button always visible; clean hamburger menu on mobile with the button still visible. Floating "Book" button bottom-right on mobile that never covers content. Footer on every page: business name, address, and phone written EXACTLY as in BUSINESS DETAILS, hours, quick links, reviews link, privacy policy. Every form and the quiz must create contacts in the CRM with the tags specified. Mobile-first: every section must look intentional on a phone, buttons thumb-sized, the quiz perfectly usable one-handed. Accessibility: strong contrast, alt text, visible focus states. SEO: unique page title and meta description per page mentioning the city; add LocalBusiness schema with the exact name, address, phone and hours, and FAQ schema on the FAQ sections. Rewrite any sentence that could appear on any training school's website into something specific to this school using the details below; if you cannot make a claim specific, flag it for me instead of keeping it generic.

=====================================================
BUSINESS DETAILS
(Pre-filled with fictional demo data so the prompt works
as-is for demos and portfolio builds. For a real client,
replace every line below with their real information -
whatever you leave unchanged will appear on the site.)
=====================================================

School name: Ridgeline Firearm Safety Academy
Type of school: licensed firearms safety training - safety courses, license prep, beginner fundamentals
City and area: Brookfield, west of the county fairgrounds
Exact business name, address, phone for the footer (must match the Google Business Profile exactly): Ridgeline Firearm Safety Academy, 3400 County Line Road, Brookfield, (555) 906-5512
Hours: Wed-Fri 10am-7pm, Sat-Sun 9am-4pm, closed Mon-Tue
Parking note: Free on-site parking at the main entrance

Lead instructor name: Paul Whitman
3 facts for the About story: 18 years teaching firearm safety, began as a hunter education volunteer, built the academy around the classes he wished existed when he was a nervous beginner
Team members (names and roles): Instructor Dana (women's intro sessions and fundamentals), Instructor Luis (license and permit prep), Carol (scheduling)
Real credentials: nationally certified firearms safety instructors, state-certified concealed-carry course provider, certified range safety officers, fully licensed and insured facility

Google rating and review count (real numbers): 5.0 stars, 168 reviews
Years teaching: 18 years
Students certified and completion stat: 4,500+ students certified; 98% course completion rate
3 real differentiators: beginner-only sessions with a maximum of 6 students, all safety equipment provided including eye and ear protection, patient judgment-free instruction with safety rules taught before anything else
3 real reviews to quote (first names only): "I was shaking when I arrived. Paul spent 20 extra minutes on safety basics until I felt ready. Zero judgment." - Susan / "The women's intro class with Dana was exactly the calm first step I needed." - Renee / "Passed my permit exam first try. The class was thorough and incredibly professional." - Greg

Payment plan line: courses are pay-per-class; the 4-week beginner series can be split into two payments
Price ranges (these get published):
- First-time owner safety course (3 hours): $89
- License & permit prep course: $150
- Beginner fundamentals private session (90 min): $120
- Women's intro to safe handling: $99
- Safe storage & home safety workshop: $49
- 4-week beginner series: $349

Booking calendar name (in the CRM): Safety Course Booking
Pipeline or workflow that quiz/quote leads should route into: New Leads pipeline, stage "Quiz/Quote Lead"
Brand colors, if any (otherwise the forest green palette above is used): use the palette above
Logo available? (yes/no): no - create a simple clean wordmark`,
};
