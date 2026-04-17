import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { Nav } from './components/Nav.jsx'
import { Hero } from './components/Hero.jsx'
import { Categorias } from './components/Categorias.jsx'
import { Marcas } from './components/Marcas.jsx'
import { Nosotros } from './components/Nosotros.jsx'
import { Mayorista } from './components/Mayorista.jsx'
import { Contacto } from './components/Contacto.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    gsap.ticker.lagSmoothing(0)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <div className="grain">
      <Nav />
      <Hero />
      <Categorias />
      <Marcas />
      <Nosotros />
      <Mayorista />
      <Contacto />
    </div>
  )
}
