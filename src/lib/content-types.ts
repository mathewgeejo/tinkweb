export type Contributor = {
  id: string;
  name: string;
  role: "VOLUNTEER" | "HOST" | "VOLUNTEER + HOST";
  year: string;
  note: string;
  photo: string;
  color: "acid" | "paper" | "red" | "ink";
  eventIds: string[];
};

export type CoreMember = {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  tags: string[];
  photo: string;
  color: "acid" | "paper" | "red" | "ink";
};

export type ArchivedEvent = {
  id: string;
  date: string;
  title: string;
  type: string;
  color: "acid" | "paper" | "red" | "ink";
  note: string;
  photo: string;
  contributorIds: string[];
};

export type SiteContent = {
  coreTeam: CoreMember[];
  contributors: Contributor[];
  events: ArchivedEvent[];
};
