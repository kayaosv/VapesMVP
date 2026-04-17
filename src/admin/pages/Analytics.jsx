import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useAdminStore from '../store/useAdminStore.js'
import { CATEGORIAS } from '../data/mockData.js'

export const Analytics = () => {
  const ref = useRef(null)
  const analytics = useAdminStore((s) => s.getAnalytics())

  useGSAP(() => {
    gsap.from('.analytics-section', { y: 20, opacity: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out' })
  }, { scope: ref })

  const maxMarca = analytics.topMarcas[0]?.valor || 1
  const maxMargen = Math.max(...analytics.margenPorCategoria.map((c) => c.margenProm))

  // Scatter bounds
  const precios = analytics.scatterData.map((d) => d.precio)
  const margenes = analytics.scatterData.map((d) => d.margen)
  const minP = Math.min(...precios), maxP = Math.max(...precios)
  const minM = Math.min(...margenes), maxM = Math.max(...margenes)
  const scatterX = (p) => ((p - minP) / (maxP - minP || 1)) * 100
  const scatterY = (m) => 100 - ((m - minM) / (maxM - minM || 1)) * 100

  return (
    <div ref={ref} className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Distribuciones y métricas del catálogo</p>
        </div>
      </div>

      {/* Row 1: margen y top marcas */}
      <div className="dash-row" style={{ marginBottom: 20 }}>
        <div className="analytics-section dash-section dash-section--wide">
          <h2 className="section-title">Margen bruto por categoría</h2>
          <div className="analytics-bar-list">
            {analytics.margenPorCategoria.map((c) => (
              <div key={c.id} className="analytics-bar-row">
                <div className="analytics-bar-meta">
                  <span className="analytics-bar-name">{c.nombre}</span>
                  <span className="analytics-bar-value">{c.margenProm}%</span>
                </div>
                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar-fill"
                    style={{ width: `${(c.margenProm / maxMargen) * 100}%`, background: c.color }}
                  />
                  <span className="analytics-bar-sub">{c.count} refs con precio mayorista</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-section dash-section">
          <h2 className="section-title">Capital inmovilizado por marca</h2>
          <div className="analytics-bar-list">
            {analytics.topMarcas.map((m) => (
              <div key={m.marca} className="analytics-bar-row">
                <div className="analytics-bar-meta">
                  <span className="analytics-bar-name">{m.marca}</span>
                  <span className="analytics-bar-value">{m.valor.toFixed(0)} €</span>
                </div>
                <div className="analytics-bar-track">
                  <div
                    className="analytics-bar-fill"
                    style={{ width: `${(m.valor / maxMarca) * 100}%`, background: '#6366f1' }}
                  />
                  <span className="analytics-bar-sub">{m.productos} refs · {m.unidades} u.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: distribuciones */}
      <div className="dash-row" style={{ marginBottom: 20 }}>
        <div className="analytics-section dash-section">
          <h2 className="section-title">Distribución por nicotina</h2>
          <p className="section-desc">Número de SKUs por nivel de mg en sales y desechables</p>
          <div className="dist-bars dist-bars--tall">
            {analytics.distNicotina.map((d) => {
              const max = Math.max(...analytics.distNicotina.map((x) => x.count))
              return (
                <div key={d.mg} className="dist-bar-col">
                  <span className="dist-bar-count">{d.count}</span>
                  <div className="dist-bar-track dist-bar-track--tall">
                    <div className="dist-bar-fill" style={{ height: `${(d.count / max) * 100}%`, background: '#e53935' }} />
                  </div>
                  <span className="dist-bar-label">{d.mg}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="analytics-section dash-section dash-section--wide">
          <h2 className="section-title">Distribución por tamaño (ml)</h2>
          <p className="section-desc">Número de SKUs por volumen final de botella o envase</p>
          <div className="dist-bars dist-bars--tall dist-bars--wide">
            {analytics.distTamaños.map((d) => {
              const max = Math.max(...analytics.distTamaños.map((x) => x.count))
              return (
                <div key={d.ml} className="dist-bar-col">
                  <span className="dist-bar-count">{d.count}</span>
                  <div className="dist-bar-track dist-bar-track--tall">
                    <div className="dist-bar-fill" style={{ height: `${(d.count / max) * 100}%`, background: '#8b5cf6' }} />
                  </div>
                  <span className="dist-bar-label">{d.ml}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Row 3: scatter precio vs margen */}
      <div className="analytics-section dash-section">
        <h2 className="section-title">Precio público vs Margen bruto</h2>
        <p className="section-desc">
          Cada punto es un producto. Eje X = precio público (€), eje Y = margen sobre precio público (%).
          Ideal: esquina superior derecha (precio alto + margen alto).
        </p>
        <div className="scatter-wrapper">
          <div className="scatter-y-axis">
            <span>{maxM.toFixed(0)}%</span>
            <span>{((maxM + minM) / 2).toFixed(0)}%</span>
            <span>{minM.toFixed(0)}%</span>
          </div>
          <div className="scatter-area">
            {/* Grid lines */}
            <div className="scatter-grid-h" style={{ top: '0%' }} />
            <div className="scatter-grid-h" style={{ top: '50%' }} />
            <div className="scatter-grid-h" style={{ top: '100%' }} />
            <div className="scatter-grid-v" style={{ left: '0%' }} />
            <div className="scatter-grid-v" style={{ left: '50%' }} />
            <div className="scatter-grid-v" style={{ left: '100%' }} />

            {analytics.scatterData.map((d) => {
              const color = CATEGORIAS.find((c) => c.id === d.categoria)?.color || '#555'
              return (
                <div
                  key={d.id}
                  className="scatter-dot"
                  style={{
                    left: `${scatterX(d.precio)}%`,
                    top: `${scatterY(d.margen)}%`,
                    background: color,
                  }}
                  title={`${d.nombre}\n${d.precio.toFixed(2)} € · ${d.margen}%`}
                >
                  <div className="scatter-tooltip">
                    <strong>{d.nombre}</strong>
                    <span>{d.precio.toFixed(2)} € · {d.margen}% margen</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="scatter-x-axis">
            <span>{minP.toFixed(0)} €</span>
            <span>{((maxP + minP) / 2).toFixed(0)} €</span>
            <span>{maxP.toFixed(0)} €</span>
          </div>
        </div>

        {/* Leyenda */}
        <div className="scatter-legend">
          {CATEGORIAS.map((c) => (
            <div key={c.id} className="scatter-legend-item">
              <div className="scatter-legend-dot" style={{ background: c.color }} />
              <span>{c.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
