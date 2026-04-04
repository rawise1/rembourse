import { CheckCircle } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const BENEFITS = [
  'Analyse gratuite de votre dossier en moins de 24h',
  'Experts en droit de la consommation et chargeback bancaire',
  'Démarches effectuées entièrement à votre place',
  'Communication directe avec banques et organismes',
  'Suivi transparent jusqu\'au remboursement',
  'Aucun frais caché, aucune surprise',
]

export default function Solution() {
  const [ref, isInView] = useInView()

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6" ref={ref}>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text side */}
          <div className={`animate-on-scroll ${isInView ? 'visible' : ''}`}>
            <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
              Notre solution
            </span>
            <h2 className="mb-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              RemboursePro,{' '}
              <span className="text-brand-600">votre expert</span>{' '}
              en récupération de fonds
            </h2>
            <p className="mb-8 text-slate-500 leading-relaxed">
              RemboursePro est un service spécialisé dans la récupération de fonds pour les
              victimes de pratiques commerciales abusives. Nous maîtrisons les procédures de
              rétrofacturation bancaire, les recours légaux et les négociations avec les
              marchands — pour que vous n'ayez qu'une seule chose à faire : nous faire confiance.
            </p>
            <ul className="space-y-3">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual side */}
          <div className={`animate-on-scroll delay-200 ${isInView ? 'visible' : ''}`}>
            <div className="relative rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-2xl">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10" />

              <p className="mb-6 text-sm font-medium uppercase tracking-widest text-blue-300">
                Pourquoi nous choisir
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '94%',    label: 'Taux de succès' },
                  { value: '+2 500', label: 'Clients aidés' },
                  { value: '48h',    label: 'Délai moyen' },
                  { value: '0 €',    label: 'Frais cachés' },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-extrabold text-accent-400">{value}</p>
                    <p className="mt-1 text-sm text-blue-200">{label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-relaxed text-blue-200">
                "Nous avons aidé des milliers de Français à récupérer leur argent.
                Votre dossier mérite toute notre attention."
              </p>
              <p className="mt-3 text-sm font-semibold text-white">
                — L'équipe RemboursePro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
