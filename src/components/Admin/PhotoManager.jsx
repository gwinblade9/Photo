import React, { useState, useRef } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultPhotos } from '../../data/defaultData'
import { useTheme } from '../../context/ThemeContext'

const PhotoManager = () => {
  const [photos, setPhotos] = useLocalStorage('photos', defaultPhotos)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'nature',
    imageUrl: '',
    thumbnailUrl: ''
  })

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  // загрузка изображения с компьютера
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение')
      return
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('Файл слишком большой (максимум 10MB)')
      return
    }
    
    setUploading(true)
    try {
      const base64 = await fileToBase64(file)
      setFormData(prev => ({
        ...prev,
        imageUrl: base64,
        thumbnailUrl: base64
      }))
    } catch (error) {
      console.error('Ошибка загрузки:', error)
      alert('Ошибка при загрузке файла')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.imageUrl) {
      alert('Заполните название и добавьте изображение')
      return
    }
    
    if (editingId) {
      setPhotos(photos.map(p => p.id === editingId ? { ...p, ...formData } : p))
      alert('Фото обновлено')
    } else {
      const newPhoto = {
        id: Date.now().toString(),
        ...formData,
        tags: [formData.category],
        createdAt: new Date().toISOString()
      }
      setPhotos([newPhoto, ...photos])
      alert('Фото добавлено')
    }
    setFormData({ title: '', description: '', category: 'nature', imageUrl: '', thumbnailUrl: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('Удалить это фото?')) {
      setPhotos(photos.filter(p => p.id !== id))
      alert('Фото удалено')
    }
  }

  const handleEdit = (photo) => {
    setFormData({
      title: photo.title,
      description: photo.description || '',
      category: photo.category,
      imageUrl: photo.imageUrl,
      thumbnailUrl: photo.thumbnailUrl || photo.imageUrl
    })
    setEditingId(photo.id)
    setShowForm(true)
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">Управление фотографиями</h1>
        <div className="flex gap-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', description: '', category: 'nature', imageUrl: '', thumbnailUrl: '' }) }}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {showForm ? 'Отмена' : '+ Добавить фото'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-light mb-4">{editingId ? 'Редактировать' : 'Новое фото'}</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Название *" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              required 
            />
            
            <textarea 
              placeholder="Описание" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              rows={3} 
            />
            
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="wedding">Свадьба</option>
              <option value="portrait">Портрет</option>
              <option value="nature">Природа</option>
            </select>
            
            {/* Блок загрузки изображения */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Изображение *</p>
              
              {formData.imageUrl && (
                <div className="mb-3">
                  <img 
                    src={formData.imageUrl} 
                    alt="Превью" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, imageUrl: '', thumbnailUrl: ''})}
                    className="text-xs text-red-500 mt-1"
                  >
                    Удалить
                  </button>
                </div>
              )}
              
              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
                >
                  {uploading ? 'Загрузка...' : 'Выбрать файл с компьютера'}
                </button>
                
                <span className="text-gray-400 text-sm self-center">или</span>
                
                <input 
                  type="url" 
                  placeholder="Вставить ссылку на изображение" 
                  value={formData.imageUrl} 
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value, thumbnailUrl: e.target.value})} 
                  className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg text-sm" 
                />
              </div>
              
              <p className="text-xs text-gray-400 mt-2">
                Поддерживаются: JPEG, PNG, WEBP (макс. 10MB)
              </p>
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-2 bg-black text-white rounded-lg w-full"
              disabled={!formData.title || !formData.imageUrl}
            >
              {editingId ? 'Обновить' : 'Добавить фото'}
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <img 
              src={photo.thumbnailUrl || photo.imageUrl} 
              alt={photo.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-3">
              <p className="font-medium truncate">{photo.title}</p>
              <p className="text-sm text-gray-500 capitalize">{photo.category}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(photo)} className="text-sm text-blue-600">Ред.</button>
                <button onClick={() => handleDelete(photo.id)} className="text-sm text-red-600">Уд.</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {photos.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Нет фотографий. Нажмите "+ Добавить фото" чтобы добавить.
        </div>
      )}
    </div>
  )
}

export default PhotoManager
