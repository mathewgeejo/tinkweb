"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ChapterShell } from "@/app/components/chapter-shell";

const volunteerRoles = [
  { id: "01", name: "THE MAKERS", detail: "They bring the first draft, the second attempt, and the tiny screw nobody can find.", mode: "BUILD" },
  { id: "02", name: "THE HOSTS", detail: "They make every new face feel like they came at exactly the right time.", mode: "GATHER" },
  { id: "03", name: "THE STORYTELLERS", detail: "They catch the in-between moments and turn them into reasons to join in.", mode: "DOCUMENT" },
  { id: "04", name: "THE CONNECTORS", detail: "They spot a good conversation before it becomes a missed opportunity.", mode: "REACH" },
  { id: "05", name: "THE FIXERS", detail: "They find the cable, solve the glitch, and keep the room in motion.", mode: "SUPPORT" },
  { id: "06", name: "THE CURIOUS", detail: "They ask the question that sends everyone somewhere new.", mode: "EXPLORE" },
];

export default function VolunteersPage() {
  const [active, setActive] = useState(0);
  const selected = volunteerRoles[active];

  return (
    <ChapterShell current="VOLUNTEERS">
      <section className="sub-hero volunteer-hero">
        <div className="sub-hero-meta page-reveal"><span>THE HANDS BEHIND THE HAPPENING</span><span>SCET / ALWAYS OPEN</span></div>
        <div className="sub-hero-title">
          <div className="clip"><h1 className="page-reveal">MANY</h1></div>
          <div className="clip"><h1 className="page-reveal"><i>HANDS,</i></h1></div>
          <div className="clip"><h1 className="page-reveal">ONE SIGNAL.</h1></div>
        </div>
        <div className="volunteer-stamp page-reveal">NO<br />SPECTATORS<br />HERE</div>
        <div className="sub-hero-foot page-reveal"><p>The magic is not in a title.<br />It&apos;s in turning up.</p><a href="#volunteer-types">FIND YOUR WAY IN <ArrowDownRight /></a></div>
      </section>

      <section id="volunteer-types" className="volunteer-lab">
        <div className="volunteer-lab-head scroll-reveal"><p className="section-tag">( 01 / THE VOLUNTEER ROOM )</p><p>Pick a corner. Every kind of contribution counts.</p></div>
        <div className="volunteer-selector">
          <div className="volunteer-list">
            {volunteerRoles.map((role, index) => <button className={active === index ? "volunteer-option volunteer-option--active" : "volunteer-option"} onClick={() => setActive(index)} key={role.id}><span>{role.id}</span><b>{role.name}</b><ArrowUpRight /></button>)}
          </div>
          <div className="volunteer-feature" key={selected.name}>
            <span>{selected.mode}</span><div className="feature-index">{selected.id}</div><h2>{selected.name}</h2><p>{selected.detail}</p><a href="mailto:tinkerhub@scet.edu.in?subject=I%20want%20to%20volunteer">COUNT ME IN <ArrowUpRight /></a>
          </div>
        </div>
      </section>

      <section className="volunteer-manifesto">
        <div className="marquee-wrap"><div className="marquee"><span>SHOW UP CURIOUS</span><b>*</b><span>LEAVE WITH PEOPLE</span><b>*</b><span>SHOW UP CURIOUS</span><b>*</b></div></div>
        <div className="volunteer-steps">
          <p className="section-tag scroll-reveal">( HOW IT STARTS )</p>
          <div className="step-grid">
            <div className="scroll-reveal"><span>01</span><h3>Walk in</h3><p>Come to a session, a build night, or a room full of questions.</p></div>
            <div className="scroll-reveal"><span>02</span><h3>Raise a hand</h3><p>Tell us the work you want to try, or the kind you are curious about.</p></div>
            <div className="scroll-reveal"><span>03</span><h3>Make a mark</h3><p>Take the small job. It grows into the work that changes the room.</p></div>
          </div>
        </div>
      </section>

      <section className="volunteer-join"><p className="scroll-reveal">A GOOD COMMUNITY IS A VERB.</p><a className="volunteer-join-link scroll-reveal" href="mailto:tinkerhub@scet.edu.in?subject=I%20want%20to%20volunteer">I&apos;M IN <ArrowUpRight /></a></section>
      <footer><a className="brand" href="/"><i>TH</i><span>SCET<br />CHAPTER</span></a><p>VOLUNTEERS<br />/ ALWAYS WELCOME</p><div><a href="/team">CORE TEAM -&gt;</a><a href="/past-events">EVENT ARCHIVE -&gt;</a></div><span>C 2025 TINKERHUB SCET</span></footer>
    </ChapterShell>
  );
}
