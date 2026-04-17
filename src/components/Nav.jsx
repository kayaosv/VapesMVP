import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Nav = () => {
  const navRef = useRef(null)

  useGSAP(() => {
    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () => gsap.to(navRef.current, { backgroundColor: 'rgba(10,10,10,0.96)', backdropFilter: 'blur(12px)', duration: 0.4 }),
      onLeaveBack: () => gsap.to(navRef.current, { backgroundColor: 'transparent', backdropFilter: 'blur(0px)', duration: 0.4 }),
    })
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-colors" style={{ backgroundColor: 'transparent' }}>
      <a href="#hero" className="flex items-center gap-3 group">
        <span className="font-bebas text-4xl text-orange leading-none tracking-tight">VA</span>
        <span className="text-[10px] font-inter font-700 tracking-[0.25em] uppercase text-brand-cream opacity-70">Vapers Alcosa</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {[['#productos', 'Productos'], ['#marcas', 'Marcas'], ['#nosotros', 'Nosotros'], ['#mayorista', 'Mayoristas'], ['#contacto', 'Contacto']].map(([href, label]) => (
          <a key={href} href={href} className="text-[11px] font-inter font-700 tracking-[0.2em] uppercase text-brand-cream/60 hover:text-brand-cream transition-colors duration-200">
            {label}
          </a>
        ))}
      </div>

      <a
        href="#contacto"
        className="font-inter font-700 text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 bg-orange text-brand-dark hover:bg-brand-cream transition-colors duration-200"
      >
        Visítanos
      </a>
    </nav>
  )
}
