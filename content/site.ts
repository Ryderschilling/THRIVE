/* ══════════════════════════════════════════════════════════════════════════
   THRIVE · SITE CONTENT
   Single source of truth for copy. Edit here, the whole site updates.
   ══════════════════════════════════════════════════════════════════════════ */

export const site = {
  name: "THRIVE",
  mark: "·30A",
  leader: "Josh Schilling",
  location: "30A",
  cityLine: "Santa Rosa Beach, FL",
  regionLine: "30A · Emerald Coast",

  nav: [
    { label: "About", href: "/thrive" },
    { label: "Community", href: "/community" },
    { label: "Coaching", href: "/coaching" },
    { label: "Retreats", href: "/retreats" },
    { label: "Events", href: "/events" },
  ],

  primaryCta: { label: "Get Involved", href: "/join" },
  secondaryCta: { label: "See the calendar", href: "/events" },

  footerLine:
    "A ministry and growth ecosystem for Christian businessmen on the 30A coast of Florida.",

  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Skool", href: "https://www.skool.com/" },
    { label: "Email Josh", href: "mailto:josh@thriveco.net" },
  ],

  verse: {
    text: "The righteous will THRIVE like a palm tree",
    ref: "Psalm 92:12",
  },
};

/* ── Ticker ─────────────────────────────────────────────────────────────── */
export const ticker = [
  { text: "Iron Sharpens Iron", ref: "Prov 27:17" },
  { text: "Brotherhood · Formation · Kingdom Impact" },
  { text: "Santa Rosa Beach · 30A · Florida" },
  { text: "Be Strong and Courageous", ref: "Josh 1:9" },
  { text: "Ministry · Discipleship · Encouragement" },
  { text: "Christian Businessmen · Emerald Coast" },
];

/* ── Proof bar ──────────────────────────────────────────────────────────── */
export const proof = [
  { n: 200, suffix: "+", label: "Men formed" },
  { n: 12, suffix: "", label: "Retreats hosted" },
  { n: 40, suffix: "+", label: "Gatherings a year" },
  { n: 4, suffix: "", label: "Years on 30A" },
];

/* ── Pillars ────────────────────────────────────────────────────────────── */
export const pillars = [
  {
    ix: "i.",
    name: "Brotherhood",
    desc: "Honest tables, morning formations, and men who actually show up when it costs them something.",
  },
  {
    ix: "ii.",
    name: "Formation",
    desc: "Scripture-led rhythms for leadership, fatherhood, and the stewardship of your work.",
  },
  {
    ix: "iii.",
    name: "Kingdom Impact",
    desc: "Business as a vehicle for obedience, generosity, and a witness that outlives you.",
  },
];

/* ── What's actually here (the access list) ─────────────────────────────── */
export const access = [
  { title: "Weekly Morning Formation", note: "6:00am, before the day owns you" },
  { title: "Monthly Brotherhood Dinner", note: "One table, real conversation" },
  { title: "Business & Faith Roundtable", note: "Quarterly, owner to owner" },
  { title: "Men's Retreats on 30A", note: "Two to three a year" },
  { title: "Thrive Groups", note: "Guided group formation with structure" },
  { title: "Personal & Executive Coaching", note: "Private containers with Josh" },
  { title: "The Monthly Letter", note: "Quiet updates, invitations, reflections" },
  { title: "A Text Thread That Answers", note: "Prayer, questions, real life" },
];

/* ── Is this you? ───────────────────────────────────────────────────────── */
export const fit = {
  yes: {
    title: "This is for you if",
    items: [
      "You carry weight: a business, a family, a team, a name.",
      "You want your faith and your work growing from the same root.",
      "You are tired of surface-level and want men who tell you the truth.",
      "You will show up in person, not just online.",
      "You live on or near the Emerald Coast, or you visit often enough to be known.",
    ],
  },
  no: {
    title: "This is not for you if",
    items: [
      "You want another podcast, another course, another content feed.",
      "You want to network more than you want to be known.",
      "You want a room where nobody asks you a hard question.",
      "You want to attend once and call it community.",
    ],
  },
};

