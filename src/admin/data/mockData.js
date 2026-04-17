export const CATEGORIAS = [
  { id: 'sales', nombre: 'Sales de Nicotina', slug: 'sales', color: '#e53935' },
  { id: 'longfill', nombre: 'Longfill', slug: 'longfill', color: '#8b5cf6' },
  { id: 'vapers', nombre: 'Vapers', slug: 'vapers', color: '#3b82f6' },
  { id: 'desechables', nombre: 'Vapers Desechables', slug: 'desechables', color: '#f59e0b' },
  { id: 'alquimia', nombre: 'Alquimia', slug: 'alquimia', color: '#10b981' },
  { id: 'accesorios', nombre: 'Accesorios', slug: 'accesorios', color: '#6b7280' },
]

export const MARCAS = [
  'Bombo', 'Drifter', 'Just Juice', 'OXVA', 'Vaporesso',
  'Frumist', 'Ivg', 'Dinner Lady', 'Drops', 'King Crest',
  'Geekvape', 'Elf Bar', 'Lost Mary', 'Voopoo', 'Wotofo',
]

export const NIVELES_NICOTINA = [0, 3, 6, 9, 10, 12, 18, 20]

export const PRODUCTOS = [
  // ── SALES DE NICOTINA ──────────────────────────────────────────────────
  {
    id: 1, nombre: 'Dinner Lady Salts – Mango Ice', marca: 'Dinner Lady',
    categoria: 'sales', sabor: 'Mango con toque helado', tamaño_ml: 10,
    nicotina_mg: 20, precio: 4.50, precio_mayorista: 3.10, stock: 48,
    disponible: true, imagen: null, destacado: true,
  },
  {
    id: 2, nombre: 'Dinner Lady Salts – Watermelon Slices', marca: 'Dinner Lady',
    categoria: 'sales', sabor: 'Sandía fresca', tamaño_ml: 10,
    nicotina_mg: 20, precio: 4.50, precio_mayorista: 3.10, stock: 32,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 3, nombre: 'Drifter – Pineapple Ice', marca: 'Drifter',
    categoria: 'sales', sabor: 'Piña con hielo', tamaño_ml: 10,
    nicotina_mg: 20, precio: 3.50, precio_mayorista: 2.30, stock: 60,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 4, nombre: 'Drifter – Cotton Candy Ice', marca: 'Drifter',
    categoria: 'sales', sabor: 'Algodón de azúcar helado', tamaño_ml: 10,
    nicotina_mg: 20, precio: 3.50, precio_mayorista: 2.30, stock: 45,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 5, nombre: 'Drifter – Grape', marca: 'Drifter',
    categoria: 'sales', sabor: 'Uva', tamaño_ml: 10,
    nicotina_mg: 20, precio: 3.50, precio_mayorista: 2.30, stock: 28,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 6, nombre: 'Drifter – Lychee', marca: 'Drifter',
    categoria: 'sales', sabor: 'Lychee tropical', tamaño_ml: 10,
    nicotina_mg: 20, precio: 3.00, precio_mayorista: 2.00, stock: 12,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 7, nombre: 'Drops Salts – American Luxury', marca: 'Drops',
    categoria: 'sales', sabor: 'Tabaco americano premium', tamaño_ml: 10,
    nicotina_mg: 20, precio: 4.90, precio_mayorista: 3.50, stock: 22,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 8, nombre: 'Drops Salts – Fausto\'s Deal', marca: 'Drops',
    categoria: 'sales', sabor: 'Tabaco especiado', tamaño_ml: 10,
    nicotina_mg: 20, precio: 4.90, precio_mayorista: 3.50, stock: 18,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 9, nombre: 'Drops Salts – Route 66', marca: 'Drops',
    categoria: 'sales', sabor: 'Tabaco americano y caramelo', tamaño_ml: 10,
    nicotina_mg: 20, precio: 3.50, precio_mayorista: 2.40, stock: 5,
    disponible: true, imagen: null, destacado: false, oferta: true, precio_original: 4.90,
  },
  {
    id: 10, nombre: 'Frumist – Blue Magic Nic Salt', marca: 'Frumist',
    categoria: 'sales', sabor: 'Arándanos y frutos del bosque', tamaño_ml: 10,
    nicotina_mg: 20, precio: 3.50, precio_mayorista: 2.40, stock: 0,
    disponible: false, imagen: null, destacado: false,
  },
  {
    id: 11, nombre: 'Frumist – Cola Ice Nic Salts', marca: 'Frumist',
    categoria: 'sales', sabor: 'Cola con hielo', tamaño_ml: 10,
    nicotina_mg: 20, precio: 4.50, precio_mayorista: 3.10, stock: 35,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 12, nombre: 'THE ORDER Salts – Tarta de San Marcos', marca: 'Ivg',
    categoria: 'sales', sabor: 'Tarta de San Marcos', tamaño_ml: 10,
    nicotina_mg: 20, precio: 5.00, precio_mayorista: 3.60, stock: 20,
    disponible: true, imagen: null, destacado: true, oferta: true, precio_original: 5.50,
  },

  // ── LONGFILL ────────────────────────────────────────────────────────────
  {
    id: 13, nombre: 'Aroma Afrodita – Golden Era', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Fresas y frambuesas con toque cítrico',
    concentrado_ml: 10, botella_ml: 30,
    precio: 7.50, precio_mayorista: 5.20, stock: 40,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 14, nombre: 'Aroma Afrodita – Golden Era (Grande)', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Fresas y frambuesas con toque cítrico',
    concentrado_ml: 15, botella_ml: 60,
    precio: 13.00, precio_mayorista: 9.20, stock: 24,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 15, nombre: 'Aroma Apple Peach Max – Bombo Bar Juice', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Manzana y melocotón',
    concentrado_ml: 10, botella_ml: 30,
    precio: 6.30, precio_mayorista: 4.40, stock: 55,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 16, nombre: 'Aroma Atenea – Golden Era', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Mango y maracuyá exótico',
    concentrado_ml: 10, botella_ml: 30,
    precio: 7.50, precio_mayorista: 5.20, stock: 30,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 17, nombre: 'Aroma Blueberry Cherry – Bombo Bar Juice', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Arándanos y cereza',
    concentrado_ml: 10, botella_ml: 30,
    precio: 6.30, precio_mayorista: 4.40, stock: 38,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 18, nombre: 'Aroma Branila – Golden Era (Grande)', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Vainilla con frutos tropicales',
    concentrado_ml: 15, botella_ml: 60,
    precio: 13.00, precio_mayorista: 9.20, stock: 0,
    disponible: false, imagen: null, destacado: false,
  },
  {
    id: 19, nombre: 'Aroma Drifter – Kiwi Passion Guava', marca: 'Drifter',
    categoria: 'longfill', sabor: 'Kiwi, maracuyá y guayaba',
    concentrado_ml: 16, botella_ml: 60,
    precio: 7.50, precio_mayorista: 5.20, stock: 42,
    disponible: true, imagen: null, destacado: true,
  },
  {
    id: 20, nombre: 'Aroma Drifter Mad Blue', marca: 'Drifter',
    categoria: 'longfill', sabor: 'Arándanos y frambuesas heladas',
    concentrado_ml: 16, botella_ml: 60,
    precio: 7.50, precio_mayorista: 5.20, stock: 28,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 21, nombre: 'Just Juice Bar – Strawberry Kiwi Longfill', marca: 'Just Juice',
    categoria: 'longfill', sabor: 'Fresa y kiwi',
    concentrado_ml: 12, botella_ml: 60,
    precio: 8.90, precio_mayorista: 6.30, stock: 15,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 22, nombre: 'Aroma Nutty Supra Reserve – Platinum Tobaccos', marca: 'Bombo',
    categoria: 'longfill', sabor: 'Tabaco con avellana',
    concentrado_ml: 15, botella_ml: 60,
    precio: 13.00, precio_mayorista: 9.20, stock: 10,
    disponible: true, imagen: null, destacado: false,
  },

  // ── VAPERS ───────────────────────────────────────────────────────────────
  {
    id: 23, nombre: 'Geekvape Sonder Q2 Pod Kit + Líquido 10ml', marca: 'Geekvape',
    categoria: 'vapers', modelo: 'Sonder Q2',
    bateria_mah: 1000, potencia_max_w: 18,
    precio: 19.00, precio_mayorista: 13.50, stock: 8,
    disponible: true, imagen: null, destacado: true,
  },
  {
    id: 24, nombre: 'OXVA Xlim V2 Pod Kit', marca: 'OXVA',
    categoria: 'vapers', modelo: 'Xlim V2',
    bateria_mah: 900, potencia_max_w: 25,
    precio: 29.90, precio_mayorista: 21.00, stock: 12,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 25, nombre: 'Vaporesso XROS 3 Mini', marca: 'Vaporesso',
    categoria: 'vapers', modelo: 'XROS 3 Mini',
    bateria_mah: 1000, potencia_max_w: 16,
    precio: 24.90, precio_mayorista: 17.50, stock: 6,
    disponible: true, imagen: null, destacado: false,
  },

  // ── DESECHABLES ──────────────────────────────────────────────────────────
  {
    id: 26, nombre: 'Elf Bar 600 – Blueberry Ice', marca: 'Elf Bar',
    categoria: 'desechables', sabor: 'Arándano helado',
    puffs: 600, nicotina_mg: 20,
    precio: 6.50, precio_mayorista: 4.50, stock: 80,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 27, nombre: 'Lost Mary BM600 – Pink Lemonade', marca: 'Lost Mary',
    categoria: 'desechables', sabor: 'Limonada de frambuesa',
    puffs: 600, nicotina_mg: 20,
    precio: 6.90, precio_mayorista: 4.80, stock: 65,
    disponible: true, imagen: null, destacado: true,
  },
  {
    id: 28, nombre: 'Drifter Bar – Watermelon Ice', marca: 'Drifter',
    categoria: 'desechables', sabor: 'Sandía con hielo',
    puffs: 600, nicotina_mg: 20,
    precio: 5.90, precio_mayorista: 4.00, stock: 45,
    disponible: true, imagen: null, destacado: false,
  },

  // ── ACCESORIOS ───────────────────────────────────────────────────────────
  {
    id: 29, nombre: 'Resistencia OXVA Xlim V2 0.6Ω', marca: 'OXVA',
    categoria: 'accesorios', descripcion: 'Pack de 2 resistencias para Xlim V2',
    precio: 7.90, precio_mayorista: 5.50, stock: 25,
    disponible: true, imagen: null, destacado: false,
  },
  {
    id: 30, nombre: 'Botella Graduada 30ml', marca: null,
    categoria: 'accesorios', descripcion: 'Botella transparente con punta fina para mezclas longfill',
    precio: 1.50, precio_mayorista: 0.90, stock: 200,
    disponible: true, imagen: null, destacado: false,
  },
]
