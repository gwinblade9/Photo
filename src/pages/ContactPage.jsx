import React from 'react'
import ContactForm from '../components/Contact/ContactForm'

const ContactPage = () => {
  return (
    <div className="container-custom py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Оставайтесь на связи</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Задумали какой‑то проект? Мне очень интересно! Заполните форму ниже — я отвечу в течение суток.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">📧 Почта</h3>
              <p className="text-gray-600 dark:text-gray-400">fokids@gmail.com</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">📞 Телефон</h3>
              <p className="text-gray-600 dark:text-gray-400">+7 999 999 999</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">📍 Фотостудия</h3>
              <p className="text-gray-600 dark:text-gray-400">Дмитровка 13<br />Москва</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">🌐 Следить за моим творческим путем</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Instagram</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Facebook</a>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Pinterest</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage