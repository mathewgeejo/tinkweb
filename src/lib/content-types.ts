export type Contributor = {
  id: string;
  name: string;
  role: "VOLUNTEER" | "HOST" | "VOLUNTEER + HOST";
  year: string;
  note: string;
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
};

export type SiteContent = {
  contributors: Contributor[];
  events: ArchivedEvent[];
};
