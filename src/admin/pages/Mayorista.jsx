import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useAdminStore from '../store/useAdminStore.js'
import { CATEGORIAS } from '../data/mockData.js'

export const Mayorista = () => {
  const ref = useRef(null)
  const productos = useAdminStore((s) => s.productos)
  const [catFiltro, setCatFiltro] = useState('todos')
  const [minPedido, setMinPedido] = useState(10)

  useGSAP(() => {
    gsap.from('.mayorista-row', { opacity: 0, y: 6, duration: 0.3, stagger: 0.025, ease: 'power2.out' })
  }, { scope: ref, dependencies: [catFiltro] })

  const filtrados = productos.filter((p) =>
    catFiltro === 'todos' ? true : p.categoria === catFiltro
  )

  const totalMayoristaMin = filtrados.reduce((a, p) => a + (p.precio_mayorista || 0) * minPedido, 0)
  const totalPublicoEquiv = filtrados.reduce((a, p) => a + p.precio * minPedido, 0)
  const ahorroPedido = totalPublicoEquiv - totalMayoristaMin

  return (
    <div ref={ref} className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Precios Mayorista</h1>
          <p className="page-subtitle">Gestión de precios al por mayor</p>
        </div>
        <div className="mayorista-badge">
          <span className="mayorista-badge-icon">⬡</span>
          <span>Venta al por mayor disponible</span>
        </div>
      </div>

      <div className="mayorista-stats-row">
        <div className="mayorista-info-banner">
          <div className="info-banner-col">
            <span className="info-banner-label">Pedido mínimo simulado</span>
            <div className="info-banner-input-row">
              <span>×</span>
              <input type="number" value={minPedido} min={1}
                onChange={(e) => setMinPedido(Number(e.target.value))} className="min-pedido-input" />
              <span>unidades por referencia</span>
            </div>
          </div>
          <div className="info-banner-divider" />
          <div className="info-banner-col">
            <span className="info-banner-label">Coste total mayorista</span>
            <span className="info-banner-total">{totalMayoristaMin.toFixed(2)} €</span>
          </div>
          <div className="info-banner-divider" />
          <div className="info-banner-col">
            <span className="info-banner-label">Equivalente precio público</span>
            <span className="info-banner-total info-banner-total--muted">{totalPublicoEquiv.toFixed(2)} €</span>
          </div>
          <div className="info-banner-divider" />
          <div className="info-banner-col">
            <span className="info-banner-label">Ahorro total en pedido</span>
            <span className="info-banner-total info-banner-total--green">−{ahorroPedido.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      <div className="mayorista-breakeven-note">
        <span className="note-icon">ℹ</span>
        <span>
          <strong>Equiv. tienda</strong> indica cuántas ventas al mayorista equivalen a 1 venta en tienda.
          Un valor de ×1.5 significa que necesitas vender 1.5 unidades al por mayor para igualar el ingreso de 1 venta al público.
        </span>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={catFiltro} onChange={(e) => setCatFiltro(e.target.value)}>
          <option value="todos">Todas las categorías</option>
          {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="productos-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Detalles</th>
              <th>P. Público</th>
              <th>P. Mayorista</th>
              <th>Margen</th>
              <th>Equiv. tienda</th>
              <th>Ahorro ×{minPedido}</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => {
              const margen = p.precio_mayorista
                ? (((p.precio - p.precio_mayorista) / p.precio) * 100).toFixed(1)
                : null
              const ahorro = p.precio_mayorista
                ? ((p.precio - p.precio_mayorista) * minPedido).toFixed(2)
                : null
              // Cuántas ventas mayorista = 1 venta tienda
              const equiv = p.precio_mayorista
                ? (p.precio / p.precio_mayorista).toFixed(2)
                : null

              return (
                <tr key={p.id} className="mayorista-row table-row">
                  <td className="td-producto">
                    <div className="producto-thumb">
                      <div className="thumb-placeholder">{p.nombre[0]}</div>
                    </div>
                    <div>
                      <p className="producto-nombre">{p.nombre}</p>
                      <p className="producto-marca">{p.marca || '—'}</p>
                    </div>
                  </td>
                  <td>
                    <span className="cat-pill" style={{ '--pill-color': CATEGORIAS.find((c) => c.id === p.categoria)?.color }}>
                      {CATEGORIAS.find((c) => c.id === p.categoria)?.nombre}
                    </span>
                  </td>
                  <td className="td-detalles">
                    {p.categoria === 'sales' && <span className="chip">{p.tamaño_ml}ml · {p.nicotina_mg}mg</span>}
                    {p.categoria === 'longfill' && <span className="chip">{p.concentrado_ml}ml/{p.botella_ml}ml</span>}
                    {p.categoria === 'desechables' && <span className="chip">{p.puffs} puffs</span>}
                    {p.categoria === 'vapers' && <span className="chip">{p.modelo || p.marca}</span>}
                  </td>
                  <td className="td-precio">{p.precio.toFixed(2)} €</td>
                  <td className="td-precio td-precio--mayorista">{p.precio_mayorista ? `${p.precio_mayorista.toFixed(2)} €` : '—'}</td>
                  <td>{margen ? <span className="margen-pill">{margen}%</span> : '—'}</td>
                  <td>
                    {equiv
                      ? (
                        <span className={`equiv-pill ${parseFloat(equiv) > 1.4 ? 'equiv-pill--high' : 'equiv-pill--low'}`}>
                          ×{equiv}
                        </span>
                      )
                      : '—'}
                  </td>
                  <td className="td-precio td-precio--ahorro">{ahorro ? `${ahorro} €` : '—'}</td>
                  <td>
                    <span className={`stock-num ${p.stock === 0 ? 'stock-num--zero' : p.stock <= 10 ? 'stock-num--low' : ''}`}>
                      {p.stock}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
