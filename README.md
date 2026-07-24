# TinkerHub SCET

Motion-first chapter site built with Next.js and GSAP.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content admin


Restart the dev server after creating or changing `.env.local`. The CMS can add, edit, remove, and attach images to past volunteers/hosts and past events. Content is stored in `data/content.json`; uploaded images are stored in `public/uploads`.

Sessions are signed and stored only in `HttpOnly`, `SameSite=Strict` cookies. Admin writes and uploads require an authenticated session, validate same-origin requests, and accept only JPG, PNG, WEBP, or GIF uploads up to 5 MB.

For production, deploy to a host with persistent disk or replace the local JSON/filesystem store with a database and object storage. Set the two environment variables in your hosting provider and use HTTPS.
