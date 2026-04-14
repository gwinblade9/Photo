import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultMessages } from '../../data/defaultData'

const ContactForm = () => {
  const [messages, setMessages] = useLocalStorage('messages', defaultMessages)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    
    setSubmitting(true)
    const newMessage = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      isRead: false
    }
    setMessages([newMessage, ...messages])
    setFormData({ name: '', email: '', phone: '', message: '' })
    setSubmitting(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Имя *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Почта *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Телефон
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Сообщение *
        </label>
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none bg-white dark:bg-gray-800"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 rounded-lg text-sm uppercase tracking-wider"
      >
        {submitting ? 'Отправка...' : 'Send Message'}
      </button>
      
      {success && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-lg text-center animate-fade-in">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}
    </form>
  )
}

export default ContactForm