/* ── Rhythm ─────────────────────────────────────────────────────────────── */
export const rhythm = [
  {
    when: "Weekly",
    title: "Morning Formation",
    desc: "Scripture, prayer, and a short word before work starts. Come as you are, coffee in hand.",
    meta: "Thursdays · 6:00am · 30A",
  },
  {
    when: "Monthly",
    title: "Brotherhood Dinner",
    desc: "One long table. Real food, real conversation, no agenda but honesty.",
    meta: "First week of the month",
  },
  {
    when: "Quarterly",
    title: "Business & Faith Roundtable",
    desc: "Owners and operators working through the decisions nobody else can help with.",
    meta: "By invitation · Santa Rosa Beach",
  },
  {
    when: "Twice a year",
    title: "Men's Retreat",
    desc: "Three days off the grid. Slowed down, sharpened, sent back different.",
    meta: "Spring and fall · Emerald Coast",
  },
];

/* ── Coaching plans ─────────────────────────────────────────────────────── */
export const plans = [
  {
    ix: "i.",
    name: "Thrive Groups",
    sub: "Brotherhood with structure and direction.",
    features: [
      "Group calls plus a guided framework",
      "Community accountability",
      "Hot seats and implementation focus",
      "Monthly Q&A with Josh",
    ],
    cta: "Sign Up",
    href: "/coaching/group-coaching",
    featured: false,
    flag: "",
  },
  {
    ix: "ii.",
    name: "Thrive Personal",
    sub: "A private container for breakthrough.",
    features: [
      "Private coaching cadence",
      "Personal roadmap and accountability",
      "Faith-first alignment for life and leadership",
      "Direct text access between calls",
    ],
    cta: "Apply Now",
    href: "/coaching/personal-coaching-program",
    featured: true,
    flag: "Most chosen",
  },
  {
    ix: "iii.",
    name: "Thrive Executive",
    sub: "High-touch leadership and business support.",
    features: [
      "Executive-level structure",
      "Business alignment and leadership systems",
      "Decision-point strategy calls",
      "Quarterly in-person reset on 30A",
    ],
    cta: "Inquire",
    href: "/coaching/personal-coaching-calls",
    featured: false,
    flag: "",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ──────────────────────────────────────────────────────────────────────────
   HOW TO ADD A REAL ONE:
   1. Set  placeholder: false
   2. Fill in  quote, name, role
   3. Optional: add  photo: "/images/testimonials/first-last.jpg"
   Anything left with  placeholder: true  renders with a dashed border so it
   is obvious on the live site that it still needs a real quote.
   ══════════════════════════════════════════════════════════════════════════ */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Add the real quote here. The best ones name a specific before and after: what he walked in carrying, and what changed.",
    name: "First Last",
    role: "Owner · Company · 30A",
    placeholder: true,
  },
  {
    quote:
      "Add the real quote here. Short is fine. Two honest sentences beat a paragraph of praise.",
    name: "First Last",
    role: "Founder · Company",
    placeholder: true,
  },
  {
    quote:
      "Add the real quote here. If he mentions his marriage, his kids, or a decision he made differently, keep that part.",
    name: "First Last",
    role: "Contractor · Santa Rosa Beach",
    placeholder: true,
  },
  {
    quote:
      "Add the real quote here. Retreat quotes work well: what the three days actually did.",
    name: "First Last",
    role: "Retreat · Spring",
    placeholder: true,
  },
  {
    quote:
      "Add the real quote here. A coaching client quote belongs in this slot.",
    name: "First Last",
    role: "Thrive Personal",
    placeholder: true,
  },
  {
    quote:
      "Add the real quote here. One from a man who was skeptical at first is worth more than five enthusiastic ones.",
    name: "First Last",
    role: "Realtor · 30A",
    placeholder: true,
  },
];

/* ── FAQ ────────────────────────────────────────────────────────────────── */
export const faq = [
  {
    q: "Do I have to be a business owner?",
    a: "No. Most of the men here own or run something, but the common thread is responsibility, not a title. If you carry weight for other people, you will fit.",
  },
  {
    q: "What does it cost?",
    a: "Showing up costs nothing. Morning formation, dinners, and roundtables are free and always will be. Retreats and coaching are paid, and the price is listed on those pages.",
  },
  {
    q: "I am not sure where I stand with God.",
    a: "Come anyway. This is a room for men who are honest about that, not a room for men who have it figured out. Nobody will corner you.",
  },
  {
    q: "I do not live on 30A.",
    a: "Plenty of men drive in, and some fly in for retreats. If you are within a couple hours, start with a dinner and see how it sits.",
  },
  {
    q: "What is the first step?",
    a: "Put your name in below. Josh reads every one and replies personally with the next gathering that fits you.",
  },
];
