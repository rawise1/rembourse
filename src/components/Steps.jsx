import { ClipboardList, Search, Briefcase, BadgeCheck } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const STEPS = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Décrivez votre situation',
    description:
      'Remplissez notre formulaire en quelques minutes. Expliquez votre problème et le montant concerné. Aucun document requis à cette étape.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Analyse de votre dossier',
    description:
      'Nos experts étudient votre cas sous 24h et évaluent les chances de remboursement. Vous recevez un retour personnalisé par email ou téléphone.',
  },
  {
    icon: Briefcase,
    number: '03',
    title: 'On agit à votre place',
    description:
      'Nous contactons la banque, le marchand ou les organismes compétents et engageons les procédures nécessaires en votre nom.',
  },
  {
    icon: BadgeCheck,
    number: '04',
    title: 'Vous récupérez votre argent',
    description:
      'Une fois le remboursement obtenu, vous êtes immédiatement informé(e). Nous assurons le suivi jusqu\'à la finalisation complète du dossier.',
  },
]

export default function Steps() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <div className={`mb-14 text-center animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
            Comment ça marche
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            4 étapes simples pour récupérer ce qui vous appartient
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, number, title, description }, i) => (
            <div
              key={number}
              className={`relative animate-on-scroll delay-${(i + 1) * 100} ${isInView ? 'visible' : ''}`}
            >
              {/* Connector line (desktop only) */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-full top-6 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-brand-200 to-transparent lg:block" style={{ width: 'calc(100% - 48px)', left: '48px' }} />
              )}

              <div className="flex flex-col items-start">
                <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-lg">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-bold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
