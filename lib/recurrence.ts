/**
 * Recurrence rule format:  "type:params"
 *
 * Examples:
 *   "monthly:1,3:3"   → 1st and 3rd Wednesday (weekday 3) of every month
 *   "monthly:2:5"     → 2nd Saturday (weekday 5) of every month
 *   "weekly:3"        → every Wednesday (weekday 3)
 *   "weekly:1,3"      → every Monday and Wednesday
 *
 * Weekday encoding: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
 */

function pad(n: number) { return String(n).padStart(2, "0"); }

export type RruleType = "weekly" | "monthly";

export type ParsedRrule =
  | { type: "weekly";  weekdays: number[] }
  | { type: "monthly"; nths: number[]; weekday: number };

export function parseRrule(rrule: string): ParsedRrule | null {
  try {
    const parts = rrule.split(":");
    if (parts[0] === "weekly") {
      const weekdays = parts[1].split(",").map(Number).filter(n => n >= 0 && n <= 6);
      return { type: "weekly", weekdays };
    }
    if (parts[0] === "monthly") {
      const nths    = parts[1].split(",").map(Number).filter(n => n >= 1 && n <= 5);
      const weekday = Number(parts[2]);
      if (isNaN(weekday) || weekday < 0 || weekday > 6) return null;
      return { type: "monthly", nths, weekday };
    }
    return null;
  } catch {
    return null;
  }
}

export function buildRrule(rule: ParsedRrule): string {
  if (rule.type === "weekly") {
    return `weekly:${rule.weekdays.join(",")}`;
  }
  return `monthly:${rule.nths.join(",")}:${rule.weekday}`;
}

/** Return the Nth occurrence of `weekday` in `year/month` (1-indexed, 0=Sun). */
function nthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date | null {
  const first = new Date(year, month, 1);
  const firstWd = first.getDay();
  // Days until first occurrence of weekday
  let day = 1 + ((weekday - firstWd + 7) % 7);
  day += (nth - 1) * 7;
  const result = new Date(year, month, day);
  // Ensure still in the same month
  if (result.getMonth() !== month) return null;
  return result;
}

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  photos: string[];
  startAt: Date;
  endAt: Date | null;
  isRecurring: boolean;
  rrule: string | null;
  exceptions?: string[]; // ISO date strings of skipped instances
};

export type EventInstance = {
  id: string;               // parentId + date suffix for recurring instances
  parentId: string;
  title: string;
  description: string | null;
  location: string | null;
  photos: string[];
  startAt: string;          // ISO string
  endAt: string | null;
  isRecurring: boolean;
  rrule: string | null;
};

/**
 * Expand a single event row into display instances within [rangeStart, rangeEnd].
 * One-time events produce one instance (if within range).
 * Recurring events produce one instance per occurrence.
 */
/** Normalize a Date to a yyyy-mm-dd key for exception matching */
function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function expandEvent(event: EventRow, rangeStart: Date, rangeEnd: Date): EventInstance[] {
  const base = event.startAt;
  const durationMs = event.endAt ? event.endAt.getTime() - base.getTime() : 0;
  // Build a set of excepted date keys for O(1) lookup
  const exceptedKeys = new Set((event.exceptions ?? []).map(iso => toDateKey(new Date(iso))));

  function makeInstance(date: Date): EventInstance {
    const endDate = durationMs > 0 ? new Date(date.getTime() + durationMs) : null;
    return {
      id:          `${event.id}::${date.toISOString()}`,
      parentId:    event.id,
      title:       event.title,
      description: event.description,
      location:    event.location,
      photos:      event.photos ?? [],
      startAt:     date.toISOString(),
      endAt:       endDate?.toISOString() ?? null,
      isRecurring: event.isRecurring,
      rrule:       event.rrule,
    };
  }

  function isExcepted(date: Date): boolean {
    return exceptedKeys.has(toDateKey(date));
  }

  if (!event.isRecurring || !event.rrule) {
    if (base >= rangeStart && base <= rangeEnd) return [makeInstance(base)];
    return [];
  }

  const rule = parseRrule(event.rrule);
  if (!rule) return [];

  const instances: EventInstance[] = [];
  const hour   = base.getHours();
  const minute = base.getMinutes();
  // Never generate instances before the event's own startAt
  const seriesStart = new Date(base); seriesStart.setHours(0, 0, 0, 0);
  const effectiveStart = seriesStart > rangeStart ? seriesStart : rangeStart;

  if (rule.type === "weekly") {
    const cursor = new Date(effectiveStart);
    cursor.setHours(0, 0, 0, 0);
    while (cursor <= rangeEnd) {
      if (rule.weekdays.includes(cursor.getDay())) {
        const d = new Date(cursor);
        d.setHours(hour, minute, 0, 0);
        if (d >= effectiveStart && d <= rangeEnd && !isExcepted(d)) {
          instances.push(makeInstance(d));
        }
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  } else {
    // Monthly: iterate month by month starting from the series start month
    const startMonth = effectiveStart.getFullYear() * 12 + effectiveStart.getMonth();
    const endMonth   = rangeEnd.getFullYear()       * 12 + rangeEnd.getMonth();
    for (let m = startMonth; m <= endMonth; m++) {
      const yr  = Math.floor(m / 12);
      const mo  = m % 12;
      for (const nth of rule.nths) {
        const day = nthWeekdayOfMonth(yr, mo, rule.weekday, nth);
        if (day) {
          day.setHours(hour, minute, 0, 0);
          if (day >= effectiveStart && day <= rangeEnd && !isExcepted(day)) {
            instances.push(makeInstance(day));
          }
        }
      }
    }
  }

  return instances.sort((a, b) => a.startAt.localeCompare(b.startAt));
}

/** Expand all events over a 6-month window from today. */
export function expandAllEvents(events: EventRow[]): EventInstance[] {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 2);

  return events
    .flatMap(e => expandEvent(e, start, end))
    .sort((a, b) => a.startAt.localeCompare(b.startAt));
}

/* Human-readable description of a rule */
const WEEKDAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const NTH_NAMES: Record<number, string> = { 1:"1st", 2:"2nd", 3:"3rd", 4:"4th", 5:"5th" };

export function describeRrule(rrule: string): string {
  const rule = parseRrule(rrule);
  if (!rule) return rrule;
  if (rule.type === "weekly") {
    return `Every ${rule.weekdays.map(d => WEEKDAY_NAMES[d]).join(" & ")}`;
  }
  const nthStr = rule.nths.map(n => NTH_NAMES[n] ?? `${n}th`).join(" & ");
  return `${nthStr} ${WEEKDAY_NAMES[rule.weekday]} of every month`;
}
