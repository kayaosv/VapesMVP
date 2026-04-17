import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import useAdminStore from '../store/useAdminStore.js'

export const Categorias = () => {
  const ref = useRef(null)
  const productos = useAdminStore((s) => s.productos)
  const categorias = useAdminStore((s) => s.categorias)

  useGSAP(() => {
    gsap.from('.cat-card', {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.07, ease: 'power3.out',
    })
  }, { scope: ref })

  const cats = categorias.map((c) => {
    const prods = productos.filter((p) => p.categoria === c.id)
    const agotados = prods.filter((p) => p.stock === 0).length
    const valorTotal = prods.reduce((a, p) => a + p.precio * p.stock, 0)
    return { ...c, total: prods.length, agotados, valorTotal }
  })

  return (
    <div ref={ref} className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Categorías</h1>
          <p className="page-subtitle">Vista por tipo de producto</p>
        </div>
      </div>

      <div className="cat-cards-grid">
        {cats.map((c) => (
          <div key={c.id} className="cat-card" style={{ '--cat-color': c.color }}>
            <div className="cat-card-header">
              <div className="cat-card-dot" />
              <span className="cat-card-nombre">{c.nombre}</span>
              <span className="cat-card-total">{c.total} productos</span>
            </div>
            <div className="cat-card-stats">
              <div className="cat-stat">
                <span className="cat-stat-value">{c.total - c.agotados}</span>
                <span className="cat-stat-label">con stock</span>
              </div>
              <div className="cat-stat">
                <span className={`cat-stat-value ${c.agotados > 0 ? 'cat-stat-value--warn' : ''}`}>{c.agotados}</span>
                <span className="cat-stat-label">agotados</span>
              </div>
              <div className="cat-stat">
                <span className="cat-stat-value">{c.valorTotal.toFixed(0)} €</span>
                <span className="cat-stat-label">en stock</span>
              </div>
            </div>
            <Link
              to={`/admin/productos?cat=${c.id}`}
              className="cat-card-link"
              onClick={() => {
                const store = useAdminStore.getState()
                store.setFiltro('categoria', c.id)
              }}
            >
              Ver productos →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
