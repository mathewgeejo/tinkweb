"use client";

import { FormEvent, useState } from "react";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const result = await response.json().catch(() => ({ error: "Unable to sign in." }));
    if (!response.ok) { setMessage(result.error); setLoading(false); return; }
    window.location.reload();
  }

  return (
    <main className="admin-login-page">
      <div className="admin-login-mark">TH</div>
      <section className="admin-login-card">
        <p>( PRIVATE CONTENT DESK )</p>
        <h1>ADMIN<br /><i>ACCESS.</i></h1>
        {configured ? <form onSubmit={submit}><label htmlFor="admin-password">PASSWORD</label><input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button disabled={loading}>{loading ? "CHECKING..." : "UNLOCK CMS"}</button>{message && <small role="alert">{message}</small>}</form> : <div className="admin-setup"><b>SETUP REQUIRED</b><p>Create `.env.local` from `.env.example`, set both admin secrets, then restart the dev server.</p></div>}
      </section>
    </main>
  );
}
