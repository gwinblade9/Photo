import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultBlogPosts } from '../../data/defaultData'
import { useTheme } from '../../context/ThemeContext'
import { t } from '../../utils/adminTranslations'

const BlogManager = () => {
  const [posts, setPosts] = useLocalStorage('blogPosts', defaultBlogPosts)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const { darkMode, toggleDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    published: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    
    if (editingId) {
      setPosts(posts.map(p => p.id === editingId ? { ...p, ...formData, slug } : p))
      alert(t('Post updated successfully'))
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
      alert(t('Post created successfully'))
    }
    setFormData({ title: '', slug: '', excerpt: '', content: '', featuredImage: '', published: false })
    setEditingId(null)
    setShowForm(false)
  }

  const handleDelete = (id) => {
    if (confirm(t('Delete this post?'))) {
      setPosts(posts.filter(p => p.id !== id))
      alert(t('Post deleted successfully'))
    }
  }

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      published: post.published
    })
    setEditingId(post.id)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">{t('Manage Blog Posts')}</h1>
        <div className="flex gap-3">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', slug: '', excerpt: '', content: '', featuredImage: '', published: false }) }} 
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            {showForm ? t('Cancel') : `+ ${t('New Post')}`}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-light mb-4">{editingId ? t('Edit') : t('New Post')}</h2>
          <div className="space-y-4">
            <input type="text" placeholder={t('Title')} value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" required />
            <input type="text" placeholder={t('Slug')} value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-')})} className="w-full px-4 py-2 border rounded-lg" />
            <textarea placeholder={t('Excerpt')} value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" rows={2} />
            <textarea placeholder={t('Content')} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full px-4 py-2 border rounded-lg font-mono text-sm" rows={8} />
            <input type="url" placeholder={t('Featured Image')} value={formData.featuredImage} onChange={(e) => setFormData({...formData, featuredImage: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} />
              {t('Published')}
            </label>
            <button type="submit" className="px-6 py-2 bg-black text-white rounded-lg">{editingId ? t('Update') : t('Create')}</button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.slug} • {post.published ? t('Published') : t('Draft')}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(post)} className="text-blue-600">{t('Edit')}</button>
              <button onClick={() => handleDelete(post.id)} className="text-red-600">{t('Delete')}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogManager