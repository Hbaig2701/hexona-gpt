// Link-based vault content. Industry Templates is not here; it renders as a
// tile grid from industries.ts. Anything without a `url` renders as an
// "Adding soon" row, so sections can ship before every link exists.

export type VaultLink = {
  title: string;
  note?: string;
  url?: string;
};

export type VaultLinkGroup = {
  heading?: string;
  links: VaultLink[];
};

export const LICENSEE_AUTOMATIONS: VaultLink = {
  title: "Licensee Automations",
  note: "Spreadsheet of setup guides and one-click import links",
  url: "https://docs.google.com/spreadsheets/d/1mhOIsJ_fpGYFCDHpoJ7vmvaYQx05qbmgpq9yo03Zepw/edit?usp=sharing",
};

export const FUNNEL_SNAPSHOTS: VaultLink = {
  title: "Funnel Template Snapshots",
  note: "10+ funnels you can import straight into HighLevel, free",
  url: "https://docs.google.com/spreadsheets/d/1VodxdHNTlC7PZPYd4zgwi0PmNtIq_iRuWDxjZYRZIYI/edit?usp=sharing",
};

export const AI_PROMPT_GROUPS: VaultLinkGroup[] = [
  {
    heading: "Ask AI Prompts",
    links: [
      {
        title: "Lead Scraping Prompt",
        url: "https://docs.google.com/document/d/1gn0_sppBIhVFZKBai_Cf73S6GNPCY9EJIwSEjfbyijU/edit?tab=t.0",
      },
      {
        title: "Automatic Social Media Content",
        url: "https://docs.google.com/document/d/1XpH81Aze1fC_8DT-KIIbv4lllD5C5JDuoOSEHFd8e48/edit?tab=t.0",
      },
      {
        title: "Control GHL From Your Phone",
        url: "https://docs.google.com/document/d/1e6kmnO32Rm5KQAkowEZUoU8QWZwHddixjVgZmTbZV70/edit?tab=t.0",
      },
      {
        title: "Self-Improving Website",
        url: "https://docs.google.com/document/d/1hrF6cDxIYUb41wC_DjKhMv2ptWvaAW3VOuR4tsfkP-4/edit?tab=t.0",
      },
    ],
  },
  {
    heading: "Prompting Guides",
    links: [
      {
        title: "Overall Prompt Guide",
        note: "Start here for the full prompting walkthrough",
        url: "https://docs.google.com/document/d/1szIexvsSbhG1h4vKp-ra72hlo3u5RCpFRkTo47L8JDk/edit?tab=t.0",
      },
      {
        title: "New Website Prompt",
        note: "Paste into AI Studio",
        url: "https://docs.google.com/document/d/18eo3Q-B3_mf0emjsCVrTBalLDJZEaVz1vvxV4ClfvUQ/edit?tab=t.0",
      },
    ],
  },
  {
    heading: "Voice AI",
    links: [
      {
        title: "Pizza Order Taking Bot",
        url: "https://docs.google.com/document/d/1tPOYWRmK_33Z47mXIILWHlgANymH62PXU_sc71OlfGI/edit?usp=sharing",
      },
      {
        title: "AirBnB Bot",
        url: "https://docs.google.com/document/d/1MUrcAaWYN4NsdGDSmevSx3rEpWUqtZvgScMR-gqPLq8/edit?usp=sharing",
      },
      {
        title: "Law Firm Bot",
        url: "https://docs.google.com/document/d/1YlvQUh5B_CW286Hj_8wPAzFFTFLfzrYwsAF2R8CRsro/edit?usp=sharing",
      },
    ],
  },
  {
    heading: "Conversational AI",
    links: [
      {
        title: "Text AirBnB Bot",
        url: "https://docs.google.com/document/d/1wQlYpNj0Yemef1r-TU3LpflxGhZWNNPbOIpnykN5hU4/edit?tab=t.0",
      },
      {
        title: "Dentist Appointment Setting Chatbot",
        url: "https://docs.google.com/document/d/111kwrrY23W5OOjFx2D4-7RTZ8j5CMAJ7pF96mLA2UM4/edit?usp=sharing",
      },
    ],
  },
];

// The flowcharts are deep links into a single tldraw board; each ?d= fragment
// frames a different automation map on that same canvas.
const TLDRAW_BOARD = "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK";

