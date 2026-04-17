import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIAS = [
  { id: 'desechables', label: 'Desechables', sub: 'Usa y disfruta', height: 'min-h-[340px]', desc: 'Los mejores desechables de las marcas líderes del mercado.' },
  { id: 'vapers', label: 'Vapers', sub: 'Dispositivos & Mods', height: 'min-h-[220px]', desc: 'Kits completos para todos los niveles de experiencia.' },
  { id: 'longfill', label: 'Longfill', sub: 'DIY concentrados', height: 'min-h-[220px]', desc: 'Concentrados premium para preparar tu mezcla perfecta.' },
  { id: 'sales', label: 'Sales', sub: 'Nic Salts', height: 'min-h-[280px]', desc: 'Sales de nicotina de absorción rápida y sabor intenso.' },
  { id: 'alquimia', label: 'Alquimia', sub: 'DIY & Bases', height: 'min-h-[220px]', desc: 'Todo lo que necesitas para crear tus propios líquidos.' },
  { id: 'accesorios', label: 'Accesorios', sub: 'Resistencias & más', height: 'min-h-[280px]', desc: 'Resistencias, baterías, algodón y todo el mantenimiento.' },
]

const CardIcon = ({ id }) => {
  const icons = {
    desechables: <path d="M12 2C8.13 2 5 5.13 5 9v7c0 2.76 2.24 5 5 5h4c2.76 0 5-2.24 5-5V9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5v1h-4V9h-2v1H7V9c0-2.76 2.24-5 5-5z" fill="currentColor"/>,
    vapers: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="currentColor"/>,
    longfill: <path d="M9 3v11c0 2.21 1.79 4 4 4s4-1.79 4-4V3h-2v7h-4V3H9zm2 0v5h2V3h-2z" fill="currentColor"/>,
    sales: <path d="M12 2l-5.5 9h11L12 2zm0 3.84L14.93 10H9.07L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5S15.01 22 17.5 22s4.5-2.01 4.5-4.5S19.99 13 17.5 13zm0 7c-1.38 0-2.5-1.12-2.5-2.5S16.12 15 17.5 15s2.5 1.12 2.5 2.5S18.88 20 17.5 20zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" fill="currentColor"/>,
    alquimia: <path d="M9 3v11c0 2.21 1.79 4 4 4s4-1.79 4-4V3h-2v4H11V3H9zm6 10c0 1.1-.9 2-2 2s-2-.9-2-2V9h4v4zM4 19h16v2H4z" fill="currentColor"/>,
    accesorios: <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" fill="currentColor"/>,
  }
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 opacity-60">
      {icons[id]}
    </svg>
  )
}

export const Categorias = () => {
  const containerRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      )

      const handleEnter = (e) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
        gsap.to(card, { rotateY: x, rotateX: y, scale: 1.03, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
      }
      const handleLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
      }

      card.addEventListener('mousemove', handleEnter)
      card.addEventListener('mouseleave', handleLeave)
    })
  }, { scope: containerRef })

  // no extra class needed — height is set per card via min-h

  return (
    <section id="productos" ref={containerRef} className="py-32 px-6 md:px-16" style={{ background: '#0A0A0A' }}>
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-inter text-[11px] font-700 tracking-[0.3em] uppercase text-orange block mb-4">
              Lo que encontrarás
            </span>
            <h2 className="font-bebas text-[clamp(48px,8vw,120px)] leading-none text-brand-cream">
              PRODUCTOS
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="font-inter font-300 text-sm text-brand-cream/40 max-w-xs">
              Stock renovado constantemente con las mejores marcas del mercado.
            </p>
          </div>
        </div>

        {/* Grid asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-cream/5">
          {CATEGORIAS.map((cat, i) => (
            <div
              key={cat.id}
              ref={el => cardsRef.current[i] = el}
              className={`group relative cursor-default bg-brand-dark p-8 md:p-10 flex flex-col justify-between overflow-hidden ${cat.height}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Hover bg */}
              <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

              {/* Border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-orange scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

              {/* Number */}
              <span className="font-bebas text-6xl md:text-8xl text-brand-cream/5 absolute bottom-4 right-6 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div>
                <CardIcon id={cat.id} />
                <p className="mt-4 font-inter text-[10px] font-700 tracking-[0.3em] uppercase text-orange/70">
                  {cat.sub}
                </p>
              </div>

              <div>
                <h3 className="font-bebas text-[clamp(32px,4vw,56px)] leading-none text-brand-cream group-hover:text-orange transition-colors duration-300">
                  {cat.label}
                </h3>
                <p className="mt-2 font-inter font-300 text-xs text-brand-cream/40 max-w-[200px] leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
