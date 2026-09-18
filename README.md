# Mohanaprabhu R — Portfolio

Dark, single-page portfolio built with the Next.js App Router, Tailwind CSS v4 and Framer Motion.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Editing content

Everything on the page — bio, stats, services, skills, education, experience,
projects, contact details — lives in [`lib/content.ts`](lib/content.ts).
Edit that one file and the whole site updates.

CVs are served from `public/`:

- `Mohanaprabhu-R-Frontend-Developer-CV.pdf`
- `Mohanaprabhu-R-UI-UX-Designer-CV.pdf`

Replace those files to publish a new version; the "Download CV" menu is driven
by the `resumes` array in `lib/content.ts`.

## Contact form email

The form posts to `/api/contact`, which delivers mail server-side. Two paths:

### 1. Works right now — no setup (FormSubmit)

With no API key configured the endpoint routes through
[FormSubmit](https://formsubmit.co), which needs no account.

**One-time step:** the first message sent through the form triggers an
activation email to `prabhudhivya0721@gmail.com` from FormSubmit. Open it and
click the confirmation link. Every message after that lands in the inbox
automatically.

### 2. Recommended for production (Resend)

Better deliverability, and the only option that can send from your own domain.

1. Create a free [Resend](https://resend.com/api-keys) account and generate an API key.
2. Copy the example env file and fill in the key:

   ```bash
   cp .env.example .env.local
   ```

   ```
   RESEND_API_KEY=re_your_key_here
   ```

3. Restart `npm run dev`.

When `RESEND_API_KEY` is present the endpoint uses Resend and ignores the
FormSubmit fallback entirely.

Optional env vars:

| Variable | Purpose | Default |
| --- | --- | --- |
| `CONTACT_TO` | Inbox that receives enquiries | `prabhudhivya0721@gmail.com` |
| `CONTACT_FROM` | Verified Resend sender | `Portfolio <onboarding@resend.dev>` |

Either way the endpoint validates input, caps field lengths, escapes HTML, sets
the reply-to address to the sender so you can reply straight from your inbox,
and silently drops submissions that trip the hidden honeypot field.

## Deploy

Push to GitHub and import the repo into Vercel. Add `RESEND_API_KEY` (and any
optional vars) under **Project Settings → Environment Variables**.
# portfolio
# portfolio
