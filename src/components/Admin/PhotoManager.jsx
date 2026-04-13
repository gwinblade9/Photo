import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultPhotos } from '../../data/defaultData'
import { useTheme } from '../../context/ThemeContext'
import { t } from '../../utils/adminTranslations'

const PhotoManager = () => {
  const [photos, setPhotos] = useLocalStorage('photos', defaultPhotos)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const { darkMode, toggleDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'nature',
    imageUrl: '',
    thumbnailUrl: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setPhotos(photos.map(p => p.id === editingId ? { ...p, ...formData } : p))
      alert(t('Photo updated successfully'))
    } else {
      const newPhoto = {
        id: Date.now().toString(),
        ...formData,
        tags: [],
        createdAt: new Date().toISOString()
      }
      setPhotos([newPhoto, ...photos])
      alert(t('Photo added successfully'))
    }
    setFormData({ title: '', description: '', category: 'nature', imageUrl: '', thumbnailUrl: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm(t('Delete this photo?'))) {
      setPhotos(photos.filter(p => p.id !== id))
      alert(t('Photo deleted successfully'))
    }
  }

  const handleEdit = (photo) => {
    setFormData({
      title: photo.title,
      description: photo.description,
      category: photo.category,
      imageUrl: photo.imageUrl,
      thumbnailUrl: photo.thumbnailUrl
    })
    setEditingId(photo.id)
    setShowForm(true)
  }

  const getCategoryName = (cat) => {
    const categories = {
      'wedding': t('Wedding'),
      'portrait': t('Portrait'),
      'nature': t('Nature'),
      'street': t('Street')
    }
    return categories[cat] || cat
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">{t('Manage Photos')}</h1>
        <div className="flex gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            title={darkMode ? t('Light Mode') : t('Dark Mode')}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', description: '', category: 'nature', imageUrl: '', thumbnailUrl: '' }) }}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {showForm ? t('Cancel') : `+ ${t('Add Photo')}`}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-light mb-4">{editingId ? t('Edit') : t('Add Photo')}</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder={t('Title')} 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              required 
            />
            <textarea 
              placeholder={t('Description')} 
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
              <option value="wedding">{t('Wedding')}</option>
              <option value="portrait">{t('Portrait')}</option>
              <option value="nature">{t('Nature')}</option>
            </select>
            <input 
              type="url" 
              placeholder={t('Image URL')} 
              value={formData.imageUrl} 
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              required 
            />
            <input 
              type="url" 
              placeholder={t('Thumbnail URL')} 
              value={formData.thumbnailUrl} 
              onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              required 
            />
            <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">
              {editingId ? t('Update') : t('Create')}
            </button>
          </div>
        </form>
      )}

      <div className="grid md:grid-cols-4 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-48 object-cover" />
            <div className="p-3">
              <p className="font-medium truncate">{photo.title}</p>
              <p className="text-sm text-gray-500">{getCategoryName(photo.category)}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(photo)} className="text-sm text-blue-600">{t('Edit')}</button>
                <button onClick={() => handleDelete(photo.id)} className="text-sm text-red-600">{t('Delete')}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoManager