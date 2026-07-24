"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { ChapterShell } from "@/app/components/chapter-shell";
import { type ArchivedEvent, type Contributor, type SiteContent } from "@/lib/content-types";

const fallbackEvents: ArchivedEvent[] = [
  { id: "event-01", date: "02.24", title: "FIRST COMMIT", type: "OPEN HOUSE", color: "acid", note: "A room full of first ideas, first conversations, and a very long whiteboard.", photo: "", contributorIds: [] },
  { id: "event-02", date: "03.24", title: "FIGMA AFTER DARK", type: "DESIGN JAM", color: "paper", note: "A fast, messy, late-night exercise in making interfaces feel like something.", photo: "", contributorIds: [] },
  { id: "event-03", date: "06.24", title: "THE BUILD TABLE", type: "HARDWARE LAB", color: "red", note: "Sensors, cardboard, wrong turns, and prototypes that did exactly enough.", photo: "", contributorIds: [] },
  { id: "event-04", date: "08.24", title: "CODE IN PUBLIC", type: "LEARNING CIRCLE", color: "ink", note: "An evening for asking the questions that usually stay stuck in browser tabs.", photo: "", contributorIds: [] },
];

export default function PastEventsPage() {
  const [events, setEvents] = useState(fallbackEvents);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [selected, setSelected] = useState<ArchivedEvent | null>(null);
  useEffect(() => { fetch("/api/content").then((response) => response.json()).then((content: SiteContent) => { setEvents(content.events); setContributors(content.contributors); }).catch(() => undefined); }, []);

  return (
    <ChapterShell current="ARCHIVE">
      <section className="sub-hero archive-hero">
        <div className="sub-hero-meta page-reveal"><span>NOTHING GOOD HAPPENS ON ITS OWN</span><span>THE ARCHIVE / 2024 - 25</span></div>
        <div className="sub-hero-title"><div className="clip"><h1 className="page-reveal">THE</h1></div><div className="clip"><h1 className="page-reveal"><i>GOOD</i> NOISE.</h1></div></div>
        <div className="archive-ring page-reveal"><span>TH / SCET / EVENTS / TH / SCET / EVENTS /</span></div>
        <div className="sub-hero-foot page-reveal"><p>Receipts from the rooms<br />we made together.</p><a href="#archive">OPEN THE BOX <ArrowDownRight /></a></div>
      </section>
      <section id="archive" className="archive-section"><div className="archive-head scroll-reveal"><p className="section-tag">( 01 / PAST EVENTS )</p><p>Every event leaves a trace. Pick one to read the room.</p></div><div className="archive-list">{events.map((event) => <button className="archive-event scroll-reveal" onClick={() => setSelected(event)} key={event.id}><span>{event.date}</span><small>{event.type} / {event.contributorIds.length} PEOPLE</small><b>{event.title}</b><ArrowUpRight /></button>)}</div></section>
      <section className="archive-after"><p className="section-tag scroll-reveal">( NEXT UP / YOUR IDEA )</p><h2 className="scroll-reveal">THE NEXT<br />ONE STARTS<br /><i>WITH YOU.</i></h2></section>
      {selected && <div className="event-modal" role="dialog" aria-modal="true" aria-label={selected.title}><button className="event-modal-close" onClick={() => setSelected(null)} aria-label="Close event details"><X /></button><div className={`event-modal-card event-modal-card--${selected.color}`}><span>ARCHIVE / {selected.date}</span><small>{selected.type}</small><h2>{selected.title}</h2><p>{selected.note}</p><div className="linked-events"><b>PEOPLE WHO MADE IT HAPPEN</b>{contributors.filter((person) => selected.contributorIds.includes(person.id)).map((person) => <span key={person.id}>{person.name} / {person.role}</span>)}{!contributors.some((person) => selected.contributorIds.includes(person.id)) && <span>PEOPLE DETAILS COMING SOON</span>}</div>{selected.photo && <img className="modal-image" src={selected.photo} alt="" />}<div className="modal-mark">TH</div></div></div>}
      <footer><a className="brand" href="/"><i>TH</i><span>SCET<br />CHAPTER</span></a><p>EVENT ARCHIVE<br />/ 2024 - 25</p><div><a href="/team">CORE TEAM -&gt;</a><a href="/volunteers">PEOPLE ARCHIVE -&gt;</a></div><span>C 2025 TINKERHUB SCET</span></footer>
    </ChapterShell>
  );
}
