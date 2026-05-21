import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

const headers = [
  "Niche",
  "Avg LTV",
  "Deal Size",
  "Missed Lead $",
  "US TAM",
  "Buyer",
  "On LinkedIn",
  "Saturation",
];

const rows: string[][] = [
  ["Private Dental Clinics (Cosmetic-focused)", "$3,500", "$4,500", "$1,500", "18,000", "Owner", "Yes", "Medium"],
  ["Med Spas (Injectables Only)", "$4,000", "$6,000", "$2,000", "12,000", "Owner", "Yes", "Medium"],
  ["Plastic Surgery Clinics (Elective)", "$8,000", "$15,000", "$5,000", "7,500", "Owner", "Yes", "Medium"],
  ["Personal Injury Law Firms (Auto Accidents)", "$12,000", "$25,000", "$7,000", "9,000", "Partner", "Yes", "High"],
  ["Immigration Law Firms (Employment Visas)", "$6,000", "$9,000", "$3,000", "6,500", "Partner", "Yes", "Medium"],
  ["Luxury Real Estate Brokers ($5M+ Homes)", "$10,000", "$20,000", "$4,000", "8,000", "Owner", "Yes", "Medium"],
  ["Commercial Real Estate Brokers (Industrial)", "$15,000", "$30,000", "$6,000", "6,200", "Partner", "Yes", "Medium"],
  ["High-End Roofing Companies (Insurance Claims)", "$9,000", "$14,000", "$3,500", "14,000", "Owner", "Sometimes", "Low"],
  ["Home Remodeling Companies (Kitchens Only)", "$12,000", "$18,000", "$4,000", "11,000", "Owner", "Sometimes", "Medium"],
  ["IV Therapy Clinics (Mobile IV)", "$3,000", "$5,000", "$1,200", "9,000", "Owner", "Yes", "Low"],
  ["Hair Transplant Clinics (FUE Only)", "$7,000", "$12,000", "$4,500", "4,500", "Owner", "Yes", "Medium"],
  ["Aesthetic Dermatology Clinics (Laser)", "$6,000", "$10,000", "$3,500", "7,000", "Owner", "Yes", "Medium"],
  ["Mortgage Brokerages (Non-QM Loans)", "$5,000", "$8,000", "$2,500", "5,200", "Owner", "Yes", "Medium"],
  ["Accounting Firms (Ecommerce Clients)", "$4,000", "$7,000", "$2,000", "16,000", "Partner", "Yes", "Medium"],
  ["Financial Advisory Firms (High-Net-Worth)", "$10,000", "$15,000", "$4,000", "11,000", "Partner", "Yes", "Medium"],
  ["B2B SaaS Sales Teams (Outbound-led)", "$20,000", "$50,000", "$8,000", "8,500", "VP Sales", "Yes", "High"],
  ["Managed IT Providers (Healthcare)", "$6,000", "$9,000", "$3,000", "7,200", "Owner", "Yes", "Medium"],
  ["Recruitment Agencies (Tech Contractors)", "$8,000", "$12,000", "$3,500", "6,800", "Owner", "Yes", "Medium"],
  ["High-Ticket Coaches (Business Mastermind)", "$7,000", "$15,000", "$4,000", "14,000", "Founder", "Yes", "Medium"],
  ["Online Course Creators ($1M+/yr)", "$5,000", "$10,000", "$3,000", "9,000", "Founder", "Yes", "Medium"],
  ["Luxury Auto Dealerships (Exotics)", "$15,000", "$40,000", "$6,000", "3,200", "GM/Owner", "Sometimes", "High"],
  ["Commercial Solar Installers (Warehouses)", "$25,000", "$60,000", "$10,000", "4,100", "Owner", "Sometimes", "Low"],
  ["Logistics Brokers (Cross-Border)", "$8,000", "$12,000", "$4,000", "5,600", "Owner", "Yes", "Medium"],
  ["Property Managers (Multifamily 50+ Units)", "$6,000", "$9,000", "$2,500", "18,000", "Owner", "Yes", "Medium"],
  ["Veterinary Specialty Clinics (Orthopedic)", "$5,000", "$8,000", "$2,000", "4,200", "Owner", "Sometimes", "Low"],
  ["Private Healthcare Clinics (Cash-Pay)", "$9,000", "$15,000", "$5,000", "8,300", "Owner", "Yes", "Medium"],
  ["Construction PM Firms (Commercial)", "$12,000", "$20,000", "$5,000", "6,000", "Owner", "Sometimes", "Low"],
  ["HR & Payroll Firms (PE-backed SMBs)", "$8,000", "$12,000", "$3,500", "4,800", "Partner", "Yes", "Medium"],
  ["Enterprise Training Providers (Sales Enablement)", "$15,000", "$30,000", "$6,000", "3,900", "Director", "Yes", "Low"],
  ["Orthodontic Chains (Multi-location)", "$6,000", "$9,000", "$3,000", "5,200", "Owner", "Yes", "Medium"],
  ["Fertility Clinics (IVF)", "$12,000", "$25,000", "$8,000", "500", "Medical Director", "Yes", "Low"],
  ["Addiction Treatment Centers (Private Pay)", "$15,000", "$30,000", "$10,000", "2,300", "CEO", "Yes", "Low"],
  ["Luxury Home Builders ($2M+ Homes)", "$25,000", "$50,000", "$12,000", "4,500", "Owner", "Sometimes", "Low"],
  ["Water Damage Restoration (Emergency)", "$8,000", "$12,000", "$5,000", "13,000", "Owner", "Sometimes", "Medium"],
  ["Commercial HVAC Installers", "$15,000", "$30,000", "$8,000", "7,200", "Owner", "Sometimes", "Low"],
  ["Foundation Repair Companies", "$12,000", "$20,000", "$7,000", "6,000", "Owner", "Sometimes", "Low"],
  ["Executive Coaching Firms", "$10,000", "$20,000", "$5,000", "9,000", "Founder", "Yes", "Medium"],
  ["Boutique Investment Banks (Lower MM)", "$50,000", "$100,000", "$25,000", "800", "Partner", "Yes", "Low"],
  ["M&A Advisory Firms (SMB)", "$30,000", "$75,000", "$20,000", "2,500", "Partner", "Yes", "Low"],
  ["Private Aviation Charter Brokers", "$25,000", "$60,000", "$15,000", "1,200", "Founder", "Yes", "Low"],
  ["Yacht Brokerage Firms", "$30,000", "$80,000", "$20,000", "900", "Owner", "Yes", "Low"],
  ["Luxury Travel Agencies (Custom Itineraries)", "$8,000", "$15,000", "$5,000", "4,000", "Owner", "Yes", "Low"],
  ["Private Security Firms (Executive Protection)", "$20,000", "$40,000", "$15,000", "1,800", "Owner", "Yes", "Low"],
  ["Shopify Dev Agencies ($1M+ Rev)", "$10,000", "$20,000", "$6,000", "7,000", "Founder", "Yes", "Medium"],
  ["Ecommerce Aggregators (FBA)", "$40,000", "$100,000", "$30,000", "600", "Partner", "Yes", "Low"],
  ["Luxury Event Planners (Weddings $100k+)", "$15,000", "$30,000", "$10,000", "2,200", "Founder", "Yes", "Low"],
  ["Concierge Medical Practices", "$12,000", "$25,000", "$8,000", "3,000", "Physician Owner", "Yes", "Low"],
  ["Private Schools (Tuition $25k+)", "$20,000", "$40,000", "$10,000", "3,500", "Head of School", "Yes", "Low"],
  ["Specialty Legal Firms (Class Action)", "$30,000", "$80,000", "$20,000", "2,000", "Partner", "Yes", "Low"],
];

async function main() {
  const tableData = { headers, rows };

  const lesson = await prisma.lesson.findFirst({ where: { slug: "golden-niches" } });
  if (!lesson) {
    console.error("Golden Niches lesson not found. Run seed first.");
    process.exit(1);
  }

  await prisma.lesson.update({
    where: { id: lesson.id },
    data: {
      type: "TABLE",
      externalUrl: null,
      tableData,
      description:
        "Curated list of high-potential niches with deal size, customer value, and AI agency saturation data. Search and sort to find a fit for your firm.",
    },
  });

  console.log(`Populated golden-niches with ${rows.length} rows × ${headers.length} columns`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
