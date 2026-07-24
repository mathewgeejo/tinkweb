"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { ChapterShell } from "@/app/components/chapter-shell";
import { type ArchivedEvent, type Contributor, type SiteContent } from "@/lib/content-types";

const fallbackContributors: Contributor[] = [
  { id: "one", name: "PAST VOLUNTEER 01", role: "VOLUNTEER", year: "2024", note: "Showed up early. Stayed curious. Made the room better.", photo: "", color: "acid", eventIds: [] },
  { id: "two", name: "PAST HOST 01", role: "HOST", year: "2024", note: "Held the space, passed the mic, and kept the ideas moving.", photo: "", color: "red", eventIds: [] },
  { id: "three", name: "PAST VOLUNTEER 02", role: "VOLUNTEER + HOST", year: "2025", note: "Turned a small task into a reason for more people to stay.", photo: "", color: "paper", eventIds: [] },
  { id: "four", name: "PAST HOST 02", role: "HOST", year: "2025", note: "Made every new face feel like they belonged in the room.", photo: "", color: "ink", eventIds: [] },
];

export default function VolunteersPage() {
  const [contributors, setContributors] = useState(fallbackContributors);
  const [events, setEvents] = useState<ArchivedEvent[]>([]);
  const [selected, setSelected] = useState<Contributor | null>(null);

  useEffect(() => { fetch("/api/content").then((response) => response.json()).then((content: SiteContent) => { setContributors(content.contributors); setEvents(content.events); }).catch(() => undefined); }, []);

  return (
    <ChapterShell current="VOLUNTEERS" lightNav>
      <section className="sub-hero volunteer-hero">
        <div className="sub-hero-meta page-reveal"><span>THE HANDS BEHIND THE HAPPENING</span><span>SCET / ARCHIVE</span></div>
        <div className="sub-hero-title">
          <div className="clip"><h1 className="page-reveal">THE ONES</h1></div>
          <div className="clip"><h1 className="page-reveal"><i>WHO</i> SHOWED</h1></div>
          <div className="clip"><h1 className="page-reveal">UP.</h1></div>
        </div>
        <div className="volunteer-stamp page-reveal">PAST<br />VOLUNTEERS<br />+ HOSTS</div>
        <div className="sub-hero-foot page-reveal"><p>Every gathering has people<br />who make it possible.</p><a href="#people">MEET THE PEOPLE <ArrowDownRight /></a></div>
      </section>

      <section id="people" className="people-archive">
        <div className="people-archive-head scroll-reveal"><p className="section-tag">( 01 / PEOPLE ARCHIVE )</p><p>Not a list of names. A record of the people who gave their time, attention, and energy to the room.</p></div>
        <div className="people-grid">
          {contributors.map((person, index) => <button onClick={() => setSelected(person)} className={`person-card person-card--${person.color} scroll-reveal`} key={person.id}><span>0{index + 1} / {person.year}</span><div className="person-photo" style={person.photo ? { backgroundImage: `url(${person.photo})` } : undefined}>{!person.photo && <b>{person.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}</b>}</div><div><small>{person.role}</small><h2>{person.name}</h2></div><ArrowUpRight /></button>)}
        </div>
      </section>

      <section className="people-note"><p className="section-tag scroll-reveal">( THE RECEIPT )</p><h2 className="scroll-reveal">A ROOM ONLY<br />BECOMES A<br /><i>COMMUNITY</i><br />WHEN PEOPLE<br />CARRY IT.</h2></section>

      {selected && <div className="event-modal" role="dialog" aria-modal="true" aria-label={selected.name}><button className="event-modal-close" onClick={() => setSelected(null)} aria-label="Close profile"><X /></button><div className={`event-modal-card event-modal-card--${selected.color}`}><span>PEOPLE ARCHIVE / {selected.year}</span><small>{selected.role}</small><h2>{selected.name}</h2><p>{selected.note || "Part of the TinkerHub SCET story."}</p><div className="linked-events"><b>SEEN AT</b>{events.filter((event) => selected.eventIds.includes(event.id)).map((event) => <span key={event.id}>{event.date} / {event.title}</span>)}{!events.some((event) => selected.eventIds.includes(event.id)) && <span>EVENT DETAILS COMING SOON</span>}</div><div className="modal-mark">TH</div></div></div>}
      <footer><a className="brand" href="/"><i>TH</i><span>SCET<br />CHAPTER</span></a><p>PEOPLE ARCHIVE<br />/ PAST HOSTS + VOLUNTEERS</p><div><a href="/team">CORE TEAM -&gt;</a><a href="/past-events">EVENT ARCHIVE -&gt;</a></div><span>C 2025 TINKERHUB SCET</span></footer>
    </ChapterShell>
  );
}
