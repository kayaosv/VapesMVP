import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import useAdminStore from '../store/useAdminStore.js'
import { CATEGORIAS } from '../data/mockData.js'

export const Dashboard = () => {
  const ref = useRef(null)
  const stats = useAdminStore((s) => s.getStats())
  const analytics = useAdminStore((s) => s.getAnalytics())
  const productos = useAdminStore((s) => s.productos)

  useGSAP(() => {
    gsap.from('.stat-card', { y: 24, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' })
    gsap.from('.dash-section', { y: 16, opacity: 0, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power3.out' })
  }, { scope: ref })

  const valorInventario = productos.reduce((a, p) => a + p.precio * p.stock, 0)
  const margenGlobal = productos.filter((p) => p.precio_mayorista).reduce((a, p, _, arr) =>
    a + ((p.precio - p.precio_mayorista) / p.precio * 100) / arr.length, 0)

  const maxTopMarca = analytics.topMarcas[0]?.valor || 1

  return (
    <div ref={ref} className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Resumen general del catálogo</p>
        </div>
        <Link to="/admin/productos/nuevo" className="btn-primary">+ Nuevo producto</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total productos</span>
          <span className="stat-value">{stats.total}</span>
          <span className="stat-hint">en catálogo activo</span>
        </div>
        <div className="stat-card stat-card--warn">
          <span className="stat-label">Sin stock</span>
          <span className="stat-value">{stats.agotados}</span>
          <span className="stat-hint">requieren reposición</span>
        </div>
        <div className="stat-card stat-card--green">
          <span className="stat-label">Margen medio global</span>
          <span className="stat-value">{margenGlobal.toFixed(1)}%</span>
          <span className="stat-hint">precio venta vs mayorista</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Valor inventario</span>
          <span className="stat-value">{valorInventario.toFixed(0)} €</span>
          <span className="stat-hint">precio venta × stock</span>
        </div>
      </div>

      {/* Row 1 */}
      <div className="dash-row dash-row--3" style={{ marginBottom: 20 }}>
        <div className="dash-section dash-section--wide">
          <h2 className="section-title">Por categoría</h2>
          <div className="cat-bars">
            {stats.porCategoria.map((c) => (
              <div key={c.id} className="cat-bar-row">
                <span className="cat-bar-label">{c.nombre}</span>
                <div className="cat-bar-track">
                  <div className="cat-bar-fill" style={{ width: `${(c.count / stats.total) * 100}%`, background: c.color }} />
                </div>
                <span className="cat-bar-count">{c.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <h2 className="section-title">Margen por categoría</h2>
          <div className="cat-bars">
            {analytics.margenPorCategoria.map((c) => (
              <div key={c.id} className="cat-bar-row">
                <span className="cat-bar-label">{c.nombre}</span>
                <div className="cat-bar-track">
                  <div className="cat-bar-fill" style={{ width: `${c.margenProm}%`, background: c.color }} />
                </div>
                <span className="cat-bar-count cat-bar-count--margen">{c.margenProm}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="dash-row" style={{ marginBottom: 20 }}>
        <div className="dash-section dash-section--wide">
          <h2 className="section-title">Top marcas por valor en stock</h2>
          <div className="cat-bars">
            {analytics.topMarcas.map((m) => (
              <div key={m.marca} className="cat-bar-row cat-bar-row--marca">
                <span className="cat-bar-label">{m.marca}</span>
                <div className="cat-bar-track">
                  <div className="cat-bar-fill" style={{ width: `${(m.valor / maxTopMarca) * 100}%`, background: '#6366f1' }} />
                </div>
                <span className="cat-bar-count">{m.valor.toFixed(0)} €</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <h2 className="section-title">Stock bajo</h2>
          <div className="alert-list">
            {productos.filter((p) => p.stock <= 10).sort((a, b) => a.stock - b.stock).slice(0, 6).map((p) => (
              <Link key={p.id} to={`/admin/productos/${p.id}`} className="alert-row">
                <div className="alert-info">
                  <span className="alert-name">{p.nombre}</span>
                  <span className="alert-marca">{p.marca}</span>
                </div>
                <span className={`stock-badge ${p.stock === 0 ? 'stock-badge--empty' : 'stock-badge--low'}`}>
                  {p.stock === 0 ? 'AGOTADO' : `${p.stock} u.`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: distribuciones */}
      <div className="dash-row">
        <div className="dash-section">
          <h2 className="section-title">Distribución nicotina (mg)</h2>
          <div className="dist-bars">
            {analytics.distNicotina.map((d) => {
              const max = Math.max(...analytics.distNicotina.map((x) => x.count))
              return (
                <div key={d.mg} className="dist-bar-col">
                  <span className="dist-bar-count">{d.count}</span>
                  <div className="dist-bar-track">
                    <div className="dist-bar-fill" style={{ height: `${(d.count / max) * 100}%`, background: '#e53935' }} />
                  </div>
                  <span className="dist-bar-label">{d.mg}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="dash-section dash-section--wide">
          <h2 className="section-title">Distribución tamaños (ml)</h2>
          <div className="dist-bars dist-bars--wide">
            {analytics.distTamaños.map((d) => {
              const max = Math.max(...analytics.distTamaños.map((x) => x.count))
              return (
                <div key={d.ml} className="dist-bar-col">
                  <span className="dist-bar-count">{d.count}</span>
                  <div className="dist-bar-track">
                    <div className="dist-bar-fill" style={{ height: `${(d.count / max) * 100}%`, background: '#8b5cf6' }} />
                  </div>
                  <span className="dist-bar-label">{d.ml}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
