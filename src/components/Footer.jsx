import { Mail, Phone, Shield } from 'lucide-react'

const scrollToForm = () => {
  document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA Banner */}
      <div className="bg-brand-700 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            Prêt(e) à récupérer votre argent ?
          </h2>
          <p className="mb-8 text-blue-200">
            Demande gratuite · Réponse sous 24h · Sans engagement
          </p>
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-accent-600 active:scale-95"
          >
            Envoyer ma demande gratuitement
          </button>
        </div>
      </div>

      {/* Footer content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="mb-3 text-lg font-bold text-white">RemboursePro</p>
            <p className="text-sm leading-relaxed text-slate-400">
              Votre partenaire de confiance pour la récupération de fonds et la défense de
              vos droits de consommateur.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Contact
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400" />
                <a href="mailto:contact@remboursepro.fr" className="hover:text-white transition-colors">
                  contact@remboursepro.fr
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-400" />
                <span>Du lundi au vendredi, 9h–18h</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-400">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {['Notre service', 'Comment ça marche', 'Témoignages', 'FAQ', 'Nous contacter'].map(
                (link) => (
                  <li key={link}>
                    <button
                      onClick={scrollToForm}
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-slate-700 pt-8">
          {/* Legal disclaimer */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
            <p className="text-xs leading-relaxed text-slate-500">
              <strong className="text-slate-400">Avertissement légal :</strong> RemboursePro
              est un service d'assistance et de conseil. Nous ne garantissons pas le succès de
              toute procédure, lequel dépend des circonstances propres à chaque dossier, des
              politiques des établissements bancaires et des législations applicables. Les
              témoignages présentés sont représentatifs de cas réels mais les résultats peuvent
              varier. Toutes les données personnelles collectées sont traitées conformément au
              Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} RemboursePro. Tous droits réservés.</p>
            <div className="flex gap-4">
              <span className="cursor-pointer hover:text-slate-300 transition-colors">Politique de confidentialité</span>
              <span className="cursor-pointer hover:text-slate-300 transition-colors">Mentions légales</span>
              <span className="cursor-pointer hover:text-slate-300 transition-colors">CGU</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
