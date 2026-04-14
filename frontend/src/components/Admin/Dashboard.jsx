import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useTheme } from '../../context/ThemeContext'
import { defaultPhotos, defaultBlogPosts, defaultServices, defaultMessages } from '../../data/defaultData'
import { Link } from 'react-router-dom'
import { t } from '../../utils/adminTranslations'

const Dashboard = () => {
  const [photos] = useLocalStorage('photos', defaultPhotos)
  const [posts] = useLocalStorage('blogPosts', defaultBlogPosts)
  const [messages] = useLocalStorage('messages', defaultMessages)
  const [services] = useLocalStorage('services', defaultServices)
  const { darkMode, toggleDarkMode } = useTheme()

  const stats = [
    { label: t('Total Photos'), value: photos.length, icon: '📸', color: 'bg-blue-500', link: '/admin/photos' },
    { label: t('Total Posts'), value: posts.length, icon: '📝', color: 'bg-green-500', link: '/admin/blog' },
    { label: t('Messages'), value: messages.filter(m => !m.isRead).length, total: messages.length, icon: '✉️', color: 'bg-purple-500', link: '/admin/messages' },
    { label: t('Total Services'), value: services.length, icon: '⚙️', color: 'bg-orange-500', link: '/admin/services' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-light">{t('Dashboard')}</h1>
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {darkMode ? (
            <>
              <span>☀️</span>
              <span className="text-sm">{t('Light Mode')}</span>
            </>
          ) : (
            <>
              <span>🌙</span>
              <span className="text-sm">{t('Dark Mode')}</span>
            </>
          )}
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{stat.icon}</span>
                <span className={`${stat.color} w-2 h-2 rounded-full`}></span>
              </div>
              <p className="text-3xl font-bold">{stat.value}{stat.total && ` / ${stat.total}`}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-medium mb-4">{t('Recent Messages')}</h2>
          {messages.slice(0, 5).map(msg => (
            <div key={msg.id} className="border-b border-gray-200 dark:border-gray-700 py-3">
              <p className="font-medium">{msg.name}</p>
              <p className="text-sm text-gray-500 truncate">{msg.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-gray-500">{t('No messages yet')}</p>}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-medium mb-4">{t('Recent Photos')}</h2>
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(0, 6).map(photo => (
              <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} className="rounded-lg aspect-square object-cover" />
            ))}
          </div>
          {photos.length === 0 && <p className="text-gray-500">{t('No photos yet')}</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard