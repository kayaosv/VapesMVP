import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BrandLogo = ({ name, official }) => {
  const styles = {
    'Just Juice': { font: 'bebas', size: 'text-4xl md:text-5xl', spacing: 'tracking-widest' },
    'OXVA': { font: 'bebas', size: 'text-5xl md:text-7xl', spacing: 'tracking-[0.3em]' },
    'Bombo': { font: 'bebas', size: 'text-4xl md:text-6xl', spacing: 'tracking-[0.2em]' },
  }
  const s = styles[name]
  return (
    <div className="relative group flex flex-col items-center gap-3">
      <span className={`font-${s.font} ${s.size} ${s.spacing} text-brand-cream/30 group-hover:text-brand-cream transition-colors duration-500`}>
        {name}
      </span>
      {official && (
        <span className="font-inter text-[9px] font-700 tracking-[0.3em] uppercase text-orange border border-orange/40 px-3 py-1">
          Distribuidores Oficiales · #061
        </span>
      )}
    </div>
  )
}

export const Marcas = () => {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const brandsRef = useRef(null)
  const lineRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
    )
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }, delay: 0.2 }
    )
    gsap.fromTo(brandsRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: brandsRef.current, start: 'top 80%' } }
    )
  }, { scope: containerRef })

  return (
    <section id="marcas" ref={containerRef} className="py-32 px-6 md:px-16 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={headingRef} className="mb-20">
          <span className="font-inter text-[11px] font-700 tracking-[0.3em] uppercase text-orange block mb-4">
            Con quiénes trabajamos
          </span>
          <div className="flex items-end gap-8">
            <h2 className="font-bebas text-[clamp(48px,8vw,120px)] leading-none text-brand-cream">
              MARCAS
            </h2>
            <div ref={lineRef} className="flex-1 h-px bg-brand-cream/10 origin-left mb-6 hidden md:block" />
          </div>
        </div>

        {/* Brands */}
        <div ref={brandsRef} className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 py-16 border-t border-b border-brand-cream/5">
          <BrandLogo name="Just Juice" />
          <div className="w-px h-16 bg-brand-cream/10 hidden md:block" />
          <BrandLogo name="OXVA" official />
          <div className="w-px h-16 bg-brand-cream/10 hidden md:block" />
          <BrandLogo name="Bombo" />
        </div>

        {/* Extra copy */}
        <p className="mt-12 font-inter font-300 text-sm text-brand-cream/30 text-center max-w-lg mx-auto leading-relaxed">
          Trabajamos solo con marcas de confianza. Stock actualizado y garantía de calidad en cada producto.
        </p>
      </div>
    </section>
  )
}
