import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Nosotros = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const badgeRef = useRef(null)
  const statsRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top 65%' },
    })

    tl.fromTo(textRef.current.children,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
    .fromTo(imgRef.current,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(badgeRef.current,
      { opacity: 0, scale: 0.6, rotate: -30 },
      { opacity: 1, scale: 1, rotate: -6, duration: 0.7, ease: 'back.out(2)' },
      '-=0.3'
    )
    .fromTo(statsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
  }, { scope: containerRef })

  return (
    <section id="nosotros" ref={containerRef} className="py-32 px-6 md:px-16 relative overflow-hidden" style={{ background: '#0A0A0A' }}>

      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]"
        style={{ background: 'linear-gradient(to bottom left, #FF4D00, transparent)' }}
      />

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">

        {/* Text column */}
        <div ref={textRef} className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
          <span className="font-inter text-[11px] font-700 tracking-[0.3em] uppercase text-orange">
            Quiénes somos
          </span>

          <h2 className="font-bebas text-[clamp(48px,7vw,100px)] leading-[0.9] text-brand-cream">
            UN NEGOCIO<br />
            <span className="text-orange">DE FAMILIA.</span>
          </h2>

          <p className="font-inter font-300 text-base text-brand-cream/60 leading-relaxed max-w-md">
            Somos una tienda de vapers en el corazón del Parque Alcosa.
            Madre e hijos emprendiendo juntos desde el primer día, con la ilusión
            de ofrecerte el mejor producto y el trato más cercano.
          </p>

          <p className="font-inter font-300 text-sm text-brand-cream/40 leading-relaxed max-w-sm">
            Creemos que <span className="text-brand-cream/70 font-400">vapear no es fumar</span>.
            Es una herramienta real para quienes de verdad quieren dejar el tabaco.
          </p>

          <div className="flex items-center gap-3 mt-2">
            <div className="w-8 h-px bg-orange" />
            <span className="font-inter text-[11px] font-700 tracking-[0.25em] uppercase text-orange">
              Tienda Oficial OXVA · No.061
            </span>
          </div>
        </div>

        {/* Image column */}
        <div className="md:col-span-6 lg:col-span-7 relative">
          <div ref={imgRef} className="relative">
            {/* Main placeholder */}
            <div className="w-full aspect-[4/3] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #111 100%)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-bebas text-[120px] leading-none text-brand-cream/5 select-none">
                    VA
                  </div>
                  <p className="font-inter text-[10px] tracking-[0.4em] uppercase text-brand-cream/20">
                    Vapers Alcosa
                  </p>
                </div>
              </div>
              {/* Decorative lines */}
              <div className="absolute top-8 left-8 w-12 h-px bg-orange/40" />
              <div className="absolute top-8 left-8 w-px h-12 bg-orange/40" />
              <div className="absolute bottom-8 right-8 w-12 h-px bg-orange/20" />
              <div className="absolute bottom-8 right-8 w-px h-12 bg-orange/20" />
            </div>

            {/* Floating badge */}
            <div
              ref={badgeRef}
              className="absolute -top-6 -right-4 md:-right-8 w-24 h-24 md:w-28 md:h-28 rounded-full bg-orange flex items-center justify-center text-center -rotate-6 shadow-2xl"
            >
              <div>
                <span className="font-bebas text-3xl text-brand-dark leading-none block">2019</span>
                <span className="font-inter text-[8px] font-700 tracking-widest uppercase text-brand-dark/70">Desde</span>
              </div>
            </div>

            {/* Offset accent block */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-orange/20" />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div ref={statsRef} className="max-w-[1400px] mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-brand-cream/5">
        {[
          { n: '6+', label: 'Categorías de producto' },
          { n: '3', label: 'Marcas premium' },
          { n: '#061', label: 'Distribuidor oficial OXVA' },
          { n: 'ALK', label: 'Parque Alcosa · Sevilla' },
        ].map(({ n, label }) => (
          <div key={n} className="bg-brand-dark px-8 py-10 flex flex-col gap-2">
            <span className="font-bebas text-4xl md:text-5xl text-orange">{n}</span>
            <span className="font-inter text-[11px] font-300 text-brand-cream/40 uppercase tracking-widest leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
