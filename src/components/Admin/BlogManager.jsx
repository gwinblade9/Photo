import React, { useState, useRef } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultBlogPosts } from '../../data/defaultData'
import { useTheme } from '../../context/ThemeContext'
import { t } from '../../utils/adminTranslations'

const BlogManager = () => {
  const [posts, setPosts] = useLocalStorage('blogPosts', defaultBlogPosts)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    published: false
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
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой (максимум 5MB)')
      return
    }
    
    setUploading(true)
    try {
      const base64 = await fileToBase64(file)
      setFormData(prev => ({ ...prev, featuredImage: base64 }))
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
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    if (editingId) {
      setPosts(posts.map(p => p.id === editingId ? { ...p, ...formData, slug } : p))
      alert('Статья обновлена')
    } else {
      const newPost = {
        id: Date.now().toString(),
        ...formData,
        slug,
        views: 0,
        createdAt: new Date().toISOString(),
        comments: []
      }
      setPosts([newPost, ...posts])
      alert('Статья создана')
    }
    setFormData({ title: '', slug: '', excerpt: '', content: '', featuredImage: '', published: false })
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm('Удалить эту статью?')) {
      setPosts(posts.filter(p => p.id !== id))
      alert('Статья удалена')
    }
  }

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage || '',
      published: post.published
    })
    setEditingId(post.id)
    setShowForm(true)
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">Управление статьями</h1>
        <div className="flex gap-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', slug: '', excerpt: '', content: '', featuredImage: '', published: false }) }} 
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {showForm ? 'Отмена' : '+ Новая статья'}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-light mb-4">{editingId ? 'Редактировать' : 'Новая статья'}</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Заголовок" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              required 
            />
            
            <input 
              type="text" 
              placeholder="URL-адрес (оставьте пустым для автоматической генерации)" 
              value={formData.slug} 
              onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-')})} 
              className="w-full px-4 py-2 border rounded-lg" 
            />
            
            <textarea 
              placeholder="Краткое описание (выводится в списке статей)" 
              value={formData.excerpt} 
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg" 
              rows={2} 
            />
            
            <textarea 
              placeholder="Полный текст статьи (можно использовать HTML)" 
              value={formData.content} 
              onChange={(e) => setFormData({...formData, content: e.target.value})} 
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm" 
              rows={10} 
            />
            
            {/* Блок загрузки изображения */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Главное изображение статьи</p>
              
              {formData.featuredImage && (
                <div className="mb-3">
                  <img 
                    src={formData.featuredImage} 
                    alt="Превью" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, featuredImage: ''})}
                    className="text-xs text-red-500 mt-1"
                  >
                    Удалить
                  </button>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 transition"
                >
                  {uploading ? 'Загрузка...' : 'Выбрать файл с компьютера'}
                </button>
                
                <input 
                  type="url" 
                  placeholder="Или вставить ссылку на изображение" 
                  value={formData.featuredImage} 
                  onChange={(e) => setFormData({...formData, featuredImage: e.target.value})} 
                  className="flex-1 px-4 py-2 border rounded-lg text-sm" 
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Поддерживаются: JPEG, PNG, WEBP, GIF (макс. 5MB)
              </p>
            </div>
            
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.published} 
                onChange={(e) => setFormData({...formData, published: e.target.checked})} 
              />
              Опубликовано (видно на сайте)
            </label>
            
            <button 
              type="submit" 
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              {editingId ? 'Обновить' : 'Создать'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {post.slug} • {post.published ? 'Опубликовано' : 'Черновик'} • {post.views || 0} просмотров
              </p>
              {post.featuredImage && (
                <div className="mt-1">
                  <img src={post.featuredImage} alt="" className="w-12 h-12 object-cover rounded inline-block" />
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(post)} className="text-blue-600">Ред.</button>
              <button onClick={() => handleDelete(post.id)} className="text-red-600">Уд.</button>
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Нет статей. Нажмите "+ Новая статья" чтобы добавить.
        </div>
      )}
    </div>
  )
}

export default BlogManager
