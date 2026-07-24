"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { ChapterShell } from "@/app/components/chapter-shell";

const events = [
  { date: "02.24", title: "FIRST COMMIT", type: "OPEN HOUSE", color: "acid", note: "A room full of first ideas, first conversations, and a very long whiteboard." },
  { date: "03.24", title: "FIGMA AFTER DARK", type: "DESIGN JAM", color: "paper", note: "A fast, messy, late-night exercise in making interfaces feel like something." },
  { date: "06.24", title: "THE BUILD TABLE", type: "HARDWARE LAB", color: "red", note: "Sensors, cardboard, wrong turns, and prototypes that did exactly enough." },
  { date: "08.24", title: "CODE IN PUBLIC", type: "LEARNING CIRCLE", color: "ink", note: "An evening for asking the questions that usually stay stuck in browser tabs." },
  { date: "10.24", title: "SMALL THINGS, LOUD IDEAS", type: "SHOWCASE", color: "paper", note: "A collection of experiments made in the gaps between classes and deadlines." },
  { date: "01.25", title: "MAKE A MESS", type: "WELCOME SESSION", color: "acid", note: "The new year began with a room of strangers becoming collaborators." },
];

export default function PastEventsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const activeEvent = selected === null ? null : events[selected];

  return (
    <ChapterShell current="ARCHIVE">
      <section className="sub-hero archive-hero">
        <div className="sub-hero-meta page-reveal"><span>NOTHING GOOD HAPPENS ON ITS OWN</span><span>THE ARCHIVE / 2024 - 25</span></div>
        <div className="sub-hero-title">
          <div className="clip"><h1 className="page-reveal">THE</h1></div>
          <div className="clip"><h1 className="page-reveal"><i>GOOD</i> NOISE.</h1></div>
        </div>
        <div className="archive-ring page-reveal"><span>TH / SCET / EVENTS / TH / SCET / EVENTS /</span></div>
        <div className="sub-hero-foot page-reveal"><p>Receipts from the rooms<br />we made together.</p><a href="#archive">OPEN THE BOX <ArrowDownRight /></a></div>
      </section>

      <section id="archive" className="archive-section">
        <div className="archive-head scroll-reveal"><p className="section-tag">( 01 / PAST EVENTS )</p><p>Every event leaves a trace. Pick one to read the room.</p></div>
        <div className="archive-list">
          {events.map((event, index) => <button className="archive-event scroll-reveal" onClick={() => setSelected(index)} key={event.title}><span>{event.date}</span><small>{event.type}</small><b>{event.title}</b><ArrowUpRight /></button>)}
        </div>
      </section>

      <section className="archive-after">
        <p className="section-tag scroll-reveal">( NEXT UP / YOUR IDEA )</p>
        <h2 className="scroll-reveal">THE NEXT<br />ONE STARTS<br /><i>WITH YOU.</i></h2>
        <a href="mailto:tinkerhub@scet.edu.in" className="archive-after-link scroll-reveal">PITCH A SESSION <ArrowUpRight /></a>
      </section>

      {activeEvent && <div className="event-modal" role="dialog" aria-modal="true" aria-label={activeEvent.title}>
        <button className="event-modal-close" onClick={() => setSelected(null)} aria-label="Close event details"><X /></button>
        <div className={`event-modal-card event-modal-card--${activeEvent.color}`}><span>ARCHIVE / {activeEvent.date}</span><small>{activeEvent.type}</small><h2>{activeEvent.title}</h2><p>{activeEvent.note}</p><div className="modal-mark">TH</div></div>
      </div>}
      <footer><a className="brand" href="/"><i>TH</i><span>SCET<br />CHAPTER</span></a><p>EVENT ARCHIVE<br />/ 2024 - 25</p><div><a href="/team">CORE TEAM -&gt;</a><a href="/volunteers">VOLUNTEERS -&gt;</a></div><span>C 2025 TINKERHUB SCET</span></footer>
    </ChapterShell>
  );
}
