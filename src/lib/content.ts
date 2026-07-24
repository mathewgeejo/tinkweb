import { promises as fs } from "fs";
import path from "path";
import { type ArchivedEvent, type Contributor, type CoreMember, type SiteContent } from "@/lib/content-types";

const contentPath = path.join(process.cwd(), "data", "content.json");
const colors = ["acid", "paper", "red", "ink"] as const;
const roles = ["VOLUNTEER", "HOST", "VOLUNTEER + HOST"] as const;

export const defaultContent: SiteContent = {
  coreTeam: [
    { id: "lead-campus", name: "CAMPUS LEAD", role: "CAMPUS LEAD", initials: "CL", bio: "Keeps the signal loud and the whole thing moving.", tags: ["VISION", "COMMUNITY", "MOMENTUM"], photo: "", color: "acid" },
    { id: "lead-learning", name: "LEARNING COORDINATOR", role: "LEARNING COORDINATOR", initials: "LC", bio: "Turns a curious room into a room that knows where to begin.", tags: ["SESSIONS", "SKILLS", "PEER LEARNING"], photo: "", color: "paper" },
    { id: "lead-wit", name: "WOMEN IN TECH LEAD", role: "WOMEN IN TECH LEAD", initials: "WT", bio: "Makes space, opens doors, and keeps the table bigger than before.", tags: ["INCLUSION", "MENTORSHIP", "VOICE"], photo: "", color: "red" },
    { id: "lead-outreach", name: "OUTREACH LEAD", role: "OUTREACH LEAD", initials: "OL", bio: "Connects our work to people, partners, and places beyond campus.", tags: ["PARTNERSHIPS", "STORIES", "REACH"], photo: "", color: "ink" },
  ],
  contributors: [
    { id: "contributor-01", name: "PAST VOLUNTEER 01", role: "VOLUNTEER", year: "2024", note: "Showed up early. Stayed curious. Made the room better.", photo: "", color: "acid", eventIds: ["event-01", "event-03"] },
    { id: "contributor-02", name: "PAST HOST 01", role: "HOST", year: "2024", note: "Held the space, passed the mic, and kept the ideas moving.", photo: "", color: "red", eventIds: ["event-01", "event-02"] },
    { id: "contributor-03", name: "PAST VOLUNTEER 02", role: "VOLUNTEER + HOST", year: "2025", note: "Turned a small task into a reason for more people to stay.", photo: "", color: "paper", eventIds: ["event-03", "event-04"] },
    { id: "contributor-04", name: "PAST HOST 02", role: "HOST", year: "2025", note: "Made every new face feel like they belonged in the room.", photo: "", color: "ink", eventIds: ["event-02", "event-04"] },
  ],
  events: [
    { id: "event-01", date: "02.24", title: "FIRST COMMIT", type: "OPEN HOUSE", color: "acid", note: "A room full of first ideas, first conversations, and a very long whiteboard.", photo: "", contributorIds: ["contributor-01", "contributor-02"] },
    { id: "event-02", date: "03.24", title: "FIGMA AFTER DARK", type: "DESIGN JAM", color: "paper", note: "A fast, messy, late-night exercise in making interfaces feel like something.", photo: "", contributorIds: ["contributor-02", "contributor-04"] },
    { id: "event-03", date: "06.24", title: "THE BUILD TABLE", type: "HARDWARE LAB", color: "red", note: "Sensors, cardboard, wrong turns, and prototypes that did exactly enough.", photo: "", contributorIds: ["contributor-01", "contributor-03"] },
    { id: "event-04", date: "08.24", title: "CODE IN PUBLIC", type: "LEARNING CIRCLE", color: "ink", note: "An evening for asking the questions that usually stay stuck in browser tabs.", photo: "", contributorIds: ["contributor-03", "contributor-04"] },
  ],
};

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function id(value: unknown, prefix: string, index: number) {
  const candidate = text(value, 64);
  return /^[a-z0-9-]{3,64}$/i.test(candidate) ? candidate : `${prefix}-${Date.now()}-${index}`;
}

