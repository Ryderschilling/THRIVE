export type Retreat = {
  slug: string;
  title: string;
  status: "Open" | "Invite-only" | "Waitlist";
  locationLabel: string;
  address: string;
  spotsTotal: number;
  spotsRemaining: number;

  dateStart: string; // YYYY-MM-DD
  dateEnd: string; // YYYY-MM-DD
  nightsLabel: string;

  coverImage: string;
  galleryImages: string[];

  summary: string;
  whatToExpect: string[];
  schedule: { dayLabel: string; items: string[] }[];

  invitationLine: string;
};

export type PastRetreat = {
  title: string;
  locationLabel: string;
  dateLabel: string;
  image: string;
};

export const retreats: Retreat[] = [
  {
    slug: "emerald-house",
    title: "THRIVE Retreat",
    status: "Invite-only",
    locationLabel: "Santa Rosa Beach, FL (30A)",
    address: "221 Hillcrest Rd., Santa Rosa Beach, FL, 32459",
    spotsTotal: 30,
    spotsRemaining: 30,

    dateStart: "2026-03-06",
    dateEnd: "2026-03-08",
    nightsLabel: "3 nights",

    coverImage: "/images/retreats/emerald-house/cover.jpg",
    galleryImages: [
      "/images/retreats/emerald-house/cover.jpg",
      "/images/retreats/emerald-house/back.jpg",
      "/images/retreats/emerald-house/pool.jpg",
      "/images/retreats/emerald-house/golf-cart.jpg",
      "/images/retreats/emerald-house/living-room.jpg",
      "/images/retreats/emerald-house/kitchen.jpg",
      "/images/retreats/emerald-house/game-room.jpg",
      "/images/retreats/emerald-house/bathroom.jpg",
      "/images/retreats/emerald-house/theater.jpg",
      "/images/retreats/emerald-house/top.jpg",
      "/images/retreats/emerald-house/drone.jpg",
    ],

    summary:
      "A quiet, focused retreat for Christian businessmen pursuing depth, responsibility, and kingdom impact—held in a coastal environment designed to slow you down and sharpen you.",
    whatToExpect: [
      "Morning formation and Scripture-led alignment",
      "Brotherhood table: honest conversations with strong men",
      "Leadership sharpening: clarity, responsibility, obedience",
      "Business reflection: truth, stewardship, and next steps",
      "Unhurried coastal reset (walks, prayer, silence)",
    ],
    schedule: [
      {
        dayLabel: "Day 1 — Arrival + Orientation",
        items: [
          "Arrival window + settle in",
          "Opening dinner",
          "THRIVE orientation + purpose",
          "Evening reflection",
        ],
      },
      {
        dayLabel: "Day 2 — Formation + Leadership",
        items: [
          "Morning formation",
          "Leadership session + discussion",
          "Solo reflection block",
          "Brotherhood table",
        ],
      },
      {
        dayLabel: "Day 3 — Kingdom Impact + Business",
        items: [
          "Morning formation",
          "Kingdom impact framework",
          "Business clarity session",
          "Evening prayer + closing table",
        ],
      },
      {
        dayLabel: "Day 4 — Departures",
        items: ["Final prayer + send-off", "Departures"],
      },
    ],

    invitationLine:
      "This is by invitation. Request to join and we’ll reach out personally with next steps and details.",
  },
];

export const pastRetreats: PastRetreat[] = [
  {
    title: "THRIVE Gathering Weekend",
    locationLabel: "30A",
    dateLabel: "Fall 2025",
    image: "/images/retreats/past/1.jpg",
  },
  {
    title: "Brotherhood Night",
    locationLabel: "Inlet Beach",
    dateLabel: "Summer 2025",
    image: "/images/retreats/past/2.jpg",
  },
  {
    title: "Formation Morning",
    locationLabel: "Watersound",
    dateLabel: "Spring 2025",
    image: "/images/retreats/past/3.jpg",
  },
];

function normalizeSlug(v: unknown) {
  return decodeURIComponent(String(v))
    .trim()
    .toLowerCase()
    // normalize weird dash characters into regular hyphen
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-")
    // remove zero-width chars that can sneak in from copy/paste
    .replace(/[\u200B-\u200D\uFEFF]/g, "");
}

export function getRetreatBySlug(slug: string) {
  const s = normalizeSlug(slug);
  return retreats.find((r) => normalizeSlug(r.slug) === s);
}