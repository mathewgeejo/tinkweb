"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

type ChapterShellProps = {
  children: ReactNode;
  current: "TEAM" | "VOLUNTEERS" | "ARCHIVE";
  lightNav?: boolean;
};

export function ChapterShell({ children, current, lightNav = false }: ChapterShellProps) {
  const shell = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let active = true;
    let revert: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!active || !shell.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.from(".page-reveal", { yPercent: 110, duration: 1, stagger: 0.09, ease: "power4.out" });
        gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((item) => {
          gsap.from(item, { scrollTrigger: { trigger: item, start: "top 90%" }, y: 46, opacity: 0, duration: 0.75, ease: "power3.out" });
        });
      }, shell);
      revert = () => context.revert();
    })();
    return () => { active = false; revert?.(); };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={shell} className={lightNav ? "chapter-shell chapter-shell--light-nav" : "chapter-shell"}>
      <div className="grain" />
      <div ref={cursor} className="cursor-dot"><span>+</span></div>
      <nav className="chapter-nav">
        <a href="/" className="brand" aria-label="TinkerHub SCET home"><i>TH</i><span>SCET<br />CHAPTER</span></a>
        <span className="nav-current">( {current} )</span>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>{menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>
      <div className={`menu-sheet ${menuOpen ? "menu-sheet--open" : ""}`}>
        <a onClick={closeMenu} href="/">HOME <ArrowUpRight /></a>
        <a onClick={closeMenu} href="/team">CORE TEAM <ArrowUpRight /></a>
        <a onClick={closeMenu} href="/volunteers">VOLUNTEERS <ArrowUpRight /></a>
        <a onClick={closeMenu} href="/past-events">PAST EVENTS <ArrowUpRight /></a>
        <p>SCET TinkerHub<br />College of Engineering, Karunagappally</p>
      </div>
      {children}
    </main>
  );
}
