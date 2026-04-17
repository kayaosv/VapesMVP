import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { VapeScene } from '../scene/VapeScene'
import { useSceneStore } from '../store/useSceneStore'

export const Hero = () => {
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const taglineRef = useRef(null)
  const subcopyRef = useRef(null)
  const ctaRef = useRef(null)
  const hintRef = useRef(null)

  const hasInteracted = useSceneStore((s) => s.hasInteracted)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.3 })

    gsap.set([line1Ref.current, line2Ref.current], { clipPath: 'inset(0 0 100% 0)', y: 60 })
    gsap.set([taglineRef.current, subcopyRef.current, ctaRef.current], { opacity: 0, y: 30 })
    gsap.set(hintRef.current, { opacity: 0 })

    tl.to([line1Ref.current, line2Ref.current], {
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 1.1,
      stagger: 0.12,
    })
    .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to(subcopyRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
    .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to(hintRef.current, { opacity: 1, duration: 0.6 }, '-=0.2')
  }, { scope: containerRef })

  useGSAP(() => {
    if (hasInteracted && hintRef.current) {
      gsap.to(hintRef.current, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    }
  }, [hasInteracted])

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen overflow-hidden" style={{ background: '#0A0A0A' }}>

      {/* 3D Canvas — full background */}
      <div className="absolute inset-0 z-0">
        <VapeScene />
      </div>

      {/* Left text column */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pointer-events-none">
        <div className="px-6 md:px-16 pb-20 pt-32 max-w-[700px]">

          {/* Heading */}
          <div className="overflow-hidden mb-1">
            <h1 ref={line1Ref} className="font-bebas text-[clamp(72px,12vw,180px)] leading-none tracking-tight text-brand-cream">
              VAPERS
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 ref={line2Ref} className="font-bebas text-[clamp(72px,12vw,180px)] leading-none tracking-tight text-orange -mt-3 md:-mt-5">
              ALCOSA
            </h1>
          </div>

          <p ref={taglineRef} className="mt-6 font-inter font-300 text-xl md:text-2xl text-brand-cream/80 italic">
            Más que humo. Es vapor.
          </p>
          <p ref={subcopyRef} className="mt-2 font-inter font-300 text-xs tracking-[0.25em] uppercase text-brand-cream/40">
            Tu tienda en el Parque Alcosa · Sevilla
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4 pointer-events-auto" data-ui>
            <a
              href="https://instagram.com/vapers.alcosa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-orange text-brand-dark font-inter font-700 text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 hover:bg-brand-cream transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @vapers.alcosa
            </a>
            <a
              href="tel:682725780"
              data-ui
              className="flex items-center gap-3 border border-brand-cream/20 text-brand-cream/70 font-inter font-300 text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 hover:border-orange hover:text-orange transition-colors duration-300 pointer-events-auto"
            >
              682 72 57 80
            </a>
          </div>
        </div>
      </div>

      {/* Hold hint — centered bottom */}
      <div
        ref={hintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-5 h-5 rounded-full border border-orange/60 animate-pulse" />
        <span className="font-inter text-[9px] font-700 tracking-[0.35em] uppercase text-brand-cream/40">
          Mantén pulsado
        </span>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-cream/10 z-10" />
    </section>
  )
}
