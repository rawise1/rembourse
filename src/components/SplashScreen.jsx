import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import icon from '../assets/icon.png'

/**
 * SplashScreen — full-screen intro shown before the auth page.
 *
 * Layout: the brand logo sits centered in the middle of the viewport, the
 * small icon pinned near the bottom. After `duration` ms it fades out and
 * calls `onDone`, which the parent uses to swap in the login page.
 */
export default function SplashScreen({ onDone, duration = 3000 }) {
  // Drives the closing fade so the handoff to the auth page isn't abrupt.
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const fadeAt = Math.max(duration - 600, 0)
    const fadeTimer = setTimeout(() => setLeaving(true), fadeAt)
    const doneTimer = setTimeout(() => onDone(), duration)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [duration, onDone])

  return (
    <div
      className={`fixed inset-0 z-50 grid grid-rows-[1fr_auto] place-items-center bg-base transition-opacity duration-500 ease-soft ${leaving ? 'opacity-0' : 'opacity-100'
        }`}
    >
      {/* Middle — leading logo */}
      <img
        src={logo}
        alt="Kolak"
        className="row-start-1 h-24 w-auto animate-pulse sm:h-28"
      />

      {/* Bottom — icon */}
      <img
        src={icon}
        alt=""
        className="row-start-2 mb-10 h-16 w-auto opacity-90"
      />
    </div>
  )
}
