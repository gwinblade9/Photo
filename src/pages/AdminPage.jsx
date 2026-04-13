import React from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AdminLogin from '../components/Admin/AdminLogin'
import Dashboard from '../components/Admin/Dashboard'
import PhotoManager from '../components/Admin/PhotoManager'
import BlogManager from '../components/Admin/BlogManager'
import MessagesViewer from '../components/Admin/MessagesViewer'
import ServicesManager from '../components/Admin/ServicesManager'

const AdminLayout = ({ children }) => {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-6">
              <Link to="/admin/dashboard" className="text-sm font-medium hover:text-gray-600">Дашборд</Link>
              <Link to="/admin/photos" className="text-sm font-medium hover:text-gray-600">Фотографии</Link>
              <Link to="/admin/blog" className="text-sm font-medium hover:text-gray-600">Блог</Link>
              <Link to="/admin/messages" className="text-sm font-medium hover:text-gray-600">Сообщения</Link>
              <Link to="/admin/services" className="text-sm font-medium hover:text-gray-600">Услуги</Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{admin?.email}</span>
              <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">Выйти</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

const AdminPage = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="photos" element={<PhotoManager />} />
        <Route path="blog" element={<BlogManager />} />
        <Route path="messages" element={<MessagesViewer />} />
        <Route path="services" element={<ServicesManager />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminPage