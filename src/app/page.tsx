"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Menu, Plus, X } from "lucide-react";

const tracks = ["CODE", "CREATE", "QUESTION", "MAKE", "REPEAT"];

const events = [
  { date: "28", month: "JUL", time: "04:00 PM", title: "Build a weird web", type: "OPEN LAB" },
  { date: "31", month: "JUL", time: "05:30 PM", title: "Design without permission", type: "STUDIO SESSION" },
  { date: "04", month: "AUG", time: "10:00 AM", title: "Robots with feelings", type: "WEEKEND BUILD" },
];

export default function Home() {
  const app = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const heroWord = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      }
      if (heroWord.current) {
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * 8;
        heroWord.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    const timer = window.setTimeout(() => setLoaded(true), 500);
    return () => {
      window.removeEventListener("mousemove", move);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    let active = true;
    let revert: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!active || !app.current) return;
      const context = gsap.context(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".hero-reveal", { yPercent: 115, duration: 1.1, stagger: 0.08, ease: "power4.out" });
        gsap.from(".orbit", { scale: 0, rotate: -80, duration: 1.2, delay: 0.45, ease: "back.out(1.6)" });
        gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((item) => {
          gsap.from(item, { scrollTrigger: { trigger: item, start: "top 88%" }, y: 50, opacity: 0, duration: 0.9, ease: "power3.out" });
        });
      }, app);
      revert = () => context.revert();
    })();
    return () => { active = false; revert?.(); };
  }, []);

  return (
    <main ref={app} className="site-shell">
      <div className={`loader ${loaded ? "loader--out" : ""}`}><span>SCET / 09.45 N</span><b>TH.</b><span>LOADING IDEAS</span></div>
      <div className="grain" />
      <div ref={cursor} className="cursor-dot"><span>+</span></div>

      <nav className="nav">
        <a href="#top" className="brand" aria-label="TinkerHub SCET home"><i>TH</i><span>SCET<br />CHAPTER</span></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>{menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className={`menu-sheet ${menuOpen ? "menu-sheet--open" : ""}`}>
        <a onClick={() => setMenuOpen(false)} href="#about">OUR SIGNAL <ArrowUpRight /></a>
        <a onClick={() => setMenuOpen(false)} href="#events">WHAT&apos;S ON <ArrowUpRight /></a>
        <a onClick={() => setMenuOpen(false)} href="/team">CORE TEAM <ArrowUpRight /></a>
        <a onClick={() => setMenuOpen(false)} href="/volunteers">VOLUNTEERS <ArrowUpRight /></a>
        <a onClick={() => setMenuOpen(false)} href="/past-events">PAST EVENTS <ArrowUpRight /></a>
        <a onClick={() => setMenuOpen(false)} href="#join">JOIN THE MESS <ArrowUpRight /></a>
        <p>SCET TinkerHub<br />College of Engineering, Sahrdaya</p>
      </div>

      <section id="top" className="hero">
        <div className="hero-meta hero-reveal"><span>SCET / Sahrdaya</span><span>EST. 2024</span></div>
        <div className="hero-type" ref={heroWord}>
          <div className="clip"><span className="hero-reveal">TINKER</span></div>
          <div className="clip hero-second"><span className="hero-reveal">HUB</span><small className="hero-reveal">/ SCET</small></div>
        </div>
        <div className="orbit orbit-one"><span>CURIOUS<br />BY DEFAULT</span></div>
        <div className="orbit orbit-two"><span>NO<br />SPECTATORS</span></div>
        <div className="hero-bottom hero-reveal">
          <p>A student-powered playground for<br />unfinished ideas and loud experiments.</p>
          <a href="#about" className="scroll-cue">SCROLL TO MAKE <ArrowDownRight /></a>
        </div>
        <div className="hero-scribble">*</div>
      </section>

      <section id="about" className="marquee-wrap" aria-label="Our values">
        <div className="marquee"><span>MAKE IT REAL</span><b>*</b><span>MAKE IT WEIRD</span><b>*</b><span>MAKE IT TOGETHER</span><b>*</b><span>MAKE IT REAL</span></div>
      </section>

      <section className="manifesto section-grid">
        <div className="section-tag scroll-reveal">( 01 / OUR SIGNAL )</div>
        <div className="manifesto-copy scroll-reveal">
          <p className="eyebrow">THE SPACE BETWEEN<br />&quot;SOMEDAY&quot; &amp; <em>SHIPPED.</em></p>
          <h2>Less scrolling.<br /><i>More</i> building.</h2>
          <div className="manifesto-note"><Plus size={20} /><p>We meet where curiosity gets its hands dirty. No perfect portfolios required - just bring the question that won&apos;t leave you alone.</p></div>
        </div>
        <div className="sticker-cloud scroll-reveal"><span className="sticker sticker-a">open<br />source<br />energy</span><span className="sticker sticker-b">FAIL<br />FORWARD</span><span className="sticker sticker-c">IDEAS<br />NEED<br />FRIENDS</span></div>
      </section>

      <section className="playground">
        <div className="playground-head scroll-reveal"><p>THE TH / SCET PLAYGROUND</p><span>HOVER A TRACK -&gt;</span></div>
        <div className="track-list">
          {tracks.map((track, index) => <a href="#join" className="track scroll-reveal" key={track}><span>0{index + 1}</span><strong>{track}</strong><i>{index % 2 ? "DRAW THE MAP" : "LEARN BY DOING"}</i><ArrowUpRight /></a>)}
        </div>
      </section>

      <section id="events" className="events section-grid">
        <div className="section-tag scroll-reveal">( 02 / IN THE LAB )</div>
        <div className="events-main">
          <div className="events-title scroll-reveal"><h2>COME<br />BUILD <i>WITH</i><br />US.</h2><p>New reasons to leave your room.</p></div>
          <div className="event-list">
            {events.map((event) => <a className="event scroll-reveal" href="#join" key={event.title}><div className="event-date"><b>{event.date}</b><span>{event.month}</span></div><div className="event-copy"><small>{event.time} / {event.type}</small><h3>{event.title}</h3></div><ArrowUpRight /></a>)}
          </div>
        </div>
      </section>

      <section className="numbers">
        <p className="section-tag">( WE&apos;RE JUST WARMING UP )</p>
        <div className="number-grid"><div className="scroll-reveal"><b>240<span>+</span></b><p>makers in the loop</p></div><div className="scroll-reveal"><b>38</b><p>things made together</p></div><div className="scroll-reveal"><b>INF</b><p>bad ideas welcome</p></div></div>
      </section>

      <section id="join" className="join-section">
        <div className="join-star">*</div>
        <p className="scroll-reveal">YOU DON&apos;T NEED AN INVITATION.</p>
        <h2 className="scroll-reveal">JUST A<br /><i>SPARK.</i></h2>
        <a href="mailto:tinkerhub@scet.edu.in" className="join-button">GET IN THE LOOP <ArrowUpRight /></a>
        <span className="join-orbit">SCET * TINKERHUB * SCET * TINKERHUB *</span>
      </section>

      <footer><a className="brand" href="#top"><i>TH</i><span>SCET<br />CHAPTER</span></a><p>MADE WITH INTENT,<br />NOT A TEMPLATE.</p><div><a href="#top">INSTAGRAM -&gt;</a><a href="#top">LINKEDIN -&gt;</a></div><span>C 2025 TINKERHUB SCET</span></footer>
    </main>
  );
}
