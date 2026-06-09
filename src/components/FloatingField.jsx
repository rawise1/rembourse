/**
 * FloatingField — a text input whose label doubles as the placeholder.
 *
 * How it works (pure CSS, no JS state):
 *   • The input gets `placeholder=" "` (a single space) so the CSS
 *     `:placeholder-shown` state is true only while the field is empty.
 *   • The input is marked `peer`; the label is a sibling positioned over it.
 *   • Resting (empty, unfocused): label is vertically centered → reads as a
 *     placeholder.
 *   • On focus OR when filled (`peer-[:not(:placeholder-shown)]`): the label
 *     slides to the top-left and shrinks. On focus it also turns blue, matching
 *     the blue focus border.
 *
 * Because the real <label htmlFor> still wraps the field semantically, screen
 * readers and click-to-focus keep working.
 */
export default function FloatingField({ id, label, type = 'text', value, onChange, autoComplete }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        value={value}
        onChange={onChange}
        className="peer h-14 w-full rounded-[14px] border border-line-strong bg-transparent px-5 pb-2 pt-5 text-sys-14 text-ink
                   transition-[border-color] duration-short-out ease-soft
                   hover:border-grey-4
                   focus:border-accent focus:outline-none"
      />
      {/* Anchored at the resting (placeholder) position. On float we only
          translate up + scale down with `origin-top-left`, so it's one smooth
          GPU transform rather than a font-size jump. */}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-5 top-[19px] origin-top-left text-sys-14 font-medium text-grey-4
                   transition-all duration-short-out ease-soft
                   peer-focus:-translate-y-[11px] peer-focus:scale-[0.8] peer-focus:text-accent
                   peer-[:not(:placeholder-shown)]:-translate-y-[11px] peer-[:not(:placeholder-shown)]:scale-[0.8]"
      >
        {label}
      </label>
    </div>
  )
}
