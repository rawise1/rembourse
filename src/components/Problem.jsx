import { AlertTriangle, CreditCard, RefreshCw, HelpCircle } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: 'Arnaque en ligne',
    description:
      "Vous avez payé pour un service ou un produit qui n'a jamais été livré, ou vous avez été trompé par un site frauduleux.",
  },
  {
    icon: CreditCard,
    title: 'Abonnement caché',
    description:
      "Un montant est prélevé chaque mois sur votre compte sans que vous ayez clairement consenti à cet abonnement.",
  },
  {
    icon: RefreshCw,
    title: 'Prélèvement non autorisé',
    description:
      "Votre carte bancaire a été débitée sans votre accord et votre banque n'a pas encore résolu la situation.",
  },
  {
    icon: HelpCircle,
    title: 'Démarches sans résultat',
    description:
      "Vous avez contacté le marchand ou votre banque, mais vous n'obtenez aucune réponse satisfaisante.",
  },
]

export default function Problem() {
  const [ref, isInView] = useInView()

  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6" ref={ref}>
        {/* Section header */}
        <div className={`mb-14 text-center animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="mb-3 inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-700">
            Vous vous reconnaissez ?
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ces situations sont plus fréquentes
            <br className="hidden sm:block" /> qu'on ne le croit
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Chaque année, des milliers de personnes perdent leur argent à cause de pratiques
            commerciales abusives. Vous n'êtes pas seul(e).
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {PAIN_POINTS.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md animate-on-scroll delay-${(i + 1) * 100} ${isInView ? 'visible' : ''}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50">
                <Icon className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
