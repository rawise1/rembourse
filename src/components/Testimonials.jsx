import { Star } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const TESTIMONIALS = [
  {
    name: 'Marie D.',
    location: 'Lyon',
    amount: '320 €',
    stars: 5,
    text:
      "J'avais payé pour un logiciel qui ne fonctionnait jamais. Après des semaines à me battre seule, j'ai contacté RemboursePro. En moins de deux semaines, j'ai récupéré la totalité de mon argent. Je recommande vivement !",
  },
  {
    name: 'Thomas B.',
    location: 'Paris',
    amount: '890 €',
    stars: 5,
    text:
      "Un abonnement s'était glissé dans mes prélèvements bancaires depuis 8 mois. L'équipe a pris en charge tout le dossier et j'ai été remboursé de 8 mois de frais. Efficace et professionnel.",
  },
  {
    name: 'Sophie L.',
    location: 'Bordeaux',
    amount: '1 250 €',
    stars: 5,
    text:
      "Victime d'un marchand frauduleux, je pensais avoir perdu cet argent définitivement. RemboursePro a engagé une procédure de chargeback auprès de ma banque. Résultat : remboursement intégral en 3 semaines.",
  },
  {
    name: 'Karim M.',
    location: 'Marseille',
    amount: '180 €',
    stars: 4,
    text:
      "Service très réactif, ils ont répondu à ma demande le lendemain. La procédure a été bien expliquée. Petit bémol sur les délais un peu plus longs que prévu, mais le remboursement est bien arrivé.",
  },
  {
    name: 'Isabelle F.',
    location: 'Nantes',
    amount: '450 €',
    stars: 5,
    text:
      "Je n'aurais jamais su faire ça toute seule. L'équipe a été disponible, patiente et très compétente. Merci infiniment pour votre aide, c'était une vraie bouffée d'air.",
  },
  {
    name: 'Nicolas R.',
    location: 'Toulouse',
    amount: '2 100 €',
    stars: 5,
    text:
      "J'avais été victime d'un investissement frauduleux. Grâce à RemboursePro, la procédure a été correctement engagée et j'ai récupéré une partie significative de ma mise. Service sérieux et honnête.",
  },
]

const STATS = [
  { value: '94 %',   label: 'Taux de succès' },
  { value: '+2 500', label: 'Clients remboursés' },
  { value: '48h',    label: 'Délai de réponse' },
  { value: '4,9/5',  label: 'Note moyenne' },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [ref, isInView] = useInView()

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <div className={`mb-14 text-center animate-on-scroll ${isInView ? 'visible' : ''}`}>
          <span className="mb-3 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
            Témoignages clients
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Ils ont récupéré leur argent grâce à nous
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Des centaines de Français nous ont fait confiance. Voici quelques-uns de leurs témoignages.
          </p>
        </div>

        {/* Stats bar */}
        <div className={`mb-14 grid grid-cols-2 gap-4 rounded-2xl bg-brand-800 p-6 text-white sm:grid-cols-4 animate-on-scroll delay-100 ${isInView ? 'visible' : ''}`}>
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold text-accent-400">{value}</p>
              <p className="mt-1 text-sm text-blue-200">{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map(({ name, location, amount, stars, text }, i) => (
            <div
              key={name}
              className={`flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md animate-on-scroll delay-${Math.min((i + 1) * 100, 400)} ${isInView ? 'visible' : ''}`}
            >
              <StarRating count={stars} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">"{text}"</p>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="font-semibold text-slate-900">{name}</p>
                  <p className="text-xs text-slate-400">{location}</p>
                </div>
                <span className="rounded-full bg-accent-50 px-3 py-1 text-sm font-bold text-accent-600">
                  +{amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
