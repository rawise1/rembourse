import { useState } from 'react'
import FloatingField from './FloatingField'
import icon from '../assets/icon.png'
import { SUBMIT_EVENT_URL, SUPABASE_ANON_KEY } from '../lib/supabase'

/**
 * ClassroomSurvey (JSX version)
 *
 * Educational demo:
 * - React state
 * - Controlled inputs
 * - JSON creation
 * - API request flow
 */
export default function ClassroomSurvey() {
  const [favoriteFruit, setFavoriteFruit] = useState('')
  const [favoriteColor, setFavoriteColor] = useState('')
  const [loading, setLoading] = useState(false)

  const canSubmit =
    favoriteFruit.trim().length > 0 &&
    favoriteColor.trim().length > 0

  const buildPayload = () => ({
    favoriteFruit: favoriteFruit.trim(),
    favoriteColor: favoriteColor.trim(),
    submittedAt: new Date().toISOString(),
  })

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!canSubmit || loading) return

    setLoading(true)

    try {
      const payload = buildPayload()

      // 👇 students see this in DevTools
      console.log('📦 Payload sent to server:', payload)

      await fetch(SUBMIT_EVENT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex items-center justify-center border-l-2 border-line-strong bg-[#1c1e21] px-6 py-10 sm:px-8">
      <div className="flex w-full max-w-[530px] flex-col">

        {/* Header */}
        <h2 className="text-sys-20 font-medium tracking-[0.01em]">
          🍎 Classroom Data Flow Demo
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          Input → React state → JSON → API request
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-8 flex flex-col gap-4"
        >
          <FloatingField
            id="favoriteFruit"
            label="What is your favorite fruit?"
            type="text"
            value={favoriteFruit}
            onChange={(e) => setFavoriteFruit(e.target.value)}
          />

          <FloatingField
            id="favoriteColor"
            label="What is your favorite color?"
            type="text"
            value={favoriteColor}
            onChange={(e) => setFavoriteColor(e.target.value)}
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="h-14 w-full rounded-[30px] bg-accent text-white font-semibold shadow-glow transition duration-200 hover:bg-accent-hover active:scale-[0.98] disabled:opacity-40"
          >
            {loading ? 'Submitting…' : 'Submit Survey'}
          </button>

          {/* Live JSON preview */}
          <div className="mt-4 p-3 rounded-xl bg-black/20 text-xs text-gray-300">
            <p className="mb-1 font-medium">Live JSON Preview</p>
            <pre>
              {JSON.stringify(
                canSubmit ? buildPayload() : {},
                null,
                2
              )}
            </pre>
          </div>
        </form>

        {/* Footer icon */}
        <div className="mt-6 flex justify-center">
          <img src={icon} alt="Demo icon" className="h-14 w-auto" />
        </div>

      </div>
    </section>
  )
}