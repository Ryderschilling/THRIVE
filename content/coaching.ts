export type CoachingProduct = {
      slug: string;
      title: string;
      subtitle: string;
      description: string;
      bullets: string[];
      ctaLabel: string;
      heroImage?: string; // optional (place in /public/images/...)
      kind: "COACHING" | "COURSE";
      externalUrl?: string; // for Skool redirect (courses)
    };
    
    export const coachingProducts: CoachingProduct[] = [
      {
        slug: "personal-coaching-program",
        title: "Personal Coaching Program",
        subtitle: "A private container for breakthrough.",
        description:
          "High-touch coaching for men who want clarity, alignment, discipline, and forward motion—spiritually, personally, and practically.",
        bullets: [
          "Private coaching cadence (structured)",
          "Personal roadmap + accountability",
          "Faith-first alignment for leadership and life",
        ],
        ctaLabel: "Request to join",
        heroImage: "/images/coaching/personal.jpg",
        kind: "COACHING",
      },
      {
        slug: "group-coaching",
        title: "Group Coaching",
        subtitle: "Brotherhood with structure and direction.",
        description:
          "A guided group environment to sharpen your thinking, strengthen habits, and grow alongside other men pursuing depth and responsibility.",
        bullets: [
          "Group calls + guided framework",
          "Community accountability",
          "Q&A, hot seats, and implementation focus",
        ],
        ctaLabel: "Request to join",
        heroImage: "/images/coaching/group.jpg",
        kind: "COACHING",
      },
      {
        slug: "personal-coaching-calls",
        title: "Personal Coaching Calls",
        subtitle: "Tactical clarity when you need it.",
        description:
          "One-off calls for decision points, focus resets, accountability, or next-step strategy—grounded in purpose and direction.",
        bullets: [
          "Single session format",
          "Clear outcomes + action steps",
          "Follow-up notes (simple + actionable)",
        ],
        ctaLabel: "Request a call",
        heroImage: "/images/coaching/calls.jpg",
        kind: "COACHING",
      },
      {
        slug: "courses",
        title: "Courses",
        subtitle: "Self-paced formation and tools.",
        description:
          "Courses are hosted inside Skool for community, lessons, and ongoing discussion.",
        bullets: [
          "Hosted on Skool",
          "Self-paced learning",
          "Community + updates inside the platform",
        ],
        ctaLabel: "View on Skool",
        heroImage: "/images/coaching/courses.jpg",
        kind: "COURSE",
        externalUrl: "https://www.skool.com/", // replace with your real Skool link
      },
    ];
    
    export function getCoachingProductBySlug(slug: string) {
      const wanted = slug.trim().toLowerCase();
      return coachingProducts.find((p) => p.slug.toLowerCase() === wanted) || null;
    }