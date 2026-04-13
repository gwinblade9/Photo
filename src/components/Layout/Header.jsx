import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { smoothScrollTo } from '../../utils/smoothScroll'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Главная', path: '/', anchor: 'hero' },
    { name: 'Галерея', path: '/gallery' },
    { name: 'Обо мне', path: '/about' },
    { name: 'Услуги', path: '/services' },
    { name: 'Блог', path: '/blog' },
    { name: 'Контакты', path: '/contact' },
  ]

  const handleNavClick = (e, item) => {
    if (item.path === '/' && location.pathname === '/') {
      e.preventDefault()
      smoothScrollTo('gallery', 80)
      setIsMenuOpen(false)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <nav className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-light tracking-wide hover:opacity-80 transition">
            Рыжий Данька
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-sm uppercase tracking-wider transition-colors ${
                  isActive(item.path)
                    ? 'text-black dark:text-white font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-slide-up">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-sm uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header