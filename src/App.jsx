import { useState } from 'react'
import BrandPanel from './components/BrandPanel'
import LoginForm from './components/LoginForm'
import SiteFooter from './components/SiteFooter'
import SplashScreen from './components/SplashScreen'

/**
 * App shell.
 *
 * On load we show a 10s SplashScreen (logo centered, icon at the bottom);
 * once it finishes it swaps in the auth page below.
 *
 * Auth page = grid with two rows: the 55/45 split fills available height, the
 * full-width footer sits below it (auto height). Below the `lg` breakpoint the
 * BrandPanel hides itself, so the grid collapses to a single column showing
 * just the form — no source reordering needed.
 */
export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash ? (
        <SplashScreen onDone={() => setShowSplash(false)} duration={2000} />
      ) : (
        <div className="grid min-h-screen grid-rows-[1fr_auto] ">
          <div className="grid lg:grid-cols-[54fr_46fr] px-0">
            <BrandPanel />
            <LoginForm />
          </div>
          <SiteFooter />
        </div>
      )}
    </>
  )
}
