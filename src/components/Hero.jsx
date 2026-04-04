import { Shield, Clock, Star } from 'lucide-react'

const TRUST_BADGES = [
  { icon: Shield, label: '100% Gratuit' },
  { icon: Clock,  label: 'Réponse sous 24h' },
  { icon: Star,   label: 'Sans engagement' },
]

export default function Hero() {
  const scrollToForm = () => {
    document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      {/* Background decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400" />
          Service de récupération de fonds
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Récupérez votre argent.
          <br />
          <span className="text-accent-400">On s'occupe de tout.</span>
        </h1>

        {/* Subheadline */}
        <p className="mb-10 max-w-2xl text-lg text-blue-100 sm:text-xl">
          Victime d'une arnaque en ligne, d'un abonnement caché ou d'un prélèvement non
          autorisé ? Notre équipe d'experts vous accompagne pas à pas pour obtenir votre
          remboursement — rapidement et sans frais.
        </p>

        {/* CTA */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            onClick={scrollToForm}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green-900/30 transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-green-900/40 active:scale-95"
          >
            Demander mon remboursement
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <span className="text-sm text-blue-300">
            Gratuit · Confidentiel · Sans engagement
          </span>
        </div>

        {/* Trust badges */}
        <div className="mt-14 flex flex-wrap gap-6">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-blue-200">
              <Icon className="h-5 w-5 text-accent-400" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 0C480 0 240 60 0 30L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
