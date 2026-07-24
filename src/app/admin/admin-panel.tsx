"use client";

import { ChangeEvent, useState } from "react";
import { Plus, Save, Trash2, Upload } from "lucide-react";
import { type ArchivedEvent, type Contributor, type SiteContent } from "@/lib/content-types";

const colorOptions = ["acid", "paper", "red", "ink"] as const;

function newContributor(): Contributor {
  return { id: `contributor-${Date.now()}`, name: "NEW CONTRIBUTOR", role: "VOLUNTEER", year: "2025", note: "", photo: "", color: "acid" };
}

function newEvent(): ArchivedEvent {
  return { id: `event-${Date.now()}`, date: "MM.YY", title: "NEW EVENT", type: "EVENT", note: "", photo: "", color: "acid" };
}

export function AdminPanel({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState("READY TO EDIT");
  const [saving, setSaving] = useState(false);

  function updateContributor(id: string, field: keyof Contributor, value: string) {
    setContent((current) => ({ ...current, contributors: current.contributors.map((person) => person.id === id ? { ...person, [field]: value } as Contributor : person) }));
  }
  function updateEvent(id: string, field: keyof ArchivedEvent, value: string) {
    setContent((current) => ({ ...current, events: current.events.map((event) => event.id === id ? { ...event, [field]: value } as ArchivedEvent : event) }));
  }
  function removeContributor(id: string) { setContent((current) => ({ ...current, contributors: current.contributors.filter((person) => person.id !== id) })); }
  function removeEvent(id: string) { setContent((current) => ({ ...current, events: current.events.filter((event) => event.id !== id) })); }

  async function upload(file: File, section: "contributor" | "event", id: string) {
    setMessage("UPLOADING IMAGE...");
    const data = new FormData(); data.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: data });
    const result = await response.json().catch(() => ({ error: "Upload failed." }));
    if (!response.ok) { setMessage(result.error); return; }
    if (section === "contributor") updateContributor(id, "photo", result.url); else updateEvent(id, "photo", result.url);
    setMessage("IMAGE ADDED - SAVE TO PUBLISH");
  }

  async function save() {
    setSaving(true); setMessage("SAVING...");
    const response = await fetch("/api/admin/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const result = await response.json().catch(() => ({ error: "Save failed." }));
    if (!response.ok) { setMessage(result.error); setSaving(false); return; }
    setContent(result); setMessage("PUBLISHED"); setSaving(false);
  }

  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); window.location.reload(); }
  const fileChange = (file: File | undefined, kind: "contributor" | "event", id: string) => { if (file) void upload(file, kind, id); };

  return (
    <main className="admin-page">
      <header className="admin-topbar"><a href="/" className="brand"><i>TH</i><span>SCET<br />CHAPTER</span></a><div><span>{message}</span><button onClick={logout}>LOG OUT</button></div></header>
      <section className="admin-hero"><p>( TINKERHUB SCET / CONTENT DESK )</p><h1>KEEP THE<br /><i>SIGNAL</i> FRESH.</h1><button className="admin-save" onClick={save} disabled={saving}><Save size={16} /> {saving ? "SAVING" : "SAVE + PUBLISH"}</button></section>
      <section className="admin-section">
        <div className="admin-section-head"><div><p>( 01 / PEOPLE ARCHIVE )</p><h2>VOLUNTEERS<br />+ HOSTS</h2></div><button onClick={() => setContent((current) => ({ ...current, contributors: [...current.contributors, newContributor()] }))}><Plus size={16} /> ADD PERSON</button></div>
        <div className="admin-editor-grid">{content.contributors.map((person) => <article className={`admin-card admin-card--${person.color}`} key={person.id}><div className="admin-card-top"><span>{person.role}</span><button aria-label={`Remove ${person.name}`} onClick={() => removeContributor(person.id)}><Trash2 size={16} /></button></div><div className="admin-photo">{person.photo ? <img src={person.photo} alt="" /> : <span>PHOTO SLOT</span>}<label><Upload size={15} /> <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event: ChangeEvent<HTMLInputElement>) => fileChange(event.target.files?.[0], "contributor", person.id)} /></label></div><label>NAME<input value={person.name} onChange={(event) => updateContributor(person.id, "name", event.target.value)} /></label><div className="admin-two-col"><label>ROLE<select value={person.role} onChange={(event) => updateContributor(person.id, "role", event.target.value)}><option>VOLUNTEER</option><option>HOST</option><option>VOLUNTEER + HOST</option></select></label><label>YEAR<input value={person.year} onChange={(event) => updateContributor(person.id, "year", event.target.value)} /></label></div><label>COLOUR<select value={person.color} onChange={(event) => updateContributor(person.id, "color", event.target.value)}>{colorOptions.map((color) => <option key={color}>{color}</option>)}</select></label><label>SHORT NOTE<textarea value={person.note} onChange={(event) => updateContributor(person.id, "note", event.target.value)} /></label></article>)}</div>
      </section>
      <section className="admin-section admin-events-section">
        <div className="admin-section-head"><div><p>( 02 / EVENT ARCHIVE )</p><h2>PAST<br />EVENTS</h2></div><button onClick={() => setContent((current) => ({ ...current, events: [...current.events, newEvent()] }))}><Plus size={16} /> ADD EVENT</button></div>
        <div className="admin-editor-grid">{content.events.map((event) => <article className={`admin-card admin-card--${event.color}`} key={event.id}><div className="admin-card-top"><span>{event.type}</span><button aria-label={`Remove ${event.title}`} onClick={() => removeEvent(event.id)}><Trash2 size={16} /></button></div><div className="admin-photo">{event.photo ? <img src={event.photo} alt="" /> : <span>EVENT PHOTO</span>}<label><Upload size={15} /> <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(eventChange) => fileChange(eventChange.target.files?.[0], "event", event.id)} /></label></div><label>TITLE<input value={event.title} onChange={(eventChange) => updateEvent(event.id, "title", eventChange.target.value)} /></label><div className="admin-two-col"><label>DATE<input value={event.date} onChange={(eventChange) => updateEvent(event.id, "date", eventChange.target.value)} /></label><label>TYPE<input value={event.type} onChange={(eventChange) => updateEvent(event.id, "type", eventChange.target.value)} /></label></div><label>COLOUR<select value={event.color} onChange={(eventChange) => updateEvent(event.id, "color", eventChange.target.value)}>{colorOptions.map((color) => <option key={color}>{color}</option>)}</select></label><label>ARCHIVE NOTE<textarea value={event.note} onChange={(eventChange) => updateEvent(event.id, "note", eventChange.target.value)} /></label></article>)}</div>
      </section>
      <button className="admin-floating-save" onClick={save} disabled={saving}>{saving ? "SAVING" : "SAVE"}</button>
    </main>
  );
}
