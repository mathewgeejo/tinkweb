"use client";

import { ArrowDownRight, ArrowUpRight, Plus } from "lucide-react";
import { ChapterShell } from "@/app/components/chapter-shell";

const team = [
  { index: "01", role: "CAMPUS LEAD", initials: "CL", color: "acid", line: "Keeps the signal loud and the whole thing moving.", tags: ["VISION", "COMMUNITY", "MOMENTUM"] },
  { index: "02", role: "LEARNING COORDINATOR", initials: "LC", color: "paper", line: "Turns a curious room into a room that knows where to begin.", tags: ["SESSIONS", "SKILLS", "PEER LEARNING"] },
  { index: "03", role: "WOMEN IN TECH LEAD", initials: "WT", color: "red", line: "Makes space, opens doors, and keeps the table bigger than before.", tags: ["INCLUSION", "MENTORSHIP", "VOICE"] },
  { index: "04", role: "OUTREACH LEAD", initials: "OL", color: "ink", line: "Connects our work to people, partners, and places beyond campus.", tags: ["PARTNERSHIPS", "STORIES", "REACH"] },
];

export default function TeamPage() {
  return (
    <ChapterShell current="TEAM">
      <section className="sub-hero team-hero">
        <div className="sub-hero-meta page-reveal"><span>THE PEOPLE WHO KEEP THE LIGHTS ON</span><span>SCET / 2025</span></div>
        <div className="sub-hero-title">
          <div className="clip"><h1 className="page-reveal">MEET</h1></div>
          <div className="clip"><h1 className="page-reveal">THE <i>MESS.</i></h1></div>
        </div>
        <div className="team-doodle page-reveal">+</div>
        <div className="sub-hero-foot page-reveal"><p>Four roles. One shared refusal<br />to let good ideas stay quiet.</p><a href="#roster">THE ROSTER <ArrowDownRight /></a></div>
      </section>

      <section id="roster" className="team-intro">
        <p className="section-tag scroll-reveal">( 01 / CORE TEAM )</p>
        <p className="team-intro-copy scroll-reveal">No hierarchy of cool here. These are the people who connect dots, call the room together, and make the next experiment feel possible.</p>
      </section>

      <section className="team-roster">
        {team.map((member) => (
          <article className={`team-card team-card--${member.color} scroll-reveal`} key={member.role}>
            <div className="team-card-top"><span>{member.index}</span><span>TH / SCET</span></div>
            <div className="team-initials">{member.initials}</div>
            <div className="team-card-bottom"><p>{member.role}</p><h2>{member.line}</h2><div className="team-tags">{member.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            <div className="team-card-corner"><ArrowUpRight /></div>
          </article>
        ))}
      </section>

      <section className="team-cta">
        <div className="team-cta-star">*</div>
        <p className="section-tag scroll-reveal">( THIS COULD BE YOU )</p>
        <h2 className="scroll-reveal">BRING YOUR<br /><i>THING.</i></h2>
        <div className="team-cta-note scroll-reveal"><Plus size={20} /><p>Interested in leading a room, building a ritual, or connecting more people to the community? Let&apos;s make a place for you.</p></div>
        <a href="mailto:tinkerhub@scet.edu.in" className="team-cta-link scroll-reveal">SAY HELLO <ArrowUpRight /></a>
      </section>

      <footer><a className="brand" href="/"><i>TH</i><span>SCET<br />CHAPTER</span></a><p>CORE TEAM<br />/ 2025</p><div><a href="/volunteers">VOLUNTEERS -&gt;</a><a href="/past-events">EVENT ARCHIVE -&gt;</a></div><span>C 2025 TINKERHUB SCET</span></footer>
    </ChapterShell>
  );
}
