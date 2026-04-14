import React, { useState, useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { defaultPhotos } from '../../data/defaultData'
import Lightbox from './Lightbox'
import { translateCategory } from '../../utils/translations'

const GalleryGrid = ({ category }) => {
  const [photos] = useLocalStorage('photos', defaultPhotos)
  const [filteredPhotos, setFilteredPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    let filtered = [...photos]
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }
    setFilteredPhotos(filtered)
    setLoading(false)
  }, [category, photos])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    )
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Нет фотографий в этой категории.
      </div>
    )
  }

  return (
    <>
      <div className="gallery-grid">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-800 animate-fade-in"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.thumbnailUrl || photo.imageUrl}
              alt={photo.title}
              loading="lazy"
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
          photos={filteredPhotos} 
          currentIndex={filteredPhotos.findIndex(p => p.id === selectedPhoto.id)} 
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  )
}

export default GalleryGrid