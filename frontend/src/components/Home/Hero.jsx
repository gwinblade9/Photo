import React from 'react'
import { motion } from 'framer-motion'
import { smoothScrollTo } from '../../utils/smoothScroll'

const Hero = () => {
  const handleExploreClick = () => {
    smoothScrollTo('gallery', 80)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=2070)',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-light tracking-wider mb-6"
        >
          Фотография - это искусство
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl mx-auto"
        >
          Прекрасные моменты, искренние эмоции, воспоминания на всю жизнь
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={handleExploreClick}
          className="px-8 py-3 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider cursor-pointer"
        >
          Смотреть работы
        </motion.button>
      </div>
    </section>
  )
}

export default Hero