import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultServices } from '../../data/defaultData'  // <- правильный импорт
import { useTheme } from '../../context/ThemeContext'

const ServicesManager = () => {
  const [services, setServices] = useLocalStorage('services', defaultServices)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const { darkMode, toggleDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: '',
    isActive: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const featuresArray = formData.features.split(',').map(f => f.trim())
    
    if (editingId) {
      setServices(services.map(s => s.id === editingId ? { ...s, ...formData, features: featuresArray } : s))
    } else {
      const newService = {
        id: Date.now().toString(),
        ...formData,
        features: featuresArray,
        isActive: true
      }
      setServices([...services, newService])
    }
    setFormData({ name: '', price: '', description: '', features: '', isActive: true })
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('Удалить услугу?')) {
      setServices(services.filter(s => s.id !== id))
    }
  }

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      price: service.price,
      description: service.description,
      features: service.features.join(', '),
      isActive: service.isActive
    })
    setEditingId(service.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">Управление услугами</h1>
        <div className="flex gap-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', price: '', description: '', features: '', isActive: true }) }} 
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {showForm ? 'Отмена' : '+ Добавить услугу'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-light mb-4">{editingId ? 'Редактировать' : 'Новая услуга'}</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Название" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
            <input type="number" placeholder="Цена" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
            <textarea placeholder="Описание" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={3} />
            <input type="text" placeholder="Особенности (через запятую)" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} />
              Активно
            </label>
            <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">{editingId ? 'Обновить' : 'Создать'}</button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{service.name}</h3>
                <p className="text-2xl font-bold mt-1">{service.price} ₽</p>
                <p className="text-sm text-gray-500 mt-2">{service.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {service.features.map((f, i) => (
                    <span key={i} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">✓ {f}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(service)} className="text-blue-600 text-sm">Ред.</button>
                <button onClick={() => handleDelete(service.id)} className="text-red-600 text-sm">Уд.</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesManager
