import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import FilterBar from '../components/Gallery/FilterBar'
import GalleryGrid from '../components/Gallery/GalleryGrid'
import { translateCategory } from '../utils/translations'

const GalleryPage = () => {
  const { category = 'all' } = useParams()
  const [activeCategory, setActiveCategory] = useState(category)

  const getTitle = () => {
    if (activeCategory === 'all') return 'Портфолио'
    return translateCategory(activeCategory)
  }

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl md:text-5xl font-light text-center mb-4">{getTitle()}</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
        {activeCategory === 'all' 
          ? 'Все мои работы в одном месте' 
          : `Коллекция фотографий в жанре "${translateCategory(activeCategory)}"`}
      </p>
      <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <GalleryGrid category={activeCategory} />
    </div>
  )
}

export default GalleryPage