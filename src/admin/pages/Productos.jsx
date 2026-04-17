import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import useAdminStore from '../store/useAdminStore.js'
import { CATEGORIAS } from '../data/mockData.js'

const SORT_FIELDS = {
  nombre: (a, b) => a.nombre.localeCompare(b.nombre),
  precio: (a, b) => a.precio - b.precio,
  precio_mayorista: (a, b) => (a.precio_mayorista || 0) - (b.precio_mayorista || 0),
  margen: (a, b) => {
    const mA = a.precio_mayorista ? (a.precio - a.precio_mayorista) / a.precio : 0
    const mB = b.precio_mayorista ? (b.precio - b.precio_mayorista) / b.precio : 0
    return mA - mB
  },
  stock: (a, b) => a.stock - b.stock,
}

export const Productos = () => {
  const ref = useRef(null)
  const filtros = useAdminStore((s) => s.filtros)
  const setFiltro = useAdminStore((s) => s.setFiltro)
  const resetFiltros = useAdminStore((s) => s.resetFiltros)
  const getProductosFiltrados = useAdminStore((s) => s.getProductosFiltrados)
  const deleteProducto = useAdminStore((s) => s.deleteProducto)
  const marcas = useAdminStore((s) => s.marcas)

  const [confirmDelete, setConfirmDelete] = useState(null)
  const [precioMin, setPrecioMin] = useState('')
  const [precioMax, setPrecioMax] = useState('')
  const [sort, setSort] = useState({ field: null, dir: 'asc' })

  const toggleSort = (field) => {
    setSort((s) => s.field === field
      ? { field, dir: s.dir === 'asc' ? 'desc' : 'asc' }
      : { field, dir: 'asc' }
    )
  }

  let productos = getProductosFiltrados()

  if (precioMin !== '') productos = productos.filter((p) => p.precio >= parseFloat(precioMin))
  if (precioMax !== '') productos = productos.filter((p) => p.precio <= parseFloat(precioMax))

  if (sort.field) {
    productos = [...productos].sort(SORT_FIELDS[sort.field])
    if (sort.dir === 'desc') productos = productos.reverse()
  }

  useGSAP(() => {
    gsap.from('.table-row', { opacity: 0, y: 8, duration: 0.3, stagger: 0.03, ease: 'power2.out' })
  }, { scope: ref, dependencies: [filtros, sort, precioMin, precioMax] })

  const SortTh = ({ field, children }) => (
    <th className={`th-sortable ${sort.field === field ? 'th-sortable--active' : ''}`} onClick={() => toggleSort(field)}>
      {children}
      <span className="sort-arrow">
        {sort.field === field ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
      </span>
    </th>
  )

  return (
    <div ref={ref} className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Productos</h1>
          <p className="page-subtitle">{productos.length} resultado{productos.length !== 1 ? 's' : ''}</p>
        </div>
        <Link to="/admin/productos/nuevo" className="btn-primary">+ Nuevo producto</Link>
      </div>

      <div className="filter-bar">
        <input
          className="filter-search"
          type="text"
          placeholder="Buscar por nombre o marca…"
          value={filtros.busqueda}
          onChange={(e) => setFiltro('busqueda', e.target.value)}
        />
        <select className="filter-select" value={filtros.categoria} onChange={(e) => setFiltro('categoria', e.target.value)}>
          <option value="todos">Todas las categorías</option>
          {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>
        <select className="filter-select" value={filtros.marca} onChange={(e) => setFiltro('marca', e.target.value)}>
          <option value="todas">Todas las marcas</option>
          {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <div className="filter-price-range">
          <input
            className="filter-price-input"
            type="number" placeholder="Min €" value={precioMin}
            onChange={(e) => setPrecioMin(e.target.value)}
          />
          <span className="filter-price-sep">–</span>
          <input
            className="filter-price-input"
            type="number" placeholder="Max €" value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
          />
        </div>
        <label className="filter-toggle">
          <input type="checkbox" checked={filtros.soloAgotados} onChange={(e) => setFiltro('soloAgotados', e.target.checked)} />
          <span>Solo agotados</span>
        </label>
        {(filtros.busqueda || filtros.categoria !== 'todos' || filtros.marca !== 'todas' || filtros.soloAgotados || precioMin || precioMax) && (
          <button className="btn-ghost" onClick={() => { resetFiltros(); setPrecioMin(''); setPrecioMax('') }}>Limpiar</button>
        )}
      </div>

      <div className="table-wrapper">
        <table className="productos-table">
          <thead>
            <tr>
              <SortTh field="nombre">Producto</SortTh>
              <th>Categoría</th>
              <th>Detalles</th>
              <SortTh field="precio">Precio</SortTh>
              <SortTh field="precio_mayorista">Mayorista</SortTh>
              <SortTh field="margen">Margen</SortTh>
              <SortTh field="stock">Stock</SortTh>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => {
              const margen = p.precio_mayorista
                ? ((p.precio - p.precio_mayorista) / p.precio * 100).toFixed(1)
                : null
              return (
                <tr key={p.id} className="table-row">
                  <td className="td-producto">
                    <div className="producto-thumb">
                      {p.imagen
                        ? <img src={p.imagen} alt={p.nombre} />
                        : <div className="thumb-placeholder">{p.nombre[0]}</div>
                      }
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
                  <td className="td-detalles"><ProductoDetalles p={p} /></td>
                  <td className="td-precio">
                    {p.oferta && <span className="precio-original">{p.precio_original?.toFixed(2)} €</span>}
                    <span className={p.oferta ? 'precio-oferta' : ''}>{p.precio.toFixed(2)} €</span>
                  </td>
                  <td className="td-precio">{p.precio_mayorista?.toFixed(2) ?? '—'} {p.precio_mayorista ? '€' : ''}</td>
                  <td>
                    {margen
                      ? <span className="margen-pill">{margen}%</span>
                      : <span style={{ color: '#333' }}>—</span>}
                  </td>
                  <td>
                    <span className={`stock-num ${p.stock === 0 ? 'stock-num--zero' : p.stock <= 10 ? 'stock-num--low' : ''}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td>
                    <span className={`status-dot ${p.disponible ? 'status-dot--on' : 'status-dot--off'}`}>
                      {p.disponible ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="td-actions">
                    <Link to={`/admin/productos/${p.id}`} className="action-btn">Editar</Link>
                    {confirmDelete === p.id
                      ? (
                        <span className="confirm-delete">
                          <button className="action-btn action-btn--danger" onClick={() => { deleteProducto(p.id); setConfirmDelete(null) }}>Confirmar</button>
                          <button className="action-btn" onClick={() => setConfirmDelete(null)}>Cancelar</button>
                        </span>
                      )
                      : <button className="action-btn action-btn--ghost" onClick={() => setConfirmDelete(p.id)}>✕</button>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {productos.length === 0 && (
          <div className="table-empty">
            <p>No se encontraron productos con los filtros actuales.</p>
            <button className="btn-ghost" onClick={() => { resetFiltros(); setPrecioMin(''); setPrecioMax('') }}>Limpiar filtros</button>
          </div>
        )}
      </div>
    </div>
  )
}

const ProductoDetalles = ({ p }) => {
  if (p.categoria === 'sales') return (
    <span className="detalle-chips">
      <span className="chip">{p.tamaño_ml}ml</span>
      <span className="chip chip--nic">{p.nicotina_mg}mg</span>
      {p.sabor && <span className="chip chip--sabor">{p.sabor}</span>}
    </span>
  )
  if (p.categoria === 'longfill') return (
    <span className="detalle-chips">
      <span className="chip">{p.concentrado_ml}ml/{p.botella_ml}ml</span>
      {p.sabor && <span className="chip chip--sabor">{p.sabor}</span>}
    </span>
  )
  if (p.categoria === 'desechables') return (
    <span className="detalle-chips">
      <span className="chip">{p.puffs} puffs</span>
      <span className="chip chip--nic">{p.nicotina_mg}mg</span>
    </span>
  )
  if (p.categoria === 'vapers') return (
    <span className="detalle-chips">
      {p.bateria_mah && <span className="chip">{p.bateria_mah}mAh</span>}
      {p.potencia_max_w && <span className="chip">{p.potencia_max_w}W</span>}
    </span>
  )
  return <span className="detalle-chips"><span className="chip">—</span></span>
}
