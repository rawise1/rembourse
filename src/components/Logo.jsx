/**
 * Logo — a reusable brand lockup (solid mark + wordmark).
 *
 * The mark is a solid-filled rounded square standing in for a real logo
 * asset; swap it for an <img> when you have one. `size` controls the mark,
 * `showText` toggles the wordmark, so the same component serves the big header
 * and the small footer lockup.
 */
export default function Logo({ size = 36, showText = true, textClass = 'text-xl' }) {
  return (
    <span className="inline-flex items-center gap-3 font-extrabold tracking-tight">
      <span
        className="grid place-items-center rounded-[10px] font-extrabold text-white shadow-glow"
        style={{
          width: size,
          height: size,
          fontSize: size * 0.5,
          background: '#0095F6',
        }}
      >
        K
      </span>
      {showText && <span className={textClass}>Kolak</span>}
    </span>
  )
}
