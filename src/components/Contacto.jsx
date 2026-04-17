import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Contacto = () => {
  const containerRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(leftRef.current.children,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' } }
    )
    gsap.fromTo(rightRef.current.children,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }, delay: 0.2 }
    )
  }, { scope: containerRef })

  return (
    <section id="contacto" ref={containerRef} className="py-32 px-6 md:px-16 relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Accent */}
      <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-orange" />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">

        {/* Left */}
        <div ref={leftRef} className="md:col-span-6 flex flex-col gap-8">
          <div>
            <span className="font-inter text-[11px] font-700 tracking-[0.3em] uppercase text-orange block mb-4">
              Encuéntranos
            </span>
            <h2 className="font-bebas text-[clamp(48px,7vw,100px)] leading-[0.9] text-brand-cream">
              DONDE<br />
              <span className="text-orange">ESTAMOS.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-700 text-sm text-brand-cream tracking-wide">
              Av. Ildefonso Marañón Lavín
            </span>
            <span className="font-inter font-300 text-sm text-brand-cream/50">
              Nº 9 – Local 2, 41019 Sevilla
            </span>
            <span className="font-inter font-300 text-sm text-brand-cream/30 mt-1">
              Parque Alcosa
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="font-inter text-[10px] font-700 tracking-[0.3em] uppercase text-orange/70 mb-2">
                Horario
              </p>
              <div className="font-inter font-300 text-sm text-brand-cream/60 flex flex-col gap-1">
                <span>Lunes – Viernes <span className="text-brand-cream">10:00–14:30 / 17:30–21:30</span></span>
                <span>Sábado <span className="text-brand-cream">10:00–14:00</span></span>
              </div>
            </div>

            <div>
              <p className="font-inter text-[10px] font-700 tracking-[0.3em] uppercase text-orange/70 mb-2">
                Pedidos
              </p>
              <p className="font-inter font-300 text-sm text-brand-cream/60">
                Solo tienda física. Para consultas escríbenos en Instagram.
              </p>
            </div>
          </div>
        </div>

        {/* Right: CTAs */}
        <div ref={rightRef} className="md:col-span-6 flex flex-col justify-center gap-4">

          <a
            href="https://instagram.com/vapers.alcosa"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 bg-orange p-8 hover:bg-brand-cream transition-colors duration-300"
          >
            <div>
              <p className="font-inter text-[10px] font-700 tracking-[0.3em] uppercase text-brand-dark/60 mb-1">Instagram</p>
              <p className="font-bebas text-3xl text-brand-dark leading-none">@vapers.alcosa</p>
            </div>
            <svg className="w-8 h-8 text-brand-dark flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>

          <a
            href="tel:682725780"
            className="group flex items-center justify-between gap-4 border border-brand-cream/10 p-8 hover:border-orange hover:bg-brand-cream/5 transition-all duration-300"
          >
            <div>
              <p className="font-inter text-[10px] font-700 tracking-[0.3em] uppercase text-brand-cream/30 mb-1">Teléfono</p>
              <p className="font-bebas text-3xl text-brand-cream leading-none">682 72 57 80</p>
            </div>
            <svg className="w-8 h-8 text-brand-cream/30 group-hover:text-orange transition-colors duration-300 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.4 12.19a19.79 19.79 0 01-3.07-8.67A2 2 0 013.31 1.5h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9.91a16 16 0 006 6l1.78-1.78a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>

          <div className="flex gap-4 mt-4">
            <a
              href="https://instagram.com/vapers.alcosa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-inter text-[11px] font-700 tracking-[0.2em] uppercase text-brand-cream/40 hover:text-orange transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center gap-2 font-inter text-[11px] font-700 tracking-[0.2em] uppercase text-brand-cream/40 hover:text-orange transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-brand-cream/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bebas text-xl text-brand-cream/20 tracking-widest">VAPERS ALCOSA</span>
        <span className="font-inter font-300 text-xs text-brand-cream/20 tracking-widest">
          © 2026 · Sevilla, España
        </span>
      </div>
    </section>
  )
}
