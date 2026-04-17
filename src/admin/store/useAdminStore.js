import { create } from 'zustand'
import { PRODUCTOS, CATEGORIAS, MARCAS } from '../data/mockData.js'

const useAdminStore = create((set, get) => ({
  productos: PRODUCTOS,
  categorias: CATEGORIAS,
  marcas: MARCAS,

  filtros: {
    categoria: 'todos',
    marca: 'todas',
    busqueda: '',
    soloAgotados: false,
  },

  setFiltro: (key, value) =>
    set((s) => ({ filtros: { ...s.filtros, [key]: value } })),

  resetFiltros: () =>
    set({ filtros: { categoria: 'todos', marca: 'todas', busqueda: '', soloAgotados: false } }),

  getProductosFiltrados: () => {
    const { productos, filtros } = get()
    return productos.filter((p) => {
      if (filtros.categoria !== 'todos' && p.categoria !== filtros.categoria) return false
      if (filtros.marca !== 'todas' && p.marca !== filtros.marca) return false
      if (filtros.soloAgotados && p.stock > 0) return false
      if (filtros.busqueda) {
        const q = filtros.busqueda.toLowerCase()
        return p.nombre.toLowerCase().includes(q) || (p.marca || '').toLowerCase().includes(q)
      }
      return true
    })
  },

  addProducto: (data) =>
    set((s) => ({
      productos: [...s.productos, { ...data, id: Date.now() }],
    })),

  updateProducto: (id, data) =>
    set((s) => ({
      productos: s.productos.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),

  deleteProducto: (id) =>
    set((s) => ({ productos: s.productos.filter((p) => p.id !== id) })),

  getStats: () => {
    const { productos, categorias } = get()
    const total = productos.length
    const agotados = productos.filter((p) => p.stock === 0).length
    const destacados = productos.filter((p) => p.destacado).length
    const porCategoria = categorias.map((c) => ({
      ...c,
      count: productos.filter((p) => p.categoria === c.id).length,
    }))
    return { total, agotados, destacados, porCategoria }
  },

  getAnalytics: () => {
    const { productos, categorias } = get()

    // Margen promedio por categoría
    const margenPorCategoria = categorias.map((c) => {
      const prods = productos.filter((p) => p.categoria === c.id && p.precio_mayorista)
      const margenProm = prods.length
        ? prods.reduce((a, p) => a + ((p.precio - p.precio_mayorista) / p.precio) * 100, 0) / prods.length
        : 0
      return { ...c, margenProm: parseFloat(margenProm.toFixed(1)), count: prods.length }
    }).filter((c) => c.count > 0).sort((a, b) => b.margenProm - a.margenProm)

    // Top marcas por valor en stock
    const marcaMap = {}
    productos.forEach((p) => {
      const key = p.marca || 'Sin marca'
      if (!marcaMap[key]) marcaMap[key] = { marca: key, valor: 0, unidades: 0, productos: 0 }
      marcaMap[key].valor += p.precio * p.stock
      marcaMap[key].unidades += p.stock
      marcaMap[key].productos += 1
    })
    const topMarcas = Object.values(marcaMap)
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 8)

    // Distribución por nivel de nicotina
    const nicMap = {}
    productos
      .filter((p) => p.nicotina_mg !== undefined)
      .forEach((p) => {
        const key = `${p.nicotina_mg}mg`
        nicMap[key] = (nicMap[key] || 0) + 1
      })
    const distNicotina = Object.entries(nicMap)
      .map(([mg, count]) => ({ mg, count }))
      .sort((a, b) => parseInt(a.mg) - parseInt(b.mg))

    // Distribución por tamaño ml (longfill: botella_ml, sales: tamaño_ml)
    const mlMap = {}
    productos.forEach((p) => {
      const ml = p.botella_ml || p.tamaño_ml
      if (!ml) return
      const key = `${ml}ml`
      mlMap[key] = (mlMap[key] || 0) + 1
    })
    const distTamaños = Object.entries(mlMap)
      .map(([ml, count]) => ({ ml, count }))
      .sort((a, b) => parseInt(a.ml) - parseInt(b.ml))

    // Scatter: precio público vs margen (solo productos con precio_mayorista)
    const scatterData = productos
      .filter((p) => p.precio_mayorista)
      .map((p) => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: p.precio,
        margen: parseFloat(((p.precio - p.precio_mayorista) / p.precio * 100).toFixed(1)),
      }))

    return { margenPorCategoria, topMarcas, distNicotina, distTamaños, scatterData }
  },
}))

export default useAdminStore
