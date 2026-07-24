// Industry snapshot catalog for the public /resource-vault page.
// Transcribed from 100_Snapshot_Vault_with_links.csv (names kept as provided,
// minus the " Snapshot" suffix). websitePromptUrl is null until links exist —
// the UI shows "Coming soon" for those.

export interface VaultIndustry {
  name: string;
  emoji: string;
  snapshotUrl: string;
  websitePromptUrl: string | null;
}

export interface VaultCategory {
  heading: string;
  items: VaultIndustry[];
}

const A = "https://affiliates.gohighlevel.com/?fp_ref=theseanfaber&share=";
const H = "https://affiliates.gohighlevel.com/?fp_ref=hlprotools&share=";
const IMPORT = "https://app.gohighlevel.com/settings/snapshot/import/";

export const VAULT_CATEGORIES: VaultCategory[] = [
  {
    heading: "Tax and Financial Services",
    items: [
      { name: "Tax Preparation", emoji: "🧾", snapshotUrl: `${A}Busn1RdhR08Qlkw2eVeo`, websitePromptUrl: null },
      { name: "Financial Advisor", emoji: "📈", snapshotUrl: `${A}S1EN5Nqz387Edm1WVCi2`, websitePromptUrl: null },
      { name: "Mortgage Marketing Masterclass", emoji: "🏦", snapshotUrl: `${A}7FkZmXp5l5JC7oP9YvIM`, websitePromptUrl: null },
      { name: "Annuities & IUL", emoji: "🛡️", snapshotUrl: `${H}0soxtrr6yoq1oDFFcSaQ`, websitePromptUrl: null },
      { name: "Tax Preperation (Direct Import)", emoji: "📥", snapshotUrl: `${IMPORT}4cKYeBer1B2nqNNRc6xT`, websitePromptUrl: null },
      { name: "Capital Raising", emoji: "💰", snapshotUrl: `${H}UEuZXZNwaMoQY1eusKtS`, websitePromptUrl: null },
      { name: "Mortgage Broker", emoji: "🏠", snapshotUrl: `${H}oyhPZl1rZVvFHkxAJZXD`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Home Improvement and Handyman",
    items: [
      { name: "Home Improvement and Handyman", emoji: "🔨", snapshotUrl: `${A}a2zVXu2JXRbdpwOvkYI%209`, websitePromptUrl: null },
      { name: "Stamping", emoji: "🧱", snapshotUrl: `${A}Cw1MJL7vGEaE4ITN9Yj%209`, websitePromptUrl: null },
      { name: "Lifting / Leveling", emoji: "🏗️", snapshotUrl: `${H}0soxtrr6yoq1oDFFcSaQ`, websitePromptUrl: null },
      { name: "CDL Job Training", emoji: "🚛", snapshotUrl: `${A}ScyBXc6B4DkAaZRsufh%20f`, websitePromptUrl: null },
      { name: "Mobile Oil Change", emoji: "🛢️", snapshotUrl: `${A}TBig3BmKqRG1yrOV4Iq6`, websitePromptUrl: null },
      { name: "Vehicle Wrapping", emoji: "🚗", snapshotUrl: `${A}fhjKNwdWB9Plq6ryhzps`, websitePromptUrl: null },
      { name: "Motorcycle Repair", emoji: "🏍️", snapshotUrl: `${A}1Hpe65ogn4X6iPBnzZHO`, websitePromptUrl: null },
      { name: "Painting Company", emoji: "🎨", snapshotUrl: `${H}l9B4gVokTkIkB0J5xNDB`, websitePromptUrl: null },
      { name: "Interior Design", emoji: "🛋️", snapshotUrl: `${H}3309ehw6TPwlNujVWs8a`, websitePromptUrl: null },
      { name: "Door and Window Distributor", emoji: "🚪", snapshotUrl: `${H}3oYDpmWrAQPWUAgdlfYy`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Home Exterior Services",
    items: [
      { name: "Gutter Installation", emoji: "🌧️", snapshotUrl: `${A}PicyRLkREcO1j0otVWAM`, websitePromptUrl: null },
      { name: "Seamless Gutter", emoji: "🏘️", snapshotUrl: `${A}uKj614NBB7isQf6k9k5V`, websitePromptUrl: null },
      { name: "Spray Foam Installation", emoji: "🧯", snapshotUrl: `${A}OaULsVwOFVCWgCqRq32R`, websitePromptUrl: null },
      { name: "Roofing", emoji: "🏚️", snapshotUrl: `${A}DAWhulucyzln9JxMXngU`, websitePromptUrl: null },
      { name: "Blind Installation", emoji: "🪟", snapshotUrl: `${A}uTqlxCT43DZJQoMugr6J`, websitePromptUrl: null },
      { name: "Auto Detailing", emoji: "✨", snapshotUrl: `${H}qro2BpgspOweSbJZlIS7`, websitePromptUrl: null },
      { name: "Cleaning Company", emoji: "🧼", snapshotUrl: `${H}7kxM8k56oVpQv25TOVX5`, websitePromptUrl: null },
      { name: "Sign Company", emoji: "🪧", snapshotUrl: `${H}Kmz3silQc8si3DQWYYd7`, websitePromptUrl: null },
      { name: "Home Restoration", emoji: "🛠️", snapshotUrl: `${H}LaCupkanyWQ13yQ8T8Bj`, websitePromptUrl: null },
      { name: "Decking Contractor", emoji: "🪵", snapshotUrl: `${H}zSRdzNjeDOH3ZYo0pBDS`, websitePromptUrl: null },
      { name: "Tree Trimming", emoji: "🌳", snapshotUrl: `${H}0mDylXCFXrPEEtpA4YEb`, websitePromptUrl: null },
      { name: "Home Remediation", emoji: "🏡", snapshotUrl: `${H}0soxtrr6yoq1oDFFcSaQ`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Cleaning Services",
    items: [
      { name: "Chimney", emoji: "🧹", snapshotUrl: `${A}T3zmXFKxMtp84PMqTz1F`, websitePromptUrl: null },
      { name: "Garbage Rubbish Removal", emoji: "🗑️", snapshotUrl: `${A}MjV7DIMrBXKKzsLRv2gH`, websitePromptUrl: null },
      { name: "Pressure Washing", emoji: "💦", snapshotUrl: `${A}mWqxcyXYjJrPhSIMhov0`, websitePromptUrl: null },
      { name: "Window", emoji: "🪟", snapshotUrl: `${A}D8wSbNN8hrNO6EkDr9gp`, websitePromptUrl: null },
      { name: "Mold Remediation", emoji: "🦠", snapshotUrl: `${A}rZ7HxGpcZVmKiDFDOLdL`, websitePromptUrl: null },
      { name: "Dryer Duct", emoji: "🌀", snapshotUrl: `${A}Azm1WSBi836dCcDoNeTA`, websitePromptUrl: null },
      { name: "Carpet Cleaner", emoji: "🧽", snapshotUrl: `${A}X3YTmfILvrMDz8gAKFtZ`, websitePromptUrl: null },
      { name: "Office Cleaning", emoji: "🏢", snapshotUrl: `${A}ZeDrxl6FeHeSkZ3OzLvP`, websitePromptUrl: null },
      { name: "Window Cleaning", emoji: "🫧", snapshotUrl: `${H}fhbYPiJ4aZzCbVdVXRb0`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Health and Wellness",
    items: [
      { name: "Personal Trainer", emoji: "🏋️", snapshotUrl: `${A}fZuLycm838hrAERr2Prw`, websitePromptUrl: null },
      { name: "Fitness Coach", emoji: "💪", snapshotUrl: `${H}655xRyM1RRUEuQF8uovD`, websitePromptUrl: null },
      { name: "Physical Therapy", emoji: "🦵", snapshotUrl: `${H}t9mQxKlfeX7jXFsSszW2`, websitePromptUrl: null },
      { name: "Nutrition & Wellness", emoji: "🥗", snapshotUrl: `${H}oepVDuHl4psqCG0PXzO1`, websitePromptUrl: null },
      { name: "Podiatrist", emoji: "🦶", snapshotUrl: `${H}dsNBmB7j9gPK8zWVt0ss`, websitePromptUrl: null },
      { name: "Fitness Bootcamp", emoji: "⏱️", snapshotUrl: `${H}3wK7mrgrkCtW7W3BFufc`, websitePromptUrl: null },
      { name: "Healing", emoji: "🌿", snapshotUrl: `${H}FUiJds2ivIfHsxylFTLY`, websitePromptUrl: null },
      { name: "Mixed Martial Arts Gym", emoji: "🥋", snapshotUrl: `${H}ksVX3uqN5KnIOuzByiEx`, websitePromptUrl: null },
      { name: "Family Fun", emoji: "🎡", snapshotUrl: `${H}hVUwFGIKhMCKGic7EBeP`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Educational Services",
    items: [
      { name: "Tutoring", emoji: "📚", snapshotUrl: `${H}0soxtrr6yoq1oDFFcSaQ`, websitePromptUrl: null },
      { name: "Driving Instructor", emoji: "🚙", snapshotUrl: `${A}JkfD3dcQhNPHBUjhn7ic`, websitePromptUrl: null },
      { name: "BJJ School", emoji: "🥊", snapshotUrl: `${A}8H8ZjhJCfEjUOvRKBAsx`, websitePromptUrl: null },
      { name: "Driving School", emoji: "🚦", snapshotUrl: `${H}fkUnrABvJl92uTJuSrQ4`, websitePromptUrl: null },
      { name: "Firearms Training", emoji: "🎯", snapshotUrl: `${H}xpOV2vXGUGCrwyTj7QrL`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Professional Services",
    items: [
      { name: "Professional Organizer", emoji: "🗂️", snapshotUrl: `${A}QLJP3yh2ALlvZmtDFmBm`, websitePromptUrl: null },
      { name: "Public Adjuster", emoji: "📋", snapshotUrl: `${A}zp0hLxP6Kt1WxwZiMd4N`, websitePromptUrl: null },
      { name: "Real Estate", emoji: "🏘️", snapshotUrl: `${H}0soxtrr6yoq1oDFFcSaQ`, websitePromptUrl: null },
      { name: "Solar Installation", emoji: "☀️", snapshotUrl: `${A}nvbTybn2w63o3EjBqZG7`, websitePromptUrl: null },
      { name: "Catering", emoji: "🍽️", snapshotUrl: `${H}PHDoicJahwEfiDpjjmgD`, websitePromptUrl: null },
      { name: "Home Inspector (Direct Import)", emoji: "🔍", snapshotUrl: `${IMPORT}HE40rjUHA9PbJdMA7TBe`, websitePromptUrl: null },
      { name: "Real Estate Investing (Single Family)", emoji: "🏠", snapshotUrl: `${H}qQ0smmFxGx1imekbw9te`, websitePromptUrl: null },
      { name: "Orthodontist", emoji: "🦷", snapshotUrl: `${H}3E6sTcHkXMdPV2h6WcE9`, websitePromptUrl: null },
      { name: "Travel Agent", emoji: "✈️", snapshotUrl: `${H}sB6bH99Zyhh3w9tFV0ge`, websitePromptUrl: null },
      { name: "Optometerist", emoji: "👓", snapshotUrl: `${H}wi3f4vePxKBUz4n5pO0h`, websitePromptUrl: null },
      { name: "Attorney", emoji: "⚖️", snapshotUrl: `${H}mfK2JEnqIqUThVXV6cya`, websitePromptUrl: null },
      { name: "Insurance Agent", emoji: "☂️", snapshotUrl: `${H}GiNEvgTAukeiNyXi97Oc`, websitePromptUrl: null },
      { name: "Photographer & Videographer", emoji: "📸", snapshotUrl: `${H}Souq6fmpVOquvigmKloY`, websitePromptUrl: null },
      { name: "Podcast Management", emoji: "🎙️", snapshotUrl: `${H}rxA2nwEQZA9xz8k1nWTT`, websitePromptUrl: null },
      { name: "Paintless Dent Repair", emoji: "🚘", snapshotUrl: `${H}VluUajbNk4SZ4JxHVQNs`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Business",
    items: [
      { name: "Small Business (Direct Import)", emoji: "🏪", snapshotUrl: `${IMPORT}kWXi3pOTjIeE78ambVAS`, websitePromptUrl: null },
      { name: "Business Coaching", emoji: "🧭", snapshotUrl: `${H}RgFiOXoTW6qbNkT1l2fn`, websitePromptUrl: null },
      { name: "Boat Rental", emoji: "🛥️", snapshotUrl: `${H}8pQYVFkLeDJxqnv1rK3X`, websitePromptUrl: null },
      { name: "Auto Dealer", emoji: "🚗", snapshotUrl: `${H}DdV2PekEs6u7w8Q27jOf`, websitePromptUrl: null },
      { name: "Dance Studio", emoji: "💃", snapshotUrl: `${H}g8J9ey1zyQtrjSvVMSOt`, websitePromptUrl: null },
      { name: "Assisted Living", emoji: "🏥", snapshotUrl: `${H}5BHuwCwVYOdaMtzhnkRC`, websitePromptUrl: null },
      { name: "Charter School", emoji: "🏫", snapshotUrl: `${H}ZSrqgVTJpP25htZWpXvy`, websitePromptUrl: null },
    ],
  },
  {
    heading: "Home Maintenence",
    items: [
      { name: "Pool Maintenence", emoji: "🏊", snapshotUrl: `${A}a4i4WIIKqcQnMrDXYZGD`, websitePromptUrl: null },
      { name: "Sauna Installation", emoji: "🧖", snapshotUrl: `${A}NrvZhY1yOTWdeX3XAjgC`, websitePromptUrl: null },
      { name: "Electrician", emoji: "⚡", snapshotUrl: `${A}KPvVQPw8VSq3fK5TrHzK`, websitePromptUrl: null },
      { name: "Plumbing", emoji: "🚿", snapshotUrl: `${A}OsVVurwLqG4JUlW7qpxQ`, websitePromptUrl: null },
      { name: "Home Security", emoji: "🔒", snapshotUrl: `${A}wMxChqBpov0u7QY84CE1`, websitePromptUrl: null },
      { name: "Land Clearing", emoji: "🚜", snapshotUrl: `${A}HdL8xXhwjeF12wn3cERL`, websitePromptUrl: null },
      { name: "Flooring Installation", emoji: "🪚", snapshotUrl: `${A}b84nQkJlaO4fDyjajuJb`, websitePromptUrl: null },
      { name: "Basement Waterproofing", emoji: "🌊", snapshotUrl: `${A}8T6iNqDhsQQdhgQsoiSR`, websitePromptUrl: null },
      { name: "Home Staging", emoji: "🖼️", snapshotUrl: `${A}KubVF1qtg1ykcck9p5q5`, websitePromptUrl: null },
      { name: "Kitchen Remodel", emoji: "🍳", snapshotUrl: `${A}l4datYDh7URNPa90Y9hv`, websitePromptUrl: null },
      { name: "Drywall Repair", emoji: "🧰", snapshotUrl: `${A}uktTebgZsbcmj4Dk77xK`, websitePromptUrl: null },
      { name: "Landscaping", emoji: "🌱", snapshotUrl: `${A}gJtY9sHA5Vve13AMXUBA`, websitePromptUrl: null },
      { name: "Window Covering", emoji: "🪟", snapshotUrl: `${H}TrLBCApmDKyUmPa6dbrG`, websitePromptUrl: null },
    ],
  },
];

export const VAULT_INDUSTRY_COUNT = VAULT_CATEGORIES.reduce(
  (sum, c) => sum + c.items.length,
  0
);
