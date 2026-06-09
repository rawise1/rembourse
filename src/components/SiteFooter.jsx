/**
 * SiteFooter — full-width band spanning both columns, below the split.
 *
 * Left: nav links. Right: language dropdown + copyright. `justify-between`
 * stretches the two groups to the page edges; on small screens everything
 * wraps and centers.
 */
const NAV = [
  { label: 'About', href: 'https://l.instagram.com/?u=https%3A%2F%2Fabout.instagram.com%2F&e=AUAe8d0NHFKgeXq0phrSOR8u_a6qSV2nJUtdhA-5W7KSMBtbsxf5cpus5RRc-oZc4mYvUqIry-RiWqiMCtJTIalQ-HY2IVUU&s=1' },
  { label: 'Blog', href: 'https://about.instagram.com/blog/' },
  { label: 'Jobs', href: 'https://about.instagram.com/about-us/careers' },
  { label: 'Help', href: 'https://help.instagram.com/' },
  { label: 'API', href: 'https://developers.facebook.com/docs/instagram-platform' },
  { label: 'Privacy', href: 'https://www.instagram.com/legal/privacy/' },
  { label: 'Terms', href: 'https://help.instagram.com/581066165581870/' },
  { label: 'Locations', href: 'https://www.instagram.com/explore/locations/' },
  { label: 'Popular', href: 'https://www.instagram.com/popular/' },
  { label: 'Instagram Lite', href: 'https://www.instagram.com/web/lite/' },
  { label: 'Meta AI', href: 'https://www.meta.ai/' },
  { label: 'Threads', href: 'https://www.threads.com/' },
  { label: 'Contact Uploading & Non-Users', href: 'https://www.facebook.com/help/instagram/261704639352628' },
  { label: 'Meta Verified', href: '#' },
]

export default function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-line bg-base px-6 py-5 text-ink-3">
      {/* nav links — centered, small, wrap on narrow screens */}
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sys-11">
        {NAV.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-short-out ease-soft hover:text-ink"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* language + copyright — centered below */}
      <div className="flex items-center gap-4 text-sys-12">
        {/* plain text + chevron (no border/background) */}
        <select
          aria-label="Language"
          className="lang-select cursor-pointer border-0 bg-transparent pl-0 pr-5 text-sys-12 text-ink-3 transition-colors duration-short-out ease-soft hover:text-ink focus:text-ink focus:outline-none"
        >
          <option>English</option>
          <option>Français</option>
          <option>Español</option>
          <option>العربية</option>
          <option>Deutsch</option>
        </select>
        <span>© 2026 Instagram from Meta</span>
      </div>
    </footer>
  )
}
