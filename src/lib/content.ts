import { promises as fs } from "fs";
import path from "path";
import { type ArchivedEvent, type Contributor, type SiteContent } from "@/lib/content-types";

const contentPath = path.join(process.cwd(), "data", "content.json");
const colors = ["acid", "paper", "red", "ink"] as const;
const roles = ["VOLUNTEER", "HOST", "VOLUNTEER + HOST"] as const;

export const defaultContent: SiteContent = {
  contributors: [
    { id: "contributor-01", name: "PAST VOLUNTEER 01", role: "VOLUNTEER", year: "2024", note: "Showed up early. Stayed curious. Made the room better.", photo: "", color: "acid" },
    { id: "contributor-02", name: "PAST HOST 01", role: "HOST", year: "2024", note: "Held the space, passed the mic, and kept the ideas moving.", photo: "", color: "red" },
    { id: "contributor-03", name: "PAST VOLUNTEER 02", role: "VOLUNTEER + HOST", year: "2025", note: "Turned a small task into a reason for more people to stay.", photo: "", color: "paper" },
    { id: "contributor-04", name: "PAST HOST 02", role: "HOST", year: "2025", note: "Made every new face feel like they belonged in the room.", photo: "", color: "ink" },
  ],
  events: [
    { id: "event-01", date: "02.24", title: "FIRST COMMIT", type: "OPEN HOUSE", color: "acid", note: "A room full of first ideas, first conversations, and a very long whiteboard.", photo: "" },
    { id: "event-02", date: "03.24", title: "FIGMA AFTER DARK", type: "DESIGN JAM", color: "paper", note: "A fast, messy, late-night exercise in making interfaces feel like something.", photo: "" },
    { id: "event-03", date: "06.24", title: "THE BUILD TABLE", type: "HARDWARE LAB", color: "red", note: "Sensors, cardboard, wrong turns, and prototypes that did exactly enough.", photo: "" },
    { id: "event-04", date: "08.24", title: "CODE IN PUBLIC", type: "LEARNING CIRCLE", color: "ink", note: "An evening for asking the questions that usually stay stuck in browser tabs.", photo: "" },
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
    };
  });
}

export function normalizeContent(value: unknown): SiteContent {
  const record = value as Record<string, unknown>;
  return { contributors: normalizeContributors(record?.contributors), events: normalizeEvents(record?.events) };
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
