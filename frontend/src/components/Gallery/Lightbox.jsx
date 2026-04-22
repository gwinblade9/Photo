import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { translateCategory } from '../../utils/translations'

const Lightbox = ({ photos, currentIndex, onClose }) => {
  const [index, setIndex] = React.useState(currentIndex)
  const currentPhoto = photos[index]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setIndex(prev => Math.max(0, prev - 1))
      else if (e.key === 'ArrowRight') setIndex(prev => Math.min(photos.length - 1, prev + 1))
      else if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [photos.length, onClose])

  const handleDownload = () => {
    try {
      // Создаём временную ссылку
      const link = document.createElement('a')
      link.href = currentPhoto.imageUrl
      link.download = currentPhoto.title?.replace(/[^a-zа-яё0-9]/gi, '_') || 'photo'
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      
      // Добавляем в DOM, кликаем, удаляем
      document.body.appendChild(link)
      link.click()
      
      // Удаляем через небольшую задержку
      setTimeout(() => {
        document.body.removeChild(link)
      }, 100)
    } catch (error) {
      console.error('Ошибка скачивания:', error)
      // Альтернатива: открыть в новой вкладке
      window.open(currentPhoto.imageUrl, '_blank')
    }
  }

  if (!currentPhoto) return null

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[1000] flex items-center justify-center backdrop-blur-md"
        onClick={onClose}
      >
        <button 
          className="absolute top-6 right-6 text-white text-5xl hover:text-gray-400 z-20 transition-colors"
          onClick={onClose}
        >
          ×
        </button>
        
        <button 
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-400 disabled:opacity-30 transition-colors z-20"
          onClick={(e) => { e.stopPropagation(); setIndex(prev => Math.max(0, prev - 1)) }}
          disabled={index === 0}
        >
          ‹
        </button>
        
        <motion.div 
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative max-w-6xl mx-auto px-4 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={currentPhoto.imageUrl} 
            alt={currentPhoto.title}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onError={(e) => {
              console.error('Ошибка загрузки изображения:', currentPhoto.imageUrl)
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+not+found'
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6 rounded-b-lg">
            <h3 className="text-2xl font-light mb-2">{currentPhoto.title}</h3>
            {currentPhoto.description && (
              <p className="text-sm opacity-90 mb-3">{currentPhoto.description}</p>
            )}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors backdrop-blur-sm"
              >
                Скачать preview
              </button>
              <span className="px-4 py-2 bg-white/10 rounded-lg text-sm capitalize">
                {translateCategory(currentPhoto.category)}
              </span>
            </div>
          </div>
        </motion.div>
        
        <button 
          className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-gray-400 disabled:opacity-30 transition-colors z-20"
          onClick={(e) => { e.stopPropagation(); setIndex(prev => Math.min(photos.length - 1, prev + 1)) }}
          disabled={index === photos.length - 1}
        >
          ›
        </button>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 px-3 py-1 rounded-full">
          {index + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Lightbox
