import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultPhotos } from '../../data/defaultData'
import Lightbox from '../Gallery/Lightbox'
import { translateCategory } from '../../utils/translations'

const FeaturedGrid = () => {
  const [photos] = useLocalStorage('photos', defaultPhotos)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const featuredPhotos = photos.slice(0, 6)

  if (featuredPhotos.length === 0) {
    return (
      <div className="container-custom py-16 text-center text-gray-500">
        Нет фотографий. Войдите в админку и загрузите фото.
      </div>
    )
  }

  return (
    <section id="gallery" className="container-custom py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Избранные работы</h2>
      <div className="gallery-grid">
        {featuredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-800"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.thumbnailUrl || photo.imageUrl}
              alt={photo.title}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ aspectRatio: '4/5' }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="text-center text-white p-4">
                <p className="text-lg font-light">{photo.title}</p>
                <p className="text-sm opacity-90 mt-1 capitalize">
                  {translateCategory(photo.category)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <Lightbox 
          photos={featuredPhotos} 
          currentIndex={featuredPhotos.findIndex(p => p.id === selectedPhoto.id)} 
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </section>
  )
}

export default FeaturedGrid