import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BENEFICIOS = [
  { n: '01', title: 'Precios exclusivos', desc: 'Tarifas especiales para clientes mayoristas con descuentos por volumen.' },
  { n: '02', title: 'Stock garantizado', desc: 'Acceso prioritario a nuevos productos y marcas antes de que lleguen al detalle.' },
  { n: '03', title: 'Sin complicaciones', desc: 'Trato directo, sin intermediarios. Hablas con nosotros desde el primer pedido.' },
  { n: '04', title: 'Entrega rápida', desc: 'Gestión ágil de pedidos. Recoge en tienda o consultamos envío según volumen.' },
]

export const Mayorista = () => {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const blockRef = useRef(null)
  const listRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: 'top 60%' },
    })

    tl.fromTo(headingRef.current.children,
      { opacity: 0, y: 60, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' }
    )
    .fromTo(blockRef.current,
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(listRef.current.children,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
  }, { scope: containerRef })

  return (
    <section
      id="mayorista"
      ref={containerRef}
      className="py-32 px-6 md:px-16 relative overflow-hidden"
      style={{ background: '#060606' }}
    >
      {/* Diagonal orange stripe */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, #FF4D00 0%, #FF4D00 3%, transparent 3.1%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto">

        {/* Top: heading + orange block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-20">

          <div ref={headingRef} className="md:col-span-7 flex flex-col gap-4">
            <span className="font-inter text-[11px] font-700 tracking-[0.3em] uppercase text-orange">
              Venta al por mayor
            </span>
            <h2 className="font-bebas text-[clamp(56px,9vw,140px)] leading-[0.88] text-brand-cream">
              ¿TIENES UN<br />
              <span className="text-orange">NEGOCIO?</span>
            </h2>
            <p className="font-inter font-300 text-base text-brand-cream/50 leading-relaxed max-w-md mt-2">
              Trabajamos con tiendas, distribuidores y revendedores. Si mueves volumen,
              tenemos las condiciones que necesitas.
            </p>
          </div>

          {/* Orange info block — offset */}
          <div
            ref={blockRef}
            className="md:col-span-5 md:col-start-9 relative"
            style={{ marginBottom: '-2rem' }}
          >
            <div className="bg-orange p-10 relative">
              <p className="font-inter text-[10px] font-700 tracking-[0.35em] uppercase text-brand-dark/50 mb-6">
                Así funciona
              </p>
              <div className="flex flex-col gap-5">
                <div>
                  <span className="font-bebas text-5xl text-brand-dark leading-none">Pedido mínimo</span>
                  <p className="font-inter font-400 text-sm text-brand-dark/70 mt-1">
                    Consulta condiciones según producto y volumen.
                  </p>
                </div>
                <div className="w-full h-px bg-brand-dark/15" />
                <div>
                  <span className="font-bebas text-5xl text-brand-dark leading-none">Precio especial</span>
                  <p className="font-inter font-400 text-sm text-brand-dark/70 mt-1">
                    Descuentos progresivos. A más volumen, mejor precio.
                  </p>
                </div>
              </div>
              {/* Corner detail */}
              <div className="absolute bottom-0 right-0 w-0 h-0"
                style={{
                  borderLeft: '32px solid transparent',
                  borderBottom: '32px solid #060606',
                }}
              />
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-cream/5 border-t border-brand-cream/5"
        >
          {BENEFICIOS.map(({ n, title, desc }) => (
            <div key={n} className="bg-brand-dark px-8 py-10 flex gap-6 group hover:bg-[#0f0f0f] transition-colors duration-300">
              <span className="font-bebas text-[11px] tracking-widest text-orange/40 pt-1 flex-shrink-0 group-hover:text-orange transition-colors duration-300">
                {n}
              </span>
              <div>
                <p className="font-bebas text-2xl text-brand-cream leading-none mb-2">{title}</p>
                <p className="font-inter font-300 text-sm text-brand-cream/40 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div ref={ctaRef} className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-brand-cream/5">
          <p className="font-inter font-300 text-sm text-brand-cream/30 max-w-xs leading-relaxed">
            Escríbenos por Instagram o llama directamente para hablar de condiciones.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/vapers.alcosa"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-orange px-8 py-4 hover:bg-brand-cream transition-colors duration-300"
            >
              <span className="font-bebas text-xl text-brand-dark tracking-wide leading-none">
                CONTACTAR AHORA
              </span>
              <svg className="w-5 h-5 text-brand-dark group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="tel:682725780"
              className="font-inter text-[11px] font-700 tracking-[0.2em] uppercase text-brand-cream/30 hover:text-orange transition-colors duration-200 whitespace-nowrap"
            >
              682 72 57 80
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
