# RemboursePro — Lead Generation Website

High-converting French-language landing page for refund/recovery assistance.  
Built with **React + Vite + Tailwind CSS**, **Supabase** (database + Edge Functions), and **Resend** (email).

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Vite, Tailwind CSS 3    |
| Database | Supabase (PostgreSQL)             |
| Backend  | Supabase Edge Functions (Deno)    |
| Email    | Resend API                        |

---

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero with CTA
│   │   ├── Problem.jsx       # Pain points
│   │   ├── Solution.jsx      # Service pitch + stats
│   │   ├── Steps.jsx         # 4-step process
│   │   ├── Testimonials.jsx  # Social proof
│   │   ├── Form.jsx          # Lead capture form
│   │   ├── FAQ.jsx           # Accordion FAQ
│   │   └── Footer.jsx        # Footer + legal
│   ├── hooks/
│   │   └── useInView.js      # Scroll animation hook
│   ├── lib/
│   │   └── supabase.js       # Supabase client
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase/
│   ├── functions/
│   │   └── send-lead/
│   │       └── index.ts      # Edge Function (validate → DB → email)
│   └── migrations/
│       └── 20240101000000_create_leads.sql
├── .env.example
└── package.json
```

---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> You get these from: **Supabase Dashboard → Project → Settings → API**

### 3. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Supabase Setup

### Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Wait for the project to be provisioned.

### Step 2 — Run the database migration

Option A — Supabase Dashboard:
1. Go to **SQL Editor**
2. Copy and paste the content of `supabase/migrations/20240101000000_create_leads.sql`
3. Click **Run**

Option B — Supabase CLI:
```bash
npx supabase db push
```

### Step 3 — Deploy the Edge Function

Install the Supabase CLI if you haven't:
```bash
npm install -g supabase
```

Login and link your project:
```bash
supabase login
supabase link --project-ref your-project-id
```

Deploy the function:
```bash
supabase functions deploy send-lead
```

### Step 4 — Set Edge Function secrets

These secrets are **never** exposed to the frontend:

```bash
supabase secrets set RESEND_API_KEY=re_your_resend_key
supabase secrets set FROM_EMAIL="RemboursePro <noreply@yourdomain.com>"
```

> `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are automatically available inside Edge Functions — no need to set them manually.

---

## Resend Setup

1. Create a free account at [resend.com](https://resend.com)
2. Verify your sending domain (or use the sandbox domain for testing)
3. Generate an API key from the dashboard
4. Set the secret: `supabase secrets set RESEND_API_KEY=re_...`

> **Important:** Update the `FROM_EMAIL` secret to use your verified domain.  
> Example: `RemboursePro <noreply@remboursepro.fr>`

---

## Production Deployment (Frontend)

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel Dashboard → Project → Settings → Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Netlify

```bash
npm run build
# Then drag & drop the `dist/` folder to netlify.com/drop
```

Or connect your GitHub repo and set the same env variables in Netlify's dashboard.

---

## Environment Variables Reference

| Variable                  | Where        | Description                               |
|---------------------------|--------------|-------------------------------------------|
| `VITE_SUPABASE_URL`       | `.env`       | Your Supabase project URL                 |
| `VITE_SUPABASE_ANON_KEY`  | `.env`       | Supabase anon/public key                  |
| `RESEND_API_KEY`          | Supabase secret | Resend API key for sending emails      |
| `FROM_EMAIL`              | Supabase secret | Sender address (must be verified domain)|

---

## Form Submission Flow

```
User submits form
      │
      ▼
Form.jsx — client-side validation
      │
      ▼
supabase.functions.invoke('send-lead', { body })
      │
      ▼
Edge Function (send-lead/index.ts)
  ├─ Server-side validation
  ├─ INSERT into leads table (service role key)
  └─ POST to Resend API → email to both recipients
      │
      ▼
{ success: true } → Frontend shows success state
```

---

## Security Notes

- The `SUPABASE_SERVICE_ROLE_KEY` **never** touches the frontend — only used server-side in the Edge Function.
- Row Level Security (RLS) is enabled on the `leads` table. No public read or write access.
- All inputs are validated on both client and server.
- HTML email content is sanitized against XSS.

---

## Email Recipients

Notifications are sent to:
- `saad.mney96@gmail.com`
- `raswise19@gmail.com`

To change recipients, edit the `RECIPIENTS` array in `supabase/functions/send-lead/index.ts` and redeploy.
