import "dotenv/config";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const flowchartItems = [
  {
    title: "Call Centre",
    links: [
      {
        label: "View flowchart",
        url: "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK?d=v-2580.-2639.7206.4031.thQ_L1DHoTH8MfVchc_kA",
      },
    ],
  },
  {
    title: "Restaurant Automation",
    links: [
      {
        label: "View flowchart",
        url: "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK?d=v-3773.-1456.10361.5795.6zUHX-Ize8SlfNEQpUTpB",
      },
    ],
  },
  {
    title: "Medspa Automation",
    links: [
      {
        label: "View flowchart",
        url: "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK?d=v-4575.-4446.13940.7797.sj03l_FFA-Qe8Uc0rijqe",
      },
    ],
  },
  {
    title: "Real Estate Automation",
    links: [
      {
        label: "View flowchart",
        url: "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK?d=v-3977.-2101.9026.5048.t62prFjAx2xvxSRDZ_B93",
      },
    ],
  },
  {
    title: "Influencer Automation",
    links: [
      {
        label: "View flowchart",
        url: "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK?d=v-2195.-1115.6457.3612.vHwQGC-sOg0zjsBF6saJb",
      },
    ],
  },
  {
    title: "Chiropractor Automation",
    links: [
      {
        label: "View flowchart",
        url: "https://www.tldraw.com/f/r8BBqDfnmweE4SvUgm_TK?d=v-2786.-2942.7446.4165.V1aLYDHpCbT1DDXaA-Olc",
      },
    ],
  },
];

const promptItems = [
  {
    title: "Voice Pizza Order Taking Bot",
    description: "Voice AI prompt for taking pizza orders.",
    links: [
      {
        label: "Open prompt",
        url: "https://docs.google.com/document/d/1tPOYWRmK_33Z47mXIILWHlgANymH62PXU_sc71OlfGI/edit?usp=sharing",
      },
    ],
  },
  {
    title: "Voice AirBnB Bot",
    description: "Voice AI prompt for AirBnB-style hospitality.",
    links: [
      {
        label: "Open prompt",
        url: "https://docs.google.com/document/d/1MUrcAaWYN4NsdGDSmevSx3rEpWUqtZvgScMR-gqPLq8/edit?usp=sharing",
      },
    ],
  },
  {
    title: "Text AirBnB Bot",
    description: "Text/chat AI prompt for AirBnB-style hospitality.",
    links: [
      {
        label: "Open prompt",
        url: "https://docs.google.com/document/d/1wQlYpNj0Yemef1r-TU3LpflxGhZWNNPbOIpnykN5hU4/edit?tab=t.0",
      },
    ],
  },
  {
    title: "Dentist Appointment Setting Chatbot",
    description: "Chatbot prompt for booking dental appointments.",
    links: [
      {
        label: "Open prompt",
        url: "https://docs.google.com/document/d/111kwrrY23W5OOjFx2D4-7RTZ8j5CMAJ7pF96mLA2UM4/edit?usp=sharing",
      },
    ],
  },
  {
    title: "More prompts library",
    description: "Spreadsheet with additional AI prompts.",
    links: [
      {
        label: "Open spreadsheet",
        url: "https://docs.google.com/spreadsheets/d/1mhOIsJ_fpGYFCDHpoJ7vmvaYQx05qbmgpq9yo03Zepw/edit?gid=0#gid=0",
      },
    ],
  },
];

async function main() {
  // 1) Hamza's Flowcharts → List
  await prisma.resource.update({
    where: { slug: "hamzas-flowcharts" },
    data: {
      description: "Call-flow and automation flowcharts by niche.",
      url: "",
      tableData: Prisma.JsonNull,
      listData: { items: flowchartItems },
    },
  });
  console.log(`✓ Updated Hamza's Flowcharts (${flowchartItems.length} items)`);

  // 2) Sample AI Prompts → List
  await prisma.resource.update({
    where: { slug: "sample-ai-prompts" },
    data: {
      description: "Production-ready AI prompts for voice and chat agents.",
      url: "",
      tableData: Prisma.JsonNull,
      listData: { items: promptItems },
    },
  });
  console.log(`✓ Updated Sample AI Prompts (${promptItems.length} items)`);

  // 3) Proposal Directory → External link
  await prisma.resource.update({
    where: { slug: "proposal-directory" },
    data: {
      description:
        "If you're interested in seeing some of the proposals we do for our agency, you can browse this library and use it for inspiration.",
      url: "https://docs.google.com/spreadsheets/d/1hVa9k9HKQYocgvdO490iNGqbJ_Vrlx6r3YsV1YwXODo/edit?usp=sharing",
      listData: Prisma.JsonNull,
      tableData: Prisma.JsonNull,
    },
  });
  console.log("✓ Updated Proposal Directory (external link)");

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
