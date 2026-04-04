import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const FAQ_ITEMS = [
  {
    question: 'Le service est-il vraiment gratuit ?',
    answer:
      'Oui, notre analyse initiale et nos premiers conseils sont entièrement gratuits. Nous ne vous demanderons jamais de payer quoi que ce soit à l\'avance. Si une procédure spécifique nécessite des frais, nous vous en informons clairement et avec votre accord préalable.',
  },
  {
    question: 'Quels types de remboursements traitez-vous ?',
    answer:
      'Nous traitons une large gamme de situations : arnaques en ligne, achats non reçus, abonnements non sollicités, prélèvements bancaires non autorisés, services non conformes à la description, et autres pratiques commerciales trompeuses. Chaque dossier est évalué individuellement.',
  },
  {
    question: 'Combien de temps dure la procédure ?',
    answer:
      'Le délai varie selon la complexité du dossier et le type de remboursement. Une procédure de chargeback bancaire prend généralement 2 à 8 semaines. Les négociations directes avec un marchand peuvent aller plus vite. Nous vous donnons une estimation lors de l\'analyse de votre dossier.',
  },
  {
    question: 'Que se passe-t-il après l\'envoi de ma demande ?',
    answer:
      'Un membre de notre équipe examine votre dossier et vous contacte sous 24 heures ouvrées. Lors de cet échange, nous vous expliquons les options disponibles, les chances de succès estimées et les prochaines étapes. Vous gardez le contrôle à chaque instant.',
  },
  {
    question: 'Quelles preuves dois-je préparer ?',
    answer:
      'Lors du premier contact, il n\'est pas nécessaire d\'avoir tous les documents. Par la suite, il peut être utile de rassembler : confirmation de commande ou paiement, relevés bancaires montrant le prélèvement, captures d\'écran du site ou de l\'échange, et toute correspondance avec le marchand.',
  },
  {
    question: 'Est-ce que mon cas a des chances d\'aboutir ?',
    answer:
      'Nous avons un taux de succès de 94% sur les dossiers que nous acceptons de traiter. Lors de l\'analyse gratuite, nous vous donnons une évaluation honnête de votre situation. Si les chances sont très faibles, nous vous le disons clairement — nous préférons votre confiance à une promesse impossible.',
  },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown
          className={`mt-0.5 h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 pr-8 text-sm leading-relaxed text-slate-500">{answer}</p>
      )}
    </div>
  )
}

export default function FAQ() {
  const [ref, isInView] = useInView()

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6" ref={ref}>
        <div className={`mb-12 text-center animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1 text-sm font-semibold text-brand-700">
            Questions fréquentes
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tout ce que vous devez savoir
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Vous avez d'autres questions ? Contactez-nous directement via le formulaire.
          </p>
        </div>

        <div className={`rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 px-6 sm:px-8 animate-on-scroll delay-100 ${isInView ? 'visible' : ''}`}>
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
