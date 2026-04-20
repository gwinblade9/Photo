import React from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultMessages } from '../../data/defaultData'
import { useTheme } from '../../context/ThemeContext'
import { t } from '../../utils/adminTranslations'

const MessagesViewer = () => {
  const [messages, setMessages] = useLocalStorage('messages', defaultMessages)
  const { darkMode, toggleDarkMode } = useTheme()

  const markAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m))
    alert(t('Message marked as read'))
  }

  const deleteMessage = (id) => {
    if (confirm(t('Delete this message?'))) {
      setMessages(messages.filter(m => m.id !== id))
      alert(t('Message deleted'))
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('ru-RU')
  }

  if (messages.length === 0) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-light">{t('Contact Messages')}</h1>
          <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center text-gray-500">
          {t('No messages yet')}
        </div>
      </div>
    )
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-light">{t('Contact Messages')}</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">{t('Unread Messages')}: {unreadCount}</p>
          )}
        </div>
        <button onClick={toggleDarkMode} className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 ${!msg.isRead ? 'border-l-4 border-blue-500' : ''}`}>
            <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
              <div>
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-gray-500">
                  <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                  {msg.phone && ` • ${msg.phone}`}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">{formatDate(msg.createdAt)}</p>
                {!msg.isRead && <span className="inline-block mt-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 px-2 py-0.5 rounded-full">{t('New')}</span>}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{msg.message}</p>
            <div className="mt-4 flex gap-3">
              {!msg.isRead && (
                <button onClick={() => markAsRead(msg.id)} className="text-sm text-blue-600 hover:text-blue-800">
                  {t('Пометить прочитанным')}
                </button>
              )}
              <button onClick={() => deleteMessage(msg.id)} className="text-sm text-red-600 hover:text-red-800">
                {t('Удалить')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessagesViewer
