import React from 'react'
import { categoryTranslations } from '../../utils/translations'

const categories = ['all', 'wedding', 'portrait', 'nature']

const FilterBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-5 md:px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
            activeCategory === cat
              ? 'bg-black dark:bg-white text-white dark:text-black'
              : 'bg-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
          }`}
        >
          {categoryTranslations[cat]}
        </button>
      ))}
    </div>
  )
}

export default FilterBar