export const GUIDE_GROUPS: VaultLinkGroup[] = [
  {
    links: [
      { title: "Written Guides" },
      {
        title: "Youtube Strategy Masterclass",
        note: "Using YouTube to build authority and generate inbound leads",
        url: "https://drive.google.com/file/d/126kPhY_00OfmejectgeuCYU7pOypazjH/view?usp=sharing",
      },
    ],
  },
  {
    heading: "Discovery Calls",
    links: [
      {
        title: "Discovery Call Question Bank",
        note: "The exact questions to ask to qualify and set up the close",
        url: "https://docs.google.com/document/d/1tZ35sqg_jT2AZvg4MsBmRfEPqvSKFrIPTTXFzjo4FWY/edit?tab=t.dl4cceye4kgf#heading=h.cjw5blur3cgj",
      },
      {
        title: "Bakery Discovery Call",
        note: "Full recording of a real discovery call",
        url: "https://drive.google.com/file/d/1GcN93bVzi1BSGAqMY3afvmrSQO76Y7ct/view?usp=sharing",
      },
      {
        title: "Daycare Discovery Call",
        note: "Full recording of a real discovery call",
        url: "https://drive.google.com/file/d/1Hw8bl497MUPWD09raTL-nZIRHLZxKkWo/view?usp=sharing",
      },
    ],
  },
  {
    heading: "Process Mapping Flowcharts",
    links: [
      {
        title: "Call Centre",
        url: `${TLDRAW_BOARD}?d=v-2580.-2639.7206.4031.thQ_L1DHoTH8MfVchc_kA`,
      },
      {
        title: "Restaurant Automation",
        url: `${TLDRAW_BOARD}?d=v-3773.-1456.10361.5795.6zUHX-Ize8SlfNEQpUTpB`,
      },
      {
        title: "Medspa Automation",
        url: `${TLDRAW_BOARD}?d=v-4575.-4446.13940.7797.sj03l_FFA-Qe8Uc0rijqe`,
      },
      {
        title: "Real Estate Automation",
        url: `${TLDRAW_BOARD}?d=v-3977.-2101.9026.5048.t62prFjAx2xvxSRDZ_B93`,
      },
      {
        title: "Influencer Automation",
        url: `${TLDRAW_BOARD}?d=v-2195.-1115.6457.3612.vHwQGC-sOg0zjsBF6saJb`,
      },
      {
        title: "Chiropractor Automation",
        url: `${TLDRAW_BOARD}?d=v-2786.-2942.7446.4165.V1aLYDHpCbT1DDXaA-Olc`,
      },
    ],
  },
];

export const BUSINESS_GROUPS: VaultLinkGroup[] = [
  {
    heading: "Contracts and Agreements",
    links: [
      {
        title: "Sample Service Agreement #1",
        url: "https://drive.google.com/file/d/1xqoZJj3iJJu22R0rGm-wnix2ylKiT3V_/view?usp=sharing",
      },
      {
        title: "Sample Service Agreement #2",
        url: "https://drive.google.com/file/d/1Hfq7B07hzepguuMudU7n9JgkSSzzyk17/view?usp=sharing",
      },
      {
        title: "Contract Samples, Voice AI Receptionist",
        url: "https://docs.google.com/document/d/11mTnhGFNElg8TdLgMEdwLjNukyCP863ug5OrYYM0BSo/edit?usp=sharing",
      },
      {
        title: "Contracts and Proposal Templates",
        note: "Full folder, including sample client proposals",
        url: "https://drive.google.com/drive/folders/19Mxqb9mHvM9hi313SCPGBD5y-nvB2zIk",
      },
    ],
  },
  {
    heading: "Calculators and Ideas",
    links: [
      { title: "Missed Call Text Back ROI Calculator" },
      { title: "Bonus Business Ideas" },
    ],
  },
];

const FATHOM = "https://fathom.video/share";

/** A recurring live call: a standing time plus a join link and an RSVP link. */
export type VaultCall = {
  title: string;
  cadence: string;
  note?: string;
  joinUrl: string;
  rsvpUrl: string;
  rsvpLabel: string;
  /** Google Calendar recurring-series id. Reference only, never rendered. */
  seriesId: string;
};

export const LIVE_CALLS: VaultCall[] = [
  {
    title: "Onboarding Call",
    cadence: "Wednesdays, 2:00 to 3:00 PM EST",
    note: "One time only. You are added to a single week.",
    joinUrl: "https://meet.google.com/gua-kpsc-ifn",
    // Each person's onboarding invite lands in a different week, so there is no
    // one shared event link. This searches their calendar for their own invite.
    rsvpUrl:
      "https://calendar.google.com/calendar/r/search?q=Hexona%20Licensee%20Onboarding",
    rsvpLabel: "Find My Invite",
    seriesId: "7tf5tg4o8cic4jpot66d09r0mh",
  },
  {
    title: "Wednesday Workshop",
    cadence: "Wednesdays, 12:00 PM EST",
    joinUrl: "https://meet.google.com/rah-fqxz-pia",
    rsvpUrl:
      "https://www.google.com/calendar/event?eid=NmdxN3FtNzBmdDBkdWdkaW44bGpzbXU1MjMgaGFtemFAaGV4b25hc3lzdGVtcy5jb20",
    rsvpLabel: "View Invite & RSVP",
    seriesId: "6gq7qm70ft0dugdin8ljsmu523",
  },
  {
    title: "Friday Q&A",
    cadence: "Fridays, 4:00 PM EST",
    joinUrl: "https://meet.google.com/hjf-zvks-pti",
    rsvpUrl:
      "https://www.google.com/calendar/event?eid=M2V0bWlsM2hzcHQ4bzluYnQxbHJyaWhwcW0gaGFtemFAaGV4b25hc3lzdGVtcy5jb20",
    rsvpLabel: "View Invite & RSVP",
    seriesId: "3etmil3hspt8o9nbt1lrrihpqm",
  },
];

