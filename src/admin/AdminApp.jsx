import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Productos } from './pages/Productos.jsx'
import { ProductoEditor } from './pages/ProductoEditor.jsx'
import { Categorias } from './pages/Categorias.jsx'
import { Mayorista } from './pages/Mayorista.jsx'
import { Analytics } from './pages/Analytics.jsx'
import './admin.css'

export const AdminApp = () => (
  <div className="admin-layout">
    <Sidebar />
    <main className="admin-main">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<ProductoEditor />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="mayorista" element={<Mayorista />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </main>
  </div>
)
