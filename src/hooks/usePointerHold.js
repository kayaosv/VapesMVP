import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useSceneStore } from '../store/useSceneStore'

export const usePointerHold = () => {
  const intensityRef = useRef({ value: 0 })
  const tweenRef = useRef(null)

  useEffect(() => {
    const setHolding = useSceneStore.getState().setHolding
    const setHasInteracted = useSceneStore.getState().setHasInteracted

    const start = (e) => {
      if (e.target?.closest?.('[data-ui]')) return
      setHolding(true)
      setHasInteracted(true)
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(intensityRef.current, { value: 1, duration: 1.2, ease: 'power2.out' })
    }
    const end = () => {
      setHolding(false)
      tweenRef.current?.kill()
      tweenRef.current = gsap.to(intensityRef.current, { value: 0, duration: 1.6, ease: 'power2.in' })
    }

    window.addEventListener('pointerdown', start)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
    window.addEventListener('pointerleave', end)
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      window.removeEventListener('pointerleave', end)
      tweenRef.current?.kill()
    }
  }, [])

  return intensityRef
}