export const COACHING_GROUPS: VaultLinkGroup[] = [
  {
    heading: "Recordings",
    links: [
      {
        title: "Hexona Systems Onboarding Calls",
        url: `${FATHOM}/EeJuurtMM6gtWs8sjkxBiNsgxR3d3UN6`,
      },
      {
        title: "September 23, 2026",
        url: `${FATHOM}/bQxdZRukwtqhwq6kstaaJRiXicxs4EG1`,
      },
      {
        title: "September 18, 2026",
        url: `${FATHOM}/T6Svz183oAfgm3Mtg2o1LkFGd5rUX8tw`,
      },
      {
        title: "September 11, 2026",
        url: `${FATHOM}/KGj32QNQ2HzvdzXo43iWprDzsvnW6KwD`,
      },
      {
        title: "August 14, 2026",
        url: `${FATHOM}/864xVNt3cYyAC_zxsMxaLf1oDprav8y5`,
      },
      {
        title: "August 7, 2026",
        url: `${FATHOM}/uExpc8dMDSF3zq8Fxcmdt2nEx1FHoPzy`,
      },
      {
        title: "July 24, 2026",
        url: `${FATHOM}/gCyLE3o4GgBuEVSNHY72GkCeNzszGsxt`,
      },
    ],
  },
];

// Cold call recordings live in one public Drive folder (anyone with the link
// can read), linked file by file. Titles match the source filenames exactly,
// and the blank-line grouping of the source list is kept as untitled groups.
const DRIVE_FILE = "https://drive.google.com/file/d";

export const COLD_CALL_INTRO =
  "Here is a library of good cold calls, fails, objections handled and follow ups. Please note that this library is a compilation of my team, sales reps, content creators, coaches and other agency owners etc.";

export const COLD_CALL_GROUPS: VaultLinkGroup[] = [
  {
    links: [
      {
        title: "Pitching Voice AI to Junk Removal Company",
        url: `${DRIVE_FILE}/1wW5Yi54J2s7K_oCX4vBF-CTUmMWRF65N/view`,
      },
      {
        title: "Waste Management Voice AI Cold Call",
        url: `${DRIVE_FILE}/1tgrXfCgG2QLjsBYpeTikb_I_X-HBRHxO/view`,
      },
    ],
  },
  {
    links: [
      {
        title: "Objection Handling \"We don't need this right now\"",
        url: `${DRIVE_FILE}/1PCBNa4J0JLeRoqOFamQMX3pb9A8pSquD/view`,
      },
      {
        title: "Objection Handling \"I tried this before and it sucked\"",
        url: `${DRIVE_FILE}/1rk3QFLzHsxzhVwUnK4WLwQn2gQIXX8Rj/view`,
      },
      {
        title: "Objection Handling \"Not Enough Calls\"",
        url: `${DRIVE_FILE}/17CkuUAxW-TlUx_pegBNc8QWKL6M284Pp/view`,
      },
      {
        title: "Double Objection Handling Selling Voice AI",
        url: `${DRIVE_FILE}/1kj0iO76h5gtRz9V5EzCnmbvEpyeGXn-H/view`,
      },
      {
        title: "Objection Handling \"People won't like talking to AI\"",
        url: `${DRIVE_FILE}/1jDwJa6lnqO5BGXYSQuP79CvH0Ibww_Hq/view`,
      },
    ],
  },
  {
    links: [
      {
        title: "FAILED CALL - Hung Up Example #2",
        url: `${DRIVE_FILE}/1I-f9EoPsMC-vb6iZSOi1dPv1WqVb8H2Y/view`,
      },
      {
        title: "FAILED CALL - Hung up example (it happens lol)",
        url: `${DRIVE_FILE}/1kgLEBLvrn--gSBCvS8kPH8WhvVPBxMDM/view`,
      },
    ],
  },
  {
    links: [
      {
        title: "Follow Up Call After No-Show",
        url: `${DRIVE_FILE}/17j1I4ZHqhHBW-7pEFmf_CpkR5OzQurgK/view`,
      },
      {
        title: "Voicemail Example if someone tries your demo",
        url: `${DRIVE_FILE}/1N95TXfemL0W79Jw6ihoiita1vb4hpcVI/view`,
      },
    ],
  },
];

export const SUPPORT_GROUPS: VaultLinkGroup[] = [
  {
    links: [
      { title: "A2P Registration Specialists" },
      { title: "Dedicated Support" },
    ],
  },
];
