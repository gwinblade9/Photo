import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Рыжий Данька</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ловя мгновения, что живут вечно
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Мгновенные ссылки</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link to="/gallery" className="hover:text-black dark:hover:text-white">Галерея</Link></li>
              <li><Link to="/services" className="hover:text-black dark:hover:text-white">Услуги</Link></li>
              <li><Link to="/blog" className="hover:text-black dark:hover:text-white">Блог</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Найти меня в соцсетях</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Instagram</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Facebook</a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Pinterest</a>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Связаться со мной</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">fokids@gmail.com</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">+7 999 999 999</p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Рыжий Ап. Все права защищены(наверное).
        </div>
      </div>
    </footer>
  )
}

export default Footer