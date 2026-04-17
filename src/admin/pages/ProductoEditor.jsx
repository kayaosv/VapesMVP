import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useNavigate, useParams, Link } from 'react-router-dom'
import useAdminStore from '../store/useAdminStore.js'
import { CATEGORIAS, MARCAS, NIVELES_NICOTINA } from '../data/mockData.js'

const EMPTY = {
  nombre: '', marca: '', categoria: 'sales', disponible: true, destacado: false,
  precio: '', precio_mayorista: '', stock: '',
  sabor: '', tamaño_ml: 10, nicotina_mg: 20,
  concentrado_ml: 10, botella_ml: 30,
  puffs: 600, bateria_mah: '', potencia_max_w: '',
  descripcion: '', oferta: false, precio_original: '',
}

export const ProductoEditor = () => {
  const ref = useRef(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = id === 'nuevo'

  const productos = useAdminStore((s) => s.productos)
  const addProducto = useAdminStore((s) => s.addProducto)
  const updateProducto = useAdminStore((s) => s.updateProducto)

  const [form, setForm] = useState(() => {
    if (isNew) return EMPTY
    const p = productos.find((x) => x.id === Number(id))
    return p ? { ...EMPTY, ...p } : EMPTY
  })
  const [saved, setSaved] = useState(false)

  useGSAP(() => {
    gsap.from('.editor-section', {
      y: 20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
    })
  }, { scope: ref })

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      ...form,
      precio: parseFloat(form.precio) || 0,
      precio_mayorista: parseFloat(form.precio_mayorista) || 0,
      stock: parseInt(form.stock) || 0,
    }
    if (isNew) addProducto(data)
    else updateProducto(Number(id), data)
    setSaved(true)
    setTimeout(() => { navigate('/admin/productos') }, 800)
  }

  const cat = form.categoria

  return (
    <div ref={ref} className="page-content">
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            <Link to="/admin/productos">Productos</Link>
            <span>/</span>
            <span>{isNew ? 'Nuevo producto' : form.nombre || 'Editar'}</span>
          </div>
          <h1 className="page-title">{isNew ? 'Nuevo producto' : 'Editar producto'}</h1>
        </div>
        <div className="header-actions">
          <Link to="/admin/productos" className="btn-ghost">Cancelar</Link>
          <button
            form="producto-form"
            type="submit"
            className={`btn-primary ${saved ? 'btn-primary--saved' : ''}`}
          >
            {saved ? '✓ Guardado' : isNew ? 'Crear producto' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      <form id="producto-form" onSubmit={handleSubmit} className="editor-layout">
        <div className="editor-main">
          <section className="editor-section">
            <h2 className="editor-section-title">Información general</h2>
            <div className="field-group">
              <div className="field">
                <label>Nombre del producto *</label>
                <input required value={form.nombre} onChange={(e) => set('nombre', e.target.value)}
                  placeholder="ej. Drifter – Pineapple Ice" />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Marca</label>
                  <select value={form.marca || ''} onChange={(e) => set('marca', e.target.value)}>
                    <option value="">Sin marca</option>
                    {MARCAS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Categoría *</label>
                  <select required value={form.categoria} onChange={(e) => set('categoria', e.target.value)}>
                    {CATEGORIAS.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {(cat === 'sales') && (
            <section className="editor-section">
              <h2 className="editor-section-title">Especificaciones — Sales de Nicotina</h2>
              <div className="field-group">
                <div className="field-row">
                  <div className="field">
                    <label>Tamaño (ml)</label>
                    <select value={form.tamaño_ml} onChange={(e) => set('tamaño_ml', Number(e.target.value))}>
                      {[10, 20, 30, 50, 60, 100].map((v) => <option key={v} value={v}>{v} ml</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Nicotina (mg)</label>
                    <select value={form.nicotina_mg} onChange={(e) => set('nicotina_mg', Number(e.target.value))}>
                      {NIVELES_NICOTINA.map((v) => <option key={v} value={v}>{v} mg</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Sabor / Descripción</label>
                  <input value={form.sabor} onChange={(e) => set('sabor', e.target.value)}
                    placeholder="ej. Mango con toque helado" />
                </div>
              </div>
            </section>
          )}

          {cat === 'longfill' && (
            <section className="editor-section">
              <h2 className="editor-section-title">Especificaciones — Longfill</h2>
              <div className="field-group">
                <div className="field-row">
                  <div className="field">
                    <label>Concentrado (ml)</label>
                    <select value={form.concentrado_ml} onChange={(e) => set('concentrado_ml', Number(e.target.value))}>
                      {[10, 12, 15, 16, 20, 30].map((v) => <option key={v} value={v}>{v} ml</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Botella final (ml)</label>
                    <select value={form.botella_ml} onChange={(e) => set('botella_ml', Number(e.target.value))}>
                      {[30, 60, 100, 120].map((v) => <option key={v} value={v}>{v} ml</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Sabor / Descripción</label>
                  <input value={form.sabor} onChange={(e) => set('sabor', e.target.value)}
                    placeholder="ej. Arándanos y frambuesas heladas" />
                </div>
              </div>
            </section>
          )}

          {cat === 'desechables' && (
            <section className="editor-section">
              <h2 className="editor-section-title">Especificaciones — Desechable</h2>
              <div className="field-group">
                <div className="field-row">
                  <div className="field">
                    <label>Puffs</label>
                    <input type="number" value={form.puffs} onChange={(e) => set('puffs', Number(e.target.value))}
                      placeholder="600" />
                  </div>
                  <div className="field">
                    <label>Nicotina (mg)</label>
                    <select value={form.nicotina_mg} onChange={(e) => set('nicotina_mg', Number(e.target.value))}>
                      {NIVELES_NICOTINA.map((v) => <option key={v} value={v}>{v} mg</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Sabor</label>
                  <input value={form.sabor} onChange={(e) => set('sabor', e.target.value)} placeholder="ej. Watermelon Ice" />
                </div>
              </div>
            </section>
          )}

          {cat === 'vapers' && (
            <section className="editor-section">
              <h2 className="editor-section-title">Especificaciones — Vaper</h2>
              <div className="field-group">
                <div className="field-row">
                  <div className="field">
                    <label>Modelo</label>
                    <input value={form.modelo || ''} onChange={(e) => set('modelo', e.target.value)}
                      placeholder="ej. Xlim V2" />
                  </div>
                  <div className="field">
                    <label>Batería (mAh)</label>
                    <input type="number" value={form.bateria_mah} onChange={(e) => set('bateria_mah', Number(e.target.value))}
                      placeholder="1000" />
                  </div>
                  <div className="field">
                    <label>Potencia máx. (W)</label>
                    <input type="number" value={form.potencia_max_w} onChange={(e) => set('potencia_max_w', Number(e.target.value))}
                      placeholder="25" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {(cat === 'accesorios' || cat === 'alquimia') && (
            <section className="editor-section">
              <h2 className="editor-section-title">Descripción</h2>
              <div className="field-group">
                <div className="field">
                  <label>Descripción del producto</label>
                  <textarea rows={3} value={form.descripcion} onChange={(e) => set('descripcion', e.target.value)}
                    placeholder="Describe el accesorio o producto…" />
                </div>
              </div>
            </section>
          )}
        </div>

        <div className="editor-side">
          <section className="editor-section">
            <h2 className="editor-section-title">Precios</h2>
            <div className="field-group">
              <div className="field">
                <label>Precio al público (€) *</label>
                <input required type="number" step="0.01" value={form.precio}
                  onChange={(e) => set('precio', e.target.value)} placeholder="4.50" />
              </div>
              <div className="field">
                <label>Precio mayorista (€)</label>
                <input type="number" step="0.01" value={form.precio_mayorista}
                  onChange={(e) => set('precio_mayorista', e.target.value)} placeholder="3.10" />
                {form.precio && form.precio_mayorista && (
                  <span className="field-hint">
                    Margen: {(((form.precio - form.precio_mayorista) / form.precio) * 100).toFixed(1)}%
                  </span>
                )}
              </div>
              <label className="toggle-row">
                <input type="checkbox" checked={form.oferta} onChange={(e) => set('oferta', e.target.checked)} />
                <span>En oferta</span>
              </label>
              {form.oferta && (
                <div className="field">
                  <label>Precio original (€)</label>
                  <input type="number" step="0.01" value={form.precio_original}
                    onChange={(e) => set('precio_original', e.target.value)} placeholder="5.50" />
                </div>
              )}
            </div>
          </section>

          <section className="editor-section">
            <h2 className="editor-section-title">Inventario</h2>
            <div className="field-group">
              <div className="field">
                <label>Unidades en stock *</label>
                <input required type="number" value={form.stock}
                  onChange={(e) => set('stock', e.target.value)} placeholder="0" />
              </div>
            </div>
          </section>

          <section className="editor-section">
            <h2 className="editor-section-title">Visibilidad</h2>
            <div className="field-group">
              <label className="toggle-row">
                <input type="checkbox" checked={form.disponible}
                  onChange={(e) => set('disponible', e.target.checked)} />
                <span>Producto activo / visible</span>
              </label>
              <label className="toggle-row">
                <input type="checkbox" checked={form.destacado}
                  onChange={(e) => set('destacado', e.target.checked)} />
                <span>Destacado en home</span>
              </label>
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}
