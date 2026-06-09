/**
 * TrainingBanner — fixed top bar marking this as an educational demo.
 *
 * Makes the teaching context explicit (class A2-268, MIT) so the page is never
 * mistaken for a real login. Kept high-contrast and always visible.
 */
export default function TrainingBanner() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 bg-amber-400 px-4 py-2 text-center text-[12px] font-semibold leading-tight text-black">
      <span>⚠️ EDUCATIONAL DEMO — Class A2-268 · MIT.</span>
      <span className="font-medium">
        Brand/UI training exercise. Do not enter real credentials — none are stored.
      </span>
    </div>
  )
}