function photo(value: unknown) {
  const candidate = text(value, 160);
  return candidate.startsWith("/uploads/") ? candidate : "";
}

function ids(value: unknown) { return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && /^[a-z0-9-]{3,64}$/i.test(item)).slice(0, 80) : []; }

function color(value: unknown, index: number) {
  return colors.includes(value as (typeof colors)[number]) ? value as (typeof colors)[number] : colors[index % colors.length];
}

function normalizeContributors(value: unknown): Contributor[] {
  if (!Array.isArray(value)) return defaultContent.contributors;
  return value.slice(0, 80).map((item, index) => {
    const record = item as Record<string, unknown>;
    const roleValue = text(record.role, 30);
    return {
      id: id(record.id, "contributor", index),
      name: text(record.name, 70) || "UNTITLED CONTRIBUTOR",
      role: roles.includes(roleValue as (typeof roles)[number]) ? roleValue as Contributor["role"] : "VOLUNTEER",
      year: text(record.year, 16) || "ARCHIVE",
      note: text(record.note, 300),
      photo: photo(record.photo),
      color: color(record.color, index),
      eventIds: ids(record.eventIds),
    };
  });
}

function normalizeEvents(value: unknown): ArchivedEvent[] {
  if (!Array.isArray(value)) return defaultContent.events;
  return value.slice(0, 80).map((item, index) => {
    const record = item as Record<string, unknown>;
    return {
      id: id(record.id, "event", index),
      date: text(record.date, 18) || "DATE TBD",
      title: text(record.title, 100) || "UNTITLED EVENT",
      type: text(record.type, 50) || "EVENT",
      color: color(record.color, index),
      note: text(record.note, 400),
      photo: photo(record.photo),
      contributorIds: ids(record.contributorIds),
    };
  });
}

function normalizeCoreTeam(value: unknown): CoreMember[] {
  if (!Array.isArray(value)) return defaultContent.coreTeam;
  return value.slice(0, 20).map((item, index) => {
    const record = item as Record<string, unknown>;
    const tags = Array.isArray(record.tags) ? record.tags.filter((tag): tag is string => typeof tag === "string").slice(0, 8).map((tag) => tag.slice(0, 28)) : [];
    return {
      id: id(record.id, "lead", index),
      name: text(record.name, 70) || "UNTITLED LEAD",
      role: text(record.role, 70) || "CORE TEAM",
      initials: text(record.initials, 6) || "TH",
      bio: text(record.bio, 300),
      tags,
      photo: photo(record.photo),
      color: color(record.color, index),
    };
  });
}

export function normalizeContent(value: unknown): SiteContent {
  const record = value as Record<string, unknown>;
  const contributors = normalizeContributors(record?.contributors);
  const events = normalizeEvents(record?.events);
  const validContributorIds = new Set(contributors.map((person) => person.id));
  const validEventIds = new Set(events.map((event) => event.id));
  return {
    coreTeam: normalizeCoreTeam(record?.coreTeam),
    contributors: contributors.map((person) => ({ ...person, eventIds: person.eventIds.filter((eventId) => validEventIds.has(eventId)) })),
    events: events.map((event) => ({ ...event, contributorIds: event.contributorIds.filter((personId) => validContributorIds.has(personId)) })),
  };
}

export async function readContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(contentPath, "utf8");
    return normalizeContent(JSON.parse(raw));
  } catch {
    return defaultContent;
  }
}

export async function writeContent(content: unknown): Promise<SiteContent> {
  const normalized = normalizeContent(content);
  const directory = path.dirname(contentPath);
  await fs.mkdir(directory, { recursive: true });
  const temporary = `${contentPath}.${Date.now()}.tmp`;
  await fs.writeFile(temporary, JSON.stringify(normalized, null, 2), "utf8");
  await fs.rename(temporary, contentPath);
  return normalized;
}
